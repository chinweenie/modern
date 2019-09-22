import React from 'react'
import LoadingIcon from '../loading_icon';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './story_show.css';
import ResponseIndex from '../response/response_index_container';

class StoryShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            responses: this.props.responses
        };
    }
    
    componentDidMount() {
        this.props.fetchStory(this.props.match.params.storyId);
        // this.handleDisplayResponse();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.storyId !== this.props.match.params.storyId) {
            this.props.fetchStory(this.props.match.params.storyId);
        }
    }

    // handleDisplayResponse(){
    //     const responseForm = document.getElementById("response-form");
    //     const responseBtn = document.getElementById("response-btn");

    //     responseBtn.addEventListener("click", function (event) {
    //         event.preventDefault();
    //         responseForm.classList.toggle("hidden");
    //     });
    // }

    render(){
        let { story, author } = this.props;
        // let responses = this.state.responses;
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
        });

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
                    <button>See responses ({this.props.responses.length})</button>
                    <ResponseIndex storyId={this.props.match.params.storyId}/>

                {/* <div className="create-response">
                    <button id="response-btn" >Create new response</button>
                    <ResponseForm storyId={this.props.match.params.storyId} state={this.state}/>
                </div> */}
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
