/*/
 create by wangzy
 date:2016-05-17
 edit:2020-03-13
 edit 2020-11-20 拆分成两个，保留原始，做兼容处理
 desc:文件上传组件
 */
import React, { Component } from 'react';
import PlainUpload from "./PlainUpload"
import BreakUpload from "./BreakUpload"
class Upload extends Component {

constructor(props){
  super(props)
}
open(){
this.refs.upload.open();
}
close(){
  this.refs.upload.close();
}
  render() {
    if (this.props.plain) {
      return <PlainUpload ref="upload" {...this.props}></PlainUpload>
    }
    else {
      return <BreakUpload  ref="upload" {...this.props}></BreakUpload>
    }
  }



}
export default Upload;