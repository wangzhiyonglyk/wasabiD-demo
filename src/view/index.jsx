import React from "react";
import ReactDOM from "react-dom";
import { Page, DataGrid,Input,Button, SearchBar,Form,Modal,Toolbar,SlidePanel,CheckBox} from "wasabiD";
import { ajax } from "wasabi-api";
class ButtonDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {
                    name: "openid",
                    label: "openid"
                },
                {
                    name:"nickname",
                    label:"nickname"
                }
                ,
                {
                    name:"city",
                    label:"city"
                }
                ,
                {
                    name:"country",
                    label:"country"
                }
                ,{
                    name:"province",
                    label:"province"
                },
                {
                    name:"language",
                    label:"language"
                },
                {
                    name:"remark",
                    label:"remark"
                }
                ,
                {
                    name:"edit",
                    label:"编辑",
                    content:function(rowData,rowIndex)
                    {
                        return <div><a onClick={this.onClick}>fdfdfd</a></div>
                    }
                }

            ]
        }
        this.onClick=this.onClick.bind(this);
    }
    componentDidMount() {

    }
    onClick()
    {

      this.refs.slide.open();
      this.refs.modal.open();
    }
    onChange()
    {
        this.setState({

        })
    }
    render() {
        return <Page>
            <SearchBar ref="form" >
            <Input type="text" name="text" label="text" onChange={this.onChange.bind(this)} style={{width:500}}></Input>
            <Input type="muti" name="muti" label="muti" title="请输入" placeholder="多行文本输出"></Input>
              <Input type="date" name="date" label="date"></Input>
              <Input type="datetime" name="datetime" label="datetime"></Input>
              <Input type="daterange" name="daterange" label="daterange"></Input>
              <Input type="datetimerange" name="datetimerange" label="datetimerange"></Input>
              <Input type="select" data={[{value:"1",text:"男"},{value:"2",text:"女"}]}></Input>
              <Input type="picker" name="picker" label="picker" data={[{value:"1",text:"男"},{value:"2",text:"女"}]}></Input>
              <Input type="checkbox" data={[{value:"1",text:"男"},{value:"2",text:"女"}]}></Input>
              <Input type="radio" data={[{value:"1",text:"男"},{value:"2",text:"女"}]}></Input>
              <CheckBox data={[{value:"1",text:"男"},{value:"2",text:"女"}]}></CheckBox>
              <Button name="btn" style={{width:100}} title="提交" onClick={this.onClick}> </Button>
          
            </SearchBar>
            <Modal ref="modal"  showOK={true} showCancel={true}><div>fdfsdfsd</div></Modal>
            <DataGrid headers={this.state.headers} dataSource="rows" param url={"http://wechat.bluehy.com/Test/GetTable"}></DataGrid>
            <SlidePanel ref="slide"></SlidePanel>
        </Page>;
    }
}
ReactDOM.render(<ButtonDemo />, document.getElementById("root"));