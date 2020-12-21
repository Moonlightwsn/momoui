export default {
  fade: {
    transition: [{
      property: 'opacity',
    }],
    start: 'opacity: 0;',
    end: 'opacity: 1;',
  },
  grow: {
    transition: [{
      property: 'opacity',
    }, {
      property: 'transform',
      duration: (duration) => duration * 0.666,
    }],
    start: `opacity: 0; transform: scale(0.75, ${0.75 ** 2});`,
    end: 'opacity: 1; transform: scale(1, 1);',
  },
}
