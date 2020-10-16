import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiController],
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
    pureDataPattern: /^_pure_/,
    styleIsolation: 'apply-shared',
  },
})
