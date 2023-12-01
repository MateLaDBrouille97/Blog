const withVideos = require('next-videos');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  videos:{
    dirs:'public',
  },
  images: {
    domains:["portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging.s3.amazonaws.com","res.cloudinary.com","utfs.io"]
   },
   env: {
     AWS_EXPORT_FILE: './src/aws-exports.js',
   },
   webpack5: true,
  
   webpack: (config, { isServer }) => {

    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': require.resolve('react/jsx-runtime'),
      '@': __dirname,
    };
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
      },
    };
    return config;
  },
  


  
  addons: [
    // '@storybook/addon-essentials',
    // '@storybook/addon-links',
    'storybook-addon-next'
  ]
}



// module.exports = nextConfig
module.exports = withMDX(
  withVideos({
    ...nextConfig,
    server: {
      URL: "https://blog2-eosin-beta.vercel.app",
      port: process.env.PORT || 3000, // Use the PORT environment variable if available, otherwise use port 3000
      host: '0.0.0.0', // Listen on all available network interfaces
    },
  
  }))
