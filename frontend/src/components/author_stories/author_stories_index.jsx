import React, { Component } from 'react'
import LoadingIcon from '../loading_icon';
import { Link } from 'react-router-dom';
import './author_stories_index.css';

export default class AuthorStoriesIndex extends Component {
    constructor(props) {
        super(props)
        this.displayOptions = this.displayOptions.bind(this)
    }

    displayOptions(event){
        event.preventDefault();
        const optionsUl = document.getElementById('toggle-ul');
        optionsUl.classList.toggle("hidden");
    }

    toEditStory(storyId){
        return event => {
            this.props.history.push(`/stories/${storyId}/edit`)
        }
    }

    todeleteStory(storyId){
        return event => {
            this.props.deleteStory(storyId).then(() => this.props.fetchStories());
        }
    }

    
    
    render() {
        let {stories} = this.props;
        
        if (!stories) {
            return (
                <div>
                    <LoadingIcon/>
                </div>
            )
        }

        let storiesLi;
        if (stories.length === 0){
            storiesLi = (
                <li>
                    <p>You have not published any public stories yet</p>
                </li>
            )
        } else {
            storiesLi = stories.map(story => {
                return (
                    <li key={story._id}>
                        <h3>{story.title}</h3>
                        <div>
                            Last edited 5 days ago
                        <i className="fa fa-caret-down" aria-hidden="true" onClick={this.displayOptions}></i>
                            <ul className="story-edit-options hidden" id="toggle-ul">
                                <li onClick={this.toEditStory(story._id)}>Edit draft</li>
                                <li onClick={this.todeleteStory(story._id)}>Delete draft</li>
                            </ul>
                        </div>


                    </li>
                )
            })
        }

        
        return (
            <div className="author-stories-index">
                <div>
                    <h1>Your stories</h1>
                    <span><Link to="/stories/new">Write a story</Link></span>
                </div>
    
                <ul>
                    {storiesLi}
                </ul>
            </div>
        )
    }
}

