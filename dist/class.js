/**
 * Class
 * @description Class is a small JavaScript library for simple but powerful class based inheritance.
 * @version v0.0.3
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
    // Class - Utilities methods
    // -------------------------
    var DONT_ENUMS, IS_DONTENUM_BUGGY, breaker, ArrayProto, ObjProto, FuncProto, hasOwnProperty, toString, slice, nativeForEach, nativeKeys, nativeBind;
    DONT_ENUMS = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    IS_DONTENUM_BUGGY = function () {
        for (var property in { toString: 1 }) {
            if (property === 'toString') {
                return false;
            }
        }
        return true;
    };
    IS_DONTENUM_BUGGY = IS_DONTENUM_BUGGY();
    // Establish the root object, `window` in the browser, or `exports` on the server.
    breaker = {};
    // Save bytes in the minified (but not gzipped) version:
    ArrayProto = Array.prototype;
    FuncProto = Function.prototype;
    ObjProto = Object.prototype;
    // Create quick reference variables for speed access to core prototypes.
    hasOwnProperty = ObjProto.hasOwnProperty;
    toString = ObjProto.toString;
    slice = ArrayProto.slice;
    nativeForEach = ArrayProto.forEach;
    nativeKeys = Object.keys;
    nativeBind = FuncProto.bind;
    // Reusable constructor function for prototype setting.
    function Ctor() {
    }
    function extend(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
    // Class - Static methods
    // ----------------------
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
            var name = (value.constructor.toString() || toString.apply(value)).replace(/^.*function([^\s]*|[^\(]*)\([^\x00]+$/, '$1').replace(/^(\[object\s)|]$/g, '').replace(/\s+/, '') || 'Object';
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
    // Class - Other static methods
    // ----------------------------
    function isObject(value) {
        return typeOf(value) === 'object';
    }
    function isEmptyObject(value) {
        for (var property in value) {
            if (hasOwnProperty.call(value, property)) {
                return false;
            }
        }
        return true;
    }
    function isString(value) {
        return typeOf(value) === 'string';
    }
    function isNumber(value) {
        return typeOf(value) === 'number';
    }
    function isUint(value) {
        return typeOf(value, true) === 'uint';
    }
    function isInt(value) {
        return typeOf(value, true) === 'int';
    }
    function isDate(value) {
        return typeOf(value) === 'date';
    }
    function isArray(value) {
        return typeOf(value) === 'array';
    }
    function isArrayLike(value) {
        if (!typeOf(value) || isWindow(value)) {
            return false;
        }
        var length = value.length;
        if (value.nodeType === 1 && length) {
            return true;
        }
        return isString(value) || isArray(value) || length === 0 || isUint(length) && length > 0 && length - 1 in value;
    }
    function isFunction(value) {
        return typeOf(value) === 'function';
    }
    function isRegExp(value) {
        return typeOf(value) === 'regexp';
    }
    function isBoolean(value) {
        return typeOf(value) === 'boolean';
    }
    function isElement(value) {
        return !!(value && (value.nodeName || isFunction(value.on) && isFunction(value.find) && isFunction(value.eq) && isFunction(value.css)));
    }
    function isFile(value) {
        return typeOf(value, true) === 'file';
    }
    function isWindow(value) {
        return value && value.document && value.location && value.alert && value.setInterval && value.setTimeout;
    }
    function toFloat(value, ceiling) {
        value = window.parseFloat(value);
        value = window.isNaN(value) || !window.isFinite(value) ? 0 : value;
        if (ceiling) {
            try {
                value = window.parseFloat(value.toFixed(ceiling));
            } catch (error) {
                ceiling = Math.pow(10, ceiling);
                value = window.parseInt(value * ceiling, 10) / ceiling;
            }
        }
        return value;
    }
    function toInt(value) {
        return 0 | window.parseInt(value, 10);
    }
    function toUint(value) {
        value = toInt(value);
        return value < 0 ? 0 : value;
    }
    function toArray(iterable) {
        var length, results;
        if (!typeOf(iterable)) {
            return [];
        }
        if ('toArray' in Object(iterable)) {
            return iterable.toArray();
        }
        length = iterable.length || 0;
        results = new Array(length);
        while (length--) {
            results[length] = iterable[length];
        }
        return results;
    }
    function keys(object) {
        var id, property, results = [];
        if (!isObject(object)) {
            return results;
        }
        for (property in object) {
            if (hasOwnProperty.call(object, property)) {
                results.push(property);
            }
        }
        if (IS_DONTENUM_BUGGY) {
            for (id = 0; id < DONT_ENUMS.length; id++) {
                if (hasOwnProperty.call(object, DONT_ENUMS[id])) {
                    results.push(DONT_ENUMS[id]);
                }
            }
        }
        return results;
    }
    function each(obj, iterator, context) {
        var id, keys, length;
        if (!typeOf(obj)) {
            return;
        }
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (id = 0, length = obj.length; id < length; id++) {
                if (iterator.call(context, obj[id], id, obj) === breaker) {
                    return;
                }
            }
        } else {
            keys = (nativeKeys || keys)(obj);
            for (id = 0, length = keys.length; id < length; id++) {
                if (iterator.call(context, obj[keys[id]], keys[id], obj) === breaker) {
                    return;
                }
            }
        }
    }
    function update(list, args) {
        var arrayLength, length;
        arrayLength = list.length;
        length = args.length;
        while (length--) {
            list[arrayLength + length] = args[length];
        }
        return list;
    }
    function bindFn(fn, context) {
        var args, bound;
        if (nativeBind && fn.bind === nativeBind) {
            return nativeBind.apply(fn, slice.call(arguments, 1));
        }
        if (!isFunction(fn)) {
            throw new TypeError();
        }
        args = slice.call(arguments, 2);
        bound = function () {
            var self, result;
            if (!(this instanceof bound)) {
                return fn.apply(context, args.concat(slice.call(arguments)));
            }
            Ctor.prototype = fn.prototype;
            self = new Ctor();
            Ctor.prototype = null;
            result = fn.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) {
                return result;
            }
            return self;
        };
        return bound;
    }
    function bindAll(context) {
        var methods = slice.call(arguments, 1);
        if (methods.length === 0) {
            throw new Error('bindAll must be passed function names');
        }
        each(methods, function (method) {
            context[method] = bindFn(context[method], context);
        });
        return context;
    }
    function objectHelper() {
        return {
            extend: extend,
            isEmpty: isEmptyObject,
            keys: nativeKeys || keys
        };
    }
    extend(Object, objectHelper());
    function functionHelper() {
        var extensions = {};
        // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
        if (!nativeBind) {
            extensions.bind = function (context) {
                return bindFn(this, context);
            };
        }
        extensions.argumentNames = function () {
            var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').replace(/\s+/g, '').split(',');
            return names.length === 1 && !names[0] ? [] : names;
        };
        extensions.wrap = function (wrapper) {
            var methodCaller = this;
            return function () {
                var args = update([methodCaller.bind(this)], arguments);
                return wrapper.apply(this, args);
            };
        };
        return extensions;
    }
    extend(FuncProto, functionHelper());
    // Based on Alex Arnell's inheritance implementation.
    // --------------------------------------------------
    window.Class = function () {
        function Subclass() {
        }
        function create() {
            var parent, properties, id;
            id = -1;
            parent = null;
            properties = toArray(arguments);
            if (typeOf(properties[0]) === 'function') {
                parent = properties.shift();
            }
            function Caste() {
                if (typeOf(this.initialize) === 'function') {
                    this.initialize.apply(this, arguments);
                }
            }
            Object.extend(Caste, Class.Methods);
            Caste.superclass = parent;
            Caste.subclasses = [];
            if (parent) {
                Subclass.prototype = parent.prototype;
                Caste.prototype = new Subclass();
                parent.subclasses.push(Caste);
            }
            while (++id < properties.length) {
                Caste.implement(properties[id]);
            }
            if (!typeOf(Caste.prototype.initialize)) {
                Caste.prototype.initialize = Ctor;
            }
            Caste.prototype.constructor = Caste;
            return Caste;
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
                if (ancestor && typeOf(value) === 'function' && /\$super/g.test(value.argumentNames()[0])) {
                    method = value;
                    value = function (fn) {
                        return function () {
                            return ancestor[fn].apply(this, arguments);
                        };
                    }(property).wrap(method);
                    value.valueOf = function (method) {
                        return function () {
                            return method.valueOf.call(method);
                        };
                    }(method);
                    value.toString = function (method) {
                        return function () {
                            return method.toString.call(method);
                        };
                    }(method);
                }
                this.prototype[property] = value;
            }
            return this;
        }
        return {
            create: create,
            Methods: {
                extend: Object.extend,
                implement: implement
            }
        };
    }();
    // Externalize
    window.Class.getDefinitionName = getDefinitionName;
    window.Class.typeOf = typeOf;
    window.Class.bind = bindFn;
    window.Class.bindAll = bindAll;
    window.Class.isObject = isObject;
    window.Class.isString = isString;
    window.Class.isNumber = isNumber;
    window.Class.isUint = isUint;
    window.Class.isInt = isInt;
    window.Class.isDate = isDate;
    window.Class.isArray = isArray;
    window.Class.isArrayLike = isArrayLike;
    window.Class.isFunction = isFunction;
    window.Class.isRegExp = isRegExp;
    window.Class.isBoolean = isBoolean;
    window.Class.isElement = isElement;
    window.Class.isFile = isFile;
    window.Class.isWindow = isWindow;
    window.Class.toFloat = toFloat;
    window.Class.toUint = toUint;
    window.Class.toArray = toArray;
    window.Class.toInt = toInt;
}(this, this.document));