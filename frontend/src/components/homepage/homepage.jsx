import React from 'react'
import LoadingIcon from '../loading_icon';
import { withRouter } from 'react-router-dom';
import './homepage.css'
import defaultimg from './articledefault.jpg'

class HomePage extends React.Component {
    constructor(){
        super();
        this.handleStoryClick = this.handleStoryClick.bind(this);
    }

    handleStoryClick(storyId){
        return (event) => {
            this.props.history.push(`/stories/${storyId}`);
        } 
    }

    render(){

        let {stories} = this.props;

        if (!stories){
            return (
                <LoadingIcon />
            )
        }

        const storiesLi = stories.map(story => {
            const htmlObject = document.createElement('div');
            htmlObject.innerHTML = story.body;
            const imgTag = htmlObject.getElementsByTagName('img').length === 0 ? <img className="home-figure" src={defaultimg} alt={"no-image"} /> : <img className="home-figure" src={htmlObject.getElementsByTagName('img')[0].src} alt="image"/>
            
            return <li className="home-li" key={story._id} onClick={this.handleStoryClick(story._id)}>
                <p className="home-story-title">{story.title}</p>
                <p className="home-story-author"> -{story.authorName}</p>
                <figure className="home-figure"> {imgTag} </figure> 
            </li>
        })
        return (
            
            <div className="homepage-stories-ul">
                <ul>
                    
                    {/* <LoadingIcon /> */}
                    {storiesLi}
                </ul>
            </div>
        )
    }
}

export default withRouter(HomePage);