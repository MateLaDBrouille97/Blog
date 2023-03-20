
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
const withVideos = require('next-videos');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');



/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains:["portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging.s3.amazonaws.com",]
   },
   env: {
     AWS_EXPORT_FILE: './aws-exports.js',
   },
   webpack5: true,
   webpack: (config, { isServer }) => {
     if (!isServer) {
       config.resolve.fallback = { fs: false };
     }
     return config;
   },
   webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/jsx-runtime.js': require.resolve('react/jsx-runtime'),
    }

    config.resolve = {
      ...config.resolve,

      fallback: {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        // 'builtin-modules': false,
        // worker_threads: false,
      },
    }

    return config
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
    async rewrites() {
      return [
        {
          source: '/videos/:path*',
          destination: async ({ req, res, params }) => {
            const s3Client = new S3Client({ region: process.env.AWS_REGION });
            const command = new GetObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME,
              Key: `videos/${params.path.join('/')}`,
            });
            const { Body } = await s3Client.send(command);
            res.setHeader('Content-Type', 'video/mp4');
            res.setHeader('Content-Length', Body.length);
            res.send(Body);
          },
        },
      ];
    },
  })
);