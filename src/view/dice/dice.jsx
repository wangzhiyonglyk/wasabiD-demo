import React, {Component} from "react";
import "./dice.css"

class SingleDice extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <div className = "singleDice">
                {this.props.children}
            </div>
        );
    }
}

export default SingleDice;