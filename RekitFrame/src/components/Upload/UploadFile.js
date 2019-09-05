import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';

import * as qiniu from 'qiniu-js'

export default class UploadFile extends Component {

    // static getDerivedStateFromProps(nextProps) {
    //   // Should be a controlled component.
    //   console.log(nextProps);
    //   if ('value' in nextProps) {
    //     return {
    //       ...(nextProps.value || {}),
    //     };
    //   }
    //   return null;
    // }

    constructor(props) {
      super(props);

      const value = props.value || {};
      this.state = {
        fileList:this.convertValueToFileList(value),
      };
    }

    convertValueToFileList = (value) => {
      return value.map((item,i) => {
        return {
          uid:-i,
          name:item.name,
          status: 'done',
          url: item.url,
        }
      })
    }

    convertFileListToValue = (value) => {
      const fileList = this.state.fileList;
      return fileList.map((item,i) => {
        return {
          name:item.name,
          url: item.url,
        }
      })
    }    

    triggerChange = changedValue => {
      // Should provide an event to pass value to Form.
      const { onChange } = this.props;
      if (onChange) {
        onChange(this.convertFileListToValue(changedValue));
      }
    };

    get uploadProps() {
       return {
        name: 'file',
        fileList: this.state.fileList,
        action: '/api/qiniu',
        headers: {
          authorization: 'authorization-text',
        },
        onChange : (info) => {
          console.log(info.file, info.fileList);
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
          
          this.setState({fileList:info.fileList})

          this.triggerChange(info.fileList);
        },
      }
    }

      render() {
        return <Upload {...this.uploadProps}>
          <Button>
            <Icon type="upload" /> 上传文件
          </Button>
        </Upload>
      }

}