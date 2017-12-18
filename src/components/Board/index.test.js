import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Board from './';

configure({ adapter: new Adapter() });

const result = mount(<Board />);
const message = 'testTask';
const searchItem = 'task №1';

const mutatedState = {
    taskItem:    'testTask',
    searchTasks: ['task №2'],
    tasks:       ['task №1', 'task №2', 'task №3', 'testTask']
};
const enterKey = 'Enter';

describe('Board component', () => {
    test(`should respond to state change properly`, () => {
        result.setState(() => ({
            taskItem: 'testTask'
        }));
        expect(result.state().taskItem).toEqual(mutatedState.taskItem);
    });

    test(`should have 2 'input' element`, () => {
        expect(result.find('input')).toHaveLength(2);
    });

    test(`should add a new task item to tasks arr on press button`, () => {
        result.find('.newTask > input').simulate('change', {
            target: {
                value: message
            }
        });
        expect(result.state().taskItem).toEqual(mutatedState.taskItem);

        result.find('.newTask > button').simulate('click');
        expect(result.state().tasks).toEqual(mutatedState.tasks);
    });
    test(`should show a search item`, () => {
        result.find('.search').simulate('change', {
            target: {
                value: searchItem
            }
        });
        expect(result.state().filter).toEqual(searchItem);
    });

    test(`should add a new task item to tasks arr on press Enter`, () => {
        result.find('.newTask > input').simulate('change', {
            target: {
                value: message
            }
        });
        result.find('.newTask > input').simulate('keypress', {
            target: {
                value: enterKey
            }
        });

        expect(result.state().tasks).toEqual(mutatedState.tasks);
    });

    test(`should show h1 item`, () => {
        expect(result.find('h1')).toHaveLength(1);
        expect(result.find('h1').html()).toEqual('<h1>To Do List</h1>');
    });
});
