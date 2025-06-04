import { create, createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
// import { createWithEqualityFn } from "zustand/traditional";
// import { storage as wxtStorage } from "#imports";
import { IStatus } from "./types";
import { createWithEqualityFn } from "zustand/traditional";

type ICategoryStoreState = {
  // context: {
  [category: string]: {
    items?: Record<string, IStatus>;
    prefixes?: Record<string, IStatus>;
    suffixes?: Record<string, IStatus>;
  };
  // };
};

type ICategoryStoreActions = {
  // actions: {
  setItem: (category: string, key: string, status: IStatus) => void;
  setPrefix: (category: string, key: string, status: IStatus) => void;
  setSuffix: (category: string, key: string, status: IStatus) => void;
  // };
};

type ICategoryStore = ICategoryStoreState & ICategoryStoreActions;

const persistStorage = {
  getItem: (key: string) => storage.getItem<string | null>(`local:${key}`),
  setItem: (key: string, value: string) =>
    storage.setItem<string | null>(`local:${key}`, value),
  removeItem: (key: string) => storage.removeItem(`local:${key}`),
};

export const useCategoryStore = create<ICategoryStore>()(
  persist(
    (set, get) => ({
      // setItem: (category, key, status) => {
      //   const map = get()[category] || {};
      //   const newMap = {
      //     ...map,
      //     items: {
      //       ...(map.items || {}),
      //       [key]: status,
      //     },
      //   };
      //   return set({ [category]: newMap });
      // },
      // setPrefix: (category, key, status) => {
      //   const map = get()[category] || {};
      //   const newMap = {
      //     ...map,
      //     prefixes: {
      //       ...(map.prefixes || {}),
      //       [key]: status,
      //     },
      //   };
      //   return set({ [category]: newMap });
      // },
      // setSuffix: (category, key, status) => {
      //   const map = get()[category] || {};
      //   const newMap = {
      //     ...map,
      //     suffixes: {
      //       ...(map.suffixes || {}),
      //       [key]: status,
      //     },
      //   };
      //   return set({ [category]: newMap });
      // },
      setItem: (category, key, status) =>
        set((state) => {
          const map = state[category] || {};
          const newMap = {
            ...map,
            items: {
              ...(map.items || {}),
              [key]: status,
            },
          };
          return { [category]: newMap };
        }),
      setPrefix: (category, key, status) =>
        set((state) => {
          const map = state[category] || {};
          const newMap = {
            ...map,
            prefixes: {
              ...(map.prefixes || {}),
              [key]: status,
            },
          };
          return { [category]: newMap };
        }),
      setSuffix: (category, key, status) =>
        set((state) => {
          const map = state[category] || {};
          const newMap = {
            ...map,
            suffixes: {
              ...(map.suffixes || {}),
              [key]: status,
            },
          };
          return { [category]: newMap };
        }),
    }),
    {
      name: "lastepochtools_category_4",
      // partialize: (state) => ({ context: state.context }),
      storage: createJSONStorage(() => persistStorage),
    }
  )
  // shallow
);
