import React from "react";
import moment from "moment";

const Tabs = ({
  months,
  fShow,
  targetMonth,
  handlePrevMonth,
  handleNextMonth,
  handleTargetMonth
}) => {
  return (
    <div className="tab-wrapper">
      <a
        onClick={handlePrevMonth}
        className="tab-wrapper__prev-btn"
        href="none:"
      ></a>
      <ul className="tab-wrapper__tabs">
        {months.map((month, index) => {
          if (fShow - 1 <= index && index < fShow + 2)
            return (
              <li
                key={index}
                onClick={() => handleTargetMonth(index)}
                className={`tab-wrapper__tab ${
                  targetMonth === index ? "target" : ""
                }`}
              >
                {moment(month).format("YYYY MM[月]")}
                {false && (
                  <span className="tab-wrapper__tab__no-schedule">
                    無出發日
                  </span>
                )}
              </li>
            );
        })}
      </ul>
      <a
        onClick={handleNextMonth}
        className="tab-wrapper__next-btn"
        href="none:"
      ></a>
    </div>
  );
};

export default Tabs;
