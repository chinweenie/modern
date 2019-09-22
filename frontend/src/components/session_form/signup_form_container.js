import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchAllUsers } from '../../actions/users_actions';

const mapStateToProps = ({ errors }) => {
  return{
    errors: errors.sessions,
    formType: 'Signup'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    otherForm: (
      <button onClick={() => {
        dispatch(closeModal());
        dispatch(openModal('login')); 
      }} className="btn-block">Log In | Demo
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
    signup: userData => dispatch(signup(userData)),
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);