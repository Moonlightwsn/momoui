import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/transition/openClose.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    disableBackdropClick: {
      type: Boolean,
      value: false,
    },
    invisible: {
      type: Boolean,
      value: false,
    },
    onBackdropClick: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    transitionType: {
      type: String,
      value: 'fade',
    },
  },
  methods: {
    _BackdropClick(e) {
      const {disableBackdropClick, onBackdropClick} = this.data
      if (onBackdropClick && typeof onBackdropClick === 'function') {
        onBackdropClick(e, this.dataset)
      }
      if (!disableBackdropClick) {
        this._close()
      }
    },
  },
  options: {
    // virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
