import muiBase from '../../behaviors/muiBase.ts'
import rippleBase from '../../behaviors/rippleBase.ts'

Component({
  behaviors: [muiBase, rippleBase],
  options: {
    virtualHost: true,
    pureDataPattern: /^_pure/,
    styleIsolation: 'apply-shared',
  }
})
