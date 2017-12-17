// Core
import React, { Component } from 'react';
import { fromTo } from 'gsap';
import { Transition, TransitionGroup } from 'react-transition-group';

// Instruments
import Task from '../../components/Task';
import Styles from './styles';

export default class Board extends Component {
    state = {
        tasks:       ['task1', 'task2', 'task3'],
        searchTasks: [],
        taskItem:    '',
        taskChange:  true,
        filter:      ''
    };
    add = (text) => {
        const { tasks } = this.state;
        const arr = tasks;

        arr.push(text);
        this.setState({ tasks: arr });
    };
    deleteBlock = (i) => {
        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task, index) => i !== index)
        }));
    };
    updateText = (text, i) => {
        const { tasks } = this.state;
        const arr = tasks;

        arr[i] = text;
        this.setState({ tasks: arr });
    };
    handleTextAreaChange = (event) => {
        const { value: taskItem } = event.target;

        console.log(taskItem);
        this.setState(() => ({ taskItem }));
    };

    addTaskList = () => {
        const { taskItem, tasks } = this.state;

        if (!taskItem) {
            return;
        }

        this.setState(() => ({
            tasks:    [...tasks, taskItem],
            taskItem: ''
        }));
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
        const { value: filter } = event.target;

        this.setState({ filter });
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
                opacity:   1,
                rotationY: 0,
                rotationX: 0,
                scale:     1
            },
            {
                y:         10,
                x:         0,
                opacity:   0.1,
                rotationY: 0,
                rotationX: 0,
                scale:     0.7
            }
        );
    };

    render () {
        const { taskItem, filter } = this.state;
        const tasks = this.state.tasks
            .filter((task) => task.indexOf(filter) !== -1)
            .map((task, i) => (
                <Transition
                    appear
                    in = { this.state.remove }
                    key = { task }
                    timeout = { 1000 }
                    onEnter = { this.handleTaskAppear }
                    onExit = { this.handleTaskDisappear }>
                    <Task
                        deleteBlock = { this.deleteBlock }
                        index = { i }
                        update = { this.updateText }>
                        {task}
                    </Task>
                </Transition>
            ));

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
                    <TransitionGroup>{tasks}</TransitionGroup>
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
