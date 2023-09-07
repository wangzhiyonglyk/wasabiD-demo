/*
 create by wangzhiyonglyk
 date:2016-06-12
 desc:时间选择组件 
 date:2022-09-23 重新改造
 */

import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Time from "./Time";
import regs from "../../libs/regs";
const formartterState = function (firstTime, secondTime, oldResult) {
  //设置值
  let value = (firstTime ?? "") + "," + (secondTime ?? "");

  let result = {
    ...oldResult,
    firstTime,
    secondTime,
    value,
  };

  if (firstTime && firstTime.split(":").length >= 2) {
    let hour = firstTime.split(":")[0] * 1;
    let minute = firstTime.split(":")[1] * 1;
    result.first_hour = hour;
    result.first_minute = minute;
  }
  if (secondTime && secondTime.split(":").length >= 2) {
    let hour = secondTime.split(":")[0] * 1;
    let minute = secondTime.split(":")[1] * 1;
    result.second_hour = hour;
    result.second_minute = minute;
  }
  // 交换
  if (regs.timerange.test(result.value)) {
    let arr = value.split(",");
    if (arr[0] > arr[1]) {
      result.value = arr[1] + "," + arr[0];
    }
  }
  return result;
};

const formartterStateNew = function (type, oldResult, newValue) {
  let firstTime = oldResult.firstTime;
  let secondTime = oldResult.secondTime;
  //说明是重新选择
  let newChose =
    regs.timerange.test(oldResult.value) ||
    (!regs.time.test(firstTime) && !regs.time.test(secondTime));
  if (newChose) {
    if (type === 1) {
      return formartterState(newValue, null, oldResult);
    } else {
      return formartterState(null, newValue, oldResult);
    }
  } else {
    if (regs.time.test(firstTime)) {
      // 说明第一个有效
      return formartterState(firstTime, newValue, oldResult);
    } else {
      return formartterState(newValue, secondTime, oldResult);
    }
  }
};

function TimeRange(props) {
  const [timeRangeObj, settimeRangeObj] = useState({
    firstTime: props.firstTime,
    secondTime: props.secondTime,
    first_hour: null,
    first_minute: null,
    second_hour: null,
    second_minute: null,
  }); //记录当前的值
  /**
   * 开始时间
   * @param {*} value
   */
  const firstHandler = useCallback(
    (value) => {
      let result = formartterStateNew(1, timeRangeObj, value);
      changeHandler(result);
    },
    [timeRangeObj]
  );
  /**
   * 结束时间
   * @param {*} value
   */
  const secondHandler = useCallback(
    (value) => {
      let result = formartterStateNew(2, timeRangeObj, value);
      changeHandler(result);
    },
    [timeRangeObj]
  );

  const changeHandler = useCallback(
    (result) => {
      if (regs.timerange.test(result.value)) {
        //如果值正确
        if (typeof props.onSelect === "function") {
          props.onSelect(result.value, result.value);
        } else {
          settimeRangeObj(result);
        }
      } else {
        settimeRangeObj(result);
      }
    },
    [props.onSelect]
  );

  useEffect(() => {
    let result = formartterState(props.firstTime, props.secondTime);
    settimeRangeObj(result);
  }, [props.firstTime, props.secondTime]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        <Time
          key="begin"
          hour={timeRangeObj.first_hour}
          minute={timeRangeObj.first_minute}
          onSelect={firstHandler}
        ></Time>
      </div>
      <div style={{ display: "flex" }}>
        <Time
          key="end"
          onSelect={secondHandler}
          hour={timeRangeObj.second_hour}
          minute={timeRangeObj.second_minute}
        ></Time>
      </div>
    </div>
  );
}

TimeRange.propTypes = {
  firstTime: PropTypes.string, //第一个时间
  secondTime: PropTypes.string, //第二个时间

};

export default React.memo(TimeRange);
