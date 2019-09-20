import React from 'react'
import './editor.css';
import './quill.snow.css';
import './quill.bubble.css';
import ReactQuill from 'react-quill';


class StoryForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.story;

        this.modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
            ]
            
        };

        this.formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ];
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleQuillChange(value) {
        this.setState({ body: value })
    }
    
    handleSubmit(event){
        event.preventDefault();
        this.props.action(this.state);
    };

    update(field){
        return event => {
            this.setState({[field]: event.target.value})
        }
    };

    render() {
        return (
            <form className="story-form" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Title" value={this.state.title}
                 onChange={this.update('title')} className="title-input"/>
            
                <br/>
                <ReactQuill
                    theme="snow"
                    value={this.state.body}
                    onChange={this.handleQuillChange}
                    modules={this.modules}
                    formats={this.formats} />
                
                <button>Publish</button>
            </form>
        )
    };
}


export default StoryForm;

