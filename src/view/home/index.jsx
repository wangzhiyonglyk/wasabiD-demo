import React from 'react';
import ReactDOM from 'react-dom';
import Upload from "../../component/Action/Upload"
import Tree from "../../component/Data/Tree"
import Input from '../../component/Form/Input'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {

  }
  beforeRename(value, text) {
    console.log(value, text);
    return true;
  }
  beforeRemove(value, text, p, children) {
    if (children && children.length > 0) {
      if (confirm("是否一同删除子节点")) {
        return true;
      }
      return false;
    }
    return true;
  }
  onRename(oldValue, oldText, newText, pro,chid) {
    console.log(oldValue, oldText, newText, pro,chid);
  }
  onRemove(value,oldText,pro,child){
   
  }
  onChecked(checked){
    console.log(checked,"d0");
  }
  render() {

    return <div>

      <Tree beforeRename={this.beforeRename.bind(this)} onChecked={this.onChecked.bind(this)} beforeRemove={this.beforeRemove.bind(this)} 
      onRemove={this.onRemove.bind(this)} onRename={this.onRename.bind(this)} checkAble={true} editAble={true} 
      removeAble={true} data={[{ value: "一级", text: "一级", dragAble: true },
       { value: "父节点", isParent: true, text: "父节点", open: true, children: [{ value: "子节点", text: "子节点" },
        { value: "父子节点", isParent: true, text: "父子节点",drag:true }] }]}></Tree>
    </div>;
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
