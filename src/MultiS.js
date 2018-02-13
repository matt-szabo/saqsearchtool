import React from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

class MultiS extends React.Component {
    state = {
        removeSelected: true,
        disabled: false,
        stayOpen: false,
        value: [],
        rtl: false
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    handleSelectChange = (value) => {

        this.setState({ value });
        this.props.onSender(value);
    };


    render() {
        const {disabled, stayOpen, value } = this.state;

        return (
            <div className="section">
                <Select
                    closeOnSelect={!stayOpen}
                    disabled={disabled}
                    multi
                    onChange={this.handleSelectChange}
                    options={this.props.optns}
                    placeholder={this.props.ph}
                    removeSelected={this.state.removeSelected}
                    rtl={this.state.rtl}
                    simpleValue
                    value={value}
                />
            </div>
        );
    }
}

export default MultiS;
