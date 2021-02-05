import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    anchorOrigin: {
      type: Object,
      value: {vertical: 'top', horizontal: 'left'},
    },
    anchorPosition: {
      type: Object,
      value: null,
    },
    elevation: {
      type: Number,
      value: 8,
    },
    marginThreshold: {
      type: Number,
      value: 16,
    },
    onBackdropClick: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    onClose: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    open: {
      type: Boolean,
      value: false,
    },
    transformOrigin: {
      type: Object,
      value: {vertical: 'top', horizontal: 'left'},
    },
    transitions: {
      type: Array,
      value: [],
    },
    transitionDelay: {
      type: Number,
      optionalTypes: [Object],
      value: 0,
    },
    transitionDuration: {
      type: Number,
      optionalTypes: [Object],
      value: 225,
    },
    transitionType: {
      type: String,
      value: 'fade',
    },
  },
  data: {
    _contentStyle: '',
  },
  lifetimes: {
    attached() {
      const backdropInPopoverComponent = this.selectComponent('._backdrop_in_popover')
      if (backdropInPopoverComponent) {
        backdropInPopoverComponent._onBeforeShow = this._onBeforeShow.bind(this)
        this._backdropInPopoverComponent = backdropInPopoverComponent
      }
    }
  },
  methods: {
    _ClickPopoverContent() {},
    _onBeforeShow() {
      return this._computePostion()
    },
    _computePostion() {
      return new Promise((resolve) => {
        let count = 0
        const position: any = {}
        const {anchorPosition} = this.data
        if (anchorPosition) {
          const {
            top: anchorPositionTop,
            left: anchorPositionLeft,
          } = anchorPosition
          if (
            !Number.isNaN(Number(anchorPositionTop)) &&
            !Number.isNaN(Number(anchorPositionLeft))
          ) {
            position.anchorPositionTop = Number(anchorPositionTop)
            position.anchorPositionLeft = Number(anchorPositionLeft)
            position.specifyPosition = true
            count += 1
          }
        }
        if (!position.specifyPosition) {
          const query1 = this.createSelectorQuery().select('.mui-popover-anchor').fields({
            rect: true,
            size: true,
          })
          query1.exec(res => {
            const {
              top,
              right,
              bottom,
              left,
              width,
              height,
            } = res[0] || {}
            position.anchorTop = top
            position.anchorRight = right
            position.anchorBottom = bottom
            position.anchorLeft = left
            position.anchorWidth = width
            position.anchorHeight = height
            count += 1
            if (count >= 2) {
              resolve(position)
            }
          })
        }
        const query2 = this.createSelectorQuery().select('.mui-popover-content').fields({size: true})
        query2.exec(res => {
          const {
            width,
            height,
          } = res[0] || {}
          position.contentWidth = width
          position.contentHeight = height
          count += 1
          if (count >= 2) {
            resolve(position)
          }
        })
      }).then((position: any) => new Promise((resolve) => {
        const {anchorOrigin, transformOrigin} = this.data
        let _contentStyle = 'position: fixed;'
        let top = 0
        let left = 0
        if (!position.specifyPosition) {
          const {vertical: anchorVertical = 'top', horizontal: anchorHorizontal = 'left'} = anchorOrigin || {}
          if (anchorVertical === 'top') {
            top = position.anchorTop
          } else if (anchorVertical === 'center') {
            top = position.anchorTop + (position.anchorHeight / 2)
          } else if (anchorVertical === 'bottom') {
            top = position.anchorTop + position.anchorHeight
          }
          if (anchorHorizontal === 'left') {
            left = position.anchorLeft
          } else if (anchorHorizontal === 'center') {
            left = position.anchorLeft + (position.anchorWidth / 2)
          } else if (anchorHorizontal === 'right') {
            left = position.anchorLeft + position.anchorWidth
          }
        } else {
          top = position.anchorPositionTop
          left = position.anchorPositionLeft
        }
        const {vertical: transformVertical = 'top', horizontal: transformHorizontal = 'left'} = transformOrigin || {}
        if (transformVertical === 'center') {
          top -= (position.contentHeight / 2)
        } else if (transformVertical === 'bottom') {
          top -= position.contentHeight
        }
        if (transformHorizontal === 'center') {
          left -= (position.contentWidth / 2)
        } else if (transformHorizontal === 'right') {
          left -= position.contentWidth
        }
        _contentStyle = `${_contentStyle}left:${left}px;top:${top}px;`
        this.setData({
          _contentStyle,
        }, () => resolve(null))
      })).catch(e => console.log(e))
    }
  },
  observers: {
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
