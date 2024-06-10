import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProdvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router}></RouterProvider>
        </ContextProvider>
    </React.StrictMode>
);
