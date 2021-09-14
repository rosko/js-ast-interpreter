const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class IfStatement extends Node {
    constructor(node, scope) {
        super(node, scope)
        this.test = construct(node.test, scope);
        this.consequent = construct(node.consequent, scope);
        this.alternate = node.alternate && construct(node.alternate, scope);
    }

    run(context) {
        if (this.test.run()) {
            return this.consequent.run(context);
        } else if (this.alternate) {
            return this.alternate.run(context);
        }
    }
}
