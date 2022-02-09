import React from 'react';
import ReactDOM from 'react-dom';
import {Form ,Input } from "../../component"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }


    }
    componentDidMount() {

    }
    onClick() {   
    }
   
    render() {
        return <div>
                <Form style={{width:800}} cols={1} labelPosition={"top"}>
                <Input type="email" label="文本框" required={true} multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                </Form>
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
