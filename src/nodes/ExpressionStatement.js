const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class ExpressionStatement extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.expression = construct(node.expression, scope);
    }

    run(context) {
        this.expression.run(context);
    }
}
