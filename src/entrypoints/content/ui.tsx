import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import type { ContentScriptContext } from "#imports";
import { scrapeService } from "./shared/scrape";
import { ItemUI } from "@/components/item-ui";
import { ITab } from "./shared/types";
import { GlobalStatus } from "@/components/global-status";

export const initUI = async (ctx: ContentScriptContext) => {
  const { category, tab } = scrapeService.getCategory();

  if (!category || !tab) {
    return null;
  }

  setTimeout(() => {
    renderGlobalStatus(ctx);

    const { itemsTitleList, itemsList } = scrapeService.getItemsList();

    itemsList.forEach((el) => {
      const { items, ids } = scrapeService.getItems(el, tab);
      items.forEach((item, index) => {
        renderItemUI(ctx, item, category, tab, ids[index]);
      });
    });
  }, 100);
};

const renderGlobalStatus = async (ctx: ContentScriptContext) => {
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
      root.render(<ItemUI el={el} category={category} tab={tab} id={id} />);
      return root;
    },
    onRemove: (root) => {
      root?.unmount();
    },
  });

  ui.mount();
};
