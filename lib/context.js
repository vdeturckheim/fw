'use strict';
const async_hooks = require('async_hooks');

const store = new Map();
let current = null;

const init = function (asyncId) {

    store.set(asyncId, current);
};

const before = function (id) {

    current = store.get(id);
};

const after = function () {

    current = null;
};
const destroy = function (id) {

    store.delete(id);
};

const asyncHook = async_hooks.createHook({ init, before, destroy, after });
asyncHook.enable();


module.exports.setCurrent = function (item) {

    current = item;
};

module.exports.getCurrent = function () {

    return current;
};


