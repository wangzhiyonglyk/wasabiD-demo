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
export default function(props) {

  if(props.plain){
return <PlainUpload {...props}></PlainUpload>
  }
  else{
    return <BreakUpload {...props}></BreakUpload>  
  }
  
}