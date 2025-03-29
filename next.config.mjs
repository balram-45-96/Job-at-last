/* @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const contentSecurityPolicy = `
  default-src 'self';
  media-src 'self' https:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
  connect-src 'self' https:;
  img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline' https:;
  font-src 'self' https:;
  frame-src 'self' https:;
`;

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=*, microphone=()'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig = {
  distDir: 'build',
  generateEtags: false,
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  // output: 'export',
  // env: {
  //   customKey: 'my-value'
  // },
  // images: {
  //   loader: 'custom',
  //   loaderFile: '/ImageLoader.ts'
  // },
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: ['react-player']
  },
  turbo: {
    resolveAlias: {
      // Turbopack does not support standard ESM import paths yet
      './Sample.js': './app/Sample.tsx',
      /**
       * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
       * Module parse failed: Unexpected character '�' (1:0)" error
       */
      canvas: './empty-module.ts'
    }
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig);
