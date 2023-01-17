/*
 create by wangzhiyong
 date:2016-06-12
 desc:时间选择组件 
 date:2022-09-23 重新改造
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Time from "./Time";
const formartterState = (firstTime, secondTime) => {
  //设置值
  let result = {};

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
  return result;
};
function TimeRange(props) {
  /**
   * 开始时间
   * @param {*} value
   */
  const firstHandler = useCallback(
    (value) => {
      props.onSelect &&
        props.onSelect(
          value + "," + props.secondTime,
          value + "," + props.secondTime,
          props.name
        );
    },
    [props.secondTime, props.onSelect]
  );
  /**
   * 结束时间
   * @param {*} value
   */
  const secondHandler = useCallback(
    (value) => {
      props.onSelect &&
        props.onSelect(
          props.firstTime + "," + value,
          props.firstTime + "," + value,
          props.name
        );
    },
    [props.firstTime, props.attachSecond, props.onSelect]
  );

  let result = formartterState(props.firstTime, props.secondTime);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 19 }}>
        <Time
          key="begin"
          hour={result.first_hour}
          minute={result.first_minute}
          attachSecond={props.attachSecond}
          onSelect={firstHandler}
        ></Time>
      </div>
      <div>
        <Time
          key="end"
          onSelect={secondHandler}
          hour={result.second_hour}
          minute={result.second_minute}
          attachSecond={props.attachSecond}
        ></Time>
      </div>
    </div>
  );
}

TimeRange.propTypes = {
  firstTime: PropTypes.string, //第一个时间
  secondTime: PropTypes.string, //第二个时间
  attachSecond: PropTypes.bool, //附带秒
};
TimeRange.defaultProps = {
  attachSecond: true,
};
export default React.memo(TimeRange);
