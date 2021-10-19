import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";

import state from "../stateManager";
import isEmail from "validator/es/lib/isEmail";
import AuthService from "./auth/components/services/auth.service";

import Input from "./Input";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("cv");
    const [successful, setSuccessful] = useState(false);

    const [_currentUser, setCurrentUser] = useAtom(state.currentUserAtom);

    const errorHandling = () => {
        const errors = [
            !username.length && "Username is required!",
            (username.length < 3 || username.length > 25) &&
                "The username must be between 3 and 25 characters.",
            !email.length && "Email is required!",
            !isEmail(email) && "Email is not valid!",
            !password.length && "Password is required!",
            (password.length < 3 || password.length > 25) &&
                "The password must be between 3 and 25 characters.",
        ].filter((x) => !!x);

        if (errors.length) {
            setMessage(errors.join(" "));
            setSuccessful(false);
        } else {
            setMessage(errors.join(" "));
            setSuccessful(true);
        }
    };

    useEffect(() => {
        errorHandling();
    }, [username, email, password]);

    const handleSubmit = (e) => {
        e.preventDefault();

        AuthService.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                setCurrentUser(username);
            },
            (error) => {
                const resMessage =
                    error?.response?.data?.message ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    return (
        <section className="row">
            <div className="col-6 mx-auto p-3 rounded text-white red">
                <h2 className="text-center">Register on StrmFindr</h2>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="d-block rounded mx-auto mb-3"
                />
                <form onSubmit={handleSubmit}>
                    <Input
                        id="username"
                        value={username}
                        label="Username"
                        callback={setUsername}
                    />

                    <Input
                        id="email"
                        value={email}
                        label="Email"
                        callback={setEmail}
                    />

                    <Input
                        type="password"
                        id="password"
                        value={password}
                        label="Password"
                        callback={setPassword}
                    />

                    <button type="submit" class="btn btn-outline-light">
                        Submit
                    </button>
                </form>

                {!!message && (
                    <div
                        className={
                            successful
                                ? "mt-3 alert alert-success"
                                : "mt-3 alert alert-danger"
                        }
                    >
                        {message}
                    </div>
                )}
            </div>

            {successful && (
                <div className="row">
                    <div className="col">
                        <Link className="btn btn-primary" to="/">
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Register;
