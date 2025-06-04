import { ITab } from "./types";
import { useCategoryStore } from "./useCategoryStore";

const STORAGE_KEY = "local:lastepochtools_category";

const t = [
  {
    category: "helms",
    items: {
      "001": "favor",
    },
    prefixes: {
      "011": "favor",
    },
    suffixes: {
      "111": "hidden",
    },
  },
];

const foo = {
  helms: {
    items: {
      "001": "favor",
    },
    prefixes: {
      "011": "favor",
    },
    suffixes: {
      "111": "hidden",
    },
  },
};

const getStatusMap = (category: string, tab: ITab) => {
  return useCategoryStore.getState()[category]?.[tab];
};

// display: none;
// display: unset;

// const getStoreData = async () => {
//   return await storage.getItem(STORAGE_KEY);
// };

// const setStoreData = async (value) => {
//   await storage.setItem(STORAGE_KEY, value);
// };

export const categoryService = {
  // getStoreData,
  // setStoreData,

  getStatusMap,
};

export const useCategory = () => {
  // const

  return {};
};
