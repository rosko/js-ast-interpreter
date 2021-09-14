const Node = require('./Node');
const {construct} = require('./utils');
const $Function = require('./$Function');

module.exports = class UnaryExpression extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.argument = construct(node.argument, scope);
    }

    run() {
        const argument = this.argument.run();

        switch (this.node.operator) {
            case 'typeof':
                return argument instanceof $Function ? 'function' : typeof argument;
            case '!':
                return !argument;
            default:
                throw new Error(`Operator "${this.node.operator}" is not supported in UnaryExpression`);
        }
    }
}
