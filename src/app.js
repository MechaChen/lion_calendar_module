import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import axios from "axios";
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
    firstWeekDay: undefined
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
    const { schedules, months, mMonth, targetMonth } = this.state;
    const { handlePrevMonth, handleNextMonth, handleTargetMonth } = this;
    const beforeDates = moment(months[targetMonth]).weekday();
    const monthDates = parseInt(
      moment(months[targetMonth])
        .endOf("month")
        .format("DD")
    );
    console.log(monthDates);
    const thisMonthSchedules = schedules
      .filter(
        schedule =>
          moment(schedule.date).format("YYYY-MM") === months[targetMonth]
      )
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    console.log(thisMonthSchedules);
    const afterDates = 42 - monthDates - beforeDates;
    const arr = thisMonthSchedules.map(schedule =>
      parseInt(moment(schedule.date).format("D"))
    );
    console.log(arr);
    return (
      <>
        <Tabs
          months={months}
          mMonth={mMonth}
          targetMonth={targetMonth}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleTargetMonth={handleTargetMonth}
        />
        <WeekDays />
        <div className="schedules">
          {/* 第一周 */}

          {/* 第二周 */}
          <ul className="schedules__row">
            {[...Array(beforeDates)].map((empty, index) => (
              <li
                key={index}
                className="schedules__item no-data other-month"
              ></li>
            ))}
            {[...Array(monthDates).keys()].map((date, index) => {
              if (arr.indexOf(index + 1) > -1) {
                return (
                  <li key={index} className="schedules__item">
                    <div className="schedules__item__time-info">
                      <span className="schedules__item__time-info__date">
                        {index + 1}
                      </span>
                      <span className="schedules__item__time-info__weekday">
                        星期四
                      </span>
                      <span className="schedules__item__time-info__guaranteed">
                        成團
                      </span>
                    </div>
                    <div className="schedules__item__status-info">
                      <span className="schedules__item__status-info__status hasChance">
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
            {[...Array(afterDates)].map((empty, index) => (
              <li
                key={index}
                className="schedules__item no-data other-month"
              ></li>
            ))}
          </ul>
          {/* <ul className="schedules__row">
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">4</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status hasChance">
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
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">5</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status hasChance">
                  請洽專員
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
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">6</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item target">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">7</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status noChance">
                  關團
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
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">8</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">9</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status noChance">
                  額滿
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
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">10</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">11</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">12</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status hasChance">
                  候補
                </span>
                <span>可賣：0</span>
                <span>團位：20</span>
                <span className="schedules__item__status-info__guaranteed ">
                  成團
                </span>
                <span className="schedules__item__status-info__price">
                  $234,567
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">13</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">14</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">15</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">16</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">17</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
          </ul>
          <ul className="schedules__row">
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">18</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">19</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">20</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">21</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">22</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">23</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">24</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">25</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">26</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">27</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">28</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">29</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">30</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed not-enough">
                  成團
                </span>
              </div>
            </li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
          </ul> */}
        </div>
      </>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById("calendar"));
