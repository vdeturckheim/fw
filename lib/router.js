'use strict';
const Errors = require('./errors');

module.exports = class Router {

    constructor() {

        this.get = new Map();
    }

    _enforceMethod(method) {

        if (method !== 'get') {
            throw new Errors.NoSuchMethodError(method);
        }
    }

    add(method, path, controller) {

        this._enforceMethod(method);
        this[method].set(path, controller);
    }

    dispatch(method, path) {

        this._enforceMethod(method);
        const controller = this[method].get(path);
        if (controller === undefined) {
            throw new Errors.NoSuchPathError(method, path);
        }
        return controller;
    }
};
