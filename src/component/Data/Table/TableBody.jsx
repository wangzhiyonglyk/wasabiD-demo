import React from "react";
import PropTypes from 'prop-types';

class TableBody extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
     return   <tbody className={this.props.className} style={this.props.style} >{
            this.props.children
        }</tbody>
    }
}
TableBody.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    onMouseDown:PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
}


export default TableBody;