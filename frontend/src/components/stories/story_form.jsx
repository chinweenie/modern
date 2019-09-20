import React from 'react'
import './editor.css';
import './quill.snow.css';
import './quill.bubble.css';
import ReactQuill from 'react-quill';
import {withRouter} from 'react-router-dom';

class StoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.story;

        this.modules = {
            toolbar: [
                [
                    {
                        'header': '1'
                    }, {
                        'header': '2'
                    }, {
                        'font': []
                    }
                ],
                [
                    {
                        size: []
                    }
                ],
                [
                    'bold', 'italic', 'underline', 'strike', 'blockquote'
                ],
                [
                    {
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }, {
                        'indent': '-1'
                    }, {
                        'indent': '+1'
                    }
                ],
                [
                    'link', 'image', 'video'
                ],
                ['clean']
            ]

        };

        this.formats = [
            'header',
            'font',
            'size',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'indent',
            'link',
            'image',
            'video'
        ];
        this.handleQuillChange = this
            .handleQuillChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    };

    handleQuillChange(value) {
        this.setState({body: value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this
            .props
            .action(this.state);
        this
            .props
            .history
            .push('/');
    };

    update(field) {
        return event => {
            this.setState({[field]: event.target.value})
        }
    };

    render() {
        return (
            <form className="story-form" onSubmit={this.handleSubmit}>
                <div className="profile-shadow"></div>
                <link href={"https://cdn.quilljs.com/1.3.6/quill.snow.css"} rel="stylesheet"/>
                <div className="border-title-head">
                    <div class="cursor">
                        <input
                            type="text"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.update('title')}
                            className="title-input"/>
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
     
                
                <button className="publish-button">Publish</button>
            </form>
        )
    };
}

export default withRouter(StoryForm);
