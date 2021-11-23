import React from 'react';
import ReactDOM from 'react-dom'
import { DataGrid } from "../../component"
class Page extends React.Component {
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

                },
                {
                    name: "省4",
                    label: "省4",
                    content:(rowData,rowIndex)=>{
                      
                        if(rowIndex%2===1){
                            return <div>{rowData.label}</div>
                        }
                        else{
                            return <div><button key="1">没有</button><button key="2">ddd</button></div>
                        }
                    }

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省5",
                    label: "省5",

                },
                {
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },{
                    name: "省5",
                    label: "省5",

                },
            
            ],
            data: [
                {
                    id: 1,label: "通过 dataSource 设置表格的数据源，通过 columns 设置表格的列。 注意 column.code 要与 dataSource 中的数据字段相对应。"     ,   label1:"dd"      },
                 
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },
                  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },  
                {
                    id: 2, label: "可以停靠",label1:"testeste"
                },
               
            ],
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }


    }

    render() {

        return <DataGrid style={{ height: 500 }} importAble={true} fixedHeaders={this.state.fixedHeaders} headers={this.state.headers} data={this.state.data} ></DataGrid>


    }
}

ReactDOM.render(<Page />, document.getElementById('root'));
