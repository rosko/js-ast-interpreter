const Node = require('./Node')
// const Scope = require('../common/Scope');
const {construct} = require('./utils')

module.exports = class WhileStatement extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.test = construct(node.test, this.scope);
        this.body = construct(node.body, this.scope);
    }

    run(context) {
        const loopContext = {
            ...context,
            loop: {}
        };

        while (this.test.run()) {
            this.body.run(loopContext);

            if (context.func && 'return' in context.func) {
                return context.func.return;
            }
            if (loopContext.loop.break) {
                break;
            }
        }
    }
}
