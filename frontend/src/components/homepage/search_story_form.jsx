import React, { Component } from 'react'

export default class SearchStoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            index: 0,
        };
        this.selectName = this.selectName.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            let lastIdx = this.matches().length - 1;
            let index = this.state.index;
            if (e.key === "Enter") {
                document.getElementById(`match-${index}`).click();
            }
            if (e.key === "ArrowUp") {
                index--;
            } else if (e.key === "ArrowDown") {
                index++;
            }
            if (index < 0) {
                index = lastIdx;
            }
            else if (index > lastIdx)
                index = 0;
            this.setState({ index: index })
        });
        document.addEventListener("mouseover", (e) => {
            if (!e.target.firstChild || !e.target.firstChild.id)
                return;
            if (e.target.localName === "li") {
                let target = e.target.firstChild.id;
                this.setState({ index: parseInt(target.replace("match-", "")) });
            }
        });
    }
    handleInput(e) {
        this.setState({ inputVal: e.currentTarget.value });
    }
    matches() {
        const matches = [];
        if (this.state.inputVal.length === 0) {
            return [];
        }

        this.props.stockList.forEach(stock => {
            const sub = stock.slice(0, this.state.inputVal.length);
            if (sub.toLowerCase() === this.state.inputVal.toLowerCase()) {
                matches.push(stock);
            }
        });
        if (matches.length === 0) {
            matches.push('No matches');
        }
        return matches;
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
