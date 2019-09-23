import { connect } from 'react-redux';
import React from 'react';
import { fetchCurrentUser, logout } from '../../actions/session_actions';
import { selectStoriesArray } from '../../reducers/selectors';
import { fetchStories } from '../../actions/stories_actions';
import HomePage from './homepage';

const mapStateToProps = state => {
    const stories = selectStoriesArray(state.entities.stories);
    return {
        stories
    }
}

const mapDispatchToProps = dispatch => ({
    fetchStories: () => dispatch(fetchStories())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
