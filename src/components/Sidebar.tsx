import React from "react";

const tools = [
  { key: "wallet", label: "Wallet Scanner", icon: "💼" },
  { key: "alerts", label: "Price Alerts", icon: "🔔" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

interface SidebarProps {
  selected: string;
  onSelect: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-title">Tools</div>
      <ul>
        {tools.map((tool) => (
          <li
            key={tool.key}
            className={selected === tool.key ? "active" : ""}
            onClick={() => onSelect(tool.key)}
          >
            <span className="icon">{tool.icon}</span>
            <span className="label">{tool.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
