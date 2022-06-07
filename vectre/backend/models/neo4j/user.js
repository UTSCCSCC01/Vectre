const _ = require("lodash")

const User = module.exports = function (_node)  {
    _.extend(this, _node.properties)
}