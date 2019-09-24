import React from 'react';
import {withRouter} from 'react-router-dom';
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
                        <li><img src={this.props.profileURL} className="profile-picture" alt="" /></li>
                        <ul className="profile-dropdown-menu">
                            <li className="profile-dropdown-header">
                                <img src={this.props.profileURL} className="profile-picture" alt="" />
                                <span>{`@${username}`}</span>
                            </li>
                            <li><Link to="/stories/new">New Story</Link></li>
                            <li>Stories</li>
                            <li>Bookmarks</li>
                            <li>Publications</li>
                            <li><Link to={`/@${username}`} >Profile</Link></li>
                            <li onClick={logout}><Link to="/" >Sign out</Link></li>
                        </ul>
                    </ul>
                </li>
            </ul>
        )
        
    }
}

export default withRouter(LoggedInNavbar);