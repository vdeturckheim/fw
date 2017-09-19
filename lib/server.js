'use strict';
const Http = require('http');

const Context = require('./context');
const Router = require('./router');


module.exports = class {

    constructor() {

        this.routes = new Router();

        this._server = Http.createServer((req, res) => this.handle(req, res));
    }

    handle(request, response) {

        Context.setCurrent({ request, response });

        const controller = this.routes.dispatch(request.method.toLowerCase(), request.url);
        return controller(request, response);
    }

    start(port) {

        process.on('uncaughtException', (err) => {

            const context = Context.getCurrent();
            if (context) {
                context.response.statusCode = 500;
                return context.response.end(err.toString());
            }
            else {
                throw err;
            }
        });

        return new Promise((resolve, reject) => {

            this._server.listen(port, (err) => {

                if (err) return reject(err);
                return resolve();
            })
        });
    }
};

