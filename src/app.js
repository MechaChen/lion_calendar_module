import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import axios from "axios";
import commaNumber from "comma-number";
import Tabs from "./components/Tabs.jsx";
import WeekDays from "./components/WeekDays.jsx";
import "reset.css/reset.css";
import "./styles/style.scss";

class Calendar extends React.Component {
  state = {
    months: [],
    // Middle Show Month Index
    mMonth: 1,
    targetMonth: 1,
    schedules: [],
    thisMonthSchedules: [],
    firstWeekDay: undefined,
    isList: false,
    curPage: 1
  };

  handlePrevMonth = () => {
    const { mMonth, targetMonth } = this.state;
    this.setState(prevState => {
      if (mMonth > 1)
        return {
          mMonth: prevState.mMonth - 1,
          targetMonth: prevState.mMonth - 1
        };
      else if (targetMonth === 1)
        return { targetMonth: prevState.targetMonth - 1 };
    });
  };

  handleNextMonth = () => {
    const { months, mMonth, targetMonth } = this.state;
    this.setState(prevState => {
      if (mMonth < months.length - 2)
        return {
          mMonth: prevState.mMonth + 1,
          targetMonth: prevState.mMonth + 1
        };
      else if (targetMonth === months.length - 2)
        return { targetMonth: prevState.targetMonth + 1 };
    });
  };

  handleTargetMonth = index => {
    const { months } = this.state;
    if (index >= 1 && index <= months.length - 2) {
      this.setState(() => ({ mMonth: index, targetMonth: index }));
    } else {
      this.setState(() => ({ targetMonth: index }));
    }
  };

  handleTargetSchedule = e => {
    console.log(e.target);
  };

  handleList = () => {
    this.setState(() => ({ isList: !this.state.isList }));
  };

  componentDidMount() {
    const { targetMonth } = this.state;
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
      const firstWeekDay = moment(months[targetMonth])
        .startOf("month")
        .weekday();
      this.setState(() => ({
        schedules,
        months,
        firstWeekDay
      }));
    });
  }

  render() {
    const { schedules, months, mMonth, targetMonth, isList } = this.state;
    const { handlePrevMonth, handleNextMonth, handleTargetMonth } = this;
    const beforeDates = moment(months[targetMonth]).weekday();
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
    const afterDates = 42 - monthDates - beforeDates;
    const arr = thisMonthSchedules.map(schedule =>
      parseInt(moment(schedule.date).format("D"))
    );
    const listArr = thisMonthSchedules.slice(0, 8);
    console.log(listArr);
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
          handlePrevMonth={handlePrevMonth}
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
                if (arr.indexOf(index + 1) > -1) {
                  const schedule = thisMonthSchedules[arr.indexOf(index + 1)];
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
        </div>
      </>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById("calendar"));
