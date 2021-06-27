/**
 * create by wangzhiyong
 * date:2021-06-27
 * desc:文字校对工具栏
 */
import React from "react";
import LinkButton from "../../../Buttons/LinkButton";
let Format = function (props) {
    return <div className="wasabi-execel-tool-group">
        <div style={{ display: "flex" }}>
            <div  key="1" className="wasabi-execel-tool-button" title="文本"> <LinkButton  theme="info" iconCls="icon-text" title="文本"></LinkButton></div>
            <div  key="2" className="wasabi-execel-tool-button" title="数字">  <LinkButton  theme="info" iconCls="icon-number" title="数字"></LinkButton></div>
            <div  key="3" className="wasabi-execel-tool-button" title="选择">  <LinkButton  theme="info" iconCls="icon-select" title="选择"></LinkButton></div>
            <div  key="4" className="wasabi-execel-tool-button" title="日期">  <LinkButton  theme="info" iconCls="icon-date" title="日期"></LinkButton></div>
            <div  key="5" className="wasabi-execel-tool-button" title="时间">  <LinkButton  theme="info" iconCls="icon-time" title="时间"></LinkButton></div>
            <div  key="6" className="wasabi-execel-tool-button" title="人民币">  <LinkButton  theme="info" iconCls="icon-cny" title="人民币"></LinkButton></div>
            <div  key="7" className="wasabi-execel-tool-button" title="美元">  <LinkButton theme="info" iconCls="icon-dollar" title="美元"></LinkButton></div>
            <div  key="8" className="wasabi-execel-tool-button" title="百分比">  <LinkButton  theme="info" iconCls="icon-baifenbi" title="百分比"></LinkButton></div>
        </div>
        <div style={{ textAlign: "center" }}>格式</div>
    </div>
}
export default Format;