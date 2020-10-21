const gridStylesMap = {
  alignContent: 'align-content',
  alignItems: 'align-items',
  direction: 'flex-direction',
  justify: 'justify-content',
  wrap: 'flex-wrap',
}

const gridClassesMap = {
  container: 'container',
  item: 'item',
  spacing: 'spacing-',
  xs: 'xs-',
  sm: 'sm-',
  md: 'md-',
  lg: 'lg-',
  xl: 'xl-',
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
    _pureIsGenMuiStyles: false,
    _innerClasses: '',
    _pureIsGenMuiClasses: false,
  },
  attached() {
    const {
      _pureIsGenMuiStyles,
      _pureIsGenMuiClasses,
    } = this.data
    const {
      alignContent,
      alignItems,
      direction,
      justify,
      wrap,
      container,
      item,
      spacing,
      xs,
      sm,
      md,
      lg,
      xl,
    } = this.properties
    if (!_pureIsGenMuiClasses) {
      this._defineGridClasses({
        container,
        item,
        spacing,
        xs,
        sm,
        md,
        lg,
        xl,
      })
    }
    if (!_pureIsGenMuiStyles) {
      this._defineGridStyles({
        alignContent, alignItems, direction, justify, wrap
      })
    }
  },
  methods: {
    _defineGridClasses(params = {}) {
      let _innerClasses = ''
      Object.keys(gridClassesMap).forEach(prop => {
        if (gridClassesMap[prop].slice(-1) === '-') {
          if ((prop === 'spacing' && params.container && !params.item) || (prop !== 'spacing' && typeof params[prop] !== 'undefined')) {
            _innerClasses = `${_innerClasses}${gridClassesMap[prop]}${params[prop]} `
          }
        } else if (typeof params[prop] === 'boolean' && params[prop]) {
          _innerClasses = `${_innerClasses}${gridClassesMap[prop]} `
        }
      })
      this.setData({
        _innerClasses,
        _pureIsGenMuiClasses: true,
      })
    },
    _defineGridStyles(params = {}) {
      let _innerStyles = ''
      Object.keys(gridStylesMap).forEach(prop => {
        if (params[prop]) {
          _innerStyles = `${_innerStyles}${gridStylesMap[prop]}:${params[prop]};`
        }
      })
      this.setData({
        _innerStyles,
        _pureIsGenMuiStyles: true,
      })
    },
  },
  observers: {
    [Object.keys(gridStylesMap).join(',')](alignContent, alignItems, direction, justify, wrap) {
      this._defineGridStyles({
        alignContent, alignItems, direction, justify, wrap
      })
    },
    [Object.keys(gridClassesMap).join(',')](container, item, spacing, xs, sm, md, lg, xl) {
      this._defineGridStyles({
        container,
        item,
        spacing,
        xs,
        sm,
        md,
        lg,
        xl,
      })
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
