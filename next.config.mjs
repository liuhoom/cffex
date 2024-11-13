/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'www.jennexplores.com',
      },
      {
        hostname: 'upload.wikimedia.org',
      },
      {
        hostname: 'static.skillshare.com',
      },
    ],
  },
};

export default nextConfig;
