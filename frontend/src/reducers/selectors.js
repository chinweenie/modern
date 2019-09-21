export const selectStoryAuthor = (allUsers, story) => {
    debugger
    const authorId = story.author;
    let author;
    const usersArray = Object.keys(allUsers).map(id => allUsers[id]);
    usersArray.forEach(user => {
        if (user._id == authorId){
            author = user;
        }
    });
    return author;
}

