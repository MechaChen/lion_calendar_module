import React from "react";
import ReactDOM from "react-dom";
import "reset.css/reset.css";
import "./styles/style.scss";

class Calendar extends React.Component {
  state = {};
  render() {
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
        <ul className="week-wrapper list">
          <li className="week-wrapper__weekday">星期日</li>
          <li className="week-wrapper__weekday">星期一</li>
          <li className="week-wrapper__weekday">星期二</li>
          <li className="week-wrapper__weekday">星期三</li>
          <li className="week-wrapper__weekday">星期四</li>
          <li className="week-wrapper__weekday">星期五</li>
          <li className="week-wrapper__weekday">星期六</li>
        </ul>
        <div className="schedules list">
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
            <li className="schedules__item">
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
