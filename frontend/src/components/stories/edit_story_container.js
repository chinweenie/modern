import { connect } from 'react-redux';
import { updateStory, fetchStory } from '../../actions/stories_actions';
import StoryForm from './story_form';
import React from 'react';
import { fetchAllUsers } from '../../actions/users_actions';

class EditStoryForm extends React.Component {

    componentDidMount(){
        this.props.fetchStory(this.props.match.params.storyId);
    }

    componentDidUpdate(prevProps){
        if (prevProps.match.params.storyId !== this.props.match.params.storyId){
            this.props.fetchStory(this.props.match.params.storyId);
        }
    }

    render(){
        let { story, action } = this.props;
        if (!story) {
            return (
                <div>
                    Loading...
                </div>
            )
        }

        return(
            <div>
                <StoryForm story={story} action={action}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    debugger
    const story = state.entities.stories[ownProps.match.params.storyId]
    return {
        story
    }
}

const mapDispatchToProps = dispatch => ({
    action: story => dispatch(updateStory(story)),
    fetchStory: storyId => dispatch(fetchStory(storyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryForm);