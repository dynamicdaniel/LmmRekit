import React from 'react';
import { shallow } from 'enzyme';
import { AgentListPage } from '../../../src/features/admin/AgentListPage';

describe('admin/AgentListPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      admin: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AgentListPage {...props} />
    );

    expect(
      renderedComponent.find('.admin-agent-list-page').length
    ).toBe(1);
  });
});
