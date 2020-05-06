export const zhongyinRoutes = [
  {
    name: ' 客户管理',
    menu: [
      {
        name: '客户信息列表',
        src: '/customer.html'
      },
      {
        name: '邀请好友记录表',
        src: '/invite.html'
      },
    ]
  },
  {
    name: '业务管理',
    menu: [
      {
        name: '客户信息完善订单',
        src: '/customerOrder.html'
      },
      {
        name: '未完善订单',
        src: '/wwsOrder.html'
      },
      {
        name: '订单处理查询',
        src: '/orderQuery.html'
      }
    ]
  },
  // {
  //   name: '卡信息管理',
  //   menu: [
  //     {
  //       name: '卡信息列表',
  //       src: '/CardList.html'
  //     },
  //     {
  //       name: '卡信息推送',
  //       src: '/CardPush.html'
  //     }
  //   ]
  // },
  {
    name: '系统管理',
    menu: [
      {
        name: '协议维护设置',
        src: '/dealSetting.html'
      },
    ]
  }
];
