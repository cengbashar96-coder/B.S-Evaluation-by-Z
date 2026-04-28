/** @type {import('next').NextConfig} */
const nextConfig = {
  /* تم إزالة output: 'export' للسماح بالـ API Routes */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
