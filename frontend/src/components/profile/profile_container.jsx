import { connect } from 'react-redux';
import Profile from './profile';
import { uploadFile, fetchAll, deleteFile } from '../../actions/file_actions';
import { getStoriesByUsernameAndId } from '../../actions/stories_actions';
import { fetchAllUsers } from '../../actions/users_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.currentUser;
    let stories = state.entities.stories
    if (Object.keys(stories).length === 0 && stories.constructor === Object)
        stories = [];
    return {
        currentUser: currentUser,
        followings: 2,
        fileURL: state.UI.files[currentUser.id],
        profileOwnerUsername: ownProps.match.params.username,
        stories: stories,
        users: state.entities.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadFile: file => dispatch(uploadFile(file)),
        fetchAll: user_id => dispatch(fetchAll(user_id)),
        deleteFile: (user_id, filename) => dispatch(deleteFile(user_id, filename)),
        getStoriesByUsernameAndId: user => dispatch(getStoriesByUsernameAndId(user)),
        fetchAllUsers: () => dispatch(fetchAllUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);