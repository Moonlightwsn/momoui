import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/openCloseTransition.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    invisible: {
      type: Boolean,
      value: false,
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
