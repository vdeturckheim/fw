'use strict';

module.exports.NoSuchMethodError = class extends Error{

    constructor(method) {

        super(`Method ${method} is not supported`);
    }
};

module.exports.NoSuchPathError = class extends Error{

    constructor(method, path) {

        super(`Route ${method} ${path} does not exist`);
    }
};


