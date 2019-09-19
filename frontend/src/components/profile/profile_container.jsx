import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';
import { uploadFile, fetchAll } from '../../actions/file_actions';

const mapStateToProps = (state) => {
    console.log(state);
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
        fetchAll: email => dispatch(fetchAll(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);