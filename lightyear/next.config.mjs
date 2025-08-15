/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  basePath: isDev ? "" : "/lightyear",
};

export default nextConfig;
