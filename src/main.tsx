import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "normalize.css";
import "./index.css";

import { App } from "./App";

import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = document.getElementById("root");

if (root) {
    createRoot(root).render(
        <HelmetProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </HelmetProvider>
    );
}
