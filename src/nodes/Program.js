const Node = require('./Node');
const Scope = require('../common/Scope');
const {construct} = require('./utils');

module.exports = class Program extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = new Scope(scope);
        this.body = node.body.map(n => construct(n, this.scope));
    }

    run() {
        // context to track loops (and breaks), functions (this and returns)
        // Program, $Function should create new context
        // - context.loop.break (true/false) (to break loops)
        // - context.func.return (any) (to return a result of a function)
        // - context.$this (to keep "this" pointer in a function)
        // - context.call.this (to keep "this" pointer in case of call expression + member expression)
        const context = {};

        for (let node of this.body) {
            node.run(context);
        }
    }
}
