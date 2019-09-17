import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './navbar.css';
import 'font-awesome/css/font-awesome.min.css';



class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
        
    }
    componentDidMount(){
        this.handleSearchIconClick();
    }
   
    handleSearchIconClick(){
        const icon = document.getElementById("search-icon");
        const dropdown = document.getElementById("search-dropdown");
        const searchBar = document.getElementById("searchBar");
        
        icon.addEventListener("click", function (event) {
            event.preventDefault();
            dropdown.classList.toggle("active");
            searchBar.classList.toggle("active");
        });
    }
    
    render(){
        // let { navbar } = this.props;

                
        return (
            <ul className="navbar-ul">
                <li className="logo">Modern</li>
                <li className="search" id="search-dropdown" >
                    <i id="search-icon" className="fa fa-search" aria-hidden="true" ></i>
                    <span className="search-dropdown" id="searchBar">
                        
                    </span>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    navbar: Boolean(state.session.id)
});



export default withRouter(connect(mapStateToProps, null)(Navbar));

