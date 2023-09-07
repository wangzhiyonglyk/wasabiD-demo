/*
create by wangzhiyonglyk
date:2022-09-20
desc:年月范围选择控件
 */

import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import CalendarView from "./Calendar/CalendarView";
import regs from "../../libs/regs";

/**
 * 得到两个面板的开始年月与结束年月
 * @param {*} firstYearArr 第一个年数组
 * @param {*} secondYearArr 第二个年数组
 * @param {*} firstYear 第一个年
 * @param {*} firstMonth 第一个月
 * @param {*} secondYear 第二个年
 * @param {*} secondMonth 第二个月
 */
function getRangeMonth(firstYear, firstMonth, secondYear, secondMonth) {
  firstYear = firstYear * 1 || new Date().getFullYear();
  secondYear = secondYear * 1 || new Date().getFullYear();
  firstMonth = firstMonth * 1;
  secondMonth = secondMonth * 1;
  let value =
    (firstYear ?? "") +
    "-" +
    (firstMonth < 10 ? "0" + firstMonth : firstMonth) +
    "," +
    (secondYear ?? "") +
    "-" +
    (secondMonth < 10 ? "0" + secondMonth : secondMonth);
  let result = {
    firstYear,
    firstMonth,
    secondYear,
    secondMonth,
    firstRangeBegin: null,
    firstRangeEnd: null,
    secondRangeBegin: null,
    secondRangeEnd: null,
    firstPanelYear: null, //属性面板的
    secondPanelYear: null, //属性面板的
    value: value,
  };

  if (firstYear < secondYear) {
    //两个跨年了
    result.firstPanelYear = firstYear * 1;
    result.secondPanelYear = secondYear * 1;

    result.firstRangeBegin = (firstMonth && firstMonth * 1) || null;
    result.firstRangeEnd = secondMonth ? 13 : null;
    // 如果第一个有值，才设置为0
    result.secondRangeBegin = firstMonth ? 0 : secondMonth;
    // 如果设置上面一个，说明是第二个开始选择，设置为空
    result.secondRangeEnd = result.secondRangeBegin
      ? null
      : (secondMonth && secondMonth * 1) || null;
  } else if (firstYear * 1 === secondYear * 1) {
    //同一年
    result.firstPanelYear = firstYear && firstYear * 1;
    result.secondPanelYear = secondYear && secondYear * 1 + 1; //加一年就行了
    result.firstRangeBegin = (firstMonth && firstMonth * 1) || null;
    result.firstRangeEnd = (secondMonth && secondMonth * 1) || null;
    result.secondRangeBegin = null;
    result.secondRangeEnd = null;
  }

  // 交换
  if (regs.monthrange.test(value)) {
    let arr = value.split(",");
    if (arr[0] > arr[1]) {
      result.value = arr[1] + "," + arr[0];
    }
  }
  return result;
}
/**
 * 得到两个新的值
 * @param {*} type 面板类型，是第一个年份面板，还是第二个
 * @param {*} oldMonthRangeObj 旧的值
 * @param {*} newValue 新的值
 */
function getNewRangeMonth(type, oldMonthRangeObj, newValue) {
  let firstValue, secondValue;
  let arr = oldMonthRangeObj.value && oldMonthRangeObj.value.split(",");
  firstValue = arr && arr[0];
  secondValue = arr && arr.length === 2 && arr[1];
  let newYear, newMonth;
  arr = newValue.split("-");
  newYear = arr[0] * 1;
  newMonth = arr[1] * 1;
  //说明是重新选择
  let newChose =
    regs.monthrange.test(oldMonthRangeObj.value) ||
    (!regs.month.test(firstValue) && !regs.month.test(secondValue));

  if (newChose) {
    if (type === 1) {
      return getRangeMonth(
        newYear,
        newMonth,
        oldMonthRangeObj.secondYear,
        null
      );
    } else {
      return getRangeMonth(oldMonthRangeObj.firstYear, null, newYear, newMonth);
    }
  } else {
    if (regs.month.test(firstValue)) {
      // 说明是第一个有效
      return getRangeMonth(
        oldMonthRangeObj.firstYear,
        oldMonthRangeObj.firstMonth,
        newYear,
        newMonth
      );
    } else {
      return getRangeMonth(
        newYear,
        newMonth,
        oldMonthRangeObj.secondYear,
        oldMonthRangeObj.secondMonth
      );
    }
  }
}

function MonthRange(props) {
  const [monthRangeObj, setmonthRangeObj] = useState({
    firstPanelYear: null,
    secondPanelYear: null,
    firstRangeBegin: null,
    firstRangeEnd: null,
    secondRangeBegin: null,
    secondRangeEnd: null,
  }); //记录当前的值
  //第一个面板的设置
  const onFirstSelect = useCallback(
    (value) => {
      let newmonthRangeObj = getNewRangeMonth(1, monthRangeObj, value);
      if (regs.monthrange.test(newmonthRangeObj.value)) {
        //如果值正确
        if (typeof props.onSelect === "function") {
          props.onSelect(newmonthRangeObj.value, newmonthRangeObj.value);
        } else {
          setmonthRangeObj(newmonthRangeObj);
        }
      } else {
        setmonthRangeObj(newmonthRangeObj);
      }
    },
    [props, monthRangeObj]
  );

  const onSecondSelect = useCallback(
    (value) => {
      let newmonthRangeObj = getNewRangeMonth(2, monthRangeObj, value);
      if (regs.monthrange.test(newmonthRangeObj.value)) {
        //如果值正确
        if (typeof props.onSelect === "function") {
          props.onSelect(newmonthRangeObj.value, newmonthRangeObj.value);
        } else {
          setmonthRangeObj(newmonthRangeObj);
        }
      } else {
        setmonthRangeObj(newmonthRangeObj);
      }
    },
    [props, monthRangeObj]
  );

  const updateYearAndMonth = useCallback((type, year) => {
    let obj = {
      firstRangeBegin: type === "first" ? null : monthRangeObj.firstRangeBegin,
      firstRangeEnd: type === "first" ? null : monthRangeObj.firstRangeEnd,
      secondRangeBegin:
        type === "second" ? null : monthRangeObj.secondRangeBegin,
      secondRangeEnd: type === "second" ? null : monthRangeObj.secondRangeEnd,
    };
    setmonthRangeObj({ ...monthRangeObj, ...obj });
  });
  useEffect(() => {
    let monthRangeObj = getRangeMonth(
      props.firstYear,
      props.firstMonth,
      props.secondYear,
      props.secondMonth
    );
    setmonthRangeObj(monthRangeObj);
  }, [props.firstYear, props.secondYear, props.firstMonth, props.secondMonth]);

  return (
    <React.Fragment>
      <CalendarView
        key={"1"}
        type="month"
        isRange={true}
        min={props.min}
        max={props.max}
        year={monthRangeObj.firstPanelYear}
        rangeBegin={monthRangeObj.firstRangeBegin}
        rangeEnd={monthRangeObj.firstRangeEnd}
        updateYearAndMonth={updateYearAndMonth.bind(this, "first")}
        onSelect={onFirstSelect}
      ></CalendarView>
      <CalendarView
        key="2"
        type="month"
        isRange={true}
        min={props.min}
        max={props.max}
        year={monthRangeObj.secondPanelYear}
        rangeBegin={monthRangeObj.secondRangeBegin}
        rangeEnd={monthRangeObj.secondRangeEnd}
        updateYearAndMonth={updateYearAndMonth.bind(this, "second")}
        onSelect={onSecondSelect}
      ></CalendarView>
    </React.Fragment>
  );
}
MonthRange.propTypes = {
  name: PropTypes.string, //名称
  firstYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fristMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secoonMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 最小值
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 最大值
  onSelect: PropTypes.func, //确定事件
};
export default React.memo(MonthRange);
