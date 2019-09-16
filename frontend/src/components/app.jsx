import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPage from './main/main_page';
import SignUpFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';

const App = () => (
    <Switch>
        <Route exact path="/" component={MainPage}/>
        <AuthRoute exact path="/register" component={SignUpFormContainer}/>
        <AuthRoute exact path="/login" component={LoginFormContainer}/>
    </Switch>
)

export default App;