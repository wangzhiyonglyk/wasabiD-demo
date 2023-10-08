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
          statsType: "sum",
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
          filterAble: true,
          
        },
        {
          name: "省5",
          label: "省5",
          filterAble: true,
          editor: {
            type: "daterange",
          },
          content: (rowData, rowIndex) => {
            return <div>2020-10-10</div>;
          },
        },
        {
          name: "省6",
          label: "省6",
          sticky: "right",
          content: (rowData, rowIndex) => {
            return <div>湖南省衡阳市</div>;
          },
        },
        {
          name: "操作列",
          label: "操作列",
          editAble: false,
          sticky: "right",
        },
      ],
      data: (() => {
        let arr = [];
        for (let i = 0; i < 400; i++)
          if (i % 2 == 0) {
            arr.push({
              label: i,
              text: "通过  ",
              label1: "深圳市",
              操作列: [
                {
                  label: "编辑",
                  style: { color: "red" },
                },
              ],
            });
          } else {
            arr.push({
              label: i,
              text: "可以停靠",
              label1: "广州市",
              操作列: [
                {
                  label: "删除",
                  style: { color: "blue" },
                },
              ],
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
      <div style={{ height: "100%", padding: 10 }}>
        <DataGrid
          ref="grid"
          httpType="get"
          pagination={true}
          textField="label"
          rowNumber={true}
          selectAble={true}
          // borderAble={false}
          importAble={true}
          footerAble={true}
          // compactCol={5}
          headers={this.state.headers}
          // url="https://www.baidu.com"
          data={this.state.data}
        ></DataGrid>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<Page />);
