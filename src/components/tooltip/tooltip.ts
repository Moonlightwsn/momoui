import muiBase from '../../behaviors/muiBase.ts'
import openCloseTransition from '../../behaviors/transition/openClose.ts'

Component({
  behaviors: [muiBase, openCloseTransition],
  properties: {
    arrow: {
      type: Boolean,
      value: false,
    },
    onOpen: {
      // @ts-ignore
      type: Function,
      value: null,
    },
    placement: {
      type: String,
      value: 'bottom',
    },
    title: {
      type: String,
      value: null,
    },
    tooltipClass: {
      type: String,
      value: '',
    },
    tooltipStyle: {
      type: String,
      value: '',
    },
  },
  data: {
    _positionStyle: '',
    _arrowPositionStyle: '',
  },
  lifetimes: {
    attached() {
      const {open} = this.data
      if (typeof open === 'boolean') {
        this._becontrolled = true
      }
      if (open) {
        this._computePostion()
      }
    }
  },
  methods: {
    _touchstart(e) {
      const newOpen = !this.data.open
      const newData: any = {}
      if (!this._becontrolled) {
        newData.open = newOpen
      }
      const {onOpen, onClose} = this.data
      if (newOpen && onOpen && typeof onOpen === 'function') {
        onOpen(e)
      } else if (onClose && onClose && typeof onClose === 'function') {
        onClose(e)
      }
      this.setData(newData)
    },
    _onBeforeShow() {
      return this._computePostion()
    },
    _computePostion() {
      return new Promise((resolve) => {
        this.createSelectorQuery().select('.mui-tooltip-popper').fields({size: true}).exec(popperRes => {
          const [popperView] = popperRes
          const {width: popperWidth = 0, height: popperHeight = 0} = popperView
          this.createSelectorQuery().select('.mui-tooltip').fields({size: true}).exec(tooptipRes => {
            const [tooptipView] = tooptipRes
            const {width: tooltipWidth = 0, height: tooltipHeight = 0} = tooptipView
            const {placement} = this.data
            let _positionStyle = ''
            let _arrowPositionStyle = ''
            const tooltipMargin = 14
            if (placement === 'bottom') {
              _positionStyle = `top: ${popperHeight + tooltipMargin}px;left: ${(popperWidth - tooltipWidth) / 2}px;`
              _arrowPositionStyle = `top: -7px;left: ${(tooltipWidth - 10) / 2}px;`
            } else if (placement === 'bottom-start') {
              _positionStyle = `top: ${popperHeight + tooltipMargin}px;left: 0;`
              _arrowPositionStyle = `top: -7px;left: ${(tooltipWidth - 10) / 2}px;`
            } else if (placement === 'bottom-end') {
              _positionStyle = `top: ${popperHeight + tooltipMargin}px;right: 0;`
              _arrowPositionStyle = `top: -7px;left: ${(tooltipWidth - 10) / 2}px;`
            } else if (placement === 'top') {
              _positionStyle = `top: -${tooltipHeight + tooltipMargin}px;left: ${(popperWidth - tooltipWidth) / 2}px;`
              _arrowPositionStyle = `bottom: -7px;left: ${(tooltipWidth - 10) / 2}px;`
            } else if (placement === 'top-start') {
              _positionStyle = `top: -${tooltipHeight + tooltipMargin}px;left: 0;`
              _arrowPositionStyle = `bottom: -7px;left: ${(tooltipWidth - 10) / 2}px;`
            } else if (placement === 'top-end') {
              _positionStyle = `top: -${tooltipHeight + tooltipMargin}px;right: 0;`
              _arrowPositionStyle = `bottom: -7px;left: ${(tooltipWidth - 10) / 2}px;`
            } else if (placement === 'left') {
              _positionStyle = `top: ${(popperHeight - tooltipHeight) / 2}px;left: -${tooltipWidth + tooltipMargin}px;`
              _arrowPositionStyle = `top: ${(tooltipHeight - 10) / 2}px;right: -7px;`
            } else if (placement === 'left-start') {
              _positionStyle = `top: 0;left: -${tooltipWidth + tooltipMargin}px;`
              _arrowPositionStyle = `top: ${(tooltipHeight - 10) / 2}px;right: -7px;`
            } else if (placement === 'left-end') {
              _positionStyle = `bottom: 0;left: -${tooltipWidth + tooltipMargin}px;`
              _arrowPositionStyle = `top: ${(tooltipHeight - 10) / 2}px;right: -7px;`
            } else if (placement === 'right') {
              _positionStyle = `top: ${(popperHeight - tooltipHeight) / 2}px;left: ${popperWidth + tooltipMargin}px;`
              _arrowPositionStyle = `top: ${(tooltipHeight - 10) / 2}px;left: -7px;`
            } else if (placement === 'right-start') {
              _positionStyle = `top: 0;left: ${popperWidth + tooltipMargin}px;`
              _arrowPositionStyle = `top: ${(tooltipHeight - 10) / 2}px;left: -7px;`
            } else if (placement === 'right-end') {
              _positionStyle = `bottom: 0;left: ${popperWidth + tooltipMargin}px;`
              _arrowPositionStyle = `top: ${(tooltipHeight - 10) / 2}px;left: -7px;`
            }
            resolve({_positionStyle, _arrowPositionStyle})
          })
        })
      })
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  }
})
