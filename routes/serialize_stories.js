
const serializeStories = allStories => {
    const newArray = [];
    allStories.forEach(story => {

        newArray.push({
            _id: story._id,
            title: story.title,
            titleHash: story.titleHash,
            authorId: story.author._id,
            authorName: story.author.name,
            body: story.body
        })
    })
    return newArray;
}

module.exports = serializeStories;