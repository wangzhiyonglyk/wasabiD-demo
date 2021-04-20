import React from 'react';
import ReactDOM from 'react-dom';
import Select from "../../component/Form/Select"
import("./index.css")
class PivotPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropData: [],
            headers: [
                {
                    name: "text",
                    label: "省",
                },

            ],
            data: [
                {
                    id: 1, pId: "", name:"good", label:"机构尖", editor:{type:"date"}, text: "父节点1",value:"父节点1", children: [
                        { id: 11, pId: 1, text: "子节点11", },
                        { id: 12, pId: 1, text: "子节点12" }
                    ]
                },
                {
                    id: 2, pId: "", name:"good1",label:"机构尖1", editor:{type:"select"}, text: "父节点2",value:"子节点11", children: [
                        { id: 21, pId: 2, text: "子节点21" },
                        { id: 22, pId: 2, text: "子节点22" }
                    ]
                }
            ],
            tabs: [{
                title: "你好"
            }, {
                title: "我好"
            }],
        }


    }
    componentDidMount() {


    }
    onClick() {

        this.refs.rotate.turnIndex(3);
    }
    onDrop(data) {
        let dropData = this.state.dropData;
        dropData.push(data);
        this.setState({
            dropData: dropData
        })
    }

    render() {
        return <div style={{ padding: 20 }}>
            <div><Select required={true} removeAble={true} type="select" style={{ width: 300 }} checkStyle="radio" valueField="id" data={this.state.data} multiple={true} simpleData={true}></Select>
            </div>
            {/* <Input type="daterange" key="1"></Input>
            <Input type="datetime" key="2"></Input> */}
        
            {/* <DataGrid data={this.state.data} headers={this.state.headers}></DataGrid> */}
        </div>

    }
}

ReactDOM.render(<PivotPage />, document.getElementById('root'));
