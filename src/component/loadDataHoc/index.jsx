/**
 * Created by zhiyongwang on 2020-11-07
 * 所有下拉框的基类,专门处理数据
 * todo 
 * edit 2021-04-26
 */

import React from "react"
import func from "../libs/func";
import api from "wasabi-api";
import propsTran from "../libs/propsTran";
/**
 * 预处理各类数据
 * @param {*} ComboBoxWidget 组件
 * @param {*} type 类型
 */
function loadDataHoc(ComboBoxWidget, type = "select") {
    class loadDataHocCompnent extends React.Component {
        constructor(props) {
            super(props);
            this.input = React.createRef();
            this.state = {
                url: "",
                params: null,//参数  
                rawData: [],//原始数据,用于判断是否通过父组件强制更新数据源         
                data: [],//处理后的数据
                filterText: "",//筛选文本
                filterData: [],//筛选的数据
                loadDataStatus: null,//标记如何加载数据
                idField: this.props.idField,//for tree treepicker
                valueField: this.props.valueField,
                textField: this.props.textField,
            }
            this.handlerData = this.handlerData.bind(this);
            this.getValue = this.getValue.bind(this);
            this.setValue = this.setValue.bind(this);
            this.reload = this.reload.bind(this);
            this.loadData = this.loadData.bind(this);
            this.loadSuccess = this.loadSuccess.bind(this);
            this.loadError = this.loadError.bind(this);
        }
        static getDerivedStateFromProps(props, state) {
            let newState = {
                loadDataStatus: null,
            };
            if (props.url && func.diff(props.params, state.params)) {
                //传的请求参数发生改变
                newState = {
                    reloaloadDataStatusdData: "url",//通过url加载数据
                    url: props.url,
                    params: func.clone(props.params),
                }
            }
            if (props.data && props.data instanceof Array && func.diff(props.data, state.rawData)) {
                // //如果传了数据，并且发生改变
                newState = {
                    loadDataStatus: "data",//通过data加载数据
                }
                newState.rawData = props.data;//保留原始数据,用于后期对比              
            }
            return newState;
        }
        componentDidUpdate() {
            this.handlerData();
        }
        componentDidMount() {
            this.handlerData();
        }
        /**
         * 统一加工数据
         */
        handlerData() {
            if (this.state.loadDataStatus === "url") {
                this.loadData();
            }
            else if (this.state.loadDataStatus === "data") {
                let idOrValueField = (type == "tree" || type === "treegrid" || type === "treepicker") ? this.props.idField : this.props.valueField;
                let tempFormatData = propsTran.processData(type, this.getValue(), this.state.rawData, idOrValueField, this.props.textField);
                this.setState({
                    data: tempFormatData,
                    loadDataStatus: null,//处理完成
                })

            }
        }
        //以下四个方法方便给父组件，ref调用
        /**
         * 
         * @param {*} value 
         */
        setValue(value) {
            this.input.current.setValue && this.input.current.setValue(value);
        }
        /**
         * 获取值
         * @returns 
         */
        getValue() {
            return this.input.current.getValue && this.input.current.getValue();
        }
        /**
         * 刷新
         * @param {*} params 
        * @param {*} url 
         */
        reload(params, url) {
            url = url || this.props.url;
            params = params || this.state.params;
            this.setState({
                reloadData: "url",
                params: params
            })
        }

        /**
     * 加载数据
     * @param {*} url 
     * @param {*} params 
     */
        loadData() {
            if (this.state.url) {
                let fetchmodel = { type: this.props.httpType || "post", url: this.state.url, success: this.loadSuccess, data: this.state.params, error: this.loadError };
                fetchmodel.headers = this.props.httpHeaders;
                if (this.props.contentType) {
                    //如果传contentType值则采用传入的械
                    //否则默认
                    fetchmodel.contentType = this.props.contentType;
                    fetchmodel.data = fetchmodel.contentType == "application/json" ? fetchmodel.data ? JSON.stringify(fetchmodel.data) : "{}" : fetchmodel.data;
                }
                window.wasabi_api = window.wasabi_api || api;
                window.wasabi_api.ajax(fetchmodel);
                console.log("combobox-fetch", fetchmodel);
            }
        }
        /**
         * 
         * @param {*} message 
         */
        loadError(message) {//查询失败
            console.log("combobox-error", message);
            Msg.error(message);
        }
        /**
         * 数据加载成功
         * @param {*} data 
         */
        loadSuccess(res) {//数据加载成功
            let realData = func.getSource(res, this.props.dataSource || "data");
            let idOrValueField = (type == "tree" || type === "treegrid" || type === "treepicker") ? this.props.idField : this.props.valueField;
            tempFormatData = propsTran.processData(type, this.getValue(), realData, idOrValueField, this.props.textField);

            this.setState({
                reloadData: false,
                rawData: realData,//保存方便对比
                data: realData,
            })
        }
        /**
         * 数据筛选
         * @param {*} value 
         */
        filterHandler(value) {
            let filterData = propsTran.treeFilter(value, this.state.data);

            this.setState({
                filterText: value.trim(),
                filterData: filterData
            })
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (func.diffOrder(nextProps, this.props)) {
                return true;
            }
            if (func.diff(nextState, this.state)) {
                return true;
            }
            return false;
        }
        render() {
            return <ComboBoxWidget {...this.props}
                type={type}
                ref={this.input}
                filterHandler={this.filterHandler.bind(this)}
                data={this.state.filterText ? this.state.filterData : this.state.data}
            ></ComboBoxWidget>
        }
    }
    return loadDataHocCompnent;
}
export default loadDataHoc;
