/**
 * create by wangzhiyong
 * 通过colgroup来处理列的宽度问题
 * date:2020-12-20
 */
import React from 'react';
 let ColGroup={
     renderSingleColGroup(colgroup){
        this.state.headers.map((header, headerColumnIndex) => {
            if (header.colSpan && header.colSpan > 1) {
                return;
            }
            else{
                let width=header.width?header.width:this.preColumnWidth||null;
                colgroup.push(<col  
                     key={headerColumnIndex}
                     name={header.label}//以label为准，是因为name可能没有设置
                     algin={header.algin||"center"}
                     width={width}></col>)
            }
        });
        return colgroup;
     },
     renderComplexColGroup(colgroup){
     
        this.state.headers.map((trheader, headerRowIndex) => {
            if (trheader instanceof Array) {
                trheader.map((header, headerColumnIndex) => {
                    if ((header.colSpan && header.colSpan > 1)) {
                        //跨几列的不用渲染
                        return;
                    }
                    else{
                        let width=header.width?header.width:this.preColumnWidth||null;
                        colgroup.push(<col 
                            key={headerRowIndex+"-"+headerColumnIndex}
                             name={header.label}//以label为准，是因为name可能没有设置
                             algin={header.algin||"center"}
                             width={width}></col>)
                    }
                });
            }
        });
        return colgroup;
     }
     
 }
 export default ColGroup;