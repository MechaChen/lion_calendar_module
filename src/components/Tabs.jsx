import React from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { handlePrevMonth, handleNextMonth, handleTargetMonth } from '../actions/tabs';

const Tabs = ({ 
    dispatch,
    months, 
    mMonth, 
    targetMonth, 
    // handlePrevMonth, 
    // handleNextMonth, 
    // handleTargetMonth 
  }) => {
    return (
      <div className="tab-wrapper">
        <a
          onClick={() => dispatch(handlePrevMonth())}
          className="tab-wrapper__prev-btn"
          href="none:"
        ></a>
        <ul className="tab-wrapper__tabs">
          {months.map((month, index) => {
            if (mMonth - 1 <= index && index < mMonth + 2)
              return (
                <li
                  key={index}
                  onClick={() => dispatch(handleTargetMonth(index))}
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
          onClick={() => dispatch(handleNextMonth())}
          className="tab-wrapper__next-btn"
          href="none:"
        ></a>
      </div>
    );
};

const mapStateToProps = ({months, targetMonth, mMonth}) => ({
  months,
  targetMonth,
  mMonth
})

export default connect(mapStateToProps)(Tabs);
