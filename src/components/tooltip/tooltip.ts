import muiBase from '../../behaviors/muiBase.ts'

Component({
  behaviors: [muiBase],
  properties: {
    arrow: {
      type: Boolean,
      value: false,
    },
    open: {
      type: Boolean,
      value: false,
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
    _positionStyle: 'display: none;',
  },
  lifetimes: {
    attached() {
      const {open} = this.data
      if (open) {
        this._computePostion()
      }
    }
  },
  methods: {
    _touchstart() {
      const newData: any = {
        open: !this.data.open,
      }
      if (!newData.open) {
        newData._positionStyle = 'display: none;'
      }
      this.setData(newData)
    },
    _computePostion() {
      this.createSelectorQuery().select('.mui-tooltip-popper').fields({size: true}).exec(popperRes => {
        const [popperView] = popperRes
        const {width: popperWidth = 0, height: popperHeight = 0} = popperView
        this.createSelectorQuery().select('.mui-tooltip').fields({size: true}).exec(tooptipRes => {
          const [tooptipView] = tooptipRes
          const {width: tooltipWidth = 0, height: tooltipHeight = 0} = tooptipView
          const {placement} = this.data
          let _positionStyle = ''
          const tooltipMargin = 14
          if (placement === 'bottom') {
            _positionStyle = `top: ${popperHeight + tooltipMargin}px;left: ${(popperWidth - tooltipWidth) / 2}px;`
          } else if (placement === 'bottom-start') {
            _positionStyle = `top: ${popperHeight + tooltipMargin}px;left: 0;`
          } else if (placement === 'bottom-end') {
            _positionStyle = `top: ${popperHeight + tooltipMargin}px;right: 0;`
          } else if (placement === 'top') {
            _positionStyle = `top: -${tooltipHeight + tooltipMargin}px;left: ${(popperWidth - tooltipWidth) / 2}px;`
          } else if (placement === 'top-start') {
            _positionStyle = `top: -${tooltipHeight + tooltipMargin}px;left: 0;`
          } else if (placement === 'top-end') {
            _positionStyle = `top: -${tooltipHeight + tooltipMargin}px;right: 0;`
          } else if (placement === 'left') {
            console.log(popperHeight, tooltipHeight, (popperHeight - tooltipHeight) / 2)
            _positionStyle = `top: ${(popperHeight - tooltipHeight) / 2}px;left: -${tooltipWidth + tooltipMargin}px;`
          } else if (placement === 'left-start') {
            _positionStyle = `top: 0;left: -${tooltipWidth + tooltipMargin}px;`
          } else if (placement === 'left-end') {
            _positionStyle = `bottom: 0;left: -${tooltipWidth + tooltipMargin}px;`
          } else if (placement === 'right') {
            _positionStyle = `top: ${(popperHeight - tooltipHeight) / 2}px;left: ${popperWidth + tooltipMargin}px;`
          } else if (placement === 'right-start') {
            _positionStyle = `top: 0;left: ${popperWidth + tooltipMargin}px;`
          } else if (placement === 'right-end') {
            _positionStyle = `bottom: 0;left: ${popperWidth + tooltipMargin}px;`
          }
          _positionStyle = `${_positionStyle}display: inline-block`
          this.setData({_positionStyle})
        })
      })
    }
  },
  observers: {
    open(open) {
      if (open) {
        this._computePostion()
      }
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  }
})
