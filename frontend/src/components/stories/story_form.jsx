import React from 'react'
import './editor.css';
import './quill.snow.css';
import ReactQuill from 'react-quill';


class StoryForm extends React.Component {
    constructor(props){
        super(props);
        this.state = Object.assign({
            imageUrl: undefined,
            imageFile: undefined
        }, this.props.story);

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
    };

    handleQuillChange(value) {
        this.setState({ body: value })
    }
    
    // handleSubmit(event){
    //     event.preventDefault();
    //     this.props.processForm(this.state);
    // };

    update(field){
        return event => {
            this.setState({[field]: event.target.value})
        }
    };

    render() {
        return (
            <div className="story-form">
                <div className="profile-shadow"></div>
                <link href={"https://cdn.quilljs.com/1.3.6/quill.snow.css"} rel="stylesheet" />
                <div className="border-title-head">
                <div class="cursor">
                <input type="text" placeholder="Title" value={this.state.title}
                 onChange={this.update('title')} className="title-input"/>
                    <i></i>
                </div>
                </div>
                <br/>
                <ReactQuill
                    theme="snow"
                    value={this.state.body}
                    onChange={this.handleQuillChange}
                    modules={this.modules}
                    formats={this.formats} />
                    
            </div>
        )
    };
}


export default StoryForm;

