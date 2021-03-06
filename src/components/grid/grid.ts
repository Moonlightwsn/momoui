import muiBase from '../../behaviors/muiBase.ts'

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
  behaviors: [muiBase],
  properties: {
    alignContent: {
      type: String,
      value: 'stretch',
    },
    alignItems: {
      type: String,
      value: 'stretch',
    },
    container: {
      type: Boolean,
      value: false,
    },
    direction: {
      type: String,
      value: 'row',
    },
    item: {
      type: Boolean,
      value: false,
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
    xs: {
      type: Boolean,
      optionalTypes: [Number, String],
      value: false,
    },
    sm: {
      type: Boolean,
      optionalTypes: [Number, String],
      value: false,
    },
    md: {
      type: Boolean,
      optionalTypes: [Number, String],
      value: false,
    },
    lg: {
      type: Boolean,
      optionalTypes: [Number, String],
      value: false,
    },
    xl: {
      type: Boolean,
      optionalTypes: [Number, String],
      value: false,
    },
    zeroMinWidth: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    _innerStyles: '',
    _innerClasses: '',
  },
  attached() {
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
    } = this.data
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
    this._defineGridStyles({
      alignContent, alignItems, direction, justify, wrap
    })
  },
  methods: {
    _defineGridClasses(params = {}) {
      let _innerClasses = ''
      Object.keys(gridClassesMap).forEach(prop => {
        if (gridClassesMap[prop].slice(-1) === '-') {
          if ((prop === 'spacing' && params.container) || (prop !== 'spacing' && params[prop])) {
            _innerClasses = `${_innerClasses}${gridClassesMap[prop]}${params[prop]} `
          }
        } else if (typeof params[prop] === 'boolean' && params[prop]) {
          _innerClasses = `${_innerClasses}${gridClassesMap[prop]} `
        }
      })
      this.setData({
        _innerClasses,
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
    },
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
