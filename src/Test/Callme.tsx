import React, { Component } from 'react';

class Callme extends Component {
    inputRef: any;
    constructor(props: any) {
        super(props);
        this.inputRef = React.createRef();  // Create a ref for the input
    }

    // Method to focus the input element
    focus = () => {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    };

    // Method to get the value of the input element
    getValue = () => {
        if (this.inputRef.current) {
            console.log(this.inputRef.current.value)
            return this.inputRef.current.value;
        }
        return '';
    };

    render() {
        return <input ref={this.inputRef} />;
    }
}

export default Callme;
