import checkGroupController from '../../behaviors/checkGroupController.ts'

Component({
  behaviors: [checkGroupController],
  relations: {
    '../checkbox/checkbox': {
      type: 'descendant',
      linked(target) {
        if (target) {
          const {value} = target.data
          if (value) {
            const {_pure_targets: targets} = this.data
            targets[value] = target
            this.setData({_pure_targets: targets})
          }
          const realChecked = this.data._pure_checked_value[value] || false
          target._GroupControll(realChecked)
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
