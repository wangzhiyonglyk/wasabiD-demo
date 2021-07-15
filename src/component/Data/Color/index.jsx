import React from "react";
import Button from "../../Buttons/Button";
import func from "../../libs/func";
import regs from "../../libs/regs";
import "./color.css"
import colorFunc from "./colorFunc";
import colors from "./colors";
class ColorPickerPanel extends React.Component {
    constructor(props) {
        super(props);
        let color = this.props.color;
        let hsv = colorFunc.rgbToHsv(color);
        let top = 150 - hsv.v / 100 * 150 - 6;
        let left = hsv.s / 100 * 230 - 6;
        this.state = {
            color: func.clone(color),
            dotid: func.uuid(),
            pickerid: func.uuid(),
            top: top,
            left: left
        }
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }
    componentDidMount() {
        document.getElementById(this.state.pickerid).addEventListener("mousedown", this.onMouseDown)
    }
    /**
     * 交由父组件渲染
     * @param {*} color 
     */
    setColor(color) {
        let hsv = colorFunc.rgbToHsv(color);
        let top = 150 - hsv.v / 100 * 150 - 6;
        let left = hsv.s / 100 * 230 - 6;
        this.setState = ({
            color: func.clone(color),
            top: top,
            left: left
        })
    }
    onMouseDowndot(event) {
        console.log("evet")
    }
    /**
     * 
     * @param {*} event 
     */
    onMouseDown(event) {
        console.log("test");
        this.down = true;
        let dot = document.getElementById(this.state.dotid);
        let hsv = colorFunc.rgbToHsv(this.state.color);
        dot.style.top = (event.offsetY - 6) + "px";
        dot.style.left = (event.offsetX - 6) + "px";
        let b = 0 > event.offsetY ? 0 : event.offsetY
            , s = 0 > event.offsetX ? 0 : event.offsetX;
        hsv = {
            s: ((230 < s ? 230 : s) + 6) / 230 * 100,
            v: 100 - ((150 < b ? 150 : b) + 6) / 150 * 100,
            h: hsv.h
        }
        let color = colorFunc.hsvToRgb(hsv)
        this.setState({
            ...color,
            top: (event.nativeEvent.offsetY - 6),
            left: (event.nativeEvent.offsetX - 6),
        })
        this.props.onChange && this.props.onChange({ ...colorFunc.hsvToRgb(hsv) });
        document.addEventListener("mouseup", this.onMouseUp)
    }
    onMouseMove(event) {
        if (this.down) {
            let dot = document.getElementById(this.state.dotid);
            dot.style.top = (event.nativeEvent.offsetY - 6) + "px";
            dot.style.left = (event.nativeEvent.offsetX - 6) + "px";
        }
    }
    onMouseUp(event) {
        this.down = false;
        document.removeEventListener("mouseup", this.onMouseUp)
    }
    render() {
        let color = this.state.color;
        let top = this.state.top;
        let left = this.state.left;
        return <div className="wasabi-color-picker"
            style={{ backgroundColor: "rgba(" + [color.r, color.g, color.b, color.a].join(",") + ")" }}>
            <div className="wasabi-color-picker-to-right">
                <div className="wasabi-color-picker-to-top">
                    <div className="wasabi-color-picker-dot" onMouseDown={this.onMouseDowndot.bind(this)} id={this.state.dotid} style={{ top: top, left: left }}></div>
                    {/**因为要计算相对父窗口的偏移量，加一个zindex更大的遮罩层，得到offsetX */}
                    <div id={this.state.pickerid} style={{ width: "100%", height: "100%", zIndex: 2 }}
                        // onMouseDown={this.onMouseDown.bind(this)}
                        onMouseMove={this.onMouseMove.bind(this)}
                    ></div>
                </div>
            </div>
        </div>
    }
}

class ColorNumberPanel extends React.Component {
    constructor(props) {
        super(props);
        let hsv = colorFunc.rgbToHsv(this.props.color);
        this.left = parseInt(hsv.h / 360 * 160) - 6;
        this.state = {
            r: props.color.r,
            g: props.color.g,
            b: props.color.b,
            a: props.color.a,
            color: {},
            oldColor: null,
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (func.diff(props.color, state.oldColor)) {
            return {
                r: props.color.r,
                g: props.color.g,
                b: props.color.b,
                a: props.color.a,
                color: func.clone(props.color),
                oldColor: func.clone(props.color),
            }
        }

        return null;
    }
    onChange(type, event) {
        let newState = {};
        newState[type] = event.target.value;
        if (type !== "a" && regs.integer.test(event.target.value) && event.target.value * 1 <= 255 && event.target.value * 1 >= 0) {
            newState.color = this.state.color;
            newState.color[type] = event.target.value;
            this.props.onChange && this.props.onChange(newState.color);
        }
        else if (type === "a" && regs.number.test(event.target.value) && event.target.value * 1 <= 1 && event.target.value * 1 >= 0) {
            newState.color = this.state.color;
            newState.color[type] = event.target.value;
            this.props.onChange && this.props.onChange(newState.color);
        }

        this.setState(newState);
    }
    render() {
        let color = this.state.color;
        return <div className="wasabi-color-number">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="wasabi-color-number-dot">
                    <div style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "7px",
                        backgroundColor: "rgba(" + [color.r, color.g, color.b, color.a].join(",") + ")"
                    }}></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="wasabi-color-number-color-line">
                        <div className="dot" style={{ left: this.left }}></div>
                    </div>
                    <div className="wasabi-color-number-opacity-line" >
                        <div style={{
                            width: "100%", height: "100%", position: "relative",
                            backgroundImage: "linear-gradient(to right, rgba(255,0,0,0) 0%, rgb(255,0,0) 100%)"
                        }}>
                            <div style={{ zIndex: 1, position: "absolute", left: 0, top: 0, backgroundImage: "linear-gradient(to right,rgba(" + [this.state.r, this.state.g, this.state.b, 0].join(",") + ") 0% ,rgb(" + [this.state.r, this.state.g, this.state.b].join(",") + ") 100%)", width: "100%", height: "100%" }}></div>
                            <div className="dot" style={{ zIndex: 2, left: "calc(" + (this.state.a * 100) + "% - 6px)" }}>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="wasabi-color-number-op">
                <div style={{ display: "flex" }}>
                    <input key="red" name="red" value={this.state.r} onChange={this.onChange.bind(this, "r")}></input>
                    <input key="green" name="green" value={this.state.g} onChange={this.onChange.bind(this, "g")}></input>
                    <input key="blue" name="blue" value={this.state.b} onChange={this.onChange.bind(this, "b")}></input>
                    <input key="opacity" name="opacity" value={this.state.a} onChange={this.onChange.bind(this, "a")}></input>
                </div>
                <div style={{ display: "flex" }}>
                    <div className="txt" key="R">R</div>
                    <div className="txt" key="G">G</div>
                    <div className="txt" key="B">B</div>
                    <div className="txt" key="A">A</div>
                </div>
            </div>
        </div>
    }
};

function Used({ onClick }) {
    let ccolors = window.localStorage.getItem("wasabi-colors") || colors;
    return <div className="wasabi-color-used">
        <div style={{ fontSize: 16 }}>最近使用</div>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
            {ccolors && ccolors.map((color, index) => {
                return <div key={index} className="wasabi-color-used-dot" onClick={onClick && onClick.bind(this, color)}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(" + [color.r, color.g, color.b, color.a].join(",") + ")"
                    }}></div>
                </div>
            })}
        </div>
    </div>
}
class Color extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: { r: 239, g: 28, b: 37, a: 1 }
        }
    }
    onChange(color) {
        this.setState({
            color: { ...this.state.color, ...color }
        })
    }
    render() {
        return <div className="wasabi-color">
            <ColorPickerPanel color={this.state.color} onChange={this.onChange.bind(this)}></ColorPickerPanel>
            <ColorNumberPanel color={this.state.color} onChange={this.onChange.bind(this)}></ColorNumberPanel>
            <Used></Used>
            <div style={{ position: "absolute", bottom: "0px", textAlign: "center", width: "100%", height: 50, lineHeight: "50px", boxShadow: "var(--box-shadow)" }}><Button size="small" theme="primary">确定</Button></div>
        </div>
    }
}

export default Color;