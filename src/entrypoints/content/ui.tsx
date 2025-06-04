import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import type { ContentScriptContext } from "#imports";
import { scrapeService } from "./shared/scrape";
import { ItemUI } from "@/components/item-ui";
import { ITab } from "./shared/types";
import { GlobalStatus } from "@/components/global-status";

export const initUI = async (ctx: ContentScriptContext) => {
  const pathname = window.location.pathname;
  console.log("******** shadow container", ctx, pathname);

  const { category, tab } = scrapeService.getCategory();

  if (!category || !tab) {
    return null;
  }

  setTimeout(() => {
    renderGlobalStatus(ctx);

    if (tab === "items") {
      const { itemsTitleList, itemsList } = scrapeService.getItemsList();

      console.log("***************** 0", ctx, itemsList);

      itemsList.forEach((el) => {
        const { items, ids } = scrapeService.getItems(el);
        // console.log("***************** 1", items, ids);
        items.forEach((item, index) => {
          // console.log("***************** 2", item, index);
          renderItemUI(ctx, item, category, tab, ids[index]);
        });
      });
    }
  }, 500);

  console.log("******** category, tab ***** ", category, tab);
};

const renderGlobalStatus = async (
  ctx: ContentScriptContext
  // el: Element,
) => {
  const ui = await createShadowRootUi(ctx, {
    name: "global-status",
    position: "inline",
    anchor: "body",
    onMount: (container) => {
      const inited = document.getElementById("global-status");
      if (inited) {
        return null;
      }

      const app = document.createElement("div");
      app.setAttribute("id", "global-status");

      const parent = document.querySelector("div.top-bar > div.bar-mid");

      parent?.append(app);

      const root = createRoot(app);
      root.render(<GlobalStatus />);
      return root;
    },
    onRemove: (root) => {
      root?.unmount();
    },
  });

  ui.mount();
};

const renderItemUI = async (
  ctx: ContentScriptContext,
  el: Element,
  category: string,
  tab: ITab,
  id: string | null
) => {
  const ui = await createShadowRootUi(ctx, {
    name: "items-actions",
    position: "inline",
    anchor: "body",
    onMount: (container) => {
      const app = document.createElement("div");

      const parent = el.querySelector("div.item-description > div.item-type");

      parent?.append(app);

      const root = createRoot(app);
      root.render(<ItemUI el={el} category={category} id={id} />);
      return root;
    },
    onRemove: (root) => {
      root?.unmount();
    },
  });

  ui.mount();
};
