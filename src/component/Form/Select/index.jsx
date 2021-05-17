/**
 * Created by zhiyongwang
 * date:2016-04-05后开始独立改造
 * edit 2021-03-11 修复bug
 * edit 2021-04-12 完善交互性
 * 下拉框
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
//libs
import func from "../../libs/func.js";
import propsTran from "../../libs/propsTran"
import dom from "../../libs/dom"
//hoc
import loadDataHoc from "../../loadDataHoc";
import validateHoc from "../validateHoc"

import ArrowInput from "./ArrowInput"
import ComboList from "./SelectbleList"
import("./select.css");
class Select extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            sortType: "",//排序方式
            rawData: [],//原数据
            data: [],//数据
            show: false,//是否显示下拉框
            value: "",
            text: "",
            //在可以自由添加的时候，清除输入，不会清除选择项
            inputText: "",//输入框的值默认传下来的文本值
            oldPropsValue: "",//保存初始化的值
        };
        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);
        this.filter = this.filter.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
        if (props.data && props.data instanceof Array && func.diff(props.data, state.rawData)) {
            /**
             * 因为此组件有追加数据的功能，所以要判断数据变化
             *data就成为了状态值
             */
            newState.rawData = (props.data);
            newState.data = func.clone(props.data)//复制一份
            newState.text = propsTran.processText(state.value, newState.data).join(",")||state.text;
            newState.inputText=newState.text||state.inputText;
        }
        if (props.value != state.oldPropsValue) {//父组件强行更新了
            let text = propsTran.processText(props.value, newState.data || state.data);
            newState = {
                value: props.value || "",
                oldPropsValue: props.value,
                text: text.join(","),
                inputText: text.join(",")
            }
        }
        return newState;
    }

    /**
     * 设置值
     * @param {*} value 
     */
    setValue(value) {
        let text = propsTran.processText(value, this.state.data);
        this.setState({
            value: value,
            text: text,
            inputText: text,
        })
        this.input.current.setValue(text);
    }
    /**
     * 获取值
     * @returns 
     */
    getValue() {
        return this.state.value;
    }
    /**
   * 显示下拉框
   * @returns 
   */
    showPicker(event) {
        try{
            event.stopPropagation();//防止冒泡
             //显示下拉选项
        if (this.props.readOnly) {
            return;
        }
        this.setState({
            show: true
        });
        document.addEventListener("click", this.hidePicker)
        }
        catch(e){

        }
      
       
    }
    /**
     * 隐藏下拉框
     * @param {*} event 
     */
    hidePicker(event) {
        if (event.target&&!dom.isDescendant(document.getElementById(this.props.containerid), event.target)) {
            this.setState({
                show: false
            });

            try {

                document.removeEventListener("click", this.hidePicker);
                this.props.validate(this.state.value);//验证
                //在此处处理失去焦点事件
                this.props.onBlur && this.props.onBlur(this.state.value, this.state.text, this.props.name);
            }
            catch (e) {

            }
        }
    }
    /**
     * 键盘事件
     * @param {*} event 
     */
    keyUpHandler(event) {
        if (this.props && (this.props.attachAble ) && event.keyCode == 13) {
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
        let newValue = this.state.value ? this.state.value.toString().split(",") : [];
        let newText = this.state.text ? this.state.text.toString().split(",") : [];
        ////如果允许添加，则把未匹配的，添加到数据源中
        if (this.props && (this.props.attachAble) && formatValue.length > 0) {
            //允许添加，并且输入有值
            let filterData = this.filter(event);//筛选数据
            /**
             * 注意了
             * 添加时不能把旧的选择删除了
             * 新增选择中的值与文本,
             */

            let addItems = [];//需要追加的数据项
            for (let i = 0; i < formatValue.length; i++) {
                //先从精确匹配的数据查找
                let findIndex = filterData.absFilter.findIndex(item => item.value == formatValue[i] || item.text == formatValue[i]);
                //精确匹配的肯定不是追加项
                if (findIndex > -1) {
                    //已经存在,不追加到数据中，但是要判断选中的值与文本是否都区别，防止用户输入的是值或者文本
                    if (newValue.findIndex(item => item == formatValue[i]) > -1) {//存在了

                    }
                    else if (newText.findIndex(item => item == formatValue[i]) > -1) {//存在了

                    }
                    else {
                        //不存在，添加
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
            let data = [].concat(addItems, filterData.absFilter, filterData.dimFilter, filterData.undimFilter);
            //单选的时候，则默认是添加的第一个，或者精确匹配的第一个
            newValue = this.props.multiple ? newValue.join(",") : data[0].value;
            newText = this.props.multiple ? newText.join(",") : data[0].text;
            this.setState({
                value: newValue,
                text: newText,
                data: data//先添加的荐放在最前面，模糊的次之，非模糊居后
            })

            this.props.onSelect && this.props.onSelect(newValue, newText,
                this.props.name, [{ text: newText, value: newValue }]);


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
    * 格式化输入
    */
    regValue(event) {
        let formatValue = event.target.value.replace(/[，|]/g, ",");//除去空格，替换汉字逗号，及用|作为分隔符，为英文逗号
        // todo 后期改用正则,再次除去每一个的两端空格，但是不除去文字内部空格
        formatValue = formatValue ? formatValue.split(",").map(item => {
            return item;//再次除去两端空格
        }) : [];
        formatValue = formatValue.filter(item => {
            return item != null && item != "";//除去空值的
        });
        return formatValue;
    }


    /***
     * 
     */
    onClick(event) {
        this.showPicker(event);
        this.props.onClick && this.props.onClick(event);
    }
    /**
     * 选择事件
     * @param {*} value 值
     * @param {*} text 文本
     * @param {*} row 此行数据
     */
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
                });   /**
                * 注意了，这里多了一个inputText值
                */  
  
                 this.input.current.setValue(inputText.join(","));
                this.props.onSelect && this.props.onSelect(newValue.join(","), newText.join(","), this.props.name, row);


            } else {
                newValue = value;
                newText = text;
                inputText=text;
                this.setState({
                    show: false,
                    value: newValue,
                    text: newText,
                    inputText: newText
                });
                /**
           * 注意了，这里多了一个inputText值
           */
 
                 this.input.current.setValue(inputText);
                this.props.onSelect && this.props.onSelect(newValue, newText, this.props.name, row);
            }


        }
        else {
            Msg.info("值是空值");
        }

    }
    /**
     * onchage 事件
     * @param {*} event 
     */
    onChange(event) {
        let filterData = this.filter(event);//筛选数据
        this.setState({
            show: true,
            inputText: event.target.value,
            data: [].concat(filterData.absFilter, filterData.dimFilter, filterData.undimFilter),
        })
        this.props.onChange && this.props.onChange(event.target.value, event.target.value, this.props.name, event);
    }
    /**
   * 全部清除
   */
    onClear(event) {
        event.stopPropagation();//防止冒泡
        /**
         * 此处因为要清除inputText，不可以直接调用父组件的
         */
        this.setState({
            inputText: "",
            value: "",
            text: "",
            show: true,
        })
        this.showPicker();
        this.input.current.setValue("");
        this.props.onSelect && this.props.onSelect("", "", this.props.name);

    }
    /**
     * 移除某个节点
     */
    onRemove(index) {
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({
            data: data
        })
    }
    /**
     * 排序
     */
    onSort() {
        let data = this.state.data;
        let sortType = this.state.sortType;
        if (data && data.length > 0) {
            data.sort((second, first) => {
                let secondProp = second[this.props.valueField] || second.value;
                let firstProp = first[this.props.valueField] || first.value;
                if (secondProp > firstProp) {
                    return sortType == "asc" ? 1 : -1;
                }
                else if (secondProp < firstProp) {
                    return sortType == "asc" ? -1 : 1;
                }
                else {
                    return 0;
                }
            })

            this.setState({
                show: true,
                data: data,
                sortType: sortType == "asc" ? "desc" : "asc"
            })
        }
    }
    render() {
        return (<div className={'combobox wasabi-select'}>
            <ArrowInput
                ref={this.input}
                show={this.state.show}
                value={this.state.inputText}
                attachAble={this.props.attachAble}
                name={this.props.name}
                title={this.props.title}
                placeholder={this.props.placeholder}
                sortType={this.state.sortType}
                readOnly={this.props.readOnly}
                required={this.props.required}
                onChange={this.onChange.bind(this)}
                onClear={this.onClear.bind(this)}
                onKeyUp={this.keyUpHandler.bind(this)}
                onClick={this.onClick.bind(this)}
                onSort={this.onSort.bind(this)}
            ></ArrowInput>
            <ComboList
                show={this.state.show}
                value={this.state.value}
                data={this.state.data}
                removeAble={this.props.removeAble}
                onSelect={this.onSelect.bind(this)}
                onRemove={this.onRemove.bind(this)}
            ></ComboList> </div>);

    }

}
Select.propTypes = {
    //公共属性
    type: PropTypes.string,//字段类型，
    name: PropTypes.string,//字段名
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element, PropTypes.node]),//字段文字说明属性
    title: PropTypes.string,//提示信息
    help: PropTypes.string,//帮助信息

    //基础属性
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),//默认值,
    text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//默认文本值
    placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),//输入框预留文字
    readOnly: PropTypes.bool,//是否只读
    required: PropTypes.bool,//是否必填
    hide: PropTypes.bool,//是否隐藏
    regexp: PropTypes.string,//正则表达式
    invalidTip: PropTypes.string,//无效时的提示字符
    style: PropTypes.object,//自定义style
    className: PropTypes.string,//自定义class

    //其他属性 text
    min: PropTypes.number,//最小值,最小长度,最少选项
    max: PropTypes.number,//最大值,最大长度,最多选项
    onClick: PropTypes.func,//单击事件
    onChange: PropTypes.func,//值改变事件

    //其他属性 combobox
    contentType: PropTypes.string,//http请求的request类型
    httpHeader: PropTypes.object,//http请求的头部
    multiple: PropTypes.bool,//是否允许多选
    valueField: PropTypes.string,//数据字段值名称
    textField: PropTypes.string,//数据字段文本名称
    url: PropTypes.string,//ajax的后台地址
    params: PropTypes.object,//查询参数
    dataSource: PropTypes.string,//ajax的返回的数据源中哪个属性作为数据源,为null时直接后台返回的数据作为数据源
    data: PropTypes.array,//自定义数据源
    sortAble: PropTypes.bool,//是否允许排序
    onSelect: PropTypes.func,//选中后的事件，回传，value,与text,data
    attachAble: PropTypes.bool,//select是否可以添加数据
    removeAble: PropTypes.bool,//select 是否可以删除

};
Select.defaultProps = {
    //公共属性
    type: "select",
    name: "",
    label: null,
    title: null,
    help: "",

    //基础属性
    value: "",
    text: "",
    placeholder: "",
    readOnly: false,
    required: false,
    hide: false,
    regexp: null,
    invalidTip: null,
    style: {},
    className: "",

    //其他属性 text
    min: null,
    max: null,
    onClick: null,
    onChange: null,


    //其他属性 combobox
    contentType: "",//http的request的数据类型
    httpHeader: null,
    multiple: false,
    valueField: "value",
    textField: "text",
    url: null,
    params: null,
    dataSource: "data",
    data: null,
    sortAble: true,
    onSelect: null,
    attachAble: false,

}
export default validateHoc(loadDataHoc(Select, "select"));


