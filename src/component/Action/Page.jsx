/*
 create by wangzhiyong
 date:2017-02-10
 desc:页面基类
 */
import React from "react";
import PropTypes from "prop-types";
import  unit from "../libs/unit";
import  FetchModel from "../Model/FetchModel";
require("../Sass/Action/Page.css");
class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state={

        }

    }

   static defaultProps={
        width:"100%",
        height:"100%",
        style:null,
        className:""
    }

    static propTypes={
        width: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
    
        ]),//宽度
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),//高度
        style:PropTypes.object,
        className:PropTypes.string,
    
    }
 
    render()
    {
        return <div className="wasabi-page">
            {
                 React.Children.map(this.props.children, child => {
                return React.cloneElement(child)
            })
            }

        </div>
    }


};

module.exports=Page;