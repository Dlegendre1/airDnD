import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SpotCardList from '../SpotCardList';
import AirBnBLogo from '../AirBnBLogo';
import CreateSpotButton from '../CreateSpotButton';

function Navigation({ isLoaded, spots }) {
    const sessionUser = useSelector(state => state.session.user);


    return (

        <ul>
            {isLoaded && (
                <div className='navigation-bar'>
                    <div className='logo'>
                        <AirBnBLogo />
                    </div>
                    <div className='spot-and-profile-buttons'>
                        {sessionUser && (
                            <div className='create-spot-button'>
                                <CreateSpotButton />
                            </div>
                        )}
                        <div className='profile-button'>
                            <ProfileButton user={sessionUser} />
                        </div>
                    </div>
                </div>
            )}
            <hr></hr>
        </ul>
    );
}

export default Navigation;
