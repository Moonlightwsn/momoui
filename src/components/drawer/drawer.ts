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
      value: 80,
    },
  },
  data: {
    _transitionStyle: '',
  },
  lifetimes: {
    attached() {
      console.log(this.data.width)
    }
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
