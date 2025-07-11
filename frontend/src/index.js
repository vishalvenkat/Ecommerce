import ReactDOM from "react-dom/client";
import "../src/assets/styles/index.css";
import { App } from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/styles/bootstrap.custom.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  </BrowserRouter>
);

reportWebVitals();
