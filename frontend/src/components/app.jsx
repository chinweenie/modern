import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';
import { Switch } from 'react-router-dom';

// import MainPage from './main/main_page';
import SignUpFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import Navbar from './navbar/navbar';
import Profile from './profile/profile_container';

const App = () => (
    
    <div>
        <Modal />
        <header>
            <Navbar />
        </header>

        <Switch>
            <ProtectedRoute path="/@:username" component={Profile} />
            <AuthRoute exact path="/register" component={SignUpFormContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer}/>
        </Switch>
    </div>
)

export default App;