/* -*- tab-width: 2; indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


/**
   File Name:          15.9.5.24-1.js
   ECMA Section:       15.9.5.24 Date.prototype.setTime(time)
   Description:
   1.      If the this value is not a Date object, generate a runtime error.
   2.      Call ToNumber(time).
   3.      Call TimeClip(Result(1)).
   4.      Set the [[Value]] property of the this value to Result(2).
   5.      Return the value of the [[Value]] property of the this value.
   Author:             christine@netscape.com
   Date:               12 november 1997

*/
var TITLE = "Date.prototype.setTime"
  var SECTION = "15.9.5.24-1";

writeHeaderToLog( SECTION + " Date.prototype.setMilliseconds(ms)");


addTestCase( 0, "-2208988800000" );

test();

function addTestCase( startms, newms ) {

  var DateCase = new Date( startms );
  DateCase.setMilliseconds( newms );
  var DateString = "var date = new Date("+ startms +"); date.setMilliseconds("+ newms +"); date";
  var localms = UTC( Number(newms) + LocalTime( Number(startms) ) );
  var UTCDate = UTCDateFromTime( localms );
  var LocalDate = LocalDateFromTime( localms );

  new TestCase( DateString+".getTime()",             UTCDate.value,       DateCase.getTime() );
  new TestCase( DateString+".valueOf()",             UTCDate.value,       DateCase.valueOf() );

  new TestCase( DateString+".getUTCFullYear()",      UTCDate.year,    DateCase.getUTCFullYear() );
  new TestCase( DateString+".getUTCMonth()",         UTCDate.month,  DateCase.getUTCMonth() );
  new TestCase( DateString+".getUTCDate()",          UTCDate.date,   DateCase.getUTCDate() );

  new TestCase( DateString+".getUTCHours()",         UTCDate.hours,  DateCase.getUTCHours() );
  new TestCase( DateString+".getUTCMinutes()",       UTCDate.minutes,DateCase.getUTCMinutes() );
  new TestCase( DateString+".getUTCSeconds()",       UTCDate.seconds,DateCase.getUTCSeconds() );
  new TestCase( DateString+".getUTCMilliseconds()",  UTCDate.ms,     DateCase.getUTCMilliseconds() );

  new TestCase( DateString+".getFullYear()",         LocalDate.year,       DateCase.getFullYear() );
  new TestCase( DateString+".getMonth()",            LocalDate.month,      DateCase.getMonth() );
  new TestCase( DateString+".getDate()",             LocalDate.date,       DateCase.getDate() );

  new TestCase( DateString+".getHours()",            LocalDate.hours,      DateCase.getHours() );
  new TestCase( DateString+".getMinutes()",          LocalDate.minutes,    DateCase.getMinutes() );
  new TestCase( DateString+".getSeconds()",          LocalDate.seconds,    DateCase.getSeconds() );
  new TestCase( DateString+".getMilliseconds()",     LocalDate.ms,         DateCase.getMilliseconds() );

  DateCase.toString = Object.prototype.toString;

  new TestCase(
		DateString+".toString=Object.prototype.toString;"+DateString+".toString()",
		"[object Date]",
		DateCase.toString() );
}

function MyDate() {
  this.year = 0;
  this.month = 0;
  this.date = 0;
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.ms = 0;
}
function LocalDateFromTime(t) {
  t = LocalTime(t);
  return ( MyDateFromTime(t) );
}
function UTCDateFromTime(t) {
  return ( MyDateFromTime(t) );
}
function MyDateFromTime( t ) {
  var d = new MyDate();
  d.year = YearFromTime(t);
  d.month = MonthFromTime(t);
  d.date = DateFromTime(t);
  d.hours = HourFromTime(t);
  d.minutes = MinFromTime(t);
  d.seconds = SecFromTime(t);
  d.ms = msFromTime(t);

  d.time = MakeTime( d.hours, d.minutes, d.seconds, d.ms );
  d.value = TimeClip( MakeDate( MakeDay( d.year, d.month, d.date ), d.time ) );
  d.day = WeekDay( d.value );

  return (d);
}
