const {construct} = require('../nodes/utils');
const Scope = require('./Scope');

module.exports = function interpreter(ast, scope) {
    if (ast.type === 'Program') {
        construct(ast, new Scope(null, scope)).run();
    } else {
        throw new Error(`the type of root node of ast must be Program`);
    }
}
