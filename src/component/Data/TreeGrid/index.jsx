/**
 * create by wangzhiyong
 * date:2021-03-30
 * desc 树型表格
 */

/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表
 * desc
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import func from "../../libs/func";
import diff from "../../libs/diff";
import DataGrid from "../DataGrid";
import propsTran from "../../libs/propsTran";
import Tree from "../Tree";
import FetchModel from "../../Model/FetchModel";
import("./index.css")
class TreeGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.value,
            headers:this.props.headers,
            url: this.props.url,
            params:null,
            rawData: [],
            rowsTreeData: [],
            realGridData: [],
            loadData:false,
        }
        this.loadData=this.loadData.bind(this);
        this.loadSuccess=this.loadSuccess.bind(this);
        this.loadError=this.loadError.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        let newState = {};
      
        if (props.url && props.params &&
            diff(props.params, state.params)) {//如果有url
            newState = {
                reloadData: true,
                url: props.url,
                params: props.params,
            }
        }
        if (props.data && props.data instanceof Array && diff(props.data, state.rawData)) {
            //如果传了死数据
            newState.rawData = props.data;
            //拿到text
            let result = propsTran.setComboxValueAndText("tree", props.value, props.data, props.idField, props.textField);
            newState.text = result.text;//根据value值拿到text
            if (props.simpleData) {
                //生成树结构
                newState.realTreeData = func.toTreeData(result.data, props.idField, props.parentField, props.textField)

            }
            else {
                newState.realTreeData = func.clone(props.data);
            }

            /**
             *为了保存顺序，要根据树的数据，生成表格的数据 
             */
            let gridpush = (data) => {
                let result = [];
                if (data && data instanceof Array) {
                    for (let i = 0; i < data.length; i++) {
                        result.push(data[i]);
                        if (data[i].children && data[i].children.length > 0) {
                            result = result.concat(gridpush(data[i].children));
                        }
                    }
                }
                return result;
            }
            if (newState.realTreeData) {
                newState.realGridData = gridpush(newState.realTreeData);
            }
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
                reloadData: false
            },()=>{
                this.loadData(this.state.url, this.state.params);
            })
        
        }
    }
    componentDidMount() {
        this.loadData(this.state.url, this.state.params);
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
            console.log("treegrid-fetch", fetchmodel);
        }

    }
    loadSuccess(data) {//数据加载成功
        let  realData = data;
        let realTreeData=[];
        let realGridData=[];
        if (this.props.dataSource == null) {
        }
        else {
            realData = func.getSource(data, this.props.dataSource);
        }
        //根据value值拿到text
        let result = propsTran.setComboxValueAndText("tree", this.state.value,realData,this. props.idField, this.props.textField);
       
        if (this.props.simpleData) {
            //生成树结构
            realTreeData = func.toTreeData(result.data, this. props.idField, this. props.parentField, this. props.textField)

        }

         /**
             *为了保存顺序，要根据树的数据，生成表格的数据 
             */
             let gridpush = (data) => {
                let result = [];
                if (data && data instanceof Array) {
                    for (let i = 0; i < data.length; i++) {
                        result.push(data[i]);
                        if (data[i].children && data[i].children.length > 0) {
                            result = result.concat(gridpush(data[i].children));
                        }
                    }
                }
                return result;
            }
            if (realTreeData) {
              realGridData = gridpush(realTreeData);
            }  
        this.setState({
            realTreeData: realTreeData,
            realGridData:realGridData,
            text:result.text,
        })
    }

    loadError(message) {//查询失败
        console.log("treepicker-error", message);
        Msg.error(message);
    }


    /**
     * 表格的单击事件
     * @param {*} rowData 
     * @param {*} rowIndex 
     */
    dataGridClick(rowData, rowIndex) {
       
        this.refs.tree._setClickNode(rowData[this.props.idField || "id"]);

        this.props.onClick && this.props.onClick(rowData);

    }
    /**
     * 树的单击事件
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     * @param {*} nodeData 
     */
    treeClick(id, text, children, nodeData) {
        this.refs.grid.setClick(id);
        this.props.onClick && this.props.onClick(nodeData);
    }
    /**
     * 树的勾选事件
     * @param {*} checked 
     * @param {*} id 
     * @param {*} text 
     * @param {*} children 
     * @param {*} row 
     */
    onChecked(checked, id, text, children, row) {
        this.props.onChecked && this.props.onChecked(checked, row);
    }

   
    /**
     * 树展开与折叠事件
     * @param {*} open 是否展开
     * @param {*} id id,
     * @param {*} text 文本
     * @param {*} children  子节点
     * @param {*} row 当前行节点
     */
     expandHandler(open,id,text,children,row){
       
      let realGridData=propsTran.gridShowOrHideData(this.state.realGridData,open,children);
     
       this.setState({
           realGridData:realGridData
       })
    }
    /**
     * 获取勾选的数据
     * @returns 
     */
    getChecked(){
        return this.refs.tree.getChecked();
    }
    /**
     * 强制刷新
     */
    reload(){
        this.loadData(this.state.url,this.state.params);
    }
    render() {
  
        let treeTop = 0;
        if (this.state.headers instanceof Array && this.state.headers.length > 0) {
            if (this.state.headers[0] instanceof Array) {
                treeTop = this.state.headers.length * 41;
            }
            else {
                treeTop = 41;
            }
        }

        return <div className="wasabi-treegrid">
            <div className="wasabi-treegrid-left">
                <div className="wasabi-treegrid-configuration" style={{ height: treeTop }}>
                  
                </div>
                <div className="wasabi-treegrid-rowsData" >
                    <Tree  checkAble={this.props.checkAble} checkStyle={this.props.checkStyle} ref="tree"  onClick={this.treeClick.bind(this)} data={this.state.realTreeData} simpleData={true}
                        onChecked={this.onChecked.bind(this)} isPivot={true} expandHandler={this.expandHandler.bind(this)}
                    ></Tree>
                </div>
            </div>
            <div className="wasabi-treegrid-right">
                <DataGrid ref="grid" pagination={false} rowNumber={false}
                    headers={this.state.headers} data={this.state.realGridData}
                    isPivot={true}
                    onClick={this.dataGridClick.bind(this)}></DataGrid>
            </div>
        </div>
    }
}

TreeGrid.propTypes = {
    /**
     * 基本属性
     */
    style: PropTypes.object,
    className: PropTypes.string,
    idField: PropTypes.string,//数据字段值名称
    parentField: PropTypes.string,//数据字段父节点名称
    textField: PropTypes.string,//数据字段文本名称
    simpleData: PropTypes.bool,//是否使用简单的数据格式
    checkAble: PropTypes.bool,//是否允许勾选
    checkStyle: PropTypes.oneOf(["checkbox", "radio"]),//单选还是多选
    checkType: PropTypes.object,//勾选对于父子节点的关联关系
    radioType: PropTypes.oneOf(["level", "all"]),//单选时影响的层级
    /**
     * ajax请求参数
     */
    url: PropTypes.string, //ajax地址
    httpType: PropTypes.string,//请求类型
    contentType: PropTypes.string,//请求的参数传递类型
    httpHeaders: PropTypes.object,//请求的头部
    params: PropTypes.object, //查询条件
    /**
 * 数据源
 */
    dataSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为数据源
    footerSource: PropTypes.string, //页脚数据源,
    totalSource: PropTypes.string, //ajax的返回的数据源中哪个属性作为总记录数源

    /**
 * 事件
 */
    onClick: PropTypes.func, //单击事件
    onDoubleClick: PropTypes.func, //双击事件
    onChecked: PropTypes.func, //监听表格中某一行被选中/取消
}
TreeGrid.defaultProps = {
    /**
    * 基本属性
    */
    style: {},
    className: "",
    id: null,
    idField: "id",
    parentField: "pId",
    textField: "text",
    simpleData: true,//默认为真
    checkAble: true,
    checkStyle: "radio",
    checkType: { "y": "ps", "n": "ps" },//默认勾选/取消勾选都影响父子节点，todo 暂时还没完成
    radioType: "all",//todo 

    /**
   * ajax请求参数
   */
    url: null, //
    updateUrl: null,
    httpType: "POST",
    contentType: "application/x-www-form-urlencoded",
    httpHeaders: {},//http请求的头部字段
    params: null,

    /**
     * 数据源
     */
    dataSource: 'data', //
    footerSource: 'footer', //页脚数据源
    totalSource: 'total', //

    /**
     * 事件
     */
    onClick: null,
    onDoubleClick: null,
    onChecked: null,
}

export default TreeGrid;