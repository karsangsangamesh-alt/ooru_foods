"use client";

import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy loaded components will be imported as needed

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources: Array<{
    node: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
}

interface PerformanceWrapperProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  skipAnimations?: boolean;
}

// Loading component
const DefaultLoader = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
  </div>
);

export default function PerformanceWrapper({ 
  children, 
  loadingComponent = <DefaultLoader />,
  skipAnimations = false 
}: PerformanceWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== 'undefined' ? window.location.pathname : 'initial'}
        initial={skipAnimations ? undefined : { opacity: 0, y: 20 }}
        animate={skipAnimations ? undefined : { opacity: 1, y: 0 }}
        exit={skipAnimations ? undefined : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        <Suspense fallback={loadingComponent}>
          {children}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  if (typeof window === 'undefined') return;
  
  const logError = (error: Error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Performance monitoring error:', error);
    }
  };

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log(`Page Load Time: ${navEntry.duration}ms`);
        }
        if (entry.entryType === 'largest-contentful-paint') {
          const paintEntry = entry as PerformanceEntry;
          console.log(`LCP: ${paintEntry.startTime}ms`);
        }
        if (entry.entryType === 'first-input') {
          const inputEntry = entry as PerformanceEventTiming;
          const fid = inputEntry.processingStart - inputEntry.startTime;
          console.log(`FID: ${fid}ms`);
        }
        if (entry.entryType === 'layout-shift') {
          const layoutShift = entry as LayoutShift;
          if (!layoutShift.hadRecentInput) {
            console.log(`CLS: ${layoutShift.value}`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (error) {
    logError(error as Error);
  }
}
