
/*
create by wangzhiyong
date:2020-03-18
desc 富文本框
*/

import React from "react";
import PropTypes from 'prop-types';
import E from "wangeditor";
//引入富文本框

class Editor extends React.Component {
    constructor(props) {
        super(props);


        this.state = {

            content: this.props.content
        }

    }
    componentDidMount() {
        //创建富文本框
        const elem = this.refs.editorElem;
        this.editor = new E(elem);
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        this.editor.customConfig.onchange = html => {

            this.setState({
                content: html
            })
            if (this.props.onChange) {
                this.props.onChange(html);
            }
        }
        this.editor.create();//创建富文本框
        this.editor.txt.html(this.state.content);
    }

    getData() {
        return this.state.content;
    }
    setData(content) {
        this.editor.txt.html(content);
    }
    static defaultProps = {

        style: null,
        className: '',
        content: "",
    };

    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
    };

    render() {
        {/* 将生成编辑器 */ }

        return <div ref="editorElem"  className={this.props.className} style={this.props.style}>
        </div>


    }
}

export default Editor;
