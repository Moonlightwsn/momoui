import checkGroupController from '../../behaviors/checkGroupController.ts'

Component({
  behaviors: [checkGroupController],
  properties: {
    value: {
      type: Array,
      optionalTypes: [String],
      value: null,
    },
    defaultValue: {
      type: Array,
      optionalTypes: [String],
      value: null,
    },
  },
  data: {
    _pure_targets: {},
    _pure_checked_value: {},
    _pure_be_controlled: false,
  },
  lifetimes: {
    attached() {
      const {value, defaultValue} = this.data
      let checkedValue
      if (Array.isArray(value)) {
        this.data._pure_be_controlled = true
        checkedValue = value
      } else if (typeof value === 'string') {
        this.data._pure_be_controlled = true
        checkedValue = value.split(',')
      } else if (Array.isArray(defaultValue)) {
        checkedValue = defaultValue
      } else if (typeof defaultValue === 'string') {
        checkedValue = defaultValue.split(',')
      }
      if (checkedValue) {
        checkedValue.forEach(value => {
          if (value) {
            this.data._pure_checked_value[value] = true
          }
        })
      }
    }
  },
  methods: {
    innerchange(e) {
      const {value, checked} = e.detail
      let checkedValue: Array<String> = []
      let tmpCheckedValueMap = false
      if (this.data._pure_be_controlled) {
        tmpCheckedValueMap = {...this.data._pure_checked_value}
      }
      const checkedValueMap = this._trigger(value, checked, tmpCheckedValueMap)
      checkedValue = Object.keys(checkedValueMap).filter(item => (checkedValueMap[item]))
      this.triggerEvent('change', {checkedValue})
    },
    _trigger(value, checked, checkedValueMap) {
      if (value) {
        const realCheckedValue = checkedValueMap || this.data._pure_checked_value
        realCheckedValue[value] = checked
        return realCheckedValue
      }
      return null
    }
  },
  relations: {
    '../checkbox/checkbox': {
      type: 'descendant',
      linked(target) {
        if (target) {
          const {value} = target.data
          if (value) {
            this.data._pure_targets[value] = target
          }
          const realChecked = this.data._pure_checked_value[value] || false
          target._groupControll(realChecked)
          this._trigger(value, realChecked)
        }
      },
      unlinked(target) {
        if (target) {
          const {value} = this.target.data
          this._trigger(value, false)
        }
      },
    }
  },
  observers: {
    value(value) {
      let checkedValueArr = []
      const {_pure_targets: targets, _pure_checked_value: checkedValue} = this.data
      if (typeof value === 'string') {
        checkedValueArr = value.split(',')
      } else if (Array.isArray(value)) {
        checkedValueArr = value
      }
      const checkedValueMap = {}
      checkedValueArr.forEach(val => {
        checkedValueMap[val] = true
      })
      Object.keys(targets).forEach(targetName => {
        const realChecked = checkedValueMap[targetName] || false
        checkedValue[targetName] = realChecked
        targets[targetName]._groupControll(realChecked)
      })
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
