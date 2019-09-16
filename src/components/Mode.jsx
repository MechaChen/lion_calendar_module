import React from "react";

const Mode = ({ isList, handleList }) => {
  return (
    <div className="mode">
      <button onClick={handleList}>
        <img
          className="mode__pic"
          src={isList ? "./imgs/calendar.png" : "./imgs/list.png"}
          alt="tabs icon"
        />
        <span className="mode__text">
          {isList ? "切換月曆模式" : "切換選單模式"}
        </span>
      </button>
    </div>
  );
};

export default Mode;
