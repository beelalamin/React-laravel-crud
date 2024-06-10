import { useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = () => {
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getUsers();
        setLoading(true);
    }, []);

    return <div>
        <div>
            <h1>Users</h1>
        </div>
    </div>;
}

export default Users;
