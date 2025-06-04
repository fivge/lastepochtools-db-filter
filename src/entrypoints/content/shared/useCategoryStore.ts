import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IGlobalStatus, IStatus } from "./types";

interface ICategoryStoreStateBase {
  globalStatus: IGlobalStatus;
}

interface ICategory {
  items?: Record<string, IStatus>;
  prefixes?: Record<string, IStatus>;
  suffixes?: Record<string, IStatus>;
}

interface ICategoryStoreState {
  [category: string]: ICategory;
}

interface ICategoryStoreActions {
  setItem: (category: string, key: string, status: IStatus) => void;
  setPrefix: (category: string, key: string, status: IStatus) => void;
  setSuffix: (category: string, key: string, status: IStatus) => void;
  setGlobalStatus: (globalStatus: IGlobalStatus) => void;
}

type ICategoryStore = ICategoryStoreStateBase &
  ICategoryStoreState &
  ICategoryStoreActions;

const persistStorage = {
  getItem: (key: string) => storage.getItem<string | null>(`local:${key}`),
  setItem: (key: string, value: string) =>
    storage.setItem<string | null>(`local:${key}`, value),
  removeItem: (key: string) => storage.removeItem(`local:${key}`),
};

export const useCategoryStore = create<ICategoryStore>()(
  persist(
    (set, get) => ({
      globalStatus: "all",
      setGlobalStatus: (globalStatus) => set((state) => ({ globalStatus })),
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
