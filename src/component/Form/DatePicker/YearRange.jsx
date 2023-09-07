/*
create by wangzhiyonglyk
date:2022-09-20
desc:年范围选择控件
 */
import React, { useEffect, useState, useCallback } from "react";

import CalendarView from "./Calendar/CalendarView";
import regs from "../../libs/regs";

/**
 * 得到两个面板的开始年与结束年
 * @param {*} firstYear 第一个年
 * @param {*} secondYear 第二年
 */
function getRangeYear(firstYear, secondYear, oldYearRange) {
  let firstYearArr = [];
  let secondYearArr = [];
  //先得到年份数组
  let len = 15;
  if (!oldYearRange) {
    firstYear = 1 * (firstYear ?? new Date().getFullYear());
    secondYear = 1 * (secondYear ?? new Date().getFullYear());
    if (secondYear - firstYear > len) {
      //没有重叠，两个值年份相差太大
      for (let i = firstYear - 8; i < firstYear + 7; i++) {
        firstYearArr.push(i);
      }
      for (let i = secondYear - 7; i < secondYear + 8; i++) {
        secondYearArr.push(i);
      }
    } else {
      for (let i = firstYear - 7; i < firstYear + 8; i++) {
        firstYearArr.push(i);
      }
      for (let i = firstYear + 8; i < firstYear + (8 + len); i++) {
        secondYearArr.push(i);
      }
    }
  } else {
    firstYearArr = oldYearRange.firstYearArr;
    secondYearArr = oldYearRange.secondYearArr;
  }

  let result = {
    firstYearArr,
    secondYearArr,
    firstYear: firstYear,
    secondYear: secondYear,
    value: (firstYear ?? "") + "," + (secondYear ?? ""),
  };

  return result;
}

/**
 * 得到两个新的值
 * @param {*} type 面板类型，是第一个年份面板，还是第二个
 * @param {*} oldYearRange 旧的状态值
 * @param {*} newValue 新的值
 */
function getNewRangeYear(type, oldYearRange, newValue) {
  let { firstYear, secondYear } = oldYearRange;
  // 开始年份
  if ((firstYear && secondYear) || (!firstYear && !secondYear)) {
    // 说明是重新选择
    // 先清空
    firstYear = null;
    secondYear = null;
    if (type === 1) {
      firstYear = newValue;
    } else {
      secondYear = newValue;
    }
  } else {
    // 说明已经选择了一个
    if (firstYear) {
      secondYear = newValue;
    } else {
      firstYear = newValue;
    }

    if (firstYear > secondYear) {
      // 交换
      let temp = firstYear;
      firstYear = secondYear;
      secondYear = temp;
    }
  }
  return getRangeYear(firstYear, secondYear, oldYearRange);
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
      let newYearRangeObj = getNewRangeYear(1, yearRangeObj, value);
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
      let newYearRangeObj = getNewRangeYear(2, yearRangeObj, value);

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

  const updateYear = useCallback((arrowType) => {
    let beginYear;
    if (arrowType === 0) {
      beginYear = yearRangeObj.firstYearArr[0] - 15;
    } else {
      beginYear = yearRangeObj.secondYearArr[0];
    }
    let firstYearArr = [];
    let secondYearArr = [];
    for (let i = beginYear; i < beginYear + 15; i++) {
      firstYearArr.push(i);
    }
    for (let i = beginYear + 15; i < beginYear + 30; i++) {
      secondYearArr.push(i);
    }
    setyearRangeObj({ ...yearRangeObj, firstYearArr, secondYearArr });
  });
  useEffect(() => {
    let result = getRangeYear(props.firstYear, props.secondYear);
    setyearRangeObj(result);
  }, [props.firstYear, props.secondYear]);
  /**
   * 因为年份是连续的，不需要额外增加begin,end值，直接使用原始的值就行了
   * 与其他范围选择不一样
   */

  return (
    <React.Fragment>
      <CalendarView
        key={"1"}
        type="year"
        yearRangeType="first"
        yearArr={yearRangeObj.firstYearArr}
        min={props.min}
        max={props.max}
        isRange={true}
        rangeBegin={yearRangeObj.firstYear}
        rangeEnd={yearRangeObj.secondYear}
        onSelect={onFirstSelect}
        updateYear={updateYear}
      ></CalendarView>
      <CalendarView
        key="2"
        type="year"
        yearRangeType="second"
        yearArr={yearRangeObj.secondYearArr}
        min={props.min}
        max={props.max}
        isRange={true}
        rangeBegin={yearRangeObj.firstYear}
        rangeEnd={yearRangeObj.secondYear}
        onSelect={onSecondSelect}
        updateYear={updateYear}
      ></CalendarView>
    </React.Fragment>
  );
}

export default React.memo(YearRange);
