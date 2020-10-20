const gridCssMap = {
  alignContent: 'align-content',
  alignItems: 'align-items',
  direction: 'flex-direction',
  justify: 'justify-content',
  wrap: 'flex-wrap',
}

Component({
  properties: {
    mClass: {
      type: String,
      value: '',
    },
    mStyle: {
      type: String,
      value: '',
    },
    container: {
      type: Boolean,
      value: false,
    },
    item: {
      type: Boolean,
      value: false,
    },
    alignContent: {
      type: String,
      value: 'stretch',
    },
    alignItems: {
      type: String,
      value: 'stretch',
    },
    direction: {
      type: String,
      value: 'row',
    },
    justify: {
      type: String,
      value: 'flex-start',
    },
    spacing: {
      type: Number,
      value: 0
    },
    wrap: {
      type: String,
      value: 'wrap',
    },
  },
  data: {
    _innerStyles: '',
    _pureIsGenMuiClasses: false,
  },
  attached() {
    const {
      _pureIsGenMuiClasses
    } = this.data
    const {
      alignContent,
      alignItems,
      direction,
      justify,
      wrap
    } = this.properties
    if (!_pureIsGenMuiClasses) {
      this._defineGridClasses({
        alignContent, alignItems, direction, justify, wrap
      })
    }
  },
  methods: {
    _defineGridClasses(params = {}) {
      console.log(params)
      let _innerStyles = ''
      Object.keys(gridCssMap).forEach(prop => {
        if (params[prop]) {
          _innerStyles = `${_innerStyles}${gridCssMap[prop]}:${params[prop]};`
        }
      })
      this.setData({
        _innerStyles,
        _pureIsGenMuiClasses: true,
      })
    },
  },
  observers: {
    [Object.keys(gridCssMap).join(',')](alignContent, alignItems, direction, justify, wrap) {
      this._defineGridClasses({
        alignContent, alignItems, direction, justify, wrap
      })
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
