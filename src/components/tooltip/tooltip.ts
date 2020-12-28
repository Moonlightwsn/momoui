import muiBase from '../../behaviors/muiBase.ts'

const positionMap = {
  bottom: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  },
  'bottom-start': {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  },
  'bottom-end': {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  },
  top: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
  },
  'top-start': {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  },
  'top-end': {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  },
  left: {
    anchorOrigin: {
      vertical: 'center',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'center',
      horizontal: 'right',
    },
  },
  'left-start': {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  },
  'left-end': {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  },
  right: {
    anchorOrigin: {
      vertical: 'center',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'center',
      horizontal: 'left',
    },
  },
  'right-start': {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  },
  'right-end': {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  },
}

Component({
  behaviors: [muiBase],
  properties: {
    arrow: {
      type: Boolean,
      value: false,
    },
    onClose: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    onOpen: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    open: {
      type: Boolean,
      value: null,
    },
    placement: {
      type: String,
      value: 'bottom',
    },
    title: {
      type: String,
      value: null,
    },
    transitions: {
      type: Array,
      value: [],
    },
    transitionDelay: {
      type: Number,
      optionalTypes: [Object],
      value: 0,
    },
    transitionDuration: {
      type: Number,
      optionalTypes: [Object],
      value: 225,
    },
  },
  data: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  },
  lifetimes: {
    attached() {
      if (typeof this.data.open === 'boolean') {
        this._controlled = true
      }
      this.setData({
        _onBackdropClick: this._onBackdropClick.bind(this),
      })
    }
  },
  methods: {
    _showTooltip() {
      if (!this._controlled) {
        this.setData({open: true})
      }
    },
    _onBackdropClick() {
      if (!this._controlled) {
        this.setData({open: false})
      }
    },
    _genPosition(placement) {
      this.setData(positionMap[placement])
    },
  },
  observers: {
    placement(placement) {
      this._genPosition(placement)
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  }
})
