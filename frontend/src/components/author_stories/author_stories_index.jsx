import React, { Component } from 'react'
import LoadingIcon from '../loading_icon';

export default class AuthorStoriesIndex extends Component {
    constructor(props) {
        super(props)
    
    }

    toEditStory(storyId){
        return event => {
            this.props.history.push(`/api/stories/${storyId}/edit`)
        }
    }
    
    
    render() {
        let {stories} = this.props;

        if (stories,length === 0) {
            return (
                <div>
                    <p>You have not published any public stories yet</p>
                </div>
            )
        }

        const storiesLi = stories.map(story => {
            return (
                <li key={story.id}>
                    <h3>{story.title}</h3>
                    <p>Last edited 5 days ago</p>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                    <ul className="story-edit-options">
                        <li onClick={this.toEditStory(story.id)}>Edit draft</li>
                        <li onClick={this.props.deleteStory}>Delete draft</li>
                    </ul>
                </li>
            )
        })
        return (
            <div className="author-stories-index">
                <ul>
                    
                </ul>
            </div>
        )
    }
}

