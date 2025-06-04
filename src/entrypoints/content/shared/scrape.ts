const tabs = ["items", "prefixes", "suffixes"];

const getCategory = () => {
  const { pathname } = window.location;

  const [category, tab] = pathname.split("/category/")[1]?.split("/");

  if (!tabs.includes(tab)) {
    return { category, tab: null };
  }

  return { category, tab };
};

const getItemsList = () => {
  const itemsTitleList = document.querySelectorAll(
    "#item-list > div.item-list-group-header"
  );
  const itemsList = document.querySelectorAll(
    "#item-list > div.item-list-group"
  );

  // const foo = document.querySelectorAll("#item-list");

  // console.log("******* getItemsList", itemsTitleList, itemsList, foo);

  // itemsList.length

  return { itemsTitleList, itemsList };
};

const getItems = (group: Element) => {
  const items = group.querySelectorAll(".item-card");
  const ids: (string | null)[] = [];

  items.forEach((item) => {
    const id = getItem(item);
    ids.push(id);
  });

  return { items, ids };
};

// document.querySelector("#item-list > div.item-list-group-header.rarity0").textContent += "********** 5 6 7"
// console.log("***** group title", title);

const getItem = (el: Element) => {
  // window.location
  // item-id="IIwBjIFgJnI"
  // .getAttribute("item-id")
  // const id = getItem(el);
  const itemId = el.querySelector(".item-name")?.getAttribute("item-id");
  // window.location
  // item-id="IIwBjIFgJnI"
  // .getAttribute("item-id")
  return itemId ?? null;

  // TODO set style for love & hideen
  // TODO add button to love or hidden
  // return id;
};

export const scrapeService = {
  getCategory,
  getItemsList,
  getItems,
};
