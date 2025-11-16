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
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 
      (process.env.NODE_ENV === 'production' 
        ? 'https://ardex.uz' 
        : 'http://localhost:8000');
    
    return [
      {
        source: '/admin',
        destination: `${adminUrl}/admin`,
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: `${adminUrl}/admin/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
