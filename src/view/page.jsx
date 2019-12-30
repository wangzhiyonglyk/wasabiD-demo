import React from "react";
import ReactDOM from "react-dom";
import Button from "../component/Buttons/Button"
import LinkButton from "../component/Buttons/LinkButton"
import Toolbar from "../component/Buttons/Toolbar"
import Form  from "../component/Form/Form";
import Text from "../component/Form/Text";
import Select from "../component/Form/Select";
import Menus from "../component/Navigation/Menus";
import MenuPanel from "../component/Navigation/MenuPanel"
import Layout from "../component/Layout/Layout";
import Left from "../component/Layout/Left";
import Center from "../component/Layout/Center";
import Header from "../component/Layout/Header";
import Modal from "../component/Layout/Modal";
import DataGrid from "../component/Data/DataGrid";
import Message from "../component/Unit/Message";
class Index extends React.Component {
    constructor(props) {
        super(props);

       
        this.state = {
            tabs: [],
            modalTitle:"添加",
            activeIndex: 0,

            headers:[{name:"userName",label:"用户名"}, 
            {name:"sex",label:"性别"},{ name:"age",label:"年龄"},
            {name:"op",label:"操作",content:(rowData,rowIndex)=>{
                if(rowData.status)
                {
                    return <div><LinkButton iconCls="icon-set" title="停用" style={{color:"blue"}} onClick={this.openEdit}>停用</LinkButton><LinkButton iconCls="icon-edit" title="编辑" onClick={this.openEdit}>编辑</LinkButton><LinkButton iconCls="icon-remove" title="删除" onClick={this.deleteConfirm}>删除</LinkButton></div>
        
                }else{
                    return <div><LinkButton iconCls="icon-set" title="启用" style={{color:"red"}} onClick={this.openEdit}>启用</LinkButton><LinkButton iconCls="icon-edit" title="编辑" onClick={this.openEdit}>编辑</LinkButton><LinkButton iconCls="icon-remove" title="删除" onClick={this.deleteConfirm}>删除</LinkButton></div>
        
                }
            }}],
            data:[{
                userName:"王志勇",
                sex:"男",
                age:31,
                status:false,
            },
             {userName:"房宜龙",
            sex:"男",age :22,
        status:true
        }]
        }
    this.onSubmit=this.onSubmit.bind(this);
    this.openAdd=this.openAdd.bind(this);
    this.openEdit=this.openEdit.bind(this);
    this.OKHandler=this.OKHandler.bind(this);
    }
    componentDidMount() {
        
    }
    OKHandler(){
        console.log("dd");
    }
    openAdd(){
       
this.refs.addModal.open("新增");
    }
    openEdit(){
        this.refs.addModal.open("编辑"); 
    }
    deleteConfirm(){
Message.confirm("确定删除吗？",()=>{
    Message.success("删除成功");
},()=>{
    Message.error("删除失败");
})
    }
    onSubmit(){
console.log("ddd")
    }
    render() {

        return <div>
            <Text  name="userName" type="text" label="名称"></Text>
               <Select label="地区" data={[{value:"001",text:"北京"},{value:"002",text:"天津"}]}></Select>
                <LinkButton  iconCls="icon-search" style={{color:"red"}}> 查询</LinkButton>
                <LinkButton iconCls="icon-add"  onClick={this.openAdd}>添加</LinkButton>
                <div>
                    <DataGrid headers={this.state.headers} data={this.state.data}></DataGrid>
                </div>
                <Modal ref="addModal" width={800} height={800} OKHandler={this.OKHandler} >
                    <Form>
                       
    <Text required={true} type="email" label="名称"></Text>
             
                    </Form>
                </Modal>
        </div>
    
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
