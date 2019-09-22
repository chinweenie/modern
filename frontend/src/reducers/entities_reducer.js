import { combineReducers } from 'redux';
import profileReducer from './profile_reducer';
import storiesReducer from './stories_reducer';
import usersReducer from './users_reducer';
import embedReducer from './embed_reducer';
import responseReducer from './response_reducer';

const entitiesReducer = combineReducers({
    profile: profileReducer,
    stories: storiesReducer,
    responses: responseReducer,
    users: usersReducer,
    embed: embedReducer
});

export default entitiesReducer;