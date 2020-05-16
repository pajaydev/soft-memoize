'use strict';

const DEFAULT_OPTIONS = {
    key: null,
    maxAge: null
};

/*
 * Memoize the function calls until the maxAge.
 */

function memoize(func, options) {
    const cache = Object.create(null);
    const newOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    const defaultKey = newOptions.key ? options.key : null;
    let endTime = newOptions.maxAge ? getTime() + options.maxAge : null;
    const doMemoize = function () {
        const key = defaultKey ? defaultKey : getKey(arguments);
        if (endTime) {
            // if the time exceeds the max age, delete the cache key.
            if (getTime() > endTime) {
                delete cache[key];
            }
        }
        if (cache[key]) return cache[key];
        cache[key] = func.apply(this, arguments);
        return cache[key];
    };
    function getKey(args) {
        return JSON.stringify(args);
    }
    function getTime() {
        return new Date().getTime();
    }
    doMemoize.setMaxAge = function (newAge) {
        endTime = getTime() + newAge;
    };
    doMemoize.clearMaxAge = function () {
        endTime = getTime();
    };
    return doMemoize;
}

module.exports = memoize;
