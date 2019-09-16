import React from 'react';
import commaNumber from "comma-number";
import moment from 'moment';
import { connect } from 'react-redux';

const Schedules = ({
    isList,
    months,
    targetMonth,
    schedules,
    curPage,
    targetItem,
    getMonthSchedules,
    handleClickDate,
    handlePrevPage,
    handleNextPage
}) => {
    // Last month
    const beforeDates = moment(months[targetMonth]).weekday();

    // This month
    //  __dates
    const monthDates = parseInt(
      moment(months[targetMonth])
        .endOf("month")
        .format("DD")
    );

    //  __schedules
    const monthSchedules = getMonthSchedules(schedules);

    //  __schedules dates
    const monthSchedulesDates = 
      monthSchedules.map(schedule =>
        parseInt(moment(schedule.date).format("D"))
      );

    //  __schedules of each page
    const totalPage = Math.ceil(monthSchedules.length / 8);
    const pageList = [];
    for (let i = 0; i < totalPage; i++) {
      const start = i * 8;
      const end = (i + 1) * 8;
      pageList.push(monthSchedules.slice(start, end));
    }
    const start = (curPage - 1) * 8;
    const end = curPage * 8;
    const listArr = monthSchedules.slice(start, end);

    // Next month
    const afterDates = 42 - monthDates - beforeDates;
    return (
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
                if (monthSchedulesDates.indexOf(index + 1) > -1) {
                  const schedule =
                    monthSchedules[monthSchedulesDates.indexOf(index + 1)];
                  return (
                    <li 
                      key={index} 
                      className={`schedules__item ${index === targetItem ? "target" : ""}`}
                      onClick={e => handleClickDate(e, index, schedule)}
                    >
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
                          className={`schedules__item__time-info__guaranteed 
                            ${schedule.guaranteed ? "" : "not-guaran"}`
                          }
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
                  className={`
                    schedules__item 
                    no-data 
                    other-month
                  `}
                ></li>
              ))}
            {/* 列表 */}
            {isList &&
              listArr.map((schedule, index) => (
                <li 
                  key={index} 
                  className={`schedules__item ${index === targetItem ? "target" : ""}`}
                  onClick={e => handleClickDate(e, index)}
                >
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
                      className={`
                        schedules__item__status-info__status 
                        ${schedule.status === "報名" ||
                          schedule.status === "候補" ||
                          schedule.status === "預定"
                          ? "hasChance" : "noChance"
                        }`
                      }
                    >
                      {schedule.status}
                    </span>
                    <span>
                      可賣：{schedule.availableVancancy}
                    </span>
                    <span>
                      團位：{schedule.totalVacnacy}
                    </span>
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
                className={`
                  schedule__pagination__btn--prev
                  ${curPage === 1 ? 'edge' : ''}
                `}
                onClick={() => handlePrevPage()}
              >
                上一頁
              </span>
              <span className="schedule__pagination__cur-page">
                {curPage}/ {totalPage}
              </span>
              <span
                className={`
                  schedule__pagination__btn--next
                  ${curPage === totalPage ? 'edge' : ''}
                `}
                onClick={() => handleNextPage(totalPage)}
              >
                下一頁
              </span>
            </div>
          )}
        </div>
    );
}

const mapStateToProps = (
  {isList, months, targetMonth, schedules, curPage, targetItem}
) => ({
    isList,
    months,
    targetMonth,
    schedules,
    curPage,
    targetItem,
  })

export default connect(mapStateToProps)(Schedules);