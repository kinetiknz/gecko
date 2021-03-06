// |reftest| error:SyntaxError
'use strict';
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-function-definitions
es6id: 14.1
description: >
  The `yield` token is interpreted as an IdentifierReference within a generator
  and outside of strict mode
info: |
  FunctionDeclaration[Yield, Default] :
    function BindingIdentifier[?Yield] ( FormalParameters ) { FunctionBody }
features: [generators, default-parameters]
flags: [onlyStrict]
negative:
  phase: early
  type: SyntaxError
---*/

throw "Test262: This statement should not be evaluated.";

function *g() {
  function f(x = yield) {
    paramValue = x;
  }
}
