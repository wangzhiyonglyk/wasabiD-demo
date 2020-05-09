import React, {Component} from "react";
import "./dice.css"

class DiceBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className = "diceBox">
                {this.props.children}
            </div>
        );
    }
}
export default DiceBox;