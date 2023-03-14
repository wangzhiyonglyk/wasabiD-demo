/*
create by wangzhiyonglyk
date:2022-09-20
desc:年范围选择控件
 */
import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import CalendarView from "./Calendar/CalendarView";
import regs from "../../libs/regs";

/**
 * 得到两个面板的开始年与结束年
 * @param {*} firstYearArr 第一个年数组
 * @param {*} secondYearArr 第二个年数组
 * @param {*} firstYear 第一个年
 * @param {*} secondYear 第二年
 */
function getRangeYear(firstYear, secondYear) {
  firstYear = 1 * (firstYear ?? new Date().getFullYear());
  secondYear = 1 * (secondYear ?? new Date().getFullYear());
  let firstYearArr = [],
    secondYearArr = [];
  //先得到年份数组
  if (secondYear - firstYear > 15) {
    //没有重叠，两个值年份相差太大
    for (let i = firstYear - 8; i < firstYear + 7; i++) {
      firstYearArr.push(i);
    }
    for (let i = secondYear - 8; i < secondYear + 7; i++) {
      secondYearArr.push(i);
    }
  } else {
    for (let i = firstYear - 7; i < firstYear + 8; i++) {
      firstYearArr.push(i);
    }
    for (let i = firstYear + 8; i < firstYear + 21; i++) {
      secondYearArr.push(i);
    }
  }

  let result = {
    firstYearArr,
    secondYearArr,
    firstRangeBegin: null,
    firstRangeEnd: null,
    secondRangeBegin: null,
    secondRangeEnd: null,
    value: (firstYear ?? "") + "," + (secondYear ?? ""),
  };
  firstYear && firstYearArr.find((item) => item === firstYear * 1)
    ? (result.firstRangeBegin = firstYear)
    : void 0;
  secondYear && firstYearArr.find((item) => item === secondYear * 1)
    ? (result.firstRangeEnd = secondYear)
    : void 0;
  firstYear && secondYearArr.find((item) => item === firstYear * 1)
    ? (result.secondRangeBegin = firstYear)
    : void 0;
  secondYear && secondYearArr.find((item) => item === secondYear * 1)
    ? (result.secondRangeEnd = secondYear)
    : void 0;
  result.firstRangeEnd = result.firstRangeEnd || secondYear;
  result.secondRangeBegin = result.secondRangeBegin || firstYear;
  return result;
}

/**
 * 得到两个新的值
 * @param {*} type 面板类型，是第一个年份面板，还是第二个
 * @param {*} oldYearRangeObj 旧的状态值
 * @param {*} newValue 新的值
 */
function getNewRangeYearObj(type, oldYearRangeObj, newValue) {
  let firstYear = oldYearRangeObj.value.split(",")[0];
  let secondYear = oldYearRangeObj.value.split(",")[1];
  if (
    regs.yearrange.test(oldYearRangeObj.value) ||
    (!firstYear && !secondYear)
  ) {
    //旧值正常，或者原来是空值 ，相当于重新重新选择,
    oldYearRangeObj = {
      ...oldYearRangeObj,
      firstRangeBegin: type === 1 ? newValue : null,
      firstRangeEnd: null,
      secondRangeBegin: null,
      secondRangeEnd: type === 2 ? newValue : null,
      value: type === 1 ? (newValue ?? "") + "," : "," + (newValue ?? ""),
    };
  } else {
    //有一个有值,归正大小
    secondYear = Math.max((firstYear || secondYear) * 1, newValue * 1);
    firstYear = Math.min((firstYear || secondYear) * 1, newValue * 1);
    oldYearRangeObj = getRangeYear(firstYear || null, secondYear || null);
  }

  return oldYearRangeObj;
}

function YearRange(props) {
  const [yearRangeObj, setyearRangeObj] = useState({
    firstYearArr: [],
    secondYearArr: [],
    firstRangeBegin: null,
    firstRangeEnd: null,
    secondRangeBegin: null,
    secondRangeEnd: null,
  }); //记录当前的值
  //第一个面板的设置
  const onFirstSelect = useCallback(
    (value) => {
      let newYearRangeObj = getNewRangeYearObj(1, yearRangeObj, value);
      if (regs.yearrange.test(newYearRangeObj.value)) {
        if (props.onSelect) {
          props.onSelect(newYearRangeObj.value, newYearRangeObj.value);
        } else {
          setyearRangeObj(newYearRangeObj);
        }
      } else {
        setyearRangeObj(newYearRangeObj);
      }
    },
    [props, yearRangeObj]
  );

  const onSecondSelect = useCallback(
    (value) => {
      let newYearRangeObj = getNewRangeYearObj(2, yearRangeObj, value);
      if (regs.yearrange.test(newYearRangeObj.value)) {
        if (props.onSelect) {
          props.onSelect(newYearRangeObj.value);
        } else {
        }
      } else {
        //更新本地值
        setyearRangeObj(newYearRangeObj);
      }
    },
    [props, yearRangeObj]
  );
  useEffect(() => {
    let yearRangeObj = getRangeYear(props.firstYear, props.secondYear);
    setyearRangeObj(yearRangeObj);
  }, [props.firstYear, props.secondYear]);

  return (
    <React.Fragment>
      <CalendarView
        key={"1"}
        type="year"
        yearArr={yearRangeObj.firstYearArr}
        isRange={true}
        rangeBegin={yearRangeObj.firstRangeBegin}
        year={yearRangeObj.firstYearArr[7]}
        rangeEnd={yearRangeObj.firstRangeEnd}
        onSelect={onFirstSelect}
      ></CalendarView>
      <CalendarView
        key="2"
        type="year"
        yearArr={yearRangeObj.secondYearArr}
        isRange={true}
        year={yearRangeObj.secondYearArr[7]}
        rangeBegin={yearRangeObj.secondRangeBegin}
        rangeEnd={yearRangeObj.secondRangeEnd}
        onSelect={onSecondSelect}
      ></CalendarView>
    </React.Fragment>
  );
}
YearRange.propTypes = {
  name: PropTypes.string, //名称
  firstYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //年, //第一个年
  secondYear: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), //年, //第一个年
  onSelect: PropTypes.func, //确定事件
};

export default React.memo(YearRange);
