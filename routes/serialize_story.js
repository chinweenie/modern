
const serializeStory = story => {  
        return {
            _id: story._id,
            title: story.title,
            authorId: story.author._id,
            authorName: story.author.name,
            body: story.body
        };
}

module.exports = serializeStory;