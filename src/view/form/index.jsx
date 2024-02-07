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
      this.refs.form.validate()
    this.refs.modal.open()
  }

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>打开</Button>
        
        
        <Form ref="form" style={{ width: "100%" }}  >
         
          <Input type="phone" name="phone" label="phone" data={this.state.data} headers={
             [
        {
          name: "value",
          label: "省11",
          }]}></Input>
         
         
        </Form>
     
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Home />);
