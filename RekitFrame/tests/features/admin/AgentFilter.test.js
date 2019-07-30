import React from 'react';
import { shallow } from 'enzyme';
import { AgentFilter } from '../../../src/features/admin';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AgentFilter />);
  expect(renderedComponent.find('.admin-agent-filter').length).toBe(1);
});
