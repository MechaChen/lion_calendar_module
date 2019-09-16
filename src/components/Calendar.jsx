import React from "react";
import moment from "moment";
import axios from "axios";
import Mode from "./Mode.jsx";
import Tabs from "./Tabs.jsx";
import WeekDays from "./WeekDays.jsx";
import Schedules from './Schedules.jsx';
import { getSchedules } from '../actions/data';
import { connect } from "react-redux";

class Calendar extends React.Component {
  state = {
    months: [],
    // Middle Show Month Index
    mMonth: 1,
    targetMonth: 1,
    schedules: [],
    isList: false,
    curPage: 1,
    targetItem: undefined
  };

//   handlePrevMonth = e => {
//     const { mMonth, targetMonth } = this.state;
//     if (mMonth > 1) 
//       this.setState({
//         mMonth: mMonth - 1,
//         targetMonth: mMonth - 1
//       });
//     else if (targetMonth === 1) 
//       this.setState({ 
//         targetMonth: targetMonth - 1 
//       });

//     const monthSchedules = this.getMonthSchedules();
//     this.props.onClickPrev(e.target, monthSchedules);
//   };

//   handleNextMonth = e => {
//     const { months, mMonth, targetMonth } = this.state;
//     if (mMonth < months.length - 2) 
//       this.setState({
//         mMonth: mMonth + 1,
//         targetMonth: mMonth + 1
//       })
//     else if (targetMonth === months.length - 2) 
//       this.setState({
//         targetMonth : targetMonth + 1
//       })
//     this.setFirstPage();
    
//     const monthSchedules = this.getMonthSchedules();
//     this.props.onClickNext(e.target, monthSchedules);
//   };

  handleTargetMonth = index => {
    const { months } = this.state;
    if (index >= 1 && index <= months.length - 2) 
      this.setState(() => ({ mMonth: index, targetMonth: index }));
    else 
      this.setState(() => ({ targetMonth: index }));
    
    this.setFirstPage();
  };

  handleClickDate = (e, index, schedule) => {
    this.props.onClickDate(e.target, schedule);
    this.setState({ targetItem: index });
  };

  handleList = () => {
    this.setState(() => ({
      isList: !this.state.isList,
      targetItem: undefined 
    }));
  };

  handlePrevPage = () => {
    const { curPage } = this.state;
    if (curPage > 1) 
      this.setState(() => ({ curPage: curPage - 1 }));
  };

  handleNextPage = totalPage => {
    const { curPage } = this.state;
    if (curPage < totalPage) 
      this.setState(() => ({ curPage: curPage + 1 }));
  };

  setFirstPage = () => {
    this.setState(() => ({ curPage: 1, targetItem: undefined }));
  };

  renameKeys = (keysMap, obj) => {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
      }), {}
    );
  }

  formatSchedules = (data) => {
    return data.reduce( (all, schedule) => {
      schedule = this.renameKeys(this.props.dataKeySetting, schedule);
      const newDate = schedule.date.replace(/\//g, "-");
      return all.concat({ ...schedule, date: newDate });
    }, []);
  }

  getMonth = (schedules) => {
    let months = [];
    schedules.filter(({ date }) => {
      const month = moment(date).format("YYYY-MM");
      if (months.indexOf(month) === -1) months = [...months, month];
    });
    return months.sort((a, b) => (a < b ? -1 : 1));
  }

  getMonthSchedules = () => {
    const { schedules, months, targetMonth } = this.props;
    return (
      schedules
        .filter(schedule =>
          moment(schedule.date).format("YYYY-MM") 
          === months[targetMonth])
        .sort((a, b) => (a.date < b.date ? -1 : 1))
    );
  }

  getYearMonth = (months) => {
    const { initYearMonth } = this.props;
    const formedInitYearMonth = 
      `${initYearMonth.substr(0, 4)}-${initYearMonth.substr(4)}`;

    let targetMonth;
    if(months.indexOf(formedInitYearMonth) > -1) {
      targetMonth = months.indexOf(formedInitYearMonth);
      mMonth = months.indexOf(formedInitYearMonth);
    } else {
      const diffs = months
      .map(month => (
        moment(formedInitYearMonth).diff(month, 'month')
        ))
      .sort((a, b) => Math.abs(a) < Math.abs(b) ? -1 : 1);

      targetMonth = months.indexOf(
        moment(formedInitYearMonth)
        .subtract(diffs[0], 'month')
        .format('YYYY-MM')
      );
    }

    let mMonth;
    if(targetMonth === months.length - 1) {
      mMonth = targetMonth - 1;
    } else if(targetMonth === 0) {
      mMonth = targetMonth + 1;
    } else {
      mMonth = targetMonth;
    }

    return { targetMonth, mMonth };
  }

  // Console requests
  prevMonth = () => {
    const { mMonth, targetMonth } = this.state;
    if (mMonth > 1) 
    this.setState({
      mMonth: mMonth - 1,
      targetMonth: mMonth - 1
    });
    else if (targetMonth === 1) 
    this.setState({ 
      targetMonth: targetMonth - 1 
    });

    const monthSchedules = this.getMonthSchedules();
    console.log(monthSchedules);
  }

  nextMonth = () => {
    const { months, mMonth, targetMonth } = this.state;

    if (mMonth < months.length - 2) 
      this.setState({
        mMonth: mMonth + 1,
        targetMonth: mMonth + 1
      })
    else if (targetMonth === months.length - 2) 
      this.setState({
        targetMonth : targetMonth + 1
      })
    this.setFirstPage();
    
    const monthSchedules = this.getMonthSchedules();
    console.log(monthSchedules);
  };

  switch = () => {
    this.setState((prevState) => ({ isList: !prevState.isList }))
  }

  inputData = (data) => {
    const formedData = this.formatSchedules(data);
    const newSchedules = [ ...this.state.schedules, ...formedData ];
    const months = this.getMonth(newSchedules);

    this.setState(() => ({ schedules: newSchedules, months }));
  }

  componentDidMount() {
    const { dataSource, dispatch } = this.props;
    // get all schedules
    if(typeof dataSource === 'string') {
      axios.get(this.props.dataSource).then(({ data }) => {
        const schedules = this.formatSchedules(data);
        const months = this.getMonth(schedules);
        const targetMonths = this.getYearMonth(months);
        dispatch(getSchedules({ schedules, months, ...targetMonths }));
      });
    } else {
      const schedules = this.formatSchedules(dataSource);
      const months = this.getMonth(schedules);
      const targetMonths = this.getYearMonth(months);
      dispatch(getSchedules({ schedules, months, ...targetMonths }));
    }
  }


  render() {
    // state
    const { 
      schedules, 
      months, 
      mMonth, 
      targetMonth, 
      isList, 
      curPage, 
      targetItem 
    } = this.state;

    // Method
    const { 
      handleList, 
      handlePrevMonth, 
      handleNextMonth, 
      handleTargetMonth, 
      handleClickDate, 
      handlePrevPage, 
      handleNextPage, 
      getMonthSchedules 
    } = this;


    return (
      <>
        <Mode 
          handleList={handleList} 
          isList={isList} 
        />
        <Tabs
          months={months}
          mMonth={mMonth}
          targetMonth={targetMonth}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleTargetMonth={handleTargetMonth}
        />
        {!isList && 
          <WeekDays />
        }
        <Schedules 
          isList={isList}
          months={months}
          targetMonth={targetMonth}
          schedules={schedules}
          curPage={curPage}
          targetItem={targetItem}
          getMonthSchedules={getMonthSchedules}
          handleClickDate={handleClickDate}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </>
    );
  }
}

Calendar.defaultProps = {
  initYearMonth: '200105',
  dataSource: "./json/data1.json",
  dataKeySetting: {
    certain: "guaranteed",
    date: "date",
    price: "price",
    onsell: "availableVancancy",
    total: "totalVacnacy",
    state: "status"
  },
  onClickPrev: ($btn, data) => {
    console.log($btn, data);
  },
  onClickNext: ($btn, data) => {
    console.log($btn, data);
  },
  onClickDate: ($date, data) => {
    console.log($date, data);
  }
}

const mapStateToProps = ({schedules, months, targetMonth}) => ({
    schedules,
    months,
    targetMonth
})

export default connect(mapStateToProps)(Calendar);