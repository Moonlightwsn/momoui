import checkGroupController from '../../behaviors/checkGroupController.ts'

Component({
  behaviors: [checkGroupController],
  data: {
    _pure_checked_value: {},
  },
  methods: {
    innerchange(e) {
      const {value, checked} = e.detail
      this._trigger(value, checked)
      const {_pure_checked_value: checkedValueMap} = this.data
      const checkedValue = Object.keys(checkedValueMap).filter(item => (checkedValueMap[item]))
      this.triggerEvent('change', {checkedValue})
    },
    _trigger(value, checked) {
      if (value) {
        this.data._pure_checked_value[value] = checked
      }
    }
  },
  relations: {
    '../checkbox/checkbox': {
      type: 'descendant',
      linked(target) {
        if (target) {
          this._trigger(target.data.value, target.data._checked)
        }
      },
      unlinked(target) {
        if (target) {
          this._trigger(target.data.value, target.data._checked)
        }
      },
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
