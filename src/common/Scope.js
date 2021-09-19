module.exports = class Scope {
    constructor(upper, dict) {
        this.dict = dict || Object.create(null)
        this.upper = upper
    }

    hasOwn(key) {
        return key in this.dict
    }

    getOwn(key) {
        return this.dict[key]
    }

    get(key) {
        let current = this

        while (current) {
            if (current.hasOwn(key)) {
                return current.getOwn(key)
            } else {
                current = current.upper
            }
        }
    }

    has(key) {
        let current = this

        while (current) {
            if (current.hasOwn(key)) {
                return true;
            } else {
                current = current.upper
            }
        }
        return false;
    }

    setOwn(key, val) {
        this.dict[key] = val;
    }

    set(key, val) {
        let current = this

        while (current) {
            if (current.hasOwn(key)) {
                current.setOwn(key, val)
                break
            } else {
                current = current.upper
            }
        }
    }
}
