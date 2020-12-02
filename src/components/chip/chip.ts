import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    avatar: {
      type: String,
      value: null,
    },
    clickable: {
      type: Boolean,
      value: false,
    },
    color: {
      type: String,
      value: 'default',
    },
    deleteIcon: {
      type: String,
      value: null,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    icon: {
      type: String,
      value: null,
    },
    label: {
      type: String,
      value: null,
    },
    onDelete: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    size: {
      type: String,
      value: 'medium',
    },
    variant: {
      type: String,
      value: 'default',
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
