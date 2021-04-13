/**
 * Created by zhiyongwang on 2020-11-07
 * 所有下拉框的基类
 */

import React, { Component } from "react";
import FetchModel from "../../Model/FetchModel.js";

import propsTran from "../../libs/propsTran"
import func from "../../libs/func.js";
import diff from "../../libs/diff.js";
import Msg from "../../Info/Msg.jsx";
import props from "../config/propType.js";
import defaultProps from "../config/defaultProps.js";
import validate from "../../Mixins/validate.js";
import mixins from '../../Mixins/mixins';
import("../../Sass/Form/Input.css");
import("../../Sass/Form/Check.css");

export default function (WrappedComponent) {
    class _ComboBox extends Component {
        constructor(props) {
            super(props);
            let idOrValueField = this.props.type == "treepicker" ? this.props.idField : this.props.valueField;//如果是下拉树，则取id
            //对传来的数据进行格式化
            let newData = propsTran.setComboxValueAndText(this.props.type, this.props.value, this.props.data, idOrValueField, this.props.textField);
            let realData;
            if (this.props.type == "picker" && this.props.simpleData) {//如果是简单数据类型
                realData = func.toTreeData(newData.data, this.props.valueField || this.props.idField || "id", this.props.parentField || "pId", this.props.textField)
            } else {
                //treepicker在tree组件处理了
                realData = newData.data;
            }
            this.state = {
                type:this.props.type,
                url: this.props.url,//传来的url
                params: func.clone(this.props.params),//参数
                oldPropsValue: this.props.value,//保存用于判断是否通过父组件强制更新值
                rawData: this.props.data,//原始数据,用于判断是否通过父组件强制更新数据源
                data: realData,
                filterData: null,//筛选后的数据
                value: this.props.value,
                text: newData && newData.text && newData.text.join(","),
                 inputText:newData && newData.text && newData.text.join(","),//专门用于下拉框可以手动输入的情况
                ulShow: false,//是否显示下拉选项
                reloadData: false,//是否更新,
                idField: this.props.idField,
                valueField: this.props.valueField,
                textField: this.props.textField,
                validateClass: "",
                inValidateShow: "none",
                inValidateText: "",
                simpleData: this.props.simpleData,//保存，方便对比
            }
            this.setValue = this.setValue.bind(this);
            this.getValue = this.getValue.bind(this);
            this.loadData = this.loadData.bind(this);
            this.loadError = this.loadError.bind(this);
            this.loadSuccess = this.loadSuccess.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.clearHandler = this.clearHandler.bind(this);
            this.addData = this.addData.bind(this);
            this.filterHandler = this.filterHandler.bind(this)
        }
        static getDerivedStateFromProps(props, state) {
            let newState = {};
            if (props.url && props.params &&
                diff(props.params, state.params)) {//如果有url
                newState = {
                    reloadData: true,//重新加载
                    url: props.url,
                    params: func.clone(props.params),
                }
            }
            if (props.value != state.oldPropsValue) {//说明父节点改变了传递的值

                newState.value = props.value;//强行改变组件选择的值，不管状态中的值是什么
                newState.oldPropsValue = props.value;//保留之前的值，用于下次对比
                let text = propsTran.setComboxText(newState.value, state.data);
                newState.text = text.join(",");
            }
            else {

            }
            if (props.data && props.data instanceof Array && diff(props.data, state.rawData)) {
                //如果传了数据，并且发生改变
                newState.rawData = props.data;//保留原始数据
                let newData = propsTran.setComboxValueAndText(props.type, newState.value || state.value, props.data, props.type == "treepicker" ? props.idField : props.valueField, state.textField);
                let realData;
                if (state.type == "picker" && state.simpleData) {//如果是简单数据类型
                    realData = func.toTreeData(newData.data, props.valueField || props.idField || "id", props.parentField || "pId", props.textField);
                } else {
                    //treepicker在tree组件处理了
                    realData = newData.data;
                }
                newState.data = realData;
                newState.text = newData.text.join(",");
            }

            if (func.isEmptyObject(newState)) {
                return null;
            }
            else {
                return newState;
            }
        }
        componentDidUpdate() {
            if (this.state.reloadData) {
                this.setState({
                    realData: false
                })
                this.loadData(this.state.url, this.state.params);
            }
        }
        componentDidMount() {//如果指定url,先查询数据再绑定

            this.loadData(this.state.url, this.state.params);//查询数据
        }
        setValue(value) {
            //设置文本值
            let text = propsTran.setComboxText(value, this.state.data);
            this.setState({
                value: value,
                text: text.join(",")
            })
        }
        getValue() {
            return this.state.value;

        }
        clearHandler() {
            //清除数据

            this.setState({
                value: '',
                text: '',
                inputText:""
            });
            this.props.onSelect && this.props.onSelect('', '', this.props.name, null);
        }
        loadData(url, params) {

            if (url) {
                let type = this.props.httpType ? this.props.httpType : "POST";
                type = type.toUpperCase();
                var fetchmodel = new FetchModel(url, this.loadSuccess, params, this.loadError);
                fetchmodel.headers = this.props.httpHeaders;
                if (this.props.contentType) {
                    //如果传contentType值则采用传入的械
                    //否则默认

                    fetchmodel.contentType = this.props.contentType;
                    fetchmodel.data = fetchmodel.contentType == "application/json" ? fetchmodel.data? JSON.stringify(fetchmodel.data) :"{}": fetchmodel.data;
                }
                type == "POST" ? func.fetch.post(fetchmodel) : func.fetch.get(fetchmodel);
                console.log("checkbox-fetch", fetchmodel);
            }
        }
        loadError(message) {//查询失败
            console.log("checkbox-error", message);
            Msg.error(message);
        }
        loadSuccess(data) {//数据加载成功
            let realData;
            if (this.props.dataSource == null) {
                realData = data;
            }
            else {
                realData = func.getSource(data, this.props.dataSource);
            }
            let valueField = this.props.type == "treepicker" ? this.props.idField : this.props.valueField
            //对数据进行格式化
            let newData = propsTran.setComboxValueAndText(this.props.type, this.props.value, realData, valueField, this.props.textField);
            this.setState({
                rawData: realData,//保存方便对比
                data: newData.data,
                text: newData.text.join(",")
            })
        }
        /**
         * 刷新
         * @param {*} params 
        * @param {*} url 
         */
        reload(params,url){
            url=url||this.state.url;
            params=params|| this.state.params;
            this.setState({
                url:url,
                params:params
            })
            this.loadData(url,params);
        }
        onSelect(value, text, name, row,inputText) {

            if (this.props.readOnly || this.props.disabled) {
                return;
            }
            //防止异步取值
            this.state.value=value;
            this.state.text=text;
            this.state.inputText=inputText;
            //更新
            this.setState({
                value: value,
                text: text,
                inputText:inputText
            })
            this.validate(value);
            //inputText不再向上传了
            this.props.onSelect && this.props.onSelect(value, text, name, row);
        }
        /**
         * 验证
         */
        onBlur() {
            this.validate(this.state.value);//验证
        }
        /**
         * 专门用于select
         * @param {*} value 
         * @param {*} text 
         */
        addData(value, text) {
            let data = this.state.data || [];
            data.unshift({ value: value, text: text });
            this.setState({
                data: data
            })
            this.onSelect(value, text, this.props.name);//添加一个相当于选中
            this.props.addHandler && this.props.addHandler(value, text, data, this.props.name);
        }
        filterHandler(text) {

            if (text) {
                this.setState({
                    filterData: propsTran.treeFilter(text, this.state.data)
                })
            }
            else {
                this.setState({
                    filterData: null
                })
            }

        }
        render() {
            let data = this.state.filterData ? this.state.filterData : this.state.data;
            return <WrappedComponent {...this.props} {...this.state} data={data}
                onSelect={this.onSelect} clearHandler={this.clearHandler}
                addData={this.addData} onBlur={this.onBlur}
                filterHandler={this.filterHandler}
            ></WrappedComponent>
        }
    }
    _ComboBox.propTypes = props;
    _ComboBox.defaultProps = Object.assign({}, defaultProps);
    mixins(_ComboBox, [validate])
    return _ComboBox;
}


