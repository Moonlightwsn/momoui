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
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
