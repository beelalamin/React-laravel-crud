import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../contexts/ContextProdvider";

export default function DefaultLayout() {
    const { currentUser, token } = useContext(userContext);

    if (!token) return <Navigate to="/login" />;
    return (
        <div>
            <Outlet />
        </div>
    );
}
