/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {hostname: 'www.gravatar.com'},
      {hostname: 'picsum.photos'},
      {hostname: 'placehold.co'},
      {hostname: '*'},
    ],
  }
};

module.exports = nextConfig;
