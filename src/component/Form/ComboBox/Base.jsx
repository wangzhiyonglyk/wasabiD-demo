/**
 * 下拉组件的基类
 */
import React, { Component } from "react";
import propsTran from "../../libs/propsTran";
import dom from "../../libs/dom";
import func from "../../libs/func/index.js";
import { setDropcontainterPosition } from "../propsConfig/public.js";
class ComboBox extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
           pickerid: func.uuid(),
            rawData: [], //原数据
            data: [], //数据
            show: false, //是否显示下拉框
            value: "",//值
            text: "",// 文本值
             inputText: "",//输入框中的值
            oldPropsValue: null, //保存初始化的值
        };

        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onClear = this.onClear.bind(this);
        this.focus=this.focus.bind(this)
        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);

    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (
            props.data &&
            props.data instanceof Array &&
            func.diff(props.data, state.rawData)
        ) {
            /**
             * 因为此组件有追加数据的功能，所以要判断数据变化
             *data就成为了状态值
             */
            newState.rawData = props.data;
            newState.data = func.clone(props.data); //复制一份
        }
        if (props.value !== state.oldPropsValue) {
            //父组件强行更新了
            let text = propsTran.processText(
                props.value,
                newState.data || state.data
            );
            text = text.join(",") || props.value// 如果找不到则以value为值
            newState = {
                value: props.value || "",
                oldPropsValue: props.value,
                text: text,
            };
        }
        return newState;
    }
  componentDidUpdate() {
    //
    dom.scrollVisible(document.getElementById(this.state.pickerid)); //上在滚动条的情况下自动上浮
  }
    /**
    * 获取值
    * @returns
    */
    getValue() {
        return this.state.value;
    }

    /**
     * 设置值
     * @param {*} value
     */
    setValue(value) {
        let text = propsTran.processText(value, this.state.data);
        this.setState({
            value: value,
            text: text.join(","),
             inputText: text.join(","),
        });
        this.props.validate && this.props.validate(value);
    }

    /***
    * 输入框的单击事件
    */
    onClick(event) {
        this.showPicker();
        this.props.onClick && this.props.onClick(event);
    }
    /**
     * 双击事件
     * @param {*} event
     */

    onDoubleClick(event) {
        this.props.onDoubleClick && this.props.onDoubleClick(event);
    }
    /**
   * 键盘事件
   * @param {*} event
   */
    onKeyUp(event) {
        // 
        if (this.props && this.props.attachAble && event.keyCode == 13) {
            // 专门用于select组件
            this.addHandler(event);
        }
        this.props.onKeyUp && this.props.onKeyUp(event);
    }
    /**
    * onchage 事件
    * @param {*} event
    */
    onChange(event) {
        
    this.props.validate && this.props.validate(value);
         this.props.onChange &&
            this.props.onChange(
                event.target.value.trim(),
                this.props.name,
                event
            );
    }
    /**
     * 失去焦点
     */
    onBlur(event) {

        this.props.validate && this.props.validate(this.state.value); //验证
        //在此处处理失去焦点事件
        this.props.onBlur &&
            this.props.onBlur(
                this.state.value,
                this.state.text,
                this.props.name,
                event
            );
    }
    /**
     * 全部清除
     */
    onClear(event) {
        event.stopPropagation(); //防止冒泡
        this.setState({
            inputText: "",// 专用于select
            value: "",
            text: "",
            show: false,
        });
        this.props.validate && this.props.validate(""); //验证
        this.props.onSelect && this.props.onSelect("", "", this.props.name, null);
    }
    /**
     * 获得焦点
     * @returns 
     */
    focus() {
        try {
            this.input.current.focus();
        } catch (e) {
            console.log("error", e);
        }
    }
    /**
     * 显示下拉框,可以用于隐藏
     * @returns
     */
    showPicker(show = true) {
        try {
            //显示下拉选项
            if (this.props.readOnly) {
                return;
            }

            this.setState({
                show: show,
            });

            document.addEventListener("click", this.hidePicker);
            // 日期组件多一层
            setDropcontainterPosition(this.input.current?.input?this.input.current.input.current:this.input.current);
        } catch (e) { }
    }
    /**
     * 隐藏下拉框，这个用于点击外部隐藏
     * @param {*} event
     */
    hidePicker(event) {
        if (
            event.target &&
            !dom.isDescendant(
                document.getElementById(this.props.containerid),
                event.target
            )
        ) {
            this.setState({
                show: false,
            });
            try {
                document.removeEventListener("click", this.hidePicker);
            } catch (e) { }
        }
    }

}

export default ComboBox;