export default function (breakPoints = [{
    value: 576,
    alias: 'sm',
    longAlias: 'small'
  },
  {
    value: 768,
    alias: 'md',
    longAlias: 'medium'
  },
  {
    value: 992,
    alias: 'lg',
    longAlias: 'large'
  },
  {
    value: Infinity,
    alias: 'xl',
    longAlias: 'extraLarge'
  }
]) {
  return {
    name: 'BreakPoint',
    mounted: function () {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    data: function () {
      return {
        breakPoints,
        value: '',
        size: 0
      }
    },
    render(h) {
      return h('div')
    },
    methods: {
      handleResize: function () {
        const clientWidth = window.innerWidth
        this.size = clientWidth
        for (let bp of this.breakPoints) {
          if (clientWidth <= bp.value) {
            this.value = bp.alias
            break
          }
        }
      },
      gte: function (reqBp) {
        let reqBpObj = this.breakPoints.find(bp => bp.alias === reqBp)
        if (this.size >= reqBpObj.value) {
          return true
        }
        return false
      },
      gt: function (reqBp) {
        let reqBpObj = this.breakPoints.find(bp => bp.alias === reqBp)
        if (this.size > reqBpObj.value) {
          return true
        }
        return false
      },
      lt: function (reqBp) {
        let reqBpObj = this.breakPoints.find(bp => bp.alias === reqBp)
        if (this.size < reqBpObj.value) {
          return true
        }
        return false
      },
      lte: function (reqBp) {
        let reqBpObj = this.breakPoints.find(bp => bp.alias === reqBp)
        if (this.size <= reqBpObj.value) {
          return true
        }
        return false
      }
    }
  }
}
