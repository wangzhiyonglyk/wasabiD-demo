import React, {Component} from "react"; //导入React 的核心库
import {connect} from 'react-redux';

function Sum ({value}){

    return(
        <div className="sumZone">
            ={value}
        </div>
    )

    
}
function mapStateToProps(state){
    let sum = 0;
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
        sum += state[key];
        }
    }
    return{
        value:sum,
    }
}
export default connect(mapStateToProps)(Sum);