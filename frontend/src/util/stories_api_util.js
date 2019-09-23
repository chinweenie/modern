import axios from 'axios';

export const fetchStories = () => {
    return axios.get('./api/stories');
};

export const fetchStory = storyId => {
    return axios.get(`/api/stories/${storyId}`);
};

export const createStory = storyData => {
    return axios.post('/api/stories', storyData);
};

export const updateStory = storyData => {
    return axios.patch(`/api/stories/${storyData._id}`, storyData);
};

export const deleteStory = storyId => {
    return axios.delete(`/api/stories/${storyId}`);
};

export const fetchStoriesOfOneUser = user => {
    return axios.get(`/@${user.username}/stories/${user.id}`);
};

export const createResponse = (storyId, response) => {
    
    return axios.post(`/api/stories/responses/${storyId}`, response);
};

export const fetchResponses = storyId => {
    return axios.get(`api/stories/responses/${storyId}`);
};

export const getClaps = storyId => {
    return axios.get(`api/stories/claps/${storyId}`);
};

export const patchClap = storyId => {
    return axios.patch(`api/stories/claps/${storyId}`);
};