import React from 'react';
import ReactQuill from 'react-quill';
import {withRouter} from 'react-router-dom';

class StoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.story, {
            embed: {
                title: "",
                description: "",
                url: "",
                image: ""
        }});
        this.handleQuillChange = this.handleQuillChange.bind(this);

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
        this.handleEmbedForm = this.handleEmbedForm.bind(this)
    }

    handleQuillChange(value) {
        this.setState({ body: value });
    }
    makeTitlesHash(str) {
        const hash = {};
        str.split("").forEach(c => {
            c = c.toLowerCase();
            hash[c] = hash[c] || 0;
            hash[c]++;
        });
        return hash;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ titleHash: this.makeTitlesHash(this.state.title)});
        this.props.action(this.state);
        this.props.history.push('/');
    }
    handleEmbedForm(e){
        e.stopPropagation();
        this.props.getEmbedDocumentByURL(document.getElementById("URL").value)
        .then(response => {
            this.setState({ embed: response.embed })
        });
    }

    update(field) {
        return event => {
            this.setState({[field]: event.target.value})
        }
    }

    render() {
        return (
            <form className="story-form" onSubmit={this.handleSubmit}>
                <div className="profile-shadow"></div>
                <link href={"https://cdn.quilljs.com/1.3.6/quill.snow.css"} rel="stylesheet"/>
                <div className="border-title-head">
                    <div className="cursor">
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

                <label>
                    Input a URL to embed a wepage:
                    <input type="text" id="URL" />
                    <span type="submit" value="Embed" onClick={this.handleEmbedForm}>click to embed</span>
                </label>

                <ReactQuill
                    theme="snow"
                    value={this.state.body}
                    onChange={this.handleQuillChange}
                    modules={this.modules}
                    formats={this.formats} >
                    {/* place holder, when there's an embed item, replace it with the div */}
                </ReactQuill>
                    <div id="embed">
                    <div className="embed-left">
                        <p className="embed-title">{this.state.embed.title}</p>
                        <p className="embed-description">{this.state.embed.description}</p>
                        <p className="embed-url">{this.state.embed.url}</p>
                    </div>
                    <div className="embed-right">
                        <img className="embed-image" src={this.state.embed.image} alt=""/>
                    </div>
                    </div>

                <button className="publish-button">Publish</button>
            </form>
        )
    };
}

export default withRouter(StoryForm);
