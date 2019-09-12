import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import axios from "axios";
import commaNumber from "comma-number";
import configureStore from "./store/configureStore";
import { handlePrevMonth } from "./actions/tabs";
import Tabs from "./components/Tabs.jsx";
import WeekDays from "./components/WeekDays.jsx";
import "reset.css/reset.css";
import "./styles/style.scss";

const { getState, dispatch } = configureStore();

class Calendar extends React.Component {
  state = getState();

  handleNextMonth = () => {
    const { months } = this.state;
    this.setState(({ mMonth, targetMonth }) => {
      if (mMonth < months.length - 2) {
        return {
          mMonth: mMonth + 1,
          targetMonth: mMonth + 1
        };
      } else if (targetMonth === months.length - 2) {
        return { targetMonth: targetMonth + 1 };
      }
    });
    this.setFirstPage();
  };

  handleTargetMonth = index => {
    const { months } = this.state;
    if (index >= 1 && index <= months.length - 2) {
      this.setState(() => ({ mMonth: index, targetMonth: index }));
    } else {
      this.setState(() => ({ targetMonth: index }));
    }
    this.setFirstPage();
  };

  handleTargetSchedule = e => {
    console.log(e.target);
  };

  handleList = () => {
    this.setState(() => ({ isList: !this.state.isList }));
  };

  handlePrevPage = () => {
    const { curPage } = this.state;
    if (curPage > 1) this.setState(() => ({ curPage: curPage - 1 }));
  };

  handleNextPage = totalPage => {
    const { curPage } = this.state;
    if (curPage < totalPage) this.setState(() => ({ curPage: curPage + 1 }));
  };

  setFirstPage = () => {
    this.setState(() => ({ curPage: 1 }));
  };

  componentDidMount() {
    axios.get("./json/data1.json").then(({ data }) => {
      const schedules = data.reduce(function(all, schedule) {
        const newDate = schedule.date.replace(/\//g, "-");
        return all.concat({ ...schedule, date: newDate });
      }, []);
      let months = [];
      schedules.filter(({ date }) => {
        const month = moment(date).format("YYYY-MM");
        if (months.indexOf(month) === -1) months = [...months, month];
      });
      months.sort((a, b) => (a < b ? -1 : 1));
      this.setState(() => ({
        schedules,
        months
      }));
    });
  }

  render() {
    // state
    const {
      schedules,
      months,
      mMonth,
      targetMonth,
      isList,
      curPage
    } = this.state;

    // Method
    const {
      // handlePrevMonth,
      handleNextMonth,
      handleTargetMonth,
      handlePrevPage,
      handleNextPage
    } = this;

    // 上個月
    const beforeDates = moment(months[targetMonth]).weekday();
    // 本月
    const monthDates = parseInt(
      moment(months[targetMonth])
        .endOf("month")
        .format("DD")
    );
    const thisMonthSchedules = schedules
      .filter(
        schedule =>
          moment(schedule.date).format("YYYY-MM") === months[targetMonth]
      )
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    // 下個月
    const afterDates = 42 - monthDates - beforeDates;
    const thisMonthDates = thisMonthSchedules.map(schedule =>
      parseInt(moment(schedule.date).format("D"))
    );
    const totalPage = Math.ceil(thisMonthSchedules.length / 8);
    const pageList = [];
    for (let i = 0; i < totalPage; i++) {
      const start = i * 8;
      const end = (i + 1) * 8;
      pageList.push(thisMonthSchedules.slice(start, end));
    }
    const start = (curPage - 1) * 8;
    const end = curPage * 8;
    const listArr = thisMonthSchedules.slice(start, end);
    console.log(this.state);

    return (
      <>
        <div className="toggleList">
          <button onClick={this.handleList}>
            {isList ? "切換月曆模式" : "切換選單模式"}
          </button>
        </div>
        <Tabs
          months={months}
          mMonth={mMonth}
          targetMonth={targetMonth}
          handlePrevMonth={() => dispatch(handlePrevMonth)}
          handleNextMonth={handleNextMonth}
          handleTargetMonth={handleTargetMonth}
        />
        {!isList && <WeekDays />}
        <div className="schedules">
          <ul className={`schedules__row ${isList ? "list" : ""}`}>
            {/* 月曆 */}
            {!isList &&
              [...Array(beforeDates)].map((empty, index) => (
                <li
                  key={index}
                  className="schedules__item no-data other-month"
                ></li>
              ))}
            {!isList &&
              [...Array(monthDates).keys()].map((date, index) => {
                if (thisMonthDates.indexOf(index + 1) > -1) {
                  const schedule =
                    thisMonthSchedules[thisMonthDates.indexOf(index + 1)];
                  return (
                    <li key={index} className="schedules__item">
                      <div className="schedules__item__time-info">
                        <span className="schedules__item__time-info__date">
                          {index + 1}
                        </span>
                        <span className="schedules__item__time-info__weekday">
                          {moment(schedule.date)
                            .locale("zh-tw")
                            .format("dddd")}
                        </span>
                        <span
                          className={`schedules__item__time-info__guaranteed ${
                            schedule.guaranteed ? "" : "not-guaran"
                          }`}
                        >
                          {schedule.guaranteed && "成團"}
                        </span>
                      </div>
                      <div className="schedules__item__status-info">
                        <span
                          className={`schedules__item__status-info__status ${
                            schedule.status === "報名" ||
                            schedule.status === "候補" ||
                            schedule.status === "預定"
                              ? "hasChance"
                              : "noChance"
                          }`}
                        >
                          {schedule.status}
                        </span>
                        <span>可賣：{schedule.availableVancancy}</span>
                        <span>團位：{schedule.totalVacnacy}</span>
                        {schedule.guaranteed && (
                          <span className="schedules__item__status-info__guaranteed">
                            成團
                          </span>
                        )}
                        <span className="schedules__item__status-info__price">
                          ${commaNumber(schedule.price)}
                        </span>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="schedules__item no-data">
                      <div className="schedules__item__time-info">
                        <span className="schedules__item__time-info__date">
                          {index + 1}
                        </span>
                        <span className="schedules__item__time-info__weekday">
                          星期四
                        </span>
                        <span className="schedules__item__time-info__guaranteed not-enough">
                          成團
                        </span>
                      </div>
                    </li>
                  );
                }
              })}
            {!isList &&
              [...Array(afterDates)].map((empty, index) => (
                <li
                  key={index}
                  className="schedules__item no-data other-month"
                ></li>
              ))}
            {/* 列表 */}
            {isList &&
              listArr.map((schedule, index) => (
                <li key={index} className="schedules__item">
                  <div className="schedules__item__time-info">
                    <span className="schedules__item__time-info__date">
                      {moment(schedule.date).format("D")}
                    </span>
                    <span className="schedules__item__time-info__weekday">
                      {moment(schedule.date)
                        .locale("zh-tw")
                        .format("dddd")}
                    </span>
                    {schedule.guaranteed && (
                      <span className="schedules__item__time-info__guaranteed">
                        成團
                      </span>
                    )}
                  </div>
                  <div className="schedules__item__status-info">
                    <span
                      className={`schedules__item__status-info__status ${
                        schedule.status === "報名" ||
                        schedule.status === "候補" ||
                        schedule.status === "預定"
                          ? "hasChance"
                          : "noChance"
                      }`}
                    >
                      {schedule.status}
                    </span>
                    <span>可賣：{schedule.availableVancancy}</span>
                    <span>團位：{schedule.totalVacnacy}</span>
                    <span className="schedules__item__status-info__guaranteed">
                      {schedule.guaranteed && "成團"}
                    </span>
                    <span className="schedules__item__status-info__price">
                      ${commaNumber(schedule.price)}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
          {isList && (
            <div className="schedule__pagination">
              <span
                className="schedule__pagination__btn"
                onClick={() => handlePrevPage()}
              >
                上一頁
              </span>
              <span>
                {curPage}/{totalPage}
              </span>
              <span
                className="schedule__pagination__btn"
                onClick={() => handleNextPage(totalPage)}
              >
                下一頁
              </span>
            </div>
          )}
        </div>
      </>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById("calendar"));
