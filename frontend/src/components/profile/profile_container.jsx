import React from 'react';
import { connect } from 'react-redux';
import Profile from './profile';

const mapStateToProps = (state) => {
    return {
        currentUser: state.session.currentUser
    };
};

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);