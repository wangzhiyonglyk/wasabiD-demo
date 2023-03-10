/*
create by 王志勇
date:2016-05-20
desc:日期范围选择控件
edit 20-22-09-22 改成hook
 */
import React, { memo, useCallback } from "react";
import CalendarView from "./Calendar/CalendarView";
import DateRangeHoc from "./DateRangeHoc";
import func from "../../libs/func";
function DateRange(props) {
  const onClick = useCallback((type) => {
    let secondDate = new Date();
    let firstDate;
    switch (type) {
      case 1:
        firstDate = func.getNextDay(secondDate, -1);
        break;
      case 2:
        firstDate = func.getNextDay(secondDate, -7);
        break;
      case 3:
        firstDate = func.getNextMonth(secondDate, -1);
        break;
      case 4:
        firstDate = func.getNextMonth(secondDate, -3);
        break;
      case 5:
        firstDate = func.getNextYear(secondDate, -1);
        break;
      default:
        break;
    }
    let value =
      func.dateformat(firstDate, "yyyy-MM-dd") +
      "," +
      func.dateformat(secondDate, "yyyy-MM-dd");
    props.onSelect && props.onSelect(value, value, props.name);
  }, []);
  return (
    <React.Fragment>
      <div className="wasabi-date-qick">
        <a key="1" onClick={onClick.bind(this, 1)}>
          最近一天
        </a>
        <a key="2" onClick={onClick.bind(this, 2)}>
          最近一周
        </a>
        <a key="3" onClick={onClick.bind(this, 3)}>
          最近一月
        </a>
        <a key="4" onClick={onClick.bind(this, 4)}>
          最近三个月
        </a>
        <a key="5" onClick={onClick.bind(this, 5)}>
          {" "}
          最近一年
        </a>
      </div>
      <CalendarView
        isRange={true}
        year={props.firstYear}
        month={props.firstMonth}
        day={props.firstDay}
        rangeBegin={props.firstRangeBegin}
        rangeEnd={props.firstRangeEnd}
        range={props.range}
        max={props.max}
        min={props.min}
        onSelect={props.firstHandler}
        updateYearAndMonth={props.firstMonthHandler}
      ></CalendarView>
      <CalendarView
        isRange={true}
        year={props.secondYear}
        month={props.secondMonth}
        day={props.secondDay}
        rangeBegin={props.secondRangeBegin}
        rangeEnd={props.secondRangeEnd}
        maxDate={props.maxDate}
        minDate={props.minDate}
        range={props.range}
        max={props.max}
        min={props.min}
        onSelect={props.secondHandler}
        updateYearAndMonth={props.secondMonthHandler}
      ></CalendarView>
    </React.Fragment>
  );
}
export default DateRangeHoc(memo(DateRange));
