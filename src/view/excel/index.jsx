import React from "react";
import ReactDOM from "react-dom";

import Excel from "../../component/Data/Excel";
import { createRoot } from "react-dom/client";
import "./index.css";
class PivotPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <Excel></Excel>;
  }
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<PivotPage />);
