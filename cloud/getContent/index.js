const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (e, context) => {
  
  // 定义联表实例
  const data = await db.collection('fulfillment')
    .aggregate() 
    .match({ // match是根据活动idid来查询到当前这个活动信息
      Id: (e.id),
    })
    .lookup({
      from: 'user',
      localField: 'Id',
      foreignField: 'Id',
      as: 'user',
    })
    .lookup({
      from: 'makeplan',
      localField: 'planId',
      foreignField: 'planId',
      as: 'makeplan',
    })
    .lookup({
      from: 'corpus',
      localField: 'planId',
      foreignField: 'voiceId',
      as: 'corpus',
    })
    .end()
  return { data }
}