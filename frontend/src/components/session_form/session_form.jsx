import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

class SessionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { email: "", name: "", password: ""}
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(event);
        window.location.href = "http://localhost:3000/#/register";


        axios.post('/register', { email:"yuichiu416@gmail.com", password:123456 })
            .then((result) => {
                // localStorage.setItem('jwtToken', result.data.token);
                this.setState({ message: '' });
                this.props.history.push('/')
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
            });
    }
    
    update(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    }

    render(){

        let  {formType, errors} = this.props;
        errors = errors || [];
        const errorsLi = errors.map(error => {
            return <li>{error}</li>
        })
        let sessionFormHeader;
        let optionalInputField;
        let sessionFormFooter;
        let buttonText;
        if (formType === 'Login'){
            sessionFormHeader = (
                <header className="login-form-header">
                  <h1 className="form-header">Welcome back.</h1>
                  <p className="form-description">Sign in to get personalized story recommendations, follow authors and topics you love, and interact with stories.</p>
                </header>
            );

            optionalInputField = '';

            sessionFormFooter = (
                <footer className="session-form-footer">
                    <p>No account?</p>
                    <span><Link to="/register">Create one</Link></span>
                </footer>
            );
            buttonText = "Log In";

        } else {
            sessionFormHeader = (
                <header className="signup-form-header">
                  <h1 className="form-header">Join Medium.</h1>
                  <p className="form-description">Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</p>
                </header>
            );

            optionalInputField = (
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input type="text" value={this.state.name} id="name" onChange={this.update('name')} required/>
                    </div>
            );

            sessionFormFooter = (
                <footer className="session-form-footer">
                    <p>Already have an account?</p>
                    <span><Link to="/login">Sign in</Link></span>
                </footer>
            );
            buttonText = "Sign Up";
        }
        return (
            <form className="session-form" onSubmit={this.handleSubmit}>
                {sessionFormHeader}

                <div className="session-form-inputs">
                    {errorsLi}
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="email" value={this.state.email} id="email" onChange={this.update('email')} required />
                    </div>

                    {optionalInputField}

                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" value={this.state.password} id="password" onChange={this.update('password')} required/>
                    </div>
                    <button onClick={this.handleSubmit} >{buttonText}</button>
                </div>
                
                {sessionFormFooter}
            </form>
        )
    }
}

export default withRouter(SessionForm);
