import MainLayout from "./components/MainLayout";
import { useEffect } from "react";
import { startPricePolling, stopPricePolling } from "@services/priceService";
import { useSettingsStore } from "@stores/settingsStore";

function App() {
  const priceUpdateInterval = useSettingsStore((s) => s.priceUpdateInterval);

  useEffect(() => {
    startPricePolling(priceUpdateInterval);
    return () => stopPricePolling();
  }, [priceUpdateInterval]);

  return <MainLayout />;
}

export default App;
