import axios from 'axios';

export const updateStory = storyData => {
    return axios.patch(`/api/stories/${storyData.id}`, storyData);
};
