import React from "react";
import ReactDOM from "react-dom";
import { Button, LinkButton, Separator, Dropdown, Color, Tag, Badge, Toolbar } from "../component"
import config from "../libs/config"
class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        this.refs.btn2.setDelay()
    }
    render() {
        return <div>
            <Separator key="s1">不同主题-Button</Separator>
            <div key="d1" style={{ textAlign: "center" }}>

                <Button key="2" theme="primary">primary</Button>
                <Button key="3" theme="success">succcess</Button>
                <Button key="4" theme="warning">warning</Button>
                <Button key="5" theme="danger">danger</Button>
                <Button key="6" theme="info">info</Button>
            </div>
            <Separator key="s2">不同大小按钮-Button</Separator>
            <div key="d2" style={{ textAlign: "center" }}>
                <Button key="1" size="large">large</Button>
                <Button key="2" size="default">default</Button>
                <Button key="3" size="small">small</Button>
                <Button key="4" size="mini">mini</Button>
            </div>
            <Separator key="s3">带图标-iconCls,iconAlign,delay的Button</Separator>
            <div key="d3" style={{ textAlign: "center" }}>
                <Button key="1" iconCls="icon-check" theme="success" iconAlign="left">图标在左侧</Button>
                <Button key="2" iconCls="icon-check" iconAlign="right">图标在右侧</Button>
                <Button key="3" ref="btn2" >正在加载,通过其他事件停止</Button>
                <Button key="4" theme="danger" delay={3000}  > 点击后3秒自动停止-delay</Button>
            </div>
            <Separator key="s4">不同主题-LinkButton</Separator>
            <div key="d4" style={{ textAlign: "center" }}>

                <LinkButton key="2" theme="primary">primary</LinkButton>
                <LinkButton key="3" theme="success">succcess</LinkButton>
                <LinkButton key="4" theme="warning">warning</LinkButton>
                <LinkButton key="5" theme="danger">danger</LinkButton>
                <LinkButton key="6" theme="info">info</LinkButton>
            </div>
            <Separator key="s5">带图标与位置iconCls,iconAlign的LinkButton</Separator>
            <div key="d5" style={{ textAlign: "center" }}>
                <LinkButton key="1" iconCls="icon-add" theme="success" dot={true} iconAlign="left">带红点</LinkButton>
                <LinkButton key="2" iconCls="icon-add" iconAlign="right">图标在右侧</LinkButton>
                <LinkButton key="3" iconCls="icon-add" iconAlign="rightTop">图标在右上侧</LinkButton>
            </div>
            <Separator key="s6">标记-Tag</Separator>
            <div key="d6" style={{ textAlign: "center" }}>
                <Tag key="1" theme="primary">primary</Tag>
                <Tag key="2" theme="success">success</Tag>
                <Tag key="3" theme="warning">warning</Tag>
                <Tag key="4" theme="danger" >danger</Tag>
                <Tag key="5" theme="info">info</Tag>
            </div>
            <Separator key="s7">标签-Badge</Separator>
            <div key="d7" style={{ textAlign: "center" }}>
                <Badge key="1" theme="primary" tag={10}>primary</Badge>
                <Badge key="2" theme="success" tag={10}>success</Badge>
                <Badge key="3" theme="warning" tag={10}>warning</Badge>
                <Badge key="4" theme="danger" tag={10}>danger</Badge>
                <Badge key="5" theme="info" tag={10}>info</Badge>
            </div>
            <Separator key="s8">下拉菜单-Dropdown</Separator>
            <div key="d8" style={{ textAlign: "center" }}>
                <Dropdown key="1" theme="primary" iconCls="icon-font-colors" label="颜色选择">
                    <Color ></Color>
                </Dropdown>
                <Dropdown key="2" theme="success" iconCls="icon-font-colors" label="颜色选择">
                    <Color ></Color>
                </Dropdown>
                <Dropdown key="3" theme="warning" iconCls="icon-font-colors" label="颜色选择">
                    <Color ></Color>
                </Dropdown>
                <Dropdown key="4" theme="danger" iconCls="icon-font-colors" label="颜色选择">
                    <Color ></Color>
                </Dropdown>
                <Dropdown key="5" theme="info" iconCls="icon-font-colors" label="颜色选择">
                    <Color ></Color>
                </Dropdown>
            </div>
            <Separator key="s9">工具栏-Toolbar-type==button</Separator>
            <div key="d9" style={{ textAlign: "center" }}>
                <Toolbar buttons={[{ label: "按钮一", theme: "primary", title: "按钮1" }, { label: "按钮二", theme: "success", title: "按钮2" }]}></Toolbar>
            </div>

            <Separator key="s10">工具栏-Toolbar-type==linkbutton</Separator>
            <div key="d10" style={{ textAlign: "center" }}>
                <Toolbar type="link" buttons={[{ label: "按钮一", theme: "primary", title: "按钮1" }, { label: "按钮二", theme: "success", title: "按钮2" }]}></Toolbar>
            </div>
        </div>



    }
}
ReactDOM.render(
    <Index />, document.getElementById("root"));
