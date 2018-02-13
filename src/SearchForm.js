import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {search: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({search: event.target.value});
    }


    handleSubmit(event) {
        this.props.onSubmit(this.state.search);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>

                        <input type="text" value={this.state.search} onChange={this.handleChange} />

                        <div>
                            <button>Search</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}




export default SearchForm;