const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class MemberExpression extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.scope = scope;
        this.object = construct(node.object, scope);
        this.property = construct(node.property, scope);
    }

    run(context) {
        const obj = Object(this.object.run(context));

        if (context && context.call) {
            context.call.this = obj;
        }

        if (this.node.computed) {
            return obj[this.property.run()];
        } else {
            return obj[this.property.name];
        }
    }
}
