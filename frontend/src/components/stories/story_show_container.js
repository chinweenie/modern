import { connect } from 'react-redux';
import { fetchStory } from '../../actions/stories_actions';
import StoryShow from './story_show';
import { selectStoryAuthor } from '../../reducers/selectors';
import { fetchAllUsers } from '../../actions/users_actions';

const mapStateToProps = (state, ownProps) => {
    const story = state.entities.stories[ownProps.match.params.storyId];
    const author = selectStoryAuthor(state.entities.users, story);
    return {
        story,
        author
    }

}

const mapDispatchToProps = dispatch => ({
    fetchStory: storyId => dispatch(fetchStory(storyId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryShow)