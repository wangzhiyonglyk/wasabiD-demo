import React from 'react';
import ReactDOM from 'react-dom';
import Tree from "../../component/Data/Tree"
import { DataGrid, TreeGrid, Input, func, CheckBox, Text, Radio, Upload, Button } from "../../component"
import Excel from "../../component/Data/Excel"
import Color from "../../component/Data/Color"
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

                },

            ],
            headers: [

                {
                    name: "label",
                    label: "省1",
                    editor:{
                        type:"select",
                        options:{
                            data:[
                                {text:"test",value:"test"}
                            ]
                        }
                    }

                },
                {
                    name: "省2",
                    label: "省2",

                },
                {
                    name: "省3",
                    label: "省3",

                },
                {
                    name: "省4",
                    label: "省4",

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省6",
                    label: "省6",

                },
            ],
            data: [
                {
                    id: 1, pId: "", name: "good", label: "可以fdfdsfsdfsdfsdfsdfsdfsdfdsssssssss停靠", editor: { type: "date" }, children: [
                        { id: 11, label: "子节点11", dropAble: true, },
                        {
                            id: 12, label: "子节点12", children: [{
                                id: 111, label: "孙子节点,可移动", draggAble: true,
                            }, {
                                id: 112, label: "孙子节点2,可移动", draggAble: true,
                            }]
                        }
                    ]
                },
                {
                    id: 2, pId: "", name: "good1", label: "可以停靠", dropAble: true, editor: { type: "select" }, children: [
                        { id: 21, pId: 2, label: "移动1", draggAble: true, },
                        { id: 22, pId: 2, label: "移动2", draggAble: true, }
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
                { id: 101, pId: "", name: "good", label: "异步", editor: { type: "date" }, isParent: true },
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

        console.log("data", this.refs.tree.loadData1, this.refs.tree);
        setTimeout(() => {
            //this.refs.tree.remove(data[0])
        }, 1000);

    }
    onDrop(data) {
        let dropData = this.state.dropData;
        dropData.push(data);
        this.setState({
            dropData: dropData
        })
    }
    onEdit(id, text, row) {
        console.log("d", id, text, row)
    }

    onChange(event) {
        if (event.keyCode === 13) {
            this.refs.tree.filter(event.target.value);
        }
    }
    onAsync(id, text, row) {
        console.log("this", this)
        setTimeout(() => {
            this.refs.tree.append([{
                id: "c1",
                label: "异步",

            }], row)
        }, 2000);
    }
    onDrag(id, text, row) {
        console.log("d", id, text, row)
    }
    onSave(data) {
        console.log(data);
    }
    render() {
        // return <div style={{width:200}}><Tree  data={this.state.data} textField={"label"}></Tree></div>
        return <DataGrid importAble={true} headers={this.state.headers} editAble={true} data={this.state.data}></DataGrid>
        //    return  <Excel></Excel> 
        //            return<div>
        //                <Button>ddd</Button>
        // return <Color></Color>
        //            </div>

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));
