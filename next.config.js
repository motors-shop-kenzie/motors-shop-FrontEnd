/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["blogger.googleusercontent.com"],
    formats: ["image/webp"],
  }
}

module.exports = nextConfig;
