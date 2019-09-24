import { connect } from 'react-redux';
import { deleteStory, fetchStories } from '../../actions/stories_actions';
import AuthorStoriesIndex from './author_stories_index';
import { selectAuthorStories } from '../../reducers/selectors';

const mapStateToProps = state => ({
    stories: selectAuthorStories(state.session.currentUser.id, state.entities.stories) 
});


const mapDispatchToProps = (dispatch) => ({
    deleteStory: storyId => dispatch(deleteStory(storyId)),
    fetchStories: () => dispatch(fetchStories())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorStoriesIndex);