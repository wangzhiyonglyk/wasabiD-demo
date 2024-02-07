/*
 create by wangzhiyonglyk
 date:2016-07-04
 edit 2020-10 参照ztree改造
 desc:树下拉选择
 */
import React from "react";
import Tree from "../../Data/Tree/index.jsx";
import propTypes from "../propsConfig/propTypes.js";
import CheckBox from "../CheckBox/index.jsx";
import propsTran from "../../libs/propsTran.js";
import ValidateHoc from "../ValidateHoc";
import ComboBox from "../ComboBox/Base.jsx";
class TreePicker extends ComboBox {
  constructor(props) {
    super(props);

    this.tree = React.createRef();
    this.checkbox = React.createRef();
    this.state = {
      ...this.state,
      filterText: "", //筛选
    };

    this.checkedAll = this.checkedAll.bind(this);

    this.onChange = this.onChange.bind(this);

  }


  /**
   * 设置值
   * @param {*} value
   */
  setValue(value) {
     let text = propsTran.processText(value, this.props.data);
    this.setState({
      value: value,
      text: text.join(","),
    });
    if (value) {
    
      this.tree.current.input.current.setChecked(value);
    } else {
      this.checkbox.current.setValue("");
      this.checkedAll("");
    }
  }


  /**
   * onchage 事件
   * @param {*} event
   */
  onChange(event) {
      this.props.validate && this.props.validate(value);
    this.tree.current.filter(event.target.value.trim());
    this.setState({
      inputText: event.target.value,
    });
    this.props.onChange &&
      this.props.onChange(
        event.target.value,
        event.target.value,
        this.props.name,
        event
      );
  }

  /**
   * 选择
   * @param {*} checked
   * @param {*} value
   * @param {*} text
   * @param {*} row
   */
  onSelect(checked, value, text, row) {
    let newValue = this.state.value || "";
    let newText = this.state.text || "";
    newValue = newValue ? newValue.split(",") : [];
    newText = newText ? newText.split(",") : [];
    if (checked) {
      newValue.push(value);
      newText.push(text);
    } else {
      newValue.splice(newValue.indexOf(value.toString()), 1);
      newText.splice(newText.indexOf(text.toString()), 1);
    }
    this.setState({
      value: newValue.join(","),
      text: newText.join(","),
      show: true,
    });
    this.props.onSelect &&
      this.props.onSelect(
        newValue.join(","),
        text.join(","),
        this.props.name,
        row
      );
  }
  /**
   * 全选
   * @param {*} value
   */
  checkedAll(value) {
    if (value) {
      let data =
        this.tree.current.input.current.checkedAll &&
        this.tree.current.input.current.checkedAll();
      let r = propsTran.getTreePickerValueAll(data);
      this.setState({
        value: r.values.join(","),
        text: r.texts.join(","),
      });
    } else {
      this.setState({
        value: "",
        text: "",
      });
      this.tree.current.input.current.clearChecked &&
        this.tree.current.input.current.clearChecked();
    }
  }
  /**
   * 筛选
   * @param {*} event
   */
  filterHandler(event) {
    if (event.keyCode === 13) {
      this.tree.current.input.current.filter &&
        this.tree.current.input.current.filter(event.target.value.trim());
    }
  }



  render() {
    let inputProps = {
      readOnly: this.props.readOnly,
      name: this.props.name,
      placeholder: this.props.placeholder || "",
      className: "wasabi-input  ",
      title: this.props.title,
      required: this.props.required,
    }; //文本框的属性

    return (
      <div className="combobox">
        {/* 暂时不处理 */}
        <i
          className={"combobox-clear icon-clear"}
          onClick={this.onClear.bind(this)}
          style={{
            display: this.props.readOnly
              ? "none"
              : this.state.value == "" || !this.state.value
                ? "none"
                : "inline",
          }}
        ></i>
        <i
          className={
            "comboxbox-icon icon-arrow-down " +
            (this.state.show ? "rotate" : "")
          }
          onClick={this.showPicker.bind(this)}
        ></i>
        <input
          type="text"
          {...inputProps}
          ref={this.input}
          value={this.state.text}
          onFocus={this.props.onFocus}
          onClick={this.onClick.bind(this)}
          onDoubleClick={this.onDoubleClick.bind(this)}
          onKeyUp={this.props.onKeyUp}
          onChange={this.onChange}
          onBlur={this.onBlur}
          autoComplete="off"
        />
        <div
          className={"dropcontainter treepicker  "}
          style={{
            display: this.state.show == true ? "block" : "none",
          }}
        >
          <div
            style={{
              height: 30,
              display: "flex",
              marginBottom: 10,
              justifyContent: "flex-end",
            }}
          >
            <input
              className=" wasabi-input treepickerinput"
              onKeyUp={this.filterHandler.bind(this)}
            ></input>
            {this.props.checkStyle == "checkbox" ? (
              <CheckBox
                name="wasabi-tree-choseall"
                ref={this.checkbox}
                style={{ marginTop: -1 }}
                data={[{ value: "1", text: "全选" }]}
                onSelect={this.checkedAll.bind(this)}
              ></CheckBox>
            ) : null}{" "}
          </div>
          <Tree
            ref={this.tree}
            {...this.props}
            // 注意了这里的idField
            idField={this.props.idField || this.props.valueField}
            data={this.props.data}
            onChecked={this.onSelect.bind(this)}
            checkAble={true}
          ></Tree>
        </div>
      </div>
    );
  }
}
TreePicker.propTypes = propTypes;
TreePicker.defaultProps = { type: "treepicker", checkStyle: "checkbox" };
export default ValidateHoc(TreePicker);
