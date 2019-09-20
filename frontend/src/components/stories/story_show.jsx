import React from 'react'

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
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div className="story-show">

            </div>
        )
    }
}
