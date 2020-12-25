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
    _clickPopoverContent() {},
    _onBeforeShow() {
      return this._computePostion()
    },
    _computePostion() {
      return new Promise((resolve) => {
        this._positionComputed = true
        let count = 0
        const position: any = {}
        const query1 = this.createSelectorQuery().select('.mui-popover-anchor').fields({rect: true})
        query1.exec(res => {
          console.log(2, res)
          const {
            top,
            right,
            bottom,
            left
          } = res[0] || {}
          position.anchorTop = top
          position.anchorRight = right
          position.anchorBottom = bottom
          position.anchorLeft = left
          count += 1
          if (count >= 2) {
            resolve(position)
          }
        })
        const query2 = this.createSelectorQuery().select('.mui-popover-content').fields({size: true})
        query2.exec(res => {
          console.log(2, res)
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
      }).then((position: any) => {
        console.log(position)
        return null
      }).catch(e => console.log(e))
    }
  },
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
    multipleSlots: true,
  },
})
