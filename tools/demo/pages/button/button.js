import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  getPhoneNumber(e) {
    console.log(e.detail)
  },
  uploadImg() {
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success (res){
            const data = res.data
            //do something
          }
        })
      }
    })
  },
})