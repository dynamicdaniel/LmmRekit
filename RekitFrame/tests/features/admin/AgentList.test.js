import React from 'react';
import { shallow } from 'enzyme';
import { AgentList } from '../../../src/features/admin';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AgentList />);
  expect(renderedComponent.find('.admin-agent-list').length).toBe(1);
});
