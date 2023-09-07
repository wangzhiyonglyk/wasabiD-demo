import React from "react";
import ReactDOM from "react-dom";
import { DataGrid, Button, Input } from "../../component";
class Page extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.input1 = React.createRef();
    this.form = React.createRef();
    this.state = {
      dropData: [],
      fixedHeaders: [
        {
          name: "id",
          label: "fixedid",
        },
      ],
      headers: [
        {
          name: "label",
          label: "省11",
          editor: {
            type: "select",
            options: {
              data: [{ text: "test", value: "test" }],
            },
          },
        },

        {
          name: "label1",
          label: "省2",
          width: 200,
          editor: {
            type: "checkbox",
            options: {
              data: [
                { text: "test", value: "test" },
                { text: "test1", value: "test1" },
                { text: "test2", value: "test2" },
              ],
            },
          },
        },
        {
          name: "省4",
          label: "省4",
          content: (rowData, rowIndex) => {
            if (rowIndex % 2 === 1) {
              return <div>{rowData.label}</div>;
            } else {
              return (
                <div>
                  <button key="1">没有</button>
                  <button key="2">ddd</button>
                </div>
              );
            }
          },
        },
      ],
      data: (() => {
        let arr = [];
        for (let i = 0; i < 400; i++)
          if (i % 2 == 0) {
            arr.push({
              id: i,
              text: "通过  ",
              label1: "dd",
            });
          } else {
            arr.push({
              id: i,
              text: "可以停靠",
              label1: "testeste",
            });
          }
        return arr;
      })(),
      tabs: [
        {
          title: "你好",
        },
        {
          title: "我好",
        },
      ],
      startIndex: 0,
      endIndex: 20,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    let data = this.refs.grid.getChecked();
    console.log("getChecked", data);
  }
  componentDidUpdate() {}
  componentDidMount() {}
  render() {
    return (
      <div>
        <Button onClick={this.onClick}>获取勾选</Button>

        <Input type="text" name="text" label="text"></Input>
        <Input
          type="radio"
          name="radio"
          label="radio"
          data={this.state.data.slice(0, 6)}
        ></Input>
        <Input
          type="checkbox"
          name="checkbox"
          label="checkbox"
          data={this.state.data.slice(0, 6)}
        ></Input>
        <Input type="timerange" name="timerange" label="timerange"></Input>
        <Input type="year" name="year" label="year" value="test"></Input>
        <Input type="month" name="month" label="month" value="test"></Input>
        <Input type="time" name="time" label="time" value="test"></Input>
        <Input type="date" name="date" label="date" value="test"></Input>
        <DataGrid
          ref="grid"
          httpType="get"
          style={{ height: 600, width: "100%" }}
          pagination={true}
          textField="label"
          rowNumber={true}
          selectAble={true}
          importAble={true}
          fixedHeaders={this.state.fixedHeaders}
          headers={this.state.headers}
          data={this.state.data}
        ></DataGrid>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById("root"));
