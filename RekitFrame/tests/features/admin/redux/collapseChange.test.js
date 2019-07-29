import {
  ADMIN_COLLAPSE_CHANGE,
} from '../../../../src/features/admin/redux/constants';

import {
  collapseChange,
  reducer,
} from '../../../../src/features/admin/redux/collapseChange';

describe('admin/redux/collapseChange', () => {
  it('returns correct action by collapseChange', () => {
    expect(collapseChange()).toHaveProperty('type', ADMIN_COLLAPSE_CHANGE);
  });

  it('handles action type ADMIN_COLLAPSE_CHANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ADMIN_COLLAPSE_CHANGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
