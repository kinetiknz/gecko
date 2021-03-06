// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.reduceright
es5id: 15.4.4.22-9-c-i-2
description: >
    Array.prototype.reduceRight - element to be retrieved is own data
    property on an Array
---*/

        var testResult = false;
        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 1) {
                testResult = (curVal === 1);
            }
        }

        var arr = [0, 1, 2];
        arr.reduceRight(callbackfn, "initialValue");

assert(testResult, 'testResult !== true');

reportCompare(0, 0);
