import muiBase from '../../behaviors/muiBase.ts'
import checkController from '../../behaviors/checkController.ts'

Component({
  behaviors: [muiBase, checkController],
  properties: {
    checkedIcon: {
      type: String,
      value: 'radio-box',
    },
    icon: {
      type: String,
      value: 'round',
    },
  },
  data: {
    _pure_one_way: true,
  },
  relations: {
    '../radio-group/radio-group': {
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