import themeMixin from '../../behaviors/theme'

Page({
  behaviors: [themeMixin],
  data: {
    spacing: 2,
    direction: 'row',
    directions: [
      'row',
      'row-reverse',
      'column',
      'column-reverse',
    ],
    justify: 'center',
    justifys: [
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
    ],
    alignItem: 'center',
    alignItems: [
      'flex-start',
      'center',
      'flex-end',
      'stretch',
      'baseline',
    ],
  },
  onLoad() {
    this.setData({
      ChangeSpacing: this.ChangeSpacing.bind(this),
      ChangeDirection: this.ChangeDirection.bind(this),
      ChangeJustify: this.ChangeJustify.bind(this),
      ChangeAlignItem: this.ChangeAlignItem.bind(this)
    })
  },
  ChangeSpacing(spacing) {
    this.setData({spacing})
  },
  ChangeDirection(direction) {
    this.setData({direction})
  },
  ChangeJustify(justify) {
    this.setData({justify})
  },
  ChangeAlignItem(alignItem) {
    this.setData({alignItem})
  },
})
