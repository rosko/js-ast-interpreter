const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class BlockStatement extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.body = node.body.map(n => construct(n, this.scope));
    }

    run(context) {
        for (let node of this.body) {

            node.run(context);

            if (context.func && 'return' in context.func) {
                return context.func.return;
            }
        }
    }
}
