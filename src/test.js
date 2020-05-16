
'use strict';
const memoize = require('./index');

describe('test soft memoize', () => {
    function fact(n) {
        if (n < 2) return n;
        return fact(n - 1) + fact(n - 2);
    }

    test('test memoize function with default options', () => {
        const mockFactFn = jest.fn(fact);
        const memoized = memoize(mockFactFn);
        expect(mockFactFn).not.toBeCalled();
        memoized(3);
        expect(mockFactFn).toBeCalled();
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        memoized(4);
        expect(mockFactFn).toHaveBeenCalledTimes(2);
    });


    test('test memoize function with different key', () => {
        const mockFactFn = jest.fn(fact);
        const memoized = memoize(mockFactFn, { key: 'MOCK_KEY' });
        expect(mockFactFn).not.toBeCalled();
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        // even argument changes, key should not change.
        memoized(4);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
    });

    test('test memoize function with max Age', () => {
        const mockFactFn = jest.fn(fact);
        const memoized = memoize(mockFactFn, { key: 'MOCK_KEY' });
        expect(mockFactFn).not.toBeCalled();
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        // even argument changes, key should not change.
        memoized(4);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
    });

    test('test memoize function with promise', () => {
        const mockFactFn = jest.fn(fact);
        const memoized = memoize(mockFactFn, { key: 'MOCK_KEY' });
        expect(mockFactFn).not.toBeCalled();
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        memoized(3);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
        // even argument changes, key should not change.
        memoized(4);
        expect(mockFactFn).toHaveBeenCalledTimes(1);
    });
});
