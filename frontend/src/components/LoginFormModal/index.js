import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import DemoUser from "../DemoUser";

function LoginFormModal({ user }) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const handleDemoLogin = async () => {
        return dispatch(sessionActions.login({ credential: 'demouser', password: 'demouser' }))
            .then(closeModal);
    };

    const usernameLengthCheck = credential.length < 4;
    const passwordLengthCheck = password.length < 6;

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.message && (
                    <p>{errors.message}</p>
                )}
                <button type="submit" disabled={usernameLengthCheck || passwordLengthCheck}>Log In</button>
            </form>
            <button type="button" onClick={handleDemoLogin}>Demo User</button>

        </>
    );
}

export default LoginFormModal;
