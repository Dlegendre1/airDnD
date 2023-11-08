import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SpotCardList from '../SpotCardList';

function Navigation({ isLoaded, spots }) {
    const sessionUser = useSelector(state => state.session.user);
    const spotList = useSelector(state => state.spots.spots);

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            {isLoaded && (
                <>
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                    <li>
                        <SpotCardList spots={spotList} />
                    </li>
                </>
            )}
        </ul>
    );
}

export default Navigation;
