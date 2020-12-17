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
    name: {
      type: String,
      value: 'default'
    },
    progressProps: {
      type: Object,
      value: {
        disableShrink: false,
        value: 0,
        variant: 'indeterminate',
      }
    },
    size: {
      type: Number,
      value: null,
    },
    src: {
      type: String,
      value: null,
    },
    spin: {
      type: Boolean,
      value: false,
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
              const {progressProps} = this.data
              insertStyle = `
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
    'name, color, size, src, mStyle, progressProps, mClass, rerender': function (name, color, size, src) {
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
      } else if(src) {
        this.createSelectorQuery().select('.mui-icon').fields({
          computedStyle: ['fontSize'],
        }, res => {
          let {fontSize: querySize} = res || {}
          querySize = querySize || '24px'
          const realSize = size ? `${size}px` : querySize
          const _innerStyles = `width:${realSize};height:${realSize};`
          this.setData({_innerStyles})
        }).exec()
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
