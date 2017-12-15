// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string, func, number } from 'prop-types';

import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

export default class Task extends Component {
    static propTypes = {
        children:    string,
        deleteBlock: func,
        index:       number,
        update:      func
    };

    state = {
        edit: false
    };

    // edit = () => {
    //     this.setState({ edit: true });
    // };
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

    handleTaskAppear = (task) => {
        fromTo(
            task,
            1,
            {
                y:         10,
                x:         0,
                opacity:   0.1,
                rotationY: 0,
                rotationX: 0,
                scale:     0.7
            },
            {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0,
                rotationX: 0,
                scale:     1
            }
        );
    };

    handleTaskDisappear = (task) => {
        fromTo(
            task,
            1,
            {
                y:         0,
                x:         0,
                opacity:   0.1,
                rotationY: 0,
                rotationX: 0,
                scale:     0.7
            },
            {
                y:         10,
                x:         0,
                opacity:   1,
                rotationY: 0,
                rotationX: 0,
                scale:     1
            }
        );
    };

    handleTextChange = (event) => {
        this.setState({
            inputText: event.target.value
        });
    };
    rendStatic = () => (
        <Transition
            appear
            in
            timeout = { 1000 }
            onEnter = { this.handleTaskAppear }
            onExit = { this.handleTaskDisappear }>
            <div className = { Styles.task }>
                <div className = { Styles.text }>{this.props.children}</div>
                <div>
                    <button className = { Styles.edit } onClick = { this.edit } />

                    <button className = { Styles.remove } onClick = { this.remove } />
                </div>
            </div>
        </Transition>
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
        return this.state.edit ? this.rendEdit() : this.rendStatic();
    }
}
