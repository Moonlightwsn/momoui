import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/openCloseTransition.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    anchorOrigin: {
      type: Object,
      value: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
    message: {
      type: String,
      value: null,
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
