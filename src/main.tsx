import ReactDOM from "react-dom/client";
import App from "./index.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "styled-components";
import { themes } from "./theme/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={themes}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
