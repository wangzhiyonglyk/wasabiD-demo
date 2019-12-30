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
import Row from "../component/Layout/Row";
import Col from "../component/Layout/Col";
import Input from "../component/Form/Input"
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
      console.log( this.refs.grid.getChecked());
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
    getChecked(checkedData){
        console.log("checkedData",checkedData);
    }
    onSubmit(){
console.log("ddd")
    }
    render() {

        return <div>
            <Row> 
                <Input type="select" label="地区" data={[{"value":"001","text":"北京"},{"value":"002","text":"天津"}]} ></Input>
               <Select  label="地区" data={[{"value":"001","text":"北京"},{"value":"002","text":"天津"}]}></Select>
               <LinkButton iconCls="icon-set" title="启用" style={{color:"red"}} onClick={this.openEdit}>启用</LinkButton><LinkButton iconCls="icon-edit" title="编辑" onClick={this.openEdit}>编辑</LinkButton><LinkButton iconCls="icon-add" title="添加" onClick={this.openAdd}>添加</LinkButton>
               </Row>
           <div>
                    <DataGrid ref="grid" selectAble={true} selectChecked={true} headers={this.state.headers} data={this.state.data}></DataGrid>
                </div>
                <Modal ref="addModal"  style={{width:800,height:600}} OKHandler={this.OKHandler} >
                    <Form>
                       
    <Text required={true} type="email" label="名称"></Text>
             
                    </Form>
                </Modal>
                
        </div>
    
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
