// import {debounce} from '../../common/utils.ts'

interface RippleParams {
  width:number,
  height: number,
  left: number,
  top: number,
  scrollLeft: number,
  scrollTop: number,
  backgroundColor: string,
  x: number,
  y: number,
  center: boolean,
}

Component({
  data: {
    rippleArray: [],
    width: 0,
    height: 0,
    radius: 0,
    backgroundColor: '',
  },
  methods: {
    _RippleAction(params: RippleParams) {
      const {
        width,
        height,
        left,
        top,
        scrollLeft,
        scrollTop,
        backgroundColor,
        x,
        y,
        center = false,
      } = params
      const radius = Math.max(width, height)
      let rippleX
      let rippleY
      if (center) {
        rippleX = (width / 2) - (radius / 2)
        rippleY = (height / 2) - (radius / 2)
      } else {
        rippleX = (x - (left + scrollLeft)) - (radius / 2)
        rippleY = (y - (top + scrollTop)) - (radius / 2)
      }

      this.data.rippleArray.push({
        key: `ripple-${new Date().getTime()}-${Math.round(Math.random() * 10000)}`,
        x: rippleX,
        y: rippleY,
      })
      this.setData({
        rippleArray: this.data.rippleArray,
        width,
        height,
        radius,
        backgroundColor
      })
    },
    /* 暂时注销
    _updateRippleArray: debounce(function () {
      this.setData({
        rippleArray: this.data.rippleArray
      })
    }, 1000),
    */
    _clearRippleAction(e) {
      const {rippleKey} = e.detail
      const tobeDeleteIndex = this.data.rippleArray.findIndex(item => item.key === rippleKey)
      this.data.rippleArray.splice(tobeDeleteIndex, 1)
      /**
       *  this._updateRippleArray()
       *  使用debounce防抖可以减少短时间内大量不必要的setData
       *  但此处暂时不使用_updateRippleArray
       *  因为当ripple动画还未完成时，若组件的属性被人为更改（重新渲染）
       *  clear rippleArray后再调用_updateRippleArray无效，无法将ripple删掉
       *  这里就在下面直接setData了
       * */
      this.setData({
        rippleArray: this.data.rippleArray
      })
    },
  },
  options: {
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  },
})
