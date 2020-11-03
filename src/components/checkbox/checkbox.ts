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
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
