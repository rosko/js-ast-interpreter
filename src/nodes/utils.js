module.exports.construct = function construct(node, ...args) {
    if (typeof nodes[node.type] !== 'function') {
        console.error(node);
        throw new Error(`node type ${node.type} is not implemented yet`);
    }

    return Reflect.construct(nodes[node.type], [node, ...args]);
}

const nodes = require('./index');
