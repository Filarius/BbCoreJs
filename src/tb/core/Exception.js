define('tb.core.Exception', ['tb.core.Api', 'jsclass'], function () {
    'use strict';

    /**
     * Exception is the base class for all BackBee toolbar exceptions
     */
    var Exception = new JS.Class({

        api: require('tb.core.Api'),

        /**
         * Construct the exception
         */
        initialize: function (name, message) {
            this.name = name || 'UnknowException';
            this.message = message || 'No description found for this exception.';
            this.params = {};
            this.stack = this.getStack();
        },

        /**
         * Gets the stack trace
         * @returns {array}
         */
        getStack: function () {
            var err = new Error(this.name),
                cleanStack = [],
                stack,
                key;

            if (err.stack) {
                stack = err.stack.split("\n");
                cleanStack = stack.slice(4);

                for (key in cleanStack) {
                    if (cleanStack.hasOwnProperty(key)) {
                        cleanStack[key] = this.parseStackLine(cleanStack[key]);
                    }
                }
            }

            return cleanStack;
        },


        /**
         * Function to stock the Exception in Api.get('errors') and Api.get('lastError')
         * @param {Exception} error
         */
        pushError: function (error, api) {
            if (undefined === api.get('errors')) {
                api.register('errors', []);
            }

            api.get('errors').push(error);
            api.register('lastError', error);
        },

        /**
         * Function to parse a stak trace line
         * @param {string} line  Should be something like <call>@<file>:<lineNumber>
         * @returns {object}
         */
        parseStackLine: function (line) {
            var splitedLine = line.split('@'),
                call = line,
                file = 'undefined',
                lineNumber = 'undefined';

            if (2 === splitedLine.length) {
                call = splitedLine[0];
                splitedLine = splitedLine[1].split(':');
                if (3 ===  splitedLine.length) {
                    file = splitedLine[0] + ':' + splitedLine[1];
                    lineNumber = splitedLine[2];
                }
            }

            return {
                line: lineNumber,
                file: file,
                call: call
            };
        }
    });

    return function (name, message) {
        var expected = new Exception(name, message);
        expected.pushError(expected, expected.api);

        throw name + ': ' + message;
    };
});
