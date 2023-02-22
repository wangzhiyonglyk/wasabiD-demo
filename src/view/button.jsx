import React, { useState, useEffect, useDeferredValue } from "react";
import ReactDOM from "react-dom";
const List = (props) => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((count) => count + 1);
    setTimeout(() => {
      setList([
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
      ]);
    }, 500);
  }, [props.text]);
  return [
    <p>{"我被触发了" + count + "次"}</p>,
    <ul>
      {list.map((item) => (
        <li>
          Hello:{item.name} value:{item.value}
        </li>
      ))}
    </ul>,
  ];
};

function App() {
  const [text, setText] = useState("喵爸");
  const deferredText = useDeferredValue(text, { timeoutMs: 1000 });
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="App">
      <input value={text} onChange={handleChange} />
      <List text={deferredText} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
