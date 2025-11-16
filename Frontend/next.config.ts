import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  poweredByHeader: false,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: 'http://localhost:8000/admin',
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: 'http://localhost:8000/admin/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
