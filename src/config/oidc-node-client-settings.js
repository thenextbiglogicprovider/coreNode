"use strict";
// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const timer = {
    setInterval(cb, duration) {
        return setInterval(cb, duration);
    },
    clearInterval(handle) {
        return clearInterval(handle);
    },
};
let testing = false;
let request = null;
class Global {
    static _testing() {
        testing = false;
    }
    static get location() {
        if (!testing) {
            return location;
        }
    }
    static get localStorage() {
        if (!testing) {
            return localStorage;
        }
    }
    static get sessionStorage() {
        if (!testing) {
            return sessionStorage;
        }
    }
    static setXMLHttpRequest(newRequest) {
        request = newRequest;
    }
    static get XMLHttpRequest() {
        if (!testing) {
            return request || XMLHttpRequest;
        }
    }
    static get timer() {
        if (!testing) {
            return timer;
        }
    }
}
exports.default = Global;
