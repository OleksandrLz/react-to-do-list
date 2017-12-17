import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Task from './';

Enzyme.configure({ adapter: new Adapter() });

const state = {
    edit:   false,
    remove: true
};
const mutatedState = {
    edit:   true,
    remove: false
};

const result = shallow(<Task />);

describe('Task component', () => {
    test(`should have 2 'button' elements`, () => {
        expect(result.find('button')).toHaveLength(2);
    });

    test(`should have 1 element with class 'Edit'`, () => {
        expect(result.find('.edit')).toHaveLength(1);
    });

    test(`should have 1 element with class 'Remove'`, () => {
        expect(result.find('.remove')).toHaveLength(1);
    });

    test(`should respond to state change properly`, () => {
        result.setState(() => ({
            edit:   true,
            remove: false
        }));
        expect(result.state()).toEqual(mutatedState);
        expect(result.find('.save')).toHaveLength(1);
    });
});
