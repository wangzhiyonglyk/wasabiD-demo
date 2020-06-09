import{CLEAR_BALL,CHANGE_ON_BOX,AUTO_SELECT,CLICK_BALL,
    AUTO_DISPLAY,SELECT_DISPLAY,EMPTY_DISPLAY,DELETE_LINE} from './actionTypes';

export const doClear = (zoneType) =>({
    type:CLEAR_BALL, //action类型
    zoneType    //区域类型
})
export const doChangeOnBox= (zoneType,value,arr) =>({
    type:CHANGE_ON_BOX,
    zoneType,   //区域类型
    value,  //下拉框选中值
    arr     //区内小球值数组
})
export const doAutoSelect= (zoneType,arr) =>({
    type:AUTO_SELECT,
    zoneType,   //区域类型
    arr    //区内小球值数组
})
export const doBallClick= (zoneType,value) =>({
    type:CLICK_BALL,
    zoneType,   //区域类型
    value   //小球值
})
export const doAutoDisplay= (rangePro,rangePost,numPro,numPost,times) =>({
    type:AUTO_DISPLAY,
    rangePro, //前区内小球值数组
    rangePost, //后区内小球值数组
    numPro, //前区至少选择球数
    numPost, //后区至少选择球数
    times //选择次数，即几注
})
export const doSelectDisplay = (numPro,numPost)=>({
    type:SELECT_DISPLAY,
    numPro, //前区至少选择球数
    numPost //后区至少选择球数
})
export const doEmptyDisplay = ()=>({
    type:EMPTY_DISPLAY,
})
export const doDeleteLine = (index)=>({
    type:DELETE_LINE,
    index //删除行索引
})