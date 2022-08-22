/** @type {import('next').NextConfig} */

const NEWS_API_KEY = process.env.NEWS_API_KEY;

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
        source: '/moviesapi',
        destination: `https://newsapi.org/v2/top-headlines?country=kr&apiKey=bf9d4ea494024b88a8840dc1886dcbc5`
      }
    ]
  }
}

module.exports = nextConfig
