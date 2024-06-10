import { Link } from "react-router-dom";
import { userContext } from "../contexts/ContextProdvider";
import { useContext, useRef, useState } from "react";
import axiosClient from "../axiosClient";

function Login() {
    const { updateUser, updateToken } = useContext(userContext);
    const [errors, setErrors] = useState(null);

    const email = useRef();
    const password = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email.current.value,
            password: password.current.value,
        };

        setErrors(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                updateUser(data.user);
                updateToken(data.token);
            })
            .catch((err) => {
                const res = err.response;

                if (res && res.status === 422) {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        setErrors({
                            email: [res.data.message],
                        });
                    }

                    // setErrors({
                    //     error: [res.data.message],
                    // });
                }
            });
    };
    return (
        <form onSubmit={handleSubmit} className="animated fadeInDown">
            <h1 className="title">Login to your account</h1>
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key, i) => (
                        <p key={i}>{errors[key]}</p>
                    ))}
                </div>
            )}
            <input ref={email} type="email" placeholder="Email" />
            <input ref={password} type="password" placeholder="Password" />
            <button className="btn btn-block">Sign in</button>

            <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    );
}

export default Login;
