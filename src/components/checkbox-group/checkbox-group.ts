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
            const {_pureTargets: targets} = this.data
            targets[value] = target
            this.setData({_pureTargets: targets})
          }
          const realChecked = this.data._pureCheckedValue[value] || false
          target._GroupControll(realChecked)
          this._Trigger(value, realChecked)
        }
      },
      unlinked(target) {
        if (target && target.data) {
          const {value} = target.data
          if (value) {
            const {_pureTargets: targets} = this.data
            delete targets[value]
            this.setData({_pureTargets: targets})
            this._Trigger(value, false)
          }
        }
      },
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
