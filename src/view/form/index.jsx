import React from 'react';
import ReactDOM from 'react-dom';
import {Form ,Text,Select,Input,Button } from "../../component"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         data:[{text:"选择1",value:1},{text:"选择2",value:2}]
        }
        this.onClick=this.onClick.bind(this)

    }
    componentDidMount() {
// this.refs.modal.open();
    }
    onClick() { 
        this.setState({
            data:this.state.data.concat([{text:"测试1",value:Math.random(1)}])
        })  
    }
   
    render() {
        return <div>
             <Button onClick={this.onClick}>改变数据 </Button>
                <Form style={{width:800}} cols={1} labelPosition={"top"}>
               
                <Input type="year" name="year" label="year" value="test"></Input> 
                <Input type="month" name="month" label="month" value="test"></Input>
                <Input type="time" name="time" label="time" value="test"></Input>
                <Input type="date" name="date" label="date" value="test"></Input>
                <Input type="datetime" name="datetime" label="datetime" value="test"></Input> 
                <Input type="yearrange" name="yearrange" label="yearrange" value="2015,2024"></Input>
                <Input type="monthrange" name="monthrange"  label="monthrange"></Input>
                <Input type="daterange"  name="daterange"  label="daterange"></Input>
                 <Input type="monthrange" name="monthrange"  label="monthrange"></Input>
                <Input type="timerange" name="timerange"  label="timerange"></Input>
                <Input type="daterange"  name="daterange"  label="daterange"></Input>
                <Input type="datetimerange" name="datetimerange" label="datetimerange" value="test"></Input> */
               
                </Form>
                {/* <Modal ref="modal"></Modal> */}
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
