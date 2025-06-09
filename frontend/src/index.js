import ReactDOM from "react-dom/client";
import "../src/assets/styles/index.css";
import { App } from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/styles/bootstrap.custom.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
