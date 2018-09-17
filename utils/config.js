const config = {
  resUrl:'https://api.jz2025.cn/'
}

const api = {//api接口地址
  getToken: config.resUrl +'api/v1/token/user',//微信登录接口
  checkToken: config.resUrl + 'api/v1/token/check',//微信token验证
  getBanner: config.resUrl +'api/v1/banner/',//获取banner
  getTaskCate: config.resUrl +'api/v1/task/cate',
  getTaskList: config.resUrl +'api/v1/taskList',//获取任务列表
  getUserInfo: config.resUrl +'api/v1/user/info',//获取用户信息
  getTaskCount: config.resUrl +'api/v1/task/count',//获取任务数量
  setUserCode: config.resUrl +'api/v1/user/code/',//绑定邀请码
  setTaobao: config.resUrl +'api/v1/user/taobao',//绑定淘宝帐号
  getTaskInfo: config.resUrl +'api/v1/task/',//获取任务详情
  applyTask: config.resUrl +'api/v1/task/apply/',//申请任务
  drawal: config.resUrl +'api/v1/user/drawal',//提现
  tastStatus: config.resUrl +'api/v1/task/status/',
  getMoney: config.resUrl +'api/v1/task/money/',//任务返款
  upload: config.resUrl +'api/v1/upload',
  setIds: config.resUrl +'api/v1/user/ids',
  del: config.resUrl + 'api/v1/user/del',
}



export default{
  api
}