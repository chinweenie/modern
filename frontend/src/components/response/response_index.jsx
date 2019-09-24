import React from 'react';
import ReactQuill from 'react-quill';
import LoadingIcon from '../loading_icon';
import ReactHtmlParser from 'react-html-parser';


class ResponseIndex extends React.Component {
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
            },
            responses: this.props.responses
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

    componentDidMount() {
        this.props.fetchResponses(this.props.storyId).then(() => this.setState({ responses: this.props.responses }));
        // this.handleDisplayResponse();
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.storyId !== this.props.storyId) {
    //         this.props.fetchResponses(this.props.storyId);
    //     }
    // }

    handleQuillChange(value) {
        this.setState({ body: value })
    }

    handleSubmit(event) {
        event.preventDefault(); 
        this.props.action(this.props.storyId, this.state).then(res => {
            this.setState({ responses: res.responses, body: "" })  
        });
        this.props.fetchResponses(this.props.storyId).then(res => {
            this.setState({ responses: res.responses.responses, body: "" })
        });
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
        let { responses } = this.state;

        if (!responses){
            return <LoadingIcon/>
        }
        const responsesLi = responses.map(response => {
            return (
                <li key={response._id}>
                    {ReactHtmlParser(response.body)}
                </li>
            )
        })

        return (
            <div className="response-index">

                <div className="responses">
                    {responsesLi}
                </div>

                <div>
                    <form id="response-form" onSubmit={this.handleSubmit}>
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
                </div>
                
            </div>
            
        )
    };
}


export default ResponseIndex;




