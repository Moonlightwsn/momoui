import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/transition/openClose.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    anchor: {
      type: String,
      value: 'left',
    },
    disableBackdropClick: {
      type: Boolean,
      value: false,
    },
    elevation: {
      type: Number,
      value: 16,
    },
    height: {
      type: Number,
      value: 256,
    },
    onBackdropClick: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    position: {
      type: String,
      value: 'fixed',
    },
    transitionType: {
      type: String,
      value: 'slide',
    },
    transitionDuration: {
      type: Number,
      value: 225,
    },
    variant: {
      type: String,
      value: 'temporary',
    },
    width: {
      type: Number,
      value: 256,
    },
  },
  data: {
    _endStyle: 'transform: none;',
    _sizeStyle: '',
    _templateData: {},
    _transitionStyle: '',
  },
  lifetimes: {
    attached() {
      if (!this._initTemplateData) {
        this._GenTemplateData()
      }
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
    _CatchTap() {},
    _GenTemplateData(params) {
      this._initTemplateData = true
      const {
        anchor,
        elevation,
        mClass,
        mStyle,
        position,
        width,
        height,
        variant,
      } = params || this.data
      const _templateData: any = {
        anchor,
        mClass,
        mStyle,
        persistent: false,
        position,
      }
      let _sizeStyle = ''
      let translate = 0
      let direction = ''
      if (anchor === 'left') {
        translate = -width
        direction = 'X'
        _sizeStyle = `width: ${width}px;`
      } else if (anchor === 'right') {
        translate = width
        direction = 'X'
        _sizeStyle = `width: ${width}px;`
      } else if (anchor === 'top') {
        translate = -height
        direction = 'Y'
        _sizeStyle = `height: ${height}px;`
      } else if (anchor === 'bottom') {
        translate = height
        direction = 'Y'
        _sizeStyle = `height: ${height}px;`
      }
      const _startStyle = `transform: translate${direction}(${translate}px);`
      let _transitionStyle = ''
      if (variant !== 'temporary') {
        _templateData.drawerType = 'docker'
        _templateData.elevation = 0
        if (variant === 'permanent') {
          _transitionStyle = 'transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, height 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;'
        } else if (variant === 'persistent') {
          _templateData.persistent = true
        }
      } else {
        _templateData.drawerType = 'modal'
        _templateData.elevation = elevation
      }
      if (!_transitionStyle) {
        _transitionStyle = `${_startStyle}${this.data._exitStyle}`
      }
      _templateData._startStyle = _startStyle
      _templateData._sizeStyle = _sizeStyle
      this.setData({_templateData, _startStyle, _transitionStyle})
    },
  },
  observers: {
    'anchor, elevation, mClass, mStyle, position, width, height, variant': function (anchor, elevation, mClass, mStyle, position, width, height, variant) {
      this._GenTemplateData({
        anchor, elevation, mClass, mStyle, position, width, height, variant
      })
    },
    _show(show) {
      const {
        _endStyle,
        _startStyle,
        _enterStyle,
        _exitStyle,
      } = this.data
      const _transitionStyle = show ? `${_endStyle}${_enterStyle}` : `${_startStyle}${_exitStyle}`
      this.setData({_transitionStyle})
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
