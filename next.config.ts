import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "covers.openlibrary.org",
      //   pathname: "/b/**",
      // },
    ],
  },
  sassOptions: {
    loadPaths: [path.join(__dirname, "src/app/_styles")],
    additionalData: '@use "helpers/index.scss" as *;',
  },
};

export default nextConfig;
