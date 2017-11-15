import React from "react";
import ReactDOM from "react-dom";
import { Page, DataGrid, Input, SearchBar, Form, Modal, Toolbar, SlidePanel, CheckBox, Row, Col } from "wasabiD";
import { Layout,Button, Upload, Center, Left, Right, Header, Footer, Tabs, TabPanel, Menus, MenuPanel, LinkButton } from "wasabiD";
import { ajax } from "wasabi-api";
class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "http://wechat.bluehy.com/Test/Upload",
            headers: [
                {
                    name: "openid",
                    label: "openid"
                },
                {
                    name: "nickname",
                    label: "nickname"
                }
                ,
                {
                    name: "city",
                    label: "city"
                }
                ,
                {
                    name: "country",
                    label: "country"
                }
                , {
                    name: "province",
                    label: "province"
                },
                {
                    name: "language",
                    label: "language"
                },
                {
                    name: "remark",
                    label: "remark"
                }
                ,
                {
                    name: "edit",
                    label: "编辑",
                    content: (rowData, rowIndex) => {
                        return <div><LinkButton onClick={this.onClick} title="fdfd"></LinkButton></div>
                    }
                }

            ]
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    componentDidMount() {
        
    }
    onChange(value) {
        this.setState({
            value: value
        })
    }
    onClick() {

        if (this.state.value) {

        }
        else {
            alert("请入上传地址");
            return;
        }
        this.refs.upload.open();

    }

    render() {
        return <Page>
            <Button name="btn" title="打开导入" onClick={this.onClick}>你好 </Button>
            <Input type="text" name="upload" label="请输入后台上传地址" style={{ width: 200 }} onChange={this.onChange} value={this.state.value}></Input>
            <Upload ref="upload" name="file" uploadSuccess uploadurl={this.state.value} ></Upload>
        </Page>;
    }
}

ReactDOM.render(<ButtonDemo />, document.getElementById("root"));
