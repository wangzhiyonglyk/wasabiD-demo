import React from "react";
import ReactDOM from "react-dom";
import { LinkButton, Separator } from "../component"

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        
    }
    render() {
        return <div>
            <Separator key="1">不同主题按钮-theme</Separator>
            <div key="2">
                <LinkButton key="1">默认</LinkButton>
                <LinkButton key="2" theme="primary">primary</LinkButton>
                <LinkButton key="3" theme="success">succcess</LinkButton>
                <LinkButton key="4" theme="warning">warning</LinkButton>
                <LinkButton key="5" theme="danger">danger</LinkButton>
                <LinkButton key="6" theme="info">info</LinkButton>
            </div>
           
            <Separator key="5">带图标-iconCls,iconAlign</Separator>
            <div key="6">
                <LinkButton key="1" ref="btn"  iconCls="icon-add" theme="success" dot={true} iconAlign="left">查询</LinkButton>
                <LinkButton key="2" ref="btn2"  iconCls="icon-add"   iconAlign="right">查询</LinkButton>
                <LinkButton key="2" ref="btn2" iconCls="icon-add"  iconAlign="rightTop">查询</LinkButton>
            </div>
        </div>
    }
}
ReactDOM.render(
    <Index />, document.getElementById("root"));
