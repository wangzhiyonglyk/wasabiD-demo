import React from 'react';
import ReactDOM from 'react-dom';
import("./index.css")
import {  Pivot,TreeGrid,Input} from "../../component"
import api from "../../libs/api"
class PivotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropData: [],
            headers: [
                {
                    name: "text",
                    label: "省",
                },
             
            ],
            data:  [
                {id:1,pId:"",text: "父节点1", children: [
                    {id:11,pId:1,text: "子节点11"},
                    {id:12,pId:1,text: "子节点12"}
                ]},
                {id:2,pId:"",text: "父节点2", children: [
                    {id:21,pId:2,text: "子节点21"},
                    {id:22,pId:2,text: "子节点22"}
                ]}
            ],
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }


    }
    componentDidMount() {


        setTimeout(() => {
            this.setState({
                headers: [
                    {
                        name: "province",
                        label: "省",
                    },
                    {
                        name: "city",
                        label: "市"
                    },
                    {
                        name: "year",
                        label: "年"
                    }, {
                        name: "sex",
                        label: "性别"
                    },
                    {
                        name: "income",
                        label: "收入",
                        collectName: "平均值",
                        collectType: "avg"

                    }, {
                        name: "consume",
                        label: "消费",
                        collectName: "平均值",
                        collectType: "avg"

                    }
                ],
                rows: [
                    {
                        name: "province",
                        label: "省",
                    },
                    {
                        name: "city",
                        label: "市"
                    }
                ],
                columns: [
                    {
                        name: "year",
                        label: "年"
                    }, {
                        name: "sex",
                        label: "性别"
                    }
                ],
                values: [
                    {
                        name: "income",
                        label: "收入",
                        collectName: "平均值",
                        collectType: "avg"

                    }, {
                        name: "consume",
                        label: "消费",
                        collectName: "平均值",
                        collectType: "avg"

                    }
                ],
                

            })
        }, 0)


    }
    onClick() {
     
        this.refs.rotate.turnIndex(3);
    }
    onDrop(data) {
        let dropData = this.state.dropData;
        dropData.push(data);
        this.setState({
            dropData: dropData
        })
    }

    render() {
        return  <div>
              <Input type="treepicker" checkStyle="radio" data={this.state.realTreeData} simpleData={true}></Input>
            <TreeGrid data={this.state.data}  headers={this.state.headers} ></TreeGrid></div> 

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));
