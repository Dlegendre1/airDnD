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
        <div className='login-form-modal'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="text"
                            value={credential}
                            placeholder="Username or Email"
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                {errors.message && (
                    <p>{errors.message}</p>
                )}
                <button className="login-button-diff" type="submit" disabled={usernameLengthCheck || passwordLengthCheck}>Log In</button>
            </form>
            <button className="demo-user-button" type="button" onClick={handleDemoLogin}>Demo User</button>

        </div>
    );
}

export default LoginFormModal;
