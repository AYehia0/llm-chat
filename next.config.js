/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export; use `next build && next export` to generate static files
  distDir: 'dist', // Output directory for the static files
  basePath: '/llm-chat', // Base path for the application
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
}

module.exports = nextConfig
