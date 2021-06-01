import React from "react";
import PropTypes from 'prop-types';

class TableRow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
       return <tr className={this.props.className} style={this.props.style}
        onMouseDown={this.props.onMouseDown}
        >{
            this.props.children
        }</tr>
    }
}
TableRow.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    onMouseDown:PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
}


export default TableRow;