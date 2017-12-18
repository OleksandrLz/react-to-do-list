import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Board from './';

configure({ adapter: new Adapter() });

const result = mount(<Board />);

describe('Board component', () => {
    test(`should have 2 'input' element`, () => {
        expect(result.find('input')).toHaveLength(2);
    });
});
