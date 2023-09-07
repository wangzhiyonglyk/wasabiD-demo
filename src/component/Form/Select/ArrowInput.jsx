/**
 * 下拉框的文本框
 *  edit 2021-04-12 完善交互性
 */
import React, { useCallback } from "react";
import BaseInput from "../BaseInput";
const ArrowInput = React.forwardRef((props, ref) => {
  /**
   * 计算得到图标属性
   * @param {*} type
   * @returns
   */
  const getIconProps = useCallback((type) => {
    switch (type) {
      case "sort":
        return {
          title:
            props.sortType == "asc"
              ? "顺排"
              : props.sortType == "desc"
              ? "倒排"
              : "点击排序",
          style: {
            position: "absolute",
            top: 14,
            right: 10,
            color: props.sortType
              ? "var(--icon-hover-color)"
              : "var(--icon-color)",
          },
          className:
            props.sortType == "asc"
              ? "icon-sort-asc"
              : props.sortType == "desc"
              ? "icon-sort-desc"
              : "icon-sort",
          onClick: props.onSort,
        };
      case "chose":
        return {
          className:
            "comboxbox-icon icon-caret-down " + (props.show ? "rotate" : ""),
          onClick: props.onClick,
        };
      case "clear":
        return {
          title: "清除",
          className: "combobox-clear icon-clear",
          onClick: props.onClear,
          style: {
            display: props.readOnly
              ? "none"
              : props.value == "" || !props.value
              ? "none"
              : "inline",
          },
        };
    }
  }, []);
  return (
    <React.Fragment>
      {props.attachAble ? (
        <i {...getIconProps("sort")}></i>
      ) : (
        <i {...getIconProps("chose")}></i>
      )}
      <i {...getIconProps("clear")}></i>
      <BaseInput
        ref={ref}
        name={props.name}
        title={props.title}
        placeholder={
          (props.placeholder ?? "") + (props.attachAble ? "回车添加" : "")
        }
        readOnly={props.readOnly}
        value={props.value || ""}
        onFocus={props.onFocus}
        onClick={props.onClick}
        onDoubleClick={props.onDoubleClick}
        onKeyUp={props.onKeyUp}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </React.Fragment>
  );
});

export default ArrowInput;
