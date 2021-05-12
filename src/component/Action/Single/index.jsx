/**
 * Created by wangzhiyong on 2016/10/30.
 * edit 2021-01-15
 * 创建单表应用组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../Form/SearchBar/index.jsx';
import Input from "../../Form/Input";
import Form from '../../Form/Form';
import Toolbar from '../../Buttons/Toolbar';
import DataGrid from '../../Data/DataGrid';
import SlidePanel from '../../Layout/SlidePanel.jsx';
import mixins from '../../Mixins/mixins';
import SingleModelMixins from './SingleModelMixins.jsx';
import SingleHandlerMixins from './SingleHandlerMixins.jsx';
import func from '../../libs/func.js';

import("./index.css")
class Single extends React.Component {
    y
    constructor(props) {
        super(props);
        this.searchbar=React.createRef();
        this.datagrid=React.createRef();
        this.form=React.createRef();
        this.slide=React.createRef();
        this.toolbar=React.createRef();
        let newState={};
        newState = this.initState(props);
        newState.model = func.clone(props.model);
        this.state = {
            opType: "",//操作类型
            rawModel: [],//原始数据
            model: [],
            buttons: this.props.buttons,
            submitButton: [
                {
                    name: "wasabi-save",
                    title: "提交",
                    size:"small",
                    iconCls: "icon-save"
                }
            ],
            filterModel: [],
            attachParams: this.props.attachParams,//列表初始化的筛选条件
            params: func.clone(this.props.attachParams), //列表初始化的筛选条件
            disabled: false,//表单是否只读
            ...newState
        }
        //绑定事件
        let baseCtors = [SingleModelMixins,SingleHandlerMixins];
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor).forEach(name => {
                if (typeof baseCtor[name] == 'function') {
                    this[name] = this[name].bind(this);
                }
            });
        });
     
    }
    static getDerivedStateFromProps(props, state) {
       return null;
    }
    componentDidMount() {
        let title = document.getElementsByTagName("title");
        if(title&&title.length>0&&this.props.title){
            title[0].innerHTML = this.props.title;
        }
       
    }
    render() {
        console.log("reander single")
        return (
            <div className="wasabi-single">
                <div
                    style={{
                        display:
                            this.state.filterModel == null ||
                                (this.state.filterModel instanceof Array &&
                                    this.state.filterModel.length == 0)
                                ? 'none'
                                : 'block'
                    }}
                >
                    <SearchBar
                        ref={this.searchbar}
                        model={this.state.filterModel}
                        onSubmit={this.filterHandler}
                        addAble={true}
                        onAdd={this.addOpen}
                        cols={4}
                    >
                        {
                            this.state.filterModel && this.state.filterModel instanceof Array && this.state.filterModel.map((item, index) => {
                                return <Input {...item} key={index}></Input>

                            })
                        }
                    </SearchBar>
                </div>

                <div
                    style={{
                        display:
                            this.state.buttons == null ||
                                (this.state.buttons instanceof Array &&
                                    this.state.buttons.length == 0)
                                ? 'none'
                                : 'block'
                    }}
                >
                    <Toolbar
                        ref={this.toolbar}
                        buttons={this.state.buttons}
                        buttonClick={this.btnHandler}
                    ></Toolbar>
                </div>
                <DataGrid
                    ref={this.datagrid}
                    contentType={this.props.contentType}
                    httpHeaders={this.props.httpHeaders}
                    url={this.props.pageUrl}
                    params={this.state.params}
                    headers={this.state.headers}
                    rowNumber={true}
                    selectAble={true}
                ></DataGrid>
                <SlidePanel
                    ref={this.slide}
                    buttons={this.state.submitButton}
                    buttonClick={this.panelSubmitHandler}
                >
                    <Form
                        ref={this.form}
                        submitHide={true}
                        disabled={this.state.disabled}
                        cols={4}
                    >
                        {
                            this.state.model && this.state.model instanceof Array && this.state.model.map((item, index) => {
                                return <Input {...item} key={index}></Input>

                            })
                        }
                    </Form>
                </SlidePanel>
            </div>
        );
    }
}
Single.propTypes = {
    key: PropTypes.string.isRequired, //主键名称
    title: PropTypes.string.isRequired, //页面的标题
    model: PropTypes.array.isRequired,//模型
    contentType: PropTypes.string,//请求的类型
    httpHeaders: PropTypes.object,//请求时多余的头部
    headers: PropTypes.array,//表头
    dataSource: PropTypes.string,//后台数据哪个字段是数据源
    totalSource: PropTypes.string,//后台数据哪个字段是总记录
    attachParams: PropTypes.object, //默认的筛选条件

    getUrl: PropTypes.string, //实例地址url
    addUrl: PropTypes.string, //新增地址url
    deleteUrl: PropTypes.string, //修改地址url
    updateUrl: PropTypes.string, //更新地址url
    pageUrl: PropTypes.string, //分页查询url

    buttons: PropTypes.array, //多余的按钮

}
Single.defaultProps = {
    key: "id",
    title: '',
    model: [],
    contentType: "application/x-www-form-urlencoded",//表单
    httpHeaders: {},
    headers: [],
    dataSource: "data",
    totalSource: "total",

    attachParams: null, //默认条件为空
    getUrl: null,
    addUrl: null,
    deleteUrl: null,
    updateUrl: null,
    pageUrl: null,

    buttons: [],//操作按钮
}
mixins(Single, [SingleModelMixins,SingleHandlerMixins]);
export default Single;
