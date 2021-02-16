import muiBase from '../../behaviors/muiBase.ts'
import Base64 from '../../common/base64.ts'

let momouiRootPath = '/miniprogram_npm/momoui-miniprogram/'
let customizedIconsPath
/* eslint-disable */
const app = getApp()
/* eslint-disable */
if (app.momouiRootPath) {
  momouiRootPath = app.momouiRootPath
}
if (app.customizedIconsPath) {
  customizedIconsPath = app.customizedIconsPath
}
const muiIconPath = 'styles/static/icons/'

const themeListeners = []
wx.onThemeChange((obj) => {
  if (obj && obj.theme) {
    themeListeners.forEach((listener) => {
      listener()
    })
  }
})

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: null,
    },
    customized: {
      type: Boolean,
      value: false,
    },
    disableThemeWatcher: {
      type: Boolean,
      value: false,
    },
    name: {
      type: String,
      value: 'svg'
    },
    progressProps: {
      type: Object,
      value: {
        disableShrink: false,
        value: 0,
        variant: 'indeterminate',
      }
    },
    rerender: {
      type: null,
      value: null,
    },
    size: {
      type: Number,
      value: null,
    },
    spin: {
      type: Boolean,
      value: false,
    },
    src: {
      type: String,
      value: null,
    },
  },
  data: {
    base64Content: '',
    _innerStyles: 'width:24px;height:24px;',
  },
  lifetimes: {
    attached() {
      const {disableThemeWatcher} = this.data
      if (!disableThemeWatcher) {
        this.listener = () => {
          const {
            name,
            color,
            size,
            src,
            customized,
          } = this.data
          this._Pretreatment(name, color, size, src, customized)
        }
        themeListeners.push(this.listener)
      }
    },
    detached() {
      if (this.listener) {
        const index = themeListeners.indexOf(this.listener)
        if (index > -1) {
          themeListeners.splice(index, 1)
        }
      }
    },
  },
  methods: {
    _Pretreatment(name, color, size, src, customized) {
      if (name && !src) {
        if (color && size) {
          this._ReadSvgAndGenBase64(name, color, `${size}px`, customized)
        } else {
          this.createSelectorQuery().select('.mui-icon').fields({
            computedStyle: ['color','fontSize'],
          }, res => {
            let {color: queryColor, fontSize: querySize} = res || {}
            queryColor = queryColor || 'currentColor'
            querySize = querySize || '24px'
            const realColor = color || queryColor
            const realSize = size ? `${size}px` : querySize
            this._ReadSvgAndGenBase64(name, realColor, realSize, customized)
          }).exec()
        }
      } else if (src) {
        this.createSelectorQuery().select('.mui-icon').fields({
          computedStyle: ['fontSize'],
        }, res => {
          let {fontSize: querySize} = res || {}
          querySize = querySize || '24px'
          const realSize = size ? `${size}px` : querySize
          const _innerStyles = `width:${realSize};height:${realSize};`
          this.setData({_innerStyles, base64Content: src})
        }).exec()
      }
    },
    _ReadSvgAndGenBase64(iconName: string, color: string, size: string, customized: boolean) {
      if (iconName) {
        const iconPath = customized ? `${customizedIconsPath || ''}${iconName}.svg` : `${momouiRootPath}${muiIconPath}${iconName}.svg`
        try {
          const fileRes = wx.getFileSystemManager().readFileSync(iconPath, 'binary')
          if (fileRes) {
            let svgdata = String(fileRes)
            const dstr = '<svg'
            const svgStartIndex = svgdata.indexOf(dstr)
            const styleIndex = svgdata.indexOf('>', svgStartIndex)
            let insertStyle = `
              <style type="text/css">
                path { fill: ${color}; }
            `
            if (iconName === 'loading') {
              const {progressProps} = this.data
              insertStyle = `
                <style type="text/css">
                  circle {
                    stroke: ${color};
              `
              if (progressProps.disableShrink) {
                insertStyle = `${insertStyle}
                    animation: none;
                `
              } else {
                insertStyle = `${insertStyle}
                    ${progressProps.variant !== 'indeterminate' ? 'transition: stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' : 'animation: mui-circular-progress-keyframes-circular-dash 1.4s ease-in-out infinite'};
                `
              }
              insertStyle = `${insertStyle}
                  ${progressProps.variant === 'indeterminate' ? 'stroke-dasharray: 80px, 200px;stroke-dashoffset: 0px' : `stroke-dasharray: 126.92;stroke-dashoffset: ${(126.92 - (((progressProps.value || 0) / 100) * 126.92)).toFixed(2)}px`};
                }
              `
            }
            insertStyle = `
                ${insertStyle}
              </style>
            `
            svgdata = `${svgdata.slice(0, styleIndex + 1)}${insertStyle}${svgdata.slice(styleIndex + 1)}`
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
    'name, color, size, src, customized, mClass, mStyle, progressProps, rerender': function (name, color, size, src, customized) {
      this._Pretreatment(name, color, size, src, customized)
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
