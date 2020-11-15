/**
 * 手机模拟器
 */

import React from "react";
import PropTypes from 'prop-types';
import func from "../../libs/func"
import "./index.css"
class Simulator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            containerid: func.uuid(),
            frameid: func.uuid(),
            content: this.props.content
        }

    }
    render() {
      return   <div className={"wasabi-preview-phone " + this.props.className} style={this.props.style} >
           
                <div className="wasabi-preview-top">
                    <i></i>
                    <span></span>
                </div>
                <div className="wasabi-preview-home"></div>
                <div className="wasabi-preview-view">
                    {
                        this.props.url ? <iframe id="wasabi-preview" src={this.props.url}  scrolling="yes"></iframe> :
                            this.props.content
                    }

                </div>
            
        </div>
    }
}
Simulator.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    url: PropTypes.string,//url地址
    //内容
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node, PropTypes.element])
}
Simulator.defaultProps = {
    className: "",
    style: {},
    url: "",
    content: ""
}
export default Simulator;