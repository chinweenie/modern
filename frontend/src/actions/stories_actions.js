import * as StoriesApiUtil from '../util/stories_api_util';
export const RECEIVE_ALL_STORIES = 'RECEIVE_ALL_STORIES';
export const RECEIVE_STORY = 'RECEIVE_STORY';
export const REMOVE_STORY = 'REMOVE_STORY';
export const RECEIVE_STORIES_ERRORS = 'RECEIVE_STORIES_ERRORS';

export const receiveAllStories = stories => ({
    type: RECEIVE_ALL_STORIES,
    stories
});

export const receiveStory = story => ({
    type: RECEIVE_STORY,
    story
});

export const removeStory = story => ({
    type: REMOVE_STORY,
    storyId: story.id
});

export const receiveStoriesErrors = errors => ({
    type: RECEIVE_STORIES_ERRORS,
    errors
});

export const fetchStories = () => dispatch => {
    return StoriesApiUtil.fetchStories()
        .then(response => (dispatch(receiveAllStories(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ));
};

export const fetchStoriesOfOneUser = (user_id) => dispatch => {
    return StoriesApiUtil.fetchStories(user_id)
        .then(response => (dispatch(receiveAllStories(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ));
};

export const fetchStory = storyId => dispatch => {
    return StoriesApiUtil.fetchStory(storyId)
        .then(response => (
            dispatch(receiveStory(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ));
};

export const createStory = storyData => dispatch => {
    return StoriesApiUtil.createStory(storyData)
        .then(response => (
            dispatch(receiveStory(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ))
};

export const updateStory = storyData => dispatch => {
    return StoriesApiUtil.updateStory(storyData)
        .then(response => (
            dispatch(receiveStory(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ))
};

export const deleteStory = storyId => dispatch => {
    return StoriesApiUtil.deleteStory(storyId)
        .then(response => (
            dispatch(removeStory(response.data))
        ), error => (
            dispatch(receiveStoriesErrors(error.response.data))
        ))
};

