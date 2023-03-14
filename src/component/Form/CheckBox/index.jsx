/**
 * Created by wangzhiyonglyk on 2016-03-02以后.
 * edit 2020-11-08
 * edit 2022-09-17  完善组件，尤其是半选状态
 * 复选框组件
 */
import React from "react";
import loadDataHoc from "../loadDataHoc";
import ValidateHoc from "../ValidateHoc";
import propTypes from "../propsConfig/propTypes.js";
import propsTran from "../../libs/propsTran";
import "../Radio/radio.css";
import Msg from "../../Info/Msg";

function LiView(props) {
  //half,是从tree那里来的
  let { data, value = "", half, readOnly, disabled, onSelect } = props;
  let control = null;
  const isChecked = (child) => {
    let checked = false;
    if (
      ("," + value.toString() + ",").indexOf("," + (child.value ?? "") + ",") >
      -1
    ) {
      checked = true;
    }
    return checked;
  };
  if (data && data instanceof Array && data.length > 0) {
    control = data.map((child, index) => {
      let checked = isChecked(child);
      return (
        <li
          key={index}
          onClick={onSelect.bind(this, child.value ?? "", child.text, child)}
        >
          <label
            className={
              "checkbox-label " +
              (checked ? " icon-check checked " : " ") +
              (half ? " halfcheck " : "")
            }
            disabled={disabled}
            readOnly={readOnly}
          ></label>
          <div
            className={
              "checktext " +
              (checked ? " checked " : " ") +
              (half ? " halfcheck " : "")
            }
            disabled={disabled}
            readOnly={readOnly}
          >
            {child.text}
          </div>
        </li>
      );
    });
  }
  return control;
}
class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      value: "",
      oldPropsValue: null, //保存初始化的值
    };
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.oldPropsValue) {
      //父组件强行更新了
      return {
        value: props.value ?? "",
        text: propsTran.processText(props.value, props.data).join(","),
        oldPropsValue: props.value,
      };
    }
    return null;
  }
  setValue(value) {
    this.setState({
      value: value,
      text: propsTran.processText(value, this.props.data).join(","),
    });
    this.props.validate && this.props.validate(value);
  }
  getValue() {
    return this.state.value;
  }

  onClear() {
    this.setState({
      value: "",
      text: "",
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name, {});
  }
  /**
   * 选择事件
   * @param {*} value
   * @param {*} text
   * @param {*} row
   * @returns
   */
  onSelect(value = "", text, row) {
    //选中事件
    if (this.props.readOnly || this.props.disabled) {
      return;
    }
    if ((value ?? "") !== "") {
      //0是有效值
      let newValue = this.state.value.toString() || "";
      let newText = this.state.text.toString() || "";
      newValue = newValue ? newValue.split(",") : [];
      newText = newText ? newText.split(",") : [];
      if (newValue.indexOf(value.toString()) > -1) {
        newValue.splice(newValue.indexOf((value ?? "").toString()), 1);
        try {
          newText.splice(newText.indexOf((text ?? "").toString()), 1);
        } catch (e) {}
      } else {
        newValue.push(value + "");
        newText.push(text + "");
      }
      this.setState({
        value: newValue.join(","),
        text: newText.join(","),
      });
      this.props.validate && this.props.validate(newValue.join(","));
      this.props.onSelect &&
        this.props.onSelect(
          newValue.join(","),
          newText.join(","),
          this.props.name,
          row
        );
    } else {
      Msg.alert("值是空值");
    }
  }

  render() {
    const { data, half, readOnly, disabled } = this.props;

    const liprops = {
      data,
      half,
      readOnly,
      disabled,
      onSelect: this.onSelect,
      value: this.state.value,
    };
    return (
      <ul className="wasabi-checkul">
        <LiView {...liprops}></LiView> {this.props.children}{" "}
      </ul>
    );
  }
}
CheckBox.propTypes = propTypes;
CheckBox.defaultProps = { type: "checkbox" };
export default ValidateHoc(loadDataHoc(CheckBox));
