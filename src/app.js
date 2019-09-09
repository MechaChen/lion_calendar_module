import React from "react";
import ReactDOM from "react-dom";
import "reset.css/reset.css";
import "./styles/style.scss";

class Calendar extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="tab-wrapper">
          <a className="tab-wrapper__prev-btn" href="none:"></a>
          <ul className="tab-wrapper__tabs">
            <li className="tab-wrapper__tab">2017 5月</li>
            <li className="tab-wrapper__tab">2017 6月</li>
            <li className="tab-wrapper__tab target">2017 7月</li>
          </ul>
          <a className="tab-wrapper__next-btn" href="none:"></a>
        </div>
        <ul className="week-wrapper">
          <li className="week-wrapper__weekday">星期日</li>
          <li className="week-wrapper__weekday">星期一</li>
          <li className="week-wrapper__weekday">星期二</li>
          <li className="week-wrapper__weekday">星期三</li>
          <li className="week-wrapper__weekday">星期四</li>
          <li className="week-wrapper__weekday">星期五</li>
          <li className="week-wrapper__weekday">星期六</li>
        </ul>
        <div className="schedules">
          <ul className="schedules__row">
            <li className="schedules__item no-data"></li>
            <li className="schedules__item no-data"></li>
            <li className="schedules__item no-data"></li>
            <li className="schedules__item no-data"></li>
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">1</span>
                <span className="schedules__item__time-info__weeday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status--waiting">
                  候補
                </span>
                <span>可賣：0</span>
                <span>團位：20</span>
                <span className="schedules__item__status-info__guaranteed">
                  成團
                </span>
                <span className="schedules__item__status-info__price">
                  $234,567
                </span>
              </div>
            </li>
            <li className="schedules__item no-data"></li>
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">1</span>
                <span className="schedules__item__time-info__weeday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status"></span>
                <span>可賣：0</span>
                <span>團位：20</span>
                <span className="schedules__item__status-info__guaranteed">
                  成團
                </span>
                <span className="schedules__item__status-info__price">
                  $234,567
                </span>
              </div>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById("calendar"));
