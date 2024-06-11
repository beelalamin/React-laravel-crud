import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { userContext } from "../contexts/ContextProdvider";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateNotification } = useContext(userContext);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    updateNotification("User Update Successfully");
                    navigate("/users");
                })
                .catch((err) => {
                    const res = err.response;
                    if (res && res.status === 422) {
                        setErrors(res.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    updateNotification("User Created Successfully");
                    navigate("/users");
                })
                .catch((err) => {
                    const res = err.response;

                    if (res && res.status === 422) {
                        setErrors(res.data.errors);
                    }
                });
        }
    };

    if (id) {
        useEffect(() => {
            setLoading(true);

            axiosClient
                .get(`users/${id}`)
                .then(({ data }) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                });
        }, []);
    }

    return (
        <div>
            {user.id && <h1>Update User </h1>}
            {!user.id && <h1>New User</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading ...</div>}

                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                        type="text"
                        placeholder="name"
                    />
                    <input
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        type="email "
                        placeholder="email"
                    />
                    <input
                        type="password"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder="password"
                    />
                    <input
                        type="password"
                        onChange={(e) =>
                            setUser({
                                ...user,
                                password_confirmation: e.target.value,
                            })
                        }
                        placeholder="Confirm Password"
                    />
                    <button className="btn">Save</button>
                </form>
            </div>
        </div>
    );
}
