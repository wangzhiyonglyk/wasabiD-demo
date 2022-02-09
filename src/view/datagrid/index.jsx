import React from 'react';
import ReactDOM from 'react-dom'
import { DataGrid,CheckBox} from "../../component"
class Page extends React.Component {
    constructor(props) {
        super(props);
        console.log("page",props)
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
                
                {
                    name: "label3",
                    label: "省2",
                    

                },
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
     let scrollTop=event.target.scrollTop;
    document.getElementById("d").style.height=scrollTop+"px";
    document.getElementById("d1").style.height=(10000-scrollTop)+"px"

    }
    componentDidUpdate(){
        
    }
    componentDidMount(){
        
    }
    render() {
        
         return <div>
             <CheckBox data={ [{ value: '1', text: '1' }]} ></CheckBox>
            <DataGrid httpType="get" style={{ height: 600,width:"100%"}} pagination={false} textField="label" rowNumber={true} detailAble={true} selectAble={true} importAble={true} fixedHeaders={this.state.fixedHeaders} headers={this.state.headers} data={this.state.data} ></DataGrid>
         </div>

    }
}

ReactDOM.render(<Page />, document.getElementById('root'));
