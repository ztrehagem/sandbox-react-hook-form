import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { RootView } from "./components/RootView.js";

const container = window.document.getElementById("app");
const root = container && createRoot(container);
root?.render(createElement(RootView));
