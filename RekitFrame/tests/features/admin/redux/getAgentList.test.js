import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ADMIN_GET_AGENT_LIST_BEGIN,
  ADMIN_GET_AGENT_LIST_SUCCESS,
  ADMIN_GET_AGENT_LIST_FAILURE,
  ADMIN_GET_AGENT_LIST_DISMISS_ERROR,
} from '../../../../src/features/admin/redux/constants';

import {
  getAgentList,
  dismissGetAgentListError,
  reducer,
} from '../../../../src/features/admin/redux/getAgentList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('admin/redux/getAgentList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAgentList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAgentList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_GET_AGENT_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_GET_AGENT_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getAgentList fails', () => {
    const store = mockStore({});

    return store.dispatch(getAgentList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ADMIN_GET_AGENT_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', ADMIN_GET_AGENT_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetAgentListError', () => {
    const expectedAction = {
      type: ADMIN_GET_AGENT_LIST_DISMISS_ERROR,
    };
    expect(dismissGetAgentListError()).toEqual(expectedAction);
  });

  it('handles action type ADMIN_GET_AGENT_LIST_BEGIN correctly', () => {
    const prevState = { getAgentListPending: false };
    const state = reducer(
      prevState,
      { type: ADMIN_GET_AGENT_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAgentListPending).toBe(true);
  });

  it('handles action type ADMIN_GET_AGENT_LIST_SUCCESS correctly', () => {
    const prevState = { getAgentListPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_GET_AGENT_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAgentListPending).toBe(false);
  });

  it('handles action type ADMIN_GET_AGENT_LIST_FAILURE correctly', () => {
    const prevState = { getAgentListPending: true };
    const state = reducer(
      prevState,
      { type: ADMIN_GET_AGENT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAgentListPending).toBe(false);
    expect(state.getAgentListError).toEqual(expect.anything());
  });

  it('handles action type ADMIN_GET_AGENT_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getAgentListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ADMIN_GET_AGENT_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAgentListError).toBe(null);
  });
});

