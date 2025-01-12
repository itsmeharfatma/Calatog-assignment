import React, { useState } from "react";
import ChartComponent from "./ChartComponent";
import { TAB_MAP } from "./constants";

const TabSwitcher = ({ activeTab, setActiveTab }) => {
  const activeClass = "text-[#1A243A] border-b-[3px] border-b-[#4B40EE]";

  return (
    <div className="flex justify-start gap-4 border-b border-[#EFF1F3] overflow-x-scroll no-scrollbar text-sm mt-8 mb-4">
      {Object.values(TAB_MAP).map((tab) => (
        <button
          className={`px-2 font-semibold pb-4 pt-1 ${
            activeTab === tab ? activeClass : "text-[#6F7177]"
          }`}
          onClick={() => setActiveTab(tab)}
          key={tab}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Chart");

  const ACTIVE_TAB_COMPONENT_MAP = {
    Summary: <div>Summary</div>,
    Chart: <ChartComponent />,
    Statistics: <div>Statistics</div>,
    Analysis: <div>Analysis</div>,
    Settings: <div>Settings</div>,
  };

  return (
    <div>
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mx-1 mt-2">{ACTIVE_TAB_COMPONENT_MAP[activeTab]}</div>
    </div>
  );
};

export default Tabs;
