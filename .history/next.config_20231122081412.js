const withVideos = require('next-videos');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils'],
  },
  images: {
    domains: [
      "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging.s3.amazonaws.com",
      "res.cloudinary.com",
      "utfs.io"
    ],
  },
  env: {
    AWS_EXPORT_FILE: './aws-exports.js',
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
  
  addons: ['storybook-addon-next'],
};

module.exports = withMDX(withVideos(nextConfig));
