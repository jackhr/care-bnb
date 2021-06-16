import React, {Component} from 'react';
import propTypes from 'prop-types';

export class Autocomplete extends Component {
    static propTypes = {};
    static defaultProperty = {
        suggestions: []
    };

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        };
    }

    render() {

        let {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        this.handleSubmit = (e) => {
            const filters = this.state.userInput;
            //will need to finish building this handleSubmit function to pass filters as form data to backend route
        };

        onChange = (e) => {
            const {suggestions} = this.props;
            const userInput = e.currentTarget.value;

            const filteredSuggestions = suggestions.filter((suggestion) => 
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1 );

            this.setState({
                activeSuggestion: 0,
                filteredSuggestions,
                showSuggestions: true,
                userInput: e.currentTarget.value
            });
        };

        onClick = (e) => {
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: e.currentTarget.innerText
            });
        };

        onKeyDown = e => {
            const { activeSuggestion, filteredSuggestions } = this.state;

            if(e.keyCode === 13) {
                this.setState({ ...this.state, 
                    activeSuggestion: 0,
                    showSuggestions: false,
                    userInput: filteredSuggestions[activeSuggestion]
                });
            } else if (e.keyCode === 38) {
                if(activeSuggestion === 0){
                    return;
                }
                this.setState({ ...this.state, activeSuggestion: activeSuggestion - 1});
            } else if (e.keyCode === 40) {
                if (activeSuggestion - 1 === filteredSuggestions.length) {
                    return;
                }
                this.setState({ ...this.state, activeSuggestion: activeSuggestion + 1});
            }
        };

        let suggestionsListComponent;
            if (showSuggestions && userInput) {
                if (filteredSuggestions.length) {
                    suggestionsListComponent = (
                        <ul class="suggestions">
                            {filteredSuggestions.map((suggestion, index) => {
                                return (
                                    <li key={suggestion} onClick={onClick}>
                                        {suggestion}
                                    </li>
                                );
                            })}
                        </ul>
                    );
                } else {
                    suggestionsListComponent = (
                        <div class="no-suggestions">
                            <em>No Suggestions!</em>
                        </div>
                    );
                }
            }

        return ( 
        <>
            <form>
                <input placeholder={this.props.placeholder} type="text" onChange={onChange} onKeyDown={onKeyDown} value={userInput} />
                {suggestionsListComponent}
                <input value="search" type="button" onClick={this.handleSubmit} />

                {/* store each userInput into an object of "selections" once a matching autocomplete item has been made */}
                {/* pass this state variable to GET route */}
                {/* on backend, parse GET route object to a mongoose database query User.find({ 'pet':true, 'drive': true, etc etc }) */}
            </form>
        </>
        );
    }
}

export default Autocomplete;