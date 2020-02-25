const path = require('path')

const pkg = require(path.join(process.cwd(), 'package.json'))

module.exports = pkg.title
