import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController],
  properties: {
    elevation: {
      type: Number,
      value: 1,
    },
    variant: {
      type: String,
      value: 'elevation',
    },
    square: {
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
