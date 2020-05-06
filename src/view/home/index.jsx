import React from 'react';
import ReactDOM from 'react-dom';
import Panel from '../../component/Layout/Panel';
import DataGrid from '../../component/Data/DataGrid';
import Box from '../../component/Layout/Box';
import Message from '@/component/Unit/Message';
import api from "@/libs/api.js"
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userheaders: [
        {
          name: 'nickname',
          label: '昵称',
          width: 80,
          content: (rowData, rowIndex) => {
            return (
              <div
                title={rowData.nickname}
                style={{
                  cursor: 'point',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {' '}
                {rowData.nickname}
              </div>
            );
          }
        },
        {
          name: 'mobile',
          label: '手机号',
          width: 120,
          content: (rowData, rowIndex) => {
            return (
              <div
                title={rowData.mobile}
                style={{
                  cursor: 'point',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {' '}
                {rowData.mobile}
              </div>
            );
          }
        }
      ],
      orderheaders: [
        {
          name: 'nickname',
          label: '昵称',
          width: 80,
          content: (rowData, rowIndex) => {
            return (
              <div
                title={rowData.nickname}
                style={{
                  cursor: 'point',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {' '}
                {rowData.nickname}
              </div>
            );
          }
        },
        {
          name: 'mobile',
          label: '手机号',
          width: 120,
          content: (rowData, rowIndex) => {
            return (
              <div
                title={rowData.mobile}
                style={{
                  cursor: 'point',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {' '}
                {rowData.mobile}
              </div>
            );
          }
        },
        {
          name: 'cardType',
          label: '卡类型',
          width: 100,
          content: (rowData, rowIndex) => {
            return (
              <div
                title={rowData.cardType}
                style={{
                  cursor: 'point',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {' '}
                {rowData.cardType}
              </div>
            );
          }
        }
      ],
      data: [
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' },
        { nickname: '王志勇', mobile: '13888888888', cardType: '信用卡' }
      ]
    };
  }
  componentDidMount() {
    api.ajax({
      url: 'http://localhost:7007/Customer/List',
      type: 'post',
      data: { openid: 'dfdf', appid: 'fdfsfds', idcard: 'fdfd' },
      dataType: 'json',
      success: res => {
        if (res.statusCode == 200) {
          Message.success('启用成功');
          this.refs.grid.reload();
        } else {
          Message.error(res.message);
        }
      },
      error: (message) => {
        Message.error(message);
      }
    });
  }

  render() {
    return null;
    //
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Box
          key='1'
          title='新增会员'
          dateTitle='日'
          content='399'
          theme='info'
        ></Box>
        <Box
          key='2'
          title='新增会员'
          dateTitle='月'
          content='26,200'
          theme='success'
        ></Box>
        <Box
          key='3'
          title='新增订单'
          dateTitle='日'
          content='399'
          theme='primary'
        ></Box>
        <Box
          key='4'
          title='新增订单'
          dateTitle='月'
          content='386,200'
          theme='danger'
        ></Box>

        <Panel title='今日会员' theme='success' style={{ width: '49%' }}>
          <DataGrid
            ref='grid'
            sortName='id'
            sortOrder='desc'
            pagination={false}
            headers={this.state.userheaders}
            total={666}
            data={this.state.data}
          ></DataGrid>
        </Panel>
        <Panel
          title='今日订单'
          theme='primary'
          style={{ width: '49%', float: 'right' }}
        >
          {' '}
          <DataGrid
            ref='grid1'
            sortName='id'
            sortOrder='desc'
            pagination={false}
            data={this.state.data}
            headers={this.state.orderheaders}
            total={666}
          ></DataGrid>
        </Panel>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
