import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import storyErrorsReducer from './story_errors_reducer';
import responseErrorsReducer from './response_errors_reducer';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    story: storyErrorsReducer,
    response: responseErrorsReducer
});
export default errorsReducer;