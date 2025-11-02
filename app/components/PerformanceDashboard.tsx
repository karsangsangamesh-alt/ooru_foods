"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  loadTime: number;
  renderTime: number;
}

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const metricsData: Partial<PerformanceMetrics> = {};

      entries.forEach((entry: PerformanceEntry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          metricsData.lcp = (entry as PerformanceEntry & { startTime: number }).startTime;
        }
        if (entry.entryType === 'first-input') {
          const inputEntry = entry as PerformanceEventTiming;
          metricsData.fid = inputEntry.processingStart - inputEntry.startTime;
        }
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            metricsData.cls = (metricsData.cls || 0) + layoutShiftEntry.value;
          }
        }
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          metricsData.loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
          metricsData.renderTime = navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart;
        }
      });

      if (Object.keys(metricsData).length > 0) {
        setMetrics(prev => ({ ...prev, ...metricsData }) as PerformanceMetrics);
      }
    });

    try {
      observer.observe({
        entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift']
      });
    } catch (_error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance observer not supported in this environment');
      }
    }

    // Toggle visibility with Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getScore = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.poor) return 'needs-improvement';
    return 'poor';
  };

  const getColor = (score: string) => {
    switch (score) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const lcpScore = metrics?.lcp ? getScore(metrics.lcp, { good: 2500, poor: 4000 }) : 'unknown';
  const fidScore = metrics?.fid ? getScore(metrics.fid, { good: 100, poor: 300 }) : 'unknown';
  const clsScore = metrics?.cls ? getScore(metrics.cls, { good: 0.1, poor: 0.25 }) : 'unknown';

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-2xl border p-4 min-w-[300px]"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {metrics ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">LCP:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getColor(lcpScore)}`}>
              {metrics.lcp?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">FID:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getColor(fidScore)}`}>
              {metrics.fid?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">CLS:</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getColor(clsScore)}`}>
              {metrics.cls?.toFixed(3)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Load Time:</span>
            <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-600">
              {metrics.loadTime?.toFixed(0)}ms
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Render Time:</span>
            <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-600">
              {metrics.renderTime?.toFixed(0)}ms
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          Loading metrics...
        </div>
      )}

      <div className="mt-4 pt-3 border-t text-xs text-gray-500">
        Press Ctrl+Shift+P to toggle
      </div>
    </motion.div>
  );
};

export default PerformanceDashboard;
