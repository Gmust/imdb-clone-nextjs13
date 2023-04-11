/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['www.gravatar.com', 'image.tmdb.org', 'secure.gravatar.com']
  },
  reactStrictMode: true
};

module.exports = nextConfig;
