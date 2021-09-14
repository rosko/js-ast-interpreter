const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class VariableDeclarator extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.scope.setOwn(node.id.name, undefined);
        this.__initScope = node.init && construct(node.init, scope);
    }

    run() {
        this.__initScope && this.scope.setOwn(this.node.id.name, this.__initScope.run());
    }
}
