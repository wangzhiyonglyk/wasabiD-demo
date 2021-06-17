import React from 'react';
import ReactDOM from 'react-dom';
import Tree from "../../component/Data/Tree"
import { Input, func } from "../../component"

import("./index.css")
class PivotPage extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.input1 = React.createRef();
        this.form = React.createRef();
        this.state = {
            dropData: [],
            fixedHeaders: [
                {
                    name: "id",
                    label: "id",
                    width: 200
                },

            ],
            headers: [

                {
                    name: "text",
                    label: "省1",
                    width: 200
                },
                {
                    name: "text",
                    label: "省2",

                },
                {
                    name: "text",
                    label: "省3",
                    width: 200
                },
                {
                    name: "text",
                    label: "省4",
                    width: 200
                },
                {
                    name: "text",
                    label: "省5",
                    width: 200
                },
                {
                    name: "text",
                    label: "省6",
                    width: 200
                },
            ],
            data: [
                {
                    id: 1, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, children: [
                        { id: 11, label: "子节点11"},
                        {
                            id: 12, label: "子节点12", children: [{
                                id: 111, label: "孙子节点,可移动",draggAble:true,
                            }, {
                                id: 112, label: "孙子节点2,可移动",draggAble:true,
                            }]
                        }
                    ]
                },
                {
                    id: 2, pId: "", name: "good1", label: "可以停靠", dropAble:true, editor: { type: "select" }, children: [
                        { id: 21, pId: 2, label: "子节点21 移动" },
                        { id: 22, pId: 2, label: "子节点22 移动" }
                    ]
                },
                { id: 3, pId: "", name: "good", label: "机构尖3", editor: { type: "date" }, },
                { id: 4, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 5, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 6, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 7, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 8, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 9, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 10, pId: "", name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 100, pId: 1, name: "good", label: "机构尖", editor: { type: "date" }, },
                { id: 101, pId: 3, name: "good", label: "机构尖", editor: { type: "date" }, },
            ],
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }


    }
    static getDerivedStateFromProps(props, state) {

        return false;
    }
    componentDidMount() {


    }
    onClick() {
        let data = this.refs.tree.getChecked();
        console.log("data", data);
        this.refs.tree.clearChecked();
    }
    onDrop(data) {
        let dropData = this.state.dropData;
        dropData.push(data);
        this.setState({
            dropData: dropData
        })
    }
    onEdit(id,text,row){
        console.log("d",id,text,row)
    }

    render() {
        func.toTreeData(this.state.data, "id", "pId", "label")
        return <div style={{ padding: 20 }}>
            {/* <Button onClick={this.onClick.bind(this)}>提交</Button>
         <Input  key="8"  required={true} type="daterange" data={this.state.data}></Input> */}
            {/* <Form ref={this.form}>
                <Input  ref={this.input} key="1" valueField="id" required={true} type="picker" data={this.state.data}></Input>
                <Input  key="2" valueField="id" multiple={true} required={true} type="select" data={this.state.data}></Input>
                <Input   key="3" valueField="id" required={true} type="checkbox" data={this.state.data}></Input>
                <Input key="4"  valueField="id" required={true} type="checkbutton" data={this.state.data}></Input>
                <Input  key="5"valueField="id"  required={true} type="radio" data={this.state.data}></Input>
                <Input  key="6"  required={true} type="date" data={this.state.data}></Input>
                <Input  key="7"  required={true} type="datetime" data={this.state.data}></Input>
                <Input  key="8"  required={true} type="daterange" data={this.state.data}></Input>
                <Input  key="9"  required={true} type="datetimerange" data={this.state.data}></Input>
               
                <Input  key="10"  required={true} type="treepicker" data={this.state.data}></Input>
            </Form> */}
            {/* <Input type="daterange" key="1"></Input>
            <Input type="datetime" key="2"></Input> */}

            {/* <DataGrid data={this.state.data}  fixedHeaders={this.state.fixedHeaders}   headers={this.state.headers}></DataGrid> */}
            {/* <TreeGrid ref={"reff"} data={this.state.data}  headers={this.state.headers}></TreeGrid> */}
            <button onClick={this.onClick.bind(this)}>test</button>
            <div style={{ height: 100 }}>            <Input key="6" required={true} type="text" data={this.state.data} valueField={"id"} textField={"label"}></Input></div>

            <br></br>
            <div><Tree ref="tree" key="16" onEdit={this.onEdit.bind(this)} editAble={true} removeAble={true} renameAble={true} required={true} type="treepicker" data={this.state.data} idField={"id"} textField={"label"}></Tree></div>

        </div>

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));
