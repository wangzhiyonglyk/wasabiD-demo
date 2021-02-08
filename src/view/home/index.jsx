import React from 'react';
import ReactDOM from 'react-dom';
import("./home.css")
import { LinkButton ,Tag,Badge,Button } from "../../component"
import api from "../../libs/api"
import model from "./model"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        model:model
        }


    }
    componentDidMount() {

    }
    onClick() {   
    }
   
    render() {
        return <div><LinkButton>LinkButton</LinkButton><Tag>Tag</Tag><Badge tag={9}>Badge</Badge><Button iconCls="icon-add"></Button></div>
    }
}

ReactDOM.render(<Home />, document.getElementById('root'));
