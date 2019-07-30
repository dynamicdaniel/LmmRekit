import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Page } from '../../components'
import Filter from './AgentFilter'
import List from './AgentList'

export class AgentListPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    const {getAgentList} = this.props.actions;
    getAgentList();
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        
      },
      onAdd() {
        
      },
    }
  }

  get listProps() {
    const { dispatch, admin, loading } = this.props
    const { agentList, pagination, selectedRowKeys } = admin

    return {
      dataSource: agentList,
      loading: loading,
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'user/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              agentList.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        // dispatch({
        //   type: 'user/showModal',
        //   payload: {
        //     modalType: 'update',
        //     currentItem: item,
        //   },
        // })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          // dispatch({
          //   type: 'user/updateState',
          //   payload: {
          //     selectedRowKeys: keys,
          //   },
          // })
        },
      },
    }
  }

  render() {
    const { admin } = this.props
    const { selectedRowKeys } = admin

    return (<Page inner>
            <Filter {...this.filterProps} />
            <List {...this.listProps} />
            </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    admin: state.admin,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentListPage);
