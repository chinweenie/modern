import { connect } from 'react-redux';
import { fetchStory, fetchResponses, getTotalClaps, patchAClap } from '../../actions/stories_actions';
import StoryShow from './story_show';
import { selectStoryAuthor, selectResponsesArray } from '../../reducers/selectors';
import { fetchStories } from '../../actions/stories_actions';
import { fetchAllUsers } from '../../actions/users_actions';
import { fetchAll } from '../../actions/file_actions';


const mapStateToProps = (state, ownProps) => {
    const story = state.entities.stories[ownProps.match.params.storyId];
    if(story === undefined)
        return {};
    const author = selectStoryAuthor(state.entities.users, story);
    const responses = selectResponsesArray(state.entities.responses);
    const claps = state.entities.claps;
    const currentUser = state.session.currentUser;
    const authorProfileURL = state.UI.files[author._id]
    return {
        story,
        author,
        responses,
        claps,
        currentUser,
        authorProfileURL
    }

}

const mapDispatchToProps = dispatch => ({
    fetchStory: storyId => dispatch(fetchStory(storyId)),
    fetchResponses: storyId => dispatch(fetchResponses(storyId)),
    getTotalClaps: storyId => dispatch(getTotalClaps(storyId)),
    patchAClap: storyId => dispatch(patchAClap(storyId)),
    fetchStories: () => dispatch(fetchStories()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAll: author_id => dispatch(fetchAll(author_id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryShow)