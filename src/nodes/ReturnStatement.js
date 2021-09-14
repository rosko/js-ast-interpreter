const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class ReturnStatement extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.argument = construct(node.argument, scope);
    }

    run(context) {
        const result = this.argument.run();
        if (context && context.func) {
            context.func.return = result;
        }
        return result;
    }
}
