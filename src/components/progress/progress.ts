import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disableShrink: {
      type: Boolean,
      value: false,
    },
    progressColor: {
      type: String,
      value: null,
    },
    size: {
      type: Number,
      value: 40,
    },
    /*
    thickness: {
      type: Number,
      value: 3.6,
    },
    */
    type: {
      type: String,
      value: 'circular',
    },
    value: {
      type: Number,
      value: 0,
    },
    valueBuffer: {
      type: Number,
      value: null,
    },
    variant: {
      type: String,
      value: 'indeterminate',
    },
  },
  data: {
    _progressPropsForIcon: {
      disableShrink: false,
      value: 0,
      variant: 'indeterminate',
    },
  },
  observers: {
    'disableShrink, value, variant': function (disableShrink, value, variant) {
      this.setData({
        _progressPropsForIcon: {
          disableShrink,
          value,
          variant,
        },
      })
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
