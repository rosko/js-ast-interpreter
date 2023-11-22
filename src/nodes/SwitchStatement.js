const Node = require('./Node')
const {construct} = require('./utils')

module.exports = class SwitchStatement extends Node {
    constructor(node, scope) {
        super(node, scope)
        this.scope = scope;
        this.discriminant = construct(node.discriminant, this.scope);
        this.cases = node.cases.map(n => construct(n, this.scope));
    }

    run(context) {
        const discriminant = this.discriminant.run();

        const loopContext = {
            ...context,
            loop: {}
        };

        let matched = false;
        for (const currentCase of this.cases) {

            if (!matched && currentCase.test && currentCase.test.run() != discriminant) {
                continue;
            }

            matched = true;
            if (!currentCase.consequent || !currentCase.consequent.length) {
                continue;
            }

            currentCase.run(loopContext);

            if (loopContext.func && 'return' in loopContext.func) {
                return loopContext.func.return;
            }
            if (loopContext.loop && loopContext.loop.break) {
                break;
            }

        }
    }
}
