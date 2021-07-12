const withSvgr = require('next-svgr');

const nextConfig = {
  future: {
    webpack5: true,
  },
};

module.exports = withSvgr(nextConfig);
