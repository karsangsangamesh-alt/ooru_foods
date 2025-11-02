// Performance Budgets Configuration
// These budgets help maintain optimal performance standards

export const PERFORMANCE_BUDGETS = {
  // Core Web Vitals thresholds (milliseconds)
  LCP_BUDGET: 2500, // Largest Contentful Paint
  FID_BUDGET: 100, // First Input Delay  
  CLS_BUDGET: 0.1, // Cumulative Layout Shift
  
  // Bundle size budgets (KB)
  MAIN_BUNDLE_BUDGET: 300, // Main bundle should be under 300KB
  VENDOR_BUNDLE_BUDGET: 500, // Vendor bundle under 500KB
  
  // Image optimization
  IMAGE_SIZE_BUDGET: 500, // Individual images under 500KB
  IMAGE_DIMENSIONS: {
    // Max dimensions for different image types
    hero: { width: 1920, height: 1080 },
    product: { width: 800, height: 800 },
    thumbnail: { width: 200, height: 200 }
  },
  
  // JavaScript execution time
  LONG_TASK_THRESHOLD: 50, // Long tasks over 50ms
  
  // Memory usage
  MEMORY_BUDGET: 50 * 1024 * 1024, // 50MB total memory usage
  
  // Network requests
  REQUEST_TIMEOUT: 3000, // Requests timeout after 3 seconds
  MAX_CONCURRENT_REQUESTS: 6, // Maximum concurrent network requests
};

// Performance monitoring configuration
export const MONITORING_CONFIG = {
  // Enable monitoring in these environments
  enabledEnvironments: ['development', 'production'],
  
  // Sample rate for performance data collection
  sampleRate: 0.1, // 10% of users
  
  // Throttling for performance data
  flushInterval: 5000, // Send data every 5 seconds
  maxBufferSize: 100, // Max number of entries before flushing
  
  // Performance marks and measures to track
  performanceMarks: [
    'page-load-start',
    'page-load-end',
    'navigation-start',
    'navigation-end',
    'content-loaded',
    'first-paint',
    'first-contentful-paint',
    'largest-contentful-paint'
  ],
  
  // Resource types to monitor
  resourceTypes: [
    'script',
    'stylesheet',
    'image',
    'font',
    'xmlhttprequest',
    'fetch'
  ],
  
  // Core Web Vitals reporting
  reportVitals: true,
  
  // User timing API measures
  measures: [
    'component-mount',
    'data-fetch',
    'render-complete'
  ]
};

// Alert thresholds for performance degradation
export const ALERT_THRESHOLDS = {
  // Warning thresholds (before performance issues)
  LCP_WARNING: 2000, // ms
  FID_WARNING: 80, // ms
  CLS_WARNING: 0.08, // score
  
  // Critical thresholds (severe performance issues)
  LCP_CRITICAL: 4000, // ms
  FID_CRITICAL: 300, // ms  
  CLS_CRITICAL: 0.25, // score
  
  // Bundle size warnings
  BUNDLE_SIZE_WARNING: {
    main: 250, // KB
    vendor: 400, // KB
    total: 1000 // KB
  },
  
  // Memory usage alerts
  MEMORY_WARNING: 40 * 1024 * 1024, // 40MB
  MEMORY_CRITICAL: 80 * 1024 * 1024, // 80MB
};

// Performance testing configuration
export const TESTING_CONFIG = {
  // Lighthouse CI thresholds
  lighthouseThresholds: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 85
  },
  
  // Web Vitals testing
  webVitalsThresholds: {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 }
  }
};

// Bundle analysis configuration
export const BUNDLE_ANALYSIS = {
  // Maximum asset size to track
  MAX_ASSET_SIZE: 100 * 1024, // 100KB
  
  // Packages to exclude from analysis
  EXCLUDE_PACKAGES: [
    '@types/*',
    '*.d.ts',
    'test/**',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/__tests__/**'
  ],
  
  // Warnings for large bundles
  BUNDLE_WARNINGS: {
    package: 50 * 1024, // 50KB per package
    total: 1000 * 1024, // 1MB total
  }
};

// Export all performance configurations
export const PERFORMANCE_CONFIG = {
  budgets: PERFORMANCE_BUDGETS,
  monitoring: MONITORING_CONFIG,
  alerts: ALERT_THRESHOLDS,
  testing: TESTING_CONFIG,
  bundleAnalysis: BUNDLE_ANALYSIS,
};

export default PERFORMANCE_CONFIG;
