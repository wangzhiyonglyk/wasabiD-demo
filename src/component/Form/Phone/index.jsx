/**
 * creat date :2024-01-26
 * 手机号组件，带国家的
 */
import React, { Component } from "react";
import propTypes from "../propsConfig/propTypes.js";
import func from "../../libs/func/index.js";
import ValidateHoc from "../ValidateHoc/index.jsx";
import PhoneInput from "./Input.jsx";
import dom from "../../libs/dom";
import { setDropcontainterPosition } from "../propsConfig/public.js";
import Country from "./Country.jsx";
import "./index.css"
 class Phone extends Component{

  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      pickerid: func.uuid(),
      show: false, //是否显示下拉框
      value: "",
      oldPropsValue: "", //保存初始化的值
    
    
    };
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClear = this.onClear.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onSelect=this.onSelect.bind(this)

    
  }
  static getDerivedStateFromProps(props, state) {
    let newState = {};
   
    if (props.value !== state.oldPropsValue) {
    
      newState = {
        value:props.value ,
        oldPropsValue: props.value,    
      };
    }
    return newState;
  }
  componentDidUpdate() {
    dom.scrollVisible(document.getElementById(this.state.pickerid)); //上在滚动条的情况下自动止浮
  }
  /**
   * 设置值
   * @param {*} value
   */
  setValue(value) {
    this.setState({
      value: value,
    });
    this.props.validate && this.props.validate(value);
  }
  /**
   * 获取值
   * @returns
   */
  getValue() {
    return this.state.value;
  }
  /**
   * 清除值
   */
  onClear() {
    this.setState({
      value: "",
    });
    this.props.validate && this.props.validate(""); //验证
    this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
  }

  /**
   * 失去焦点
   */
  onBlur(event) {
    this.props.validate(this.state.value); //验证
    //在此处处理失去焦点事件
    this.props.onBlur &&
      this.props.onBlur(
        this.state.value,
        this.state.value,
        this.props.name,
        event
      );
  }
  /**
   * 得到焦点
   */
  focus() {
    try {
      this.input.current.focus();
    } catch (e) {
      console.log("error", e);
    }
  }
  /***
   * 输入框的单击事件
   */
  onClick(event) {
 
    this.props.onClick && this.props.onClick(event);
  }
  /**
   * 双击事件
   * @param {*} event
   */

  onDoubleClick(event) {
    this.props.onDoubleClick && this.props.onDoubleClick(event);
  }

  /**
   * 输入框的change事件,过滤
   * @param {*} event
   */
  onChange(event) {
    this.setState({
      value: event.target.value.trim(),
    });
    this.props.onChange && this.props.onChange(value,this.props.name,event);
  }
  /**
   * 选中
   * @param {*} country 
   */
onSelect(country,event){
  this.setState({
     show: false,
    value:"+"+country.areaCode+" "
  })
 
}
  /**
   *
   * @returns
   */
  showPicker(show = true) {
    //显示选择
    try {
      if (this.props.readOnly) {
        //只读不显示
        return;
      } else {
        this.setState({
          show: show,
        });
      }
      document.addEventListener("click", this.hidePicker);
      setDropcontainterPosition(this.input.current);
    } catch (e) {}
  }
  hidePicker(event) {
    if (
      !dom.isDescendant(
        document.getElementById(this.props.containerid),
        event.target
      )
    ) {
      console.log("11")
      this.setState({
        show: false,
      });

      try {
        document.removeEventListener("click", this.hidePicker);
        this.props.validate && this.props.validate(this.state.value);
        //在此处处理失去焦点事件
        this.props.onBlur &&
          this.props.onBlur(this.state.value, this.state.text, this.props.name);
      } catch (e) {}
    }
    else{
      console.log("dd")
    }
  }
  render(){
   return   <div className="combobox wasabi-phone ">
    <PhoneInput   
       ref={this.input}
          {...this.props}
          show={this.state.show}
     
          value={this.state.value}
          onFocus={this.props.onFocus}
          onClick={this.onClick}
          showPicker={this.showPicker.bind(this,true)}
          onDoubleClick={this.onDoubleClick}
          onKeyUp={this.props.onKeyUp}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onClear={this.onClear}
         
          ></PhoneInput>
            <div
          className={"dropcontainter  phone"}
          style={{ display: this.state.show == true ? "block" : "none" }}
          id={this.state.pickerid}
        >
       
         <Country  onSelect={this.onSelect} value={this.state.value}></Country>
        </div>
          </div>
  }
 

}
Phone.propTypes = propTypes;
Phone.defaultProps = { type: "phone" };
export default ValidateHoc((Phone));