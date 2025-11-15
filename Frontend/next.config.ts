import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  // Отключаем индикатор разработки Next.js
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  // Отключаем заголовок X-Powered-By
  poweredByHeader: false,
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
