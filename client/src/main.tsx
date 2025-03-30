import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set RTL direction for the entire app
document.documentElement.dir = "rtl";
document.documentElement.lang = "fa";

createRoot(document.getElementById("root")!).render(<App />);
