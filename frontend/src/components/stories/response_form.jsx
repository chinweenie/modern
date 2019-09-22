import React from 'react'
import './quill.snow.css';
import './quill.bubble.css';
import ReactQuill from 'react-quill';
import { createResponse } from '../../actions/stories_actions';
import { connect } from 'react-redux';

class ResponseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, {
            body: '',
        }, {
            embed: {
                title: "",
                description: "",
                url: "",
                image: ""
            }
        });

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
        this.handleQuillChange = this.handleQuillChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmbedForm = this.handleEmbedForm.bind(this)
    }

    handleQuillChange(value) {
        this.setState({ body: value })
    }

    handleSubmit(event) {
        event.preventDefault();
        debugger;
        this.props.action(this.props.storyId, this.state);
    }

    handleEmbedForm(e) {
        e.stopPropagation();
        this.props.getEmbedDocumentByURL(document.getElementById("URL").value)
            .then(response => {
                this.setState({ embed: response.embed })
            });
    }

    update(field) {
        return event => {
            this.setState({ [field]: event.target.value })
        }
    }

    render() {
        return (
            <form id="response-form" className="hidden" onSubmit={this.handleSubmit}>
                <div className="profile-shadow"></div>
                <link href={"https://cdn.quilljs.com/1.3.6/quill.snow.css"} rel="stylesheet" />
                <div className="border-title-head">
                    <div className="cursor">
                    </div>
                </div>
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

                {/* <div id="embed">
                    <p>title:{this.state.embed.title}</p>
                    <p>description{this.state.embed.description}</p>
                    <img src={this.state.embed.image} />
                    <p>url: {this.state.embed.url}</p>
                </div> */}


                <button className="publish-button">Publish</button>
            </form>
        )
    };
}

const mapDispatchToProps = (dispatch)=> ({
    action: (storyId, response) => dispatch(createResponse(storyId, response))
});

export default connect(null, mapDispatchToProps)(ResponseForm);