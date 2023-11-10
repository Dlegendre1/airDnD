import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SpotCardList from '../SpotCardList';
import AirBnBLogo from '../AirBnBLogo';

function Navigation({ isLoaded, spots }) {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <ul>
            {isLoaded && (
                <>
                    <li>
                        <AirBnBLogo />
                    </li>
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                </>
            )}
        </ul>
    );
}

export default Navigation;
