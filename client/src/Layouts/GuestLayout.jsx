import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userContext } from "../contexts/ContextProdvider";

export default function GuestLayout() {
    const { user, token } = useContext(userContext);

    if (token) return <Navigate to="/dashboard" />;

    return (
        <div>
            <Outlet />
        </div>
    );
}
