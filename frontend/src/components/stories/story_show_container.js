import { connect } from 'react-redux';
import { fetchStory } from '../../actions/stories_actions';
import StoryShow from './story_show';

const mapStateToProps = (state, ownProps) => ({
    story: state.entities.stories[ownProps.match.params.storyId]
})

const mapDispatchToProps = dispatch => ({
    fetchStory: storyId => dispatch(fetchStory(storyId))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryShow)