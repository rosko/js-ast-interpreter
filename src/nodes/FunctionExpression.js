const Node = require('./Node');
const $Function = require('./$Function');

module.exports = class FunctionExpression extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.$function = new $Function(node, scope);

        if (node.expression) {
            throw new Error('Expression as FunctionExpression is not supported yet')
        }
        if (node.async) {
            throw new Error('Async FunctionExpression is not supported yet')
        }
        if (node.generator) {
            throw new Error('Generator FunctionExpression is not supported yet')
        }
    }

    run() {
        return this.$function.createRuntimeFunction();
    }
}
