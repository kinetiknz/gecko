// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 13.1-2-6
description: >
    arguments allowed as formal parameter name of a non-strict
    function expression
flags: [noStrict]
---*/

    eval("(function foo(arguments){});");

reportCompare(0, 0);
