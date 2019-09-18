import React from 'react';

class LoggedOutNavbar extends React.Component {
    render(){
        let {openModal} = this.props;
        return (
            <ul className="logged-out-navbar">
                <li><button onClick={() => openModal('login')}>Sign in</button></li>
                <li><button id="get-started-button" onClick={() => openModal('register')}>Get started</button></li>
            </ul>
        )
    }
}




export default LoggedOutNavbar;