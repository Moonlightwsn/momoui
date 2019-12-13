

Component({
  properties: {
    mClass: String,
    mStyle: String,
    actions: {
      type: Array,
      value: [],
    },
    color: {
      type: String,
      value: 'primary',
    },
    controlled: {
      type: Boolean,
      value: false,
    },
    activeKey: String,
    activeColor: String,
  },
  data: {
    activeStatus: {
      active: {
        iconColor: '#1976d2',
        typographyStyle: 'font-szie:14px;line-height:17px;transition: font-size 0.2s, opacity 0.2s;transition-delay: 0.1s;',
      },
      normal: {
        iconColor: '#757575',
        typographyStyle: 'color:#757575;font-szie:12px;line-height:14px;',
      },
    },
  },
  methods: {
    _tap(e) {
      const {target: {dataset: {key = ''} = {}} = {}} = e
      const {activeKey, controlled} = this.properties
      if (key !== activeKey) {
        this.triggerEvent('change', {key})
        if (!controlled) {
          this.setData({
            activeKey: key,
          })
        }
      }
    },
  },
  lifetimes: {
    attached() {
      const {color} = this.properties
      if (color === 'secondary') {
        this.setData({
          activeStatus: {
            active: {
              iconColor: '#dc004e',
              typographyStyle: 'font-szie:14px;line-height:17px;',
            },
            normal: {
              iconColor: '#757575',
              typographyStyle: 'color:#757575;font-szie:12px;line-height:14px;',
            },
          }
        })
      }
    },
  },
  options: {
    styleIsolation: 'apply-shared',
  },
})
