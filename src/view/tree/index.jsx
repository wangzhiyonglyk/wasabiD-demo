import React from 'react';
import ReactDOM from 'react-dom'
// import {  Tree } from "../../component"
import {Button} from "wasabiD";
// import "wasabiD/lib/index.css"
import Tree from "wasabi-tree";
// import {  Tree } from "../../component"
import "wasabi-tree/lib/index.css"
let data=[
    {
        id: 1, label: "第一个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },

    {
        id: 2, label: "第二个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },
    {
        id: 31, pId: 1, label: "第31个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },
    {
        id: 32, pId: 1, label: "第32个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },

    {
        id: 21, pId: 2, label: "第21个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },
    {
        id: 22, pId: 2, label: "第22个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },
    {
        id: 221, pId: 22, label: "第221个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d"
    },
];
for(let i=0;i<1000;i++){

    data.push({
        id:"s"+i,
        pId:2,
        label:"第"+i+"节点"
    })
}
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.tree=React.createRef();
        this.input = React.createRef();
        this.input1 = React.createRef();
        this.form = React.createRef();
        this.state = {
            dropData: [],
            fixedHeaders: [
                {
                    name: "id",
                    label: "fixedid",

                },

            ],
            headers: [

                {
                    name: "label",
                    label: "省11",
                    editor: {
                        type: "select",
                        options: {
                            data: [
                                { text: "test", value: "test" }
                            ]
                        }
                    }

                },

                {
                    name: "label1",
                    label: "省2",
                    editor: {
                        type: "checkbox",
                        options: {
                            data: [
                                { text: "test", value: "test" },
                                { text: "test1", value: "test1" },
                                { text: "test2", value: "test2" }
                            ]
                        }
                    }
                },
                {
                    name: "省4",
                    label: "省4",
                    content: (rowData, rowIndex) => {

                        if (rowIndex % 2 === 1) {
                            return <div>{rowData.label}</div>
                        }
                        else {
                            return <div><button key="1">没有</button><button key="2">ddd</button></div>
                        }
                    }

                },

                {
                    name: "label1",
                    label: "省2",
                    width: 1200

                },
            ],
            data: data,
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }
    }
    onClick(){
this.setState({
    height:400
},()=>{
    console.log(
        "Test"
    )
  this.tree.current.reload();
}
)
    }
    render() {
        return <div style={{height:"100%",display:"flex",flexDirection:"column"}} >
            <div key="1" style={{height:100,background:"red"}}>
                <Button name="good"  onClick={this.onClick.bind(this)}>改变下面</Button>
            </div>
             <Tree key="2" ref={this.tree}  style={{flexGrow:1,height:500}} textField="label" checkStyle="checkbox" renameAble={true} rowNumber={true} detailAble={true} checkAble={true} importAble={true} fixedHeaders={this.state.fixedHeaders} headers={this.state.headers} data={this.state.data} ></Tree>
        <div key="3" style={{height:this.state.height||200,background:"blue"}}>

        </div>
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('root'));
