import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    avatar: {
      type: String,
      optionalTypes: [Object],
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
      optionalTypes: [Object],
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
    _avatarIcon: '',
    _avatarIconStyle: '',
    _hasDelete: false,
  },
  methods: {
    _Click(e) {
      const {onClick} = this.data
      if (onClick && typeof onClick === 'function') {
        onClick(e, this.dataset)
      }
    },
    _delete(e) {
      const {onDelete} = this.data
      if (onDelete && typeof onDelete === 'function') {
        onDelete(e, this.dataset)
      }
    }
  },
  observers: {
    avatar(avatar) {
      let _avatarIcon = ''
      let _avatarText = ''
      let _avatarSrc = ''
      let _avatarIconStyle = ''
      if (avatar) {
        if (avatar.src) {
          _avatarSrc = avatar.src
        } else if (avatar.icon) {
          _avatarIcon = avatar.icon
          _avatarIconStyle = 'icon'
        } else if (typeof avatar === 'string') {
          _avatarIcon = avatar
          _avatarIconStyle = 'icon'
        } else if (avatar.text && typeof avatar.text === 'string') {
          _avatarText = avatar.text
        }
      }
      this.setData({
        _avatarIcon,
        _avatarText,
        _avatarSrc,
        _avatarIconStyle,
      })
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
