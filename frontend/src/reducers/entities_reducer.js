import { combineReducers } from 'redux';
import profileReducer from './profile_reducer';
const entitiesReducer = combineReducers({
    // users: usersReducer,
    profile: profileReducer

})

export default entitiesReducer;