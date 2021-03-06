// |reftest| error:SyntaxError
// This file was procedurally generated from the following sources:
// - src/async-generators/await-as-identifier-reference.case
// - src/async-generators/syntax/async-class-decl-static-method.template
/*---
description: await is a reserved keyword within generator function bodies and may not be used as an identifier reference. (Static async generator method as a ClassDeclaration element)
esid: prod-AsyncGeneratorMethod
features: [async-iteration]
flags: [generated]
negative:
  phase: early
  type: SyntaxError
info: |
    ClassElement :
      static MethodDefinition

    MethodDefinition :
      AsyncGeneratorMethod

    Async Generator Function Definitions

    AsyncGeneratorMethod :
      async [no LineTerminator here] * PropertyName ( UniqueFormalParameters ) { AsyncGeneratorBody }


    IdentifierReference : Identifier

    It is a Syntax Error if this production has a [Await] parameter and
    StringValue of Identifier is "await".

---*/
throw "Test262: This statement should not be evaluated.";


class C { static async *gen() {
    void await;
}}
