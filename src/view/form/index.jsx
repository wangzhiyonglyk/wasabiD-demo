import React from "react";
import { createRoot } from "react-dom/client";
import { SearchBar, Form, Avatar, Input, Button, Upload ,Modal} from "../../component";
import Province from "../../component/Form/Province";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      data: [
        {
          text: "只有一级",
          value: "333",
        },
        {
          text: "选择1",
          value: 1,
          children: [
            {
              text: "子节点1",
              value: 11,
              children: [{ text: "子子节点2", value: 111 }],
            },
          ],
        },
        {
          text: "选择2",
          value: 2,
          children: [{ text: "子节点2", value: 22, text: "第二个子节点" }],
        },
      ],
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {}
  onClick() {
    this.refs.modal.open()
  }

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>打开</Button>
        <Modal ref="modal">
          
        <Form key="1" style={{ width: 500 }} cols={1}>
          
          <Input type="text" name="text" label="text"></Input>
          <Input
            type="radio"
            name="radio"
            label="radio"
            labelStyle={{ width: 150 }}
            data={this.state.data}
          ></Input>
          <Input
            type="checkbox"
            name="checkbox"
            label="checkbox"
            data={this.state.data}
          ></Input>
          <Input
            ref={this.inputRef}
            type="timerange"
            name="timerange"
            label="timerange"
          ></Input>
          <Input type="year" name="year" label="year" value="test"></Input>
          <Input type="month" name="month" label="month" value="test"></Input>
          <Input type="time" name="time" label="time" value="test"></Input>
          <Input type="date" name="date" label="date" value="test"></Input>
          <Input
            type="datetime"
            name="datetime"
            label="datetime"
            value="test"
          ></Input>
          <Input
            type="yearrange"
            name="yearrange"
            label="yearrange"
            value="2015,2024"
          ></Input>
          <Input
            type="monthrange"
            name="monthrange"
            label="monthrange"
            onClick={this.onClick}
          ></Input>
          <Input
            type="daterange"
            min="2022-10-10"
            max="2024-10-10"
            name="daterange"
            range={10}
            label="daterange"
          ></Input>
          <Input type="monthrange" name="monthrange" label="monthrange"></Input>
          <Input type="timerange" name="timerange" label="timerange"></Input>
          <Input
            type="datetimerange"
            name="datetimerange"
            label="datetimerange"
            value="test"
          ></Input>
        </Form>
        </Modal>
        
        <Form key="1" style={{ width: "100%" }}  >
          
          <Input type="text" name="text" label="标题"></Input>
          <Input type="text" name="text" label="标题"></Input>
          <Input type="text" name="text" label="标题"></Input>
          <Input type="text" name="text" label="标题"></Input>
         
        </Form>
     
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Home />);
