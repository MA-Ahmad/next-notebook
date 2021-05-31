// next.config.js
const withImages = require("next-images");

module.exports = withImages({
  webpack(config, options) {
    return config;
  },
  env: {
    mongodb_username: "next_blog",
    mongodb_password: "lbxaIA8rnFhQukEJ",
    mongodb_clustername: "cluster0.j2ej3.mongodb.net",
    mongodb_database: "next-blog"
  }
});
