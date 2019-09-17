import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

// import MainPage from './main/main_page';
import SignUpFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import navbar from './navbar/navbar';
import Profile from './profile/profile_container';

const App = () => (
    <div>
        <header>
            <navbar />
        </header>

        <Switch>
            <Route exact path="/profile" component={Profile} />
            <AuthRoute exact path="/register" component={SignUpFormContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer}/>
        </Switch>
    </div>
)

export default App;