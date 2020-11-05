import checkGroupController from '../../behaviors/checkGroupController.ts'

Component({
  behaviors: [checkGroupController],
  data: {
    _pure_multiple: false,
  },
  relations: {
    '../radio/radio': {
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
        if (target && target.data) {
          const {value} = target.data
          this._trigger(value, false)
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
