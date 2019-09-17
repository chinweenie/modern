import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

// import MainPage from './main/main_page';
import SignUpFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import navbar from './navbar/navbar';

const App = () => (
    <div>
        <header>
            <navbar />
        </header>
    
    

        <Switch>
            <AuthRoute exact path="/register" component={SignUpFormContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer}/>
        </Switch>
    </div>
)

export default App;