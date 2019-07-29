import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Icon, Switch, Layout } from 'antd'
import { MyLayout } from '../../components'

const { Content } = Layout
const { Sider } = MyLayout

export class AdminLayout extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {

    const collapsed = false;

    const routeList = [
      {
        id: '1',
        icon: 'laptop',
        name: '仪表盘',
        router: '/dashboard',
      },
    ];
    
    const menus = routeList.filter(_ => _.menuParentId !== '-1')

    const notifications = [];

    const headerProps = {
      menus,
      collapsed,
      notifications,
      onCollapseChange:this.onCollapseChange,
      avatar: "",
      username: "test",
      // fixed: config.fixedHeader,
      // onAllNotificationsRead() {
      //   dispatch({ type: 'app/allNotificationsRead' })
      // },
      // onSignOut() {
      //   dispatch({ type: 'app/signOut' })
      // },
    }

    const siderProps = {
      theme:"light",
      menus,
      collapsed,
      // onCollapseChange,
    }

    return (
      <div className="admin-layout">
        <Fragment>
        <Layout>
        <Sider {...siderProps} />
        <div className="page-container">
          <Content className="page-content">
            {this.props.children}
          </Content>
        </div>
       </Layout>
      </Fragment>
      </div>
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
)(AdminLayout);
