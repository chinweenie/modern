import { RECEIVE_PROFILE, RECEIVE_PROFILE_ERRORS, RECEIVE_STORIES } from '../actions/profile_actions';

// TODO: handle the response properly
const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PROFILE:
            return action.profile ;
        case RECEIVE_PROFILE_ERRORS:
            return action;
        case RECEIVE_STORIES:
            const stories = action.stories.map(o => { return { title: o.title, body: o.body } });
            return Object.assign({}, { stories: stories });
        default:
            return state;
    }
};

export default profileReducer;