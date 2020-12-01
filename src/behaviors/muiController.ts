import {openTypeMap} from '../common/utils.ts'

const styleProps = [
  'color',
  'variant',
  'size',
]

export default Behavior({
  data: {
    muiClasses: '',
  },
  lifetimes: {
    attached() {
      const {
        color,
        variant,
        size,
      } = this.properties
      this._defindMuiBehaviors({
        color,
        variant,
        size,
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
      const newData: { muiClasses?: string } = {}
      const muiClassesArr = []
      styleProps.forEach(sp => {
        muiClassesArr.push(params[sp] ? `mui-${sp}-${params[sp]}` : '')
      })
      const {mClass} = this.properties
      if (mClass) {
        muiClassesArr.push(mClass)
      }
      newData.muiClasses = muiClassesArr.join(' ')
      this.setData(newData)
    },

  },
  observers: {
    'color, variant, size': function (color, variant, size) {
      this._defindMuiBehaviors({
        color,
        variant,
        size,
      })
    },
  },
})
