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
        this._Linked(target)
      },
      unlinked(target) {
        this._UnLinked(target)
      },
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
