import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class navbar extends React.Component {
    constructor(props){
        super(props);
    };

    

    render(){
        // let { navbar } = this.props;

                
        return (
            <ul className="navbar-ul">
                <li>Modern</li>
                <li><i className="fa fa-search" aria-hidden="true"></i></li>
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    navbar: Boolean(state.session.id)
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, null)(navbar));

