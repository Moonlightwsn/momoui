import muiBase from '../../behaviors/muiBase.ts'
import Base64 from '../../common/base64.ts'

let momouiRootPath = '/miniprogram_npm/momoui-miniprogram/'
/* eslint-disable */
const app = getApp()
/* eslint-disable */
if (app.momouiRootPath) {
  momouiRootPath = app.momouiRootPath
}
const muiIconPath = 'styles/static/icons/'

Component({
  behaviors: [muiBase],
  properties: {
    name: {
      type: String,
      value: 'default'
    },
    size: {
      type: Number,
      value: 20
    },
    color: {
      type: String,
      value: 'rgba(0, 0, 0, 0.87)'
    },
    src: {
      type: String,
      value: ''
    }
  },
  data: {
    base64Content: ''
  },
  lifetimes: {
    attached() {
      const {src, name, color, mStyle} = this.properties
      if (!src) {
        this._readSvgFile(name, color)
      }
    }
  },
  methods: {
    async _readSvgFile(iconName: string, color: string = 'rgba(0, 0, 0, 0.87)') {
      if (iconName) {
        const iconPath = `${momouiRootPath}${muiIconPath}${iconName}.svg`
        try {
          const fileRes = await wx.getFileSystemManager().readFileSync(iconPath, 'binary')
          if (fileRes) {
            let svgdata = String(fileRes)
            if (iconName === 'progress-circle') {
              svgdata = svgdata.replace(/stroke="#[a-zA-Z0-9]{0,6}"/g, 'stroke="' + color + '"')
            } else {
              svgdata = svgdata.replace(/fill="#[a-zA-Z0-9]{0,6}"/g, 'fill="' + color + '"')
            }
            const base64 = new Base64()
            const svgtobase64 = base64.encode(svgdata)
            const base64Content = `data:image/svg+xml;base64,${svgtobase64}`
            this.setData({
              base64Content
            })
          }
        } catch(e) {
          console.log(e)
        }
      }
    }
  },
  observers: {
    'name, color': function (name, color) {
      this._readSvgFile(name, color)
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
