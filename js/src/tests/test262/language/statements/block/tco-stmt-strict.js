// |reftest| skip -- tail-call-optimization is not supported
'use strict';
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Statement within statement is a candidate for tail-call optimization.
esid: static-semantics-hasproductionintailposition
flags: [onlyStrict]
features: [tail-call-optimization]
includes: [tcoHelper.js]
---*/

var callCount = 0;
(function f(n) {
  if (n === 0) {
    callCount += 1
    return;
  }
  { return f(n - 1); }
}($MAX_ITERATIONS));
assert.sameValue(callCount, 1);

reportCompare(0, 0);
