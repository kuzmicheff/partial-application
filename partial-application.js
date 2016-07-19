"use strict";

const fs = require("fs");

function modifyTextLine(textLine) {

    var modifiedLine = textLine.concat(" has been modified successfully!");
    console.log(modifiedLine);
}

function applyTELOF(fn, filename) {

    var contents = fs.readFileSync(filename),
        array = contents.toString().split("\r\n");

    array.forEach(fn);
}

function partiallyApplyTELOF(argument) {

    if (typeof(argument) === "string") {

        return function(fn) {

            applyTELOF(fn, argument);
        }
    }

    else if (typeof(argument) === "function") {

        return function(filename) {

            applyTELOF(argument, filename);
        }
    }

    else {

        console.log("The supplied argument must be either a filename or function!")
    }
}

var argument1 = "test.txt";
var argument2 = modifyTextLine;

var newApplyTELOF = partiallyApplyTELOF(argument1);
newApplyTELOF(argument2);

