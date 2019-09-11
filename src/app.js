import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import axios from "axios";
import Tabs from "./components/Tabs.jsx";
import Weeks from "./components/Weeks.jsx";
import "reset.css/reset.css";
import "./styles/style.scss";

class Calendar extends React.Component {
  state = {
    months: [],
    // Middle Show Month Index
    fShow: 1,
    targetMonth: 1
  };

  handlePrevMonth = () => {
    this.setState(prevState => {
      if (this.state.fShow > 1)
        return { fShow: prevState.fShow - 1, targetMonth: prevState.fShow - 1 };
    });
  };

  handleNextMonth = () => {
    const { months, fShow } = this.state;
    this.setState(prevState => {
      if (fShow < months.length - 2)
        return { fShow: prevState.fShow + 1, targetMonth: prevState.fShow + 1 };
    });
  };

  handleTargetMonth = index => {
    const { months, fShow } = this.state;
    console.log(fShow, index);
    if (index >= 1 && index <= months.length - 2) {
      this.setState(() => ({ fShow: index, targetMonth: index }));
    } else {
      this.setState(() => ({ targetMonth: index }));
    }
  };

  componentDidMount() {
    axios.get("./json/data1.json").then(({ data }) => {
      let months = [];
      data.filter(({ date }) => {
        const month = moment(date.replace(/\//g, "-")).format("YYYY-MM");
        if (months.indexOf(month) === -1) months = [...months, month];
      });
      months.sort((a, b) => (a < b ? -1 : 1));
      this.setState(() => ({ months }));
    });
  }
  render() {
    const { months, fShow, targetMonth } = this.state;
    const { handlePrevMonth, handleNextMonth, handleTargetMonth } = this;
    return (
      <>
        <Tabs
          months={months}
          fShow={fShow}
          targetMonth={targetMonth}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleTargetMonth={handleTargetMonth}
        />
        <Weeks />
        <div className="schedules">
          {/* 第一周 */}
          <ul className="schedules__row">
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">1</span>
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
            <li className="schedules__item no-data">
              <div className="schedules__item__time-info">
                <span className="schedules__item__time-info__date">2</span>
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
                <span className="schedules__item__time-info__date">3</span>
                <span className="schedules__item__time-info__weekday">
                  星期四
                </span>
                <span className="schedules__item__time-info__guaranteed">
                  成團
                </span>
              </div>
              <div className="schedules__item__status-info">
                <span className="schedules__item__status-info__status hasChance">
                  預定
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
          </ul>
          {/* 第二周 */}
          <ul className="schedules__row">
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
          </ul>
          {/* 第三周 */}
          <ul className="schedules__row">
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
          {/* 第四周 */}
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
          </ul>
          {/* 第五周 */}
          <ul className="schedules__row">
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
          </ul>
          {/* 第六周 */}
          <ul className="schedules__row">
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
            <li className="schedules__item no-data other-month"></li>
          </ul>
        </div>
      </>
    );
  }
}

ReactDOM.render(<Calendar />, document.getElementById("calendar"));
