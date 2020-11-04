import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController],
  properties: {
    color: {
      type: String,
      value: 'default',
    },
    variant: {
      type: String,
      value: 'outlined',
    },
    size: {
      type: String,
      value: 'medium',
    },
  },
  relations: {
    '../button/button': {
      type: 'child',
    }
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
