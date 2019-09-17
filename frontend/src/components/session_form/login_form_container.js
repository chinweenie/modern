import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Login'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    otherForm: (
      <button onClick={() => {
        dispatch(closeModal());
        dispatch(openModal('register'));
      }}
        className="btn-block">Create one
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
    login: userData => dispatch(login(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);