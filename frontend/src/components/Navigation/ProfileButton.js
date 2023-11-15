import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                return setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        history.push('/');
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className={ulClassName} ref={ulRef}>
                    {user ? (
                        <>
                            <li>Hello, {user.firstName}</li>
                            <li>{user.email}</li>
                            <hr></hr>
                            <li>
                                <Link to={`/spots/current`} >
                                    <button>Manage Spots</button>
                                </Link>
                            </li>
                            <hr></hr>
                            <li>
                                <button onClick={logout} >Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <OpenModalButton
                                    buttonText="Log In"
                                    onButtonClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </li>
                            <li>
                                <OpenModalButton
                                    buttonText="Sign Up"
                                    onButtonClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </li>
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default ProfileButton;
