import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    const emailCheck = email.length < 1;
    const usernameCheck = username.length < 4;
    const firstNameCheck = firstName.length < 1;
    const lastNameCheck = lastName.length < 1;
    const passwordCheck = password.length < 6;
    const confirmPasswordCheck = confirmPassword.length < 1;

    return (
        <div className="outside-form-wrapper">
            <div>
                <h1>Sign Up</h1>
            </div>
            <form className="entire-form" onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={email}
                        placeholder={'Email'}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    <input
                        type="text"
                        value={username}
                        placeholder={'Username'}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p>{errors.username}</p>}
                <label>
                    <input
                        type="text"
                        value={firstName}
                        placeholder={'First Name'}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p>{errors.firstName}</p>}
                <label>
                    <input
                        type="text"
                        value={lastName}
                        placeholder={'Last Name'}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p>{errors.lastName}</p>}
                <label>
                    <input
                        type="password"
                        value={password}
                        placeholder={'Password'}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <label>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder={'Confirm Password'}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p>{errors.confirmPassword}</p>
                )}
                <button className="sign-up-button" type="submit" disabled={emailCheck || usernameCheck || firstNameCheck || lastNameCheck || passwordCheck || confirmPasswordCheck}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;
