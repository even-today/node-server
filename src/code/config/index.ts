import Config  from '#/interface/config'
import devConfig from './development'
import prodConfig from './production'
import testConfig from './test'

let config: Config
switch (process.env.NODE_ENV) {
    case 'production': {
        config = prodConfig
        break
    }
    case 'development': {
        config = devConfig
        break
    }
    case 'test': {
        config = testConfig
        break
    }
    default: {
        config = devConfig
        break
    }
}

export default config