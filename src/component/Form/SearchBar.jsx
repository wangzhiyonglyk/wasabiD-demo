//create by wangzy
//date:2016-04-05后开始独立改造
//desc:页面筛选条件组件

import React, { Component } from "react";
import PropTypes from "prop-types";

import LinkButton from "../Buttons/LinkButton";

import("../Sass/Form/SearchBar.css");
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropType: this.props.expand
        ? "icon-up"
        : "icon-down"
    };
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.clearData = this.clearData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.expandHandler = this.expandHandler.bind(this);
  }

  getData() {
    var data = {};
    for (let v in this.refs) {
      if (this.refs[v].props.name && this.refs[v].getValue) {
        //说明是表单控件
        if (this.refs[v].props.name.indexOf(",") > -1) {
          //含有多个字段
          var nameSplit = this.refs[v].props.name.split(",");
          if (this.refs[v].getValue()) {
            var valueSplit = this.refs[v].getValue().split(",");
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
          data[this.refs[v].props.name] = this.refs[v].getValue();
        }
      } else if (this.refs[v].getData) {
        //布局组件或者表单组件
        data = Object.assign(data, this.refs[v].getData());
      }
    }
    return data;
  }

  setData(data) {
    //设置值,data是对象

    if (!data) {
      return;
    }
    for (let v in this.refs) {
      if (this.refs[v].props.name&&data[this.refs[v].props.name]!=null&&data[this.refs[v].props.name]!=undefined) {
        this.refs[v].setValue &&
          this.refs[v].setValue(data[this.refs[v].props.name]);
      } else if (this.refs[v].setData) {
        //表单或者布局组件
        this.refs[v].setData(data);
      }
    }
  }

  clearData() {
    for (let v in this.refs) {
      this.refs[v].setValue && this.refs[v].setValue("");
      this.refs[v].clearData && this.refs[v].clearData();
    }
  }
  onSubmit() {
    //提交 数据
    var data = {}; //各个字段对应的值
    for (let v in this.refs) {
      if (this.refs[v].props.name && this.refs[v].getValue) {
        //说明是表单控件
        if (this.refs[v].props.name.indexOf(",") > -1) {
          //含有多个字段
          var nameSplit = this.refs[v].props.name.split(",");
          let value = this.refs[v].getValue();
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
          data[this.refs[v].props.name] = this.refs[v].getValue();
        }
      }
    }
    if (this.props.onSubmit != null) {
      this.props.onSubmit(data);
    } else {
      return data;
    }
  }
  expandHandler() {
    this.setState({
      dropType:
        this.state.dropType == "icon-down"
          ? "icon-up"
          : "icon-down"
    });
  }
  render() {
    return (
      <div
        className={"wasabi-searchbar clearfix " + this.props.className}
        style={this.props.style}
      >
        <div className='inputcontainer' cols={this.props.cols}>
          {React.Children.map(this.props.children, (child, index) => {
            if (typeof child.type !== "function") {
              //非react组件
              return child;
            } else {
              if (
                this.state.dropType == "icon-down" &&
                index >= this.props.cols
              ) {
                //z不显示

                return null;
              } else {
                //这里有个问题，value与text在第二次会被清除,防止数据丢失
                let data = child.props.data
                  ? JSON.parse(JSON.stringify(child.props.data))
                  : null;

                return React.cloneElement(child, {
                  data: data,
                  key: index,
                  ref: child.ref ? child.ref : index
                });
              }
            }
          })}
         
        </div>
        <div className='buttoncontainer'>
            <LinkButton
              iconCls={this.state.dropType}
              style={{
                display:
                  this.props.children.length > this.props.cols
                    ? "inline"
                    : "none"
              }}
              onClick={this.expandHandler}
            ></LinkButton>
            <LinkButton
              onClick={this.onSubmit.bind(this, "submit")}
              theme={this.props.submitTheme}
              hide={this.props.onSubmit ? false : true}
              iconCls='icon-search'
              style={this.props.submitStyle}
              title={this.props.submitTitle}
            >
              {this.props.submitTitle}
            </LinkButton>
          </div>
      </div>
    );
  }
}
SearchBar.propTypes = {
  style: PropTypes.object, //样式
  className: PropTypes.string, //自定义样式
  submitTitle: PropTypes.string,
  submitHide: PropTypes.bool,
  submitTheme: PropTypes.string,
  submitStyle: PropTypes.object,
  cols: PropTypes.number, //多余几个隐藏
  onSubmit: PropTypes.func,
  expand: PropTypes.bool //是否默认展开
};
SearchBar.defaultProps = {
  style: {},
  className: "",
  submitTitle: "搜索", //查询按钮的标题
  submitHide: false, //是否隐藏按钮
  submitTheme: "primary", //主题
  submitStyle: {}, //查询按钮的样式
  cols: 3, //一行排几个
  onSubmit: null, //提交成功后的回调事
  expand: false
};

export default SearchBar;
