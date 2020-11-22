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
    _innerStyles: 'width:inherit;height:inherit;',
  },
  methods: {
    _readSvgFile(iconName: string) {
      const {src} = this.properties
      if (iconName && !src) {
        this.createSelectorQuery().select('.mui-icon').fields({
          computedStyle: ['color','fontSize'],
        }, async res => {
          let {color, fontSize: size} = res || {}
          console.log(size)
          if (!size) {
            size = '20px'
          }
          if (!color) {
            color = 'rgba(0, 0, 0, 0.87)'
          }
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
        }).exec()
      }
    }
  },
  observers: {
    'name, mStyle, mClass, rerender': function (name) {
      this._readSvgFile(name)
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
