/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ضروري جداً ليعمل الموقع على Cloudflare Pages بدون مشاكل
  },
};

export default nextConfig;
