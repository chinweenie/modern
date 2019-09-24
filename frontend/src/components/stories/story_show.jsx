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
        }
        this.props.stories || (this.props.fetchStories() && this.props.fetchAllUsers());
        this.handleClap = this.handleClap.bind(this);
        this.toggleResponses = this.toggleResponses.bind(this);
    }
    
    componentDidMount() {
        const that = this;
        this.props.fetchStory(that.props.match.params.storyId).then(() => that.props.getTotalClaps(that.props.story._id).then(() => that.setState({ claps: that.props.claps} )))
        .then(() => that.props.fetchAll(that.props.author._id).then(response => {
            response.files = response.files || [];
            response.files.forEach(obj => {
                if (obj.filename === "profile")
                    this.setState({ profileURL: obj.URL });
            });
        }));
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
        
        const authorStoriesLi = author.stories.map(story => (<li key={story._id}></li>));

        const clapText = this.state.claps.includes(this.props.currentUser.id) ? "Unclap!" : "Clap!";
        const toggleResponsesBtnPrevix = this.state.showingResponses ? "Hide" : "See"
        return (
            <div className="story-show">
                <div className="story-title">
                    <h1>{story.title}</h1>
                </div>
                <div className="author-section">
                    <img src={this.state.profileURL} className="author-profile-picture" alt="profile" />
                    <span>{author.name}</span>
                </div>

                <div className="story-body">
                    {ReactHtmlParser(story.body)}
                </div>

                <div className="follow-btn"></div>
                
                <div className="clap-div" onClick={this.handleClap}>
                    <img src="/claps.png" alt="claps" />
                    <span>{clapText}</span>
                    <br/>
                    <span>claps ({this.state.claps.length})</span>
                </div>

                <div className="responses-dropdown">
                    <button onClick={this.toggleResponses}>{toggleResponsesBtnPrevix} responses ({this.props.responses.length})</button>
                </div>
                <div id="responses" className="hidden">
                    <ResponseIndex storyId={this.props.match.params.storyId}/>
                </div>

                <div className="suggested-stories">
                    <h3>More From Modern</h3>
                    <ul className="suggested-stories-ul">
                        {authorStoriesLi}
                    </ul>
                </div>
            </div>
        )
    }
}

export default StoryShow;
