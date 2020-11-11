import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    test: {},
    checked: true,
    modelChecked: false,
    size: 'medium',
    checkedValue: ['D', 'F'],
    input: 'Hello world',
    disabled: true,
  },
  onLoad() {
    this.setData({
      trigger: this.trigger.bind(this),
      inputChange: this.inputChange.bind(this),
      radioChange: this.radioChange.bind(this),
      groupChange: this.groupChange.bind(this),
      _test: this._test.bind(this)
    })
  },
  inputChange: (value, cursor, keyCode) => {
    console.log(value, cursor, keyCode)
  },
  trigger(checked) {
    console.log('trigger', checked, this.data)
    // this.setData({modelChecked: checked})
  },
  radioChange(checked) {
    console.log('radioChange', checked)
  },
  showInput() {
    console.log(this.data.input, this.data.checked)
  },
  groupChange(checkedValue) {
    console.log('groupChange', checkedValue)
    this.setData({checkedValue})
  },
  changeSize() {
    this.setData({
      size: this.data.size === 'small' ? 'medium' : 'small',
    })
  },
  changeDisabled() {
    this.setData({
      disabled: !this.data.disabled,
    })
  },
  submit(event) {
    console.log(event)
  },
  reset(event) {
    console.log(event)
  },
  _test(value) {
    console.log('test', value, this.data)
  },
})