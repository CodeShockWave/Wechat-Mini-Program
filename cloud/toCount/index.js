const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
 
// 云函数入口函数
exports.main = async (e, context) => {
  const { id } = e
  var practiceno = e.pra
 
  // 定义联表实例，根据条件实行更新操作
  const data = await db.collection('fulfillment')
  .where({
    Id: e.id,
    access:"1",    
  })
  .update({
    data: {
      practiceNo: practiceno - 1,
      
    },
  })
  
  
}