/**
 * Created by zhiyongwang on 2020-11-07
 * 所有下拉框的基类
 */

import React, { Component } from "react";
import propsTran from "../../libs/propsTran"
import func from "../../libs/func.js";
import diff from "../../libs/diff.js";

import props from "../config/propType.js";
import defaultProps from "../config/defaultProps.js";
import validate from "../../Mixins/validate.js";
import mixins from '../../Mixins/mixins';
import _loadData from "./_loadData"
import("../../Sass/Form/Input.css");
import("../../Sass/Form/Check.css");
import("../../Sass/Form/ComboBox.css")
export default function (WrappedComponent) {
    class _ComboBox extends Component {
        constructor(props) {
            super(props);


            this.state = {
                type: this.props.type,
                url: this.props.url,//传来的url
                params: func.clone(this.props.params),//参数
                oldPropsValue: "",//保存用于判断是否通过父组件强制更新值
                rawData: [],//原始数据,用于判断是否通过父组件强制更新数据源
                data: [],
                filterData: null,//筛选后的数据，下拉框里面的除外
                value: "",
                text: "",
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
            });
            this.props.onSelect && this.props.onSelect('', '', this.props.name, null);
        }

        /**
         * 刷新
         * @param {*} params 
        * @param {*} url 
         */
        reload(params, url) {
            url = url || this.state.url;
            params = params || this.state.params;
            this.setState({
                url: url,
                params: params
            })
            this.loadData(url, params);
        }
        onSelect(value, text, name, row) {

            if (this.props.readOnly || this.props.disabled) {
                return;
            }
            //防止异步取值
            this.state.value = value;
            this.state.text = text;

            //更新
            this.setState({
                value: value,
                text: text,
            })
            this.validate(value);

            this.props.onSelect && this.props.onSelect(value, text, name, row);
        }
        /**
         * 验证
         */
        onBlur() {
            this.validate(this.state.value);//验证
        }
        /**
         * 筛选过滤
         * @param {*} text 
         */
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
                onBlur={this.onBlur}
                filterHandler={this.filterHandler}
            ></WrappedComponent>
        }
    }
    _ComboBox.propTypes = props;
    _ComboBox.defaultProps = Object.assign({}, defaultProps);
    mixins(_ComboBox, [_loadData, validate])
    return _ComboBox;
}


