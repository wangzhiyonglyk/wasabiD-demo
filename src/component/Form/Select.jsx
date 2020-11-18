/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * 下拉框
 */
import React, { Component } from 'react';
import Label from '../Info/Label.jsx';
import ClickAway from "../libs/ClickAway.js";
import mixins from '../Mixins/mixins';
import props from './config/propType.js';
import defaultProps from "./config/defaultProps.js";
import _ComboBox from "./baseClass/_ComboBox.jsx";
import '../Sass/Form/Select.css';
class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,//是否显示下拉框
      text: this.props.text,
      value: this.props.value,
      oldPropsValue: this.props.value,//保存初始化的值
    };
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value != prevState.oldPropsValue) {//父组件强行更新了
      return {
        value: nextProps.value,
        text: nextProps.text,
        oldPropsValue: nextProps.value
      }
    }
    return null;
  }
  componentDidMount() {
    this.registerClickAway(this.hidePicker, this.refs.select);//注册全局单击事件
  }
  showPicker() {
    //显示下拉选项
    if (this.props.readOnly) {
      return;
    }
    this.setState({
      show:  !this.state.show
    });
    this.props.onClick && this.props.onClick();
    this.bindClickAway();//绑定全局单击事件
  }
  hidePicker(event) {
    this.setState({
      show: false
    });
    try {
      this.refs.label.hideHelp(); //隐藏帮助信息
    }
    catch (e) {

    }
    this.unbindClickAway();//卸载全局单击事件
  }
  onSelect(value, text, row) {
    //选中事件
    let newvalue = "", newtext = "";
    if (this.props.multiple) {//多选
      let oldvalue = [];
      let oldtext = [];
      if (this.state.value) {
        oldvalue = this.state.value.toString().split(',');
        oldtext = this.state.text.toString().split(',');
      }
      if (oldvalue.indexOf(value.toString()) > -1) {
        //取消选中
        oldvalue.splice(oldvalue.indexOf(value.toString()), 1);
        oldtext.splice(oldvalue.indexOf(value.toString()), 1);
        newvalue = oldvalue.join(',');
        newtext = oldtext.join(',');
      }
      else {
        //选中
        if (this.state.value) {
          newvalue = this.state.value + ',' + value;
          newtext = this.state.text + ',' + text;
        } else {
          newvalue = value;
          newtext = text;
        }
      }
      this.setState({
        value: newvalue,
        text: newtext
      });
    
      if (this.props.onSelect != null) {
        this.props.onSelect(value, text, this.props.name, row);
      }
    } else {
      newvalue = value;
      newtext = text;
      this.setState({
        show: false,
        value: newvalue,
        text: newtext,
        filterValue: null
      });
    }
  
    if (this.props.onSelect != null) {
      this.props.onSelect(value, text, this.props.name, row);
    }
  }
  onBlur(event) {
    if (this.props && this.props.addAbled) {
      this.addHandler(event);
    }
    else{
      this.props.onBlur&&this.props.onBlur();
    }
    
  }
  keyUpHandler(event) {
    if (this.props && this.props.addAbled && event.keyCode == 13) {
      this.addHandler(event);
    }
  }
  /**
   * 手动输入添加
   * @param {*} event 
   */
  addHandler(event) {
    if(event.target.value){
      let filter = this.props.data.filter((item, index) => {
        return item.text == event.target.value;
      });
      if (filter.length == 0) {
        this.setState({
          value: event.target.value,
          text: event.target.value,
          filterValue:""//一定清空。否则出现添加空白列
        });
        this.props.addData&&  this.props.addData( event.target.value,  event.target.value)
  
      }
    }
  
  }
  filterChangeHandler(event) {
    //筛选查询
    this.refs.ul.scrollTop = 0; //回到顶部
    this.setState({ 
      filterValue: event.target.value,
      value:event.target.value?this.state.value:"",//如果清空了，则选择值也清空
      text:event.target.value?this.state.text:"",
      show: true
    });
  
    if(!event.target.value){
      this.props.clearHandler&&this.props.clearHandler();
    }
    
  }
  render() {
    let componentClassName = "wasabi-form-group "+(this.props.className||"")+" ";//组件的基本样式 
    let inputProps = {
      readOnly: this.props.readOnly == true ? 'readOnly' : null,

      name: this.props.name,
      placeholder:
        this.props.placeholder === '' || this.props.placeholder == null
          ? this.props.required
            ? '必填项'
            : ''
          : this.props.placeholder,
      className:
        'wasabi-form-control  ',
      title: this.props.title
    }; //文本框的属性
    let control = null;

    if (this.props.data && this.props.data.length > 0) {
      control = (
        <ul
          ref='ul'
        >
          {this.props.data.map((child, i) => {
            let reg = new RegExp("^"+this.state.filterValue, 'i');//左匹配
            if (this.state.filterValue && child.text.search(reg) == -1) {
              return;
            } else {
              //TODO 这里要用正则，先保留
              let checked = false;
              if (
                this.state.value &&
                child.value &&
                (',' + this.state.value.toString() + ',').indexOf(
                  ',' + child.value + ','
                ) > -1
              ) {
                checked = true;
              } else if (this.state.value == '' && child.value == '') {
                //防止有空值的情况
                checked = true;
              }

              return (
                <li
                  key={'li' + i}
                  className={checked == true ? 'active' : ''}
                  onClick={this.onSelect.bind(
                    this,
                    child.value,
                    child.text,
                    child
                  )}
                >
                  {child.text}
                </li>
              );
            }
          })}
        </ul>
      );
    }
    let style = this.props.style
      ? JSON.parse(JSON.stringify(this.props.style))
      : {};
    if (this.props.hide) {
      style.display = 'none';
    } else {
      style.display = 'flex';
    }

    return (

      <div
        className={componentClassName + this.props.validateClass}
        ref="select"
        style={style}
      >
        <Label ref="label" readOnly={this.props.readOnly||this.props.disabled} style={this.props.labelStyle} help={this.props.help} required={this.props.required}>{this.props.label}</Label>
        <div className={'wasabi-form-group-body' +(this.props.readOnly||this.props.disabled?" readOnly":"")}>
          <div className={'combobox wasabi-select'}>
            <i
              className={'combobox-clear'}
              onClick={this.props.clearHandler}
              style={{
                display: this.props.readOnly
                  ? 'none'
                  : this.state.value == '' || !this.state.value
                    ? 'none'
                    : 'inline'
              }}
            ></i>
            <i
              className={'comboxbox-icon ' + (this.state.show ? 'rotate' : '')}
              onClick={this.showPicker.bind(this)}
            ></i>
            <input
              type='text'
              {...inputProps}
              title={this.props.addAbled ? '输入搜索，回车添加' : '输入搜索'}
              onKeyUp={this.keyUpHandler}
              value={
                this.state.filterValue
                  ? this.state.filterValue || ''
                  : this.state.text || ''
              }
              onClick={this.showPicker.bind(this)}
              onBlur={this.onBlur}
              onChange={this.filterChangeHandler}
            />
 <div className={"dropcontainter  select" } style={{ display: this.state.show == true ? "block" : "none" }}   >    {control}</div>
        
          </div>
          <small
            className={'wasabi-help-block '}
            style={{
              display:
                this.props.inValidateText && this.props.inValidateText != ''
                  ? this.props.inValidateShow
                  : 'none'
            }}
          >
            <div className='text' >{this.props.inValidateText}</div>
          </small>
        </div>
      </div>
    );
  }
}
Select.propTypes = props;
Select.defaultProps = Object.assign(defaultProps,{type:"select"});
mixins(Select, [ClickAway]);
export default _ComboBox( Select);
