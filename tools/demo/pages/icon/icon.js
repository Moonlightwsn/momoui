import themeMixin from '../../behaviors/theme'
import {debounce} from '../../common/utils'

const muiIconPath = '/styles/static/icons/'

/* eslint-disable */
const app = getApp()
/* eslint-disable */

Page({
  behaviors: [themeMixin],
  data: {
    loading: true,
    error: false,
    icons: [],
  },
  onLoad() {
    if (app.builtinicons.length <= 0) {
      const FileSystemManager = wx.getFileSystemManager()
      FileSystemManager.readdir({
        dirPath: muiIconPath,
        success: (res) => {
          const {files = []} = res || {}
          if (Array.isArray(files)) {
            app.builtinicons = files.map(item => item.substr(0, item.length - 4)).sort()
            console.log(JSON.stringify(app.builtinicons))
            this.setData({icons: app.builtinicons, loading: false, error: false})
          }
        },
        fail: (res) => {
          console.log(res)
          this.setData({icons: [], error: true, loading: false})
        }
      })
    } else {
      this.setData({icons: app.builtinicons, loading: false, error: false})
    }
    const SearchFunction = debounce((value) => {
      console.log(value)
      if (typeof value === 'string') {
        if (value) {
          const newIcons = app.builtinicons.filter(item => {
            return item.toUpperCase().includes(value.toUpperCase())
          })
          this.setData({icons: newIcons})
        } else {
          this.setData({icons: app.builtinicons || []})
        }
      }
    }, 500)
    this.setData({Search: SearchFunction})
  },
  onShow() {
    if (app.builtinicons.length > 0 && this.data.icons.length <= 0) {
      this.setData({icons: app.builtinicons})
    }
  },
  CopyUrl() {
    wx.setClipboardData({
      data: 'https://materialdesignicons.com/'
    })
  }
})
