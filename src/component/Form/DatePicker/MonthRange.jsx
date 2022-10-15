/*
create by wangzhiyong
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
  firstYear=firstYear||new Date().getFullYear();
  secondYear=secondYear||new Date().getFullYear();
  let result = {
    firstRangeBegin: null,
    firstRangeEnd: null,
    secondRangeBegin: null,
    secondRangeEnd: null,
    firstPanelYear: null, //属性面板的
    secondPanelYear: null, //属性面板的
    value:
      (firstYear ?? "") +
      "-" +
      (firstMonth ?? "") +
      "," +
      (secondYear ?? "") +
      "-" +
      (secondMonth ?? ""),
  };
  if (
    (firstYear ?? "") + "-" + (firstMonth ?? "") >
    (secondYear ?? "") + "-" + (secondMonth ?? "")
  ) {
    return result; //值不符合
  }
  if (firstYear < secondYear) {
    //两个什跨年了
    result.firstPanelYear = firstYear * 1;
    result.secondPanelYear = secondYear * 1;

    result.firstRangeBegin = firstMonth * 1;
    result.firstRangeEnd = 13;
    result.secondRangeBegin = 0;
    result.secondRangeEnd = secondMonth * 1;
  } else if (firstYear * 1 === secondYear * 1) {//同一年
    result.firstPanelYear = firstYear &&firstYear * 1;
    result.secondPanelYear = secondYear&&secondYear *1 +1; //加一年就行了
    result.firstRangeBegin = firstMonth&&firstMonth * 1||null;
    result.firstRangeEnd = secondMonth&&secondMonth*1||null;
    result.secondRangeBegin = null;
    result.secondRangeEnd = null;
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
  let arr = oldMonthRangeObj?.value.split(",") || "";
  let firstRangeValue = arr.length > 0 && arr[0]|| "";
  let secondRangeValue = arr.length > 1 && arr[1]|| "";
  if (
    regs.monthrange.test(oldMonthRangeObj.value) ||
    (!regs.month.test(firstRangeValue) && !regs.month.test(secondRangeValue))
  ) {
    //旧值 正常，重新选择
    let arr = newValue.split("-");
    let newYear = arr[0] * 1;
    let newMonth = arr[1] * 1;
    oldMonthRangeObj = {
      firstPanelYear: type === 1 ? newYear : oldMonthRangeObj.firstPanelYear,
      secondPanelYear: type === 2 ? newYear : oldMonthRangeObj.secondPanelYear,
      firstRangeBegin: type === 1 ? newMonth : null,
      firstRangeEnd: null,
      secondRangeBegin: type === 2 ? 0 : null,
      secondRangeEnd: type === 2 ? newMonth : null,
      value: type === 1 ? newValue + "," : "," + newValue,
    };
  } else {
    //先归正大小
  
      let newArr=[firstRangeValue||secondRangeValue,newValue];
      newArr.sort();
      firstRangeValue=newArr[0];
      secondRangeValue=newArr[1];
      let firstYear = firstRangeValue.split("-")[0] || null;
      let firstMonth = firstRangeValue.split("-")[1] || null;
      let secondYear = secondRangeValue.split("-")[0] || null;
      let secondMonth = secondRangeValue.split("-")[1] || null;
    oldMonthRangeObj =  getRangeMonth(firstYear, firstMonth, secondYear, secondMonth)
  }
  return oldMonthRangeObj;
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
        console.log("onFirstSelect",newmonthRangeObj.value)
      if (regs.monthrange.test(newmonthRangeObj.value)) {//如果值正确
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
      let newmonthRangeObj = getNewRangeMonth(2, monthRangeObj, value)
      console.log("onSecondSelect",newmonthRangeObj.value)
      if (regs.monthrange.test(newmonthRangeObj.value)) {//如果值正确
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
  useEffect(() => {
    let monthRangeObj = getRangeMonth(
      props.firstYear,
      props.firstMonth,
      props.secondYear,
      props.secondMonth,
    );
    setmonthRangeObj(monthRangeObj);
  }, [props.firstYear, props.secondYear, props.firstMonth, props.secondMonth]);

  return (
    <React.Fragment>
      <CalendarView
        key={"1"}
        type="month"
        isRange={true}
        year={monthRangeObj.firstPanelYear}
        rangeBegin={monthRangeObj.firstRangeBegin}
        rangeEnd={monthRangeObj.firstRangeEnd}
        onSelect={onFirstSelect}
      ></CalendarView>
      <CalendarView
        key="2"
        type="month"
        isRange={true}
        year={monthRangeObj.secondPanelYear}
        rangeBegin={monthRangeObj.secondRangeBegin}
        rangeEnd={monthRangeObj.secondRangeEnd}
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
  onSelect: PropTypes.func, //确定事件
};
export default React.memo(MonthRange);
