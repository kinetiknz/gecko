// Copyright (C) 2016 The V8 Project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 20.2.2.3
esid: sec-math.acosh
description: >
  Return Infinity if x is Infinity
info: |
  Math.acosh ( x )

  If x is +∞, the result is +∞.
---*/

assert.sameValue(Math.acosh(Infinity), Infinity);

reportCompare(0, 0);
