import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import Task from './';
import { func, number, string } from 'prop-types';

Enzyme.configure({ adapter: new Adapter() });

const mutatedState = {
    edit:   true,
    remove: false
};
const props = {
    deleteBlock: jest.fn()
};

const result = shallow(<Task { ...props } />);

describe('Task component', () => {
    test(`should have 2 'button' elements`, () => {
        expect(result.find('button')).toHaveLength(2);
    });
    test(`should have 1 element with class 'Remove'`, () => {
        expect(result.find('.remove')).toHaveLength(1);
    });
    test(`should have 1 element with class 'Edit'`, () => {
        expect(result.find('.edit')).toHaveLength(1);
    });

    test(`component state and input value should reflect according changes'`, () => {
        result.setState(() => ({
            edit:   true,
            remove: false
        }));

        expect(result.state()).toEqual(mutatedState);

        result.find('.task > input').simulate('change', {
            target: {
                value: ''
            }
        });

        expect(result.find('.task > input').text()).toBe('');
    });

    test(`button 'save' after click on it shouldn't be on page`, () => {
        result.setState(() => ({
            edit:   true,
            remove: false
        }));
        result.setProps({
            update: () => true
        });
        result.find('.save').simulate('click');

        expect(result.find('.save')).toHaveLength(0);
    });
});
