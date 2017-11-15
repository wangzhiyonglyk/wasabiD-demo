/**
 * @author 王志勇
 * @file 按钮的demo
 */

 import React from "react";
 import ReactDOM from "react-dom";
 import {Page, Panel, Button,Message,Form ,Input,Row,Col } from "wasabiD";

 class ButtonDemo extends React.Component{
  constructor(props)
  {
      super(props);
      this.onClick=this.onClick.bind(this);
  }
  onClick(name,title){
  Message.alert("此按钮的name:"+name+",标题:"+title);
  console.log(this.refs.form.getData());
  }
  render()
  {
      return <Page>
        <Form ref="form">
            <Row><Input type="text" style={{width:600}} name="name" label="姓名"></Input>
            <Input type="select" name="name1" label="姓名1" ></Input>
            <Input type="picker" name="name2" label="姓名2"></Input>
            <Input type="date" name="name3" label="姓名3"></Input>
            <Input type="datetime" name="name4" label="姓名4"></Input></Row>
            
        </Form>

          <Panel title="各类主题按钮 属性值:theme" style={{height:100}}>
          <Button theme="default" title="default" name="default" tip="默认主题"></Button>
          <Button theme="primary" title="primary" name="primary" tip="主要"></Button>
          <Button theme="success" title="success" name="success" tip="成功"></Button>
          <Button theme="info" title="info" name="info" tip="信息"></Button>
          <Button theme="warning" title="warning" name="warning" tip="警告"></Button>
          <Button theme="danger" title="danger" name="danger" tip="危险"></Button>
          <Button theme="cancel" title="cancel" name="cancel" tip="取消"></Button>
          </Panel>    
          <Panel title="按钮的大小，属性性：size" style={{height:100}}>
              <Button title="默认大小" name="default" size="default" tip="默认大小"></Button>
              <Button title="较大按钮" name="large" size="large" tip="大按钮"></Button>
              <Button title="较小按钮" name="small" size="small" tip="小按钮"></Button>
              </Panel> 
              <Panel title="按钮的其他属性" style={{height:100}}>
              <Button title="disabled" disabled={true} name="default" size="default" tip="禁用"></Button>
              <Button title="delay(点击试试)" delay={3000} name="delay" tip="点击试试"></Button>
              <Button title="onClick(点击试试)" name="onClick" onClick={this.onClick}  tip="单击事件"></Button>
              </Panel> 
      </Page>
  }
 }
 ReactDOM.render(<ButtonDemo />, document.getElementById("root"));