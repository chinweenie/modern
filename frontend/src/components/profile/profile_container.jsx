import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { uploadFile } from '../../actions/upload_actions';

const mapStateToProps = (state) => {
    console.log(state.UI.files.fileURL);
    return {
        // currentUser: state.session.currentUser
        currentUser: {name: "yui"},
        followings: 2,
        fileURL: state.UI.files.fileURL
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchImageFromDB  TODO: Need to fetch the image from database 
        uploadFile: file => dispatch(uploadFile(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);