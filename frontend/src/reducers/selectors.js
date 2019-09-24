export const selectStoryAuthor = (allUsers, story) => {
    const authorId = story.authorId;
    let author;
    const usersArray = Object.keys(allUsers).map(id => allUsers[id]);
    usersArray.forEach(user => {
        if (user._id === authorId){
            author = user;
        }
    });
    return author;
};

export const selectResponsesArray = (allResponses) => (
    (Object.keys(allResponses).length === 0 && allResponses.constructor === Object) ? [] : allResponses
);

export const selectStoriesArray = (allStories) => {
    return Object.keys(allStories).map(id => allStories[id]);
}

export const selectStoriesTitles = allStories => {
    const storiesArray = Object.keys(allStories).map(id => allStories[id]);
    const titles = [];
    storiesArray.forEach(story => {
        titles.push(story.title);
    })
    return titles;
}