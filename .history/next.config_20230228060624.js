const composePlugins=require('next-compose-plugins');
const mdxEnhanced=require('next-mdx-enhanced');
const withImages = require("next/image");

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



module.exports = (_phase, { defaultConfig }) => {
  // delete defaultConfig['webpackDevMiddleware'];
  // delete defaultConfig['configOrigin'];


 
  return plugins.reduce(
    (acc, plugin) => {
      if (Array.isArray(plugin)) {
        return plugin[0](acc, plugin[1]);
      }
      return plugin(acc);
    },
    { ...nextConfig }
  );
  
  // composePlugins([plugins,withImages],nextConfig);
 }
