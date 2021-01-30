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
        return <Layout>
            <Left width={300} >

                <Tree checkAble={true} data={this.state.data} idField="consume" textField="province"></Tree>
            </Left>
            <Center>  
                <RotateChart ref="rotate" data={[1,2,3,4,5]}></RotateChart>
                <Input ref="input" type="select" data={this.state.data} valueField="consume" textField="province"></Input>
             <Tag key="1" removeAble={true}>标签一</Tag>    <Tag key="2" theme="success">标签二</Tag>  
                 <Drag data={{ title: "导出", onClick: ()=>{this.onClick()} }}><Button onClick={this.onClick.bind(this)}>导出</Button></Drag>
                <Drop style={{ width: 200, height: 50, border: "1px solid #dddddd" }} onDrop={this.onDrop.bind(this)}>
                    {
                        this.state.dropData.map((item,index) => {
                    
                            return <Button key={index+item.title} onClick={this.onClick.bind(this)}>{item.title}</Button>
                        })
                    }
                </Drop>
                <Modal ref="modal"></Modal>
                <Pivot rows={this.state.rows} checkAble={true} values={this.state.values} columns={this.state.columns} data={this.state.data} ></Pivot>
                <DataGrid ref="grid" data={this.state.data} headers={this.state.headers} selectAble={true}></DataGrid></Center>
            <Right width={300} ></Right>
        </Layout>

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));