import { IGlobalStatus, IStatus } from "@/entrypoints/content/shared/types";
import { useCategoryStore } from "@/entrypoints/content/shared/useCategoryStore";

export const GlobalStatus = () => {
  const [status, setStatus] = useState<IGlobalStatus>("default");

  useEffect(() => {
    const init = async () => {
      const newStatus = useCategoryStore.getState().globalStatus;

      setStatus(newStatus);
    };

    init();
  }, []);

  const onClick = async (v: IGlobalStatus) => {
    useCategoryStore.getState().setGlobalStatus(v);
    setStatus(v);

    await browser.runtime.sendMessage({ update: true });
  };

  return (
    <div
      style={{ height: "100%", display: "flex", alignItems: "center", gap: 0 }}
    >
      <div
        style={{
          width: 60,
          height: 30,
          backgroundColor: status === "default" ? "#FFFF99" : "#fff",
          border: "1px solid #000",
          cursor: "pointer",
        }}
        onClick={() => onClick("default")}
      >
        Default
      </div>
      <div
        style={{
          width: 60,
          height: 30,
          backgroundColor: status === "favor" ? "#FFFF99" : "#fff",
          border: "1px solid #000",
          cursor: "pointer",
        }}
        onClick={() => onClick("favor")}
      >
        Favor
      </div>
      <div
        style={{
          width: 60,
          height: 30,
          backgroundColor: status === "all" ? "#FFFF99" : "#fff",
          border: "1px solid #000",
          cursor: "pointer",
        }}
        onClick={() => onClick("all")}
      >
        All
      </div>
    </div>
  );
};
