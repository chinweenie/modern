import React from 'react';
import {withRouter} from 'react-router-dom';
import './logged_in_navbar.css'
import { Link } from 'react-router-dom';


class LoggedInNavbar extends React.Component {
    render(){
        let {logout, currentUser} = this.props;
        const username = currentUser.email.split("@")[0];
        return (
            <ul className="logged-in-navbar">
                <li><i className="fa fa-bell" aria-hidden="true"></i></li>
                
                <li className="profile-dropdown-main">
                    <ul>
                        <li><i className="fa fa-user-circle-o" aria-hidden="true"></i></li>
                        <ul className="profile-dropdown-menu">
                            <li className="profile-dropdown-header">
                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                                <span>{`@${username}`}</span>
                            </li>
                            <li><Link to="/stories/new">New Story</Link></li>
                            <li>Stories</li>
                            <li>Bookmarks</li>
                            <li>Publications</li>
                            <li><Link to={`/@${username}`} >Profile</Link></li>
                            <li onClick={logout}>Sign out</li>
                        </ul>
                    </ul>
                </li>
            </ul>
        )
        
    }
}

export default withRouter(LoggedInNavbar);