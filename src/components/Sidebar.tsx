import React from "react";
import { NavLink } from "react-router-dom";

const tools = [
  { key: "wallet", label: "Wallet Scanner", icon: "💼", path: "/wallet" },
  { key: "alerts", label: "Price Alerts", icon: "🔔", path: "/alerts" },
];
const settingsTool = {
  key: "settings",
  label: "Settings",
  icon: "⚙️",
  path: "/settings",
};

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar flex flex-col justify-between h-full min-h-screen bg-[#181a20]">
      <div>
        <NavLink
          to="/"
          className="sidebar-title text-[#00d1b2] font-bold text-lg"
        >
          SolOrnament
        </NavLink>
        <ul>
          {tools.map((tool) => (
            <li key={tool.key}>
              <NavLink
                key={tool.key}
                to={tool.path}
                className={({ isActive }) => ` ${isActive ? "active" : ""}`}
              >
                <span className="icon text-xl">{tool.icon}</span>
                <span className="label">{tool.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <ul>
        <li>
          <NavLink
            to={settingsTool.path}
            className={({ isActive }) =>
              `sidebar-link flex items-center gap-3 px-6 py-3 rounded-lg cursor-pointer mb-1 transition-colors ${
                isActive ? "sidebar-link--active" : ""
              }`
            }
          >
            <span className="icon text-xl">{settingsTool.icon}</span>
            <span className="label">{settingsTool.label}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
