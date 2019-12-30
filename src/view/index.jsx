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
import {fetch} from "wasabi-api"
console.log(fetch);
class Index extends React.Component {
    constructor(props) {
        super(props);

       
        this.state = {
            tabs: [],
            modalTitle:"添加",
            activeIndex: 0,

            headers:[{"name":"userName",label:"用户名"},{"name":"op",label:"操作",content:(rowData,rowIndex)=>{
                 return <div><LinkButton iconCls="icon-edit" title="编辑" onClick={this.openEdit}>编辑</LinkButton><LinkButton iconCls="icon-remove" title="删除" onClick={this.deleteConfirm}>删除</LinkButton></div>
            }}],
            data:[{
                userName:"王志勇"
            }, {userName:"房宜龙"}]
        }
    this.onSubmit=this.onSubmit.bind(this);
    this.openAdd=this.openAdd.bind(this);
    this.openEdit=this.openEdit.bind(this);
    }
   async componentDidMount() {
       let res= await fetch({
            type:"POST",
            url:"https://www.bluehy.com/Product/GetProductList?appid=wx48731a1afb81ead2"
        });
        console.log("res",res);
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
        return <Layout>
<Header></Header>
    <Left width={150}> 
    <Menus theme="default   ">
                        <MenuPanel title="订单管理">
                            <a >订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                        </MenuPanel>
                        <MenuPanel title="订单管理">
                            <a>订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                            <a>订单查询</a>
                        </MenuPanel>
                    </Menus>
                    </Left>
    <Center>
    
    <Text required={true} type="text" label="名称"></Text>
               <Select label="地区"></Select>
                <LinkButton  iconCls="icon-search">查询</LinkButton>
                <LinkButton iconCls="icon-add"  onClick={this.openAdd}>添加</LinkButton>
                <div>
                    <DataGrid headers={this.state.headers} data={this.state.data}></DataGrid>
                </div>
                <Modal ref="addModal" title={this.state.modalTitle}>
                    <Form>
                       
    <Text required={true} type="email" label="名称"></Text>
             
                    </Form>
                </Modal>
    </Center>

</Layout>
           
    
    }
}
ReactDOM.render(<Index />, document.getElementById("root"));
