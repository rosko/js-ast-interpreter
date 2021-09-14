const {construct} = require('./utils');
const Scope = require('../common/Scope');

module.exports = class $Function {
    constructor(node, scope) {
        // un-bind case.
        if (node && scope) {
            this.node = node;
            this.scope = new Scope(scope);
            this.body = construct(node.body, this.scope)

            if (node.type === 'FunctionDeclaration') {
                this.scope.setOwn(node.id.name, this)
            }

            this.prototype = {constructor: this};
        }
    }

    _runtimeFunction() {
        const that = this;
        return function() {
            return that.apply.call(that, this, arguments);
        };
    }

    createRuntimeFunction() {
        const runtimeFunction = this._runtimeFunction();

        let code = '() { [native code] }'
        try {
            code = this.scope.get('___sourceCode').substring(this.node.start, this.node.end);
        } catch (e) {
        }

        Object.defineProperty(
            runtimeFunction,
            'toString',
            {
                writable: true, enumerable: false, configurable: true, value: function toString() {
                    return code;
                }
            }
        );

        runtimeFunction.getAST = () => this.node;

        Object.defineProperty(
            runtimeFunction,
            'length',
            {value: this.node.params.length, writable: false}
        );

        if (this.node.id && this.node.id.type === 'Identifier') {
            Object.defineProperty(
                runtimeFunction,
                'name',
                {value: this.node.id.name, writable: false}
            );
        }

        return runtimeFunction;
    }

    apply($this, $arguments) {
        if (this.__boundTarget) {
            return this.__boundTarget.apply(this.__boundThis, [...this.__boundArgs, ...$arguments])
        } else {
            for (let i = 0, len = $arguments.length; i < len; i++) {
                if (this.node.params[i]) {
                    this.scope.setOwn(this.node.params[i].name, $arguments[i]);
                }
            }

            const newContext = {
                $this,
                func: {}
            };

            return this.body.run(newContext);
        }
    }

    bind($this) {
        const args = Array.from(arguments).slice(1)
        const bfn = new $Function()
        bfn.__boundThis = $this
        bfn.__boundArgs = args
        bfn.__boundTarget = this
        return bfn
    }
}
