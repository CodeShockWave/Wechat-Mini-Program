# Wechat-Mini-Program
WeChat Mini Program is an application that can be used without downloading.

## 项目名称(Project Title)

“倾听者”综合型语音评价系统("Listen" Comprehensive Voice Evaluation System)

## 项目介绍(Project Introduction)

“倾听者”综合型语音评价系统是一个智能的口语评测系统，该小程序针对多种场景应用了语音评测功能，支持单词，句子等多种模式，支持发音“准确度”（GOP），“流利度”，“完整度”，重音准确度等全方位打分机制，专家打分相似度95%以上。能够有效判别用户的语言水平，及时保存用户的“完整度”，“流利度”，“精确度”等语音识别的重要指标，有助于后续对于学生的发音问题进行分析和纠正。

The "listener" comprehensive voice evaluation system is an intelligent spoken language evaluation system. This small program applies the voice evaluation function for a variety of scenarios, supports multiple modes such as words and sentences, and supports pronunciation "accuracy" (GOP). All-round scoring mechanisms such as fluency, completeness, and accent accuracy, and the similarity of expert scoring is more than 95%. It can effectively determine the user’s language level and save the user’s "completeness", "fluency", "accuracy" and other important speech recognition indicators in time, which helps to analyze and correct students' pronunciation problems in the future.

## 项目效果截图(Project effect screenshot)

![Image text1](https://raw.githubusercontent.com/CodeShockWave/Wechat-Mini-Program/master/img/imgshow1.png)
![Image text2](https://raw.githubusercontent.com/CodeShockWave/Wechat-Mini-Program/master/img/imgshow2.png)
![Image text3](https://raw.githubusercontent.com/CodeShockWave/Wechat-Mini-Program/master/img/imgshow3.png)

## 项目体验小程序二维码或者链接(QR code or link of the project experience applet)

![Image text3](https://raw.githubusercontent.com/CodeShockWave/Wechat-Mini-Program/master/img/imgshow4.png)

## 部署教程(Deployment tutorial)

### 需要下载的文件有：
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

### 开源许可证标注(Open source license annotation)

请查看.LICENSE文件

Please view the .LICENSE file







