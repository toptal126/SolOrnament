import React from "react";

const tools = [
  { key: "wallet", label: "Wallet Scanner", icon: "💼" },
  { key: "alerts", label: "Price Alerts", icon: "🔔" },
];
const settingsTool = { key: "settings", label: "Settings", icon: "⚙️" };

interface SidebarProps {
  selected: string;
  onSelect: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  return (
    <nav className="sidebar flex flex-col justify-between h-full min-h-screen bg-[#181a20]">
      <div>
        <div className="sidebar-title text-[#00d1b2] font-bold text-lg">
          SolOrnament
        </div>
        <ul>
          {tools.map((tool) => (
            <li
              key={tool.key}
              className={`flex items-center gap-3 rounded-lg cursor-pointer mb-1 transition-colors ${
                selected === tool.key ? "active" : ""
              }`}
              onClick={() => onSelect(tool.key)}
            >
              <span className="icon text-xl">{tool.icon}</span>
              <span className="label">{tool.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        <li
          className={`flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer mb-1 transition-colors ${
            selected === settingsTool.key
              ? "bg-[#00d1b2] text-white"
              : "hover:bg-[#23272f] text-[#b0b8c1]"
          }`}
          onClick={() => onSelect(settingsTool.key)}
        >
          <span className="icon text-xl">{settingsTool.icon}</span>
          <span className="label">{settingsTool.label}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
