import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileURL: this.props.fileURL || "/favicon.JPG"
        };
        this.props.fetchAll(this.props.currentUser.user_id)
        .then( response => {
            response.files = response.files || [];
            response.files.forEach(obj => {
                if(obj.filename === "profile")
                    this.setState({profileURL: obj.URL});
            });
        });
        this.handleDeleteFile = this.handleDeleteFile.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.props.getProfile("yuichiu416");
        this.props.getStories(this.props.currentUser);
    }
    handleDeleteFile(e){
        this.props.deleteFile(this.props.currentUser.user_id, "profile")
            .then(this.setState({ profileURL: "/favicon.JPG" }));
    }
    handleUploadFile(event){
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('filename', 'profile');
        data.append('type', 'image');
        data.append('user_id', this.props.currentUser.is);
        this.props.uploadFile(data).then(response => this.setState({ profileURL: response.file.fileURL}));
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

        if(stories){
            stories = 
            <table>
                {stories.map((story, idx) => {
                    return  <tbody key={story.title + idx}>
                                <tr>
                                <th>Title</th>
                                </tr>
                                <tr>
                                    <td>{story.title}</td>
                                </tr>
                                <tr>
                                    <th>Body</th>
                                </tr>
                                <tr>
                                    <td>{ReactHtmlParser(story.body)}</td>
                                </tr>
                            </tbody>
                })}
            </table>
        } else
            stories = <h1 className="non-active-user">{currentUser.name} hasn’t been active on Modern yet. Check back later to see their stories, claps, and highlights.</h1>
        
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
                                {/* <div className="pro-btn btn-three"> */}
                                
                                <Link className="profile-following" to={`/${currentUser.name}/following`}>{followings} followers</Link>
                                <div> &nbsp; </div>
                                <div> &nbsp; </div>
                                <Link className="profile-edit-link" to={`/${currentUser.name}/edit`}>Edit Profile</Link>
                            </div>
                        </div>
                        
                        {/* </div> */}
                        <img src={this.state.profileURL} className="profile-picture" alt="profile"/>
                    </div>
                    <div className="profile-pic-changes">
                        <div className="box-1">
                            
                            <label htmlFor="upload">
                                <div className="pro-btn btn-one">
                                <input className="hidden-input" id="upload" type="file" onChange={this.handleUploadFile} />
                                <span>Upload Profile Picture</span>
                                </div>
                            </label>
                            
                        </div>
                        {/* <input className="upload-profile-pic-button" type="file" onChange={this.handleUploadFile} /> */}
                        {/* <img width='320' src={this.props.fileURL} /> */}
                        <div className="box-2">
                            <div onClick={this.handleDeleteFile} className="pro-btn btn-two">
                                <span>Delete Profile Picture</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-break"></div>
                    <div className="stories">
                           {stories}
                        {/* <div className="box-2">
                            <div onClick={this.handleDeleteFile} className="pro-btn btn-two">
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