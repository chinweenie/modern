import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        // currentUser: state.session.currentUser
        currentUser: {name: "yui"},
        followings: 2,
        imageURL: state.imageURL
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchImageFromDB  TODO: Need to fetch the image from database 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);