import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["127.0.0.1"], // ✅ Permitir imágenes desde el backend local
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/projects/**", // ✅ Permitir imágenes en /storage/projects/
      },
    ],
  },
};

export default nextConfig;

