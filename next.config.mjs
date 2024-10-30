/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nito-dev-bucket.s3.ap-northeast-2.amazonaws.com"], // 허용된 도메인 추가
  },
};

export default nextConfig;
