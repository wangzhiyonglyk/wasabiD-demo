/*
 create by wangzhiyonglyk
 date:2016-07-04
 edit 2020-10 参照ztree改造
 desc:表格下拉选择
 */
import React from "react";
import DataGrid from "../../Data/DataGrid/index.jsx";
import propTypes from "../propsConfig/propTypes.js";
import ValidateHoc from "../ValidateHoc";

import loadDataHoc from "../loadDataHoc";
import Msg from "../../Info/Msg.jsx";

import ComboBox from "../ComboBox/Base.jsx";


class GridPicker extends ComboBox {
  constructor(props) {
    super(props);
    this.state={
      ...this.state,
      gridrender:false
    }
    this.grid = React.createRef();
    this.showPicker=this.showPicker.bind(this)
    this.setValue=this.setValue.bind(this)
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  
  }
  /**
     * 显示下拉框,可以用于隐藏
     * @returns
     */
    showPicker(show = true) {
        try {
            //显示下拉选项
            if (this.props.readOnly) {
                return;
            }

            this.setState({
                show: show,
           
            },()=>{
              if(this.state.gridrender===false){
                this.setState({
                  gridrender:true
                })
              }
            });

            document.addEventListener("click", this.hidePicker);
            // 日期组件多一层
            setDropcontainterPosition(this.input.current?.input?this.input.current.input.current:this.input.current);
        } catch (e) { }
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
      value = value.split(",");
      let checkRowData = [];
      for (let i = 0; i < value.length; i++) {
        let obj = {};
        obj[this.props.priKey] = value[i];
        checkRowData.push(obj);
      }
      this.grid.current.setChecked(checkRowData);
    } else {
      this.grid.current.clearChecked();
    }
  }
  /**
   * onchage 事件
   * @param {*} event
   */
  onChange(event) {
    try {
        this.props.validate && this.props.validate(value);
      this.gird.current.filter(event.target.value.trim());
      this.setState({
    
        inputText: event.target.value.trim(),
      });
      this.props.onChange &&
        this.props.onChange(
          event.target.value,
          event.target.value,
          this.props.name,
          event
        );
    } catch (e) {}
  }
  /**
   * 选择
   * @param {*} checked
   * @param {*} value
   * @param {*} text
   * @param {*} row
   */
  onSelect(data) {
    if (this.props.valueField) {
      let value = [];
      let text = [];
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          value.push(data[this.props.valueField] || "");
          text.push(data[this.props.textField] || "");
        }
      }
      this.setState({
        value: value.join(","),
        text: text.join(","),
      });
      this.props.onSelect &&
        this.props.onSelect(
          value.join(","),
          text.join(","),
          this.props.name,
          {}
        );
    } else {
      Msg.error("必须设置valueField,textField");
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
          ref={this.input}
          {...inputProps}
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
          className={"dropcontainter gridpicker  "}
         style={{ display: this.state.show == true ? "block" : "none" }}
          id={this.state.pickerid}
        >
        {this.state.gridrender?  <DataGrid
            grid={this.gird}
            {...this.props}
             selectAble={true}
            onChecked={this.onSelect}
          ></DataGrid>:null}
        </div>
      </div>
    );
  }
}
GridPicker.propTypes = propTypes;
GridPicker.defaultProps = { type: "gridpicker" };

export default ValidateHoc(loadDataHoc(GridPicker));
