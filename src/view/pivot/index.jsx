import React from 'react';
import ReactDOM from 'react-dom';
import Input from "../../component/Form/Input"
import Form from "../../component/Form/Form"

import("./index.css")
class PivotPage extends React.Component {
    constructor(props) {
        super(props);
        this.input=React.createRef();
        this.input1=React.createRef();
        this.form=React.createRef();
        this.state = {
            dropData: [],
            headers: [
                {
                    name: "text",
                    label: "省",
                },

            ],
            data: [
                {
                    id: 1, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, text: "父节点1", value: "父节点1", children: [
                        { id: 11, pId: 1, text: "子节点11", },
                        { id: 12, pId: 1, text: "子节点12" }
                    ]
                },
                {
                    id: 2, pId: "", name: "good1", label: "机构尖1", editor: { type: "select" }, text: "父节点2", value: "子节点11", children: [
                        { id: 21, pId: 2, text: "子节点21" },
                        { id: 22, pId: 2, text: "子节点22" }
                    ]
                }
            ],
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }


    }
    static getDerivedStateFromProps(props, state) {
        console.log(props,state)
        return false;
    }
    componentDidMount() {
      console.log("refs",this.refs,this.form)

    }
    onClick() {

    }
    onDrop(data) {
        let dropData = this.state.dropData;
        dropData.push(data);
        this.setState({
            dropData: dropData
        })
    }

    render() {
        return <div style={{ padding: 20 }}>
         
            <Form ref={this.form}>
                <Input ref={this.input} key="1"  required={true} type="picker" data={this.state.data}></Input>
                <Input ref={this.input1}   key="2"  required={true} type="select" data={this.state.data}></Input>
                <Input   key="3"  required={true} type="checkbox" data={this.state.data}></Input>
                <Input key="4"   required={true} type="checkbutton" data={this.state.data}></Input>
                <Input  key="5"  required={true} type="radio" data={this.state.data}></Input>
                <Input  key="6"  required={true} type="date" data={this.state.data}></Input>
                <Input  key="7"  required={true} type="datetime" data={this.state.data}></Input>
                <Input  key="8"  required={true} type="daterange" data={this.state.data}></Input>
                <Input  key="9"  required={true} type="datetimerange" data={this.state.data}></Input>
            </Form>
            {/* <Input type="daterange" key="1"></Input>
            <Input type="datetime" key="2"></Input> */}

            {/* <DataGrid data={this.state.data} headers={this.state.headers}></DataGrid> */}
        </div>

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));
