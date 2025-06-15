import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  manifest: {
    permissions: ["storage", "tabs"],
  },
  // binaries: {
  //   chrome: "/path/to/chrome-beta", // Use Chrome Beta instead of regular Chrome
  //   firefox: "firefoxdeveloperedition", // Use Firefox Developer Edition instead of regular Firefox
  //   edge: "/path/to/edge", // Open MS Edge when running "wxt -b edge"
  // },
});
