import React,{Fragment} from "react"; //导入React 的核心库
import {connect} from 'react-redux';
import * as ActionCreator from '../actionCreator';


function Count ({title,doIncrementEvt,doDecrementEvt,value}){

        return(
            <div className="countZone">
                <span className="subtitle">{title}值：</span>
                <input
                    type="button"
                    className="decre Btn"
                    value="-" 
                    onClick={doDecrementEvt}
                />
                <span className="value">{value}</span>
                <input
                    type="button"
                    className="incre Btn"
                    value="+" 
                    onClick={doIncrementEvt}
                />
            </div>
        )
}
function mapStateToProps(state,ownProps){
    return{
        value:state[ownProps.title]
    }
}
function mapDispatchToProps(dispatch,ownProps){
    return{
    doIncrementEvt:()=>{
        const action=ActionCreator.doIncrementAction(ownProps.title); 
        dispatch(action);//派发action
    },
    doDecrementEvt:()=>{
        const action=ActionCreator.doDecrementAction(ownProps.title); 
        dispatch(action);
    }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Count);