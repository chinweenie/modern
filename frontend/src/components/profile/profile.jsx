import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class profile extends Component {
    constructor(props){
        super(props);
    }
    handleUploadFile = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', 'some value user types')
        data.append('description', 'some value user types')
        this.props.uploadFile(data)
    }

    render() {
        let { currentUser, followings, stories } = this.props;
        stories = stories || <h1>{currentUser.name} hasn’t been active on Medium yet. Check back later to see their stories, claps, and highlights.</h1>
        console.log(this.state);
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
                        <img width='320' src={this.props.fileURL} />
                    </div>
                </div>
            </div>
        )
    }
};