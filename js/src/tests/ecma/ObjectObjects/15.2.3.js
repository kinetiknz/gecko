/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


/**
   File Name:          15.2.3.js
   ECMA Section:       15.2.3 Properties of the Object Constructor

   Description:        The value of the internal [[Prototype]] property of the
   Object constructor is the Function prototype object.

   Besides the call and construct propreties and the length
   property, the Object constructor has properties described
   in 15.2.3.1.

   Author:             christine@netscape.com
   Date:               28 october 1997

*/

var SECTION = "15.2.3";
var TITLE   = "Properties of the Object Constructor";

writeHeaderToLog( SECTION + " " + TITLE);

//    new TestCase( "Object.__proto__",     Function.prototype,     Object.__proto__ );
new TestCase( "Object.length",        1,                      Object.length );

test();
