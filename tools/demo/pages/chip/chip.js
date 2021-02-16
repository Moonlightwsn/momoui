import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    avatar: {src: '../../assets/avatar1.jpg'},
    chips: [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ],
  },
  onLoad() {
    this.setData({
      HandleClick: this.HandleClick.bind(this),
      HandleDelete: this.HandleDelete.bind(this),
      HandleDelete2: this.HandleDelete2.bind(this),
    })
  },
  HandleClick() {
    console.info('You clicked the Chip.')
  },
  HandleDelete() {
    console.info('You clicked the delete icon.')
  },
  HandleDelete2(e, dataset) {
    const {key} = dataset || {}
    const newChips = this.data.chips.filter(item => {
      return item.key !== key
    })
    this.setData({
      chips: newChips
    })
  },
})
