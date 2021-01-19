import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'
import scrollView from '../../behaviors/scrollView.ts'

Component({
  behaviors: [muiBase, muiController, scrollView],
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
    scrollView: {
      type: Boolean,
      value: false,
    },
  },
  observers: {},
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
