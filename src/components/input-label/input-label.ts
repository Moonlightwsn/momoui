import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disableAnimation: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    error: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    margin: {
      type: String,
      value: 'none',
    },
    required: {
      type: Boolean,
      value: false,
    },
    shrink: {
      type: Boolean,
      value: false,
    },
    variant: {
      type: String,
      value: 'standard',
    }
  },
  data: {
    _formControl: false,
  },
  relations: {
    '../form-control/form-control': {
      type: 'ancestor',
    }
  },
  methods: {
    _formControlAction(params) {
      this.setData(params)
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
