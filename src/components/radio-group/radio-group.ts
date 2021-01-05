import checkGroupController from '../../behaviors/checkGroupController.ts'

Component({
  behaviors: [checkGroupController],
  data: {
    _pureMultiple: false,
  },
  relations: {
    '../radio/radio': {
      type: 'descendant',
      linked(target) {
        if (target) {
          const {value} = target.data
          if (value) {
            this._BindValue(value, target)
            const realChecked = this.data._pureCheckedValue[value] || false
            target._GroupControll(realChecked)
            this._Trigger(value, realChecked)
          }
        }
      },
      unlinked(target) {
        if (target && target.data) {
          const {value} = target.data
          if (value) {
            this._UnbindValue(value, target)
            this._Trigger(value, false)
          }
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
