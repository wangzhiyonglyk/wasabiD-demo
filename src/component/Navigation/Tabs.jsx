//create by wangzy
//date:2016-02-18
//标签页组
import React from "react";
import PropTypes from "prop-types";
require("../sass/Navigation/Tabs.css");

// var addRipple=require("../Mixins/addRipple.js");
class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: this.props.activeIndex
        }
        this.tabClickHandler = this.tabClickHandler.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let activeIndex = nextProps.activeIndex != null && nextProps.activeIndex != undefined ? nextProps.activeIndex : 0
        if (nextProps.children.length > this.props.children.length) {
            activeIndex = nextProps.children.length - 1
        }
        this.setState({
            activeIndex: activeIndex
        })
    }
    tabClickHandler(index, event) {

        // this.rippleHandler(event);
        //页签单击事件
        this.setState({
            activeIndex: index
        })
    }
    onClose(index) {
        this.props.onClose && this.props.onClose(index, this.state.activeIndex);
    }
    changeActive(index){
        if(this.props.children&&index>-1&&index< this.props.children.length){
            this.setState({
                activeIndex:index
            })
        }
     
    }
    render() {
        return (    
            <div className={"wasabi-tabs "+this.props.className} style={this.props.style} >
                <div  >
                    {

                        React.Children.map(this.props.children, (child, index) => {

                            if (child) {
                                let iconCls = child && child.props.iconCls ? child.props.iconCls : "txt";
                                return <a key={index} href="#" onClick={this.tabClickHandler.bind(this, index)} className={"wasabi-tab " + this.props.theme + " " + (this.state.activeIndex == index ? "active " : "")} >
                                    <i className={"" + iconCls} style={{ marginRight: 5 }}></i>
                                    {child.props.title}
                                    <i className="tab-icon icon-close" style={{display:child.props.closeAble?"inline":"none"}} onClick={this.onClose.bind(this, index)}></i>
                                </a>
                            }
                            return null;

                        })
                    }
                </div>
                {
                    React.Children.map(this.props.children, (child, index) => {

                        return <div key={index} style={this.props.style} className={"section  " + this.props.theme + " " + (index == this.state.activeIndex ? "active" : "")}  >
                            {child}
                        </div>
                    })
                }

            </div>)

    }
}

Tabs.propTypes = {
    theme: PropTypes.oneOf([//主题
        "primary",
        "default",

    ]),
    activeIndex: PropTypes.number,
    onClose: PropTypes.func,
};
Tabs.defaultProps = {

    theme: "default",
    activeIndex: 0,
    onClose: null,


};
export default Tabs;
