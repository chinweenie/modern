import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import 'font-awesome/css/font-awesome.min.css';
import LoggedOutNavbar from './logged_out_navbar';
import LoggedInNavbar from './logged_in_navbar';
import { logout } from '../../actions/session_actions';
import {openModal} from '../../actions/modal_actions';
import { fetchStories } from '../../actions/stories_actions';
import { fetchAllUsers } from '../../actions/users_actions';

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
    }
    componentDidMount(){
        this.props.fetchStories();
        this.props.fetchAllUsers();
    }
   
    handleSearchIconClick(){
        const dropdown = document.getElementById("search-dropdown");
        const searchBar = document.getElementById("searchBar");
        dropdown.classList.toggle("active");
        searchBar.classList.toggle("active");
    }
    
    render(){
        let { navbar, openModal, logout, currentUser } = this.props;
        const component = !navbar ? <LoggedOutNavbar openModal={openModal}/> : <LoggedInNavbar currentUser={currentUser} logout={logout}/>
                
        return (
            
            <div className="navbar">
                <ul className="navbar-left">
                    <li className="logo"><a href="/">Modern</a></li>
                    <li className="search" id="search-dropdown" >
                        <i id="search-icon" className="fa fa-search" aria-hidden="true" onClick={this.handleSearchIconClick}></i>
                        <span className="search-dropdown" id="searchBar">
                        </span>
                    </li>
                </ul>

                <ul className="navbar-right">
                    {/* <li className="search" id="search-dropdown" >
                        <i id="search-icon" className="fa fa-search" aria-hidden="true" ></i>
                        <span className="search-dropdown" id="searchBar">
                        </span>
                    </li> */}
                    <li>
                        {component}
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    navbar: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchStories: () => dispatch(fetchStories()),
    fetchAllUsers: () => dispatch(fetchAllUsers())
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));