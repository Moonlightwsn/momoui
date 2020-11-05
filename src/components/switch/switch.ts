import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import checkController from '../../behaviors/checkController.ts'

Component({
  behaviors: [muiBase, muiController, checkController],
  properties: {
    checkedIcon: {
      type: String,
      value: 'circle',
    },
    icon: {
      type: String,
      value: 'circle',
    },
  },
  data: {
    _pureSizeToPx: {
      medium: 20,
      small: 16,
    },
    _pureUncheckedColor: '#fff',
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
