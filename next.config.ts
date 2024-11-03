import type { NextConfig } from "next";

const generalEnv = {
  PB_URL: "http://localhost:8090",
  PB_USER: "nicolasny9@gmail.com",
  PB_PASSWORD: "4c3opij0km",
};

const nextConfig: NextConfig = {
  env: {
    ...generalEnv,
  },
};

export default nextConfig;
