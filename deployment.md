## 部署教程(Deployment tutorial)

### 需要下载的文件有(The files that need to be downloaded)
./cloud/

./miniprogram

..gitignore

.project.config.json

### 部署流程(Deployment process)

#### 1. 将下载文件放入自定义文件夹内
#### 2. 使用微信开发者工具【打开项目】选择上述文件夹
#### 3. 部署本地的云服务和基于php服务器架构
#### 4. 申请【智聆】端口的调用权限并填入自己的secretId和secretKey
#### 5. 需要部署的云函数：【getContent】【getPracticeNo】【toCount】【toFulfillment】
#### 6. 云数据库中需要创建的数据：
##### 集合corpus：
{"_id":"60173c665f50e0e900cf8f0653a7d472","difficultyRank":"A","voiceId":"A-1","_openid":"o-Ran5MSfQ31Nd3-KTI-Wbl7hmJ4","content":"In all honesty, I actually see the whole travel as an adventure in itself.","corpusId":"A-1"}
##### 集合fulfillment：
{"_id":"ac5f38825f58dba00143b1e86ea67f95","fluencyScore":"","planId":"A-1","practiceNo":3.0,"Id":"admin1","accuracyScore":"","completionScore":"","count":3.0,"week":"1","_openid":"o-Ran5MSfQ31Nd3-KTI-Wbl7hmJ4","access":"1"}

{"_id":"ac5f38825f58dba00143b1e86ea67f95","fluencyScore":"","planId":"A-1","practiceNo":3.0,"Id":"admin1","accuracyScore":"","completionScore":"","count":2.0,"week":"1","_openid":"o-Ran5MSfQ31Nd3-KTI-Wbl7hmJ4","access":"1"}

{"_id":"ac5f38825f58dba00143b1e86ea67f95","fluencyScore":"","planId":"A-1","practiceNo":3.0,"Id":"admin1","accuracyScore":"","completionScore":"","count":1.0,"week":"1","_openid":"o-Ran5MSfQ31Nd3-KTI-Wbl7hmJ4","access":"1"}
##### 集合makeplan：
{"_id":"aa133ce55f50ebe000b7a6f4137bfe54","_openid":"o-Ran5MSfQ31Nd3-KTI-Wbl7hmJ4","corpusId":"A-1","planId":"A-1","week":"1"}
##### 集合user：
{"_id":"60173c665f50e0e100cf8eb65356e71c","uid":"1","Id":"admin1","_openid":"o-Ran5MSfQ31Nd3-KTI-Wbl7hmJ4","classId":"1961","name":"小红","password":"yunkaifa","rank":"A"}

#### 7. 云存储中需要上传的文件：.mp3格式即可，需要与集合corpus中的voiceId匹配
