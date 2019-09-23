import { RECEIVE_STORIES_ERRORS, 
    RECEIVE_STORY, 
    RECEIVE_ALL_STORIES,  } from "../actions/stories_actions";


const storyErrorsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_STORIES_ERRORS:
            return action.errors;
            
        case RECEIVE_STORY:
            return [];
            
        case RECEIVE_ALL_STORIES:
            return [];
    
        default:
            return [];
    }
}

export default storyErrorsReducer;