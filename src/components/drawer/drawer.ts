import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/transition/openClose.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    anchor: {
      type: String,
      value: 'left',
    },
    elevation: {
      type: Number,
      value: 16,
    },
    height: {
      type: Number,
      value: 256,
    },
    position: {
      type: String,
      value: 'fixed',
    },
    transitionType: {
      type: String,
      value: 'slide',
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
      if (variant !== 'temporary') {
        _templateData.drawerType = 'docker'
        _templateData.elevation = 0
      } else {
        _templateData.drawerType = 'modal'
        _templateData.elevation = elevation
      }
      if (variant === 'persistent') {
        _templateData.persistent = true
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
      _templateData._startStyle = _startStyle
      _templateData._sizeStyle = _sizeStyle
      this.setData({_templateData, _startStyle})
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
