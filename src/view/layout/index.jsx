import React from "react";
import { createRoot } from "react-dom/client";
import {Layout,Header,Footer,Center,Left,Right} from "../../component";

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
        <Layout border={false}>
           <Header height={100} style={{backgroundColor:"red"}}></Header>
           <Left width={100} style={{backgroundColor:"blue"}}></Left>
            <Center> </Center>
            <Right width={100} style={{backgroundColor:"green"}}></Right>
            <Footer  height={100} style={{backgroundColor:"red"}}></Footer>
    </Layout>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Home />);
