// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Required for static export to work with Electron
//   output: 'export',
//   // Optional: Specify the directory if you don't want 'out'
//   // distDir: 'dist', 
//   // ... your existing t3 config ...
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
module.exports = {
  images: { unoptimized: true },
};
