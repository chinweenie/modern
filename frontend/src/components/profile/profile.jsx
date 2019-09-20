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
        stories = stories || <h1 className="non-active-user">{currentUser.name} hasn’t been active on Modern yet. Check back later to see their stories, claps, and highlights.</h1>
        
        return (
            <div>
                <div className="profile-shadow"></div>
                <div className="profile-page">
                    <div className="profile-header-container">
                        <div className="profile-header">
                            <h1 className="profile-username">{currentUser.name}</h1>
                            <p className="profile-user-bio"> The smallest company in the world can look as large as the largest company on the web. -Steve Jobs</p>
                            <div className="profile-left-content">
                                
                                {/* <h1 className="profile-username">{currentUser.name}</h1> */}
                                <Link className="profile-edit-link" to={`/${currentUser.name}/edit`}>Edit Profile</Link>
                                <div> &nbsp; </div>
                                <Link className="profile-following" to={`/${currentUser.name}/following`}>{followings} following</Link>
                            </div>
                        </div>
                        
                        {/* </div> */}
                        <img src={this.state.profileURL} className="profile-picture"/>
                    </div>
                    <div className="profile-pic-changes">
                        <div class="box-1">
                            
                            <label for="upload">
                                <div class="pro-btn btn-one">
                                <input className="hidden-input" id="upload" type="file" onChange={this.handleUploadFile} />
                                <span for="upload">Upload Profile Picture</span>
                                <img width='320' src={this.props.fileURL} />
                                </div>
                            </label>
                            
                        </div>
                        {/* <input className="upload-profile-pic-button" type="file" onChange={this.handleUploadFile} /> */}
                        {/* <img width='320' src={this.props.fileURL} /> */}
                        <div class="box-2">
                            <div onClick={this.handleDeleteFile} class="pro-btn btn-two">
                                <span>Delete Profile Picture</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-break"></div>
                    <div className="stories">
                            {stories}
                        {/* <div class="box-2">
                            <div onClick={this.handleDeleteFile} class="pro-btn btn-two">
                                <span>Delete Profile Picture</span>
                            </div>
                        </div> */}
                    </div>
                  {/* <button onClick={this.handleDeleteFile}>Delete profile picture</button> */}
                </div>
            </div>
        )
    }
};