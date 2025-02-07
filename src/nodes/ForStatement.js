const Node = require('./Node');
// const Scope = require('../common/Scope');
const {construct} = require('./utils');

module.exports = class ForStatement extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.init = construct(node.init, this.scope);
        this.test = construct(node.test, this.scope);
        this.update = construct(node.update, this.scope);
        this.body = construct(node.body, this.scope);
    }

    run(context) {
        this.init.run();

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

            this.update.run();
        }
    }
}
