// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.every
es5id: 15.4.4.16-7-c-i-21
description: >
    Array.prototype.every - element to be retrieved is inherited
    accessor property without a get function on an Array-like object
---*/

        var accessed = false;

        function callbackfn(val, idx, obj) {
            accessed = true;
            return typeof val === "undefined";
        }

        var proto = {};
        Object.defineProperty(proto, "1", {
            set: function () { },
            configurable: true
        });

        var Con = function () { };
        Con.prototype = proto;

        var child = new Con();
        child.length = 2;

assert(Array.prototype.every.call(child, callbackfn), 'Array.prototype.every.call(child, callbackfn) !== true');
assert(accessed, 'accessed !== true');

reportCompare(0, 0);
