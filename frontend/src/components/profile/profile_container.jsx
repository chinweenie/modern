import { connect } from 'react-redux';
import Profile from './profile';
import { uploadFile, fetchAll, deleteFile } from '../../actions/file_actions';
import { getProfile, getStories } from '../../actions/profile_actions';

const mapStateToProps = (state, ownProps) => {
    const currentUser = state.session.currentUser;
    const stories = state.entites.profile ? state.entites.profile.stories : [];
    return {
        currentUser: currentUser,
        followings: 2,
        fileURL: state.UI.files[currentUser.id],
        profileOwnerUsername: ownProps.match.params.username,
        stories: stories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uploadFile: file => dispatch(uploadFile(file)),
        fetchAll: user_id => dispatch(fetchAll(user_id)),
        getProfile: username => dispatch(getProfile(username)),
        deleteFile: (user_id, filename) => dispatch(deleteFile(user_id, filename)),
        getStories: user => dispatch(getStories(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);