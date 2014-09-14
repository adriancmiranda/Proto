/**
 * Class
 * @description Class is a small JavaScript library for simple but powerful class based inheritance.
 * @version v0.0.2
 * @author Adrian C. Miranda
 * @link https://github.com/adriancmiranda/class.js
 * @license MIT Licensed
 */
(function (window, document, undefined) {
    //| .-------------------------------------------------------------------.
    //| | NAMING CONVENTIONS:                                               |
    //| |-------------------------------------------------------------------|
    //| | Singleton-literals and prototype objects      | PascalCase        |
    //| |-------------------------------------------------------------------|
    //| | Functions and public variables                | camelCase         |
    //| |-------------------------------------------------------------------|
    //| | Global variables and constants                | UPPERCASE         |
    //| |-------------------------------------------------------------------|
    //| | Private variables                             | _underscorePrefix |
    //| '-------------------------------------------------------------------'
    //|
    //| Comment syntax for the entire project follows JSDoc:
    //| @see http://code.google.com/p/jsdoc-toolkit/wiki/TagReference
    //'
    'use strict';
    var DONT_ENUMS, IS_DONTENUM_BUGGY;
    DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    IS_DONTENUM_BUGGY = function () {
        for (var property in { toString: 1 }) {
            if (property === 'toString') {
                return false;
            }
        }
        return true;
    }();
    function getDefinitionName(value, strict) {
        if (value === false) {
            return 'Boolean';
        }
        if (value === '') {
            return 'String';
        }
        if (value === 0) {
            return 'Number';
        }
        if (value && value.constructor) {
            var name = (value.constructor.toString() || Object.prototype.toString.apply(value)).replace(/^.*function([^\s]*|[^\(]*)\([^\x00]+$/, '$1').replace(/^(\[object\s)|]$/g, '').replace(/\s+/, '') || 'Object';
            if (strict !== true) {
                if (!/^(Boolean|RegExp|Number|String|Array|Date)$/.test(name)) {
                    return 'Object';
                }
            }
            return name;
        }
        return value;
    }
    function typeOf(value, strict) {
        var type = typeof value;
        if (value === false) {
            return 'boolean';
        }
        if (value === '') {
            return 'string';
        }
        if (value && type === 'object') {
            type = getDefinitionName(value, strict);
            type = String(type).toLowerCase();
        }
        if (type === 'number' && !window.isNaN(value) && window.isFinite(value)) {
            if (strict === true && window.parseFloat(value) === window.parseInt(value, 10)) {
                return value < 0 ? 'int' : 'uint';
            }
            return 'number';
        }
        return value ? type : value;
    }
    // Based on Alex Arnell's and John Resig's inheritance implementation.
    var Class = function () {
            // The base Subclass implementation (does nothing).
            function Subclass() {
            }
            // Create a new Class that inherits from this class.
            function create() {
            }
            function extend(source) {
            }
            function implement(source) {
                var ancestor, properties, id, property, value, method;
                ancestor = this.superclass && this.superclass.prototype;
                properties = Object.keys(source);
                id = -1;
                if (IS_DONTENUM_BUGGY) {
                    if (source.toString != Object.prototype.toString) {
                        properties.push('toString');
                    }
                    if (source.valueOf != Object.prototype.valueOf) {
                        properties.push('valueOf');
                    }
                }
                while (++id < properties.length) {
                    property = properties[id];
                    value = source[property];
                    this.prototype[property] = value;
                }
            }
            return {
                create: create,
                extends: extend,
                implements: implement
            };
        }();
}(this, this.document));