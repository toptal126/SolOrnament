import React from "react";
import { usePriceStore } from "@stores/priceStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PriceChartModalProps {
  open: boolean;
  onClose: () => void;
}

const PriceChartModal: React.FC<PriceChartModalProps> = ({ open, onClose }) => {
  const priceHistory = usePriceStore((s) => s.priceHistory);

  if (!open) return null;

  // Format data for recharts
  const data = priceHistory.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    price: point.price,
  }));

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3>SOL Price Chart</h3>
        <div className="chart-container">
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" minTickGap={30} />
              <YAxis domain={["auto", "auto"]} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00d1b2"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PriceChartModal;
