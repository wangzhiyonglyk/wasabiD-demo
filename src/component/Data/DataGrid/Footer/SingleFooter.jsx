/**
 * create by wangzhiyong
 * date:2020-12-17
 * desc 将datagrid中的渲染继续拆分
 *  复杂，表头适应超过两行的表头导致表尾渲染的变化
 * 
 *
 */
import React, { Component } from 'react';

export default {
    getFooterData: function () {//获取得页脚的统计值
        return this.footerActualData;
    },

    sumHandler: function (footerModel) {//计算某一列的总和
      
        return null;
   
       },
       avgHandler: function (footerModel) {//计算某一列的平均值
         return null;
       },
}