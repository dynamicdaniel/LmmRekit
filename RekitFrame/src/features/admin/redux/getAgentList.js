import {
  ADMIN_GET_AGENT_LIST_BEGIN,
  ADMIN_GET_AGENT_LIST_SUCCESS,
  ADMIN_GET_AGENT_LIST_FAILURE,
  ADMIN_GET_AGENT_LIST_DISMISS_ERROR,
} from './constants';

import '../../../mock/agent'
import request from '../../../utils/request'

export function getAgentList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ADMIN_GET_AGENT_LIST_BEGIN,
    });
    
    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:'/v1/b/agent/list',
          // data:{
          //   user:'guest',
          //   pawd:'guest'
          // },
        }).then( data => {
          console.log(data.data.bagentList);
            dispatch({
                type: ADMIN_GET_AGENT_LIST_SUCCESS,
                data: data.data.bagentList,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ADMIN_GET_AGENT_LIST_FAILURE,
              data: { error: error },
            });
            reject(error);
        })
    });

    return promise;
  };
}

export function dismissGetAgentListError() {
  return {
    type: ADMIN_GET_AGENT_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_GET_AGENT_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getAgentListPending: true,
        getAgentListError: null,
      };

    case ADMIN_GET_AGENT_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        getAgentListPending: false,
        getAgentListError: null,
        agentList:action.data,
      };

    case ADMIN_GET_AGENT_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getAgentListPending: false,
        getAgentListError: action.data.error,
      };

    case ADMIN_GET_AGENT_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAgentListError: null,
      };

    default:
      return state;
  }
}
