// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string, func, number } from 'prop-types';

export default class Task extends Component {
    static propTypes = {
        children:    string,
        deleteBlock: func,
        index:       number,
        update:      func
    };

    state = {
        edit:   false,
        remove: true
    };

    edit = () => {
        this.setState({
            edit:      true,
            inputText: this.props.children
        });
    };

    remove = () => {
        this.props.deleteBlock(this.props.index);
    };

    save = () => {
        this.props.update(this.state.inputText, this.props.index);
        this.setState({ edit: false });
    };

    handleTextChange = (event) => {
        this.setState({
            inputText: event.target.value
        });
    };

    rendStatic = () => (
        <div className = { Styles.task }>
            <div className = { Styles.text }>{this.props.children}</div>
            <div>
                <button className = { Styles.edit } onClick = { this.edit } />

                <button className = { Styles.remove } onClick = { this.remove } />
            </div>
        </div>
    );
    rendEdit = () => (
        <div className = { Styles.task }>
            <input
                autoFocus
                value = { this.state.inputText }
                onChange = { this.handleTextChange }
            />
            <button className = { Styles.save } onClick = { this.save }>
                Save
            </button>
        </div>
    );

    render () {
        const test = this.state.edit ? this.rendEdit() : this.rendStatic();

        return <div>{test}</div>;
    }
}
