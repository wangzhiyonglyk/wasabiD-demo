import React from 'react';
import ReactDOM from 'react-dom'
import Tree from "../../component/Data/Tree"

let data = [
    {
        id: 1, label: "第一个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },

    {
        id: 2, label: "第二个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },
    {
        id: 31, pId: 1, label: "第31个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },
    {
        id: 32, pId: 1, label: "第32个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },

    {
        id: 21, pId: 2, label: "第21个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },
    {
        id: 22, pId: 2, label: "第22个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },
    {
        id: 221, pId: 22, label: "第221个节点 通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 d",dropAble:true,
    },
];
for (let i = 0; i < 1000; i++) {

    data.push({
        id: "s" + i,
        pId: 2,
        label: "第" + i + "节点",
        draggAble:true,
        dropAble:true
    })
}
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
       this.tree.current.getChecked()
        
    }
    render() {
        return <div style={{ height: "100%", display: "flex", padding:10, flexDirection: "column" }} >
          <button>test</button>
            <Tree ref={this.tree} textField="label"  renameAble={true} removeAble={true}  url={"http://127.0.0.1:7001/getData"} httpType="GET"></Tree>
         </div>
    }
}

ReactDOM.render(<Page />, document.getElementById('root'));
