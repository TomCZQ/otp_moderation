require('dotenv').config()
const config = {
    default: {
        DATABASE: process.env.MONGODB_URI
    }
}

exports.get= function(env){
    return config[env]||config.default
}