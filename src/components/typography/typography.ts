import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController],
  properties: {
    align: {
      type: String,
      value: 'inherit',
    },
    color: {
      type: String,
      value: 'initial'
    },
    display: {
      type: String,
      value: 'initial',
    },
    gutterBottom: {
      type: Boolean,
      value: false,
    },
    noWrap: {
      type: Boolean,
      value: false,
    },
    paragraph: {
      type: Boolean,
      value: false,
    },
    variant: {
      type: String,
      value: 'body1',
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
