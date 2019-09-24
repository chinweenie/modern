import React from 'react'
import LoadingIcon from '../loading_icon';
import { withRouter } from 'react-router-dom';
import defaultimg from './articledefault.jpg';

class HomePage extends React.Component {
    constructor(){
        super();
        this.handleStoryClick = this.handleStoryClick.bind(this);
        this.tagSelector = this.tagSelector.bind(this);
    }

    handleStoryClick(storyId){
        return (event) => {
            this.props.history.push(`/stories/${storyId}`);
        } 
    }
    tagSelector(htmlObject){
        const paragraphArr = htmlObject.getElementsByTagName("p");
        const filtered = [];
        for(let i = 0; i < paragraphArr.length && filtered.length < 2; i++){
            let p = paragraphArr[i].innerHTML;
            if(p.includes("<img") || p.includes("<br")){
                continue;
            }
            filtered.push(paragraphArr[i].innerHTML);
        }
        return <ul>{filtered.map((el, idx) => (<li key={idx}>{el}</li>))}</ul>
    }
    render(){
        let {stories} = this.props;

        if (stories.length === 0)
            return (<LoadingIcon />)
        
        const storiesLi = stories.map(story => {
            const htmlObject = document.createElement('div');
            htmlObject.innerHTML = story.body;
            const imgTag = htmlObject.getElementsByTagName('img').length === 0 ? <img className="home-figure" src={defaultimg} alt={"404"} /> : <img className="home-figure" src={htmlObject.getElementsByTagName('img')[0].src} alt="404"/>
            const paragraph = this.tagSelector(htmlObject);
            return <li className="home-li" key={story._id} onClick={this.handleStoryClick(story._id)}>
                <p className="home-story-title">{story.title}</p>
                <p className="home-story-author"> -{story.authorName}</p>
                <figure className="home-figure"> {imgTag} </figure>
                {paragraph}
            </li>
        })
        
        return (
            
            <div className="homepage-stories-ul">
                <ul>
                    {storiesLi}
                </ul>
            </div>
        )
    }
}

export default withRouter(HomePage);