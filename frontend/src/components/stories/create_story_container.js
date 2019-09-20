import { connect } from 'react-redux';
import { createStory } from '../../actions/stories_actions';
import StoryForm from './story_form';

const mapStateToProps = state => {
    const author = state.session.currentUser.id;
    const story = {id: '', title: '', author: author, body: ''};

    return {
        story
    }
}

const mapDispatchToProps = dispatch => ({
    action: story => dispatch(createStory(story))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);