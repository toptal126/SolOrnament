import React, { useState } from "react";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import { useMainLayoutStore } from "../stores/mainLayoutStore";

// Placeholder imports for tool cards
import PriceAlerts from "./PriceAlerts";
import WalletScanner from "./WalletScanner";
import PriceChartModal from "./PriceChartModal";

const MainLayout: React.FC = () => {
  const { selectedTool, setSelectedTool } = useMainLayoutStore();
  const [showPriceChart, setShowPriceChart] = useState(false);

  // Placeholder for main content
  let mainContent: React.ReactNode = null;
  if (selectedTool === "wallet") {
    mainContent = (
      <div className="card">
        <WalletScanner />
      </div>
    );
  } else if (selectedTool === "alerts") {
    mainContent = (
      <div className="card">
        <PriceAlerts />
      </div>
    );
  } else if (selectedTool === "settings") {
    mainContent = <div className="card">Settings (TODO)</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar selected={selectedTool} onSelect={setSelectedTool} />
      <div className="main-content">
        <StatusBar onPriceClick={() => setShowPriceChart(true)} />
        <div className="tool-content">{mainContent}</div>
        <PriceChartModal
          open={showPriceChart}
          onClose={() => setShowPriceChart(false)}
        />
        {/* TODO: SettingsModal */}
      </div>
    </div>
  );
};

export default MainLayout;
