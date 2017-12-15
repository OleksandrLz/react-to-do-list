// Core
import React, { Component } from 'react';

// Instruments
import Task from '../../components/Task';
import Styles from './styles';
const taskArr = [];

export default class Board extends Component {
    state = {
        tasks:       taskArr,
        taskItem:    '',
        filterTasks: {}
    };
    add = (text) => {
        const arr = taskArr;

        arr.push(text);
        this.setState({ tasks: arr });
    };
    deleteBlock = (i) => {
        const arr = taskArr;

        arr.splice(i, 1);
        this.setState({ tasks: arr });
    };
    updateText = (text, i) => {
        const arr = taskArr;

        arr[i] = text;
        this.setState({ tasks: arr });
    };
    handleTextAreaChange = (event) => {
        const { value: taskItem } = event.target;

        this.setState(() => ({ taskItem }));
    };
    eachTask = (item, i) => (
        <Task
            deleteBlock = { this.deleteBlock }
            index = { i }
            key = { i }
            update = { this.updateText }>
            {item}
        </Task>
    );

    addTaskList = () => {
        const { taskItem } = this.state;

        if (!taskItem) {
            return;
        }
        this.add(taskItem);
        this.setState(() => ({ taskItem: '' }));
    };
    handleKeyPress = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this.setState({ taskItem: '' });
            this.addTaskList();
        }
    };

    handleSearch = (event) => {
        const { tasks } = this.state;
        const searchTask = event.target.value.toLowerCase();
        const displayedTasks = tasks.filter((el) => {
            const searchValue = el.toLowerCase();

            return searchValue.indexOf(searchTask) !== -1;
        });

        this.setState({
            tasks: displayedTasks
        });
    };

    render () {
        const { taskItem } = this.state;

        return (
            <div className = { Styles.board }>
                <header>
                    <h1>To Do List</h1>
                    <input
                        className = { Styles.search }
                        placeholder = 'Search'
                        type = 'text'
                        onChange = { this.handleSearch }
                    />
                </header>

                <div className = { Styles.taskItems }>
                    {this.state.tasks.map(this.eachTask)}
                </div>

                <div className = { Styles.newTask }>
                    <input
                        autoFocus
                        placeholder = 'Write here'
                        value = { taskItem }
                        onChange = { this.handleTextAreaChange }
                        onKeyPress = { this.handleKeyPress }
                    />
                    <button onClick = { this.addTaskList }>Add Task</button>
                </div>
            </div>
        );
    }
}
