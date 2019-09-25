import React from 'react';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';


class LoggedInNavbar extends React.Component {
    clickProfileIcon(){
        let dropdown = document.getElementById("profile-dropdown-main");
        let menu = document.getElementById("profile-dropdown-menu");
        dropdown.classList.toggle("profile-clicked");
        menu.classList.toggle("profile-clicked");
    }
    render(){
        let {logout, currentUser} = this.props;
        const username = currentUser.email.split("@")[0];
        return (
            <div className="nav-right-div">
                <ul className="logged-in-navbar">
                    <li><i className="fa fa-bell" aria-hidden="true"></i></li>
                    <ul className="profile-dropdown-main" id="profile-dropdown-main">
                        <li><img src={this.props.profileURL} className="nav-profile-picture" alt="" onClick={this.clickProfileIcon}/></li>
                        <ul className="profile-dropdown-menu" id="profile-dropdown-menu">
                            <li className="profile-dropdown-header">
                                <img src={this.props.profileURL} className="profile-picture" alt="" />
                                <span>{`@${username}`}</span>
                            </li>
                            <li><Link to="/stories/new">New Story</Link></li>
                            <li><Link to="/author_stories_index">Stories</Link></li>
                            <li>Bookmarks</li>
                            <li><Link to={`/@${username}`} >Profile</Link></li>
                            <li onClick={logout}><Link to="/" >Sign out</Link></li>
                        </ul>
                    </ul>
                </ul>
            </div>
        )
    }
}

export default withRouter(LoggedInNavbar);