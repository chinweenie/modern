import { connect } from 'react-redux';
import React from 'react';
import { fetchCurrentUser, logout } from '../../actions/session_actions';

class HomePage extends React.Component {
    constructor(){
        super();
    }

    render(){
        return (
            <div>

            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(HomePage);
