import { ITab } from "./types";

const tabs = ["items", "prefixes", "suffixes"];

const getCategory = () => {
  const { pathname } = window.location;

  const [category, tab] = pathname.split("/category/")[1]?.split("/");

  if (!tabs.includes(tab)) {
    return { category, tab: null };
  }

  const newTab = tab as ITab;

  return { category, tab: newTab };
};

const getItemsList = () => {
  const itemsTitleList = document.querySelectorAll(
    "#item-list > div.item-list-group-header"
  );
  const itemsList = document.querySelectorAll(
    "#item-list > div.item-list-group"
  );

  return { itemsTitleList, itemsList };
};

const getItems = (group: Element, tab: ITab) => {
  const items = group.querySelectorAll(".item-card");
  const ids: (string | null)[] = [];

  items.forEach((item) => {
    const id = getItem(item, tab);
    ids.push(id);
  });

  return { items, ids };
};

const getItem = (el: Element, tab: ITab) => {
  const tabMap: any = {
    items: "item-id",
    prefixes: "prefix-id",
    suffixes: "suffix-id",
  };

  const itemId = el.querySelector(".item-name")?.getAttribute(tabMap[tab]);

  return itemId ?? null;
};

export const scrapeService = {
  getCategory,
  getItemsList,
  getItems,
};
