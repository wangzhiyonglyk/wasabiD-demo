/**
 * Created by wangzhiyonglyk on 2016-04-05以后.
 * 2020-11-08
 * 复选框组件
 * 2022-01-11 将 tree组件独立出来
 */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import processText from "../libs/processText";
import "../css/radio.css";
const isChecked = (child, value = "") => {
  let checked = false;

  if (
    value &&
    ("," + value.toString() + ",").indexOf("," + child.value + ",") > -1
  ) {
    checked = true;
  }
  return checked;
};
function CheckBox(props, ref) {
  //half,是从tree那里来的
  const [value, setValue] = useState(props.value);
  //文本值
  const text = useMemo(() => {
    return processText(value, props.data).join(",");
  }, [props.data, value]);
  useEffect(() => {
    setValue((props.value ?? "") + "");
  }, [props]);

  const { data, half, readOnly } = props;
  const onSelect = useCallback(
    (cValue, cText, cChild, olcValue, oldText) => {
      if (props.readOnly) {
        //只读
        return;
      }
      if (cValue !== "") {
        //0是有效值
        let newValue = olcValue.toString() || "";
        let newText = oldText || "";
        newValue = newValue ? newValue.split(",") : [];
        newText = newText ? newText.split(",") : [];
        if (newValue.indexOf(cValue.toString()) > -1) {
          //取消选中
          try {
            newValue.splice(newValue.indexOf(cValue.toString()), 1);
            newText.splice(newText.indexOf(cText.toString()), 1);
          } catch (e) {}
        } else {
          //选中
          newValue.push(cValue + "");
          newText.push(cText + "");
        }
        setValue(newValue.join(","));
        props.onSelect &&
          props.onSelect(
            newValue.join(","),
            newText.join(","),
            props.name,
            cChild
          );
      } else {
        setValue("");
        props.onSelect && props.onSelect("", "", props.name, cChild);
      }
    },
    [props]
  );
  if (data && data instanceof Array && data.length > 0) {
    return (
      <div className={"wasabi-form-group " + (props.className || "")}>
        <div
          className={
            "wasabi-form-group-body" +
            (props.readOnly || props.disabled ? " readOnly" : "")
          }
        >
          <ul className="wasabi-checkul">
            {data.map((child, index) => {
              let checked = isChecked(child, value);
              return (
                <li
                  key={index}
                  onClick={onSelect.bind(
                    this,
                    child.value ?? "",
                    child.text ?? "",
                    child,
                    value,
                    text
                  )}
                >
                  <label
                    className={
                      "checkbox-label " +
                      (checked ? " icon-check checked " : " ") +
                      (half ? " halfcheck " : "")
                    }
                    readOnly={readOnly}
                  ></label>
                  <div
                    className={"checktext " + (checked ? " checked" : "")}
                    readOnly={readOnly}
                  >
                    {child.text}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return null;
}
export default React.memo(CheckBox);
