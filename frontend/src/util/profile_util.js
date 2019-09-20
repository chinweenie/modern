import axios from 'axios';

export const getProfileRequest = username => (
    axios.get(`/@${username}`)
);

export const fetchStoriesOfOneUser = currentUser => {
    return axios.get(`/@${currentUser.username}/stories/${currentUser.id}`);
};

export const updateStory = storyData => {
    return axios.patch(`/api/stories/${storyData.id}`, storyData);
};
