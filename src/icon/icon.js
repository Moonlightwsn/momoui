import {Base64} from '../utils/base64'

const iconPathMap = {
  default: '',
  share: '/styles/icons/share-variant.svg'
}

Component({
  properties: {
    name: {
      type: String,
      value: 'default',
    },
    pathprefix: {
      type: String,
      // value: '/miniprogram_npm/momoui/dist',
      value: '/components'
    },
    src: {
      type: String,
      value: '',
    },
  },
  lifetimes: {
    attached() {
      const {name} = this.properties
      if (name && iconPathMap[name]) {
        const iconPath = `${this.properties.pathprefix}${iconPathMap[name]}`
        wx.getFileSystemManager().readFile({
          filePath: iconPath,
          encoding: 'binary',
          success(res) {
            const base64 = new Base64()
            const svgtobase64 = base64.encode(res.data)
            console.log(svgtobase64)
          },
        })
      }
    },
  },
})
