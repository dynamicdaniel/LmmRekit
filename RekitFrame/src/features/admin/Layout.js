import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import {
  pathMatchRegexp,
} from '../../utils'

import { BackTop, Layout } from 'antd'
import { MyLayout } from '../../components'

const { Content } = Layout
const { Sider,Header,Bread } = MyLayout

export class AdminLayout extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onCollapseChange = () => {
     this.props.actions.collapseChange();
  }

  render() {

    const {collapsed,routeList,location}  = this.props;
    const fixed = true;
    const menus = routeList.filter(_ => _.menuParentId !== '-1')
    const currentRoute = routeList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    const notifications = [];

    const headerProps = {
      menus,
      fixed,
      collapsed,
      notifications,
      onCollapseChange:this.onCollapseChange,
      avatar: "",
      username: "test",
      
      // onSignOut() {
      //   dispatch({ type: 'app/signOut' })
      // },
    }

    const siderProps = {
      theme:"light",
      menus,
      collapsed,
      location,
    }

    return (
      <div className="admin-layout">
        <Fragment>
        <Layout>
        <Sider {...siderProps} />
        <div 
          className="container" 
          style={{ paddingTop: fixed ? 72 : 0 }}
          id="primaryLayout">
          <Header {...headerProps} />
          <Content className="content">
             <Bread routeList={routeList} location={location} />
            {this.props.children}
          </Content>
          <BackTop
              className="backTop"
              target={() => document.querySelector('#primaryLayout')}
            />
           <div className="footer">
                copy right @2019
           </div> 
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
    collapsed: state.admin.collapsed,
    routeList: state.admin.routeList,
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
