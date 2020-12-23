import React from 'react';
import ReactDOM from 'react-dom';

import { Article, Avatar, Input, DataGrid, Tree, Left, Right, Pivot,TabPanel,Tabs } from "../../component"
import api from "../../libs/api"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [


      ],
      tabs: [{
        title: "你好"
      }, {
        title: "我好"
      }],
    }
    this.onClick = this.onClick.bind(this)

  }
  componentDidMount() {

    this.setState({
      data: [{ id: 1, pId: 0, name: "父节点1 - 展开", open: true },
      { id: 11, pId: 1, name: "父节点11 - 折叠" },
      { id: 111, pId: 11, name: "叶子节点111" },
      { id: 112, pId: 11, name: "叶子节点112" },
      { id: 113, pId: 11, name: "叶子节点113" },
      { id: 114, pId: 11, name: "叶子节点114" },
      { id: 12, pId: 1, name: "父节点12 - 折叠" },
      { id: 121, pId: 12, name: "叶子节点121" },
      { id: 122, pId: 12, name: "叶子节点122" },
      { id: 123, pId: 12, name: "叶子节点123" },
      { id: 124, pId: 12, name: "叶子节点124" },
      { id: 13, pId: 1, name: "父节点13 - 没有子节点", isParent: true },
      { id: 2, pId: 0, name: "父节点2 - 折叠" },
      { id: 21, pId: 2, name: "父节点21 - 展开", open: true },
      { id: 211, pId: 21, name: "叶子节点211" },
      { id: 212, pId: 21, name: "叶子节点212" },
      { id: 213, pId: 21, name: "叶子节点213" },
      { id: 214, pId: 21, name: "叶子节点214" },
      { id: 22, pId: 2, name: "父节点22 - 折叠" },
      { id: 221, pId: 22, name: "叶子节点221" },
      { id: 222, pId: 22, name: "叶子节点222" },
      { id: 223, pId: 22, name: "叶子节点223" },
      { id: 224, pId: 22, name: "叶子节点224" },
      { id: 23, pId: 2, name: "父节点23 - 折叠" },
      { id: 231, pId: 23, name: "叶子节点231" },
      { id: 232, pId: 23, name: "叶子节点232" },
      { id: 233, pId: 23, name: "叶子节点233" },
      { id: 234, pId: 23, name: "叶子节点234" },
      { id: 3, pId: 0, name: "父节点3 - 没有子节点", isParent: true }]
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
    let data = this.refs.tree.getChecked();
    console.log("data", data);
  }
  onClick() {
    this.refs.p.setValue(80);
    this.refs.s.setActiveIndex(0);
    this.setState({
      value: "你好"
    })
  }
  onEdit() {
    console.log("de")
  }
  ontreeClick() {
    console.log("de1")
  }
  beforeRename() {
    return false;
  }
  onSelect(value, text, name) {
    console.log(value, text, name);
  }
  render() {
    return <div>
<DataGrid pagination={false}  
    headers={[[{label:"树结构",colSpan:2}],[{name:"id",label:"id",sortAble:true,},{name:"name",label:"名称"}]]} data={this.state.data}></DataGrid>

    </div>

  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
