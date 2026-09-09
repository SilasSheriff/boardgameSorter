import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { register } from "@public-ui/components";
import { defineCustomElements } from "@public-ui/components/loader";
import { DEFAULT } from "@public-ui/theme-default";

import "./index.css";
import App from "./App.tsx";

await register(DEFAULT, defineCustomElements);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
