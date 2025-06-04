import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import type { ContentScriptContext } from "#imports";
import { scrapeService } from "./shared/scrape";
import { ItemUI } from "@/components/item-ui";
import { ITab } from "./shared/types";

export const initUI = async (ctx: ContentScriptContext) => {
  const pathname = window.location.pathname;
  console.log("******** shadow container", ctx, pathname);

  const { category, tab } = scrapeService.getCategory();

  if (!category || !tab) {
    return null;
  }

  setTimeout(() => {
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
    // anchor:
    //   "#item-list > div:nth-child(5) > div:nth-child(1) > div > div.top-block > div.item-description > div.item-type",
    onMount: (container) => {
      // console.log("******** renderItemUI", el, id);
      // const pathname = window.location.pathname;
      // console.log("******** shadow container", container, pathname);

      // const {category, tab } = scrapeService.getCategory();
      // if(!category || !tab){
      //   return null;
      // }

      const app = document.createElement("div");

      // https://www.lastepochtools.com/db/zh/category/boots/items

      //
      // Container is a body, and React warns when creating a root on the body, so create a wrapper div
      // const parent = document.querySelector(
      //   "#item-list > div:nth-child(5) > div:nth-child(1) > div > div.top-block > div.item-description > div.item-type"
      // );
      const parent = el.querySelector("div.item-description > div.item-type");

      //   container.append(app);
      parent?.append(app);

      // Create a root on the UI container and render a component
      const root = createRoot(app);
      root.render(<ItemUI el={el} category={category} id={id} />);
      return root;
    },
    onRemove: (root) => {
      // Unmount the root when the UI is removed
      root?.unmount();
    },
  });

  ui.mount();
};
