import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import checkController from '../../behaviors/checkController.ts'

Component({
  behaviors: [muiBase, muiController, checkController],
  properties: {
    checkedIcon: {
      type: String,
      value: 'square-check-fill',
    },
    icon: {
      type: String,
      value: 'square',
    },
    indeterminate: {
      type: Boolean,
      value: false,
    }
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
  observers: {
    indeterminate(indeterminate) {
      if (indeterminate) {
        this.setData({checkedIcon: 'square-indeterminate-fill'})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
