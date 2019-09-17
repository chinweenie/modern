import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { email: "", name: "", password: "", password2: ""};
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        // window.location.href = "http://localhost:3000/#/register";
        if(this.props.formType === "Signup"){
            // this.state.password2 = this.state.password; //TODO: the field is confirm password
            this.props.signup(this.state); 
        }
        else{
            console.log(this.state);
            this.props.login(this.state);
        }

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
        let password2Input;
        if (formType === 'Login'){
            sessionFormHeader = (
                <header className="login-form-header">
                  <h1 className="form-header">Welcome back.</h1>
                  <p className="form-description">Sign in to get personalized story recommendations, follow authors and topics you love, and interact with stories.</p>
                </header>
            );

            optionalInputField = '';

            password2Input = '';

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

            password2Input = (
                <div className="password2">
                    <label htmlFor="password2">Confirm password</label>
                    <input type="password" value={this.state.password2} id="password2" onChange={this.update('password2')} required />
                </div>
            )

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

                    {password2Input}
                    
                    <button onClick={this.handleSubmit} >{buttonText}</button>
                    
                </div>

                {sessionFormFooter}
            </form>
        )
    }
}

export default withRouter(SessionForm);
