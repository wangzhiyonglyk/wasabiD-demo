import React from 'react';
import ReactDOM from 'react-dom';

import CheckBox from "../../component/Form/CheckBox"
import Select from "../../component/Form/Select"
import Radio from "../../component/Form/Radio"
import Input from "../../component/Form/Input"
import Label from "../../component/Info/Label"
import Button from "../../component/Buttons/Button"
import LinkButton from "../../component/Buttons/LinkButton"
import Tabs from "../../component/Navigation/Tabs";
import Modal from "../../component/Layout/Modal";
import TabPanel from "../../component/Navigation/TabPanel";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[
		
        { id:1, pId:0, name:"父节点1 - 展开", open:true},
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
        { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
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
  // this.refs.upload.open();
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

  render() {
    return <div>
<br></br>

<Button key="1" theme="default" size="small"  onClick={this.onClick}>信息按钮</Button>
<Button  key="2" theme="primary"   size="mini" onClick={this.onClick}>信息按钮</Button>
<Button  key="3" theme="info"   onClick={this.onClick}>信息按钮</Button>
<Button   key="4" theme="success"size="large" disabled={true} onClick={this.onClick}>信息按钮</Button>
<Button  key="5" theme="warning" onClick={this.onClick}>信息按钮</Button>
<Button  key="6" theme="danger" onClick={this.onClick}>信息按钮</Button>

<LinkButton key="11" iconCls={"icon-txt"} theme="default" size="small"  onClick={this.onClick}>设计要求</LinkButton>
<LinkButton  key="12"   iconCls="icon-txt" theme="primary"  title="设计要求"  size="mini" onClick={this.onClick}>设计要求</LinkButton>
<LinkButton  key="13"  iconCls={"icon-txt"} theme="info"   onClick={this.onClick}>设计要求</LinkButton>
<LinkButton   key="14"  iconCls={"icon-txt"} theme="success"size="large" disabled={true} onClick={this.onClick}>设计要求</LinkButton>
<LinkButton  key="15"  iconCls={"icon-txt"} theme="warning" onClick={this.onClick}>设计要求</LinkButton>
<LinkButton  key="16"  iconCls={"icon-txt"}  style={{fontSize:18}}theme="danger" title="查询" onClick={this.onClick}></LinkButton>

    {/* <CheckBox  label="你好" help="这个性别" name={"dd"} data={[{value:1,text:"Wfdfsdf"},{value:2,text:"dddd"}]}></CheckBox> */}
    {/* <Radio  label="你好" help="这个性别" name={"dd"} data={[{value:1,text:"Wfdfsdf"},{value:2,text:"dddd"}]}></Radio> */}
    {/* <Select  label="你好" help="这个性别" name={"dd"} data={[{value:1,text:"Wfdfsdf"},{value:2,text:"dddd"}]}></Select> */}
    <Input key="1"  placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="datetimerange" label="你好" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
     <Input key="2"   placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="datetime" label="你好" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
    
    <Input  key="3"  placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="timerange" label="你好" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
    
    <Input  key="4"  placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="date" label="你好" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
    
    <Input key="5"   placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="time" label="你好" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
       <Input key="6"   placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="daterange" label="number" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
      <Input key="7"   placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="select" label="number" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
      <Input key="8"   placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="picker" label="number" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
      <Input key="9"   placeholder="请输入"  required={true} value={this.state.value} addAbled={true}  type="treepicker" label="number" help="这个性别" name={"dd"}
     data={[{id:1,text:"Wfdfsdf"},{id:2,text:"dddd",children:[{id:3,text:"fsfaf"}]}]}></Input>
       <Tabs  ref="tabs"  >
            {this.state.tabs.map(item => {
              return (
                <TabPanel key={item.title} title={item.title} iconCls={item.iconCls}>
                  <div></div>
                </TabPanel>
              );
            })}
          </Tabs>
   
    </div>;
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
