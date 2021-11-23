import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../../component/Form/Input'
import("./home.css")
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
<Input type="select" multiple={true} data={[{text:"选择1",value:1},{text:"选择2",value:2}]}></Input>
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
