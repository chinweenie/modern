import { connect } from 'react-redux';
import { fetchStory, fetchResponses } from '../../actions/stories_actions';
import StoryShow from './story_show';
import { selectStoryAuthor, selectResponsesArray } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
    const story = state.entities.stories[ownProps.match.params.storyId];
    const author = selectStoryAuthor(state.entities.users, story);
    const responses = selectResponsesArray(state.entities.responses);
    return {
        story,
        author,
        responses
    }

}

const mapDispatchToProps = dispatch => ({
    fetchStory: storyId => dispatch(fetchStory(storyId)),
    fetchResponses: storyId => dispatch(fetchResponses(storyId))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryShow)