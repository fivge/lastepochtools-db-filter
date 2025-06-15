import {
  IGlobalStatus,
  IStatus,
  ITab,
} from "@/entrypoints/content/shared/types";
import { useCategoryStore } from "@/entrypoints/content/shared/useCategoryStore";

interface IProps {
  el: Element;
  category: string;
  tab: ITab;
  id: string | null;
}

export const ItemUI = (props: IProps) => {
  const { el, category, tab, id } = props;

  const [status, setStatus] = useState<IStatus>();
  const [globalStatus, setGlobalStatus] = useState<IGlobalStatus>();

  useEffect(() => {
    const init = async () => {
      const newStatus =
        useCategoryStore.getState()[category]?.[tab]?.[id ?? "_____"];

      setStatus(newStatus);

      const newGlobalStatus = useCategoryStore.getState().globalStatus;

      setGlobalStatus(newGlobalStatus);
    };

    browser.runtime.onMessage.addListener((message, _, sendResponse) => {
      if (message?.update === true) {
        const newGlobalStatus = useCategoryStore.getState().globalStatus;

        setGlobalStatus(newGlobalStatus);
        sendResponse({ status: "success" });
      }

      return true;
    });

    init();
  }, []);

  useEffect(() => {
    handleStatus();
  }, [status, globalStatus]);

  const onClick = async (newStatus: IStatus) => {
    if (id) {
      switch (tab) {
        case "items":
          useCategoryStore.getState().setItem(category, id, newStatus);
          break;
        case "prefixes":
          useCategoryStore.getState().setPrefix(category, id, newStatus);
          break;
        case "suffixes":
          useCategoryStore.getState().setSuffix(category, id, newStatus);
          break;
        default:
          break;
      }
    }

    setStatus(newStatus);
  };

  const handleStatus = () => {
    if (status === "hidden") {
      (el as any).style.setProperty("display", "none");
      (el as any).style.setProperty("background-color", "#ADD8E6A0");
    } else if (status === "favor") {
      (el as any).style.setProperty("background-color", "#FFC1CCA0");
    } else {
      (el as any).style.setProperty("background-color", "unset");
      (el as any).style.setProperty("display", "unset");
    }

    if (globalStatus === "all") {
      (el as any).style.setProperty("display", "unset");
    } else if (globalStatus === "favor") {
      if (status !== "favor") {
        (el as any).style.setProperty("display", "none");
      }
    } else {
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
