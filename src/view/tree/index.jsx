import React from 'react';
import ReactDOM from 'react-dom'
import Tree from "wasabi-tree"
import { Input } from "../../component";
let data = [
    {
        id: 1, label: "第1个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },

    {
        id: 2, label: "第2个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },
    {
        id: "2-1", pId: 1, label: "第1-1个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true
    },
    {
        id: "2-2", pId: 1, label: "第12个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },

    {
        id: "2-2-1", pId: "2-2", label: "第2-2-1个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },
    {
        id: "3", pId: "", label: "第3个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },
    {
        id: "4", pId: "", label: "第4个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },
    {
        id: "5", pId: "", label: "第5个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,
    },
    {
        id: "6", pId: "", label: "第6个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d", dropAble: true,draggAble:true
    },
];
console.time("生成10万数据")
for (let i = 0; i < 100000; i++) {
    let pId;
    if (i < 1000) {
        pId = 1;

    }
    else if (i < 5000) {
        pId = 2;
    }
    else if (i < 10000) {
        pId = 3;
    }
    else if (i < 20000) {
        pId = 4;
    }
    else {
        pId = 5;
    }
    data.push({
        id: "s" + i,
        pId: pId,
        label: "第s" + i + "节点",
        draggAble: true,
        dropAble: true
    })
}
console.timeEnd("生成10万数据")
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.tree = React.createRef();
        this.radio = React.createRef();
        this.input1 = React.createRef();
        this.form = React.createRef();
        this.state = {
            value: 1,
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
    onClick() {
        let data = this.tree.current.getChecked()
        console.log("data")
    }
    render() {
        return <div style={{ height: "100%", display: "flex", padding: 10, flexDirection: "column" }} >
            <button onClick={this.onClick.bind(this)}>tst</button>
            <Input type="select" data={this.state.data} />
           <div style={{width:200,height:500,overflow:"auto"}}><Tree  textFormatter={(row)=>{return <div style={{background:"red"}}>{ row.text}</div>}} style={{width:500}} ref={this.tree} data={this.state.data}  textField="label" renameAble={true} removeAble={true} httpType="GET"></Tree></div> 
        </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('root'));
