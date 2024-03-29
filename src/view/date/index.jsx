import React from "react";
import { createRoot } from "react-dom/client";
import { Form, Input, Button } from "../../component";

let src = "app.png";
class DateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { text: "选择1", value: 1 },
        { text: "选择2", value: 2 },
      ],
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    // this.refs.modal.open();
  }
  onClick() {
    this.setState({
      data: this.state.data.concat([{ text: "测试1", value: Math.random(1) }]),
    });
  }

  render() {
    return (
      <div>
        <img
          style={{ width: "100px", height: 100 }}
          src={require("./" + src)}
        ></img>
        <Button onClick={this.onClick}>改变数据 </Button>
        <Form style={{ width: 800 }} cols={1} labelPosition={"top"}>
          <Input
            type="select"
            placeholder="下拉框"
            multiple={true}
            data={this.state.data}
          ></Input>
          <Input
            type="checkbox"
            half={true}
            label="复选框"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>

          <Input
            type="radio"
            label="单选框"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
          <Input
            type="switch"
            label="开关"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
          <Input
            type="picker"
            label="级联选择"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
          <Input
            type="date"
            label="日期"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
          <Input
            type="datetime"
            label="日期时间"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
          <Input
            type="daterange"
            label="日期范围"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
          <Input
            type="datetimerange"
            style={{ width: 500 }}
            label="日期时间范围"
            multiple={true}
            data={[
              { text: "选择1", value: 1 },
              { text: "选择2", value: 2 },
            ]}
          ></Input>
        </Form>
        {/* <Modal ref="modal"></Modal> */}
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
createRoot(rootElement).render(<DateView />);
