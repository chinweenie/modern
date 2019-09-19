import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { uploadFile, fetchAll, deleteFile } from '../../actions/file_actions';
import { getProfile } from '../../actions/profile_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.currentUser;
    return {
        currentUser: currentUser,
        followings: 2,
        fileURL: state.UI.files[currentUser.email],
        profileOwnerUsername: ownProps.match.params.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadFile: file => dispatch(uploadFile(file)),
        fetchAll: email => dispatch(fetchAll(email)),
        getProfile: username => dispatch(getProfile(username)),
        deleteFile: (email, filename) => dispatch(deleteFile(email, filename))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);