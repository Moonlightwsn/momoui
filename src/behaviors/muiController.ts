import {openTypeMap} from '../common/utils.ts'

const styleProps = [
  'color',
  'variant',
  'size',
]

export default Behavior({
  data: {
    _disabled: false,
    muiClasses: '',
  },
  lifetimes: {
    attached() {
      const {
        color,
        variant,
        size,
        loading,
        disabled
      } = this.properties
      this._defindMuiBehaviors({
        color,
        variant,
        size,
        disabled,
        loading,
      })
    }
  },
  methods: {
    _openTypeEvent(e) {
      const {openType} = this.properties
      this.triggerEvent(openTypeMap[openType], e)
    },
    _defindMuiBehaviors(params = {}) {
      /** 整合所有样式 */
      const muiClassesArr = []
      const {disabled, loading} = params
      if (!(typeof disabled === 'undefined' && typeof loading === 'undefined')) {
        const _disabled = (disabled || loading || false)
        if (_disabled) {
          muiClassesArr.push('mui-disabled')
        }
        this.setData({
          _disabled,
        })
      }
      styleProps.forEach(sp => {
        muiClassesArr.push(params[sp] ? `mui-${sp}-${params[sp]}` : '')
      })
      const {mClass} = this.properties
      if (mClass) {
        muiClassesArr.push(mClass)
      }
      this.setData({
        muiClasses: muiClassesArr.join(' '),
      })
    },

  },
  observers: {
    'color, variant, size, loading, disabled': function (color, variant, size, loading, disabled) {
      this._defindMuiBehaviors({
        color,
        variant,
        size,
        disabled,
        loading,
      })
    },
  },
})
