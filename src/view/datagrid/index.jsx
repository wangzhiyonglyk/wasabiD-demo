import React from "react";
import { createRoot } from "react-dom/client";
import { DataGrid, Button, Input } from "../../component";
class Page extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.input1 = React.createRef();
    this.form = React.createRef();
    this.state = {
      dropData: [],

      headers: [
        {
          name: "label",
          label: "省11",
          sticky: "left",
          sortAble: true,
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
          sticky: "left",
          sortAble: true,
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
        {
          name: "省5",
          label: "省5",
          content: (rowData, rowIndex) => {
            return (
              <div>
                tefgfsggsdagdfgdfsgdfgdfgdfgdffgdfsgdfgdfgdfgssgdfgdfgdfgdfsdfsdfsdas
              </div>
            );
          },
        },
        {
          name: "省6",
          label: "省6",
          sticky: "right",
          content: (rowData, rowIndex) => {
            return <div>tefgfsggsdagdfgdfsgdfgdfgdgdfsgdfgdfgdf</div>;
          },
        },
        {
          name: "省7",
          label: "省7",
          sticky: "right",
          content: (rowData, rowIndex) => {
            return <div>tefgfsggsdagdfgdfsgdfg</div>;
          },
        },
      ],
      data: (() => {
        let arr = [];
        for (let i = 0; i < 400; i++)
          if (i % 2 == 0) {
            arr.push({
              label: i,
              text: "通过  ",
              label1: "dd",
            });
          } else {
            arr.push({
              label: i,
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
      <DataGrid
        ref="grid"
        httpType="get"
        pagination={true}
        textField="label"
        rowNumber={true}
        selectAble={true}
        importAble={true}
        // compactCol={5}
        headers={this.state.headers}
        // url="https://www.baidu.com"
        data={this.state.data}
      ></DataGrid>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
