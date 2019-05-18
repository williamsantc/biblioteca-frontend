import bpConfig from './core'

const install = (Vue) => {
    Vue.prototype.$breakPoint = bpConfig.instance
}

export default { install }
