import React from 'react';
import ReactDOM from 'react-dom';

import {Input,DataGrid ,SearchBar,SearchBox,Form,Progress, Button,Step,StepItem,Dropdown,DropdownItem} from "../../component"
import api from "../../libs/api"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
		
       
      ],
      tabs: [{
        title:"你好"
      },{
        title:"我好"
      }],
    }
    this.onClick=this.onClick.bind(this)

  }
  componentDidMount() {
   
    api.ajax({
      url:"http://locahost:7007/user/login",
      type:"post",
      data:{
        code:"dfsdfds",
        appid:"cd"
      },
      success:(res)=>{
        console.log(res)
      }
    })
    this.setState({
      data:[ { id:1, pId:0, name:"父节点1 - 展开", open:true},
      { id:11, pId:1, name:"父节点11 - 折叠"},
      { id:111, pId:11, name:"叶子节点111"},
      { id:112, pId:11, name:"叶子节点112"},
      { id:113, pId:11, name:"叶子节点113"},
      { id:114, pId:11, name:"叶子节点114"},
      { id:12, pId:1, name:"父节点12 - 折叠"},
      { id:121, pId:12, name:"叶子节点121"},
      { id:122, pId:12, name:"叶子节点122"},
      { id:123, pId:12, name:"叶子节点123"},
      { id:124, pId:12, name:"叶子节点124"},
      { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
      { id:2, pId:0, name:"父节点2 - 折叠"},
      { id:21, pId:2, name:"父节点21 - 展开", open:true},
      { id:211, pId:21, name:"叶子节点211"},
      { id:212, pId:21, name:"叶子节点212"},
      { id:213, pId:21, name:"叶子节点213"},
      { id:214, pId:21, name:"叶子节点214"},
      { id:22, pId:2, name:"父节点22 - 折叠"},
      { id:221, pId:22, name:"叶子节点221"},
      { id:222, pId:22, name:"叶子节点222"},
      { id:223, pId:22, name:"叶子节点223"},
      { id:224, pId:22, name:"叶子节点224"},
      { id:23, pId:2, name:"父节点23 - 折叠"},
      { id:231, pId:23, name:"叶子节点231"},
      { id:232, pId:23, name:"叶子节点232"},
      { id:233, pId:23, name:"叶子节点233"},
      { id:234, pId:23, name:"叶子节点234"},
      { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}]
    })
  
  }
  beforeRename(id, text) {

    return true;
  }
  beforeRemove(id, text, p, children) {
    if (children && children.length > 1) {
      if (confirm("是否一同删除子节点")) {
        return true;
      }
      return false;
    }
    return true;
  }
  onRename(oldid, oldText, newText, pro, chid) {
    console.log(oldid, oldText, newText, pro, chid);
  }
  onRemove(id, oldText, pro, child) {

  }
  onChecked(checked) {
   let data= this.refs.tree.getChecked();
   console.log("data",data);
  }
  onClick() {
  this.refs.p.setValue(80);
  this.refs.s.setActiveIndex(0);
  this.setState({
value:"你好"
  })
  }
  onEdit(){
    console.log("de")
  }
  ontreeClick(){
    console.log("de1")
  }
  beforeRename(){
    return false;
  }
  onSelect(value,text,name){
    console.log(value,text,name);
  }
  render() {
    return <div>
     <Step ref="s" activeIndex={0} >
       <StepItem key="1" title={"步骤1"} >测试中</StepItem>
       <StepItem key="2"  title={"步骤2"} ></StepItem>
       </Step>
     <Progress ref="p" value={50} type="circle"></Progress>
     <Button iconCls="icon-search" onClick={this.onClick.bind(this)}>test</Button>

     <Dropdown   plain={false} menuIconCls="icon-category">
<DropdownItem>按钮1</DropdownItem>
<DropdownItem>按钮2</DropdownItem>
<DropdownItem>按钮3</DropdownItem>
<DropdownItem>按钮4</DropdownItem>
     </Dropdown>
     <Form>
       <Input key="1" type="treepicker" data={this.state.data} checkStyle="radio" textField="name" name="tree1" simpleData={true}></Input>
       <Input key="2" type="date" data={this.state.data} checkStyle="radio" textField="name2" name="tree2" simpleData={true}></Input>
       <Input  key="3" type="datetime" data={this.state.data} checkStyle="radio" textField="name3" name="tree3" simpleData={true}></Input>
       <Input key="4" type="select" data={this.state.data} checkStyle="radio" valueField="id" textField="name" name="tree4" simpleData={true}></Input>
       <Input key="6" type="picker" data={this.state.data} checkStyle="radio" textField="name" name="tree2" simpleData={true}></Input>
       <Input key="5"  type="checkbutton" data={this.state.data} textField="name" valueField="id" checkStyle="radio"  name="tree5" simpleData={true}></Input>
       
       </Form> 
       <SearchBox></SearchBox>
   
      <DataGrid style={{width:500}} selectAble={true} headers={[{width:100,name:"id",label:"id"},{width:100,name:"name",label:"汉字"}]}  data={this.state.data}></DataGrid></div>

    

  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
