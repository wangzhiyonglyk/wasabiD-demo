import React from 'react';
import ReactDOM from 'react-dom';
import ("./home.css")
import { Article, Avatar, Input, Modal, DataGrid, Tree, Right, Pivot,TabPanel,Tabs, Button ,Layout,Left,Center} from "../../component"
import api from "../../libs/api"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          headers:[
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
                collectName:"平均值",
                collectType:"avg"

            }, {
                name: "consume",
                label: "消费",
                collectName:"平均值",
                collectType:"avg"

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
              checkAble:false
          },
          ]

      })
  }, 0)


  }
  onClick(){
      this.refs.modal.open()
this.refs.grid.export(true,"test")
  }
  render() {
    return <Layout>
        <Left width={300} >

            <Tree checkAble={true} data={this.state.data} idField="consume" textField="province"></Tree>
        </Left>
        <Center>    <Button  onClick={this.onClick.bind(this)}>导出</Button>
        <Modal ref="modal"></Modal>
    <Pivot rows={this.state.rows} checkAble={true} values={this.state.values} columns={this.state.columns} data={this.state.data} ></Pivot>
<DataGrid ref="grid" data={this.state.data} headers={this.state.headers} selectAble={true}></DataGrid></Center>
<Right width={300} ></Right>
    </Layout>

  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
