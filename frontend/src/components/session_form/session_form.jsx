import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { email: "", name: "", password: ""};
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    handleDemo(e) {
        e.preventDefault();
        this.state = {
            username: "",
            email: "",
            password: ""
        };
        const email = 'demouser@modern.com'.split('');
        this.handleDemoUsername(email);
    }
    handleDemoUsername(email) {
        setTimeout(() => {
            this.setState({ email: this.state.email + email.shift() }, () => {
                if (email.length === 0) {
                    const password = 'password'.split('');
                    this.handleDemoPassword(password);
                } else {
                    this.handleDemoUsername(email);
                }
            });
        }, 150);
    }
    handleDemoPassword(password) {
        setTimeout(() => {
            this.setState({ password: this.state.password + password.shift() }, () => {
                if (password.length === 0) {
                    this.props.login(this.state)
                        .then(() => this.props.fetchAllUsers())
                        .then(() => this.props.history.push('/'));
                    this.props.closeModal();
                } else {
                    this.handleDemoPassword(password);
                }
            });
        }, 150);
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.closeModal();
        if(this.props.formType === "Signup"){
            this.props.signup(this.state)
            .then(() => this.props.fetchAllUsers())
            .then(() => this.props.history.push('/'));
            }
        else{
            this.props.login(this.state)
            .then(() => this.props.fetchAllUsers())
            .then(() => this.props.history.push('/'));
        }
    }

    handleClose(e) {
        e.preventDefault();
        this.props.closeModal();
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
        let disclaimer;
        let demo;

        if (formType === 'Login'){
            sessionFormHeader = (
                <header className="form-header">
                  <h1 className="form-heading">Welcome back.</h1>
                  <p className="form-bio">Sign in to get personalized story recommendations, follow authors and topics you love, and interact with stories.</p>
                </header>
            );

            optionalInputField = '';

            password2Input = '';

            sessionFormFooter = (
                <footer className="session-form-footer">
                    <p>No account?</p>
                    <div> &nbsp; </div>
                    {this.props.otherForm}
                </footer>
                
            );
            buttonText = "Log In";

            disclaimer= (
                <div>
                    <p className="disclaimer">To make Modern work, we log user data and share it with service providers.
                        Click “Sign up” above to accept Modern’s Terms of Service & Privacy Policy.</p>
                </div>
            );

            demo= (
                <div className="container">
                    <div className="center">
                        <button className="btn" onClick={this.handleDemo}>
                            <svg className="modal-svg" width="150px" height="35px" viewBox="0 0 150 35" >
                                <polyline points="149,1 149,34 1,34 1,1 149,1" className="bg-line" />
                                <polyline points="149,1 149,34 1,34 1,1 149,1" className="hl-line" />
                            </svg>
                            <span>Demo Modern</span>
                        </button>
                    </div>
                </div>
            );


        } else {
            sessionFormHeader = (
                <heading className="signup-form-header">
                  <h1 className="form-heading">Join Modern.</h1>
                  <p className="form-bio">Create an account to receive great stories in your inbox, personalize your homepage, and follow authors and topics that you love.</p>
                </heading>
            );

            optionalInputField = (
                    <div className="login">
                    <input 
                        className="login-input" 
                        type="text" 
                        value={this.state.name} 
                        id="name" 
                        onChange={this.update('name')} 
                        placeholder="Fullname"
                        required/>
                    </div>
            );

            password2Input = (
                <div className="login">
                    <input 
                        className="login-input" 
                        type="password" 
                        value={this.state.password2} 
                        id="password2" 
                        onChange={this.update('password2')} 
                        placeholder="Confirm Password"
                        required />
                </div>
            )

            sessionFormFooter = (
                <footer className="session-form-footer">
                    <p className="footer-bio">Already have an account? </p>
                    <div> &nbsp; </div>
                    {this.props.otherForm}
                </footer>
            );
            buttonText = "Sign Up";
        }
        return (
            <form className="session-form" onSubmit={this.handleSubmit}>
                <span className='modal-close-button' onClick={this.handleClose}>{String.fromCharCode(10005)}</span>
                {sessionFormHeader}

                <div className="session-form-inputs">
                    {errorsLi}
                    <div className="login">
                        <input 
                            className="login-input" 
                            type="email" 
                            value={this.state.email} 
                            id="email" 
                            onChange={this.update('email')} 
                            placeholder="Email"
                            required />
                    </div>

                    {optionalInputField}

                    <div className="login">
                        <input 
                            className="login-input" 
                            type="password" 
                            value={this.state.password} 
                            id="password" 
                            onChange={this.update('password')} 
                            placeholder="Password"
                            required/>
                    </div>

                    {password2Input}
                    <button className="session-submit">{buttonText}</button>
                    
                </div>

                {sessionFormFooter}
                {disclaimer}
                {demo}
            </form>
        )
    }
}

export default withRouter(SessionForm);
