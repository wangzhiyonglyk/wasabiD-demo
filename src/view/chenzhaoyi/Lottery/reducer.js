import{CLEAR_BALL,CHANGE_ON_BOX,AUTO_SELECT,CLICK_BALL,
        AUTO_DISPLAY,SELECT_DISPLAY,EMPTY_DISPLAY,DELETE_LINE} from './actionTypes';
import Message from "component/Unit/Message";

//reducer 可以接受state，但绝不能改变state
//reducer是纯函数，给定固定输入，一定有固定输出。且不会有任何副作用
export default(state,action)=>{
    switch(action.type){
        case CLEAR_BALL:{//清除选中小球值
            const newState = JSON.parse(JSON.stringify(state));
            if(action.zoneType=="pro"){
                newState.proArr=[];
            }else{
                newState.postArr=[];
            }              
            // console.log(newState);
            return newState;
        }
        case CHANGE_ON_BOX:{//同步下拉框选中值
            const newState = JSON.parse(JSON.stringify(state));
            if(action.zoneType=="pro"){
                newState.proSelectValue = action.value;//同步前区下拉框选中值
                newState.proArr=generateOne(newState.proSelectValue,action.arr);
            }else{
                newState.postSelectValue = action.value;//同步后区下拉框选中值
                newState.postArr=generateOne(newState.postSelectValue,action.arr);
            }                  
            // console.log(newState);
            return newState;
        }
        case AUTO_SELECT:{//机选小球
            const newState = JSON.parse(JSON.stringify(state));
            if(action.zoneType=="pro"){
                newState.proArr=generateOne(newState.proSelectValue,action.arr);//前区机选小球
            }else{
                newState.postArr=generateOne(newState.postSelectValue,action.arr);//后区机选小球
            }                  
            // console.log(newState);
            return newState;
        }
        case CLICK_BALL:{//同步选中小球
                const newState = JSON.parse(JSON.stringify(state));
                if(action.zoneType=="pro" && newState.proArr.indexOf(action.value)==-1){//若为前区未选择状态，添加至前区选中数组
                    newState.proArr.push(action.value);
                }else if(action.zoneType=="post" && newState.postArr.indexOf(action.value)==-1){//若为后区未选择状态，添加至后区选中数组
                    newState.postArr.push(action.value);
                }else if(action.zoneType=="pro" && newState.proArr.indexOf(action.value)!=-1){//若为前区已选择状态，从前区选中数组中剔除
                    newState.proArr.map((item,index)=>{//遍历数组
                        if(item==action.value){
                            newState.proArr.splice(index,1);
                        }
                    })
                }else{//若为后区已选择状态，从后区选中数组中剔除
                    newState.postArr.map((item,index)=>{
                        if(item==action.value){
                            newState.postArr.splice(index,1);
                        }
                    })                  
                }
                // console.log(newState);
                return newState;
            }
        case AUTO_DISPLAY:{//同步展示机选组合
            const newState = JSON.parse(JSON.stringify(state));
            for(let i=0;i<action.times;i++){//选times次
                newState.displayArr.push(
                    {
                        pro:generateOne(action.numPro,action.rangePro),//机选组合前区
                        post:generateOne(action.numPost,action.rangePost)//机选组合后区
                    }
                ) ;
            }
            // console.log(newState);
            return newState;
        }
        case SELECT_DISPLAY:{//同步展示选中数组组合
            const newState = JSON.parse(JSON.stringify(state));  
            if((newState.proArr.length<action.numPro)||(newState.postArr.length<action.numPost)){
                Message.info("可选择范围长度小于选择数！");
                // console.log(newState);
                return newState;
            }
            let sortProArr = newState.proArr.sort(function(a, b){return a - b});  //排序
            let sortPostArr = newState.postArr.sort(function(a, b){return a - b});        
            let proResult=showAllComb(sortProArr,action.numPro);//显示前区选中数组所有组合数
            let postResult=showAllComb(sortPostArr,action.numPost);//显示后区选中数组所有组合数
            newState.displayArr=[];
            //两两搭配存入displayArr
            for(let i=0;i<proResult.length;i++){
                for(let j=0;j<postResult.length;j++){
                    if(newState.displayArr.length==100){//最多显示100项组合结果
                        Message.info("最多显示100项组合结果！");
                        // console.log(newState);
                        return newState;
                    }//最多输出百项
                    newState.displayArr.push(
                        {
                            pro:proResult[i],
                            post:postResult[j]
                        }
                    ) ;
                }
            }
            // console.log(newState);
            return newState;
        }
        case EMPTY_DISPLAY:{//清空组合展示
            const newState = JSON.parse(JSON.stringify(state));  
            newState.displayArr=[];
            return newState;
        }
        case DELETE_LINE:{//删除一条组合展示
            const newState = JSON.parse(JSON.stringify(state));  
            newState.displayArr.splice(action.index,1);//删除行
            return newState;
        }
    }
    return state;
}

/**
* @function 随机生成一注
* @description 从可选范围range中随机选取不重复的个数为num的一组号码数组
* @param num {number} 要选取的个数
* @param range {Array} 可选取的范围
* @returns {Array}
*/
function generateOne(num,range){
   if(num==range.length){//若正好相等，则直接按全选输出
       return range;
   }else if(num>range.length){
       console.log("可选择范围小于要选择数！");
       return null;
   }else{
       let arr=[];
       let range_random=JSON.parse( JSON.stringify(range));

       //打乱数组顺序 Fisher–Yates shuffle
       let i = range_random.length; 
       while (i) { 
           let j = Math.floor(Math.random() * i--); 
           [range_random[j], range_random[i]] = [range_random[i], range_random[j]]; 
       }
             
       for(let i=0;i<num;i++){//取前num个值
           arr[i]=range_random[i];
       }

       arr.sort(function(a, b){return a - b}); //排序
       return arr;
   }
}
/**
* @function 组合数
* @description 从可选范围range中选取不重复的个数为num一组号码的所有可能组合
* @param num {number} 要选取的个数
* @param range {Array} 可选取的范围
* @returns {Array}
*/
function showAllComb(range,num,currentIndex=0,choseArr=[],result=[]){
    if(range.length<currentIndex+num) {//可选择范围小于要选择数,递归终止
        return;
    }
    for(let i=currentIndex;i<range.length;i++){
        if(num==1){//choseArr差一项生成完整项
            result.push([...choseArr,range[i]]);//添加项
            i+1<range.length &&
            showAllComb(range,num,i+1,choseArr,result);
            break;
        }
        //往choseArr添加元素
        showAllComb(range,num-1,i+1,[...choseArr,range[i]],result);
    }
    return result;
}