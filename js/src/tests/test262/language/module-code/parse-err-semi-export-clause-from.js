// |reftest| error:SyntaxError module
// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
    "export ExportClause FromClause" declarations require a trailing semicolon
    or LineTerminator
esid: sec-exports
info: |
    ExportDeclaration:
      export * FromClause;
      export ExportClause FromClause;
      export ExportClause;
      export VariableStatement
      export Declaration
      export default HoistableDeclaration[Default]
      export default ClassDeclaration[Default]
      export default [lookahead ∉ { function, class }] AssignmentExpression[In];
negative:
  phase: early
  type: SyntaxError
flags: [module]
---*/

throw "Test262: This statement should not be evaluated.";

export {} from './parse-err-semi-export-clause-from.js' null;
