import React from "react"; //导入React 的核心库
import PropTypes from "prop-types";
import * as Actions from './action';
import {connect} from 'react-redux';

/**
* @ClassName: ${DisplayZone}
* @Description: ${彩票展示区组件，用于展示当前选择下的组合及机选功能}}}
* ${<DisplayZone/>}
*/
function DisplayZone({displayArr,handleAutoDisplay,handleSelectDisplay,handleEmptyDisplay,handleDeleteLine}){
    return(
        <div className="displayZone">
            <div className="displayTable">
                <table>
                    <tbody>
                        {
                            //react绑定展示组合项
                            displayArr.map((item,index)=>{
                                return<tr key={item.pro+item.post}>
                                    <td>
                                        <input
                                            type='button'
                                            className='deleteBtn'
                                            value="&times;"
                                            onClick={handleDeleteLine.bind(this,index)}
                                        />
                                    </td>
                                    <td>
                                        <span className="proDisplay">{item.pro.toString()+"\t"}</span>
                                        <span className="postDisplay">{item.post.toString()}</span>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="btnZone">
                <input 
                    type="button" 
                    onClick={handleAutoDisplay.bind(this,1)} 
                    className={"dBtn "+"autoSelectOne"} 
                    value="机选1注"
                ></input>
                <input 
                    type="button" 
                    onClick={handleAutoDisplay.bind(this,5)} 
                    className={"dBtn "+"autoSelectFive"} 
                    value="机选5注"
                ></input>
                <input 
                    type="button" 
                    onClick={handleSelectDisplay} 
                    className={"dBtn "+"selectDisplay"} 
                    value="显示已选注（前100）"
                ></input>
                <input 
                    type="button" 
                    onClick={handleEmptyDisplay} 
                    className={"dBtn "+"emptyDisplay"} 
                    value="清空列表"
                ></input>
            </div>
        </div>
    );
}
DisplayZone.propTypes = {
    arrPro:PropTypes.array,//前区内小球值数组
    arrPost:PropTypes.array,//后区内小球值数组
    minPro:PropTypes.number,//前区至少选择球数
    minPost:PropTypes.number,//后区至少选择球数
}
DisplayZone.defaultProps = {
    arrPro:"",
    arrPost:"",
    minPro:0,
    minPost:0,
};
function mapStateToProps(state){
	return{
        displayArr:state.displayArr//展示组合数组
	}
}
function mapDispatchToProps(dispatch,ownProps){
	return{
		handleAutoDisplay:(times)=>{//机选按钮点击事件
			const action=Actions.doAutoDisplay(ownProps.arrPro,ownProps.arrPost,ownProps.minPro,ownProps.minPost,times); 
			dispatch(action);
        },
        handleSelectDisplay:()=>{//选中数组的组合展示按钮点击事件
			const action=Actions.doSelectDisplay(ownProps.minPro,ownProps.minPost); 
			dispatch(action);
        },
        handleEmptyDisplay:()=>{//清空按钮点击事件
			const action=Actions.doEmptyDisplay(); 
			dispatch(action);
        },
        handleDeleteLine:(index)=>{//行删除按钮点击事件
            const action=Actions.doDeleteLine(index); 
			dispatch(action);
        },
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayZone);