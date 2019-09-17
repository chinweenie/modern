import React from 'react';
import {withRouter} from 'react-router-dom';

class LoggedInNavbar extends React.Component {
    render(){
        let {logout} = this.props;
        return (
            <ul className="logged-in-navbar">
                <li><i className="fa fa-bell" aria-hidden="true"></i></li>
                <li>
                    <button><i className="fa fa-user-circle-o" aria-hidden="true"></i></button>
                    <ul className="profile-dropdown">
                        <li className="profile-dropdown-header"></li>
                        <li>New Story</li>
                        <li>Stories</li>
                        <li>Bookmarks</li>
                        <li>Publications</li>
                        <li>Profile</li>
                        <li><button onClick={logout}>Sign out</button></li>
                    </ul>
                </li>
            </ul>
        )
        
    }
}

export default withRouter(LoggedInNavbar);