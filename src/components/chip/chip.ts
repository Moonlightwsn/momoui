import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    avatar: {
      type: Object,
      optionalTypes: [String],
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
    onClick: {
      // @ts-ignore
      type: Function,
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
  data: {
    _avatar: null,
    _hasDelete: false,
  },
  methods: {
    _Click() {
      const {onClick} = this.data
      if (onClick && typeof onClick === 'function') {
        onClick()
      }
    },
    _delete() {
      const {onDelete} = this.data
      if (onDelete && typeof onDelete === 'function') {
        onDelete()
      }
    }
  },
  observers: {
    avatar(avatar) {
      const _avatar: {
        text?:string
        icon?:string
        src?:string
      } = {}
      if (typeof avatar === 'string') {
        _avatar.text = avatar
        this.setData({_avatar})
      } else if (typeof avatar === 'object' && avatar) {
        _avatar.icon = avatar.icon
        _avatar.src = avatar.src
        this.setData({_avatar})
      }
    },
    onDelete(onDelete) {
      if (onDelete) {
        this.setData({_hasDelete: true})
      } else {
        this.setData({_hasDelete: false})
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
