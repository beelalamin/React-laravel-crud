import { useContext, useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { userContext } from "../contexts/ContextProdvider";

export default function DefaultLayout() {
    const { token, updateUser, updateToken } = useContext(userContext);
    if (!token) return <Navigate to="/login" />;
     const user = JSON.parse(localStorage.getItem("user"));

    const logoutUser = (e) => {
        e.preventDefault();
        updateToken(null);
        updateUser({});

        return;
    };
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>

            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user?.name}
                        <a href="#" onClick={logoutUser} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
