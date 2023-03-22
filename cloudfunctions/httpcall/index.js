// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
/*
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let url = event.url//let 是啥?
  return await rp(url)
  .then(function (res) {
    return res
  })
  .catch(function (err) {
    return 'faild'
  });
}
*/

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let url = event.url//let 是啥?
  let question_text = event.question
  var options = {
    method: 'POST',
    uri: url, //'http://crossentropy.asia:12321/question',
    formData: {
        question: question_text,
    },
    headers: {
      // 注意务必使用这个header
       'content-type': 'application/x-www-form-urlencoded'
    }
  };
  return await rp(options)
  .then(function (rsp) {
    return rsp
  })
  .catch(function (err) {
    return err
  });
}