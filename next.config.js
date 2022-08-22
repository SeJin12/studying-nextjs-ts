/** @type {import('next').NextConfig} */
const API_KEY = 'ABCD'; // 또는 환경변수 .env file

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/naver',
        destination:'https://www.naver.com',
        permanent: false
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/test/a',
        destination: `/zyx/${API_KEY}`
      }
    ]
  }
}

module.exports = nextConfig
