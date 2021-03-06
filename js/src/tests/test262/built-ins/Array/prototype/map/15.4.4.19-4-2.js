// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-array.prototype.map
es5id: 15.4.4.19-4-2
description: >
    Array.prototype.map throws ReferenceError if callbackfn is
    unreferenced
---*/

  var arr = new Array(10);
assert.throws(ReferenceError, function() {
    arr.map(foo);
});

reportCompare(0, 0);
