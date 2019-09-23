import React from 'react'
import {Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import './search.css';

class SearchForm extends React.Component {
    constructor(props){
        super(props);
        //props: hash to compare
        this.state = {
            inputVal: "",
            index: 0,
            match: []
        };
        this.update = this.update.bind(this);        
        this.handleBoldText = this.handleBoldText.bind(this);
        this.addEventListenerEverywhereExceptSearchForm();
    }

    update(event){
        event.preventDefault();
        this.setState({
            inputVal: event.currentTarget.value,
        })
        this.setState({match: []});
        const input = event.currentTarget.value.toLowerCase().split("");
        Object.keys(this.props.hashesToCompare).map(title => {
            for(let i = 0; i < input.length; i++){
                if (!this.props.hashesToCompare[title][input[i]]){
                    return [];
                }
            }
            this.state.match.push(title);
        });
    }
    
    addEventListenerEverywhereExceptSearchForm(){
        document.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id !== 'search-form'){
                this.setState({ match: [] });
                document.getElementById('search-form').classList.toggle('hidden-search')
            }
        });
    }
    
    handleBoldText(str){
        const handled = [];
        for (let i = 0; i < str.length; i++) {
            if (this.state.inputVal.toLowerCase().includes(str[i].toLowerCase()))
                handled.push(`<strong>${str[i]}</strong>`);
            else
                handled.push(str[i]);
        }
        return ReactHtmlParser(handled.join(""));
    }
            
    render(){
        let searchResults = this.state.match.map((result, i) => {
            const handledResult = this.handleBoldText(result);
            return <li key={i} onClick={this.selectName} className={i == this.state.index ? "selected" : ""}><Link to={`/`} id={`match-${i}`}>{handledResult}</Link></li>
        });
        searchResults = <ul className="z-index-5">{searchResults}</ul>



        return (
            <form className="search" id="search-form">
                <input type="text" onChange={this.update}/>
                {searchResults}
            </form>
        )
    }
}

export default SearchForm;