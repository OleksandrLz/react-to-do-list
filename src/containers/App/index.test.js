import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './';

configure({ adapter: new Adapter() });

const result = mount(<App />);

test(`shouldn't be null`, () => {
    expect(result).not.toBeNull();
});
