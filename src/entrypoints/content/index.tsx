import { initUI } from "./ui";

const watchPattern = new MatchPattern(
  "*://*.lastepochtools.com/db/*category/*"
);

export default defineContentScript({
  matches: ["https://www.lastepochtools.com/db/*category/*"],
  main(ctx) {
    ctx.addEventListener(window, "wxt:locationchange", ({ newUrl }) => {
      if (watchPattern.includes(newUrl)) {
        initUI(ctx);
      }
    });

    if (ctx.isValid) {
      initUI(ctx);
    }
  },
});
