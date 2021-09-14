const {construct} = require('../nodes/utils');
const Scope = require('./Scope');

module.exports = function interpreter(ast, scope, code = '') {
    if (ast.type === 'Program') {
        construct(ast, new Scope(null, {
            ...scope,
            ___sourceCode: code
        })).run();
    } else {
        throw new Error(`the type of root node of ast must be Program`);
    }
}
