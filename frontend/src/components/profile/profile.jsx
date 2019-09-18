import React, { Component } from 'react';
// import Navbar from '../nav_bar/nav_bar';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageURL: this.props.imageURL
        }
    }
    handleUploadFile = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', 'some value user types')
        data.append('description', 'some value user types')
        axios.post('/files', data).then((response) => {
            this.setState({
                imageURL: response.data.fileURL
            })
        })
    }
    render() {
        let { currentUser, followings, stories } = this.props;
        stories = stories || <h1>{currentUser.name} hasn’t been active on Medium yet. Check back later to see their stories, claps, and highlights.</h1>
        return (
            <div>
                {/* <NavBar /> */}
                <div className="profile-page">
                    <div className="profile-header-container">
                        <div className="profile-header">
                            <h1>{currentUser.name}</h1>
                            <Link to={`/${currentUser.name}/edit`}>Edit profile</Link>
                        </div>
                        <Link to={`/${currentUser.name}/following`}>{followings} following</Link>
                        <div className="profile-picture">Profile picture</div>
                    </div>
                    <div className="stories">
                            {stories}
                        <input type="file" onChange={this.handleUploadFile}/>
                        <img width='320' src={this.state.imageURL} />
                    </div>
                </div>
            </div>
        )
    }
};