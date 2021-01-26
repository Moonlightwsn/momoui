import checkGroupController from '../../behaviors/checkGroupController.ts'

Component({
  behaviors: [checkGroupController],
  relations: {
    '../checkbox/checkbox': {
      type: 'descendant',
      linked(target) {
        this._Linked(target)
      },
      unlinked(target) {
        this._UnLinked(target)
      },
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
