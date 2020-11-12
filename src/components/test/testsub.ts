import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import rippleBase from '../../behaviors/rippleBase.ts'

Component({
  behaviors: [muiBase, muiController, rippleBase],
  properties: {
    color: {
      type: String,
      value: 'default',
    },
    size: {
      type: String,
      value: 'medium'
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
