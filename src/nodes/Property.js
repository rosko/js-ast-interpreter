const Node = require('./Node');
const {construct} = require('./utils');

module.exports = class Property extends Node {
    constructor(node, scope) {
        super(node, scope);
        this.key = construct(node.key, scope);
        this.value = construct(node.value, scope);

        if (node.method) {
            throw new Error('Property method probably is not supported yet. Please check');
        }
        if (node.shorthand) {
            throw new Error('Property shorthand probably is not supported yet. Please check');
        }
        if (node.kind !== 'init') {
            throw new Error(`Property kind "${node.kind}" probably is not supported yet. Please check`);
        }
    }

    run(obj) {
        const value = this.value.run();
        if (this.node.computed) {
            obj[this.key.run()] = value;
        } else if (this.key.type === 'Literal') {
            obj[this.key.run()] = value;
        } else if (this.key.type === 'Identifier') {
            obj[this.key.name] = value;
        } else {
            throw new Error(`Unsupported property key type "${this.key.type}"`);
        }
    }
}
