const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
 
// 云函数入口函数
exports.main = async (e, context) => {
  const { id } = e
  // 定义联表实例
  const data = await db.collection('fulfillment')
    .aggregate() 
    .match({ // match是根据活动id来查询到当前这个活动信息
      Id: id,
      access:"1",    
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