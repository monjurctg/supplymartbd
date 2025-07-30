const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");

const antd = withAntdLess({
  modifyVars: {
    "@primary-color": "#2A7A9B",
    "@border-radius-base": "4px",
  },
  lessVarsFilePath: "./styles/variables.less",
  webpack(config) {
    return config;
  },
});

module.exports = withPlugins([[antd]], {
  images: {
    domains: ["cbu01.alicdn.com", "supplymartbd.com", "alicdn.com"],
  },
  allowedDevOrigins: ["http://192.168.0.195:3061"], // ✅ Works in Next.js 15
  outputFileTracingRoot: process.cwd(),
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
