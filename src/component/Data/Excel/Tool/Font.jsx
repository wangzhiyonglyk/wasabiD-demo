/**
 * create by wangzhiyong
 * date:2021-06-27
 * desc:字体工具栏
 */
import React from "react";
import LinkButton from "../../../Buttons/LinkButton";
import Input from "../../../Form/Input"
import Dropdown from "../../../Buttons/Dropdown"
const fontFamily = [
    { value: "inherit", text: "默认" },
    { value: "SimSun", text: "宋体" },
    { value: "SimHei", text: "黑体" },
    { value: "Microsoft YaHei", text: "微软雅黑" },
    { value: "Microsoft JhengHei", text: "黑体" },
    { value: "NSimSun", text: "新宋体" },
    { value: "PMingLiU", text: "新细明体" },
    { value: "MingLiU", text: "细明体" },
    { value: "DFKai-SB", text: "标楷体" },
    { value: "FangSong", text: "仿宋" },
    { value: "KaiTi", text: "楷体" },
    { value: " FangSong_GB2312", text: "仿宋" },
];
const fontSize = function (params) {
    let arr = [];
    for (let i = 12; i <= 24; i++) {
        arr.push({ value: i, text: i });
    }
    return arr;

}
let Font = function (props) {
    return <div className="wasabi-execel-tool-group">
        <div key="1" style={{ display: "flex" }}> <div className="wasabi-execel-tool-button" title="字体"><Input type="select" value="inherit" data={fontFamily}></Input></div>
            <div key="2" className="wasabi-execel-tool-button" title="字号">  <Input type="select" value="14" data={fontSize()}></Input></div>
            <div key="3" className="wasabi-execel-tool-button" title="加粗"> <LinkButton theme="info" iconCls="icon-bold" title="加粗"></LinkButton></div>
            <div key="4" className="wasabi-execel-tool-button" title="斜体">  <LinkButton theme="info" iconCls="icon-italic" title="斜体"></LinkButton></div>
            <div key="5" className="wasabi-execel-tool-button" title="下划线">  <LinkButton theme="info" iconCls="icon-underline" title="下划线"></LinkButton></div>
            <div key="6" className="wasabi-execel-tool-button">  <Dropdown theme="info" iconCls="icon-font-colors"></Dropdown></div>
            <div key="7" className="wasabi-execel-tool-button">  <Dropdown plain={true} theme="info" iconCls="icon-colorSelector"></Dropdown></div>
        </div>
        <div style={{ textAlign: "center" }}>字体</div>
    </div>
}
export default Font;