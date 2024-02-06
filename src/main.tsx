import ReactDOM from "react-dom/client";
import App from "./index.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { Toaster } from "./components/ui/Toast/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
        <Toaster />
    </Provider>
);
