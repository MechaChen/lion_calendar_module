import React from "react";

const Tabs = () => {
  return (
    <>
      <div className="tab-wrapper">
        <a className="tab-wrapper__prev-btn" href="none:"></a>
        <ul className="tab-wrapper__tabs">
          <li className="tab-wrapper__tab">2017 5月</li>
          <li className="tab-wrapper__tab">2017 6月</li>
          <li className="tab-wrapper__tab target">
            2017 7月
            <span className="tab-wrapper__tab__no-schedule">無出發日</span>
          </li>
        </ul>
        <a className="tab-wrapper__next-btn" href="none:"></a>
      </div>
    </>
  );
};

export default Tabs;
