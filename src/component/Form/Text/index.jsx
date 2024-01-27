//creete by wangzhiyonglyk
//date:2016-08-02
//edit by wangzhiyonglyk
//desc 普通的文本框,可以进行搜索
import React, { Component } from "react";
import propTypes from "../propsConfig/propTypes.js";
import BaseInput from "../BaseInput/index.jsx";
import SelectbleList from "../Select/SelectbleList";
import ValidateHoc from "../ValidateHoc";
import Msg from "../../Info/Msg.jsx";
import dom from "../../libs/dom";
import "../Select/select.css";


/**
 * 图标
 * @param {*} props
 * @returns
 */
function Icon(props) {
  return (
    <i
      disabled={props.disabled}
      className=" icon-search"
      style={{
        cursor: "pointer",
        position: "absolute",
        right: 10,
        top: "var(--position-top)",
        color: "var(--color)",
      }}
      onClick={props.onSearch}
    ></i>
  );
}

function AfterIcon(props) {
  return (
    <i
      className={props.afterIcon}
      style={{
        cursor: "pointer",
        position: "absolute",
        right: 10,
        top: "var(--position-top)",
        color: "var(--color)",
      }}
      onClick={props.onClick}
    ></i>
  );
}
function BeforeIcon(props) {
  return (
    <i
      className={props.beforeIcon}
      style={{
        cursor: "pointer",
        position: "absolute",
        left: 2,
        top: "var(--position-top)",
        color: "var(--color)",
      }}
      onClick={props.onClick}
    ></i>
  );
}
/**
 * 数据列表
 * @param {*} props
 * @returns
 */
function DataList(props) {
  return (
    <div className="wasabi-select">
      <SelectbleList
        show={props.show}
        value={props.value || ""}
        data={props.data || []}
        onSelect={props.onSelect}
      ></SelectbleList>
    </div>
  );
}
/**
 * 文本框
 * @param {*} props
 * @returns
 */
function TextInput(props) {
  if (props.type !== "textarea") {
    return <BaseInput {...props}></BaseInput>;
  } else {
    return <textarea {...props}></textarea>;
  }
}

class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPropsValue: null, //保存用于匹配
      value: this.props.value || "",
      show: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.onClear=this.onClear.bind(this)
    this.onSelect = this.onSelect.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.cellHandler = this.cellHandler.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.oldPropsValue) {
      //就是说原来的初始值发生改变了，说明父组件要更新值
      return {
        value: props.value || "",
        oldPropsValue: props.value,
      };
    }
    return null;
  }
  getValue() {
    //获取值
    return this.state.value;
  }
  setValue(value) {
    //设置值
    this.setState({
      value: value,
      show: false,
    });
  }
  /**
   * 隐藏下拉框
   * @param {*} event
   */
  hidePicker(event) {
    if (
      event.target &&
      !dom.isDescendant(
        document.getElementById(this.props.containerid),
        event.target
      )
    ) {
      this.setState({
        show: false,
      });
      try {
        document.removeEventListener("click", this.hidePicker, fal);
      } catch (e) {}
    }
  }
  onChange(event) {
    let value = event.target.value.toString();
    let isvalidate = true;
    if (this.props.type === "number" || this.props.type === "integer") {
      /**
       * 数字与整数要先验证，
       * 验证时，当一个字符是+,或者-是被认为是正确，不能使用正则验证,否则通不过，但失去焦点则可以使用正则
       */
      isvalidate =
        value === "+" ||
        value === "-" ||
        (this.props.validate && this.props.validate(value));
    }

    if (this.props.type === "number" || this.props.type === "integer") {
      if (isvalidate) {
        this.cellHandler(event);
      }
    } else {
      this.cellHandler(event);
    }
  }

  onKeyUp(event) {
    setTimeout(() => {
      this.onSearch();
    }, 300);
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }
  onSearch() {
    this.props.onSearch && this.props.onSearch(this.state.value);
  }
  onBlur(event) {
    this.props.validate && this.props.validate(this.state.value);
    this.props.onBlur &&
      this.props.onBlur(
        event.target.value,
        event.target.value,
        this.props.name,
        event
      );
  }
  /**
   * 搜索后选中事件
   * @param {*} value
   * @param {*} text
   */
  onSelect(value, text) {
    this.setValue(value);
    this.props.onChange && this.props.onChange(value, value, this.props.name);
  }
    /**
   * 全部清除
   */
    onClear(event) {
      event.stopPropagation(); //防止冒泡
      this.setValue("");
      this.props.validate && this.props.validate("");
      this.props.onChange && this.props.onChange("", "", this.props.name);
      // 注意了这里也执行，防止直接清空
      this.props.onBlur && this.props.onBlur( "","", this.props.name, event );
    
    }
  /**
   * 专门用于表格组件 todo
   * @param {*} event
   */
  onPaste(event) {
    this.props.onPaste && this.props.onPaste(event, this.state.value);
  }
  /**
   * 为excel单元格粘贴复制做特殊处理 todo
   */
  cellHandler(event) {
    const ancestorNode = dom.findAncestorByClasss(
      event.target,
      "wasabi-table-cell"
    );
    let value = value||event.target.value;
    if (ancestorNode) {
      //是单元格中的输入框
      if (
        event.ctrlKey &&
        (value.indexOf("\t") > -1 || value.indexOf("\n") > -1)
      ) {
        //在表格中粘贴，
        //除了富文本，其他不处理 todo
        if (this.props.type === "textarea") {
          Msg.alert("表格中富文本不处理excel粘贴");
          this.setValue(value);
          this.props.onChange &&
            this.props.onChange(value, this.props.name,event); //自定义的改变事件
        }
      } else {
        this.setValue(value);
        this.props.onChange &&
          this.props.onChange(value, this.props.name,event); //自定义的改变事件
      }
    } else {
      this.setValue(value);
      this.props.onChange && this.props.onChange(value, this.props.name,event); //自定义的改变事件
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.addBefore ? (
          <div className="wasabi-preend before">{this.props.addBefore}</div>
        ) : null}
        {this.props.beforeIcon ? (
          <BeforeIcon
            beforeIcon={this.props.beforeIcon}
            onClick={this.props.onClick}
          ></BeforeIcon>
        ) : null}
        <TextInput
          id={this.props.id}
          type={this.props.type}
          name={this.props.name}
          title={this.props.title}
          readOnly={this.props.readOnly}
          className={
            (this.props.addAfter ? "after" : "") +
            (this.props.beforeIcon ? " beforeicon" : "")
          }
          value={this.state.value || ""}
          onFocus={this.props.onFocus}
          onClick={this.props.onClick}
          onDoubleClick={this.props.onDoubleClick}
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onPaste={this.onPaste.bind(this)}
        ></TextInput>
        {this.props.addAfter ? (
          <div className="wasabi-preend after">{this.props.addAfter}</div>
        ) : null}
          <i
        className={"combobox-clear text icon-clear"}
        onClick={this.onClear}
        style={{ display: this.props.readOnly ? "none" : !this.state.value ? "none" : "inline" }}
      ></i>
        {this.props.onSearch ? (
          <Icon disabled={this.props.disabled} onSearch={this.onSearch}></Icon>
        ) : this.props.afterIcon ? (
          <AfterIcon
            afterIcon={this.props.afterIcon}
            onClick={this.props.onClick}
          ></AfterIcon>
        ) : null}
        {this.props.children}
        <DataList
          data={this.props.data}
          show={this.state.show}
          value={this.state.value || ""}
          onSelect={this.onSelect}
        ></DataList>
      </React.Fragment>
    );
  }
}
Text.propTypes = propTypes;
Text.defaultProps = { type: "text" };
export default ValidateHoc(Text);
