/*
 create by wangzy
 date:2020-11-11 create
 desc:标记组件

 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import('./css/badge.css');
class Badge extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return <div className="wasabi-badge">
            {this.props.children}
            <sup className="wasabi-badge__content is-fixed">{this.props.tag}</sup></div>
    }
}

export default Badge;