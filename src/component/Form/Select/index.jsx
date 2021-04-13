/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * edit 2021-03-11 修复bug
 * edit 2021-04-12 完善交互性
 * 下拉框
 */
import React, { Component } from 'react';
import ClickAway from "../../libs/ClickAway.js";
import mixins from '../../Mixins/mixins';
import props from '../config/propType.js';
import func from "../../libs/func.js";
import defaultProps from "../config/defaultProps.js";
import diff from "../../libs/diff.js";
import _ComboBox from "../baseClass/_ComboBox.jsx";
import Msg from "../../Info/Msg";
import WrappedComponent from "./render"
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawData: [],//原数据
            data: [],//数据
            show: false,//是否显示下拉框
            value: this.props.value,
            text: this.props.text,
            //在可以自由添加的时候，清除输入，不会清除选择项
            inputText: this.props.inputText || this.props.text,//输入框的值默认传下来的文本值
            oldPropsValue: this.props.value,//保存初始化的值
        };
        this.regValue = this.regValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.filter = this.filter.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.value != state.oldPropsValue) {//父组件强行更新了
            newState = {
                value: props.value,
                text: props.text,
                inputText: props.inputText,
                oldPropsValue: props.value
            }
        }
        if (props.data && props.data instanceof Array && diff(props.data, state.rawData)) {
            newState.rawData = (props.data);
            newState.data = func.clone(props.data)//复制一份
        }
        return newState;
    }
    componentDidMount() {
        this.registerClickAway(this.hidePicker, this.refs.select);//注册全局单击事件
    }
    showPicker() {

        //显示下拉选项
        if (this.props.readOnly) {
            return;
        }
        this.setState({
            show: true
        });
        this.props.onClick && this.props.onClick();
        this.bindClickAway();//绑定全局单击事件
    }
    hidePicker(event) {
        this.setState({
            show: false
        });
        try {
            this.refs.label.hideHelp(); //隐藏帮助信息
        }
        catch (e) {

        }
        this.unbindClickAway();//卸载全局单击事件
    }
    onSelect(value, text, row) {
        if (value) {
            //选中事件
            let newValue = [], newText = [];
            let inputText = [];
            if (this.props.multiple) {//多选
                if (this.state.value) {
                    newValue = this.state.value ? this.state.value.toString().split(',') : [];
                    newText = this.state.text ? this.state.text.toString().split(',') : [];
                    inputText = this.state.inputText ? this.state.inputText.split(",") : [];
                }
                if (newValue.indexOf(value.toString()) > -1) {
                    //取消选中
                    newValue.splice(newValue.indexOf(value.toString()), 1);
                    newText.splice(newText.indexOf(text.toString()), 1);
                    let findIndex = inputText.findIndex(item => item == value || item == text);
                    if (findIndex > -1) {//输入框可能不含有
                        inputText.splice(findIndex, 1);
                    }

                }
                else {//选中
                    newValue.push(value);
                    newText.push(text);
                    inputText.push(text);
                }
                this.setState({
                    inputText: inputText.join(","),
                    value: newValue.join(","),
                    text: newText.join(",")
                });
                /**
        * 注意了，这里多了一个inputText值
        */
                this.props.onSelect && this.props.onSelect(newValue.join(","), newText.join(","), this.props.name, row, inputText.join(","));


            } else {
                newValue = value;
                newText = text;
                this.setState({
                    show: false,
                    value: newValue.join,
                    text: newText,
                    inputText: newText
                });
                /**
           * 注意了，这里多了一个inputText值
           */
                this.props.onSelect && this.props.onSelect(newValue, newText, this.props.name, row, inputText);
            }


        }
        else {
            Msg.info("值是空值");
        }

    }
    /**
     * 失去焦点
     * @param {*} event 
     */
    onBlur(event) {
        // this.addHandler(event);
        // this.props.onBlur && this.props.onBlur();

    }
    /**
     * 键盘事件
     * @param {*} event 
     */
    keyUpHandler(event) {
        if (this.props && (this.props.addAbled || this.props.addAble) && event.keyCode == 13) {
            ////为了兼容旧属性
            this.addHandler(event);

        }
    }
    /**
     * 手动输入添加
     * @param {*} event 事件
     * @param {*} isAdd 是否添加
     */
    addHandler(event) {
        let formatValue = this.regValue(event);
        ////如果允许添加，则把未匹配的，添加到数据源中
        if (this.props && (this.props.addAbled || this.props.addAble) && formatValue.length > 0) {
            let filterData = this.filter(event);//筛选数据
            /**
             * 注意了
             * 添加时不能把旧的选择删除了
             * 新选择中的值与文本,
             */
            let newValue = this.state.value ? this.state.value.split(",") : [];
            let newText = this.state.text ? this.state.text.split(",") : [];
            let addItems = [];//需要追加的数据项
            for (let i = 0; i < formatValue.length; i++) {
                let findIndex = filterData.absFilter.findIndex(item => item.value == formatValue[i] || item.text == formatValue[i]);
                if (findIndex > -1) {
                    //已经存在,不追加到数据中，但是要判断选中的值是否存在
                    if (newValue.findIndex(item => item == formatValue[i]) > -1) {//存在了

                    }
                    else if (newText.findIndex(item => item == formatValue[i]) > -1) {//存在了

                    }
                    else {
                        //

                        newValue.push(formatValue[i]);
                        newText.push(formatValue[i]);
                    }
                }
                else {

                    ////追加新的数据项
                    addItems.push({
                        value: formatValue[i],
                        text: formatValue[i]
                    })
                    ////追加新的数据项也要插选中的值内
                    newValue.push(formatValue[i]);
                    newText.push(formatValue[i]);

                }

            }
            this.setState({
                value: newValue.length > 0 ? newValue.join(",") : formatValue.join(","),
                text: newValue.length > 0 ? newText.join(",") : formatValue.join(","),
                data: [].concat(addItems, filterData.absFilter, filterData.dimFilter, filterData.undimFilter)//先添加的荐放在最前面，模糊的次之，非模糊居后
            })
            //todo 这里传row参数有问题，需要修改
            this.props.onSelect && this.props.onSelect(newValue.length > 0 ? newValue.join(",") : formatValue.join(","), newValue.length > 0 ? newText.join(",") : formatValue.join(","), this.props.name, [], this.state.inputText);


        }

    }
    /**
     * 筛选
     * @param {*} event 
     */
    filter(event) {
        let formatValue = this.regValue(event);
        if (formatValue && formatValue.length > 0) {
            let absFilter = [];//精确筛选
            let dimFilter = [];//模糊筛选
            let undimFilter = [];//没有模糊筛选成功的

            this.state.data && this.state.data.forEach((item, index) => {
                /**
                 * **************注意事项********************
                 * 前后加逗号匹配，防止数字匹配失效，
                 * 先匹配value值，匹配成功则不再匹配text，防止value与text中含有相似的而导致一个下拉选择匹配两次
                 */
                let findIndex = formatValue.findIndex(i => i == item.value || i == item.text);//精确
                let dimFind = false;//是否模糊匹配
                for (let i = 0; i < formatValue.length; i++) {
                    //注意了，是从数据集中去模糊匹配输入值
                    dimFind = item.value.toString().indexOf(formatValue[i]) > -1 || item.text.toString().indexOf(formatValue[i]) > -1
                }
                if (findIndex > -1) {
                    formatValue.splice(findIndex, 1);//移除匹配的
                    absFilter.push(item);
                }
                else if (dimFind) {
                    dimFilter.push(item);//模糊匹配
                }
                else {
                    undimFilter.push(item);//非模糊匹配项
                }
                return false;

            });
            return {
                absFilter: absFilter,
                dimFilter: dimFilter,
                undimFilter: undimFilter
            }
        }
        else {
            return {
                absFilter: [],
                dimFilter: [],
                undimFilter: this.state.data
            }
        }
    }
    /**
     * onchage
     * @param {*} event 
     */
    onChange(event) {
        let filterData = this.filter(event);//筛选
        this.setState({
            show: true,
            inputText: event.target.value,
            data: [].concat(filterData.absFilter, filterData.dimFilter, filterData.undimFilter),
        })
    }
    /**
     * 格式化输入
     */
    regValue(event) {
        let formatValue = event.target.value.trim().replace(/[，|]/g, ",");//除去空格，替换汉字逗号，及用|作为分隔符，为英文逗号
        // todo 后期改用正则,再次除去每一个的两端空格，但是不除去文字内部空格
        formatValue = formatValue ? formatValue.split(",").map(item => {
            return item.trim();//再次除去两端空格
        }) : [];
        formatValue = formatValue.filter(item => {
            return item != null && item != "";//除去空值的
        });
        return formatValue;
    }
    /**
     * 全部清除
     */
    clearHandler() {
        this.setState({
            inputText: "",
            value: "",
            text: ""
        })
        this.props.clearHandler && this.props.clearHandler();
    }
    render() {
        return <WrappedComponent {...this.props} {...this.state}
            showPicker={this.showPicker.bind(this)}
            hidePicker={this.hidePicker.bind(this)}
            onSelect={this.onSelect.bind(this)}
            onBlur={this.onBlur.bind(this)}
            keyUpHandler={this.keyUpHandler.bind(this)}
            addHandler={this.addHandler.bind(this)}
            filter={this.filter.bind(this)}
            onChange={this.onChange.bind(this)}
            regValue={this.regValue.bind(this)}
            clearHandler={this.clearHandler.bind(this)}
        ></WrappedComponent>
    }

}
Select.propTypes = props;
Select.defaultProps = Object.assign(defaultProps, { type: "select" });
mixins(Select, [ClickAway]);
export default _ComboBox(Select);


