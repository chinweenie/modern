import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        // currentUser: state.session.currentUser
        currentUser: {name: "yui"},
        followings: 2,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);