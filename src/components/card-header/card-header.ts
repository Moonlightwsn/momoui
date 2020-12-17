import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    action: {
      type: Object,
      value: null,
    },
    avatar: {
      type: Object,
      value: null,
    },
    disableTypography: {
      type: Boolean,
      value: false,
    },
    subheader: {
      type: String,
      value: null,
    },
    title: {
      type: String,
      value: null,
    },
  },
  methods: {
    _headerActionClick(e) {
      const {action} = this.data
      if (action && action.onClick && typeof action.onClick === 'function') {
        action.onClick(e)
      }
    },
  },
  observers: {},
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
