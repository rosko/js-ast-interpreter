const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class LogicalExpression extends Node {
    constructor(node, scope) {
        super(node, scope)
        this.left = construct(node.left, scope);
        this.right = construct(node.right, scope);
    }

    run(context) {
        const left = this.left.run(context);
        const right = this.right.run(context);

        switch (this.node.operator) {
            case '&&':
                return left && right;
            case '||':
                return left || right;
            default:
                throw new Error(`Operator "${this.node.operator}" is not supported in LogicalExpression`);
        }
    }
}
