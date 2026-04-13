import { useAppContext } from "../AppContext";

export default function Nav() {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <div className="topbar">
      <div className="logo">AUTO<span>HUB</span></div>
      <div className="tabs">
        <button className={`tab${activeTab === "dashboard" ? " active" : ""}`} onClick={() => setActiveTab("dashboard")}>
          Dashboard <span className="badge">Task 1</span>
        </button>
        <button className={`tab${activeTab === "form" ? " active" : ""}`} onClick={() => setActiveTab("form")}>
          Register <span className="badge">Task 2</span>
        </button>
      </div>
    </div>
  );
}
