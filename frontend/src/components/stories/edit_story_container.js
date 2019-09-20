import { connect } from 'react-redux';
import { updateStory } from '../../actions/stories_actions';
import StoryForm from './story_form';
import React from 'react';

class EditStoryForm extends React.Component {
    constructor(){
        super();
        this.state
    }
}

const mapStateToProps = (state, ownProps) => {
    const story = state.entities.stories[ownProps.match.params.storyId]
    return {
        story
    }
}

const mapDispatchToProps = dispatch => ({
    action: story => dispatch(updateStory(story))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);