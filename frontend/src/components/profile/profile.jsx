import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileURL: ""
        };
        this.props.fetchAll(this.props.currentUser.email)
        .then( response => {
            response.files = response.files || [];
            response.files.map(obj => {
                if(obj.filename === "profile")
                    this.setState({profileURL: obj.URL});
            });
        });
        this.handleDeleteFile = this.handleDeleteFile.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.props.getProfile("yuichiu416");
    }
    handleDeleteFile(e){
        this.props.deleteFile(this.props.currentUser.email, "profile")
            .then(this.setState({ profileURL: ""}));
    }
    handleUploadFile(event){
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('filename', 'profile');
        data.append('type', 'image');
        data.append('email', this.props.currentUser.email);
        this.props.uploadFile(data);
    }
    render() {
        let { currentUser, followings, stories } = this.props;
        if (!currentUser){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        stories = stories || <h1>{currentUser.name} hasn’t been active on Medium yet. Check back later to see their stories, claps, and highlights.</h1>
        
        return (
            <div>
                <div className="profile-page">
                    <div className="profile-header-container">
                        <div className="profile-header">
                            <h1>{currentUser.name}</h1>
                            <Link to={`/${currentUser.name}/edit`}>Edit profile</Link>
                        </div>
                        <Link to={`/${currentUser.name}/following`}>{followings} following</Link>
                        <img src={this.state.profileURL} className="profile-picture"/>
                    </div>
                    <div className="stories">
                            {stories}
                        <input type="file" onChange={this.handleUploadFile}/>
                        <img width='320' src={this.props.fileURL} />
                    </div>
                <button onClick={this.handleDeleteFile}>Delete profile picture</button>
                </div>
            </div>
        )
    }
};