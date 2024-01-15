/*
create by wangzhiyonglyk
date:2017-02-09
desc:圣杯布局
 */

import React from "react";
import PropTypes from "prop-types";
import func from "../libs/func";
import "../Sass/Layout/Layout.css";
class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: func.randomStr(),
      centerid: func.randomStr(),
    };
   
    this.onChange = this.onChange.bind(this)
  }
  static propTypes = {
    border: PropTypes.bool,
    resize: PropTypes.bool
  };
  static defaultProps = {
    border: true,
    resize: true,
  };
 
  /**
   * 容器内部调整宽高
   * @param {*} type 
   * @param {*} value 
   */
  onChange(type, value) {
    this.props.onChange && this.props.onChange(type, value)
  }
  render() {
    return (
      <div
        className={"wasabi-layout clearfix " + (this.props.className || "") + (this.props.border ? "" : " noborder")}
        id={this.state.id}
        style={this.props.style}
      >
        {React.Children.map(this.props.children, (child, index) => {
          if (child && child.props.type) {
            switch (child.props.type) {
              case "header":
                return React.cloneElement(child, {
              
                  onChange: this.onChange,
                  key: index,
                  ref: index,

                });


            }
          }
        })}
        <div className="wasabi-layout-container"> {React.Children.map(this.props.children, (child, index) => {
          if (child && child.props.type) {
            switch (child.props.type) {
              case "left":
                return React.cloneElement(child, {
                  onChange: this.onChange,
                  key: index,
                  ref: index,
                });
            }
          }
        })}
          {React.Children.map(this.props.children, (child, index) => {
          if (child && child.props.type) {
            switch (child.props.type) {
              case "center":
                return React.cloneElement(child, {
                  onChange: this.onChange,
                  key: index,
                  ref: index,

                });



            }
          }
        })}
          {React.Children.map(this.props.children, (child, index) => {
            if (child && child.props.type) {
              switch (child.props.type) {
                case "right":
                  return React.cloneElement(child, {
                    onChange: this.onChange,
                    key: index,
                    ref: index,

                  });



              }
            }
          })}
        </div>
        {React.Children.map(this.props.children, (child, index) => {
          if (child && child.props.type) {
            switch (child.props.type) {
              case "footer":
                return React.cloneElement(child, {
                  onChange: this.onChange,
                  key: index,
                  ref: index,
                });
            }
          }
        })}
      </div>
    );
  }
}
export default Layout;
