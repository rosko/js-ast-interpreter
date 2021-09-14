const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class SwitchCase extends Node {
    constructor(node, scope) {
        super(node, scope)
        this.test = node.test !== null ? construct(node.test, scope) : null;
        this.consequent = node.consequent.map(n => construct(n, scope));
    }

    run(context) {
        for (let node of this.consequent) {

            node.run(context);

            if (context.func && 'return' in context.func) {
                return context.func.return;
            }

        }
    }
}
