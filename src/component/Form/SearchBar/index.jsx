//create by wangzhiyonglyk
//date:2016-03-02后开始独立改造
//desc:页面筛选条件组件

import React, { Component } from "react";
import PropTypes from "prop-types";
import LinkButton from "../../Buttons/LinkButton";
import Button from "../../Buttons/Button";
import func from "../../libs/func";
import propsTran from "../../libs/propsTran";
import "./searchbar.css";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.inputs = []; //ref
    this.state = {
      dropType: this.props.expand ? "icon-arrow-up" : "icon-arrow-down",
    };
    this.validate = this.validate.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.clearData = this.clearData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.getRefs = this.getRefs.bind(this);

    this.expandHandler = this.expandHandler.bind(this);
  }
  /**
   * 合并两种refs引用方式
   * @returns
   */
  getRefs() {
    let combinxRefs = []; //合并新旧语法
    for (let i = 0; i < this.inputs.length; i++) {
      let cref = this.inputs[i].current;
      if (cref) {
        combinxRefs.push(cref);
      }
    }
    for (let r in this.refs) {
      combinxRefs.push(this.refs[r]);
    }
    return combinxRefs;
  }
  /**
   * 验证
   * @returns
   */
  validate() {
    let isva = true;
    let combinxRefs = this.getRefs();
    for (let i = 0; i < combinxRefs.length; i++) {
      let cref = combinxRefs[i];
      if (isva) {
        //如果验证是正确的，继续获取值
        isva = cref && cref.validate ? cref.validate() : isva;
      } else {
        //如果前一个验证失败，则验证不拿值
        cref && cref.validate ? cref.validate() : void 0;
      }
    }
    return isva;
  }
  /**
   * 获取值
   * @returns
   */
  getData() {
    var data = {};
    let combinxRefs = this.getRefs();
    for (let i = 0; i < combinxRefs.length; i++) {
      let cref = combinxRefs[i];
      if (cref && cref.props.name && cref.getValue) {
        //说明是表单控件
        if (cref.props.name.indexOf(",") > -1) {
          //含有多个字段
          var nameSplit = cref.props.name.split(",");
          if (cref.getValue()) {
            var valueSplit = cref.getValue().split(",");
            for (let index = 0; index < nameSplit.length; index++) {
              if (index < valueSplit.length) {
                data[nameSplit[index]] = valueSplit[index];
              }
            }
          } else {
            for (let index = 0; index < nameSplit.length; index++) {
              data[nameSplit[index]] = "";
            }
          }
        } else {
          data[cref.props.name] = cref.getValue();
        }
      } else if (cref.getData) {
        //布局组件或者表单组件
        data = Object.assign({}, data, cref.getData());
      }
    }
    return data;
  }
  /**
   * 设置值
   * @param {*} data
   * @returns
   */
  setData(data) {
    //设置值,data是对象

    if (!data) {
      return;
    }
    let combinxRefs = this.getRefs();
    for (let i = 0; i < combinxRefs.length; i++) {
      let cref = combinxRefs[i];
      if (
        cref &&
        cref.props.name &&
        data[cref.props.name] !== null &&
        data[cref.props.name] !== undefined
      ) {
        cref.setValue && cref.setValue(data[cref.props.name]);
      } else if (cref && cref.setData) {
        //表单或者布局组件
        cref.setData(data);
      }
    }
  }
  /**
   * 清除数据
   */
  clearData() {
    let combinxRefs = this.getRefs();
    for (let i = 0; i < combinxRefs.length; i++) {
      let cref = combinxRefs[i];
      cref && cref.setValue && cref.setValue("");
      cref && cref.clearData && cref.clearData();
    }
  }
  onSubmit() {
    //提交 数据
    var data = {}; //各个字段对应的值
    let isva = true;
    let combinxRefs = this.getRefs();
    for (let i = 0; i < combinxRefs.length; i++) {
      let cref = combinxRefs[i];
      if (cref) {
        //如果没有验证方法说明不是表单控件，保留原来的值
        if (isva) {
          //如果验证是正确的，继续获取值
          isva = cref.validate ? cref.validate() : isva;
        } else {
          //如果前一个验证失败，则验证不拿值
          cref.validate ? cref.validate() : void 0;
        }

        if (cref.props.name && cref.getValue) {
          //说明是表单控件

          if (cref.props.name.indexOf(",") > -1) {
            //含有多个字段

            var nameSplit = cref.props.name.split(",");
            let value = cref.getValue();
            if (value) {
              var valueSplit = value.split(",");
              for (
                let index = 0;
                index < valueSplit.length;
                index++ //有可能分离的值比字段少
              ) {
                if (index < valueSplit.length) {
                  data[nameSplit[index]] = valueSplit[index];
                }
              }
            } else {
              for (let index = 0; index < nameSplit.length; index++) {
                data[nameSplit[index]] = "";
              }
            }
          } else {
            data[cref.props.name] = cref.getValue();
          }
        } else if (cref.getData) {
          //布局组件或者表单组件
          data = Object.assign(data, cref.getData());
        }
      }
    }
    if (isva) {
      if (this.props.onSubmit) {
        //如果没有提交事件
        this.props.onSubmit(data);
      } else {
        return data;
      }
    }
  }
  onReset() {
    this.clearData();
    this.props.onReset && this.props.onReset();
  }
  expandHandler() {
    this.setState({
      dropType:
        this.state.dropType === "icon-arrow-down"
          ? "icon-arrow-up"
          : "icon-arrow-down",
    });
  }

  renderLinkButton() {
    return (
      <React.Fragment>
        <LinkButton
          onClick={this.onSubmit}
          theme={this.props.submitTheme}
          hide={this.props.submitHide}
          iconCls={this.props.submitIcon || "icon-search"}
          style={this.props.submitStyle}
          title={this.props.submitTitle}
        >
          {this.props.submitTitle || "搜索"}
        </LinkButton>

        <LinkButton
          onClick={this.onReset}
          theme={this.props.resetTheme}
          hide={this.props.resetHide}
          iconCls={this.props.resetIcon || "icon-repeat"}
          style={this.props.resetStyle}
          title={this.props.resetTitle}
        >
          {this.props.resetTitle || "重置"}
        </LinkButton>

        <LinkButton
          onClick={this.props.onAdd}
          theme={this.props.addTheme}
          iconCls={this.props.addIcon || "icon-add"}
          hide={this.props.addHide}
          style={this.props.addStyle}
          title={this.props.addTitle}
        >
          {this.props.addTitle || "添加"}
        </LinkButton>

        <LinkButton
          iconCls={this.state.dropType}
          onClick={this.expandHandler}
        ></LinkButton>
      </React.Fragment>
    );
  }
  renderButton() {
    return (
      <React.Fragment>
        <Button
          onClick={this.onSubmit}
          theme={this.props.submitTheme}
          hide={this.props.submitHide}
          iconCls={this.props.submitIcon || "icon-search"}
          style={this.props.submitStyle}
          title={this.props.submitTitle}
        >
          {this.props.submitTitle || "搜索"}
        </Button>

        <Button
          onClick={this.onReset}
          theme={this.props.resetTheme}
          hide={this.props.resetHide}
          iconCls={this.props.resetIcon || "icon-repeat"}
          style={this.props.resetStyle}
          title={this.props.resetTitle}
        >
          {this.props.resetTitle || "重置"}
        </Button>

        <Button
          onClick={this.props.onAdd}
          theme={this.props.addTheme}
          iconCls={this.props.addIcon || "icon-add"}
          hide={this.props.addHide}
          style={this.props.addStyle}
          title={this.props.addTitle}
        >
          {this.props.addTitle || "添加"}
        </Button>

        <Button
          iconCls={this.state.dropType}
          onClick={this.expandHandler}
        ></Button>
      </React.Fragment>
    );
  }
  render() {
    this.inputs = []; //先清空

    let style = {
      ...this.props.style,
      height:
        this.state.dropType === "icon-arrow-up"
          ? 40
          : this.props?.style?.height || null,
    };
    let className = "wasabi-searchbar clearfix " + (this.props.className ?? "");
    return (
      <div className={className} style={style} cols={this.props.cols || 4}>
          {React.Children.map(this.props.children, (child, index) => {
            if (child) {
              if (typeof child.type !== "function") {
                //非react组件
                return child;
              } else {
                //统一处理标签样式问题，方便对齐
               
                //这里有个问题，value与text在第二次会被清除,防止数据丢失
                let data = child.props.data
                  ? JSON.parse(JSON.stringify(child.props.data))
                  : null;

                let ref = child.ref ? child.ref : React.createRef();
                typeof ref === "object" ? this.inputs.push(ref) : void 0; //如果对象型添加，字符型（旧语法）事后通过refs来获取
                return React.cloneElement(child, {
                  name: child.props.name || "key" + index, // 如果没有配置表单name，按顺序给
                  data: data,
                  noborder: this.props.noborder,//
                  disabled: this.props.disabled,
                  readOnly: this.state.disabled
                    ? this.state.disabled
                    : child.props.readOnly,
                  key: child.props.name|| "key" + index,
                  ref: ref,
                });
              }
            } else {
              return null;
            }
          })}
        <div
          className={
            "wasabi-searchbar-blank " +
            (this.props.buttonType === "link" ? "link" : "")
          }
        ></div>
        <div
          className={
            "wasabi-searchbar-btns " +
            (this.props.buttonType === "link" ? "link" : "")
          }
        >
          {this.props.buttonType === "link"
            ? this.renderLinkButton()
            : this.renderButton()}
        </div>
      </div>
    );
  }
}
SearchBar.propTypes = {
  style: PropTypes.object, //样式
  className: PropTypes.string, //自定义样式
  expand: PropTypes.bool, //是否默认展开
  cols: PropTypes.number, //列数
  buttonType: PropTypes.oneOf(["link", "botton"]), //按钮类型
  submitTitle: PropTypes.string, //查询按钮的标题
  submitTheme: PropTypes.string, //查询按钮的主题
  submitIcon: PropTypes.string, //查询按钮的图标
  submitStyle: PropTypes.object, //查询按钮的样式
  submitHide: PropTypes.bool, //是否隐藏按钮

  // 重置按钮
  resetTitle: PropTypes.string,
  resetTheme: PropTypes.string,
  resetIcon: PropTypes.string,
  resetStyle: PropTypes.object,
  resetHide: PropTypes.bool,

  // 添加按钮
  addTitle: PropTypes.string,
  addTheme: PropTypes.string,
  addIcon: PropTypes.string,
  addStyle: PropTypes.object,
  addHide: PropTypes.bool,

  onSubmit: PropTypes.func, //提交事件
  onReset: PropTypes.func, //提交事件
  onAdd: PropTypes.func, //添加事件
};

export default SearchBar;
