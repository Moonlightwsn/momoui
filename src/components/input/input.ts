import muiBase from '../../behaviors/muiBase.ts'
import muiController from '../../behaviors/muiController.ts'

Component({
  behaviors: [muiBase, muiController],
  properties: {
    color: {
      type: String,
      value: 'primary',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    disableUnderline: {
      type: Boolean,
      value: false,
    },
    fullWidth: {
      type: Boolean,
      value: false,
    },
    focus: {
      type: Boolean,
      value: false,
    },
    margin: {
      type: String,
      value: 'none',
    },
    multiline: {
      type: Boolean,
      value: false,
    },
    placeholder: {
      type: String,
      value: '',
    },
    readOnly: {
      type: Boolean,
      value: false,
    },
    rows: {
      type: Number,
      value: 1,
    },
    value: {
      type: String,
      value: '',
    },
  },
  data: {
    _focus: false,
    _textAutoHeight: true,
    _textareaHeight: 19,
  },
  lifetimes: {
    attached() {
      const {rows} = this.properties
      if (rows > 1) {
        const query = this.createSelectorQuery()
        query.select('.mui-input').fields({
          computedStyle: ['height'],
        })
        query.exec(res => {
          const [view] = res || []
          let {height} = view || {}
          if (height && height.slice(-2) === 'px') {
            height = Number(height.slice(0, -2))
            if (!Number.isNaN(height)) {
              this.setData({
                _textareaHeight: height * rows,
                _textAutoHeight: false,
              })
            }
          }
        })
      }
    }
  },
  methods: {
    _onFocus() {
      this.setData({_focus: true})
    },
    _onBlur() {
      this.setData({_focus: false})
    },
    _onChange(e) {
      console.log(e)
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
