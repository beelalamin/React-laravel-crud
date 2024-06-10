import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProdvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <ContextProvider></ContextProvider>
        </RouterProvider>
    </React.StrictMode>
);
