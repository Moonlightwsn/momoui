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
    color: {
      type: String,
      value: null,
    },
    size: {
      type: Number,
      value: null,
    },
    name: {
      type: String,
      value: 'default'
    },
    src: {
      type: String,
      value: null,
    },
    rerender: {
      type: null,
      value: null,
    },
  },
  data: {
    base64Content: '',
    _innerStyles: 'width:24px;height:24px;',
  },
  methods: {
    async _readSvgAndGenBase64(iconName: string, color: string, size: string) {
      if (iconName) {
        const iconPath = `${momouiRootPath}${muiIconPath}${iconName}.svg`
        try {
          const fileRes = await wx.getFileSystemManager().readFileSync(iconPath, 'binary')
          if (fileRes) {
            let svgdata = String(fileRes)
            const dstr = '<style type="text/css">'
            const styleIndex = svgdata.indexOf(dstr)
            let insertStyle = `path { fill: ${color}; }`
            if (iconName === 'progress-circle') {
              insertStyle = `circle { stroke: ${color}; }`
            }
            svgdata = `${svgdata.slice(0, styleIndex + dstr.length)}${insertStyle}${svgdata.slice(styleIndex + dstr.length)}`
            const base64 = new Base64()
            const svgtobase64 = base64.encode(svgdata)
            const base64Content = `data:image/svg+xml;base64,${svgtobase64}`
            const _innerStyles = `width:${size};height:${size};`
            this.setData({
              base64Content,
              _innerStyles,
            })
          }
        } catch(e) {
          console.log(e)
        }
      }
    }
  },
  observers: {
    'name, color, size, mStyle, mClass, rerender': function (name, color, size) {
      const {src} = this.data
      if (name && !src) {
        if (color && size) {
          this._readSvgAndGenBase64(name, color, `${size}px`)
        } else {
          this.createSelectorQuery().select('.mui-icon').fields({
            computedStyle: ['color','fontSize'],
          }, res => {
            let {color: queryColor, fontSize: querySize} = res || {}
            queryColor = queryColor || 'currentColor'
            querySize = querySize || '24px'
            const realColor = color || queryColor
            const realSize = size ? `${size}px` : querySize
            this._readSvgAndGenBase64(name, realColor, realSize)
          }).exec()
        }
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
