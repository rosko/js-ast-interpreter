const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class ObjectExpression extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.properties = node.properties.map(n => construct(n, this.scope));
    }

    run() {
        const obj = {};

        for (let property of this.properties) {
            property.run(obj);
        }

        return obj;
    }
}
