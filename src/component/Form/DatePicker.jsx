/**
 * Created by zhiyongwang on 2016-04-26
 * desc:通用下拉日期,时间组件
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

// var unit=require("../libs/unit.js");
// let Time=require("./Time.jsx");
import DateD from "./DateD.jsx";
import DateTime from "./DateTime.jsx";
import DateRange from "./DateRange.jsx";
import DateTimeRange from "./DateTimeRange.jsx";

import validation from "../Lang/validation.js";
import regs from "../Lang/regs.js";

import validate from "../Mixins/validate.js";
import ClickAway  from "../Unit/ClickAway.js";
import mixins from '../Mixins/mixins';
import Label from "../Unit/Label.jsx";

import props from "./config/propType.js";
import config from "./config/dateConfig.js";
import defaultProps from "./config/defaultProps.js";
require("../Sass/Form/ComboBox.css");
class DatePicker extends Component {
  constructor(props) {
    super(props);
    var text = this.props.text;
    if (
      this.props.type.indexOf("date") > -1 ||
      this.props.type.indexOf("time") > -1
    ) {
      text = this.props.value;
    }
    this.state = {
      rangeCount: "-150%", // 时间选择框的位置
      value: this.props.value,
      text: text,
      validateClass: "", //验证的样式
      helpShow: "none", //提示信息是否显示
      helpTip: validation["required"], //提示信息
      invalidTip: ""
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.validate = this.validate.bind(this);
    
    this.onBlur = this.onBlur.bind(this);
    this.splitDate = this.splitDate.bind(this);
    this.splitDateTime = this.splitDateTime.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
    this._getText = this._getText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //不是容器，不用默认处理
  }
  componentDidMount() {
    this.registerClickAway(this.hidePicker, this.refs.picker);//注册全局单击事件
 
  }
  componentDidUpdate(){
    console.log(this.refs.pickerc.getBoundingClientRect());
    if(this.refs.pickerc.getBoundingClientRect().right>window.screen.availWidth){
      this.refs.pickerc.style.right="-90px";
    }
  }
  getValue() {
    let value=this.state.value?this.state.value:"";
    if(this.props.type=="daterange"&&value&& this.props.attachTime){
      value=value.split(",");
      value[0]=value[0]+" 00:00:00";
      value[1]=value[1]+" 23:59:59";
      value=value.join(",");
    }
    return value;
  }
  setValue(value) {
    if (this.validate(value)) {
      if(this.props.type=="daterange"&&value.indexOf(" ")>-1){
//包含了时间

      value=value.split(",");
      value[0]=value[0].split(" ")[0];
      value[1]=value[1].split(" ")[0];
      value=value.join(",");
      }
      this.setState({
        value: value
      });
    }
  }
  validate(value) {
    return validate.call(this, value);
  }
 

  onBlur() {
    this.refs.label.hideHelp(); //隐藏帮助信息
  }

  splitDate(splitdate) {
    //拆分日期格式

    if (
      splitdate &&
      splitdate.indexOf(" ") > -1 &&
      regs.datetime.test(splitdate)
    ) {
      //有时间

      splitdate = splitdate.split(" ")[0];
      var returnvalue = {
        year: splitdate.split("-")[0] * 1,
        month: splitdate.split("-")[1] * 1,
        day: splitdate.split("-")[2] * 1
      };
      return returnvalue;
    } else if (regs.date.test(splitdate)) {
      var returnvalue = {
        year: splitdate.split("-")[0] * 1,
        month: splitdate.split("-")[1] * 1,
        day: splitdate.split("-")[2] * 1
      };
      return returnvalue;
    } else {
      return null;
    }
  }
  splitDateTime(datetime) {
    //

    if (
      datetime &&
      regs.datetime.test(datetime) &&
      datetime.indexOf(" ") > -1
    ) {
      //如果不为空
      var splitdate = datetime.split(" ")[0];
      if (splitdate && splitdate != "") {
        var returnvalue = {
          year: splitdate.split("-")[0] * 1,
          month: splitdate.split("-")[1] * 1,
          day: splitdate.split("-")[2] * 1,
          time: datetime.split(" ")[1]
        };
        return returnvalue;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  showPicker(type) {
    //显示选择
    if (this.props.readonly) {
      //只读不显示
      return;
    } else {
      this.setState({
        show: type == 1 ? !this.state.show : true
      });
    }
    
    this .bindClickAway();//绑定全局单击事件
  }
  hidePicker() {
    this.setState({
      show: false
    });
      this.unbindClickAway();//卸载全局单击事件
  }
  onSelect(value, text) {
    //选中事件
    this.setState({
      show: false,
      value: value,
      text: text
    });
    this.validate(value);
    this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
  }
  clearHandler() {
    //清除数据
    this.setState({
      value: "",
      text: ""
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
  }
  changeHandler(event) {}

  clearHandler() {
    //清除数据
    this.setState({
      value: "",
      text: ""
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
  }
  _getText() {
    var text = this.state.text;
    if (this.props.type == "date") {
      if (text && text.indexOf(" ") > -1) {
        text = text.split(" ")[0]; //除去显示的时间格式
      }
    } else if (this.props.type == "daterange") {
      if (text && text.indexOf(" ") > -1) {
        var arr = text.split(",");
        text = "";
        if (arr.length > 0 && arr[0].indexOf(" ") > -1) {
          text = arr[0].split(" ")[0];
        }

        if (arr.length == 2) {
          if (arr[0].indexOf(" ") > -1) {
            text = arr[0].split(" ")[0];
          }
          if (arr[1].indexOf(" ") > -1) {
            text += "," + arr[1].split(" ")[0];
          }
        }
      }
    }
    return text;
  }

  renderDate() {
    var dateobj = this.splitDate(this.state.value);
    if (this.state.value && this.state.value.indexOf(" ") > -1) {
      //说明有时间
      dateobj = this.splitDateTime(this.state.value);
    }

    return (
      <DateD
        ref='combobox'
        name={this.props.name}
        showTime={false}
        {...dateobj}
        onSelect={this.onSelect}
      ></DateD>
    );
  }
  renderDateTime() {
    var dateobj = this.splitDateTime(this.state.value);
    console.log(dateobj);
    return (
      <DateTime
        ref='combobox'
        {...dateobj}
        name={this.props.name}
        showTime={true}
        onSelect={this.onSelect}
      ></DateTime>
    );
  }
  renderDateTimeRange() {
    var firstDate = null;
    var secondDate = null;
    var firstTime = null;
    var secondTime = null;
    if (this.state.value != null && this.state.value != "") {
      //传入一到两个值
      var dateArray = this.state.value.split(",");
      if (dateArray.length > 0) {
        if (dateArray[0].indexOf(" ") > -1) {
          //有时间
          firstDate = dateArray[0].split(" ")[0];
          firstTime = dateArray[0].split(" ")[1];
        } else {
          firstDate = dateArray[0];
        }
      }
      if (dateArray.length >= 2) {
        if (dateArray[1].indexOf(" ") > -1) {
          //有时间
          secondDate = dateArray[1].split(" ")[0];
          secondTime = dateArray[1].split(" ")[1];
        } else {
          secondDate = dateArray[1];
        }
      }
    }
    return (
      <DateTimeRange
        ref='combobox'
        name={this.props.name}
        firstDate={firstDate}
        firstTime={firstTime}
        secondDate={secondDate}
        secondTime={secondTime}
        onSelect={this.onSelect}
      ></DateTimeRange>
    );
  }
  renderDateRange() {
    var firstDate = null;
    var secondDate = null;
    if (this.state.value != null && this.state.value != "") {
      //传入一到两个值
      var dateArray = this.state.value.split(",");
      if (dateArray.length > 0) {
        firstDate = dateArray[0];
      }
      if (dateArray.length >= 2) {
        secondDate = dateArray[1];
      }
    }
    return (
      <DateRange
        ref='combobox'
        name={this.props.name}
        firstDate={firstDate}
        secondDate={secondDate}
        onSelect={this.onSelect}
      ></DateRange>
    );
  }

  /** focus */
  onFocus(e) {
    
    const rangeX = document.getElementsByClassName("dropcontainter range ");
    if (rangeX && rangeX.length > 0) {
      setTimeout(() => {
        if (this.getElementLeft(rangeX[0]) < 0) {
          this.setState({
            rangeCount: 0
          });
        }
        if (
          this.getElementLeft(rangeX[0]) > 10 &&
          this.getElementLeft(rangeX[0]) < 100
        ) {
          this.setState({
            rangeCount: "-30%"
          });
        }
        if (this.getElementLeft(rangeX[0]) > 300) {
          this.setState({
            rangeCount: "-85%"
          });
        }
      }, 150);
    }
  }

  getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    return actualLeft;
  }

  render() {
    let control = null;
    let controlDropClassName = "";

    switch (this.props.type) {
      case "date":
        control = this.renderDate();
        controlDropClassName = "date";
        break;
      case "datetime":
        control = this.renderDateTime();
        controlDropClassName = "date time";

        break;
      case "daterange":
        control = this.renderDateRange();
        controlDropClassName = "range";
        break;
      case "datetimerange":
        control = this.renderDateTimeRange();
        controlDropClassName = "range";
        break;
    }

    var componentClassName = "wasabi-form-group "; //组件的基本样式

    let inputProps = {
      readOnly: this.props.readonly == true ? "readonly" : null,

      name: this.props.name,
      placeholder:
        this.props.placeholder === "" || this.props.placeholder == null
          ? this.props.required
            ? "必填项"
            : ""
          : this.props.placeholder,
      className:
        "wasabi-form-control  " +
        (this.props.className != null ? this.props.className : ""),
      title: this.props.title
    }; //文本框的属性

    var text = this._getText();
    let style = this.props.style
      ? JSON.parse(JSON.stringify(this.props.style))
      : {};
    if (this.props.hide) {
      style.display = "none";
    } else {
      style.display = "flex";
    }

    return (
      <div
        className={componentClassName + this.state.validateClass}
        ref='picker'
        style={style}
      >
        <Label
          name={this.props.label}
          ref='label'
          style={this.props.labelStyle}
          required={this.props.required}
        ></Label>
        <div
          className={"wasabi-form-group-body"}
          style={{ width: this.props.type == "date" ? null : 200 }}
        >
          <div className='combobox'>
            <i
              className={"picker-clear"}
              onClick={this.clearHandler}
              style={{
                display: this.props.readonly
                  ? "none"
                  : this.state.value == "" || !this.state.value
                  ? "none"
                  : "inline"
              }}
            ></i>
            <i
              className={"pickericon  " + (this.state.show ? " rotate" : "")}
              onBlur={this.onBlur}
              onClick={this.showPicker.bind(this, 1)}
            ></i>
            <input
              type='text'
              {...inputProps}
              value={text}
              onFocus={e => this.onFocus(e)}
              onClick={this.showPicker.bind(this, 2)}
              onChange={this.changeHandler}
            />
            <div 
            ref="pickerc"
              className={"dropcontainter " + controlDropClassName + " "}
              style={{
                display: this.state.show == true ? "block" : "none",
               
              }}
            >
              {control}
            </div>
          </div>
          <small
            className={"wasabi-help-block "}
            style={{
              display:
                this.state.helpTip && this.state.helpTip != ""
                  ? this.state.helpShow
                  : "none"
            }}
          >
            <div className='text'>{this.state.helpTip}</div>
          </small>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = Object.assign({ type: PropTypes.oneOf(config) }, props);

DatePicker.defaultProps = Object.assign({}, defaultProps, { type: "datetime" });
mixins(DatePicker,[ClickAway]);ClickAway
export default DatePicker;
