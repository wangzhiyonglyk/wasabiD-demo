/**
 * create by wangzhiyong
 * date:2021-06-27
 * desc:操作工具栏
 */
 import React from "react";
 import LinkButton from "../../../Buttons/LinkButton";
 let Do = function (props) {
     return <div className="wasabi-execel-tool-group">
         <div style={{display:"flex"}}> 
             <div key="1" className="wasabi-execel-tool-button" title="撤消"> <LinkButton  theme="info" iconCls="icon-undo" title="撤消"></LinkButton></div>
             <div key="2" className="wasabi-execel-tool-button" title="恢复">  <LinkButton  theme="info" iconCls="icon-redo" title="恢复"></LinkButton></div>
            
         </div>
         <div style={{textAlign:"center"}}>操作</div>
     </div>
 }
 export default Do;