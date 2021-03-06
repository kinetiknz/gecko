// |reftest| error:SyntaxError
// Copyright 2015 Cubane Canada, Inc.  All rights reserved.
// See LICENSE for details.

/*---
info: >
 GeneratorMethod early SyntaxError when lexical declaration
 inside generator shadows parameter name 
features: [generators]
es6id: 14.4.1
author: Sam Mikes
description: GeneratorMethod error with lexical shadowing
negative:
  phase: early
  type: SyntaxError
---*/

throw "Test262: This statement should not be evaluated.";

var obj = {
    *foo(a) {
        const a = 3;
    }
};
