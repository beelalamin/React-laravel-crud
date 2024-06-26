import { useContext, useEffect, useState } from "react";
import axiosClient from "../axiosClient.js";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/ContextProdvider.jsx";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { updateNotification } = useContext(userContext);

    const getUsers = () => {
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }

        axiosClient.delete(`/users/${id}`).then(() => {
            updateNotification("User Deleted Successfully");
            setLoading(true);
            getUsers();
        });
    };

    useEffect(() => {
        getUsers();
        setLoading(true);
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">
                    Add New
                </Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading ...
                                </td>
                            </tr>
                        </tbody>
                    )}

                    {!loading && (
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link
                                            to={`/users/${user.id}`}
                                            className="btn-edit"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Users;
