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
    value: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    _pureIsSwitch: true,
  },
  observers: {
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
