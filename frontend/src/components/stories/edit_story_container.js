import { connect } from 'react-redux';
import { updateStory, fetchStory } from '../../actions/stories_actions';
import { getEmbedDocumentByURL } from '../../actions/embed_actions';
import StoryForm from './story_form';
import React from 'react';

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
                <StoryForm story={story} action={action} getEmbedDocumentByURL={getEmbedDocumentByURL}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const story = state.entities.stories[ownProps.match.params.storyId]
    return {
        story: story,
    }
};

const mapDispatchToProps = dispatch => ({
    action: story => dispatch(updateStory(story)),
    fetchStory: storyId => dispatch(fetchStory(storyId)),
    getEmbedDocumentByURL: URL => dispatch(getEmbedDocumentByURL(URL))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryForm);