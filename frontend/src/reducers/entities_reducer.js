import { combineReducers } from 'redux';
import profileReducer from './profile_reducer';
import storiesReducer from './stories_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    profile: profileReducer,
    stories: storiesReducer,
    users: usersReducer
});

export default entitiesReducer;