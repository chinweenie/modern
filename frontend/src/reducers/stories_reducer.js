import { RECEIVE_ALL_STORIES, RECEIVE_STORY, REMOVE_STORY } from "../actions/stories_actions";

const storiesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newObject;
    switch (action.type) {
        case RECEIVE_ALL_STORIES:
            const storiesArray = action.stories;
            newObject = {};
            storiesArray.forEach(story => {
                newObject[story._id] = story
            });
            return newObject;
        case RECEIVE_STORY:
            return Object.assign({}, state, {
                [action.story._id]: action.story
            });
        case REMOVE_STORY:
            newObject = Object.assign({}, state);
            delete newObject[action.storyId];
            return newObject;
        default:
            return state;
    }
}

export default storiesReducer;







