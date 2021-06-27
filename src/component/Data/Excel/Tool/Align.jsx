/**
 * create by wangzhiyong
 * date:2021-06-27
 * desc:文字校对工具栏
 */
import React from "react";
import LinkButton from "../../../Buttons/LinkButton";
let Algin = function (props) {
    return <div className="wasabi-execel-tool-group">
        <div style={{ display: "flex" }}>
            <div key="1" className="wasabi-execel-tool-button" title="左对齐"><LinkButton theme="info" iconCls="icon-align-left" title="左对齐"></LinkButton></div>
            <div key="2" className="wasabi-execel-tool-button" title="居中"><LinkButton theme="info" iconCls="icon-align-center" title="居中"></LinkButton></div>
            <div key="3" className="wasabi-execel-tool-button" title="右对齐"><LinkButton theme="info" iconCls="icon-align-right" title="右对齐"></LinkButton></div>
            <div key="4" className="wasabi-execel-tool-button" title="自动换行"><LinkButton theme="info" iconCls="icon-wrap" title="自动换行"></LinkButton></div>
            <div key="5" className="wasabi-execel-tool-button" title="合并单元格"> <LinkButton theme="info" iconCls="icon-merge-cell" title="合并单元格"></LinkButton></div>
        </div>
        <div style={{ textAlign: "center" }}>校对</div>
    </div>
}
export default Algin;