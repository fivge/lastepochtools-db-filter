import { IStatus } from "@/entrypoints/content/shared/types";
import { useCategoryStore } from "@/entrypoints/content/shared/useCategoryStore";

interface IProps {
  // status?: IStatus;
  el: Element;
  category: string;
  id: string | null;
}

const status = "default";
export const ItemUI = (props: IProps) => {
  const { el, category, id } = props;
  // const [status, setItem] = useCategoryStore((s) => [
  //   s[category]?.items?.[id ?? "_____"],
  //   s.setItem,
  // ]);
  // const [fooo2] = useCategoryStore((s) => [s]);

  // type status = "default" | "favor" | "hidden";

  const xx2 = useCategoryStore.getState()[category]?.items?.[id ?? "_____"];

  if (id === "IIwBj-I") {
    // console.log("********* render ItemUI", status, el, id);

    console.log("********* render ItemUI", el, id, xx2);
  }

  useEffect(() => {
    const init = async () => {
      const status =
        useCategoryStore.getState()[category]?.items?.[id ?? "_____"];
      handleStatus(status);

      // if (status === "hidden") {
      //   (el as any).style.setProperty("display", "none");
      // } else if (status === "favor") {
      //   (el as any).style.setProperty("background-color", "#FFA500");
      // }

      // const fooo = await storage.getItem<string | null>(
      //   `local:lastepochtools_category`
      // );
      // console.log("********* fooo", fooo);
    };

    if (id === "IIwBj-I") {
      console.log("********* mount ItemUI", el, id);
    }
    init();
  }, []);

  // useEffect(() => {
  //   if (id === "IIwBj-I") {
  //     console.log("********* status change", status);
  //   }
  // }, [status]);

  // items

  const onClick = async (v: IStatus) => {
    // storage.clear("local");

    const xx = useCategoryStore.getState();
    console.log("*********** xx", xx);
    if (id) {
      useCategoryStore.getState().setItem(category, id, v);
    }

    const fooo = await storage.getItem<string | null>(
      `local:lastepochtools_category_4`
    );
    handleStatus(v);
    const fooo3 = await storage.snapshot(`local`);
    console.log("********* fooo", fooo, fooo3);
  };

  const handleStatus = (v?: IStatus) => {
    if (v === "hidden") {
      (el as any).style.setProperty("display", "none");

      // #ADD8E6A0
    } else if (v === "favor") {
      (el as any).style.setProperty("background-color", "#FFC1CC");
    } else {
      (el as any).style.setProperty("background-color", "unset");
      (el as any).style.setProperty("display", "unset");
    }
  };

  if (!id) {
    return null;
  }

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {status && status !== "default" && (
        <button
          style={{ backgroundColor: "#FFA500", color: "#fff !important" }}
          onClick={() => onClick("default")}
        >
          default
        </button>
      )}
      {(!status || status !== "favor") && (
        <button
          style={{ backgroundColor: "#FFA500", color: "#fff !important" }}
          onClick={() => onClick("favor")}
        >
          favor
        </button>
      )}
      {(!status || status !== "hidden") && (
        <button
          style={{ backgroundColor: "#FFA500", color: "#fff !important" }}
          onClick={() => onClick("hidden")}
        >
          hidden
        </button>
      )}
    </div>
  );
};
