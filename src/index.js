import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import backgroundImage from "./img/back-1.png";

document.body.style.backgroundImage = `url(${backgroundImage})`;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
