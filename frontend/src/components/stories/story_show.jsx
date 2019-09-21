import React from 'react'
import LoadingIcon from '../loading_icon';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class StoryShow extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchStory(this.props.match.params.storyId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.storyId !== this.props.match.params.storyId) {
            this.props.fetchStory(this.props.match.params.storyId);
        }
    }

    render(){
        let { story, author } = this.props;
        if (!story || !author){
            return (
               <LoadingIcon/>
            )
        }

        const authorStoriesLi = author.stories.map(story => {
            return (
                <li key={story._id}>

                </li>
            )
        })

        debugger
        return (
            <div className="story-show">
                <div className="title">
                    <h1>{story.title}</h1>
                </div>

                <div className="story-body">
                    {ReactHtmlParser(story.body)}
                </div>

                <div className="claps-section">
                    
                </div>
                <div className="author-section">
                    <div className="author-profile-pic"></div>
                    <div className="author-bio">
                        <h2>{author.name}</h2>
                        <p>description comes here</p>
                    </div>
                </div>
                <div className="follow-btn"></div>

                <div className="responses-dropdown">
                    <button>See responses (15)</button>
                </div>

                <div className="suggested-stories">
                    <h3>More From Modern</h3>
                    <ul className="suggested-stories-ul">
                        {authorStoriesLi }
                    </ul>
                </div>

                
            </div>
        )
    }
}

export default StoryShow;
