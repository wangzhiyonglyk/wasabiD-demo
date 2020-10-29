import React from 'react';
import ReactDOM from 'react-dom';
import Upload from "../../component/Action/Upload"
import Tree from "../../component/Data/Tree"
import Input from '../../component/Form/Input'
import Button from "../../component/Buttons/Button"
import DataGrid from "../../component/Data/DataGrid"
import unit from "../../component/libs/unit"
import Editor from "../../component/Action/Editor"
import Form from "../../component/Form/Form"
import Time from "../../component/Form/Time"
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
      ]
    }

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
  console.log(this.refs.tree.getData())
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
      <Button onClick={this.onClick.bind(this)}>单击</Button>
   
      <Input key="2" type="timerange" checkType={{y:"s",n:"s"}} checkStyle="radio" radioType="level" data={this.state.data} name="tree" label="树" textField="name" simpleData={true}></Input>
     
     
      <Input key="3" type="time" checkType={{y:"s",n:"s"}} checkStyle="radio" radioType="level" data={this.state.data} name="tree" label="树" textField="name" simpleData={true}></Input>
      <Input key="4" type="date" checkType={{y:"s",n:"s"}} checkStyle="radio" radioType="level" data={this.state.data} name="tree" label="树" textField="name" simpleData={true}></Input>
     
      <Input key="5" type="treepicker" checkType={{y:"s",n:"s"}} checkStyle="checkbox"  data={this.state.data} name="tree" label="树" textField="name" simpleData={true}></Input>
    <DataGrid headers={[{name:"good",label:"你好",headerContent:(name,label)=>{
      return <div style={{color:"red"}}>{label}</div>
    }}]} ></DataGrid>
     
    </div>;
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
