const acorn = require('acorn');
const interpreter = require('./interpreter');

exports.run = function run(code, scope) {
    return interpreter(acorn.parse(code, {
        ecmaVersion: 2020,
        locations: false
    }), scope);
}
