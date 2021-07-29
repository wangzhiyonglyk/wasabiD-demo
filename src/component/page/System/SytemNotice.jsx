
import React from "react";
import Notice from "../../Navigation/Notice";
function SystemNoitce(props) {
    return <div className='system-icon' onClick={props.noticeExpand}>
        <i
            style={{
                height: 42,
                lineHeight: "42px",
                marginLeft: 5,
                marginRight: 5,
            }}
            title="消息"
            className={"icon-bell"}

        ></i>
        <div style={{
            width: 12,
            height: 12,
            background: "#f14d41",
            position: "absolute",
            top: 8,
            right: 8,
            borderRadius: "50%",
            transform: "scale(0.5)"
        }}></div>
        <div className={
            props.isnoticeExpand ? "icon-menus notice show" : "icon-menus notice hide"
        } style={{ width: 360, border: "none", left: -100 }}>
            <Notice data={props.notices} onClick={props.noticeClick}></Notice>
        </div>
    </div>
}
export default SystemNoitce;