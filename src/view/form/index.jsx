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
                <Form cols={4}>
                <Input type="text" label="文本框" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="select" label="下拉框" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="checkbox" label="复选框" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="radio" label="单选框" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="switch" label="开关" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="picker" label="级联选择" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="date" label="日期" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                 <Input type="datetime" label="日期时间" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="daterange" label="日期范围" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                <Input type="datetimerange" style={{width:500}} label="日期时间范围" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
                </Form>
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
