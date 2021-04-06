import React from 'react';
import ReactDOM from 'react-dom';
import("./index.css")
import { Article, Avatar,Tag, RotateChart, Input, Modal, Drag, Drop, DataGrid, Tree, Right, Pivot, TabPanel, Tabs, Button, Layout, Left, Center } from "../../component"
import api from "../../libs/api"
class PivotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropData: [],
            data: [


            ],
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }


    }
    componentDidMount() {


        setTimeout(() => {
            this.setState({
                headers: [
                    {
                        name: "province",
                        label: "省",
                    },
                    {
                        name: "city",
                        label: "市"
                    },
                    {
                        name: "year",
                        label: "年"
                    }, {
                        name: "sex",
                        label: "性别"
                    },
                    {
                        name: "income",
                        label: "收入",
                        collectName: "平均值",
                        collectType: "avg"

                    }, {
                        name: "consume",
                        label: "消费",
                        collectName: "平均值",
                        collectType: "avg"

                    }
                ],
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
                values: [
                    {
                        name: "income",
                        label: "收入",
                        collectName: "平均值",
                        collectType: "avg"

                    }, {
                        name: "consume",
                        label: "消费",
                        collectName: "平均值",
                        collectType: "avg"

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
                    year: "2020",
                    sex: "男",
                    income: 15000,
                    consume: 11400
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
                    consume: 14700,
                    checkAble: false
                },
                ]

            })
        }, 0)


    }
    onClick() {
     
        this.refs.rotate.turnIndex(3);
    }
    onDrop(data) {
        let dropData = this.state.dropData;
        dropData.push(data);
        this.setState({
            dropData: dropData
        })
    }

    render() {
        return  <div>
            <div style={{textAlign:"center",padding:20}}><Input addAble={true} type="select" multiple={true} valueField="consume" textField="city" data={[
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
                    year: "2020",
                    sex: "男",
                    income: 15000,
                    consume: 11400
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
                    year: "2019",
                    sex: "女",
                    income: 14000,
                    consume: 8600
                },]}></Input></div>
            <Pivot rows={this.state.rows} checkAble={true} values={this.state.values} columns={this.state.columns} data={this.state.data} ></Pivot></div> 

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));
