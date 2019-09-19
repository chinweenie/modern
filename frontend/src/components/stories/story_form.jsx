
import React, { Component } from 'react'

export default class StoryForm extends Component {
    constructor(props){
        super(props);
        this.state = this.props.story;
    };

    componentDidMount(){
        this.props.fetchStory(this.props.match.params.storyId);
    };
    
    handleSubmit(event){
        event.preventDefault();
        this.props.processForm(this.state);
    };

    update(field){
        return event => {
            this.setState({[field]: event.target.value})
        }
    };

    insertImageTag(event){
        event.preventDefault();
        return (
            <img src={event.target.value}/>
        )
    };

    insertVideoTag(){

    };

    insertEmbeddedLinkTag(event){
        event.preventDefault();
        return (
            <a href={event.target.value}></a>
        )
    };

    insertCodeSnippet(){

    };

    render() {
        return (
            <div>
                
            </div>
        )
    };
}

