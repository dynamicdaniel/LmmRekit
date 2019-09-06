# Curd 使用

### 完整案例

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter} = Crud

let agentId;

export class ShopPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const {shopPage,currentAgent} = this.props.admin;
     agentId = currentAgent.id;
     this.fetchList(shopPage);
  }

  fetchList = (page,name) => {
    const {getShopList} = this.props.actions;
    getShopList(page,agentId);
  }

  getDataSource() {
    const { admin } = this.props;
    const { shopById, shopList } = admin;
    if (!shopList) return [];
    return shopList.map(id => shopById[id]);
  }

  get listProps() {
    const { admin,actions } = this.props
    const { getListPending,shopTotal,shopPage } = admin
    const { deleteShop,chooseCurrentShop,shopModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getListPending,
      columns:[
        {
          title: "商户名",
          dataIndex: 'shopName',
          key: 'shopName',
          width: 180,
        },
      ],
      pagination:{
        total:shopTotal,
        current:shopPage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
      op:[
        {
          key:1,
          name:'编辑'
        },
        {
          key:2,
          name:'配置'
        },
        {
          key:3,
          name:'删除',
          needConfirm:true,
          confirmTitle:"确认删除"
        }
      ],
      handleMenuClick: (record,item) => {
        if (item.key == 1){
          chooseCurrentShop(record);
          shopModalChange(true,"updata");
        }else if(item.key == 3){
          deleteShop(record.id).then((data) => {
            this.fetchList(shopPage);
          })
        }else {
          chooseCurrentShop(record);
          this.props.history.push(`/admin/store`)
        }
      }
    }
  } 

  get modalProps() {
    const { admin,actions } = this.props
    const { currentShop, shopModalVisible,shopPage, shopModalType,submitShopPending } = admin

    const { shopModalChange,submitShop } = actions;
    const editItem  = shopModalType === 'create' ? {} : currentShop
    return {
      item: shopModalType === 'create' ? {} : currentShop,
      visible: shopModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitShopPending,
      title: `${
        shopModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "shopName",
          label: "商户名",
          initialValue: editItem.shopName,
          widget: Input,
          required: true
        },
        {
          key: "score",
          label: "score",
          initialValue: editItem.score,
          widget: Input,
          required: true
        },
        {
          key: "subAppid",
          label: "商户公众号id",
          initialValue: editItem.subAppid,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitShop(Object.assign({},data,{agentId:agentId})).then(data=> {
          shopModalChange(false,"create");
          this.fetchList(shopPage);
        })
      },
      onCancel() {
        shopModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentAgent,shopPage} = admin
    const { shopModalChange } = actions;

    return {
      filter: {
        ...query,
      },
      title:"当前代理商：" +currentAgent.agentName,
      onFilterChange: value => {
         this.fetchList(shopPage,value.name)
      },
      onAdd() {
        shopModalChange(true,'create')
      },
    }
  }

  render() {
    return (
      <Page inner>
        <CrudFilter {...this.filterProps} />
        <CrudTable {...this.listProps} />
        <CrudForm {...this.modalProps} />
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
)(ShopPage);

```

