import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/transition/openClose.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    anchor: {
      type: String,
      value: 'left',
    },
    elevation: {
      type: Number,
      value: 16,
    },
    position: {
      type: String,
      value: 'fixed',
    },
    transitionType: {
      type: String,
      value: 'slide',
    },
    variant: {
      type: String,
      value: 'temporary',
    },
    width: {
      type: Number,
      value: 57,
    },
  },
  data: {
    _transitionStyle: '',
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
