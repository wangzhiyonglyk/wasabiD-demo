/**
 * Created by zhiyongwang on 2016-04-26
 * desc:通用下拉日期,时间组件
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import DateD from "./DateD.jsx";
import DateTime from "./DateTime.jsx";
import DateRange from "./DateRange.jsx";
import DateTimeRange from "./DateTimeRange.jsx";
import Time from "./Time";
import TimeRange from "./TimeRange";
import validation from "../Lang/validation.js";
import regs from "../Lang/regs.js";

import validate from "../Mixins/validate.js";
import ClickAway from "../libs/ClickAway.js";
import mixins from '../Mixins/mixins';
import Label from "../Info/Label.jsx";
import func from "../libs/func"
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
      cotainerid: func.uuid(),
      rangeCount: "-150%", // 时间选择框的位置
      oldPropsValue: this.props.value,//保留原来的值
      value: this.props.value,
      text: text,
      validateClass: "", //验证的样式
      inValidateShow: "none", //提示信息是否显示
      inValidateText: validation["required"], //提示信息
    
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
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value != prevState.oldPropsValue) {
      return {
        value: nextProps.value,
        oldPropsValue: nextProps.value
      }
    }
    return null;
  }
  componentDidMount() {
    this.registerClickAway(this.hidePicker, document.getElementById(this.state.cotainerid));//注册全局单击事件

  }
  componentDidUpdate() {

    if (this.refs.pickerc.getBoundingClientRect().right > window.screen.availWidth) {
      this.refs.pickerc.style.right = "0px";
    }
  }
  getValue() {
    let value = this.state.value ? this.state.value : "";
    if(this.props.type=="date"&&value && this.props.attachTime){
      value=value+" "+func.dateformat(new Date(),"HH:mm:ss");
    }
    else if (this.props.type == "daterange" && value && this.props.attachTime) {
      value = value.split(",");
      value[0] = value[0] + " 00:00:00";
      value[1] = value[1] + " 23:59:59";
      value = value.join(",");
    }
    return value;
  }
  setValue(value) {
    if (value && this.validate(value)) {
      if (this.props.type == "daterange" && value.indexOf(" ") > -1) {
        //包含了时间

        value = value.split(",");
        value[0] = value[0].split(" ")[0];
        value[1] = value[1].split(" ")[0];
        value = value.join(",");
      }
      this.setState({
        value: value,
        text: value
      });
    } else {
      this.setState({
        value: "",
        text: ""
      });
    }
  }


  onBlur() {
    this.validate(this.state.value);
    this.refs.label.hideHelp(); //隐藏帮助信息
  }

  splitDate(datestr) {
    //拆分日期格式

    if (
      datestr &&
      datestr.indexOf(" ") > -1 &&
      regs.datetime.test(datestr)
    ) {
      //有时间

      datestr = datestr.split(" ")[0];
      var returnvalue = {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1
      };
      return returnvalue;
    } else if (regs.date.test(datestr)) {
      var returnvalue = {
        year: datestr.split("-")[0] * 1,
        month: datestr.split("-")[1] * 1,
        day: datestr.split("-")[2] * 1
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
  showPicker(e) {
    
    //显示选择
    if (this.props.readOnly) {
      //只读不显示
      return;
    } else {
      this.setState({
        show:  !this.state.show
      });
    }

    this.bindClickAway();//绑定全局单击事件
  }
  hidePicker() {
    this.setState({
      show: false
    });
    this.unbindClickAway();//卸载全局单击事件
  }
  onSelect(value, text, name, hide = true) {
    let isvalidate = this.validate(value);//只是验证一下，不影响回传给父组件
    //选中事件
    this.setState({
      show: !hide,
      value: value,
      text: text
    });

    this.props.onSelect && this.props.onSelect(value, text, this.props.name, null);
  }
  clearHandler() {
    //清除数据
    this.setState({
      value: "",
      text: ""
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
  }
  changeHandler(event) { }

  clearHandler() {
    //清除数据
    this.setState({
      value: "",
      text: ""
    });
    this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
  }
  _getText() {
    var text = this.state.text ? this.state.text : this.state.value;
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
  renderTime() {


    return (
      <Time
        ref='combobox'
        name={this.props.name}
        value={this.state.value}
        onSelect={this.onSelect}

        hideSecond={this.props.hideSecond}
      ></Time>
    );
  }
  renderDateTime() {
    var dateobj = this.splitDateTime(this.state.value);
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
        type={this.props.type}
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
        type={this.props.type}
        name={this.props.name}
        firstDate={firstDate}
        secondDate={secondDate}
        onSelect={this.onSelect}
      ></DateRange>
    );
  }
  renderTimeRange() {
    return (
      <TimeRange
        ref='combobox'
        type={this.props.type}
        name={this.props.name}
        value={this.state.value}
        onSelect={this.onSelect}
        hideSecond={this.props.hideSecond}
      ></TimeRange>
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
      case "time":
        control = this.renderTime();
        controlDropClassName = "time";
        break;
      case "timerange":

        control = this.renderTimeRange();
        controlDropClassName = "timerange";
        break;
      case "datetime":
        control = this.renderDateTime();
        controlDropClassName = "datetime";
        break;
      case "daterange":
        control = this.renderDateRange();
        controlDropClassName = "daterange";
        break;
      case "datetimerange":
        control = this.renderDateTimeRange();
        controlDropClassName = "datetimerange";
        break;
    }

    let componentClassName = "wasabi-form-group "+(this.props.className||"")+" ";//组件的基本样式 

    let inputProps = {
      readOnly: this.props.readOnly == true ? "readOnly" : null,

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

    let width = null;
    switch (this.props.type) {
      case "daterange":
        width = 210;
        break;
      case "datetimerange":
        width = 330;
        break;
      default:
        break;

    }

    return (
      <div
        className={componentClassName + this.state.validateClass}
        ref='picker'
        id={this.state.cotainerid}
        style={style}
      >
         <Label ref="label" readOnly={this.props.readOnly||this.props.disabled} style={this.props.labelStyle} help={this.props.help} required={this.props.required}>{this.props.label}</Label>
        <div
          className={"wasabi-form-group-body " +(this.props.readOnly||this.props.disabled?" readOnly":"")}
          style={{ minWidth:width}}
        >
          <div className='combobox'>
            <i
              className={"combobox-clear"}
              onClick={this.clearHandler}
              style={{
                display: this.props.readOnly
                  ? "none"
                  : this.state.value == "" || !this.state.value
                    ? "none"
                    : "inline"
              }}
            ></i>
            <i
              className={"comboxbox-icon icon-calendar  "}
          
              onClick={this.showPicker.bind(this)}
            ></i>
            <input
              type='text'
              {...inputProps}
              value={text}
              onFocus={e => this.onFocus(e)}
              onClick={this.showPicker.bind(this)}
              onChange={this.changeHandler}
              onBlur={this.onBlur}
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
                this.state.inValidateText && this.state.inValidateText != ""
                  ? this.state.inValidateShow
                  : "none"
            }}
          >
            <div className='text'>{this.state.inValidateText}</div>
          </small>
        </div>
      </div>
    );
  }
}

DatePicker.propTypes = Object.assign({ type: PropTypes.oneOf(config) }, props);

DatePicker.defaultProps = Object.assign({}, defaultProps, { type: "datetime" });
mixins(DatePicker, [ClickAway, validate]);
export default DatePicker;
