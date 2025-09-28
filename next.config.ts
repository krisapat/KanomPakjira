import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions:{
      bodySizeLimit: '2mb'
    }
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'hmhwdskqbzlswwjmjufy.supabase.co',
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ]
  }
};

export default nextConfig;
