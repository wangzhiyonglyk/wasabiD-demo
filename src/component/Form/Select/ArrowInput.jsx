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
  const getIconProps = useCallback(
    (type) => {
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
              color: props.sortType
                ? "var(--icon-hover-color)"
                : "var(--icon-color)",
            },
            className:
              props.sortType == "asc"
                ? "combobox-sort icon-sort-asc"
                : props.sortType == "desc"
                  ?  " combobox-sort icon-sort-desc"
                  : " combobox-sort icon-sort",
            onClick: props.onSort,
          };
        case "chose":
          return {
            className:
              "comboxbox-icon icon-arrow-down " + (props.show ? "rotate" : ""),
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
                : props.text
                  ? "inline"
                  : "none",
            },
          };
      }
    },
    [props.sortType, props.text, props.show, props.onClick, props.onSort]
  );
  /**
   * 删除
   */
  const onDeleteValue = useCallback((index, event) => {
    event.stopPropagation();
    props.onDeleteValue && props.onDeleteValue(index)
  }, [])
  return (
    <React.Fragment>
      {props.sortAble ? (
        <i {...getIconProps("sort")}></i>
      ) : (
        <i {...getIconProps("chose")}></i>
      )}
      <i {...getIconProps("clear")}></i>
      {props.multiple && props.text ? <div className="multiple-item-container">
        {
          props.text.split(",").map((item, index) => {
            return <span key={index} onClick={props.onClick} className="multiple-item" >{item}<i onClick={onDeleteValue.bind(this, index)} className="icon-close"></i></span>
          })}
      </div>
        : null}
      <BaseInput
        ref={ref}
        name={props.name}
        title={props.title}
        placeholder={
          (props.placeholder ?? "") + (props.attachAble ? "回车添加" : "")
        }
        readOnly={props.readOnly}
        value={props.inputText}
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
