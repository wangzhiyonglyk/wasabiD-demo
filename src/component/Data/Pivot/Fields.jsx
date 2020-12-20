/**
 * create by wangzhiyong
 * date:2020-12-21
 * desc 交叉表中行筛选条件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import func from "../../libs/func";
import diff from "../../libs/diff";
class Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldData: func.clone(this.props.data),
            data: func.clone(this.props.data),//数据
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (diff(nextProps.data, prevState.oldData)) {
            return {
                oldData: func.clone(nextProps.data),
                data: func.clone(nextProps.data),
            }
        }
        else {
            return null;
        }

    }
    render() {

    }
}


Fields.propTypes = {
    data: PropTypes.array,//数据,
}

Fields.defaultProps = {
    data: [],//数据,

}
