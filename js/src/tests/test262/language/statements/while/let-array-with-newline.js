// |reftest| error:SyntaxError
// Copyright (C) 2017 André Bargull. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-while-statement
description: >
  ExpressionStatement has a lookahead restriction for `let [`.
info: |
  ExpressionStatement[Yield, Await] :
    [lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }]
    Expression[+In, ?Yield, ?Await] ;
negative:
  phase: early
  type: SyntaxError
flags: [noStrict]
---*/

throw "Test262: This statement should not be evaluated.";

while (false) let
[a] = 0;
