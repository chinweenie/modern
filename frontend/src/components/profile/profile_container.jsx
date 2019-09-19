import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { uploadFile, fetchAll } from '../../actions/file_actions';
import { getProfile } from '../../actions/profile_actions';

const mapStateToProps = (state) => {
    const currentUser = state.session.currentUser;
    return {
        currentUser: currentUser,
        followings: 2,
        fileURL: state.UI.files[currentUser.email]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadFile: file => dispatch(uploadFile(file)),
        fetchAll: email => dispatch(fetchAll(email)),
        getProfile: username => dispatch(getProfile(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);