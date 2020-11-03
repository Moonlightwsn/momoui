export default Behavior({
  properties: {
    checked: {
      type: Boolean,
      value: null,
    },
    checkedIcon: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: 'secondary',
    },
    defaultChecked: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    ripple: {
      type: Boolean,
      value: true,
    },
    icon: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: 'medium',
    }
  },
  data: {
    _checked: false,
  },
  lifetimes: {
    created() {
      console.log('check create', this.data.color)
    },
    attached() {
      const {checked, defaultChecked} = this.data
      console.log('check attached', this.data.color)
      if (typeof checked !== 'boolean') {
        this.setData({
          _checked: defaultChecked,
        })
      }
    }
  },
  methods: {
    _checkControol() {
      const {checked, _checked} = this.data
      this.triggerEvent('change', {checked: !_checked})
      if (typeof checked !== 'boolean') {
        this.setData({
          _checked: !_checked,
        })
      }
    }
  },
  observers: {
    checked(checked) {
      this.setData({
        _checked: checked,
      })
    }
  },
})
