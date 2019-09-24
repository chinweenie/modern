import React from 'react'
import LoadingIcon from '../loading_icon';
import { withRouter } from 'react-router-dom';

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
                <LoadingIcon/>
            )
        }

        const storiesLi = stories.map(story => {
            const htmlObject = document.createElement('div');
            htmlObject.innerHTML = story.body;
            const imgTag = htmlObject.getElementsByTagName('img').length === 0 ? "" : <img src={htmlObject.getElementsByTagName('img')[0].src} alt="image"/>
            return <li key={story._id} onClick={this.handleStoryClick(story._id)}>
                {imgTag}
                <p>{story.title}</p>
                <p>{story.authorName}</p>
            </li>
        })
        return (
            <div className="homepage-stories-ul">
                <ul>
                    <LoadingIcon />
                    {storiesLi}
                </ul>
            </div>
        )
    }
}

export default withRouter(HomePage);