import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import ResponseIndex from '../response/response_index_container';
import LoadingIcon from '../loading_icon';

class StoryShow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            responses: this.props.responses,
            claps: [],
            showingResponses: false,
        };
        this.props.stories || (this.props.fetchStories() && this.props.fetchAllUsers());
        this.handleClap = this.handleClap.bind(this);
        this.toggleResponses = this.toggleResponses.bind(this);
    }
    
    componentDidMount() {
        if(!this.props.stories)
            return;
        this.props.fetchStory(this.props.match.params.storyId);
        this.props.getTotalClaps(this.props.story._id).then(() => this.setState({claps: this.props.claps}));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.storyId !== this.props.match.params.storyId) {
            this.props.fetchStory(this.props.match.params.storyId);
        }
    }

    handleClap(e){
        e.preventDefault();
        this.props.patchAClap(this.props.story._id).then(() => this.setState({claps: this.props.claps}));
    }

    toggleResponses(){
        const responsesList = document.getElementById("responses");        
        responsesList.classList.toggle("hidden");
        this.setState({ showingResponses: !this.state.showingResponses })
    }
    render(){
        let { story, author } = this.props;
        
        if (!story || !author)
            return <LoadingIcon />
        
        const authorStoriesLi = author.stories.map(story => {
            return (
                <li key={story._id}>
                </li>
            )
        });
        const clapText = this.state.claps.includes(this.props.currentUser.id) ? "Unclap!" : "Clap!";
        const toggleResponsesBtnPrevix = this.state.showingResponses ? "Hide" : "See"
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
                <div>claps ({this.state.claps.length})</div>
                <button onClick={this.handleClap}>{clapText}</button>

                <div className="responses-dropdown">
                    <button id="toggle-responses" onClick={this.toggleResponses}>{toggleResponsesBtnPrevix} responses ({this.props.responses.length})</button>
                    <div id="responses" className="hidden">
                        <ResponseIndex storyId={this.props.match.params.storyId}/>
                    </div>
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
