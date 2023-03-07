const composePlugins=require('next-compose-plugins');
const mdxEnhanced=require('next-mdx-enhanced');

/** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains:["portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging.s3.amazonaws.com",]
//    },
//    env: {
//      AWS_EXPORT_FILE: './aws-exports.js',
//    }
// }

// const withPlugins = composePlugins([
//   mdxEnhanced({
//     layoutPath: './Posts'
//   })
// ]);

// module.exports = nextConfig;



module.exports = async (phase, { defaultConfig }) => {
  delete defaultConfig['webpackDevMiddleware'];
  delete defaultConfig['configOrigin'];

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:["portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging.s3.amazonaws.com",]
   },
   env: {
     AWS_EXPORT_FILE: './aws-exports.js',
   }
}

const plugins=[
  mdxEnhanced({
    layoutPath: './components'
  })
];

 
  return composePlugins(plugins,nextConfig);
 }
