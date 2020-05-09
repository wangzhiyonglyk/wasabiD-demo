import React, {Component} from "react";
import ReactDOM from "react-dom";
import SingleDice from "./dice"
import DiceBox from "./box";
import DiceItem from "./item";
import "./dice.css";

class Dice extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className = "container">
                <div className = "rowDice">
                    <SingleDice>
                        <DiceBox>
                            <div className = "firstRow">
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "secondRow">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "thirdRow">
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                </div>
                <div className = "rowDice">
                    <SingleDice>
                        {/* // 一颗骰子 */}
                        <DiceBox>
                            <div className = "centerDiv">
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 两颗骰子 */}
                        <DiceBox>
                            <div className = "centerDiv"> 
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "centerDiv">
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 三颗骰子 */}
                        <DiceBox>
                            <div className = "leftDiv">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "centerDiv">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "rightDiv">
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 四颗骰子 */}
                        <DiceBox>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 五颗骰子 */}
                        <DiceBox>
                            <div className = "firstRow">
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "secondRow">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "thirdRow">
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 六颗骰子 */}
                        <DiceBox>
                        <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                </div>
                <div className = "clunmDice">
                    <SingleDice>
                        {/* // 一颗骰子 */}
                        <DiceBox>
                            <div className = "centerDiv">
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 两颗骰子 */}
                        <DiceBox>
                            <div>  <DiceItem></DiceItem></div>
                        
                            <div>  <DiceItem></DiceItem></div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 三颗骰子 */}
                        <DiceBox>
                            <div className = "leftDiv">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "centerDiv">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "rightDiv">
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 四颗骰子 */}
                        <DiceBox>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 五颗骰子 */}
                        <DiceBox>
                            <div className = "firstRow">
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "secondRow">
                                <DiceItem></DiceItem>
                            </div>
                            <div className = "thirdRow">
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                    <SingleDice>
                        {/* // 六颗骰子 */}
                        <DiceBox>
                        <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                            <div>
                                <DiceItem></DiceItem>
                                <DiceItem></DiceItem>
                            </div>
                        </DiceBox>
                    </SingleDice>
                </div>
            </div>
        );
    }

}

ReactDOM.render(<Dice/>, document.getElementById("root"));