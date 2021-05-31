// next.config.js
const withImages = require("next-images");

module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  env: {
    mongodb_username: "next_blog1",
    mongodb_password: "lbxaIA8rnecaFhQsdfwukEJ",
    mongodb_clustername: "cluster0",
    mongodb_database: "next-blog1"
  }
});
