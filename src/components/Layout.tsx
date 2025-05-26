import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import PriceChartModal from "./PriceChartModal";

const Layout: React.FC = () => {
  const [showPriceChart, setShowPriceChart] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <StatusBar onPriceClick={() => setShowPriceChart(true)} />
        <div className="tool-content">
          <Outlet />
        </div>
        <PriceChartModal
          open={showPriceChart}
          onClose={() => setShowPriceChart(false)}
        />
      </div>
    </div>
  );
};

export default Layout;
