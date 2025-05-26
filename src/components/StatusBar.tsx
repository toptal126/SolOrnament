import React from "react";

import ProgressCircleLoader from "./ProgressCircleLoader";
import { usePriceStore } from "@stores/priceStore";
// import ThemeToggle from "./ThemeToggle";

interface StatusBarProps {
  onPriceClick: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ onPriceClick }) => {
  const currentPrice = usePriceStore((state) => state.currentPrice);

  return (
    <header className="status-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <div
          className="sol-price-indicator"
          onClick={onPriceClick}
          title="Show SOL price chart"
        >
          <ProgressCircleLoader duration={20000} />
          <span className="sol-label">SOL:</span>
          <span className="sol-price">
            {currentPrice !== null
              ? `$${currentPrice.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}`
              : "—"}
          </span>
        </div>
        {/* <div className="status-bar-actions">
          <ThemeToggle />
        </div> */}
      </div>
    </header>
  );
};

export default StatusBar;
