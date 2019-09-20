import axios from 'axios';

export const fetchStoriesOfOneUser = user => {
    return axios.get(`/@${user.username}/stories/${user.id}`);
};

export const updateStory = storyData => {
    return axios.patch(`/api/stories/${storyData.id}`, storyData);
};
