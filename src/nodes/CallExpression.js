const Node = require('./Node');
const $Function = require('./$Function');
const {construct} = require('./utils');

module.exports = class CallExpression extends Node {
    constructor(node, scope) {
        super(node, scope)
        this.scope = scope
        this.callee = construct(node.callee, scope)
        this.arguments = node.arguments.map(a => construct(a, scope))
    }

    run(context) {
        const callContext = {call: {}};

        const callee = this.callee.run(callContext);

        if (typeof callee == 'function' || callee instanceof $Function) {
            return callee.apply(callContext.call.this, this.arguments.map(a => a.run(context)))
        } else {
            throw new Error('not callable');
        }
    }
}

