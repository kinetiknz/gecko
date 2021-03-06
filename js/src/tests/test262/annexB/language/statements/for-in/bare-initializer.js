// |reftest| error:SyntaxError
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-initializers-in-forin-statement-heads
description: >
    for-in heads prohibit AssignmentExpressions
negative:
  phase: early
  type: SyntaxError
---*/

throw "Test262: This statement should not be evaluated.";
var a;
throw NotEarlyError;
for (a = 0 in {});

