// pages/personal_fabu/personal_fabu.js
const app = getApp()
const db = wx.cloud.database()//必须有
const DB1 = wx.cloud.database().collection("pinlist")
const _ = db.command//这个有时需要用到，比如数据的自增、自减时
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pinlist:[]
  },


  //获取详情页
  detail(e) {
   
    DB1.where({
      _id:e.currentTarget.dataset.item._id
    }).orderBy('startime','desc').get({
      success(res) {
        wx.navigateTo({
          url: '/pages/details/details?pin='+JSON.stringify(res.data)
        })
      },
      fail(res) {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo==null) {
      wx.showModal({
        title: '提示',
        content: '请先进行登录哦~',
        showCancel: false,
        success: function(e) {
          if(e.confirm) {
            wx.switchTab({
              url: '/pages/personal/personal',
            })
          }
        }
      })
      return;
    }
    db.collection('pinlist').where({
      _openid:app.globalData.openid// 查询条件：chapter=1
    }).get().then(res=>{
        console.log(res.data)//打印返回结果
        this.setData({
          pinlist:res.data
        })
    }).catch(err=>{
    console.log(err)//打印错误信息
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})