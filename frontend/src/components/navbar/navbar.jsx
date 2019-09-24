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
import { selectStoriesTitles } from '../../reducers/selectors';
import SearchForm from '../search/search_form';
import { fetchAll } from '../../actions/file_actions';

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state =  {
            hashesToCompare: {}
        };
        this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
    }
    
    componentDidMount(){
        this.props.fetchStories().then((response) => {
            this.props.storyTitlesArray.forEach(title => {
                this.setState({ hashesToCompare: 
                    Object.assign(this.state.hashesToCompare, {
                        [title]: this.makeTitlesHash(title)
                    })
                });
            });
        });
        this.props.fetchAllUsers();
        if(!this.props.currentUser)
            return;
        this.props.fetchAll(this.props.currentUser.id)
            .then(response => {
                response.files = response.files || [];
                response.files.forEach(obj => {
                    if (obj.filename === "profile")
                        this.setState({ profileURL: obj.URL });
                });
            });
    }
   
    handleSearchIconClick(){
        const dropdown = document.getElementById("search-dropdown");
        const searchBar = document.getElementById("searchBar");
        dropdown.classList.toggle("active");
        searchBar.classList.toggle("active");
    }
    makeTitlesHash(str){
        const hash = {};
        str.split("").forEach(c => {
            c = c.toLowerCase();
            hash[c] = hash[c] || 0;
            hash[c]++;
        });
        return hash;
    }
    
    render(){
        let { navbar, openModal, logout, currentUser, profileURL } = this.props;
        const component = !navbar ? <LoggedOutNavbar openModal={openModal} /> : <LoggedInNavbar currentUser={currentUser} logout={logout} profileURL={profileURL}/>
                
        return (
            
            <div className="navbar">
                <ul className="navbar-left">
                    <li className="logo"><a href="/">Modern</a></li>
                    
                    <li className="search" id="search-dropdown" >
                        <i id="search-icon" className="fa fa-search" aria-hidden="true" onClick={this.handleSearchIconClick}></i>
                            <SearchForm hashesToCompare={this.state.hashesToCompare} />
                    </li>
                </ul>
                <ul className="navbar-right">
                        {component}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const currentUser = state.session.currentUser;
    let profileURL = currentUser && state.UI.files[currentUser.id] ? state.UI.files[currentUser.id] : "/favicon.ico"
    return {
        navbar: Boolean(currentUser),
        currentUser: currentUser,
        storyTitlesArray: selectStoriesTitles(state.entities.stories),
        profileURL: profileURL
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchStories: () => dispatch(fetchStories()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAll: user_id => dispatch(fetchAll(user_id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));