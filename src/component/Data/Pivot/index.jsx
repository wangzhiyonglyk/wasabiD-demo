/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import func from "../../libs/func";
import diff from "../../libs/diff";

import DataGrid from "../DataGrid"
import Tree from "../Tree";
import Configuration from "./Configuration";
import mixins from "../../Mixins/mixins"
import dataHandler from "./dataHandler"
import("./index.css")
class Pivot extends Component {
    constructor(props) {
        super(props);
        let p = {
            fields: func.clone(this.props.fields),//所有的字段
            rows: func.clone(this.props.rows),//行维度
            columns: func.clone(this.props.columns),//列维度
            values: func.clone(this.props.values),//统计参数
            filters: func.clone(this.props.filters),//筛选条件
            data: func.clone(this.props.data),//数据
            headers: [{ label: "省", name: "province" }, { label: "市", name: "city" }, { label: "年", name: "year" }, { label: "性别", name: "sex" }],
        }
        let s = {};
        for (let key in p) {
            s[key] = p[key];
            s["old" + key] = p[key];//保留一份方便更新
        }
        this.state = s;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};
        for (let key in nextProps) {
            if (prevState.hasOwnProperty(["old" + key]) && diff(prevState["old" + key], nextProps[key])) {
                //更新此字段
                newState["old" + key] = nextProps[key];
                newState[key] = nextProps[key];
            }
        }
        if (func.isEmptyObject(newState)) {
            return null;
        }
        else {
            return newState;
        }

    }
    componentDidMount() {
     
        setTimeout(() => {
            this.setState({
                rows: [
                    {
                        name: "province",
                        label: "省",
                    },
                    {
                        name: "city",
                        label: "市"
                    }
                ],
                columns: [
                    {
                        name: "year",
                        label: "年"
                    }, {
                        name: "sex",
                        label: "性别"
                    }
                ],
                values:[
                    {
                        name: "income",
                        label: "收入",
                        collectName:"平均值",
                        collectType:"avg"

                    }, {
                        name: "consume",
                        label: "消费",
                        collectName:"平均值",
                        collectType:"avg"

                    }
                ],
                data: [{
                    province: "湖南省",
                    city: "长沙市",
                    year: "2019",
                    sex: "男",
                    income: 10000,
                    consume: 8000
                },
                {
                    province: "湖南省",
                    city: "长沙市",
                    year: "2020",
                    sex: "男",
                    income: 11000,
                    consume: 10000
                },
                {
                    province: "湖南省",
                    city: "长沙市",
                    year: "2019",
                    sex: "女",
                    income: 11000,
                    consume: 8000
                },
                {
                    province: "湖南省",
                    city: "长沙市",
                    year: "2020",
                    sex: "女",
                    income: 12000,
                    consume: 12000
                },

                {
                    province: "湖南省",
                    city: "衡阳市",
                    year: "2019",
                    sex: "男",
                    income: 13000,
                    consume: 8500
                },
                {
                    province: "湖南省",
                    city: "衡阳市",
                    year: "2020",
                    sex: "男",
                    income: 12000,
                    consume: 11000
                },
                {
                    province: "湖南省",
                    city: "衡阳市",
                    year: "2019",
                    sex: "女",
                    income: 13000,
                    consume: 8300
                },
                {
                    province: "湖南省",
                    city: "衡阳市",
                    year: "2020",
                    sex: "女",
                    income: 14000,
                    consume: 14000
                },

                {
                    province: "广东省",
                    city: "广州市",
                    year: "2019",
                    sex: "男",
                    income: 11000,
                    consume: 8400
                },
                {
                    province: "广东省",
                    city: "广州市",
                    year: "2020",
                    sex: "男",
                    income: 14000,
                    consume: 12000
                },
                {
                    province: "广东省",
                    city: "广州市",
                    year: "2019",
                    sex: "女",
                    income: 15000,
                    consume: 12900
                },
                {
                    province: "广东省",
                    city: "广州市",
                    year: "2020",
                    sex: "女",
                    income: 13000,
                    consume: 12000
                },

                {
                    province: "广东省",
                    city: "深圳市",
                    year: "2019",
                    sex: "男",
                    income: 14000,
                    consume: 8800
                },
                {
                    province: "广东省",
                    city: "深圳市",
                    year: "2020",
                    sex: "男",
                    income: 15000,
                    consume: 11400
                },
                {
                    province: "广东省",
                    city: "深圳市",
                    year: "2019",
                    sex: "女",
                    income: 14000,
                    consume: 8600
                },
                {
                    province: "广东省",
                    city: "深圳市",
                    year: "2020",
                    sex: "女",
                    income: 15000,
                    consume: 14700
                },
                ]

            },()=>{this.initData()})
        }, 1500)


    }
    
    initData() {
        this.setData(this.state.columns, this.state.rows,this.state.values, this.state.data);
    }
    render() {
        console.log(this.state.data)
        let treeTop = 0;
        if (this.state.headers instanceof Array && this.state.headers.length > 0) {
            if (this.state.headers[0] instanceof Array) {
                treeTop = this.state.headers.length * 41;
            }
            else {
                treeTop = 41;
            }
        }
        return <div className="wasabi-pivot">
            <div className="wasabi-pivot-left">
                <Configuration height={treeTop}></Configuration>
                <div className="wasabi-pivot-rowsData" >
                    <Tree data={this.state.data} simpleData={true} idField="city" parentField="province" textField="city"></Tree>
                </div>
            </div>
            <div className="wasabi-pivot-right">
                <DataGrid pagination={this.props.pagination} rowNumber={false}
                    headers={this.state.headers} data={this.state.data}></DataGrid>
            </div>
        </div>
    }
}


Pivot.propTypes = {
    fields: PropTypes.array,//所有的字段
    rows: PropTypes.array,//行维度
    columns: PropTypes.array,//列维度
    values: PropTypes.array,//统计参数
    filters: PropTypes.array,//筛选条件
    data: PropTypes.array,//数据,
    applyHandler: PropTypes.func,//请求数据处理
}

Pivot.defaultProps = {
    fields: [],//所有的字段
    rows: [],//行维度
    columns: [],//列维度
    values: [],//统计参数
    filters: [],//筛选条件
    data: [],//数据,
    applyHandler: null,//请求数据处理
}
mixins(Pivot, [dataHandler])
export default Pivot;