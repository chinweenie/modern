import { combineReducers } from 'redux';
import profileReducer from './profile_reducer';
import storiesReducer from './stories_reducer';

const entitiesReducer = combineReducers({
    profile: profileReducer,
    stories: storiesReducer
});

export default entitiesReducer;