import React, { Component } from 'react';
import { logoutCurrentUser } from '../../actions/session_actions';
// import Navbar from '../nav_bar/nav_bar';
import { Link } from 'react-router-dom';
import './profile.scss';

export default class profile extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const { currentUser, followings } = this.props;
        return (
            <div>
                {/* <NavBar /> */}
                <div className="profile-page">
                    <div className="profile-header">
                        <h1>{currentUser.name}</h1>
                        <Link to={`/${currentUser.name}/edit`}>Edit profile</Link>
                    </div>
                    <Link to={`/${currentUser.name}/following`}>{followings} following</Link>

                </div>
            </div>
        )
    }
};