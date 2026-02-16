import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "images.unsplash.com",
      protocol: "https",
    }, {
      protocol:"https",
      hostname:"res.cloudinary.com"
    }],

  },
};

export default nextConfig;
