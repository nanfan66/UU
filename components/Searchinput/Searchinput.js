// components/Searchinput/Searchinput.js
let input = ''
Component({
  /**
   * 里面存放的是 要从父组件中接收的数据
   */
  properties: {
    // 要接收的数据的名称
    // aaa:{
    //   // type  要接收的数据的类型 
    //   type:String,
    //   // value  默认值
    //   value:""
    // }
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // tabs
  },
  /* 
  1 页面.js 文件中 存放事件回调函数的时候 存放在data同层级下！！！
  2 组件.js 文件中 存放事件回调函数的时候 必须要存在在 methods中！！！
   */
 

  methods: {
    search(e) {
      const DB = wx.cloud.database().collection("pinlist")
      let that = this
      if(input == '') {
        return;
      }
      else {
        DB.where({
          title: {
            $regex: '.*' + input
          }
        }).get({
          success: res=> {
            wx.navigateTo({
              url: '/pages/showbysearch/showbysearch?pinlist='+JSON.stringify(res.data)
            })
          }
        })
      }
    },
    getSearch(e) {
      input = e.detail.value
    }
  }
})
