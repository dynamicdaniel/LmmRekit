import Mock from 'mockjs'

const url = {
    agentList: `/v1/b/agent/list`,
}

export default [
    Mock.mock(url.agentList, function(options) {
      let body = options.body;
      return {
        "code": "SUCCESS",
        "data": {
          "bagentList": [
            {
              "agentName": "string",
              "appid": "string",
              "createAt": "2019-07-30T13:52:16.376Z",
              "id": 0,
              "status": 0,
              "updateAt": "2019-07-30T13:52:16.376Z",
              "wxCert": "string",
              "wxMchId": "string",
              "wxPayKey": "string",
              "wxPaybody": "string"
            }
          ]
        },
        "message": "string",
        "success": true
      }
    })
]