import React from 'react';
import ReactDOM from 'react-dom'
import { DataGrid} from "../../component"
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
                    content:(rowData,rowIndex)=>{
                      
                        if(rowIndex%2===1){
                            return <div>{rowData.label}</div>
                        }
                        else{
                            return <div><button key="1">没有</button><button key="2">ddd</button></div>
                        }
                    }

                },
            
                // {
                //     name: "label3",
                //     label: "省2",
                //     content:()=>{
                //         return <img style={{height:60}} src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/29/16e151a59317cae7~tplv-t2oaga2asx-watermark.awebp"></img>
                //     }

                // },
            ],
            data:(()=>{
                let arr=[]
             for(let i=0;i<1500;i++)
             if(i%2==0){
                 arr.push( {
                    id: i,label: "通过   dataSource 中的数据字段相对应。"     ,   label1:"dd"      },
                 
                  )
             }
             else{
                 arr.push({
                    id: i, label: "可以停靠",label1:"testeste"
                })
             }
             return arr;
            })(),
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
            startIndex:0,
            endIndex:20
        }
    }
    onScroll(event){
       return;
     let scrollTop=event.target.scrollTop;
     let index=Math.floor(scrollTop/40);
     if(index+10<this.state.data.length)
     {
        this.setState({
            startIndex:index,
            endIndex:index+10
        })
     }
      
    }
    componentDidUpdate(){
        
    }
    componentDidMount(){
        console.timeEnd("d")
    }
    render() {
        console.time("d")
         return <DataGrid httpType="get" style={{ height: 600,width:1000}} pagination={false} textField="label" rowNumber={true} detailAble={true} selectAble={true} importAble={true} fixedHeaders={this.state.fixedHeaders} headers={this.state.headers} data={this.state.data} ></DataGrid>

    }
}

ReactDOM.render(<Page />, document.getElementById('root'));
