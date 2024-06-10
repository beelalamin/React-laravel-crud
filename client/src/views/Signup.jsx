import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/ContextProdvider";
import axiosClient from "../axiosClient";

function Signup() {
    const { updateUser, updateToken } = useContext(userContext);
    const [errors, setErrors] = useState(null);

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            password_confirmation: confirmPassword.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                updateUser(data.user);
                updateToken(data.token);
            })
            .catch((err) => {
                const res = err.response;

                if (res && res.status === 422) {
                    console.log(res.data.errors);
                    setErrors(res.data.errors);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="animated fadeInDown">
            <h1 className="title">Create your account</h1>

            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key, i) => (
                        <p key={i}>{errors[key]}</p>
                    ))}
                </div>
            )}

            <input ref={name} type="text" placeholder="Full Name" />
            <input ref={email} type="email" placeholder="Email" />
            <input ref={password} type="password" placeholder="Password" />
            <input
                ref={confirmPassword}
                type="password"
                placeholder="Confirm Password"
            />
            <button className="btn btn-block">Login</button>

            <p className="message">
                Already registered? <Link to="/login">Sign up</Link>
            </p>
        </form>
    );
}

export default Signup;
