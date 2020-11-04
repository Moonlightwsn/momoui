import muiBase from '../../behaviors/muiBase.ts'
import checkController from '../../behaviors/checkController.ts'

Component({
  behaviors: [muiBase, checkController],
  properties: {
    checkedIcon: {
      type: String,
      value: 'square-check-fill',
    },
    icon: {
      type: String,
      value: 'square',
    },
  },
  relations: {
    '../checkbox-group/checkbox-group': {
      type: 'ancestor',
      linked(target) {
        if (target) {
          this._group = target
        }
      },
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
