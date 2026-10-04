/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into ./out for GitHub Pages.
  output: 'export',
  // GitHub Pages serves /about/ from out/about/index.html and 301s /about to
  // it, so build and link every route as a directory to avoid a redirect hop.
  trailingSlash: true,
  images: {
    // No image optimization server exists on static hosting.
    unoptimized: true,
  },
  devIndicators: {
    appIsrStatus: false,
  },
}

export default nextConfig
