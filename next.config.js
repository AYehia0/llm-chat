/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export; use `next build && next export` to generate static files
  distDir: 'dist', // Output directory for the static files
}

module.exports = nextConfig
