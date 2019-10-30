import { connect } from 'react-redux';
import { createStory } from '../../actions/stories_actions';
import { getEmbedDocumentByURL } from '../../actions/embed_actions';
import StoryForm from './story_form';

const mapStateToProps = state => {
    const author = state.session.currentUser.id;
    const story = {id: '', title: '', titleHash: {}, author: author, body: ''};
    return {
        story: story,
    };
};

const mapDispatchToProps = dispatch => ({
    action: story => dispatch(createStory(story)),
    getEmbedDocumentByURL: URL => dispatch(getEmbedDocumentByURL(URL))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryForm);