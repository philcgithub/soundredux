(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Rox"] = factory();
	else
		root["Rox"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 96);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(35);
var hide = __webpack_require__(10);
var redefine = __webpack_require__(18);
var ctx = __webpack_require__(16);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(72)('wks');
var uid = __webpack_require__(23);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(19);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(2);
var IE8_DOM_DEFINE = __webpack_require__(68);
var toPrimitive = __webpack_require__(36);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(22);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(35);
var fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(20);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(20);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(8)) {
  var LIBRARY = __webpack_require__(45);
  var global = __webpack_require__(3);
  var fails = __webpack_require__(4);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(44);
  var $buffer = __webpack_require__(69);
  var ctx = __webpack_require__(16);
  var anInstance = __webpack_require__(31);
  var propertyDesc = __webpack_require__(22);
  var hide = __webpack_require__(10);
  var redefineAll = __webpack_require__(30);
  var toInteger = __webpack_require__(19);
  var toLength = __webpack_require__(6);
  var toIndex = __webpack_require__(70);
  var toAbsoluteIndex = __webpack_require__(24);
  var toPrimitive = __webpack_require__(36);
  var has = __webpack_require__(9);
  var classof = __webpack_require__(74);
  var isObject = __webpack_require__(1);
  var toObject = __webpack_require__(13);
  var isArrayIter = __webpack_require__(52);
  var create = __webpack_require__(39);
  var getPrototypeOf = __webpack_require__(26);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(53);
  var uid = __webpack_require__(23);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(34);
  var createArrayIncludes = __webpack_require__(47);
  var speciesConstructor = __webpack_require__(73);
  var ArrayIterators = __webpack_require__(54);
  var Iterators = __webpack_require__(25);
  var $iterDetect = __webpack_require__(55);
  var setSpecies = __webpack_require__(51);
  var arrayFill = __webpack_require__(50);
  var arrayCopyWithin = __webpack_require__(78);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(17);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(204).Promise : Promise;

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.Rox = t() : e.Rox = t();
}("undefined" != typeof self ? self : undefined, function () {
  return function (e) {
    var t = {};function r(n) {
      if (t[n]) return t[n].exports;var i = t[n] = { i: n, l: !1, exports: {} };return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
    }return r.m = e, r.c = t, r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: n });
    }, r.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return r.d(t, "a", t), t;
    }, r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 65);
  }([function (e, t) {
    var r;r = function () {
      return this;
    }();try {
      r = r || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (r = window);
    }e.exports = r;
  }, function (e, t, r) {
    "use strict";
    var n = r(32),
        i = Object.prototype.toString;function o(e) {
      return "[object Array]" === i.call(e);
    }function a(e) {
      return void 0 === e;
    }function s(e) {
      return null !== e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
    }function u(e) {
      return "[object Function]" === i.call(e);
    }function c(e, t) {
      if (null !== e && void 0 !== e) if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && (e = [e]), o(e)) for (var r = 0, n = e.length; r < n; r++) {
        t.call(null, e[r], r, e);
      } else for (var i in e) {
        Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e);
      }
    }e.exports = { isArray: o, isArrayBuffer: function isArrayBuffer(e) {
        return "[object ArrayBuffer]" === i.call(e);
      }, isBuffer: function isBuffer(e) {
        return null !== e && !a(e) && null !== e.constructor && !a(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
      }, isFormData: function isFormData(e) {
        return "undefined" != typeof FormData && e instanceof FormData;
      }, isArrayBufferView: function isArrayBufferView(e) {
        return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
      }, isString: function isString(e) {
        return "string" == typeof e;
      }, isNumber: function isNumber(e) {
        return "number" == typeof e;
      }, isObject: s, isUndefined: a, isDate: function isDate(e) {
        return "[object Date]" === i.call(e);
      }, isFile: function isFile(e) {
        return "[object File]" === i.call(e);
      }, isBlob: function isBlob(e) {
        return "[object Blob]" === i.call(e);
      }, isFunction: u, isStream: function isStream(e) {
        return s(e) && u(e.pipe);
      }, isURLSearchParams: function isURLSearchParams(e) {
        return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
      }, isStandardBrowserEnv: function isStandardBrowserEnv() {
        return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
      }, forEach: c, merge: function e() {
        var t = {};function r(r, n) {
          "object" == _typeof(t[n]) && "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) ? t[n] = e(t[n], r) : t[n] = r;
        }for (var n = 0, i = arguments.length; n < i; n++) {
          c(arguments[n], r);
        }return t;
      }, deepMerge: function e() {
        var t = {};function r(r, n) {
          "object" == _typeof(t[n]) && "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) ? t[n] = e(t[n], r) : t[n] = "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) ? e({}, r) : r;
        }for (var n = 0, i = arguments.length; n < i; n++) {
          c(arguments[n], r);
        }return t;
      }, extend: function extend(e, t, r) {
        return c(t, function (t, i) {
          e[i] = r && "function" == typeof t ? n(t, r) : t;
        }), e;
      }, trim: function trim(e) {
        return e.replace(/^\s*/, "").replace(/\s*$/, "");
      } };
  }, function (e, t) {
    var r,
        n,
        i = e.exports = {};function o() {
      throw new Error("setTimeout has not been defined");
    }function a() {
      throw new Error("clearTimeout has not been defined");
    }function s(e) {
      if (r === setTimeout) return setTimeout(e, 0);if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);try {
        return r(e, 0);
      } catch (t) {
        try {
          return r.call(null, e, 0);
        } catch (t) {
          return r.call(this, e, 0);
        }
      }
    }!function () {
      try {
        r = "function" == typeof setTimeout ? setTimeout : o;
      } catch (e) {
        r = o;
      }try {
        n = "function" == typeof clearTimeout ? clearTimeout : a;
      } catch (e) {
        n = a;
      }
    }();var u,
        c = [],
        f = !1,
        l = -1;function h() {
      f && u && (f = !1, u.length ? c = u.concat(c) : l = -1, c.length && p());
    }function p() {
      if (!f) {
        var e = s(h);f = !0;for (var t = c.length; t;) {
          for (u = c, c = []; ++l < t;) {
            u && u[l].run();
          }l = -1, t = c.length;
        }u = null, f = !1, function (e) {
          if (n === clearTimeout) return clearTimeout(e);if ((n === a || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);try {
            n(e);
          } catch (t) {
            try {
              return n.call(null, e);
            } catch (t) {
              return n.call(this, e);
            }
          }
        }(e);
      }
    }function d(e, t) {
      this.fun = e, this.array = t;
    }function y() {}i.nextTick = function (e) {
      var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
        t[r - 1] = arguments[r];
      }c.push(new d(e, t)), 1 !== c.length || f || s(p);
    }, d.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = y, i.addListener = y, i.once = y, i.off = y, i.removeListener = y, i.removeAllListeners = y, i.emit = y, i.prependListener = y, i.prependOnceListener = y, i.listeners = function (e) {
      return [];
    }, i.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, i.cwd = function () {
      return "/";
    }, i.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, i.umask = function () {
      return 0;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = { debug: 0, info: 1, warn: 2, error: 3 },
        i = "error",
        o = new function e() {
      var t = this;!function (t, r) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this), this.debug = function (e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) {
          r[o - 1] = arguments[o];
        }var a;n[i] <= n.debug && console && (a = console).log.apply(a, [e].concat(r));
      }, this.info = function (e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) {
          r[o - 1] = arguments[o];
        }var a;n[i] <= n.info && console && (a = console).info.apply(a, [e].concat(r));
      }, this.warn = function (e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) {
          r[o - 1] = arguments[o];
        }var a;n[i] <= n.warn && console && (a = console).warn.apply(a, [e].concat(r));
      }, this.error = function (e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
          r[n - 1] = arguments[n];
        }var i;console && (i = console).error.apply(i, [e].concat(r));
      }, this.setVerboseMode = function (e) {
        "verbose" === e ? (i = "debug", t.debug("Active verbose mode")) : i = "error";
      }, this.seLogger = function (e) {
        o = e;
      };
    }();t.default = o;
  }, function (e, t, r) {
    "use strict";
    (function (e) {
      var n = r(70),
          i = r(71),
          o = r(28);function a() {
        return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }function s(e, t) {
        if (a() < t) throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)), e.length = t), e;
      }function u(e, t, r) {
        if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e, t, r);if ("number" == typeof e) {
          if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return l(this, e);
        }return c(this, e, t, r);
      }function c(e, t, r, n) {
        if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, r, n) {
          if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");return t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n), u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = h(e, t), e;
        }(e, t, r, n) : "string" == typeof t ? function (e, t, r) {
          if ("string" == typeof r && "" !== r || (r = "utf8"), !u.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');var n = 0 | d(t, r),
              i = (e = s(e, n)).write(t, r);return i !== n && (e = e.slice(0, i)), e;
        }(e, t, r) : function (e, t) {
          if (u.isBuffer(t)) {
            var r = 0 | p(t.length);return 0 === (e = s(e, r)).length ? e : (t.copy(e, 0, 0, r), e);
          }if (t) {
            if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (n = t.length) != n ? s(e, 0) : h(e, t);if ("Buffer" === t.type && o(t.data)) return h(e, t.data);
          }var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }(e, t);
      }function f(e) {
        if ("number" != typeof e) throw new TypeError('"size" argument must be a number');if (e < 0) throw new RangeError('"size" argument must not be negative');
      }function l(e, t) {
        if (f(t), e = s(e, t < 0 ? 0 : 0 | p(t)), !u.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) {
          e[r] = 0;
        }return e;
      }function h(e, t) {
        var r = t.length < 0 ? 0 : 0 | p(t.length);e = s(e, r);for (var n = 0; n < r; n += 1) {
          e[n] = 255 & t[n];
        }return e;
      }function p(e) {
        if (e >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");return 0 | e;
      }function d(e, t) {
        if (u.isBuffer(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var r = e.length;if (0 === r) return 0;for (var n = !1;;) {
          switch (t) {case "ascii":case "latin1":case "binary":
              return r;case "utf8":case "utf-8":case void 0:
              return F(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
              return 2 * r;case "hex":
              return r >>> 1;case "base64":
              return B(e).length;default:
              if (n) return F(e).length;t = ("" + t).toLowerCase(), n = !0;}
        }
      }function y(e, t, r) {
        var n = e[t];e[t] = e[r], e[r] = n;
      }function g(e, t, r, n, i) {
        if (0 === e.length) return -1;if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
          if (i) return -1;r = e.length - 1;
        } else if (r < 0) {
          if (!i) return -1;r = 0;
        }if ("string" == typeof t && (t = u.from(t, n)), u.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, r, n, i);if ("number" == typeof t) return t &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : v(e, [t], r, n, i);throw new TypeError("val must be string, number or Buffer");
      }function v(e, t, r, n, i) {
        var o,
            a = 1,
            s = e.length,
            u = t.length;if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
          if (e.length < 2 || t.length < 2) return -1;a = 2, s /= 2, u /= 2, r /= 2;
        }function c(e, t) {
          return 1 === a ? e[t] : e.readUInt16BE(t * a);
        }if (i) {
          var f = -1;for (o = r; o < s; o++) {
            if (c(e, o) === c(t, -1 === f ? 0 : o - f)) {
              if (-1 === f && (f = o), o - f + 1 === u) return f * a;
            } else -1 !== f && (o -= o - f), f = -1;
          }
        } else for (r + u > s && (r = s - u), o = r; o >= 0; o--) {
          for (var l = !0, h = 0; h < u; h++) {
            if (c(e, o + h) !== c(t, h)) {
              l = !1;break;
            }
          }if (l) return o;
        }return -1;
      }function m(e, t, r, n) {
        r = Number(r) || 0;var i = e.length - r;n ? (n = Number(n)) > i && (n = i) : n = i;var o = t.length;if (o % 2 != 0) throw new TypeError("Invalid hex string");n > o / 2 && (n = o / 2);for (var a = 0; a < n; ++a) {
          var s = parseInt(t.substr(2 * a, 2), 16);if (isNaN(s)) return a;e[r + a] = s;
        }return a;
      }function b(e, t, r, n) {
        return q(F(t, e.length - r), e, r, n);
      }function _(e, t, r, n) {
        return q(function (e) {
          for (var t = [], r = 0; r < e.length; ++r) {
            t.push(255 & e.charCodeAt(r));
          }return t;
        }(t), e, r, n);
      }function w(e, t, r, n) {
        return _(e, t, r, n);
      }function E(e, t, r, n) {
        return q(B(t), e, r, n);
      }function O(e, t, r, n) {
        return q(function (e, t) {
          for (var r, n, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) {
            n = (r = e.charCodeAt(a)) >> 8, i = r % 256, o.push(i), o.push(n);
          }return o;
        }(t, e.length - r), e, r, n);
      }function S(e, t, r) {
        return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r));
      }function x(e, t, r) {
        r = Math.min(e.length, r);for (var n = [], i = t; i < r;) {
          var o,
              a,
              s,
              u,
              c = e[i],
              f = null,
              l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;if (i + l <= r) switch (l) {case 1:
              c < 128 && (f = c);break;case 2:
              128 == (192 & (o = e[i + 1])) && (u = (31 & c) << 6 | 63 & o) > 127 && (f = u);break;case 3:
              o = e[i + 1], a = e[i + 2], 128 == (192 & o) && 128 == (192 & a) && (u = (15 & c) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (f = u);break;case 4:
              o = e[i + 1], a = e[i + 2], s = e[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (u = (15 & c) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (f = u);}null === f ? (f = 65533, l = 1) : f > 65535 && (f -= 65536, n.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), n.push(f), i += l;
        }return function (e) {
          var t = e.length;if (t <= P) return String.fromCharCode.apply(String, e);for (var r = "", n = 0; n < t;) {
            r += String.fromCharCode.apply(String, e.slice(n, n += P));
          }return r;
        }(n);
      }t.Buffer = u, t.SlowBuffer = function (e) {
        return +e != e && (e = 0), u.alloc(+e);
      }, t.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
        try {
          var e = new Uint8Array(1);return e.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
              return 42;
            } }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
        } catch (e) {
          return !1;
        }
      }(), t.kMaxLength = a(), u.poolSize = 8192, u._augment = function (e) {
        return e.__proto__ = u.prototype, e;
      }, u.from = function (e, t, r) {
        return c(null, e, t, r);
      }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, { value: null, configurable: !0 })), u.alloc = function (e, t, r) {
        return function (e, t, r, n) {
          return f(t), t <= 0 ? s(null, t) : void 0 !== r ? "string" == typeof n ? s(null, t).fill(r, n) : s(null, t).fill(r) : s(null, t);
        }(0, e, t, r);
      }, u.allocUnsafe = function (e) {
        return l(null, e);
      }, u.allocUnsafeSlow = function (e) {
        return l(null, e);
      }, u.isBuffer = function (e) {
        return !(null == e || !e._isBuffer);
      }, u.compare = function (e, t) {
        if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i) {
          if (e[i] !== t[i]) {
            r = e[i], n = t[i];break;
          }
        }return r < n ? -1 : n < r ? 1 : 0;
      }, u.isEncoding = function (e) {
        switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
            return !0;default:
            return !1;}
      }, u.concat = function (e, t) {
        if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return u.alloc(0);var r;if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) {
          t += e[r].length;
        }var n = u.allocUnsafe(t),
            i = 0;for (r = 0; r < e.length; ++r) {
          var a = e[r];if (!u.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');a.copy(n, i), i += a.length;
        }return n;
      }, u.byteLength = d, u.prototype._isBuffer = !0, u.prototype.swap16 = function () {
        var e = this.length;if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {
          y(this, t, t + 1);
        }return this;
      }, u.prototype.swap32 = function () {
        var e = this.length;if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {
          y(this, t, t + 3), y(this, t + 1, t + 2);
        }return this;
      }, u.prototype.swap64 = function () {
        var e = this.length;if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {
          y(this, t, t + 7), y(this, t + 1, t + 6), y(this, t + 2, t + 5), y(this, t + 3, t + 4);
        }return this;
      }, u.prototype.toString = function () {
        var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? x(this, 0, e) : function (e, t, r) {
          var n = !1;if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";if ((r >>>= 0) <= (t >>>= 0)) return "";for (e || (e = "utf8");;) {
            switch (e) {case "hex":
                return C(this, t, r);case "utf8":case "utf-8":
                return x(this, t, r);case "ascii":
                return k(this, t, r);case "latin1":case "binary":
                return A(this, t, r);case "base64":
                return S(this, t, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                return T(this, t, r);default:
                if (n) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), n = !0;}
          }
        }.apply(this, arguments);
      }, u.prototype.equals = function (e) {
        if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === u.compare(this, e);
      }, u.prototype.inspect = function () {
        var e = "",
            r = t.INSPECT_MAX_BYTES;return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (e += " ... ")), "<Buffer " + e + ">";
      }, u.prototype.compare = function (e, t, r, n, i) {
        if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), t < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");if (n >= i && t >= r) return 0;if (n >= i) return -1;if (t >= r) return 1;if (t >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === e) return 0;for (var o = i - n, a = r - t, s = Math.min(o, a), c = this.slice(n, i), f = e.slice(t, r), l = 0; l < s; ++l) {
          if (c[l] !== f[l]) {
            o = c[l], a = f[l];break;
          }
        }return o < a ? -1 : a < o ? 1 : 0;
      }, u.prototype.includes = function (e, t, r) {
        return -1 !== this.indexOf(e, t, r);
      }, u.prototype.indexOf = function (e, t, r) {
        return g(this, e, t, r, !0);
      }, u.prototype.lastIndexOf = function (e, t, r) {
        return g(this, e, t, r, !1);
      }, u.prototype.write = function (e, t, r, n) {
        if (void 0 === t) n = "utf8", r = this.length, t = 0;else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;else {
          if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
        }var i = this.length - t;if ((void 0 === r || r > i) && (r = i), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");n || (n = "utf8");for (var o = !1;;) {
          switch (n) {case "hex":
              return m(this, e, t, r);case "utf8":case "utf-8":
              return b(this, e, t, r);case "ascii":
              return _(this, e, t, r);case "latin1":case "binary":
              return w(this, e, t, r);case "base64":
              return E(this, e, t, r);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
              return O(this, e, t, r);default:
              if (o) throw new TypeError("Unknown encoding: " + n);n = ("" + n).toLowerCase(), o = !0;}
        }
      }, u.prototype.toJSON = function () {
        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
      };var P = 4096;function k(e, t, r) {
        var n = "";r = Math.min(e.length, r);for (var i = t; i < r; ++i) {
          n += String.fromCharCode(127 & e[i]);
        }return n;
      }function A(e, t, r) {
        var n = "";r = Math.min(e.length, r);for (var i = t; i < r; ++i) {
          n += String.fromCharCode(e[i]);
        }return n;
      }function C(e, t, r) {
        var n,
            i = e.length;(!t || t < 0) && (t = 0), (!r || r < 0 || r > i) && (r = i);for (var o = "", a = t; a < r; ++a) {
          o += (n = e[a]) < 16 ? "0" + n.toString(16) : n.toString(16);
        }return o;
      }function T(e, t, r) {
        for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) {
          i += String.fromCharCode(n[o] + 256 * n[o + 1]);
        }return i;
      }function R(e, t, r) {
        if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
      }function j(e, t, r, n, i, o) {
        if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');if (r + n > e.length) throw new RangeError("Index out of range");
      }function M(e, t, r, n) {
        t < 0 && (t = 65535 + t + 1);for (var i = 0, o = Math.min(e.length - r, 2); i < o; ++i) {
          e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
        }
      }function I(e, t, r, n) {
        t < 0 && (t = 4294967295 + t + 1);for (var i = 0, o = Math.min(e.length - r, 4); i < o; ++i) {
          e[r + i] = t >>> 8 * (n ? i : 3 - i) & 255;
        }
      }function N(e, t, r, n, i, o) {
        if (r + n > e.length) throw new RangeError("Index out of range");if (r < 0) throw new RangeError("Index out of range");
      }function D(e, t, r, n, o) {
        return o || N(e, 0, r, 4), i.write(e, t, r, n, 23, 4), r + 4;
      }function L(e, t, r, n, o) {
        return o || N(e, 0, r, 8), i.write(e, t, r, n, 52, 8), r + 8;
      }u.prototype.slice = function (e, t) {
        var r,
            n = this.length;if (e = ~~e, t = void 0 === t ? n : ~~t, e < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), t < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), t < e && (t = e), u.TYPED_ARRAY_SUPPORT) (r = this.subarray(e, t)).__proto__ = u.prototype;else {
          var i = t - e;r = new u(i, void 0);for (var o = 0; o < i; ++o) {
            r[o] = this[o + e];
          }
        }return r;
      }, u.prototype.readUIntLE = function (e, t, r) {
        e |= 0, t |= 0, r || R(e, t, this.length);for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
          n += this[e + o] * i;
        }return n;
      }, u.prototype.readUIntBE = function (e, t, r) {
        e |= 0, t |= 0, r || R(e, t, this.length);for (var n = this[e + --t], i = 1; t > 0 && (i *= 256);) {
          n += this[e + --t] * i;
        }return n;
      }, u.prototype.readUInt8 = function (e, t) {
        return t || R(e, 1, this.length), this[e];
      }, u.prototype.readUInt16LE = function (e, t) {
        return t || R(e, 2, this.length), this[e] | this[e + 1] << 8;
      }, u.prototype.readUInt16BE = function (e, t) {
        return t || R(e, 2, this.length), this[e] << 8 | this[e + 1];
      }, u.prototype.readUInt32LE = function (e, t) {
        return t || R(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
      }, u.prototype.readUInt32BE = function (e, t) {
        return t || R(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
      }, u.prototype.readIntLE = function (e, t, r) {
        e |= 0, t |= 0, r || R(e, t, this.length);for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) {
          n += this[e + o] * i;
        }return n >= (i *= 128) && (n -= Math.pow(2, 8 * t)), n;
      }, u.prototype.readIntBE = function (e, t, r) {
        e |= 0, t |= 0, r || R(e, t, this.length);for (var n = t, i = 1, o = this[e + --n]; n > 0 && (i *= 256);) {
          o += this[e + --n] * i;
        }return o >= (i *= 128) && (o -= Math.pow(2, 8 * t)), o;
      }, u.prototype.readInt8 = function (e, t) {
        return t || R(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
      }, u.prototype.readInt16LE = function (e, t) {
        t || R(e, 2, this.length);var r = this[e] | this[e + 1] << 8;return 32768 & r ? 4294901760 | r : r;
      }, u.prototype.readInt16BE = function (e, t) {
        t || R(e, 2, this.length);var r = this[e + 1] | this[e] << 8;return 32768 & r ? 4294901760 | r : r;
      }, u.prototype.readInt32LE = function (e, t) {
        return t || R(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
      }, u.prototype.readInt32BE = function (e, t) {
        return t || R(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
      }, u.prototype.readFloatLE = function (e, t) {
        return t || R(e, 4, this.length), i.read(this, e, !0, 23, 4);
      }, u.prototype.readFloatBE = function (e, t) {
        return t || R(e, 4, this.length), i.read(this, e, !1, 23, 4);
      }, u.prototype.readDoubleLE = function (e, t) {
        return t || R(e, 8, this.length), i.read(this, e, !0, 52, 8);
      }, u.prototype.readDoubleBE = function (e, t) {
        return t || R(e, 8, this.length), i.read(this, e, !1, 52, 8);
      }, u.prototype.writeUIntLE = function (e, t, r, n) {
        e = +e, t |= 0, r |= 0, n || j(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);var i = 1,
            o = 0;for (this[t] = 255 & e; ++o < r && (i *= 256);) {
          this[t + o] = e / i & 255;
        }return t + r;
      }, u.prototype.writeUIntBE = function (e, t, r, n) {
        e = +e, t |= 0, r |= 0, n || j(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);var i = r - 1,
            o = 1;for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) {
          this[t + i] = e / o & 255;
        }return t + r;
      }, u.prototype.writeUInt8 = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
      }, u.prototype.writeUInt16LE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : M(this, e, t, !0), t + 2;
      }, u.prototype.writeUInt16BE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : M(this, e, t, !1), t + 2;
      }, u.prototype.writeUInt32LE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : I(this, e, t, !0), t + 4;
      }, u.prototype.writeUInt32BE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : I(this, e, t, !1), t + 4;
      }, u.prototype.writeIntLE = function (e, t, r, n) {
        if (e = +e, t |= 0, !n) {
          var i = Math.pow(2, 8 * r - 1);j(this, e, t, r, i - 1, -i);
        }var o = 0,
            a = 1,
            s = 0;for (this[t] = 255 & e; ++o < r && (a *= 256);) {
          e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
        }return t + r;
      }, u.prototype.writeIntBE = function (e, t, r, n) {
        if (e = +e, t |= 0, !n) {
          var i = Math.pow(2, 8 * r - 1);j(this, e, t, r, i - 1, -i);
        }var o = r - 1,
            a = 1,
            s = 0;for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) {
          e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
        }return t + r;
      }, u.prototype.writeInt8 = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
      }, u.prototype.writeInt16LE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : M(this, e, t, !0), t + 2;
      }, u.prototype.writeInt16BE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : M(this, e, t, !1), t + 2;
      }, u.prototype.writeInt32LE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : I(this, e, t, !0), t + 4;
      }, u.prototype.writeInt32BE = function (e, t, r) {
        return e = +e, t |= 0, r || j(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : I(this, e, t, !1), t + 4;
      }, u.prototype.writeFloatLE = function (e, t, r) {
        return D(this, e, t, !0, r);
      }, u.prototype.writeFloatBE = function (e, t, r) {
        return D(this, e, t, !1, r);
      }, u.prototype.writeDoubleLE = function (e, t, r) {
        return L(this, e, t, !0, r);
      }, u.prototype.writeDoubleBE = function (e, t, r) {
        return L(this, e, t, !1, r);
      }, u.prototype.copy = function (e, t, r, n) {
        if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;if (0 === e.length || 0 === this.length) return 0;if (t < 0) throw new RangeError("targetStart out of bounds");if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");if (n < 0) throw new RangeError("sourceEnd out of bounds");n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);var i,
            o = n - r;if (this === e && r < t && t < n) for (i = o - 1; i >= 0; --i) {
          e[i + t] = this[i + r];
        } else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) {
          e[i + t] = this[i + r];
        } else Uint8Array.prototype.set.call(e, this.subarray(r, r + o), t);return o;
      }, u.prototype.fill = function (e, t, r, n) {
        if ("string" == typeof e) {
          if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === e.length) {
            var i = e.charCodeAt(0);i < 256 && (e = i);
          }if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");if ("string" == typeof n && !u.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
        } else "number" == typeof e && (e &= 255);if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");if (r <= t) return this;var o;if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e) for (o = t; o < r; ++o) {
          this[o] = e;
        } else {
          var a = u.isBuffer(e) ? e : F(new u(e, n).toString()),
              s = a.length;for (o = 0; o < r - t; ++o) {
            this[o + t] = a[o % s];
          }
        }return this;
      };var U = /[^+\/0-9A-Za-z-_]/g;function F(e, t) {
        var r;t = t || 1 / 0;for (var n = e.length, i = null, o = [], a = 0; a < n; ++a) {
          if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);continue;
              }if (a + 1 === n) {
                (t -= 3) > -1 && o.push(239, 191, 189);continue;
              }i = r;continue;
            }if (r < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), i = r;continue;
            }r = 65536 + (i - 55296 << 10 | r - 56320);
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);if (i = null, r < 128) {
            if ((t -= 1) < 0) break;o.push(r);
          } else if (r < 2048) {
            if ((t -= 2) < 0) break;o.push(r >> 6 | 192, 63 & r | 128);
          } else if (r < 65536) {
            if ((t -= 3) < 0) break;o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
          } else {
            if (!(r < 1114112)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
          }
        }return o;
      }function B(e) {
        return n.toByteArray(function (e) {
          if ((e = function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
          }(e).replace(U, "")).length < 2) return "";for (; e.length % 4 != 0;) {
            e += "=";
          }return e;
        }(e));
      }function q(e, t, r, n) {
        for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) {
          t[i + r] = e[i];
        }return i;
      }
    }).call(t, r(0));
  }, function (e, t) {
    "function" == typeof Object.create ? e.exports = function (e, t) {
      e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
    } : e.exports = function (e, t) {
      e.super_ = t;var r = function r() {};r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = new (function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.map = {};
      }return n(e, [{ key: "setExperiments", value: function value(e) {
          this.map = {}, (e = e || []).forEach(function (e) {
            this.map[e.identifier] = e;
          }, this);
        } }, { key: "experimentWithName", value: function value(e) {
          return this.map[e];
        } }, { key: "experimentForFlagName", value: function value(e) {
          return this.experiments.find(function (t) {
            return t.flags && t.flags.some(function (t) {
              return t.name === e;
            });
          });
        } }, { key: "experimentForFlag", value: function value(e) {
          return this.experimentForFlagName(e.name);
        } }, { key: "experiments", get: function get() {
          var e = this;return Object.keys(this.map).map(function (t) {
            return e.map[t];
          });
        } }]), e;
    }())();t.default = i;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = "x-api.rollout.io",
        i = { API_HOST: n, CD_API_ENDPOINT: "https://" + n + "/device/get_configuration", CD_S3_ENDPOINT: "https://conf.rollout.io/", SS_API_ENDPOINT: "https://" + n + "/device/update_state_store/", SS_S3_ENDPOINT: "https://statestore.rollout.io/", CLIENT_DATA_CACHE_KEY: "client_data", NOTIFICATIONS_ENDPOINT: "https://push.rollout.io/sse", ANALYTICS_ENDPOINT: "https://analytic.rollout.io" },
        o = Object.assign({}, i);t.default = { get: function get(e) {
        return o[e];
      }, set: function set(e, t) {
        o[e] = t;
      }, setActive: function setActive(e) {
        o = Object.assign({}, e);
      }, setSelfManagedMode: function setSelfManagedMode(e) {
        var t, r, n;o = Object.assign({}, i, (r = (t = e).analyticsURL, { CD_API_ENDPOINT: (n = t.serverURL) + "/device/get_configuration", SS_API_ENDPOINT: n + "/device/update_state_store/", CLIENT_DATA_CACHE_KEY: "client_data", ANALYTICS_ENDPOINT: r }));
      } };
  }, function (e, t, r) {
    "use strict";
    var n = r(16),
        i = Object.keys || function (e) {
      var t = [];for (var r in e) {
        t.push(r);
      }return t;
    };e.exports = l;var o = r(10);o.inherits = r(5);var a = r(55),
        s = r(58);o.inherits(l, a);for (var u = i(s.prototype), c = 0; c < u.length; c++) {
      var f = u[c];l.prototype[f] || (l.prototype[f] = s.prototype[f]);
    }function l(e) {
      if (!(this instanceof l)) return new l(e);a.call(this, e), s.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", h);
    }function h() {
      this.allowHalfOpen || this._writableState.ended || n(p, this);
    }function p(e) {
      e.end();
    }Object.defineProperty(l.prototype, "destroyed", { get: function get() {
        return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
      }, set: function set(e) {
        void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
      } }), l.prototype._destroy = function (e, t) {
      this.push(null), this.end(), n(t, e);
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(20);Object.defineProperty(t, "RoxxParser", { enumerable: !0, get: function get() {
        return a(n).default;
      } });var i = r(90);Object.defineProperty(t, "ConfigurationParser", { enumerable: !0, get: function get() {
        return a(i).default;
      } });var o = r(64);function a(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "RemoteConfigurationsParser", { enumerable: !0, get: function get() {
        return a(o).default;
      } });
  }, function (e, t, r) {
    (function (e) {
      function r(e) {
        return Object.prototype.toString.call(e);
      }t.isArray = function (e) {
        return Array.isArray ? Array.isArray(e) : "[object Array]" === r(e);
      }, t.isBoolean = function (e) {
        return "boolean" == typeof e;
      }, t.isNull = function (e) {
        return null === e;
      }, t.isNullOrUndefined = function (e) {
        return null == e;
      }, t.isNumber = function (e) {
        return "number" == typeof e;
      }, t.isString = function (e) {
        return "string" == typeof e;
      }, t.isSymbol = function (e) {
        return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
      }, t.isUndefined = function (e) {
        return void 0 === e;
      }, t.isRegExp = function (e) {
        return "[object RegExp]" === r(e);
      }, t.isObject = function (e) {
        return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
      }, t.isDate = function (e) {
        return "[object Date]" === r(e);
      }, t.isError = function (e) {
        return "[object Error]" === r(e) || e instanceof Error;
      }, t.isFunction = function (e) {
        return "function" == typeof e;
      }, t.isPrimitive = function (e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || void 0 === e;
      }, t.isBuffer = e.isBuffer;
    }).call(t, r(4).Buffer);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(66);Object.defineProperty(t, "FlagsSetter", { enumerable: !0, get: function get() {
        return o(n).default;
      } });var i = r(67);function o(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "ConfigurationSetter", { enumerable: !0, get: function get() {
        return o(i).default;
      } });
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(13);Object.defineProperty(t, "CustomProperties", { enumerable: !0, get: function get() {
        return u(n).default;
      } });var i = r(6);Object.defineProperty(t, "Experiments", { enumerable: !0, get: function get() {
        return u(i).default;
      } });var o = r(18);Object.defineProperty(t, "Configuration", { enumerable: !0, get: function get() {
        return u(o).default;
      } });var a = r(14);Object.defineProperty(t, "Flags", { enumerable: !0, get: function get() {
        return u(a).default;
      } });var s = r(19);function u(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "TargetGroups", { enumerable: !0, get: function get() {
        return u(s).default;
      } });
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.store = new Map();
      }return n(e, [{ key: "has", value: function value(e) {
          return this.store.has(e.name);
        } }, { key: "get", value: function value(e) {
          return this.store.get(e);
        } }, { key: "set", value: function value(e) {
          this.store.set(e.name, e);
        } }, { key: "setIfNotExists", value: function value(e) {
          this.has(e) || this.set(e);
        } }, { key: "clear", value: function value() {
          this.store.clear();
        } }, { key: "items", get: function get() {
          return Array.from(this.store.values());
        } }]), e;
    }();t.default = new i();
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.RoxFlagRepository = void 0;var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = r(11),
        a = (n = r(6)) && n.__esModule ? n : { default: n },
        s = t.RoxFlagRepository = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.map = {};
      }return i(e, [{ key: "addFlag", value: function value(e, t) {
          t.name = e, this.map[e] = t, new o.FlagsSetter(this, a.default).setAddedFlag(t);
        } }, { key: "flagWithName", value: function value(e) {
          return this.map[e];
        } }, { key: "flags", get: function get() {
          var e = this;return Object.keys(this.map).map(function (t) {
            return e.map[t];
          });
        } }, { key: "items", get: function get() {
          return this.flags;
        } }]), e;
    }();t.default = new s();
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(103);Object.defineProperty(t, "ConfigurationFetcher", { enumerable: !0, get: function get() {
        return d(n).default;
      } });var i = r(50);Object.defineProperty(t, "RuntimeRegistry", { enumerable: !0, get: function get() {
        return d(i).default;
      } });var o = r(107);Object.defineProperty(t, "ClassRegister", { enumerable: !0, get: function get() {
        return d(o).default;
      } });var a = r(108);Object.defineProperty(t, "DeviceProperties", { enumerable: !0, get: function get() {
        return d(a).default;
      } });var s = r(3);Object.defineProperty(t, "RoxLogger", { enumerable: !0, get: function get() {
        return d(s).default;
      } });var u = r(21);Object.defineProperty(t, "BugsnagReporter", { enumerable: !0, get: function get() {
        return d(u).default;
      } });var c = r(109);Object.defineProperty(t, "createRoxClient", { enumerable: !0, get: function get() {
        return d(c).default;
      } });var f = r(51);Object.defineProperty(t, "DynamicApi", { enumerable: !0, get: function get() {
        return d(f).default;
      } });var l = r(12);Object.defineProperty(t, "Experiments", { enumerable: !0, get: function get() {
        return l.Experiments;
      } }), Object.defineProperty(t, "Flags", { enumerable: !0, get: function get() {
        return l.Flags;
      } });var h = r(9);Object.defineProperty(t, "ConfigurationParser", { enumerable: !0, get: function get() {
        return h.ConfigurationParser;
      } });var p = r(11);function d(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "FlagsSetter", { enumerable: !0, get: function get() {
        return p.FlagsSetter;
      } });
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      !t.version || 0 === t.version.indexOf("v0.") || 0 === t.version.indexOf("v1.") && 0 !== t.version.indexOf("v1.8.") ? e.exports = function (e, r, n, i) {
        if ("function" != typeof e) throw new TypeError('"callback" argument must be a function');var o,
            a,
            s = arguments.length;switch (s) {case 0:case 1:
            return t.nextTick(e);case 2:
            return t.nextTick(function () {
              e.call(null, r);
            });case 3:
            return t.nextTick(function () {
              e.call(null, r, n);
            });case 4:
            return t.nextTick(function () {
              e.call(null, r, n, i);
            });default:
            for (o = new Array(s - 1), a = 0; a < o.length;) {
              o[a++] = arguments[a];
            }return t.nextTick(function () {
              e.apply(null, o);
            });}
      } : e.exports = t.nextTick;
    }).call(t, r(2));
  }, function (e, t, r) {
    var n = r(4),
        i = n.Buffer;function o(e, t) {
      for (var r in e) {
        t[r] = e[r];
      }
    }function a(e, t, r) {
      return i(e, t, r);
    }i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e.exports = n : (o(n, t), t.Buffer = a), o(i, a), a.from = function (e, t, r) {
      if ("number" == typeof e) throw new TypeError("Argument must not be a number");return i(e, t, r);
    }, a.alloc = function (e, t, r) {
      if ("number" != typeof e) throw new TypeError("Argument must be a number");var n = i(e);return void 0 !== t ? "string" == typeof r ? n.fill(t, r) : n.fill(t) : n.fill(0), n;
    }, a.allocUnsafe = function (e) {
      if ("number" != typeof e) throw new TypeError("Argument must be a number");return i(e);
    }, a.allocUnsafeSlow = function (e) {
      if ("number" != typeof e) throw new TypeError("Argument must be a number");return n.SlowBuffer(e);
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = new (function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.map = {};
      }return n(e, [{ key: "addRemoteConfiguration", value: function value(e, t) {
          t._name || (t._name = e), this.map[e] = t;
        } }, { key: "remoteConfigurationWithName", value: function value(e) {
          return this.map[e];
        } }, { key: "remoteConfigurations", get: function get() {
          var e = this;return Object.keys(this.map).map(function (t) {
            return e.map[t];
          });
        } }, { key: "items", get: function get() {
          return this.remoteConfigurations;
        } }]), e;
    }())();t.default = i;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = new (function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.map = {};
      }return n(e, [{ key: "addTargetGroup", value: function value(e) {
          this.map[e.identifier] = e;
        } }, { key: "setTargetGroups", value: function value(e) {
          this.map = {}, (e = e || []).forEach(function (e) {
            this.map[e.identifier] = e;
          }, this);
        } }, { key: "targetGroupWithName", value: function value(e) {
          return this.map[e];
        } }, { key: "targetGroups", get: function get() {
          var e = this;return Object.keys(this.map).map(function (t) {
            return e.map[t];
          });
        } }]), e;
    }())();t.default = i;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = r(68),
        o = u(r(21)),
        a = u(r(3)),
        s = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(27));function u(e) {
      return e && e.__esModule ? e : { default: e };
    }function c(e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) {
          r[t] = e[t];
        }return r;
      }return Array.from(e);
    }var f = function () {
      function e(t) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this._tokenizer = new i.RoxxTokenizer(), this._cache = t || {};
      }return n(e, [{ key: "_argsArrayForOperator", value: function value(e, t) {
          for (var r = [], n = e.length, i = 0; i < n; i++) {
            var o = t.pop();r.push(o);
          }return r;
        } }, { key: "_modifyArgsHook", value: function value(e) {
          var t = e.operator,
              r = e.args,
              n = e.context,
              i = e.callContext,
              o = r;return n && s.operatorsWithContext.includes(t) && (o = [].concat(c(r), [n])), i ? [].concat(c(o), [i]) : o;
        } }, { key: "compileExpression", value: function value(e) {
          var t = this._cache[e];return t || (t = this._tokenizer.tokenize(e).reverse(), this._cache[e] = t), t;
        } }, { key: "evaluateExpression", value: function value(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              n = arguments[3],
              u = [],
              c = this.compileExpression(e),
              f = void 0,
              l = c.length;try {
            for (var h = 0; h < l; h++) {
              var p = c[h];if (p.type == i.RoxxTokenTypeRand) u.push(p.value);else {
                if (p.type != i.RoxxTokenTypeRator) {
                  u.push(void 0);break;
                }var d = s[p.value],
                    y = this._argsArrayForOperator(d, u);y = this._modifyArgsHook({ operator: d, args: y, context: r, callContext: t });var g = d.apply(this, y);u.push(g);var v = p.value + "(" + JSON.stringify(y) + ") => " + g;n && n.push(v), a.default.debug("Roxx: " + v);
              }
            }f = u.pop();
          } catch (t) {
            var m = "Oh uh! An error occured during Roxx evaluation. " + e;a.default.error(m, t), o.default.error(m, t), f = !1;
          } finally {
            return f;
          }
        } }]), e;
    }();t.default = f;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(22)),
        a = (n = r(3)) && n.__esModule ? n : { default: n },
        s = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this);
      }return i(e, [{ key: "init", value: function value(e, t, r, n) {
          if (this.selfManagedMode = n, !this.selfManagedMode) {
            var i = t.getProperties(),
                o = i.distinct_id,
                a = i.app_release,
                s = i.platform,
                u = i.api_version,
                c = i.lib_version,
                f = function (e, t) {
              var r = {};for (var n in e) {
                t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
              }return r;
            }(i, ["distinct_id", "app_release", "platform", "api_version", "lib_version"]);this.device = f, this.header = { apiKey: "abbf3bd9c6e80eb1e8c0566c35b08748", notifier: { name: "Rollout JavaScript SDK", version: c, url: "undefined" != typeof window && window.location && window.location.href || void 0 } }, this.networkOptions = r, this.user = { distinct_id: o, app_release: a, app_key: e, platform: s }, this.app = { api_version: u, lib_version: c };
          }
        } }, { key: "error", value: function value(e, t) {
          if (!this.selfManagedMode) return this._notify("error", e, t);
        } }, { key: "_notify", value: function value(e, t, r) {
          var n = { payloadVersion: 4, exceptions: [], app: this.app, user: this.user, device: this.device, metaData: { data: { message: t, exception: r.toString() } }, severity: e };return r instanceof Error ? (n.exceptions.push({ errorClass: r.name, message: t + "\n" + r.message + "\n" + r.stack, stacktrace: [] }), n.groupingHash = r.fileName) : n.exceptions.push({ errorClass: "Error", message: t, stacktrace: [] }), this._send([n]);
        } }, { key: "_send", value: function value(e) {
          var t = Object.assign({ events: e }, this.header);a.default.debug("Sending bugsnag error report.");try {
            o.post("https://notify.bugsnag.com", t, this.networkOptions).catch(function (e) {
              a.default.debug("Failed to send error report", e);
            }), a.default.debug("Successfully sent error report.");
          } catch (e) {
            a.default.debug("Failed to send error report.", e);
          }
        } }]), e;
    }();t.default = new s();
  }, function (e, t, r) {
    e.exports = r(74);
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(40);Object.defineProperty(t, "CustomProperty", { enumerable: !0, get: function get() {
        return f(n).default;
      } });var i = r(92);Object.defineProperty(t, "DeviceProperty", { enumerable: !0, get: function get() {
        return f(i).default;
      } });var o = r(93);Object.defineProperty(t, "DeploymentConfiguration", { enumerable: !0, get: function get() {
        return f(o).default;
      } });var a = r(94);Object.defineProperty(t, "Experiment", { enumerable: !0, get: function get() {
        return f(a).default;
      } });var s = r(95);Object.defineProperty(t, "Configuration", { enumerable: !0, get: function get() {
        return f(s).default;
      } });var u = r(44);Object.defineProperty(t, "TargetGroup", { enumerable: !0, get: function get() {
        return f(u).default;
      } });var c = r(102);function f(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "Variant", { enumerable: !0, get: function get() {
        return f(c).default;
      } }), Object.defineProperty(t, "CallContextTypes", { enumerable: !0, get: function get() {
        return c.callContextTypes;
      } });
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.isEnabled = function (e) {
      var t = u(e);return "boolean" == typeof t ? t : "true" === t;
    }, t.value = u, t.getNumber = function (e) {
      var t = u(e);return parseInt(t) || 0;
    }, t.setDefaultsMode = function (e) {
      a = e;
    };var n = o(r(20)),
        i = o(r(6));function o(e) {
      return e && e.__esModule ? e : { default: e };
    }var a = !1,
        s = { "rox.internal.pushUpdates": "false", "rox.internal.considerThrottleInPush": "false", "rox.internal.throttleFetchInSeconds": "0", "rox.internal.analytics": "true" };function u(e) {
      if (a && s.hasOwnProperty(e)) return s[e];var t = i.default.experimentForFlagName(e);return t && t.deploymentConfiguration ? new n.default().evaluateExpression(t.deploymentConfiguration.condition) : "";
    }
  }, function (e, t, r) {
    "use strict";
    var n = r(117),
        i = r(119);function o() {
      this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
    }t.parse = b, t.resolve = function (e, t) {
      return b(e, !1, !0).resolve(t);
    }, t.resolveObject = function (e, t) {
      return e ? b(e, !1, !0).resolveObject(t) : t;
    }, t.format = function (e) {
      return i.isString(e) && (e = b(e)), e instanceof o ? e.format() : o.prototype.format.call(e);
    }, t.Url = o;var a = /^([a-z0-9.+-]+:)/i,
        s = /:[0-9]*$/,
        u = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        c = ["{", "}", "|", "\\", "^", "`"].concat(["<", ">", '"', "`", " ", "\r", "\n", "\t"]),
        f = ["'"].concat(c),
        l = ["%", "/", "?", ";", "#"].concat(f),
        h = ["/", "?", "#"],
        p = /^[+a-z0-9A-Z_-]{0,63}$/,
        d = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        y = { javascript: !0, "javascript:": !0 },
        g = { javascript: !0, "javascript:": !0 },
        v = { http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0, "gopher:": !0, "file:": !0 },
        m = r(120);function b(e, t, r) {
      if (e && i.isObject(e) && e instanceof o) return e;var n = new o();return n.parse(e, t, r), n;
    }o.prototype.parse = function (e, t, r) {
      if (!i.isString(e)) throw new TypeError("Parameter 'url' must be a string, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));var o = e.indexOf("?"),
          s = -1 !== o && o < e.indexOf("#") ? "?" : "#",
          c = e.split(s);c[0] = c[0].replace(/\\/g, "/");var b = e = c.join(s);if (b = b.trim(), !r && 1 === e.split("#").length) {
        var _ = u.exec(b);if (_) return this.path = b, this.href = b, this.pathname = _[1], _[2] ? (this.search = _[2], this.query = t ? m.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", this.query = {}), this;
      }var w = a.exec(b);if (w) {
        var E = (w = w[0]).toLowerCase();this.protocol = E, b = b.substr(w.length);
      }if (r || w || b.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var O = "//" === b.substr(0, 2);!O || w && g[w] || (b = b.substr(2), this.slashes = !0);
      }if (!g[w] && (O || w && !v[w])) {
        for (var S, x, P = -1, k = 0; k < h.length; k++) {
          -1 !== (A = b.indexOf(h[k])) && (-1 === P || A < P) && (P = A);
        }for (-1 !== (x = -1 === P ? b.lastIndexOf("@") : b.lastIndexOf("@", P)) && (S = b.slice(0, x), b = b.slice(x + 1), this.auth = decodeURIComponent(S)), P = -1, k = 0; k < l.length; k++) {
          var A;-1 !== (A = b.indexOf(l[k])) && (-1 === P || A < P) && (P = A);
        }-1 === P && (P = b.length), this.host = b.slice(0, P), b = b.slice(P), this.parseHost(), this.hostname = this.hostname || "";var C = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];if (!C) for (var T = this.hostname.split(/\./), R = (k = 0, T.length); k < R; k++) {
          var j = T[k];if (j && !j.match(p)) {
            for (var M = "", I = 0, N = j.length; I < N; I++) {
              j.charCodeAt(I) > 127 ? M += "x" : M += j[I];
            }if (!M.match(p)) {
              var D = T.slice(0, k),
                  L = T.slice(k + 1),
                  U = j.match(d);U && (D.push(U[1]), L.unshift(U[2])), L.length && (b = "/" + L.join(".") + b), this.hostname = D.join(".");break;
            }
          }
        }this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), C || (this.hostname = n.toASCII(this.hostname));var F = this.port ? ":" + this.port : "",
            B = this.hostname || "";this.host = B + F, this.href += this.host, C && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== b[0] && (b = "/" + b));
      }if (!y[E]) for (k = 0, R = f.length; k < R; k++) {
        var q = f[k];if (-1 !== b.indexOf(q)) {
          var H = encodeURIComponent(q);H === q && (H = escape(q)), b = b.split(q).join(H);
        }
      }var z = b.indexOf("#");-1 !== z && (this.hash = b.substr(z), b = b.slice(0, z));var W = b.indexOf("?");if (-1 !== W ? (this.search = b.substr(W), this.query = b.substr(W + 1), t && (this.query = m.parse(this.query)), b = b.slice(0, W)) : t && (this.search = "", this.query = {}), b && (this.pathname = b), v[E] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
        F = this.pathname || "";var V = this.search || "";this.path = F + V;
      }return this.href = this.format(), this;
    }, o.prototype.format = function () {
      var e = this.auth || "";e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");var t = this.protocol || "",
          r = this.pathname || "",
          n = this.hash || "",
          o = !1,
          a = "";this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && i.isObject(this.query) && Object.keys(this.query).length && (a = m.stringify(this.query));var s = this.search || a && "?" + a || "";return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || v[t]) && !1 !== o ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), s && "?" !== s.charAt(0) && (s = "?" + s), t + o + (r = r.replace(/[?#]/g, function (e) {
        return encodeURIComponent(e);
      })) + (s = s.replace("#", "%23")) + n;
    }, o.prototype.resolve = function (e) {
      return this.resolveObject(b(e, !1, !0)).format();
    }, o.prototype.resolveObject = function (e) {
      if (i.isString(e)) {
        var t = new o();t.parse(e, !1, !0), e = t;
      }for (var r = new o(), n = Object.keys(this), a = 0; a < n.length; a++) {
        var s = n[a];r[s] = this[s];
      }if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;if (e.slashes && !e.protocol) {
        for (var u = Object.keys(e), c = 0; c < u.length; c++) {
          var f = u[c];"protocol" !== f && (r[f] = e[f]);
        }return v[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
      }if (e.protocol && e.protocol !== r.protocol) {
        if (!v[e.protocol]) {
          for (var l = Object.keys(e), h = 0; h < l.length; h++) {
            var p = l[h];r[p] = e[p];
          }return r.href = r.format(), r;
        }if (r.protocol = e.protocol, e.host || g[e.protocol]) r.pathname = e.pathname;else {
          for (var d = (e.pathname || "").split("/"); d.length && !(e.host = d.shift());) {}e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== d[0] && d.unshift(""), d.length < 2 && d.unshift(""), r.pathname = d.join("/");
        }if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
          var y = r.pathname || "",
              m = r.search || "";r.path = y + m;
        }return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
      }var b = r.pathname && "/" === r.pathname.charAt(0),
          _ = e.host || e.pathname && "/" === e.pathname.charAt(0),
          w = _ || b || r.host && e.pathname,
          E = w,
          O = r.pathname && r.pathname.split("/") || [],
          S = (d = e.pathname && e.pathname.split("/") || [], r.protocol && !v[r.protocol]);if (S && (r.hostname = "", r.port = null, r.host && ("" === O[0] ? O[0] = r.host : O.unshift(r.host)), r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === d[0] ? d[0] = e.host : d.unshift(e.host)), e.host = null), w = w && ("" === d[0] || "" === O[0])), _) r.host = e.host || "" === e.host ? e.host : r.host, r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, r.query = e.query, O = d;else if (d.length) O || (O = []), O.pop(), O = O.concat(d), r.search = e.search, r.query = e.query;else if (!i.isNullOrUndefined(e.search)) return S && (r.hostname = r.host = O.shift(), (C = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = C.shift(), r.host = r.hostname = C.shift())), r.search = e.search, r.query = e.query, i.isNull(r.pathname) && i.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;if (!O.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;for (var x = O.slice(-1)[0], P = (r.host || e.host || O.length > 1) && ("." === x || ".." === x) || "" === x, k = 0, A = O.length; A >= 0; A--) {
        "." === (x = O[A]) ? O.splice(A, 1) : ".." === x ? (O.splice(A, 1), k++) : k && (O.splice(A, 1), k--);
      }if (!w && !E) for (; k--; k) {
        O.unshift("..");
      }!w || "" === O[0] || O[0] && "/" === O[0].charAt(0) || O.unshift(""), P && "/" !== O.join("/").substr(-1) && O.push("");var C,
          T = "" === O[0] || O[0] && "/" === O[0].charAt(0);return S && (r.hostname = r.host = T ? "" : O.length ? O.shift() : "", (C = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = C.shift(), r.host = r.hostname = C.shift())), (w = w || r.host && O.length) && !T && O.unshift(""), O.length ? r.pathname = O.join("/") : (r.pathname = null, r.path = null), i.isNull(r.pathname) && i.isNull(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
    }, o.prototype.parseHost = function () {
      var e = this.host,
          t = s.exec(e);t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
    };
  }, function (e, t) {
    function r() {
      this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0;
    }function n(e) {
      return "function" == typeof e;
    }function i(e) {
      return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
    }function o(e) {
      return void 0 === e;
    }e.exports = r, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function (e) {
      if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");return this._maxListeners = e, this;
    }, r.prototype.emit = function (e) {
      var t, r, a, s, u, c;if (this._events || (this._events = {}), "error" === e && (!this._events.error || i(this._events.error) && !this._events.error.length)) {
        if ((t = arguments[1]) instanceof Error) throw t;var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw f.context = t, f;
      }if (o(r = this._events[e])) return !1;if (n(r)) switch (arguments.length) {case 1:
          r.call(this);break;case 2:
          r.call(this, arguments[1]);break;case 3:
          r.call(this, arguments[1], arguments[2]);break;default:
          s = Array.prototype.slice.call(arguments, 1), r.apply(this, s);} else if (i(r)) for (s = Array.prototype.slice.call(arguments, 1), a = (c = r.slice()).length, u = 0; u < a; u++) {
        c[u].apply(this, s);
      }return !0;
    }, r.prototype.addListener = function (e, t) {
      var a;if (!n(t)) throw TypeError("listener must be a function");return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, n(t.listener) ? t.listener : t), this._events[e] ? i(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, i(this._events[e]) && !this._events[e].warned && (a = o(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[e].length > a && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this;
    }, r.prototype.on = r.prototype.addListener, r.prototype.once = function (e, t) {
      if (!n(t)) throw TypeError("listener must be a function");var r = !1;function i() {
        this.removeListener(e, i), r || (r = !0, t.apply(this, arguments));
      }return i.listener = t, this.on(e, i), this;
    }, r.prototype.removeListener = function (e, t) {
      var r, o, a, s;if (!n(t)) throw TypeError("listener must be a function");if (!this._events || !this._events[e]) return this;if (a = (r = this._events[e]).length, o = -1, r === t || n(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);else if (i(r)) {
        for (s = a; s-- > 0;) {
          if (r[s] === t || r[s].listener && r[s].listener === t) {
            o = s;break;
          }
        }if (o < 0) return this;1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t);
      }return this;
    }, r.prototype.removeAllListeners = function (e) {
      var t, r;if (!this._events) return this;if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;if (0 === arguments.length) {
        for (t in this._events) {
          "removeListener" !== t && this.removeAllListeners(t);
        }return this.removeAllListeners("removeListener"), this._events = {}, this;
      }if (n(r = this._events[e])) this.removeListener(e, r);else if (r) for (; r.length;) {
        this.removeListener(e, r[r.length - 1]);
      }return delete this._events[e], this;
    }, r.prototype.listeners = function (e) {
      return this._events && this._events[e] ? n(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [];
    }, r.prototype.listenerCount = function (e) {
      if (this._events) {
        var t = this._events[e];if (n(t)) return 1;if (t) return t.length;
      }return 0;
    }, r.listenerCount = function (e, t) {
      return e.listenerCount(t);
    };
  }, function (e, t, r) {
    "use strict";
    (function (e) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.operatorsWithContext = t.b64d = t.concat = t.md5 = t.inArray = t.property = t.isTargetGroupPaired = t.isInTargetGroup = t.flagValue = t.isInPercentageRange = t.isInPercentage = t.mergeSeed = t.semverNe = t.semverEq = t.semverGte = t.semverGt = t.semverLte = t.semverLt = t.match = t.gte = t.gt = t.lte = t.lt = t.ifThen = t.not = t.eq = t.ne = t.or = t.and = t.now = t.isUndefined = void 0;var n = f(r(19)),
          i = f(r(13)),
          o = f(r(14)),
          a = f(r(6)),
          s = f(r(20)),
          u = f(r(29)),
          c = r(31);function f(e) {
        return e && e.__esModule ? e : { default: e };
      }function l(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : { zeroExtend: !0, lexicographical: !0 },
            n = r && r.lexicographical,
            i = r && r.zeroExtend,
            o = e.split("."),
            a = t.split(".");function s(e) {
          return (n ? /[0-9A-Za-z_-]+$/ : /^\d+$/).test(e);
        }if (!o.every(s) || !a.every(s)) return NaN;if (i) {
          for (; o.length < a.length;) {
            o.push("0");
          }for (; a.length < o.length;) {
            a.push("0");
          }
        }n || (o = o.map(Number), a = a.map(Number));for (var u = 0; u < o.length; ++u) {
          if (a.length == u) return 1;if (o[u] != a[u]) return o[u] > a[u] ? 1 : -1;
        }return o.length != a.length ? -1 : 0;
      }var h = function h(e) {
        var t = (0, u.default)(e, { asBytes: !0 });return (t = (255 & t[0] | (255 & t[1]) << 8 | (255 & t[2]) << 16 | (255 & t[3]) << 24) >>> 0) / (Math.pow(2, 32) - 1);
      },
          p = t.isUndefined = function (e) {
        return void 0 === e;
      },
          d = (t.now = function () {
        return Date.now();
      }, t.and = function (e, t) {
        return e && t;
      }, t.or = function (e, t) {
        return e || t;
      }, t.ne = function (e, t) {
        return (!p(e) && e) !== (!p(t) && t);
      }, t.eq = function (e, t) {
        return (!p(e) && e) === (!p(t) && t);
      }, t.not = function (e) {
        return !e;
      }, t.ifThen = function (e, t, r) {
        return e ? t : r;
      }, t.lt = function (e, t) {
        return !p(e) && !p(t) && "number" == typeof e && "number" == typeof t && e < t;
      }, t.lte = function (e, t) {
        return !p(e) && !p(t) && "number" == typeof e && "number" == typeof t && e <= t;
      }, t.gt = function (e, t) {
        return !p(e) && !p(t) && "number" == typeof e && "number" == typeof t && e > t;
      }, t.gte = function (e, t) {
        return !p(e) && !p(t) && "number" == typeof e && "number" == typeof t && e >= t;
      }, t.match = function (e, t, r) {
        var n = e;return !!new RegExp(t, r).exec(n);
      }, t.semverLt = function (e, t) {
        return !p(e) && !p(t) && "string" == typeof e && "string" == typeof t && l(e, t, { zeroExtend: !0 }) < 0;
      }, t.semverLte = function (e, t) {
        return !p(e) && !p(t) && "string" == typeof e && "string" == typeof t && l(e, t, { zeroExtend: !0 }) <= 0;
      }, t.semverGt = function (e, t) {
        return !p(e) && !p(t) && "string" == typeof e && "string" == typeof t && l(e, t, { zeroExtend: !0 }) > 0;
      }, t.semverGte = function (e, t) {
        return !p(e) && !p(t) && "string" == typeof e && "string" == typeof t && l(e, t, { zeroExtend: !0 }) >= 0;
      }, t.semverEq = function (e, t) {
        return !p(e) && !p(t) && "string" == typeof e && "string" == typeof t && 0 == l(e, t);
      }, t.semverNe = function (e, t) {
        return !p(e) && !p(t) && "string" == typeof e && "string" == typeof t && 0 != l(e, t);
      }, t.mergeSeed = function (e, t) {
        return e + "." + t;
      }, t.isInPercentage = function (e, t) {
        return h(t) <= e;
      }, t.isInPercentageRange = function (e, t, r) {
        var n = h(r);return n >= e && n <= t;
      }, t.flagValue = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            n = o.default.flagWithName(e);if (n) return n.getInternalValue(r, t);var i = a.default.experimentForFlagName(e);return i && i.deploymentConfiguration && new s.default().evaluateExpression(i.deploymentConfiguration.condition, r, t) || "false";
      }),
          y = t.isInTargetGroup = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = n.default.targetGroupWithName(e);return !!i && new s.default().evaluateExpression(i.condition, r, t);
      },
          g = (t.isTargetGroupPaired = function () {
        return !1;
      }, t.property = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = i.default.get(e);if (r) return r.getValue(t);var n = c.DynamicPropertiesHandler && (0, c.DynamicPropertiesHandler)();return n ? n(e, t) : void 0;
      });t.inArray = function (e, t) {
        return t.includes(e);
      }, t.md5 = function (e) {
        if ("string" == typeof e) return (0, u.default)(e);
      }, t.concat = function (e, t) {
        if ("string" == typeof e && "string" == typeof t) return "" + e + t;
      }, t.b64d = function (t) {
        if ("string" == typeof t) return decodeURIComponent(e.from(t, "base64").toString("utf8"));
      }, t.operatorsWithContext = [y, d, g];
    }).call(t, r(4).Buffer);
  }, function (e, t) {
    var r = {}.toString;e.exports = Array.isArray || function (e) {
      return "[object Array]" == r.call(e);
    };
  }, function (e, t, r) {
    var n, i, o, a, _s;n = r(72), i = r(30).utf8, o = r(73), a = r(30).bin, (_s = function s(e, t) {
      e.constructor == String ? e = t && "binary" === t.encoding ? a.stringToBytes(e) : i.stringToBytes(e) : o(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());for (var r = n.bytesToWords(e), u = 8 * e.length, c = 1732584193, f = -271733879, l = -1732584194, h = 271733878, p = 0; p < r.length; p++) {
        r[p] = 16711935 & (r[p] << 8 | r[p] >>> 24) | 4278255360 & (r[p] << 24 | r[p] >>> 8);
      }r[u >>> 5] |= 128 << u % 32, r[14 + (u + 64 >>> 9 << 4)] = u;var d = _s._ff,
          y = _s._gg,
          g = _s._hh,
          v = _s._ii;for (p = 0; p < r.length; p += 16) {
        var m = c,
            b = f,
            _ = l,
            w = h;f = v(f = v(f = v(f = v(f = g(f = g(f = g(f = g(f = y(f = y(f = y(f = y(f = d(f = d(f = d(f = d(f, l = d(l, h = d(h, c = d(c, f, l, h, r[p + 0], 7, -680876936), f, l, r[p + 1], 12, -389564586), c, f, r[p + 2], 17, 606105819), h, c, r[p + 3], 22, -1044525330), l = d(l, h = d(h, c = d(c, f, l, h, r[p + 4], 7, -176418897), f, l, r[p + 5], 12, 1200080426), c, f, r[p + 6], 17, -1473231341), h, c, r[p + 7], 22, -45705983), l = d(l, h = d(h, c = d(c, f, l, h, r[p + 8], 7, 1770035416), f, l, r[p + 9], 12, -1958414417), c, f, r[p + 10], 17, -42063), h, c, r[p + 11], 22, -1990404162), l = d(l, h = d(h, c = d(c, f, l, h, r[p + 12], 7, 1804603682), f, l, r[p + 13], 12, -40341101), c, f, r[p + 14], 17, -1502002290), h, c, r[p + 15], 22, 1236535329), l = y(l, h = y(h, c = y(c, f, l, h, r[p + 1], 5, -165796510), f, l, r[p + 6], 9, -1069501632), c, f, r[p + 11], 14, 643717713), h, c, r[p + 0], 20, -373897302), l = y(l, h = y(h, c = y(c, f, l, h, r[p + 5], 5, -701558691), f, l, r[p + 10], 9, 38016083), c, f, r[p + 15], 14, -660478335), h, c, r[p + 4], 20, -405537848), l = y(l, h = y(h, c = y(c, f, l, h, r[p + 9], 5, 568446438), f, l, r[p + 14], 9, -1019803690), c, f, r[p + 3], 14, -187363961), h, c, r[p + 8], 20, 1163531501), l = y(l, h = y(h, c = y(c, f, l, h, r[p + 13], 5, -1444681467), f, l, r[p + 2], 9, -51403784), c, f, r[p + 7], 14, 1735328473), h, c, r[p + 12], 20, -1926607734), l = g(l, h = g(h, c = g(c, f, l, h, r[p + 5], 4, -378558), f, l, r[p + 8], 11, -2022574463), c, f, r[p + 11], 16, 1839030562), h, c, r[p + 14], 23, -35309556), l = g(l, h = g(h, c = g(c, f, l, h, r[p + 1], 4, -1530992060), f, l, r[p + 4], 11, 1272893353), c, f, r[p + 7], 16, -155497632), h, c, r[p + 10], 23, -1094730640), l = g(l, h = g(h, c = g(c, f, l, h, r[p + 13], 4, 681279174), f, l, r[p + 0], 11, -358537222), c, f, r[p + 3], 16, -722521979), h, c, r[p + 6], 23, 76029189), l = g(l, h = g(h, c = g(c, f, l, h, r[p + 9], 4, -640364487), f, l, r[p + 12], 11, -421815835), c, f, r[p + 15], 16, 530742520), h, c, r[p + 2], 23, -995338651), l = v(l, h = v(h, c = v(c, f, l, h, r[p + 0], 6, -198630844), f, l, r[p + 7], 10, 1126891415), c, f, r[p + 14], 15, -1416354905), h, c, r[p + 5], 21, -57434055), l = v(l, h = v(h, c = v(c, f, l, h, r[p + 12], 6, 1700485571), f, l, r[p + 3], 10, -1894986606), c, f, r[p + 10], 15, -1051523), h, c, r[p + 1], 21, -2054922799), l = v(l, h = v(h, c = v(c, f, l, h, r[p + 8], 6, 1873313359), f, l, r[p + 15], 10, -30611744), c, f, r[p + 6], 15, -1560198380), h, c, r[p + 13], 21, 1309151649), l = v(l, h = v(h, c = v(c, f, l, h, r[p + 4], 6, -145523070), f, l, r[p + 11], 10, -1120210379), c, f, r[p + 2], 15, 718787259), h, c, r[p + 9], 21, -343485551), c = c + m >>> 0, f = f + b >>> 0, l = l + _ >>> 0, h = h + w >>> 0;
      }return n.endian([c, f, l, h]);
    })._ff = function (e, t, r, n, i, o, a) {
      var s = e + (t & r | ~t & n) + (i >>> 0) + a;return (s << o | s >>> 32 - o) + t;
    }, _s._gg = function (e, t, r, n, i, o, a) {
      var s = e + (t & n | r & ~n) + (i >>> 0) + a;return (s << o | s >>> 32 - o) + t;
    }, _s._hh = function (e, t, r, n, i, o, a) {
      var s = e + (t ^ r ^ n) + (i >>> 0) + a;return (s << o | s >>> 32 - o) + t;
    }, _s._ii = function (e, t, r, n, i, o, a) {
      var s = e + (r ^ (t | ~n)) + (i >>> 0) + a;return (s << o | s >>> 32 - o) + t;
    }, _s._blocksize = 16, _s._digestsize = 16, e.exports = function (e, t) {
      if (void 0 === e || null === e) throw new Error("Illegal argument " + e);var r = n.wordsToBytes(_s(e, t));return t && t.asBytes ? r : t && t.asString ? a.bytesToString(r) : n.bytesToHex(r);
    };
  }, function (e, t) {
    var r = { utf8: { stringToBytes: function stringToBytes(e) {
          return r.bin.stringToBytes(unescape(encodeURIComponent(e)));
        }, bytesToString: function bytesToString(e) {
          return decodeURIComponent(escape(r.bin.bytesToString(e)));
        } }, bin: { stringToBytes: function stringToBytes(e) {
          for (var t = [], r = 0; r < e.length; r++) {
            t.push(255 & e.charCodeAt(r));
          }return t;
        }, bytesToString: function bytesToString(e) {
          for (var t = [], r = 0; r < e.length; r++) {
            t.push(String.fromCharCode(e[r]));
          }return t.join("");
        } } };e.exports = r;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.defaultDynamicPropertyHandler = function () {
      return n;
    }, t.setDynamicPropertyHandler = function (e) {
      i = e;
    }, t.DynamicPropertiesHandler = function () {
      return i;
    };var n = function n(e, t) {
      return t ? t[e] : void 0;
    },
        i = n;
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
      return function () {
        for (var r = new Array(arguments.length), n = 0; n < r.length; n++) {
          r[n] = arguments[n];
        }return e.apply(t, r);
      };
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1);function i(e) {
      return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }e.exports = function (e, t, r) {
      if (!t) return e;var o;if (r) o = r(t);else if (n.isURLSearchParams(t)) o = t.toString();else {
        var a = [];n.forEach(t, function (e, t) {
          null !== e && void 0 !== e && (n.isArray(e) ? t += "[]" : e = [e], n.forEach(e, function (e) {
            n.isDate(e) ? e = e.toISOString() : n.isObject(e) && (e = JSON.stringify(e)), a.push(i(t) + "=" + i(e));
          }));
        }), o = a.join("&");
      }if (o) {
        var s = e.indexOf("#");-1 !== s && (e = e.slice(0, s)), e += (-1 === e.indexOf("?") ? "?" : "&") + o;
      }return e;
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
      return !(!e || !e.__CANCEL__);
    };
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      var n = r(1),
          i = r(79),
          o = { "Content-Type": "application/x-www-form-urlencoded" };function a(e, t) {
        !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
      }var s,
          u = { adapter: ("undefined" != typeof XMLHttpRequest ? s = r(36) : void 0 !== t && "[object process]" === Object.prototype.toString.call(t) && (s = r(36)), s), transformRequest: [function (e, t) {
          return i(t, "Accept"), i(t, "Content-Type"), n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e) ? e : n.isArrayBufferView(e) ? e.buffer : n.isURLSearchParams(e) ? (a(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : n.isObject(e) ? (a(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;
        }], transformResponse: [function (e) {
          if ("string" == typeof e) try {
            e = JSON.parse(e);
          } catch (e) {}return e;
        }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(e) {
          return e >= 200 && e < 300;
        }, headers: { common: { Accept: "application/json, text/plain, */*" } } };n.forEach(["delete", "get", "head"], function (e) {
        u.headers[e] = {};
      }), n.forEach(["post", "put", "patch"], function (e) {
        u.headers[e] = n.merge(o);
      }), e.exports = u;
    }).call(t, r(2));
  }, function (e, t, r) {
    "use strict";
    var n = r(1),
        i = r(80),
        o = r(33),
        a = r(82),
        s = r(85),
        u = r(86),
        c = r(37);e.exports = function (e) {
      return new _Promise(function (t, f) {
        var l = e.data,
            h = e.headers;n.isFormData(l) && delete h["Content-Type"];var p = new XMLHttpRequest();if (e.auth) {
          var d = e.auth.username || "",
              y = e.auth.password || "";h.Authorization = "Basic " + btoa(d + ":" + y);
        }var g = a(e.baseURL, e.url);if (p.open(e.method.toUpperCase(), o(g, e.params, e.paramsSerializer), !0), p.timeout = e.timeout, p.onreadystatechange = function () {
          if (p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:"))) {
            var r = "getAllResponseHeaders" in p ? s(p.getAllResponseHeaders()) : null,
                n = { data: e.responseType && "text" !== e.responseType ? p.response : p.responseText, status: p.status, statusText: p.statusText, headers: r, config: e, request: p };i(t, f, n), p = null;
          }
        }, p.onabort = function () {
          p && (f(c("Request aborted", e, "ECONNABORTED", p)), p = null);
        }, p.onerror = function () {
          f(c("Network Error", e, null, p)), p = null;
        }, p.ontimeout = function () {
          var t = "timeout of " + e.timeout + "ms exceeded";e.timeoutErrorMessage && (t = e.timeoutErrorMessage), f(c(t, e, "ECONNABORTED", p)), p = null;
        }, n.isStandardBrowserEnv()) {
          var v = r(87),
              m = (e.withCredentials || u(g)) && e.xsrfCookieName ? v.read(e.xsrfCookieName) : void 0;m && (h[e.xsrfHeaderName] = m);
        }if ("setRequestHeader" in p && n.forEach(h, function (e, t) {
          void 0 === l && "content-type" === t.toLowerCase() ? delete h[t] : p.setRequestHeader(t, e);
        }), n.isUndefined(e.withCredentials) || (p.withCredentials = !!e.withCredentials), e.responseType) try {
          p.responseType = e.responseType;
        } catch (t) {
          if ("json" !== e.responseType) throw t;
        }"function" == typeof e.onDownloadProgress && p.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && p.upload && p.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {
          p && (p.abort(), f(e), p = null);
        }), void 0 === l && (l = null), p.send(l);
      });
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(81);e.exports = function (e, t, r, i, o) {
      var a = new Error(e);return n(a, t, r, i, o);
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1);e.exports = function (e, t) {
      t = t || {};var r = {},
          i = ["url", "method", "params", "data"],
          o = ["headers", "auth", "proxy"],
          a = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];n.forEach(i, function (e) {
        void 0 !== t[e] && (r[e] = t[e]);
      }), n.forEach(o, function (i) {
        n.isObject(t[i]) ? r[i] = n.deepMerge(e[i], t[i]) : void 0 !== t[i] ? r[i] = t[i] : n.isObject(e[i]) ? r[i] = n.deepMerge(e[i]) : void 0 !== e[i] && (r[i] = e[i]);
      }), n.forEach(a, function (n) {
        void 0 !== t[n] ? r[n] = t[n] : void 0 !== e[n] && (r[n] = e[n]);
      });var s = i.concat(o).concat(a),
          u = Object.keys(t).filter(function (e) {
        return -1 === s.indexOf(e);
      });return n.forEach(u, function (n) {
        void 0 !== t[n] ? r[n] = t[n] : void 0 !== e[n] && (r[n] = e[n]);
      }), r;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e) {
      this.message = e;
    }n.prototype.toString = function () {
      return "Cancel" + (this.message ? ": " + this.message : "");
    }, n.prototype.__CANCEL__ = !0, e.exports = n;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = function i(e) {
      if (void 0 === e || "" === e) throw new Error("Custom property must be initialized with a name.");
    },
        o = function o(e, t) {
      if (t && t.constructor !== e && t.constructor !== Function) throw new Error("Custom property initialized with an invalid type / value combination. (Type: " + e + ", Value: " + t + ")");
    },
        a = function a(e) {
      if (e.length > 1) throw new Error("Dynamic value of a custom property should be a function with maximum 1 argument");
    },
        s = function () {
      function e(t, r, n) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), i(t), this._name = t, "function" == typeof n ? (a(n), this._value = n) : (o(r, n), this._value = function () {
          return n;
        }), this._type = r;
      }return n(e, [{ key: "getValue", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};return this._value(e);
        } }, { key: "type", get: function get() {
          return this._type.name;
        } }, { key: "externalType", get: function get() {
          return this._type.name;
        } }, { key: "name", get: function get() {
          return this._name;
        } }, { key: "value", get: function get() {
          return this._value();
        } }]), e;
    }();t.default = s;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Manager = t.Actions = void 0;var n = o(r(96)),
        i = o(r(42));function o(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }t.Actions = n, t.Manager = i;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = r(43),
        i = {};t.getContext = function () {
      return n(i);
    }, t.setContext = function (e) {
      i = e;
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(97),
        i = r(99),
        o = r(100);e.exports = function e(t, r) {
      switch (i(t)) {case "object":
          return function (t, r) {
            if ("function" == typeof r) return r(t);if (r || o(t)) {
              var _n = new t.constructor();for (var _i in t) {
                _n[_i] = e(t[_i], r);
              }return _n;
            }return t;
          }(t, r);case "array":
          return function (t, r) {
            var n = new t.constructor(t.length);for (var _i2 = 0; _i2 < t.length; _i2++) {
              n[_i2] = e(t[_i2], r);
            }return n;
          }(t, r);default:
          return n(t);}
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function e(t, r) {
      !function (t, r) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this), this.identifier = t, this.condition = r;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.invokeImpression = function (e, t, r) {
      var s = o.default.experimentForFlag(t);try {
        if (c && s && (0, i.isEnabled)("rox.internal.analytics")) {
          var l = a.default.get(s.stickinessProperty) || a.default.get("rox.distinct_id"),
              h = l ? l.getValue(r) : "";c.track({ flag: t.name, value: e, distinctId: h, experimentId: s.identifier, experimentVersion: "0", type: "IMPRESSION", time: new Date().getTime() });
        }
      } catch (e) {
        n.RoxLogger.error("Failed to send analytics", e);
      }if ("function" == typeof u) {
        var p = s && f(s);u({ name: t.name, value: e }, p, r);
      }
    }, t.setHandler = function (e) {
      u = e;
    }, t.setAnalytics = function (e) {
      c = e;
    };var n = r(15),
        i = r(24),
        o = s(r(6)),
        a = s(r(13));function s(e) {
      return e && e.__esModule ? e : { default: e };
    }var u = null,
        c = null,
        f = function f(e) {
      return { identifier: e.identifier, name: e.name, isArchived: e.archived, labels: e.labels };
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.buildSetStateAPIURL = t.buildSetStateS3URL = t.buildAPIURL = void 0;var n,
        i = (n = r(7)) && n.__esModule ? n : { default: n };t.buildAPIURL = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
          r = e.app_key,
          n = e.buid,
          o = e.relative_url,
          a = function (e, t) {
        var r = {};for (var n in e) {
          t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
        }return r;
      }(e, ["app_key", "buid", "relative_url"]);a.cache_miss_relative_url = o;var s = i.default.get("CD_API_ENDPOINT") + "/" + r + "/" + n;return { url: t || s, body: a };
    }, t.buildSetStateS3URL = function (e) {
      return "" + i.default.get("SS_S3_ENDPOINT") + e.app_key + "/" + e.md5;
    }, t.buildSetStateAPIURL = function (e) {
      return { url: (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null) || "" + i.default.get("SS_API_ENDPOINT") + e.app_key + "/" + e.md5, body: { platform: e.platform, feature_flags: e.feature_flags, custom_properties: e.custom_properties, remoteVariables: e.remoteVariables, devModeSecret: e.devModeSecret } };
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    };t.fetchFromCDN = function (e, t) {
      return o.get(e, t).then(function (e) {
        var t = e.data;if (200 === e.status && t && "object" === (void 0 === t ? "undefined" : n(t))) return 404 === t.result ? (a.default.debug("succeed fetch from CDN, but it was missing"), _Promise.reject()) : (a.default.debug("succeed fetch from CDN"), t);
      }).catch(function (e) {
        if (404 == e.response.status || 403 == e.response.status) return _Promise.reject();a.default.debug("Unexpected error calling get configuration, status code returned different from 403 or 404. error: " + e);
      });
    }, t.fetchFromAPI = function (e, t, r) {
      return o.post(e, t, r).then(s);
    }, t.fetchFromRoxyAPI = function (e, t) {
      return o.get(e, t).then(s);
    }, t.stateFromCDN = function (e, t) {
      return o.get(e, t).then(function (e) {
        var t = e.data;if (200 === e.status && t && "object" === (void 0 === t ? "undefined" : n(t))) {
          if (404 === t.result) return a.default.debug("succeed setState from CDN, but it was missing"), _Promise.reject();if (200 === t.result) return void a.default.debug("succeed setState from CDN");
        }a.default.debug("succeed setState, but with unexpected response");
      }).catch(function (e) {
        if (404 == e.response.status || 403 == e.response.status) return _Promise.reject();a.default.debug("Unexpected error calling setState, status code returned different from 403 or 404. error: " + e);
      });
    }, t.setStateToAPI = function (e, t, r) {
      return o.post(e, t, r).then(function (e) {
        if (200 !== e.status) return _Promise.reject(new Error("Unexpected response from ROX API"));a.default.debug("succeed setState from API");
      });
    };var i,
        o = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(22)),
        a = (i = r(3)) && i.__esModule ? i : { default: i };function s(e) {
      var t = e.data;return 200 === e.status && t && "object" === (void 0 === t ? "undefined" : n(t)) ? (a.default.debug("succeed fetch from API"), t) : _Promise.reject(new Error("Unexpected response from ROX API"));
    }
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.STATE_GENERATOR_LIST = t.BUID_GENERATOR_LIST = void 0, t.generateStateMd5 = function () {
      return s(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : a);
    }, t.generateBuid = function () {
      return s(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o);
    };var n,
        i = (n = r(29)) && n.__esModule ? n : { default: n },
        o = t.BUID_GENERATOR_LIST = ["lib_version", "api_version", "platform", "app_key", "customSigningCertificate"],
        a = t.STATE_GENERATOR_LIST = ["platform", "app_key", "feature_flags", "custom_properties", "remoteVariables", "devModeSecret"];function s() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).map(function (t) {
        var r = e[t];return r ? r.constructor === Object || r.constructor === Array ? JSON.stringify(r) : r : t;
      });return (0, i.default)(t.join("|"));
    }
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.FetcherStatus = { APPLIED_FROM_EMBEDDED: "APPLIED_FROM_EMBEDDED", APPLIED_FROM_CACHE: "APPLIED_FROM_CACHE", APPLIED_FROM_NETWORK: "APPLIED_FROM_NETWORK", ERROR_FETCH_FAILED: "ERROR_FETCH_FAILED" }, t.FetcherResults = function e(t, r, n, i, o) {
      !function (t, r) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this), this.fetcherStatus = t, this.creationDate = r, this.hasChanges = n, this.errorDetails = i, this.clientData = o;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = s(r(18)),
        o = s(r(14)),
        a = s(r(13));function s(e) {
      return e && e.__esModule ? e : { default: e };
    }var u = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this);
      }return n(e, [{ key: "customProperties", get: function get() {
          var e = [];return a.default.items.forEach(function (t) {
            e.push({ name: t.name, type: t.type, externalType: t.externalType });
          }), e;
        } }, { key: "featureFlags", get: function get() {
          var e = [];return o.default.items.forEach(function (t) {
            e.push({ name: t.name, defaultValue: t.defaultValue, options: t._options });
          }), e;
        } }, { key: "remoteConfiguration", get: function get() {
          var e = [];return i.default.items.forEach(function (t) {
            e.push({ name: t.name, defaultValue: t.defaultValue, type: t.type, externalType: t.externalType });
          }), e;
        } }]), e;
    }();t.default = u;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = function () {
      function e(t, r, n) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.entityProvider = t, this.flagRepository = r, this.client = n;
      }return n(e, [{ key: "isEnabled", value: function value(e, t, r) {
          var n = this.flagRepository.flagWithName(e);if (null == n && (n = this.entityProvider.createFlag(t), this.flagRepository.addFlag(e, n), this.client.sendStateDebounced()), void 0 == n._getInternalIsEnabled) return t;var i = {},
              o = n._getInternalIsEnabled(i, r);return i.isExperimenting ? o : t;
        } }, { key: "value", value: function value(e, t, r, n) {
          Array.isArray(r) || (n = r, r = null);var i = this.flagRepository.flagWithName(e);null == i && (i = this.entityProvider.createVariant(t, r), this.flagRepository.addFlag(e, i), this.client.sendStateDebounced());var o = {},
              a = i.getInternalValue(o, n);return o.isExperimenting ? a : t;
        } }]), e;
    }();t.default = i;
  }, function (e, t, r) {
    (function (e) {
      var n = r(124),
          i = r(133),
          o = r(134),
          a = r(25),
          s = t;s.request = function (t, r) {
        t = "string" == typeof t ? a.parse(t) : i(t);var o = -1 === e.location.protocol.search(/^https?:$/) ? "http:" : "",
            s = t.protocol || o,
            u = t.hostname || t.host,
            c = t.port,
            f = t.path || "/";u && -1 !== u.indexOf(":") && (u = "[" + u + "]"), t.url = (u ? s + "//" + u : "") + (c ? ":" + c : "") + f, t.method = (t.method || "GET").toUpperCase(), t.headers = t.headers || {};var l = new n(t);return r && l.on("response", r), l;
      }, s.get = function (e, t) {
        var r = s.request(e, t);return r.end(), r;
      }, s.Agent = function () {}, s.Agent.defaultMaxSockets = 4, s.STATUS_CODES = o, s.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
    }).call(t, r(0));
  }, function (e, t, r) {
    (function (e) {
      t.fetch = s(e.fetch) && s(e.ReadableStream), t.blobConstructor = !1;try {
        new Blob([new ArrayBuffer(1)]), t.blobConstructor = !0;
      } catch (e) {}var r;function n() {
        if (void 0 !== r) return r;if (e.XMLHttpRequest) {
          r = new e.XMLHttpRequest();try {
            r.open("GET", e.XDomainRequest ? "/" : "https://example.com");
          } catch (e) {
            r = null;
          }
        } else r = null;return r;
      }function i(e) {
        var t = n();if (!t) return !1;try {
          return t.responseType = e, t.responseType === e;
        } catch (e) {}return !1;
      }var o = void 0 !== e.ArrayBuffer,
          a = o && s(e.ArrayBuffer.prototype.slice);function s(e) {
        return "function" == typeof e;
      }t.arraybuffer = t.fetch || o && i("arraybuffer"), t.msstream = !t.fetch && a && i("ms-stream"), t.mozchunkedarraybuffer = !t.fetch && o && i("moz-chunked-arraybuffer"), t.overrideMimeType = t.fetch || !!n() && s(n().overrideMimeType), t.vbArray = s(e.VBArray), r = null;
    }).call(t, r(0));
  }, function (e, t, r) {
    (t = e.exports = r(55)).Stream = t, t.Readable = t, t.Writable = r(58), t.Duplex = r(8), t.Transform = r(60), t.PassThrough = r(131);
  }, function (e, t, r) {
    "use strict";
    (function (t, n) {
      var i = r(16);e.exports = b;var o,
          a = r(28);b.ReadableState = m, r(26).EventEmitter;var s = function s(e, t) {
        return e.listeners(t).length;
      },
          u = r(56),
          c = r(17).Buffer,
          f = t.Uint8Array || function () {},
          l = r(10);l.inherits = r(5);var h = r(126),
          p = void 0;p = h && h.debuglog ? h.debuglog("stream") : function () {};var d,
          y = r(127),
          g = r(57);l.inherits(b, u);var v = ["error", "close", "destroy", "pause", "resume"];function m(e, t) {
        o = o || r(8), e = e || {}, this.objectMode = !!e.objectMode, t instanceof o && (this.objectMode = this.objectMode || !!e.readableObjectMode);var n = e.highWaterMark,
            i = this.objectMode ? 16 : 16384;this.highWaterMark = n || 0 === n ? n : i, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new y(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (d || (d = r(59).StringDecoder), this.decoder = new d(e.encoding), this.encoding = e.encoding);
      }function b(e) {
        if (o = o || r(8), !(this instanceof b)) return new b(e);this._readableState = new m(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), u.call(this);
      }function _(e, t, r, n, i) {
        var o,
            a = e._readableState;return null === t ? (a.reading = !1, function (e, t) {
          if (!t.ended) {
            if (t.decoder) {
              var r = t.decoder.end();r && r.length && (t.buffer.push(r), t.length += t.objectMode ? 1 : r.length);
            }t.ended = !0, S(e);
          }
        }(e, a)) : (i || (o = function (e, t) {
          var r, n;return n = t, c.isBuffer(n) || n instanceof f || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk")), r;
        }(a, t)), o ? e.emit("error", o) : a.objectMode || t && t.length > 0 ? ("string" == typeof t || a.objectMode || Object.getPrototypeOf(t) === c.prototype || (t = function (e) {
          return c.from(e);
        }(t)), n ? a.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : w(e, a, t, !0) : a.ended ? e.emit("error", new Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !r ? (t = a.decoder.write(t), a.objectMode || 0 !== t.length ? w(e, a, t, !1) : P(e, a)) : w(e, a, t, !1))) : n || (a.reading = !1)), function (e) {
          return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
        }(a);
      }function w(e, t, r, n) {
        t.flowing && 0 === t.length && !t.sync ? (e.emit("data", r), e.read(0)) : (t.length += t.objectMode ? 1 : r.length, n ? t.buffer.unshift(r) : t.buffer.push(r), t.needReadable && S(e)), P(e, t);
      }Object.defineProperty(b.prototype, "destroyed", { get: function get() {
          return void 0 !== this._readableState && this._readableState.destroyed;
        }, set: function set(e) {
          this._readableState && (this._readableState.destroyed = e);
        } }), b.prototype.destroy = g.destroy, b.prototype._undestroy = g.undestroy, b.prototype._destroy = function (e, t) {
        this.push(null), t(e);
      }, b.prototype.push = function (e, t) {
        var r,
            n = this._readableState;return n.objectMode ? r = !0 : "string" == typeof e && ((t = t || n.defaultEncoding) !== n.encoding && (e = c.from(e, t), t = ""), r = !0), _(this, e, t, !1, r);
      }, b.prototype.unshift = function (e) {
        return _(this, e, null, !0, !1);
      }, b.prototype.isPaused = function () {
        return !1 === this._readableState.flowing;
      }, b.prototype.setEncoding = function (e) {
        return d || (d = r(59).StringDecoder), this._readableState.decoder = new d(e), this._readableState.encoding = e, this;
      };var E = 8388608;function O(e, t) {
        return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function (e) {
          return e >= E ? e = E : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
        }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0));
      }function S(e) {
        var t = e._readableState;t.needReadable = !1, t.emittedReadable || (p("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? i(x, e) : x(e));
      }function x(e) {
        p("emit readable"), e.emit("readable"), T(e);
      }function P(e, t) {
        t.readingMore || (t.readingMore = !0, i(k, e, t));
      }function k(e, t) {
        for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (p("maybeReadMore read 0"), e.read(0), r !== t.length);) {
          r = t.length;
        }t.readingMore = !1;
      }function A(e) {
        p("readable nexttick read 0"), e.read(0);
      }function C(e, t) {
        t.reading || (p("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), T(e), t.flowing && !t.reading && e.read(0);
      }function T(e) {
        var t = e._readableState;for (p("flow", t.flowing); t.flowing && null !== e.read();) {}
      }function R(e, t) {
        return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : r = function (e, t, r) {
          var n;return e < t.head.data.length ? (n = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : n = e === t.head.data.length ? t.shift() : r ? function (e, t) {
            var r = t.head,
                n = 1,
                i = r.data;for (e -= i.length; r = r.next;) {
              var o = r.data,
                  a = e > o.length ? o.length : e;if (a === o.length ? i += o : i += o.slice(0, e), 0 == (e -= a)) {
                a === o.length ? (++n, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = o.slice(a));break;
              }++n;
            }return t.length -= n, i;
          }(e, t) : function (e, t) {
            var r = c.allocUnsafe(e),
                n = t.head,
                i = 1;for (n.data.copy(r), e -= n.data.length; n = n.next;) {
              var o = n.data,
                  a = e > o.length ? o.length : e;if (o.copy(r, r.length - e, 0, a), 0 == (e -= a)) {
                a === o.length ? (++i, n.next ? t.head = n.next : t.head = t.tail = null) : (t.head = n, n.data = o.slice(a));break;
              }++i;
            }return t.length -= i, r;
          }(e, t), n;
        }(e, t.buffer, t.decoder), r);var r;
      }function j(e) {
        var t = e._readableState;if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');t.endEmitted || (t.ended = !0, i(M, t, e));
      }function M(e, t) {
        e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"));
      }function I(e, t) {
        for (var r = 0, n = e.length; r < n; r++) {
          if (e[r] === t) return r;
        }return -1;
      }b.prototype.read = function (e) {
        p("read", e), e = parseInt(e, 10);var t = this._readableState,
            r = e;if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return p("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? j(this) : S(this), null;if (0 === (e = O(e, t)) && t.ended) return 0 === t.length && j(this), null;var n,
            i = t.needReadable;return p("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && p("length less than watermark", i = !0), t.ended || t.reading ? p("reading or ended", i = !1) : i && (p("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = O(r, t))), null === (n = e > 0 ? R(e, t) : null) ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (t.ended || (t.needReadable = !0), r !== e && t.ended && j(this)), null !== n && this.emit("data", n), n;
      }, b.prototype._read = function (e) {
        this.emit("error", new Error("_read() is not implemented"));
      }, b.prototype.pipe = function (e, t) {
        var r = this,
            o = this._readableState;switch (o.pipesCount) {case 0:
            o.pipes = e;break;case 1:
            o.pipes = [o.pipes, e];break;default:
            o.pipes.push(e);}o.pipesCount += 1, p("pipe count=%d opts=%j", o.pipesCount, t);var u = t && !1 === t.end || e === n.stdout || e === n.stderr ? m : c;function c() {
          p("onend"), e.end();
        }o.endEmitted ? i(u) : r.once("end", u), e.on("unpipe", function t(n, i) {
          p("onunpipe"), n === r && i && !1 === i.hasUnpiped && (i.hasUnpiped = !0, p("cleanup"), e.removeListener("close", g), e.removeListener("finish", v), e.removeListener("drain", f), e.removeListener("error", y), e.removeListener("unpipe", t), r.removeListener("end", c), r.removeListener("end", m), r.removeListener("data", d), l = !0, !o.awaitDrain || e._writableState && !e._writableState.needDrain || f());
        });var f = function (e) {
          return function () {
            var t = e._readableState;p("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && s(e, "data") && (t.flowing = !0, T(e));
          };
        }(r);e.on("drain", f);var l = !1,
            h = !1;function d(t) {
          p("ondata"), h = !1, !1 !== e.write(t) || h || ((1 === o.pipesCount && o.pipes === e || o.pipesCount > 1 && -1 !== I(o.pipes, e)) && !l && (p("false write response, pause", r._readableState.awaitDrain), r._readableState.awaitDrain++, h = !0), r.pause());
        }function y(t) {
          p("onerror", t), m(), e.removeListener("error", y), 0 === s(e, "error") && e.emit("error", t);
        }function g() {
          e.removeListener("finish", v), m();
        }function v() {
          p("onfinish"), e.removeListener("close", g), m();
        }function m() {
          p("unpipe"), r.unpipe(e);
        }return r.on("data", d), function (e, t, r) {
          if ("function" == typeof e.prependListener) return e.prependListener("error", r);e._events && e._events.error ? a(e._events.error) ? e._events.error.unshift(r) : e._events.error = [r, e._events.error] : e.on("error", r);
        }(e, 0, y), e.once("close", g), e.once("finish", v), e.emit("pipe", r), o.flowing || (p("pipe resume"), r.resume()), e;
      }, b.prototype.unpipe = function (e) {
        var t = this._readableState,
            r = { hasUnpiped: !1 };if (0 === t.pipesCount) return this;if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, r), this);if (!e) {
          var n = t.pipes,
              i = t.pipesCount;t.pipes = null, t.pipesCount = 0, t.flowing = !1;for (var o = 0; o < i; o++) {
            n[o].emit("unpipe", this, r);
          }return this;
        }var a = I(t.pipes, e);return -1 === a ? this : (t.pipes.splice(a, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, r), this);
      }, b.prototype.on = function (e, t) {
        var r = u.prototype.on.call(this, e, t);if ("data" === e) !1 !== this._readableState.flowing && this.resume();else if ("readable" === e) {
          var n = this._readableState;n.endEmitted || n.readableListening || (n.readableListening = n.needReadable = !0, n.emittedReadable = !1, n.reading ? n.length && S(this) : i(A, this));
        }return r;
      }, b.prototype.addListener = b.prototype.on, b.prototype.resume = function () {
        var e = this._readableState;return e.flowing || (p("resume"), e.flowing = !0, function (e, t) {
          t.resumeScheduled || (t.resumeScheduled = !0, i(C, e, t));
        }(this, e)), this;
      }, b.prototype.pause = function () {
        return p("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (p("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
      }, b.prototype.wrap = function (e) {
        var t = this._readableState,
            r = !1,
            n = this;for (var i in e.on("end", function () {
          if (p("wrapped end"), t.decoder && !t.ended) {
            var e = t.decoder.end();e && e.length && n.push(e);
          }n.push(null);
        }), e.on("data", function (i) {
          p("wrapped data"), t.decoder && (i = t.decoder.write(i)), (!t.objectMode || null !== i && void 0 !== i) && (t.objectMode || i && i.length) && (n.push(i) || (r = !0, e.pause()));
        }), e) {
          void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
            return function () {
              return e[t].apply(e, arguments);
            };
          }(i));
        }for (var o = 0; o < v.length; o++) {
          e.on(v[o], n.emit.bind(n, v[o]));
        }return n._read = function (t) {
          p("wrapped _read", t), r && (r = !1, e.resume());
        }, n;
      }, b._fromList = R;
    }).call(t, r(0), r(2));
  }, function (e, t, r) {
    e.exports = r(26).EventEmitter;
  }, function (e, t, r) {
    "use strict";
    var n = r(16);function i(e, t) {
      e.emit("error", t);
    }e.exports = { destroy: function destroy(e, t) {
        var r = this,
            o = this._readableState && this._readableState.destroyed,
            a = this._writableState && this._writableState.destroyed;o || a ? t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || n(i, this, e) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function (e) {
          !t && e ? (n(i, r, e), r._writableState && (r._writableState.errorEmitted = !0)) : t && t(e);
        }));
      }, undestroy: function undestroy() {
        this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
      } };
  }, function (e, t, r) {
    "use strict";
    (function (t, n, i) {
      var o = r(16);function a(e) {
        var t = this;this.next = null, this.entry = null, this.finish = function () {
          !function (e, t, r) {
            var n = e.entry;for (e.entry = null; n;) {
              var i = n.callback;t.pendingcb--, i(void 0), n = n.next;
            }t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e;
          }(t, e);
        };
      }e.exports = m;var s,
          u = !t.browser && ["v0.10", "v0.9."].indexOf(t.version.slice(0, 5)) > -1 ? n : o;m.WritableState = v;var c = r(10);c.inherits = r(5);var f,
          l = { deprecate: r(130) },
          h = r(56),
          p = r(17).Buffer,
          d = i.Uint8Array || function () {},
          y = r(57);function g() {}function v(e, t) {
        s = s || r(8), e = e || {}, this.objectMode = !!e.objectMode, t instanceof s && (this.objectMode = this.objectMode || !!e.writableObjectMode);var n = e.highWaterMark,
            i = this.objectMode ? 16 : 16384;this.highWaterMark = n || 0 === n ? n : i, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;var c = !1 === e.decodeStrings;this.decodeStrings = !c, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
          !function (e, t) {
            var r = e._writableState,
                n = r.sync,
                i = r.writecb;if (function (e) {
              e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
            }(r), t) !function (e, t, r, n, i) {
              --t.pendingcb, r ? (o(i, n), o(S, e, t), e._writableState.errorEmitted = !0, e.emit("error", n)) : (i(n), e._writableState.errorEmitted = !0, e.emit("error", n), S(e, t));
            }(e, r, n, t, i);else {
              var a = E(r);a || r.corked || r.bufferProcessing || !r.bufferedRequest || w(e, r), n ? u(_, e, r, a, i) : _(e, r, a, i);
            }
          }(t, e);
        }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new a(this);
      }function m(e) {
        if (s = s || r(8), !(f.call(m, this) || this instanceof s)) return new m(e);this._writableState = new v(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), h.call(this);
      }function b(e, t, r, n, i, o, a) {
        t.writelen = n, t.writecb = a, t.writing = !0, t.sync = !0, r ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1;
      }function _(e, t, r, n) {
        r || function (e, t) {
          0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"));
        }(e, t), t.pendingcb--, n(), S(e, t);
      }function w(e, t) {
        t.bufferProcessing = !0;var r = t.bufferedRequest;if (e._writev && r && r.next) {
          var n = t.bufferedRequestCount,
              i = new Array(n),
              o = t.corkedRequestsFree;o.entry = r;for (var s = 0, u = !0; r;) {
            i[s] = r, r.isBuf || (u = !1), r = r.next, s += 1;
          }i.allBuffers = u, b(e, t, !0, t.length, i, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, o.next ? (t.corkedRequestsFree = o.next, o.next = null) : t.corkedRequestsFree = new a(t);
        } else {
          for (; r;) {
            var c = r.chunk,
                f = r.encoding,
                l = r.callback;if (b(e, t, !1, t.objectMode ? 1 : c.length, c, f, l), r = r.next, t.writing) break;
          }null === r && (t.lastBufferedRequest = null);
        }t.bufferedRequestCount = 0, t.bufferedRequest = r, t.bufferProcessing = !1;
      }function E(e) {
        return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
      }function O(e, t) {
        e._final(function (r) {
          t.pendingcb--, r && e.emit("error", r), t.prefinished = !0, e.emit("prefinish"), S(e, t);
        });
      }function S(e, t) {
        var r = E(t);return r && (function (e, t) {
          t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, o(O, e, t)) : (t.prefinished = !0, e.emit("prefinish")));
        }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), r;
      }c.inherits(m, h), v.prototype.getBuffer = function () {
        for (var e = this.bufferedRequest, t = []; e;) {
          t.push(e), e = e.next;
        }return t;
      }, function () {
        try {
          Object.defineProperty(v.prototype, "buffer", { get: l.deprecate(function () {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
        } catch (e) {}
      }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (f = Function.prototype[Symbol.hasInstance], Object.defineProperty(m, Symbol.hasInstance, { value: function value(e) {
          return !!f.call(this, e) || e && e._writableState instanceof v;
        } })) : f = function f(e) {
        return e instanceof this;
      }, m.prototype.pipe = function () {
        this.emit("error", new Error("Cannot pipe, not readable"));
      }, m.prototype.write = function (e, t, r) {
        var n,
            i = this._writableState,
            a = !1,
            s = (n = e, (p.isBuffer(n) || n instanceof d) && !i.objectMode);return s && !p.isBuffer(e) && (e = function (e) {
          return p.from(e);
        }(e)), "function" == typeof t && (r = t, t = null), s ? t = "buffer" : t || (t = i.defaultEncoding), "function" != typeof r && (r = g), i.ended ? function (e, t) {
          var r = new Error("write after end");e.emit("error", r), o(t, r);
        }(this, r) : (s || function (e, t, r, n) {
          var i = !0,
              a = !1;return null === r ? a = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (a = new TypeError("Invalid non-string/buffer chunk")), a && (e.emit("error", a), o(n, a), i = !1), i;
        }(this, i, e, r)) && (i.pendingcb++, a = function (e, t, r, n, i, o) {
          if (!r) {
            var a = function (e, t, r) {
              return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = p.from(t, r)), t;
            }(t, n, i);n !== a && (r = !0, i = "buffer", n = a);
          }var s = t.objectMode ? 1 : n.length;t.length += s;var u = t.length < t.highWaterMark;if (u || (t.needDrain = !0), t.writing || t.corked) {
            var c = t.lastBufferedRequest;t.lastBufferedRequest = { chunk: n, encoding: i, isBuf: r, callback: o, next: null }, c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
          } else b(e, t, !1, s, n, i, o);return u;
        }(this, i, s, e, t, r)), a;
      }, m.prototype.cork = function () {
        this._writableState.corked++;
      }, m.prototype.uncork = function () {
        var e = this._writableState;e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || w(this, e));
      }, m.prototype.setDefaultEncoding = function (e) {
        if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);return this._writableState.defaultEncoding = e, this;
      }, m.prototype._write = function (e, t, r) {
        r(new Error("_write() is not implemented"));
      }, m.prototype._writev = null, m.prototype.end = function (e, t, r) {
        var n = this._writableState;"function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null !== e && void 0 !== e && this.write(e, t), n.corked && (n.corked = 1, this.uncork()), n.ending || n.finished || function (e, t, r) {
          t.ending = !0, S(e, t), r && (t.finished ? o(r) : e.once("finish", r)), t.ended = !0, e.writable = !1;
        }(this, n, r);
      }, Object.defineProperty(m.prototype, "destroyed", { get: function get() {
          return void 0 !== this._writableState && this._writableState.destroyed;
        }, set: function set(e) {
          this._writableState && (this._writableState.destroyed = e);
        } }), m.prototype.destroy = y.destroy, m.prototype._undestroy = y.undestroy, m.prototype._destroy = function (e, t) {
        this.end(), t(e);
      };
    }).call(t, r(2), r(128).setImmediate, r(0));
  }, function (e, t, r) {
    "use strict";
    var n = r(17).Buffer,
        i = n.isEncoding || function (e) {
      switch ((e = "" + e) && e.toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":case "raw":
          return !0;default:
          return !1;}
    };function o(e) {
      var t;switch (this.encoding = function (e) {
        var t = function (e) {
          if (!e) return "utf8";for (var t;;) {
            switch (e) {case "utf8":case "utf-8":
                return "utf8";case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":
                return "utf16le";case "latin1":case "binary":
                return "latin1";case "base64":case "ascii":case "hex":
                return e;default:
                if (t) return;e = ("" + e).toLowerCase(), t = !0;}
          }
        }(e);if ("string" != typeof t && (n.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);return t || e;
      }(e), this.encoding) {case "utf16le":
          this.text = u, this.end = c, t = 4;break;case "utf8":
          this.fillLast = s, t = 4;break;case "base64":
          this.text = f, this.end = l, t = 3;break;default:
          return this.write = h, void (this.end = p);}this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n.allocUnsafe(t);
    }function a(e) {
      return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : -1;
    }function s(e) {
      var t = this.lastTotal - this.lastNeed,
          r = function (e, t, r) {
        if (128 != (192 & t[0])) return e.lastNeed = 0, "�".repeat(r);if (e.lastNeed > 1 && t.length > 1) {
          if (128 != (192 & t[1])) return e.lastNeed = 1, "�".repeat(r + 1);if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�".repeat(r + 2);
        }
      }(this, e, t);return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length));
    }function u(e, t) {
      if ((e.length - t) % 2 == 0) {
        var r = e.toString("utf16le", t);if (r) {
          var n = r.charCodeAt(r.length - 1);if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], r.slice(0, -1);
        }return r;
      }return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
    }function c(e) {
      var t = e && e.length ? this.write(e) : "";if (this.lastNeed) {
        var r = this.lastTotal - this.lastNeed;return t + this.lastChar.toString("utf16le", 0, r);
      }return t;
    }function f(e, t) {
      var r = (e.length - t) % 3;return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r));
    }function l(e) {
      var t = e && e.length ? this.write(e) : "";return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
    }function h(e) {
      return e.toString(this.encoding);
    }function p(e) {
      return e && e.length ? this.write(e) : "";
    }t.StringDecoder = o, o.prototype.write = function (e) {
      if (0 === e.length) return "";var t, r;if (this.lastNeed) {
        if (void 0 === (t = this.fillLast(e))) return "";r = this.lastNeed, this.lastNeed = 0;
      } else r = 0;return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || "";
    }, o.prototype.end = function (e) {
      var t = e && e.length ? this.write(e) : "";return this.lastNeed ? t + "�".repeat(this.lastTotal - this.lastNeed) : t;
    }, o.prototype.text = function (e, t) {
      var r = function (e, t, r) {
        var n = t.length - 1;if (n < r) return 0;var i = a(t[n]);return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --n < r ? 0 : (i = a(t[n])) >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --n < r ? 0 : (i = a(t[n])) >= 0 ? (i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i) : 0;
      }(this, e, t);if (!this.lastNeed) return e.toString("utf8", t);this.lastTotal = r;var n = e.length - (r - this.lastNeed);return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
    }, o.prototype.fillLast = function (e) {
      if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = o;var n = r(8),
        i = r(10);function o(e) {
      if (!(this instanceof o)) return new o(e);n.call(this, e), this._transformState = new function (e) {
        this.afterTransform = function (t, r) {
          return function (e, t, r) {
            var n = e._transformState;n.transforming = !1;var i = n.writecb;if (!i) return e.emit("error", new Error("write callback called multiple times"));n.writechunk = null, n.writecb = null, null !== r && void 0 !== r && e.push(r), i(t);var o = e._readableState;o.reading = !1, (o.needReadable || o.length < o.highWaterMark) && e._read(o.highWaterMark);
          }(e, t, r);
        }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
      }(this);var t = this;this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.once("prefinish", function () {
        "function" == typeof this._flush ? this._flush(function (e, r) {
          a(t, e, r);
        }) : a(t);
      });
    }function a(e, t, r) {
      if (t) return e.emit("error", t);null !== r && void 0 !== r && e.push(r);var n = e._writableState,
          i = e._transformState;if (n.length) throw new Error("Calling transform done when ws.length != 0");if (i.transforming) throw new Error("Calling transform done when still transforming");return e.push(null);
    }i.inherits = r(5), i.inherits(o, n), o.prototype.push = function (e, t) {
      return this._transformState.needTransform = !1, n.prototype.push.call(this, e, t);
    }, o.prototype._transform = function (e, t, r) {
      throw new Error("_transform() is not implemented");
    }, o.prototype._write = function (e, t, r) {
      var n = this._transformState;if (n.writecb = r, n.writechunk = e, n.writeencoding = t, !n.transforming) {
        var i = this._readableState;(n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
      }
    }, o.prototype._read = function (e) {
      var t = this._transformState;null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0;
    }, o.prototype._destroy = function (e, t) {
      var r = this;n.prototype._destroy.call(this, e, function (e) {
        t(e), r.emit("close");
      });
    };
  }, function (e, t) {
    e.exports = function (e) {
      var t = typeof e === "undefined" ? "undefined" : _typeof(e);return null != e && ("object" == t || "function" == t);
    };
  }, function (e, t, r) {
    var n = r(140),
        i = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        o = n || i || Function("return this")();e.exports = o;
  }, function (e, t, r) {
    var n = r(62).Symbol;e.exports = n;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function n(e) {
      return e.name && e.type && void 0 !== e.conditions;
    };t.default = { parse: function parse() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).filter(n);
      } };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = l(r(11)),
        o = l(r(12)),
        a = l(r(9)),
        s = l(r(23)),
        u = l(r(15)),
        c = l(r(41)),
        f = (n = r(7)) && n.__esModule ? n : { default: n };function l(e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }t.default = Object.assign({}, u, { Config: f.default, Entities: s, Parsers: a, Setters: i, Repositories: o, Context: c });
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = (n = r(3)) && n.__esModule ? n : { default: n },
        a = function () {
      function e(t, r) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.flagRepo = t, this.experimentsRepo = r;
      }return i(e, [{ key: "prepareFlagsWithExperiments", value: function value() {
          var e = this,
              t = this.experimentsRepo.experiments || [];o.default.debug("Set experiments " + JSON.stringify(t));var r = [];t.forEach(function (t) {
            t && t.flags.forEach(function (n) {
              if (n) {
                var i = e.flagRepo.flagWithName(n.name);i && (r.push(i), e.connectExperimentToFlag(i, t.deploymentConfiguration.condition));
              }
            });
          }), this.flagRepo.flags.forEach(function (t) {
            r.some(function (e) {
              return e === t;
            }) || e.connectExperimentToFlag(t, void 0);
          });
        } }, { key: "setAddedFlag", value: function value(e) {
          var t = this.experimentsRepo.experimentForFlag(e);t && this.connectExperimentToFlag(e, t.deploymentConfiguration.condition);
        } }, { key: "connectExperimentToFlag", value: function value(e, t) {
          e.condition = t;
        } }]), e;
    }();t.default = a;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = a(r(18)),
        o = a(r(3));function a(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this);
      }return n(e, [{ key: "prepareConfigurations", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];o.default.debug("Set remote configurations " + JSON.stringify(e)), e.forEach(function (e) {
            var t = e.name,
                r = e.conditions,
                n = i.default.remoteConfigurationWithName(t);n && (n.condition = r);
          }, this);
        } }]), e;
    }();t.default = s;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.RoxxTokenizer = t.RoxxTokenTypeRand = t.RoxxTokenTypeRator = void 0;var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = (n = r(69)) && n.__esModule ? n : { default: n },
        a = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(27)),
        s = Object.keys(a),
        u = t.RoxxTokenTypeRator = "operator",
        c = t.RoxxTokenTypeRand = "operand";t.RoxxTokenizer = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.tokenArray = [], this.arrayAccumulator = void 0, this.dictionaryAccumulator = void 0, this.dictKey = void 0;
      }return i(e, [{ key: "_stringToRoxx", value: function value(e) {
          return s.includes(e) ? { type: u, value: e } : "true" == e ? { type: c, value: !0 } : "false" == e ? { type: c, value: !1 } : "undefined" == e ? { type: c, value: void 0 } : '"' == e.charAt(0) && '"' == e.charAt(e.length - 1) ? { type: c, value: e.substr(1, e.length - 2) } : isNaN(e) ? { type: "UNKNOWN" } : { type: c, value: +e };
        } }, { key: "push", value: function value(e) {
          this.dictionaryAccumulator && !this.dictKey ? this.dictKey = e.value : this.dictionaryAccumulator && this.dictKey ? (this.dictionaryAccumulator[this.dictKey] = e.value, this.dictKey = void 0) : this.arrayAccumulator ? this.arrayAccumulator.push(e.value) : this.tokenArray.push(e);
        } }, { key: "tokenize", value: function value(e) {
          this.tokenArray = [], this.arrayAccumulator = void 0, this.dictionaryAccumulator = void 0;for (var t, r, n = '{}[]():, \t\r\n"', i = e.replace('\\"', "\\RO_Q"), a = new o.default(i, n, !0); a.hasMoreTokens();) {
            switch (r = t, t = a.nextTokenWithDelimiters(n)) {case "{":
                this.dictionaryAccumulator = {};break;case "}":
                this.tokenArray.push({ type: c, value: this.dictionaryAccumulator }), this.dictionaryAccumulator = void 0;break;case "[":
                this.arrayAccumulator = [];break;case "]":
                this.tokenArray.push({ type: c, value: this.arrayAccumulator }), this.arrayAccumulator = void 0;break;case '"':
                '"' == r && this.push({ type: c, value: "" }), n = '"' == n ? '{}[]():, \t\r\n"' : '"';break;default:
                '"' == n ? this.push({ type: c, value: t.replace("\\RO_Q", '\\"') }) : -1 == '{}[]():, \t\r\n"'.indexOf(t) && this.push(this._stringToRoxx(t));}
          }return this.tokenArray;
        } }]), e;
    }();
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = function () {
      function e(t, r, n) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this._string = t, this._delimiters = r, this._returnDelim = n, this._position = 0;
      }return n(e, [{ key: "countTokens", value: function value() {
          for (var e = 0, t = !1, r = this._position, n = this._string.length; r < n; r++) {
            -1 != this._delimiters.indexOf(this._string.charAt(r)) ? (this._returnDelim && e++, t && (e++, t = !1)) : t = !0;
          }return t && e++, e;
        } }, { key: "hasMoreElements", value: function value() {
          return this.hasMoreTokens();
        } }, { key: "hasMoreTokens", value: function value() {
          if (!this._delimiters) return !1;var e = this._string.length;if (this._position < e) {
            if (this._returnDelim) return !0;for (var t = this._position; t < e; t++) {
              if (-1 == this._delimiters.indexOf(this._string.charAt(t))) return !0;
            }
          }return !1;
        } }, { key: "nextElement", value: function value() {
          return this.nextToken();
        } }, { key: "nextToken", value: function value() {
          if (this._delimiters) {
            var e = this._position,
                t = this._string.length;if (e < t) {
              if (this._returnDelim) {
                if (-1 != this._delimiters.indexOf(this._string.charAt(this._position))) return this._string.charAt(this._position++);for (this._position++; this._position < t; this._position++) {
                  if (-1 != this._delimiters.indexOf(this._string.charAt(this._position))) return this._string.substr(e, this._position - e);
                }return this._string.substr(e);
              }for (; e < t && -1 != this._delimiters.indexOf(this._string.charAt(this._position));) {
                e++;
              }if (this._position = e, e < t) {
                for (this._position++; this._position < t; this._position++) {
                  if (-1 != this._delimiters.indexOf(this._string.charAt(this._position))) return this._string.substr(e, this._position - e);
                }return this._string.substr(e);
              }
            }
          }
        } }, { key: "nextTokenWithDelimiters", value: function value(e) {
          return this._delimiters = e, this.nextToken();
        } }]), e;
    }();t.default = i;
  }, function (e, t, r) {
    "use strict";
    t.byteLength = function (e) {
      return 3 * e.length / 4 - c(e);
    }, t.toByteArray = function (e) {
      var t,
          r,
          n,
          a,
          s,
          u = e.length;a = c(e), s = new o(3 * u / 4 - a), r = a > 0 ? u - 4 : u;var f = 0;for (t = 0; t < r; t += 4) {
        n = i[e.charCodeAt(t)] << 18 | i[e.charCodeAt(t + 1)] << 12 | i[e.charCodeAt(t + 2)] << 6 | i[e.charCodeAt(t + 3)], s[f++] = n >> 16 & 255, s[f++] = n >> 8 & 255, s[f++] = 255 & n;
      }return 2 === a ? (n = i[e.charCodeAt(t)] << 2 | i[e.charCodeAt(t + 1)] >> 4, s[f++] = 255 & n) : 1 === a && (n = i[e.charCodeAt(t)] << 10 | i[e.charCodeAt(t + 1)] << 4 | i[e.charCodeAt(t + 2)] >> 2, s[f++] = n >> 8 & 255, s[f++] = 255 & n), s;
    }, t.fromByteArray = function (e) {
      for (var t, r = e.length, i = r % 3, o = "", a = [], s = 0, u = r - i; s < u; s += 16383) {
        a.push(f(e, s, s + 16383 > u ? u : s + 16383));
      }return 1 === i ? (t = e[r - 1], o += n[t >> 2], o += n[t << 4 & 63], o += "==") : 2 === i && (t = (e[r - 2] << 8) + e[r - 1], o += n[t >> 10], o += n[t >> 4 & 63], o += n[t << 2 & 63], o += "="), a.push(o), a.join("");
    };for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = a.length; s < u; ++s) {
      n[s] = a[s], i[a.charCodeAt(s)] = s;
    }function c(e) {
      var t = e.length;if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0;
    }function f(e, t, r) {
      for (var i, o, a = [], s = t; s < r; s += 3) {
        i = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], a.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
      }return a.join("");
    }i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
  }, function (e, t) {
    t.read = function (e, t, r, n, i) {
      var o,
          a,
          s = 8 * i - n - 1,
          u = (1 << s) - 1,
          c = u >> 1,
          f = -7,
          l = r ? i - 1 : 0,
          h = r ? -1 : 1,
          p = e[t + l];for (l += h, o = p & (1 << -f) - 1, p >>= -f, f += s; f > 0; o = 256 * o + e[t + l], l += h, f -= 8) {}for (a = o & (1 << -f) - 1, o >>= -f, f += n; f > 0; a = 256 * a + e[t + l], l += h, f -= 8) {}if (0 === o) o = 1 - c;else {
        if (o === u) return a ? NaN : 1 / 0 * (p ? -1 : 1);a += Math.pow(2, n), o -= c;
      }return (p ? -1 : 1) * a * Math.pow(2, o - n);
    }, t.write = function (e, t, r, n, i, o) {
      var a,
          s,
          u,
          c = 8 * o - i - 1,
          f = (1 << c) - 1,
          l = f >> 1,
          h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = n ? 0 : o - 1,
          d = n ? 1 : -1,
          y = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = f) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (t += a + l >= 1 ? h / u : h * Math.pow(2, 1 - l)) * u >= 2 && (a++, u /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (t * u - 1) * Math.pow(2, i), a += l) : (s = t * Math.pow(2, l - 1) * Math.pow(2, i), a = 0)); i >= 8; e[r + p] = 255 & s, p += d, s /= 256, i -= 8) {}for (a = a << i | s, c += i; c > 0; e[r + p] = 255 & a, p += d, a /= 256, c -= 8) {}e[r + p - d] |= 128 * y;
    };
  }, function (e, t) {
    var r, n;r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = { rotl: function rotl(e, t) {
        return e << t | e >>> 32 - t;
      }, rotr: function rotr(e, t) {
        return e << 32 - t | e >>> t;
      }, endian: function endian(e) {
        if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);for (var t = 0; t < e.length; t++) {
          e[t] = n.endian(e[t]);
        }return e;
      }, randomBytes: function randomBytes(e) {
        for (var t = []; e > 0; e--) {
          t.push(Math.floor(256 * Math.random()));
        }return t;
      }, bytesToWords: function bytesToWords(e) {
        for (var t = [], r = 0, n = 0; r < e.length; r++, n += 8) {
          t[n >>> 5] |= e[r] << 24 - n % 32;
        }return t;
      }, wordsToBytes: function wordsToBytes(e) {
        for (var t = [], r = 0; r < 32 * e.length; r += 8) {
          t.push(e[r >>> 5] >>> 24 - r % 32 & 255);
        }return t;
      }, bytesToHex: function bytesToHex(e) {
        for (var t = [], r = 0; r < e.length; r++) {
          t.push((e[r] >>> 4).toString(16)), t.push((15 & e[r]).toString(16));
        }return t.join("");
      }, hexToBytes: function hexToBytes(e) {
        for (var t = [], r = 0; r < e.length; r += 2) {
          t.push(parseInt(e.substr(r, 2), 16));
        }return t;
      }, bytesToBase64: function bytesToBase64(e) {
        for (var t = [], n = 0; n < e.length; n += 3) {
          for (var i = e[n] << 16 | e[n + 1] << 8 | e[n + 2], o = 0; o < 4; o++) {
            8 * n + 6 * o <= 8 * e.length ? t.push(r.charAt(i >>> 6 * (3 - o) & 63)) : t.push("=");
          }
        }return t.join("");
      }, base64ToBytes: function base64ToBytes(e) {
        e = e.replace(/[^A-Z0-9+\/]/gi, "");for (var t = [], n = 0, i = 0; n < e.length; i = ++n % 4) {
          0 != i && t.push((r.indexOf(e.charAt(n - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | r.indexOf(e.charAt(n)) >>> 6 - 2 * i);
        }return t;
      } }, e.exports = n;
  }, function (e, t) {
    function r(e) {
      return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
    }e.exports = function (e) {
      return null != e && (r(e) || function (e) {
        return "function" == typeof e.readFloatLE && "function" == typeof e.slice && r(e.slice(0, 0));
      }(e) || !!e._isBuffer);
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1),
        i = r(32),
        o = r(75),
        a = r(38);function s(e) {
      var t = new o(e),
          r = i(o.prototype.request, t);return n.extend(r, o.prototype, t), n.extend(r, t), r;
    }var u = s(r(35));u.Axios = o, u.create = function (e) {
      return s(a(u.defaults, e));
    }, u.Cancel = r(39), u.CancelToken = r(88), u.isCancel = r(34), u.all = function (e) {
      return _Promise.all(e);
    }, u.spread = r(89), e.exports = u, e.exports.default = u;
  }, function (e, t, r) {
    "use strict";
    var n = r(1),
        i = r(33),
        o = r(76),
        a = r(77),
        s = r(38);function u(e) {
      this.defaults = e, this.interceptors = { request: new o(), response: new o() };
    }u.prototype.request = function (e) {
      "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = s(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";var t = [a, void 0],
          r = _Promise.resolve(e);for (this.interceptors.request.forEach(function (e) {
        t.unshift(e.fulfilled, e.rejected);
      }), this.interceptors.response.forEach(function (e) {
        t.push(e.fulfilled, e.rejected);
      }); t.length;) {
        r = r.then(t.shift(), t.shift());
      }return r;
    }, u.prototype.getUri = function (e) {
      return e = s(this.defaults, e), i(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
    }, n.forEach(["delete", "get", "head", "options"], function (e) {
      u.prototype[e] = function (t, r) {
        return this.request(n.merge(r || {}, { method: e, url: t }));
      };
    }), n.forEach(["post", "put", "patch"], function (e) {
      u.prototype[e] = function (t, r, i) {
        return this.request(n.merge(i || {}, { method: e, url: t, data: r }));
      };
    }), e.exports = u;
  }, function (e, t, r) {
    "use strict";
    var n = r(1);function i() {
      this.handlers = [];
    }i.prototype.use = function (e, t) {
      return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
    }, i.prototype.eject = function (e) {
      this.handlers[e] && (this.handlers[e] = null);
    }, i.prototype.forEach = function (e) {
      n.forEach(this.handlers, function (t) {
        null !== t && e(t);
      });
    }, e.exports = i;
  }, function (e, t, r) {
    "use strict";
    var n = r(1),
        i = r(78),
        o = r(34),
        a = r(35);function s(e) {
      e.cancelToken && e.cancelToken.throwIfRequested();
    }e.exports = function (e) {
      return s(e), e.headers = e.headers || {}, e.data = i(e.data, e.headers, e.transformRequest), e.headers = n.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
        delete e.headers[t];
      }), (e.adapter || a.adapter)(e).then(function (t) {
        return s(e), t.data = i(t.data, t.headers, e.transformResponse), t;
      }, function (t) {
        return o(t) || (s(e), t && t.response && (t.response.data = i(t.response.data, t.response.headers, e.transformResponse))), _Promise.reject(t);
      });
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1);e.exports = function (e, t, r) {
      return n.forEach(r, function (r) {
        e = r(e, t);
      }), e;
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1);e.exports = function (e, t) {
      n.forEach(e, function (r, n) {
        n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n]);
      });
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(37);e.exports = function (e, t, r) {
      var i = r.config.validateStatus;!i || i(r.status) ? e(r) : t(n("Request failed with status code " + r.status, r.config, null, r.request, r));
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e, t, r, n, i) {
      return e.config = t, r && (e.code = r), e.request = n, e.response = i, e.isAxiosError = !0, e.toJSON = function () {
        return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code };
      }, e;
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(83),
        i = r(84);e.exports = function (e, t) {
      return e && !n(t) ? i(e, t) : t;
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
      return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
      );
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
      return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1),
        i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];e.exports = function (e) {
      var t,
          r,
          o,
          a = {};return e ? (n.forEach(e.split("\n"), function (e) {
        if (o = e.indexOf(":"), t = n.trim(e.substr(0, o)).toLowerCase(), r = n.trim(e.substr(o + 1)), t) {
          if (a[t] && i.indexOf(t) >= 0) return;a[t] = "set-cookie" === t ? (a[t] ? a[t] : []).concat([r]) : a[t] ? a[t] + ", " + r : r;
        }
      }), a) : a;
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1);e.exports = n.isStandardBrowserEnv() ? function () {
      var e,
          t = /(msie|trident)/i.test(navigator.userAgent),
          r = document.createElement("a");function i(e) {
        var n = e;return t && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), { href: r.href, protocol: r.protocol ? r.protocol.replace(/:$/, "") : "", host: r.host, search: r.search ? r.search.replace(/^\?/, "") : "", hash: r.hash ? r.hash.replace(/^#/, "") : "", hostname: r.hostname, port: r.port, pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname };
      }return e = i(window.location.href), function (t) {
        var r = n.isString(t) ? i(t) : t;return r.protocol === e.protocol && r.host === e.host;
      };
    }() : function () {
      return !0;
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(1);e.exports = n.isStandardBrowserEnv() ? { write: function write(e, t, r, i, o, a) {
        var s = [];s.push(e + "=" + encodeURIComponent(t)), n.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()), n.isString(i) && s.push("path=" + i), n.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ");
      }, read: function read(e) {
        var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));return t ? decodeURIComponent(t[3]) : null;
      }, remove: function remove(e) {
        this.write(e, "", Date.now() - 864e5);
      } } : { write: function write() {}, read: function read() {
        return null;
      }, remove: function remove() {} };
  }, function (e, t, r) {
    "use strict";
    var n = r(39);function i(e) {
      if ("function" != typeof e) throw new TypeError("executor must be a function.");var t;this.promise = new _Promise(function (e) {
        t = e;
      });var r = this;e(function (e) {
        r.reason || (r.reason = new n(e), t(r.reason));
      });
    }i.prototype.throwIfRequested = function () {
      if (this.reason) throw this.reason;
    }, i.source = function () {
      var e;return { token: new i(function (t) {
          e = t;
        }), cancel: e };
    }, e.exports = i;
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
      return function (t) {
        return e.apply(null, t);
      };
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = u(r(91)),
        a = u(r(149)),
        s = u(r(64));function u(e) {
      return e && e.__esModule ? e : { default: e };
    }var c = function () {
      function e(t, r) {
        var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];if (function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), !t || "object" !== (void 0 === t ? "undefined" : n(t))) throw new Error("ConfigurationParser should be constructed with JSON object. Received " + t);if (!r || "string" != typeof r) throw new Error("ConfigurationParser should be constructed with app key string. Received " + r);this._json = t, this._appKey = r, this._validateAppKey = i;
      }return i(e, [{ key: "parse", value: function value() {
          var e = this._extractInnerJson(this._json);return this._validateAppKey && e.application !== this._appKey ? null : (this._parseExperiments(e.experiments), this._parseTargetGroups(e.targetGroups), this._parseRemoteConfigurations(e.remoteVariables), this._signedDate = new Date(this._json.signed_date), this);
        } }, { key: "experiments", value: function value() {
          return this._experiments || [];
        } }, { key: "targetGroups", value: function value() {
          return this._targetGroups || [];
        } }, { key: "remoteConfigurations", value: function value() {
          return this._configurations || [];
        } }, { key: "signedDate", value: function value() {
          return this._signedDate;
        } }, { key: "_extractInnerJson", value: function value(e) {
          return JSON.parse(e.data);
        } }, { key: "_parseExperiments", value: function value(e) {
          this._experiments = new o.default(e).parse();
        } }, { key: "_parseTargetGroups", value: function value(e) {
          this._targetGroups = new a.default(e).parse();
        } }, { key: "_parseRemoteConfigurations", value: function value(e) {
          this._configurations = s.default.parse(e);
        } }]), e;
    }();t.default = c;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = r(23),
        o = function () {
      function e(t) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this._json = t;
      }return n(e, [{ key: "parse", value: function value() {
          if (!this._json || !this._json.length) return [];var e = [];return this._json.forEach(function (t) {
            if (t && t.deploymentConfiguration && t._id && t.name && t.featureFlags) {
              var r = t.deploymentConfiguration;if (r.condition) {
                var n = t.labels || [],
                    o = new i.DeploymentConfiguration(r.condition);e.push(new i.Experiment(t._id, t.name, !!t.archived, !!t.sticky, o, t.featureFlags, n, t.stickinessProperty));
              }
            }
          }), e;
        } }]), e;
    }();t.default = o;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = (n = r(40)) && n.__esModule ? n : { default: n },
        a = function (e) {
      function t() {
        return function (e, r) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this), function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
      }return function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, o.default), i(t, [{ key: "name", get: function get() {
          return "rox." + function e(t, r, n) {
            null === t && (t = Function.prototype);var i = Object.getOwnPropertyDescriptor(t, r);if (void 0 === i) {
              var o = Object.getPrototypeOf(t);return null === o ? void 0 : e(o, r, n);
            }if ("value" in i) return i.value;var a = i.get;return void 0 !== a ? a.call(n) : void 0;
          }(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "name", this);
        } }]), t;
    }();t.default = a;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function e(t) {
      !function (t, r) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this), this.condition = t;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function e(t, r, n, i, o, a, s, u) {
      !function (t, r) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this), this.identifier = t, this.name = r, this.archived = n, this.sticky = i, this.deploymentConfiguration = o, this.flags = a, this.labels = s, this.stickinessProperty = u;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = r(9),
        a = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(41)),
        s = new o.RoxxParser(),
        u = ["string", "boolean", "number"],
        c = function () {
      function e(t) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this);var r = void 0 === t ? "undefined" : n(t);if (this._entityType = "configuration", -1 === u.indexOf(r)) throw new Error("RoxConfiguration initialized with wrong type '" + r + "'");Object.defineProperty(this, "_defaultValue", { value: t, writable: !1, enumerable: !1 }), Object.defineProperty(this, "_value", { value: t, writable: !0, enumerable: !1 }), Object.defineProperty(this, "_type", { value: r, writable: !1, enumerable: !1 }), Object.defineProperty(this, "_externalType", { value: r.charAt(0).toUpperCase() + r.slice(1), writable: !1, enumerable: !1 }), Object.defineProperty(this, "_name", { value: null, writable: !0, enumerable: !1 });
      }return i(e, [{ key: "getValue", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};if (this.condition) {
            var t = a.Actions.getMergedContextWithGlobal(e),
                r = s.evaluateExpression(this.condition, {}, t);this._type !== (void 0 === r ? "undefined" : n(r)) || void 0 === r ? this._value = this._defaultValue : this._value = r;
          }return this._value;
        } }, { key: "name", get: function get() {
          return this._name;
        } }, { key: "type", get: function get() {
          return this._type;
        } }, { key: "externalType", get: function get() {
          return this._externalType;
        } }, { key: "defaultValue", get: function get() {
          return this._defaultValue;
        } }]), e;
    }();t.default = c;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getMergedContext = function (e, t) {
      if (!e) return i(t);var r = Object.assign({}, e, t);return i(r);
    }, t.getMergedContextWithGlobal = function (e) {
      var t = n.getContext();if (!e) return t;var r = Object.assign({}, t, e);return i(r);
    };var n = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(42)),
        i = r(43);
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      var n = Symbol.prototype.valueOf,
          i = r(98);e.exports = function (e, r) {
        switch (i(e)) {case "array":
            return e.slice();case "object":
            return Object.assign({}, e);case "date":
            return new e.constructor(Number(e));case "map":
            return new Map(e);case "set":
            return new Set(e);case "buffer":
            return function (e) {
              var r = e.length,
                  n = t.allocUnsafe ? t.allocUnsafe(r) : t.from(r);return e.copy(n), n;
            }(e);case "symbol":
            return function (e) {
              return n ? Object(n.call(e)) : {};
            }(e);case "arraybuffer":
            return function (e) {
              var t = new e.constructor(e.byteLength);return new Uint8Array(t).set(new Uint8Array(e)), t;
            }(e);case "float32array":case "float64array":case "int16array":case "int32array":case "int8array":case "uint16array":case "uint32array":case "uint8clampedarray":case "uint8array":
            return function (e, t) {
              return new e.constructor(e.buffer, e.byteOffset, e.length);
            }(e);case "regexp":
            return function (e) {
              var t = void 0 !== e.flags ? e.flags : /\w+$/.exec(e) || void 0,
                  r = new e.constructor(e.source, t);return r.lastIndex = e.lastIndex, r;
            }(e);case "error":
            return Object.create(e);default:
            return e;}
      };
    }).call(t, r(4).Buffer);
  }, function (e, t) {
    var r = Object.prototype.toString;function n(e) {
      return e.constructor ? e.constructor.name : null;
    }e.exports = function (e) {
      if (void 0 === e) return "undefined";if (null === e) return "null";var t = typeof e === "undefined" ? "undefined" : _typeof(e);if ("boolean" === t) return "boolean";if ("string" === t) return "string";if ("number" === t) return "number";if ("symbol" === t) return "symbol";if ("function" === t) return "GeneratorFunction" === n(e) ? "generatorfunction" : "function";if (function (e) {
        return Array.isArray ? Array.isArray(e) : e instanceof Array;
      }(e)) return "array";if (function (e) {
        return !(!e.constructor || "function" != typeof e.constructor.isBuffer) && e.constructor.isBuffer(e);
      }(e)) return "buffer";if (function (e) {
        try {
          if ("number" == typeof e.length && "function" == typeof e.callee) return !0;
        } catch (e) {
          if (-1 !== e.message.indexOf("callee")) return !0;
        }return !1;
      }(e)) return "arguments";if (function (e) {
        return e instanceof Date || "function" == typeof e.toDateString && "function" == typeof e.getDate && "function" == typeof e.setDate;
      }(e)) return "date";if (function (e) {
        return e instanceof Error || "string" == typeof e.message && e.constructor && "number" == typeof e.constructor.stackTraceLimit;
      }(e)) return "error";if (function (e) {
        return e instanceof RegExp || "string" == typeof e.flags && "boolean" == typeof e.ignoreCase && "boolean" == typeof e.multiline && "boolean" == typeof e.global;
      }(e)) return "regexp";switch (n(e)) {case "Symbol":
          return "symbol";case "Promise":
          return "promise";case "WeakMap":
          return "weakmap";case "WeakSet":
          return "weakset";case "Map":
          return "map";case "Set":
          return "set";case "Int8Array":
          return "int8array";case "Uint8Array":
          return "uint8array";case "Uint8ClampedArray":
          return "uint8clampedarray";case "Int16Array":
          return "int16array";case "Uint16Array":
          return "uint16array";case "Int32Array":
          return "int32array";case "Uint32Array":
          return "uint32array";case "Float32Array":
          return "float32array";case "Float64Array":
          return "float64array";}if (function (e) {
        return "function" == typeof e.throw && "function" == typeof e.return && "function" == typeof e.next;
      }(e)) return "generator";switch (t = r.call(e)) {case "[object Object]":
          return "object";case "[object Map Iterator]":
          return "mapiterator";case "[object Set Iterator]":
          return "setiterator";case "[object String Iterator]":
          return "stringiterator";case "[object Array Iterator]":
          return "arrayiterator";}return t.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
  }, function (e, t) {
    var r = Object.prototype.toString;function n(e) {
      return e.constructor ? e.constructor.name : null;
    }e.exports = function (e) {
      if (void 0 === e) return "undefined";if (null === e) return "null";var t = typeof e === "undefined" ? "undefined" : _typeof(e);if ("boolean" === t) return "boolean";if ("string" === t) return "string";if ("number" === t) return "number";if ("symbol" === t) return "symbol";if ("function" === t) return "GeneratorFunction" === n(e) ? "generatorfunction" : "function";if (function (e) {
        return Array.isArray ? Array.isArray(e) : e instanceof Array;
      }(e)) return "array";if (function (e) {
        return !(!e.constructor || "function" != typeof e.constructor.isBuffer) && e.constructor.isBuffer(e);
      }(e)) return "buffer";if (function (e) {
        try {
          if ("number" == typeof e.length && "function" == typeof e.callee) return !0;
        } catch (e) {
          if (-1 !== e.message.indexOf("callee")) return !0;
        }return !1;
      }(e)) return "arguments";if (function (e) {
        return e instanceof Date || "function" == typeof e.toDateString && "function" == typeof e.getDate && "function" == typeof e.setDate;
      }(e)) return "date";if (function (e) {
        return e instanceof Error || "string" == typeof e.message && e.constructor && "number" == typeof e.constructor.stackTraceLimit;
      }(e)) return "error";if (function (e) {
        return e instanceof RegExp || "string" == typeof e.flags && "boolean" == typeof e.ignoreCase && "boolean" == typeof e.multiline && "boolean" == typeof e.global;
      }(e)) return "regexp";switch (n(e)) {case "Symbol":
          return "symbol";case "Promise":
          return "promise";case "WeakMap":
          return "weakmap";case "WeakSet":
          return "weakset";case "Map":
          return "map";case "Set":
          return "set";case "Int8Array":
          return "int8array";case "Uint8Array":
          return "uint8array";case "Uint8ClampedArray":
          return "uint8clampedarray";case "Int16Array":
          return "int16array";case "Uint16Array":
          return "uint16array";case "Int32Array":
          return "int32array";case "Uint32Array":
          return "uint32array";case "Float32Array":
          return "float32array";case "Float64Array":
          return "float64array";}if (function (e) {
        return "function" == typeof e.throw && "function" == typeof e.return && "function" == typeof e.next;
      }(e)) return "generator";switch (t = r.call(e)) {case "[object Object]":
          return "object";case "[object Map Iterator]":
          return "mapiterator";case "[object Set Iterator]":
          return "setiterator";case "[object String Iterator]":
          return "stringiterator";case "[object Array Iterator]":
          return "arrayiterator";}return t.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(101);function i(e) {
      return !0 === n(e) && "[object Object]" === Object.prototype.toString.call(e);
    }e.exports = function (e) {
      var t, r;return !1 !== i(e) && "function" == typeof (t = e.constructor) && !1 !== i(r = t.prototype) && !1 !== r.hasOwnProperty("isPrototypeOf");
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e) {
      return null != e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && !1 === Array.isArray(e);
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.callContextTypes = void 0;var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = r(45);function o(e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) {
          r[t] = e[t];
        }return r;
      }return Array.from(e);
    }var a = t.callContextTypes = { frozenOrCalc: "frozenValueOrOneTimeEval", oneTimeCalc: "oneTimeEval", default: "useFrozen" },
        s = function () {
      function e(t, r, n) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this._entityType = "variant", this._validateDefault(t), Array.isArray(r) ? (this._options = [].concat(o(r)), this._validateOptions(), this._name = n) : (this._options = [], r && "string" == typeof r && (this._name = r)), -1 === this._options.indexOf(t) && this._options.push(t), this._value = this._defaultValue = t, this._type = "string", this._frozen = !1, this._freezable = !0;
      }return n(e, [{ key: "_validateDefault", value: function value(e) {
          if ("string" != typeof e) throw new Error("RoxVariant default value must be string. Received '" + e + "'");
        } }, { key: "_validateOptions", value: function value() {
          var e = new Error("RoxVariant options must be a non-empty array of strings. Received '" + this._options + "'");if (!this._options.every(function (e) {
            return "string" == typeof e;
          })) throw e;
        } }, { key: "getInternalValue", value: function value() {
          throw Error("not implemented");
        } }, { key: "_getNameDetails", value: function value() {
          if (this.name) {
            var e = this.name.split(".");return { name: e.pop(), namespace: e.join(".") || "default" };
          }
        } }, { key: "dump", value: function value() {
          return { name: this.name, nameDetails: this._getNameDetails(), options: [].concat(o(this._options)), defaultValue: this.defaultValue, originalValue: this._originalValue(), overridingValue: this.overridenValue, value: this.getInternalValue({ dontInvokeFlagImpression: !0, type: a.frozenOrCalc }) };
        } }, { key: "_originalValue", value: function value() {
          return this.getActiveValue({ dontInvokeFlagImpression: !0, type: a.frozenOrCalc });
        } }, { key: "_flagImpression", value: function value(e, t) {
          (0, i.invokeImpression)(e, this, t);
        } }, { key: "defaultValue", get: function get() {
          return this._defaultValue;
        } }, { key: "overridenValue", get: function get() {
          if (this.overrider.hasOverride(this.name)) return this.overrider.getOverride(this.name);
        } }, { key: "name", set: function set(e) {
          this._name = e;
        }, get: function get() {
          return this._name;
        } }]), e;
    }();t.default = s;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = r(104),
        a = r(105),
        s = r(9),
        u = r(11),
        c = m(r(21)),
        f = r(24),
        l = m(r(7)),
        h = m(r(19)),
        p = m(r(6)),
        d = m(r(14)),
        y = m(r(3)),
        g = r(49),
        v = m(r(106));function m(e) {
      return e && e.__esModule ? e : { default: e };
    }var b = l.default.get("CLIENT_DATA_CACHE_KEY"),
        _ = !1,
        w = function () {
      function e(t, r, n, i, o, a, s) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.cache = i.RoxCache, this.crypto = i.RoxCrypto, this.embdeddedJSON = this.fetchFromEmbedded(o), this.appKey = t, this.deviceProperties = r, this.devModeSecret = n, this.options = a || {}, this.networkOptions = s, this.lastResponse = null;
      }return i(e, [{ key: "runHandler", value: function value(e, t) {
          if (t.errorDetails && c.default.error("Configuration fetcher returned with " + t.fetcherStatus, t.errorDetails), e instanceof Function) try {
            e(t);
          } catch (e) {}
        } }, { key: "dispatch", value: function value(e) {
          var t = e.handler,
              r = e.options;y.default.debug("dispatch();");var n = [];if (r.useCache) {
            if (this.embdeddedJSON) {
              if (!this.verifyPayload(this.embdeddedJSON)) throw new Error("The embdeddedJSON was corrupted or its authenticity cannot be securely verified.");var i = this.parsePayload(this.embdeddedJSON);i && n.push({ payload: this.embdeddedJSON, parser: i, status: g.FetcherStatus.APPLIED_FROM_EMBEDDED });
            }var o = this.fetchFromCache();if (o) {
              if (!this.verifyPayload(o)) throw new Error("The cachedPayload was corrupted or its authenticity cannot be securely verified.");var a = this.parsePayload(o);a && n.push({ payload: o, parser: a, status: g.FetcherStatus.APPLIED_FROM_CACHE });
            }
          }if (n.length > 0) {
            var s = n.reduce(function (e, t) {
              return e && e.parser.signedDate() > t.parser.signedDate() ? e : t;
            }, null);(!this.lastApplied || this.lastApplied.signedDate() < s.parser.signedDate()) && (this.lastResponse = s.payload, this.apply(s.parser, s.status, !1, t, s.payload));
          }if (!r.skipNetwork) {
            if (!this.shouldSkipFetch(r.source)) return this._dispatch({ handler: t, storeInCache: !0 });y.default.debug("Skipping fetch - kill switch");
          }
        } }, { key: "shouldSkipFetch", value: function value(e) {
          var t = "push" === e,
              r = (0, f.getNumber)("rox.internal.throttleFetchInSeconds");if (r > 0 && (!t || (0, f.isEnabled)("rox.internal.considerThrottleInPush"))) {
            var n = +Date.now();if (this.lastFetchTryTime && n < this.lastFetchTryTime + 1e3 * r) return !0;this.lastFetchTryTime = n;
          }return !1;
        } }, { key: "dispatchPeriodically", value: function value(e) {
          var t = this,
              r = e.handler,
              n = e.periodTimeInSec;if (_) return y.default.debug("Dispatch Periodically already running"), _Promise.resolve();_ = !0, y.default.debug("Dispatch Periodically"), setInterval(function () {
            t._dispatch({ handler: r });
          }, 1e3 * n);
        } }, { key: "_dispatch", value: function value(e) {
          var t = this,
              r = e.handler,
              n = e.storeInCache;return this.fetchFromNetwork().then(function (e) {
            var i = t.isNewResponse(e);return t.process(e, g.FetcherStatus.APPLIED_FROM_NETWORK, i, r).then(function () {
              n && t.storeInCache(e), t.lastResponse = e;
            });
          }).catch(function (e) {
            t.runHandler(r, new g.FetcherResults(g.FetcherStatus.ERROR_FETCH_FAILED, null, !1, e));
          });
        } }, { key: "fetchFromNetwork", value: function value() {
          y.default.debug("fetch from network for appKey " + this.appKey);var e = (0, a.buildRequestConfiguration)({ appKey: this.appKey, deviceProperties: this.deviceProperties, devModeSecret: this.devModeSecret });return this.options.roxyUrl ? (0, o.fetchRemoteConfigurationWithRoxy)(e, this.options.roxyUrl, this.networkOptions) : (0, o.fetchRemoteConfiguration)(e, this.networkOptions, this.options);
        } }, { key: "fetchFromCache", value: function value() {
          y.default.debug("fetch From Cache");var e = this.cache.get(this.cacheKey());e || (e = this.cache.get(b));var t = void 0;if (e) {
            try {
              t = JSON.parse(e);
            } catch (e) {
              y.default.warn("Configuration retrieved from cache, but is corrupted. Aborting. (Error: " + e + ")");
            }if (t && t.constructor === Object) return y.default.debug("Parsed cached = " + JSON.stringify(t)), t;
          }
        } }, { key: "cacheKey", value: function value() {
          return b + "-" + this.appKey;
        } }, { key: "fetchFromEmbedded", value: function value(e) {
          var t = void 0;if (e) {
            try {
              t = JSON.parse(e);
            } catch (e) {
              y.default.warn("Received embdedded configuration, but it is corrupted. Aborting. Error: ", e);
            }if (t && t.constructor === Object) return y.default.debug("Parsed embedded = " + JSON.stringify(t)), t;
          }if (v.default && "object" === (void 0 === v.default ? "undefined" : n(v.default))) return v.default;
        } }, { key: "storeInCache", value: function value(e) {
          y.default.debug("Store in cache response = " + JSON.stringify(e)), this.cache.set(this.cacheKey(), JSON.stringify(e));
        } }, { key: "process", value: function value(e, t, r, n) {
          if (!e) return _Promise.reject("Empty configuration");if (!this.verifyPayload(e)) throw new Error("The payload has corrupted or its authenticity cannot be securely verified.");var i = this.parsePayload(e);return i ? this.apply(i, t, r, n, e) : _Promise.reject("Failed to parse configuration");
        } }, { key: "apply", value: function value(e, t, r, n, i) {
          var o = this;if (e) return this.calculatePayload(e), this.lastApplied = e, new _Promise(function (a) {
            var s = new g.FetcherResults(t, e.signedDate(), r, void 0, i);o.runHandler(n, s), a();
          });
        } }, { key: "parsePayload", value: function value(e) {
          var t = !this.options.roxyUrl,
              r = new s.ConfigurationParser(e, this.appKey, t);return r.parse() ? r : (y.default.debug("failed to parse payload. response = " + JSON.stringify(e) + " deviceProps = " + this.deviceProperties + " app_key = " + this.appKey), null);
        } }, { key: "verifyPayload", value: function value(e) {
          var t = e.signature_v0,
              r = e.data;return !(!this.options.roxyUrl && !this.options.selfManagedMode) || this.crypto.verify(r, t);
        } }, { key: "calculatePayload", value: function value(e) {
          if (e) return h.default.setTargetGroups(e.targetGroups()), p.default.setExperiments(e.experiments()), new u.ConfigurationSetter().prepareConfigurations(e.remoteConfigurations()), new u.FlagsSetter(d.default, p.default).prepareFlagsWithExperiments(), e;
        } }, { key: "isNewResponse", value: function value(e) {
          return JSON.stringify(this.lastResponse) !== JSON.stringify(e);
        } }]), e;
    }();t.default = w;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.fetchRemoteConfigurationWithRoxy = function (e, t, r) {
      var n = (0, i.buildAPIURL)(e, t);return s((0, o.fetchFromRoxyAPI)(n.url, r));
    }, t.fetchRemoteConfiguration = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          n = e.cache_url + "?distinct_id=" + e.distinct_id;if (r.selfManagedMode) {
        var a = (0, i.buildAPIURL)(e);return s((0, o.fetchFromAPI)(a.url, a.body, t));
      }return s((0, o.fetchFromCDN)(n, t).catch(function () {
        var r = (0, i.buildAPIURL)(e);return (0, o.fetchFromAPI)(r.url, r.body, t);
      }));
    };var n,
        i = r(46),
        o = r(47),
        a = (n = r(3)) && n.__esModule ? n : { default: n };function s(e) {
      return e.catch(function (e) {
        throw e.message = "Unable to fetch rox configuration!\n" + e.message, a.default.error(e), e;
      });
    }
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.buildRequestConfiguration = void 0;var n,
        i = (n = r(7)) && n.__esModule ? n : { default: n },
        o = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(48));t.buildRequestConfiguration = function (e) {
      var t = e.appKey,
          r = e.deviceProperties,
          n = e.devModeSecret,
          a = r.getProperties();return a.app_key = t, a.buid = o.generateBuid(a), a.buid_generators_list = o.BUID_GENERATOR_LIST.join(","), a.relative_url = t + "/" + a.buid, a.cache_url = "" + i.default.get("CD_S3_ENDPOINT") + a.relative_url, a.devModeSecret = n, a;
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = void 0,
        i = void 0;try {
      i = $__ROX_EMBEDDED_CONTENT;
    } catch (e) {}if (i && "string" == typeof i) try {
      i = JSON.parse(i);
    } catch (e) {
      i = void 0;
    }i && i.constructor === Object && i.signed_date && (n = i), t.default = n;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = r(12),
        o = { flagsRepository: i.Flags, configurationRepository: i.Configuration },
        a = function () {
      function e() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};!function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.options = Object.assign({}, o, t), this._flagsRepository = this.options.flagsRepository, this._configurationRepository = this.options.configurationRepository, this._namespaceStore = new Set();
      }return n(e, [{ key: "handleContainer", value: function value(e, t) {
          if ("[object String]" !== Object.prototype.toString.call(e)) throw new Error("InvalidNamespace: Namespace must be a string (non-nullable).");if (this._namespaceStore.has(e)) throw new Error("InvalidNamespace: A namespace must be unique. A container with the given namespace ('" + e + "') has already been registered.");for (var r in this._namespaceStore.add(e), t) {
            if (t.hasOwnProperty(r)) {
              var n = e ? e + "." + r : r,
                  i = t[r];"flag" !== i._entityType && "variant" !== i._entityType || this._flagsRepository.addFlag(n, i), "configuration" === i._entityType && this._configurationRepository.addRemoteConfiguration(n, i);
            }
          }
        } }]), e;
    }();t.default = a;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        i = function () {
      function e(t, r) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.cache = t, this._uuid = r, this.distinct_id = this.generateDistinctId(), this.app_release = "0.0", this.distinctIdSetExplicitly = !1;
      }return n(e, [{ key: "setPlatform", value: function value(e) {
          this.platform = e;
        } }, { key: "setDistinctId", value: function value(e) {
          this.distinctIdSetExplicitly = !0, this.distinct_id = e;
        } }, { key: "setAppRelease", value: function value(e) {
          this.app_release = e;
        } }, { key: "uuid", value: function value() {
          return this._uuid();
        } }, { key: "generateDistinctId", value: function value() {
          var e = this.cache.get("distinctId");return e || (e = this.uuid(), this.cache.set("distinctId", e)), e;
        } }]), e;
    }();t.default = i;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Client = void 0;var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }();t.default = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};return w = Object.assign({}, w, e), E._dynamicApi = new s.default(e.EntitiesProvider, a.Flags, E), E;
    };var o = r(15),
        a = r(12),
        s = b(r(51)),
        u = b(r(7)),
        c = r(23),
        f = r(9),
        l = r(45),
        h = b(r(110)),
        p = b(r(111)),
        d = r(24),
        y = r(31),
        g = b(r(138)),
        v = r(49),
        m = b(r(147));function b(e) {
      return e && e.__esModule ? e : { default: e };
    }var _ = 5e3,
        w = { ClassRegister: o.ClassRegister },
        E = new (t.Client = function () {
      function e() {
        var t = this,
            r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : _;!function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.classRegisterer = new w.ClassRegister(), this.sendStateDebounceNoCheck = (0, g.default)(function () {
          t._sendState();
        }, r, { maxWait: r, leading: !1, trailing: !0 }), this.sendStateDebounced = function () {
          t.appKey && t.sendStateDebounceNoCheck();
        }, this.onConfigurationFetched = this.onConfigurationFetched.bind(this);
      }return i(e, [{ key: "setKey", value: function value(e) {
          if (!/^[a-f\d]{24}$/i.test(e)) throw Error("invalid rollout apikey");this.app_key = e;
        } }, { key: "setup", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};try {
            this.handleOptions(e), w.DeviceProperties = w.DeviceProperties.create ? w.DeviceProperties.create(w) : w.DeviceProperties, this.app_release && w.DeviceProperties.setAppRelease(this.app_release), this.distinct_id && w.DeviceProperties.setDistinctId(this.distinct_id), this.platform && w.DeviceProperties.setPlatform(this.platform), this.deviceProperties = w.DeviceProperties, o.BugsnagReporter.init(this.appKey, w.DeviceProperties, this.networkOptions, this.selfManagedMode), this.configurationFetcher = new o.ConfigurationFetcher(this.appKey, this.deviceProperties, this.devModeSecret, w, this.embeddedConfiguration, { roxyUrl: this.roxyUrl, selfManagedMode: this.selfManagedMode }, this.networkOptions), this.roxyUrl || (this.stateSender = new m.default(this.appKey, this.deviceProperties, this.devModeSecret, this.networkOptions, { selfManagedMode: this.selfManagedMode }), this.disableNetwork || (0, l.setAnalytics)(new h.default(this.appKey, Object.assign({}, this.analyticsOptions), w.DeviceProperties, this.networkOptions))), w.getDefaultCustomProperties(this.deviceProperties, this.appKey).map(a.CustomProperties.setIfNotExists.bind(a.CustomProperties));
          } catch (e) {
            var t = "Oh uh! An error occured during setup.";o.RoxLogger.error(t, e), o.BugsnagReporter.error(t, e);
          }return _Promise.resolve(this);
        } }, { key: "handleOptions", value: function value(e) {
          var t = Object.assign({}, w.DefaultSetupOptions, e);if (t.selfManaged && "object" === n(t.selfManaged)) {
            if (!t.selfManaged.analyticsURL) throw new Error("analyticsURL is required on self managed mode");if (!t.selfManaged.serverURL) throw new Error("serverURL is required on self managed mode");u.default.setSelfManagedMode(t.selfManaged), (0, d.setDefaultsMode)(!0), this.selfManagedMode = !0;
          }t.configuration && t.configuration.disableNetwork && (this.disableNetwork = !0), this.embeddedConfiguration = t.embedded, this.fetchIntervalInSec = t.fetchIntervalInSec, this.disablePushUpdateListener = !(!this.selfManagedMode && !this.disableNetwork) || t.disablePushUpdateListener, this.configurationFetchedHandler = t.configurationFetchedHandler, this.impressionHandler = t.impressionHandler, this.app_release = t.version, this.distinct_id = t.distinctId, this.devModeSecret = t.devModeSecret, this.platform = t.platform, this.roxyUrl = t.roxy, this.networkOptions = { httpAgent: t.httpAgent, httpsAgent: t.httpsAgent }, this.analyticsOptions = t.analytics, this.eventSourceImpl = t.eventSourceImpl, this.notificationEndpoint = t.configuration && t.configuration.NOTIFICATIONS_ENDPOINT ? t.configuration.NOTIFICATIONS_ENDPOINT : u.default.get("NOTIFICATIONS_ENDPOINT"), (0, l.setHandler)(this.impressionHandler), e.logger && o.RoxLogger.setLogger(e.logger);
        } }, { key: "fetchPeriodically", value: function value() {
          if (!this.app_key) return o.RoxLogger.warn("no app key"), _Promise.reject();if (this.fetchIntervalInSec <= 0) return _Promise.resolve();this.fetchIntervalInSec < 30 && (this.fetchIntervalInSec = 30);var e = this._fetch({ useCache: !1 });return this.configurationFetcher.dispatchPeriodically({ handler: this.onConfigurationFetched, periodTimeInSec: this.fetchIntervalInSec }), e;
        } }, { key: "fetchCacheOnly", value: function value() {
          return this._fetch({ useCache: !0, skipNetwork: !0 });
        } }, { key: "fetchWithCacheAndProceed", value: function value() {
          return this._fetch({ useCache: !0 });
        } }, { key: "fetch", value: function value() {
          return this._fetch({ useCache: !1 });
        } }, { key: "_fetchFromPush", value: function value() {
          return this._fetch({ useCache: !1, source: "push" });
        } }, { key: "sendState", value: function value() {
          this._sendState();
        } }, { key: "_sendState", value: function value() {
          this.sendStateDebounceNoCheck.cancel(), this.app_key && (this.disableNetwork ? o.RoxLogger.debug("send state - disabled network") : this.stateSender && this.stateSender.send());
        } }, { key: "_fetch", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};if (this.app_key) {
            if (this.configurationFetcher) return this.disableNetwork && (o.RoxLogger.debug("fetch - disabling network"), e.skipNetwork = !0), this.configurationFetcher.dispatch({ handler: this.onConfigurationFetched, options: e });
          } else o.RoxLogger.warn("no app key");
        } }, { key: "register", value: function value(e, t) {
          o.RoxLogger.debug("Registering container '" + e + "' = " + JSON.stringify(t)), this.classRegisterer.handleContainer(e, t), this.sendStateDebounced();
        } }, { key: "setCustomProperty", value: function value(e, t, r) {
          var n = new c.CustomProperty(e, t, r),
              i = !a.CustomProperties.has(n);a.CustomProperties.set(n), i && this.sendStateDebounced();
        } }, { key: "unfreeze", value: function value(e, t) {
          var r = function r(t) {
            if (!t.name || "string" != typeof e) return !0;var r = t.name.split(".");return 1 === r.length && "" === e || r.slice(0, r.length - 1).join(".") === e;
          };a.Flags.flags.filter(r).forEach(function (e) {
            e.unfreeze(t);
          }), a.Configuration.remoteConfigurations.filter(r).forEach(function (e) {
            e.unfreeze(t);
          });
        } }, { key: "onConfigurationFetched", value: function value(e) {
          try {
            e.fetcherStatus !== v.FetcherStatus.ERROR_FETCH_FAILED && this.startOrStopPushUpdatesListener();
          } catch (e) {
            o.RoxLogger.warn("Cound not start or stop push notification listener. exception: " + e);
          }if (this.configurationFetchedHandler instanceof Function) try {
            return this.configurationFetchedHandler(e);
          } catch (e) {}
        } }, { key: "startOrStopPushUpdatesListener", value: function value() {
          var e = this;!this.disablePushUpdateListener && (0, d.isEnabled)("rox.internal.pushUpdates") ? this.app_key && (this.pushUpdatesListener || (this.pushUpdatesListener = new p.default(this.notificationEndpoint, this.app_key, this.eventSourceImpl), this.pushUpdatesListener.on("changed", function () {
            e._fetchFromPush();
          }))) : this.pushUpdatesListener && (this.pushUpdatesListener.stop(), this.pushUpdatesListener = null);
        } }, { key: "setDynamicCustomPropertyRule", value: function value(e) {
          (0, y.setDynamicPropertyHandler)(e);
        } }, { key: "dynamicApi", get: function get() {
          return this._dynamicApi;
        } }, { key: "appKey", get: function get() {
          return this.app_key;
        } }, { key: "metadata", get: function get() {
          var e = new f.RoxxParser();return { targetGroups: a.TargetGroups.targetGroups.map(function (t) {
              return { name: t.name, isEnabled: e.evaluateExpression(t.condition) };
            }), experiments: a.Experiments.experiments.map(function (t) {
              return { name: t.name, isEnabled: (r = e.evaluateExpression(t.deploymentConfiguration.condition), "true" === r) };var r;
            }), remoteConfigurations: a.Configuration.remoteConfigurations.map(function (e) {
              return { name: e.name, value: e.value };
            }), flags: a.Flags.flags.map(function (e) {
              return { name: e.name, value: e._peek() };
            }) };
        } }]), e;
    }())();
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = (n = r(7)) && n.__esModule ? n : { default: n },
        a = r(22).create(),
        s = function s(e) {
      setTimeout(e, 5);
    },
        u = function u() {},
        c = function () {
      function e(t, r, n, i) {
        if (function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), r = r || {}, this.queue = [], this.writeKey = t, this.host = r.host || o.default.get("ANALYTICS_ENDPOINT"), this.timeout = r.timeout || !1, this.flushAt = Math.max(r.flushAt, 1) || 20, this.flushInterval = r.flushInterval || 1e4, this.flushed = !1, this.version = n.getProperties().lib_version || "0.0", void 0 === n.getProperties().platform) throw new Error("Platform must be provided");this.platform = n.getProperties().platform || "", this.networkOptions = i, Object.defineProperty(this, "enable", { configurable: !1, writable: !1, enumerable: !0, value: "boolean" != typeof r.enable || r.enable });
      }return i(e, [{ key: "identify", value: function value(e, t) {
          return this.enqueue("identify", e, t), this;
        } }, { key: "group", value: function value(e, t) {
          return this.enqueue("group", e, t), this;
        } }, { key: "track", value: function value(e, t) {
          return this.enqueue("track", e, t), this;
        } }, { key: "page", value: function value(e, t) {
          return this.enqueue("page", e, t), this;
        } }, { key: "screen", value: function value(e, t) {
          return this.enqueue("screen", e, t), this;
        } }, { key: "alias", value: function value(e, t) {
          return this.enqueue("alias", e, t), this;
        } }, { key: "enqueue", value: function value(e, t, r) {
          return r = r || u, this.enable ? (t = Object.assign({}, t), this.queue.push({ message: t, callback: r }), this.flushed ? (this.queue.length >= this.flushAt && this.flush(), void (this.flushInterval && !this.timer && (this.timer = setTimeout(this.flush.bind(this), this.flushInterval)))) : (this.flushed = !0, void this.flush())) : s(r);
        } }, { key: "flush", value: function value(e) {
          if (e = e || u, !this.enable) return s(e);if (this.timer && (clearTimeout(this.timer), this.timer = null), !this.queue.length) return s(e);var t = this.queue.splice(0, this.flushAt),
              r = t.map(function (e) {
            return e.callback;
          }),
              n = t.map(function (e) {
            return e.message;
          }),
              i = { analyticsVersion: "1.0.0", sdkVersion: this.version, time: new Date().getTime(), platform: this.platform, rolloutKey: this.writeKey, events: n },
              o = function o(t) {
            r.forEach(function (e) {
              return e(t);
            }), e(t, i);
          },
              c = { method: "POST", url: this.host + "/impression/" + this.writeKey, data: i, httpsAgent: this.networkOptions.httpsAgent, httpAgent: this.networkOptions.httpAgent };this.timeout && (c.timeout = this.timeout), a(c).then(function () {
            return o();
          }).catch(function (e) {
            if (e.response) {
              var t = new Error(e.response.statusText);return o(t);
            }o(e);
          });
        } }]), e;
    }();t.default = c;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        a = (n = r(112)) && n.__esModule ? n : { default: n },
        s = "object" === ("undefined" == typeof window ? "undefined" : o(window)) && window.EventSource ? window.EventSource : a.default,
        u = function () {
      function e(t, r, n) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this);var i = t + (t.endsWith("/") ? "" : "/") + r;this.eventSource = n ? new n(i) : new s(i);
      }return i(e, [{ key: "on", value: function value(e, t) {
          this.eventSource.addEventListener(e, function (e) {
            try {
              t(e);
            } catch (e) {}
          });
        } }, { key: "stop", value: function value() {
          this.eventSource.close();
        } }]), e;
    }();t.default = u;
  }, function (e, t, r) {
    (function (t, n) {
      var i = r(113),
          o = r(25).parse,
          a = r(26),
          s = r(123),
          u = r(52),
          c = r(135),
          f = ["pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "secureProtocol", "servername", "checkServerIdentity"],
          l = [239, 187, 191],
          h = 58,
          p = 32,
          d = 10,
          y = 13;function g(e, r) {
        var a = g.CONNECTING;Object.defineProperty(this, "readyState", { get: function get() {
            return a;
          } }), Object.defineProperty(this, "url", { get: function get() {
            return e;
          } });var c,
            m = this;function b(t) {
          a !== g.CLOSED && (a = g.CONNECTING, P("error", new v("error", { message: t })), S && (e = S, S = null), setTimeout(function () {
            a === g.CONNECTING && x();
          }, m.reconnectInterval));
        }m.reconnectInterval = 1e3;var _ = "";r && r.headers && r.headers["Last-Event-ID"] && (_ = r.headers["Last-Event-ID"], delete r.headers["Last-Event-ID"]);var w = !1,
            E = "",
            O = "",
            S = null;function x() {
          var i = o(e),
              p = "https:" === i.protocol;if (i.headers = { "Cache-Control": "no-cache", Accept: "text/event-stream" }, _ && (i.headers["Last-Event-ID"] = _), r && r.headers) for (var E in r.headers) {
            var O = r.headers[E];O && (i.headers[E] = O);
          }if (i.rejectUnauthorized = !(r && !r.rejectUnauthorized), r && r.proxy) {
            var A = o(r.proxy);p = "https:" === A.protocol, i.protocol = p ? "https:" : "http:", i.path = e, i.headers.Host = i.host, i.hostname = A.hostname, i.host = A.host, i.port = A.port;
          }if (r && r.https) for (var C in r.https) {
            if (-1 !== f.indexOf(C)) {
              var T = r.https[C];void 0 !== T && (i[C] = T);
            }
          }r && void 0 !== r.withCredentials && (i.withCredentials = r.withCredentials), (c = (p ? s : u).request(i, function (r) {
            if (500 === r.statusCode || 502 === r.statusCode || 503 === r.statusCode || 504 === r.statusCode) return P("error", new v("error", { status: r.statusCode, message: r.statusMessage })), void b();if (301 === r.statusCode || 307 === r.statusCode) return r.headers.location ? (307 === r.statusCode && (S = e), e = r.headers.location, void t.nextTick(x)) : void P("error", new v("error", { status: r.statusCode, message: r.statusMessage }));if (200 !== r.statusCode) return P("error", new v("error", { status: r.statusCode, message: r.statusMessage })), m.close();a = g.OPEN, r.on("close", function () {
              r.removeAllListeners("close"), r.removeAllListeners("end"), b();
            }), r.on("end", function () {
              r.removeAllListeners("close"), r.removeAllListeners("end"), b();
            }), P("open", new v("open"));var i,
                o = !0;r.on("data", function (e) {
              i = i ? n.concat([i, e]) : e, o && function (e) {
                return l.every(function (t, r) {
                  return e[r] === t;
                });
              }(i) && (i = i.slice(l.length)), o = !1;for (var t = 0, r = i.length; t < r;) {
                w && (i[t] === d && ++t, w = !1);for (var a, s = -1, u = -1, c = t; s < 0 && c < r; ++c) {
                  (a = i[c]) === h ? u < 0 && (u = c - t) : a === y ? (w = !0, s = c - t) : a === d && (s = c - t);
                }if (s < 0) break;k(i, t, u, s), t += s + 1;
              }t === r ? i = void 0 : t > 0 && (i = i.slice(t));
            });
          })).on("error", function (e) {
            b(e.message);
          }), c.setNoDelay && c.setNoDelay(!0), c.end();
        }function P() {
          m.listeners(arguments[0]).length > 0 && m.emit.apply(m, arguments);
        }function k(t, r, n, o) {
          if (0 === o) {
            if (E.length > 0) {
              var a = O || "message";P(a, new function (e, t) {
                for (var r in Object.defineProperty(this, "type", { writable: !1, value: e, enumerable: !0 }), t) {
                  t.hasOwnProperty(r) && Object.defineProperty(this, r, { writable: !1, value: t[r], enumerable: !0 });
                }
              }(a, { data: E.slice(0, -1), lastEventId: _, origin: i(e) })), E = "";
            }O = void 0;
          } else if (n > 0) {
            var s,
                u = n < 0,
                c = t.slice(r, r + (u ? o : n)).toString();r += s = u ? o : t[r + n + 1] !== p ? n + 1 : n + 2;var f = o - s,
                l = t.slice(r, r + f).toString();if ("data" === c) E += l + "\n";else if ("event" === c) O = l;else if ("id" === c) _ = l;else if ("retry" === c) {
              var h = parseInt(l, 10);Number.isNaN(h) || (m.reconnectInterval = h);
            }
          }
        }x(), this._close = function () {
          a !== g.CLOSED && (a = g.CLOSED, c.abort && c.abort(), c.xhr && c.xhr.abort && c.xhr.abort());
        };
      }function v(e, t) {
        if (Object.defineProperty(this, "type", { writable: !1, value: e, enumerable: !0 }), t) for (var r in t) {
          t.hasOwnProperty(r) && Object.defineProperty(this, r, { writable: !1, value: t[r], enumerable: !0 });
        }
      }e.exports = g, c.inherits(g, a.EventEmitter), g.prototype.constructor = g, ["open", "error", "message"].forEach(function (e) {
        Object.defineProperty(g.prototype, "on" + e, { get: function get() {
            var t = this.listeners(e)[0];return t ? t._listener ? t._listener : t : void 0;
          }, set: function set(t) {
            this.removeAllListeners(e), this.addEventListener(e, t);
          } });
      }), Object.defineProperty(g, "CONNECTING", { enumerable: !0, value: 0 }), Object.defineProperty(g, "OPEN", { enumerable: !0, value: 1 }), Object.defineProperty(g, "CLOSED", { enumerable: !0, value: 2 }), g.prototype.CONNECTING = 0, g.prototype.OPEN = 1, g.prototype.CLOSED = 2, g.prototype.close = function () {
        this._close();
      }, g.prototype.addEventListener = function (e, t) {
        "function" == typeof t && (t._listener = t, this.on(e, t));
      }, g.prototype.dispatchEvent = function (e) {
        if (!e.type) throw new Error("UNSPECIFIED_EVENT_TYPE_ERR");this.emit(e.type, e.detail);
      }, g.prototype.removeEventListener = function (e, t) {
        "function" == typeof t && (t._listener = void 0, this.removeListener(e, t));
      };
    }).call(t, r(2), r(4).Buffer);
  }, function (e, t, r) {
    "use strict";
    var n = r(114);function i(e) {
      return "string" == typeof e && (e = n(e)), e.protocol && e.hostname ? (e.protocol + "//" + e.host).toLowerCase() : "null";
    }i.same = function (e, t) {
      return i(e) === i(t);
    }, e.exports = i;
  }, function (e, t, r) {
    "use strict";
    (function (t) {
      var n = r(115),
          i = r(116),
          o = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
          a = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
          s = new RegExp("^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+");function u(e) {
        return (e || "").toString().replace(s, "");
      }var c = [["#", "hash"], ["?", "query"], function (e) {
        return e.replace("\\", "/");
      }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d+)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]],
          f = { hash: 1, query: 1 };function l(e) {
        var r,
            n = ("undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}).location || {},
            i = {},
            a = _typeof(e = e || n);if ("blob:" === e.protocol) i = new p(unescape(e.pathname), {});else if ("string" === a) for (r in i = new p(e, {}), f) {
          delete i[r];
        } else if ("object" === a) {
          for (r in e) {
            r in f || (i[r] = e[r]);
          }void 0 === i.slashes && (i.slashes = o.test(e.href));
        }return i;
      }function h(e) {
        e = u(e);var t = a.exec(e);return { protocol: t[1] ? t[1].toLowerCase() : "", slashes: !!t[2], rest: t[3] };
      }function p(e, t, r) {
        if (e = u(e), !(this instanceof p)) return new p(e, t, r);var o,
            a,
            s,
            f,
            d,
            y,
            g = c.slice(),
            v = typeof t === "undefined" ? "undefined" : _typeof(t),
            m = this,
            b = 0;for ("object" !== v && "string" !== v && (r = t, t = null), r && "function" != typeof r && (r = i.parse), t = l(t), o = !(a = h(e || "")).protocol && !a.slashes, m.slashes = a.slashes || o && t.slashes, m.protocol = a.protocol || t.protocol || "", e = a.rest, a.slashes || (g[3] = [/(.*)/, "pathname"]); b < g.length; b++) {
          "function" != typeof (f = g[b]) ? (s = f[0], y = f[1], s != s ? m[y] = e : "string" == typeof s ? ~(d = e.indexOf(s)) && ("number" == typeof f[2] ? (m[y] = e.slice(0, d), e = e.slice(d + f[2])) : (m[y] = e.slice(d), e = e.slice(0, d))) : (d = s.exec(e)) && (m[y] = d[1], e = e.slice(0, d.index)), m[y] = m[y] || o && f[3] && t[y] || "", f[4] && (m[y] = m[y].toLowerCase())) : e = f(e);
        }r && (m.query = r(m.query)), o && t.slashes && "/" !== m.pathname.charAt(0) && ("" !== m.pathname || "" !== t.pathname) && (m.pathname = function (e, t) {
          if ("" === e) return t;for (var r = (t || "/").split("/").slice(0, -1).concat(e.split("/")), n = r.length, i = r[n - 1], o = !1, a = 0; n--;) {
            "." === r[n] ? r.splice(n, 1) : ".." === r[n] ? (r.splice(n, 1), a++) : a && (0 === n && (o = !0), r.splice(n, 1), a--);
          }return o && r.unshift(""), "." !== i && ".." !== i || r.push(""), r.join("/");
        }(m.pathname, t.pathname)), n(m.port, m.protocol) || (m.host = m.hostname, m.port = ""), m.username = m.password = "", m.auth && (f = m.auth.split(":"), m.username = f[0] || "", m.password = f[1] || ""), m.origin = m.protocol && m.host && "file:" !== m.protocol ? m.protocol + "//" + m.host : "null", m.href = m.toString();
      }p.prototype = { set: function set(e, t, r) {
          var o = this;switch (e) {case "query":
              "string" == typeof t && t.length && (t = (r || i.parse)(t)), o[e] = t;break;case "port":
              o[e] = t, n(t, o.protocol) ? t && (o.host = o.hostname + ":" + t) : (o.host = o.hostname, o[e] = "");break;case "hostname":
              o[e] = t, o.port && (t += ":" + o.port), o.host = t;break;case "host":
              o[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), o.port = t.pop(), o.hostname = t.join(":")) : (o.hostname = t, o.port = "");break;case "protocol":
              o.protocol = t.toLowerCase(), o.slashes = !r;break;case "pathname":case "hash":
              if (t) {
                var a = "pathname" === e ? "/" : "#";o[e] = t.charAt(0) !== a ? a + t : t;
              } else o[e] = t;break;default:
              o[e] = t;}for (var s = 0; s < c.length; s++) {
            var u = c[s];u[4] && (o[u[1]] = o[u[1]].toLowerCase());
          }return o.origin = o.protocol && o.host && "file:" !== o.protocol ? o.protocol + "//" + o.host : "null", o.href = o.toString(), o;
        }, toString: function toString(e) {
          e && "function" == typeof e || (e = i.stringify);var t,
              r = this,
              n = r.protocol;n && ":" !== n.charAt(n.length - 1) && (n += ":");var o = n + (r.slashes ? "//" : "");return r.username && (o += r.username, r.password && (o += ":" + r.password), o += "@"), o += r.host + r.pathname, (t = "object" == _typeof(r.query) ? e(r.query) : r.query) && (o += "?" !== t.charAt(0) ? "?" + t : t), r.hash && (o += r.hash), o;
        } }, p.extractProtocol = h, p.location = l, p.trimLeft = u, p.qs = i, e.exports = p;
    }).call(t, r(0));
  }, function (e, t, r) {
    "use strict";
    e.exports = function (e, t) {
      if (t = t.split(":")[0], !(e = +e)) return !1;switch (t) {case "http":case "ws":
          return 80 !== e;case "https":case "wss":
          return 443 !== e;case "ftp":
          return 21 !== e;case "gopher":
          return 70 !== e;case "file":
          return !1;}return 0 !== e;
    };
  }, function (e, t, r) {
    "use strict";
    var n = Object.prototype.hasOwnProperty;function i(e) {
      try {
        return decodeURIComponent(e.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }t.stringify = function (e, t) {
      t = t || "";var r,
          i,
          o = [];for (i in "string" != typeof t && (t = "?"), e) {
        if (n.call(e, i)) {
          if ((r = e[i]) || null !== r && void 0 !== r && !isNaN(r) || (r = ""), i = encodeURIComponent(i), r = encodeURIComponent(r), null === i || null === r) continue;o.push(i + "=" + r);
        }
      }return o.length ? t + o.join("&") : "";
    }, t.parse = function (e) {
      for (var t, r = /([^=?&]+)=?([^&]*)/g, n = {}; t = r.exec(e);) {
        var o = i(t[1]),
            a = i(t[2]);null === o || null === a || o in n || (n[o] = a);
      }return n;
    };
  }, function (e, t, r) {
    (function (e, n) {
      var i;!function (o) {
        "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.nodeType, "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.nodeType;var a = "object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) && n;a.global !== a && a.window !== a && a.self;var s,
            u = 2147483647,
            c = 36,
            f = 1,
            l = 26,
            h = 38,
            p = 700,
            d = 72,
            y = 128,
            g = "-",
            v = /^xn--/,
            m = /[^\x20-\x7E]/,
            b = /[\x2E\u3002\uFF0E\uFF61]/g,
            _ = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
            w = c - f,
            E = Math.floor,
            O = String.fromCharCode;function S(e) {
          throw new RangeError(_[e]);
        }function x(e, t) {
          for (var r = e.length, n = []; r--;) {
            n[r] = t(e[r]);
          }return n;
        }function P(e, t) {
          var r = e.split("@"),
              n = "";return r.length > 1 && (n = r[0] + "@", e = r[1]), n + x((e = e.replace(b, ".")).split("."), t).join(".");
        }function k(e) {
          for (var t, r, n = [], i = 0, o = e.length; i < o;) {
            (t = e.charCodeAt(i++)) >= 55296 && t <= 56319 && i < o ? 56320 == (64512 & (r = e.charCodeAt(i++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), i--) : n.push(t);
          }return n;
        }function A(e) {
          return x(e, function (e) {
            var t = "";return e > 65535 && (t += O((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t + O(e);
          }).join("");
        }function C(e, t) {
          return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
        }function T(e, t, r) {
          var n = 0;for (e = r ? E(e / p) : e >> 1, e += E(e / t); e > w * l >> 1; n += c) {
            e = E(e / w);
          }return E(n + (w + 1) * e / (e + h));
        }function R(e) {
          var t,
              r,
              n,
              i,
              o,
              a,
              s,
              h,
              p,
              v,
              m,
              b = [],
              _ = e.length,
              w = 0,
              O = y,
              x = d;for ((r = e.lastIndexOf(g)) < 0 && (r = 0), n = 0; n < r; ++n) {
            e.charCodeAt(n) >= 128 && S("not-basic"), b.push(e.charCodeAt(n));
          }for (i = r > 0 ? r + 1 : 0; i < _;) {
            for (o = w, a = 1, s = c; i >= _ && S("invalid-input"), ((h = (m = e.charCodeAt(i++)) - 48 < 10 ? m - 22 : m - 65 < 26 ? m - 65 : m - 97 < 26 ? m - 97 : c) >= c || h > E((u - w) / a)) && S("overflow"), w += h * a, !(h < (p = s <= x ? f : s >= x + l ? l : s - x)); s += c) {
              a > E(u / (v = c - p)) && S("overflow"), a *= v;
            }x = T(w - o, t = b.length + 1, 0 == o), E(w / t) > u - O && S("overflow"), O += E(w / t), w %= t, b.splice(w++, 0, O);
          }return A(b);
        }function j(e) {
          var t,
              r,
              n,
              i,
              o,
              a,
              s,
              h,
              p,
              v,
              m,
              b,
              _,
              w,
              x,
              P = [];for (b = (e = k(e)).length, t = y, r = 0, o = d, a = 0; a < b; ++a) {
            (m = e[a]) < 128 && P.push(O(m));
          }for (n = i = P.length, i && P.push(g); n < b;) {
            for (s = u, a = 0; a < b; ++a) {
              (m = e[a]) >= t && m < s && (s = m);
            }for (s - t > E((u - r) / (_ = n + 1)) && S("overflow"), r += (s - t) * _, t = s, a = 0; a < b; ++a) {
              if ((m = e[a]) < t && ++r > u && S("overflow"), m == t) {
                for (h = r, p = c; !(h < (v = p <= o ? f : p >= o + l ? l : p - o)); p += c) {
                  x = h - v, w = c - v, P.push(O(C(v + x % w, 0))), h = E(x / w);
                }P.push(O(C(h, 0))), o = T(r, _, n == i), r = 0, ++n;
              }
            }++r, ++t;
          }return P.join("");
        }s = { version: "1.4.1", ucs2: { decode: k, encode: A }, decode: R, encode: j, toASCII: function toASCII(e) {
            return P(e, function (e) {
              return m.test(e) ? "xn--" + j(e) : e;
            });
          }, toUnicode: function toUnicode(e) {
            return P(e, function (e) {
              return v.test(e) ? R(e.slice(4).toLowerCase()) : e;
            });
          } }, void 0 === (i = function () {
          return s;
        }.call(t, r, t, e)) || (e.exports = i);
      }();
    }).call(t, r(118)(e), r(0));
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function get() {
          return e.l;
        } }), Object.defineProperty(e, "id", { enumerable: !0, get: function get() {
          return e.i;
        } }), e.webpackPolyfill = 1), e;
    };
  }, function (e, t, r) {
    "use strict";
    e.exports = { isString: function isString(e) {
        return "string" == typeof e;
      }, isObject: function isObject(e) {
        return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
      }, isNull: function isNull(e) {
        return null === e;
      }, isNullOrUndefined: function isNullOrUndefined(e) {
        return null == e;
      } };
  }, function (e, t, r) {
    "use strict";
    t.decode = t.parse = r(121), t.encode = t.stringify = r(122);
  }, function (e, t, r) {
    "use strict";
    function n(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }e.exports = function (e, t, r, o) {
      t = t || "&", r = r || "=";var a = {};if ("string" != typeof e || 0 === e.length) return a;var s = /\+/g;e = e.split(t);var u = 1e3;o && "number" == typeof o.maxKeys && (u = o.maxKeys);var c = e.length;u > 0 && c > u && (c = u);for (var f = 0; f < c; ++f) {
        var l,
            h,
            p,
            d,
            y = e[f].replace(s, "%20"),
            g = y.indexOf(r);g >= 0 ? (l = y.substr(0, g), h = y.substr(g + 1)) : (l = y, h = ""), p = decodeURIComponent(l), d = decodeURIComponent(h), n(a, p) ? i(a[p]) ? a[p].push(d) : a[p] = [a[p], d] : a[p] = d;
      }return a;
    };var i = Array.isArray || function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };
  }, function (e, t, r) {
    "use strict";
    var n = function n(e) {
      switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "string":
          return e;case "boolean":
          return e ? "true" : "false";case "number":
          return isFinite(e) ? e : "";default:
          return "";}
    };e.exports = function (e, t, r, s) {
      return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? o(a(e), function (a) {
        var s = encodeURIComponent(n(a)) + r;return i(e[a]) ? o(e[a], function (e) {
          return s + encodeURIComponent(n(e));
        }).join(t) : s + encodeURIComponent(n(e[a]));
      }).join(t) : s ? encodeURIComponent(n(s)) + r + encodeURIComponent(n(e)) : "";
    };var i = Array.isArray || function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };function o(e, t) {
      if (e.map) return e.map(t);for (var r = [], n = 0; n < e.length; n++) {
        r.push(t(e[n], n));
      }return r;
    }var a = Object.keys || function (e) {
      var t = [];for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
      }return t;
    };
  }, function (e, t, r) {
    var n = r(52),
        i = r(25),
        o = e.exports;for (var a in n) {
      n.hasOwnProperty(a) && (o[a] = n[a]);
    }function s(e) {
      if ("string" == typeof e && (e = i.parse(e)), e.protocol || (e.protocol = "https:"), "https:" !== e.protocol) throw new Error('Protocol "' + e.protocol + '" not supported. Expected "https:"');return e;
    }o.request = function (e, t) {
      return e = s(e), n.request.call(this, e, t);
    }, o.get = function (e, t) {
      return e = s(e), n.get.call(this, e, t);
    };
  }, function (e, t, r) {
    (function (t, n, i) {
      var o = r(53),
          a = r(5),
          s = r(125),
          u = r(54),
          c = r(132),
          f = s.IncomingMessage,
          l = s.readyStates,
          h = e.exports = function (e) {
        var r,
            n = this;u.Writable.call(n), n._opts = e, n._body = [], n._headers = {}, e.auth && n.setHeader("Authorization", "Basic " + new t(e.auth).toString("base64")), Object.keys(e.headers).forEach(function (t) {
          n.setHeader(t, e.headers[t]);
        });var i = !0;if ("disable-fetch" === e.mode || "timeout" in e) i = !1, r = !0;else if ("prefer-streaming" === e.mode) r = !1;else if ("allow-wrong-content-type" === e.mode) r = !o.overrideMimeType;else {
          if (e.mode && "default" !== e.mode && "prefer-fast" !== e.mode) throw new Error("Invalid value for opts.mode");r = !0;
        }n._mode = function (e, t) {
          return o.fetch && t ? "fetch" : o.mozchunkedarraybuffer ? "moz-chunked-arraybuffer" : o.msstream ? "ms-stream" : o.arraybuffer && e ? "arraybuffer" : o.vbArray && e ? "text:vbarray" : "text";
        }(r, i), n.on("finish", function () {
          n._onFinish();
        });
      };a(h, u.Writable), h.prototype.setHeader = function (e, t) {
        var r = e.toLowerCase();-1 === p.indexOf(r) && (this._headers[r] = { name: e, value: t });
      }, h.prototype.getHeader = function (e) {
        var t = this._headers[e.toLowerCase()];return t ? t.value : null;
      }, h.prototype.removeHeader = function (e) {
        delete this._headers[e.toLowerCase()];
      }, h.prototype._onFinish = function () {
        var e = this;if (!e._destroyed) {
          var r = e._opts,
              a = e._headers,
              s = null;"GET" !== r.method && "HEAD" !== r.method && (s = o.blobConstructor ? new n.Blob(e._body.map(function (e) {
            return c(e);
          }), { type: (a["content-type"] || {}).value || "" }) : t.concat(e._body).toString());var u = [];if (Object.keys(a).forEach(function (e) {
            var t = a[e].name,
                r = a[e].value;Array.isArray(r) ? r.forEach(function (e) {
              u.push([t, e]);
            }) : u.push([t, r]);
          }), "fetch" === e._mode) n.fetch(e._opts.url, { method: e._opts.method, headers: u, body: s || void 0, mode: "cors", credentials: r.withCredentials ? "include" : "same-origin" }).then(function (t) {
            e._fetchResponse = t, e._connect();
          }, function (t) {
            e.emit("error", t);
          });else {
            var f = e._xhr = new n.XMLHttpRequest();try {
              f.open(e._opts.method, e._opts.url, !0);
            } catch (t) {
              return void i.nextTick(function () {
                e.emit("error", t);
              });
            }"responseType" in f && (f.responseType = e._mode.split(":")[0]), "withCredentials" in f && (f.withCredentials = !!r.withCredentials), "text" === e._mode && "overrideMimeType" in f && f.overrideMimeType("text/plain; charset=x-user-defined"), "timeout" in r && (f.timeout = r.timeout, f.ontimeout = function () {
              e.emit("timeout");
            }), u.forEach(function (e) {
              f.setRequestHeader(e[0], e[1]);
            }), e._response = null, f.onreadystatechange = function () {
              switch (f.readyState) {case l.LOADING:case l.DONE:
                  e._onXHRProgress();}
            }, "moz-chunked-arraybuffer" === e._mode && (f.onprogress = function () {
              e._onXHRProgress();
            }), f.onerror = function () {
              e._destroyed || e.emit("error", new Error("XHR error"));
            };try {
              f.send(s);
            } catch (t) {
              return void i.nextTick(function () {
                e.emit("error", t);
              });
            }
          }
        }
      }, h.prototype._onXHRProgress = function () {
        (function (e) {
          try {
            var t = e.status;return null !== t && 0 !== t;
          } catch (e) {
            return !1;
          }
        })(this._xhr) && !this._destroyed && (this._response || this._connect(), this._response._onXHRProgress());
      }, h.prototype._connect = function () {
        var e = this;e._destroyed || (e._response = new f(e._xhr, e._fetchResponse, e._mode), e._response.on("error", function (t) {
          e.emit("error", t);
        }), e.emit("response", e._response));
      }, h.prototype._write = function (e, t, r) {
        this._body.push(e), r();
      }, h.prototype.abort = h.prototype.destroy = function () {
        this._destroyed = !0, this._response && (this._response._destroyed = !0), this._xhr && this._xhr.abort();
      }, h.prototype.end = function (e, t, r) {
        "function" == typeof e && (r = e, e = void 0), u.Writable.prototype.end.call(this, e, t, r);
      }, h.prototype.flushHeaders = function () {}, h.prototype.setTimeout = function () {}, h.prototype.setNoDelay = function () {}, h.prototype.setSocketKeepAlive = function () {};var p = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
    }).call(t, r(4).Buffer, r(0), r(2));
  }, function (e, t, r) {
    (function (e, n, i) {
      var o = r(53),
          a = r(5),
          s = r(54),
          u = t.readyStates = { UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4 },
          c = t.IncomingMessage = function (t, r, i) {
        var a = this;if (s.Readable.call(a), a._mode = i, a.headers = {}, a.rawHeaders = [], a.trailers = {}, a.rawTrailers = [], a.on("end", function () {
          e.nextTick(function () {
            a.emit("close");
          });
        }), "fetch" === i) {
          a._fetchResponse = r, a.url = r.url, a.statusCode = r.status, a.statusMessage = r.statusText, r.headers.forEach(function (e, t) {
            a.headers[t.toLowerCase()] = e, a.rawHeaders.push(t, e);
          });var u = r.body.getReader();!function e() {
            u.read().then(function (t) {
              a._destroyed || (t.done ? a.push(null) : (a.push(new n(t.value)), e()));
            }).catch(function (e) {
              a.emit("error", e);
            });
          }();
        } else if (a._xhr = t, a._pos = 0, a.url = t.responseURL, a.statusCode = t.status, a.statusMessage = t.statusText, t.getAllResponseHeaders().split(/\r?\n/).forEach(function (e) {
          var t = e.match(/^([^:]+):\s*(.*)/);if (t) {
            var r = t[1].toLowerCase();"set-cookie" === r ? (void 0 === a.headers[r] && (a.headers[r] = []), a.headers[r].push(t[2])) : void 0 !== a.headers[r] ? a.headers[r] += ", " + t[2] : a.headers[r] = t[2], a.rawHeaders.push(t[1], t[2]);
          }
        }), a._charset = "x-user-defined", !o.overrideMimeType) {
          var c = a.rawHeaders["mime-type"];if (c) {
            var f = c.match(/;\s*charset=([^;])(;|$)/);f && (a._charset = f[1].toLowerCase());
          }a._charset || (a._charset = "utf-8");
        }
      };a(c, s.Readable), c.prototype._read = function () {}, c.prototype._onXHRProgress = function () {
        var e = this,
            t = e._xhr,
            r = null;switch (e._mode) {case "text:vbarray":
            if (t.readyState !== u.DONE) break;try {
              r = new i.VBArray(t.responseBody).toArray();
            } catch (e) {}if (null !== r) {
              e.push(new n(r));break;
            }case "text":
            try {
              r = t.responseText;
            } catch (t) {
              e._mode = "text:vbarray";break;
            }if (r.length > e._pos) {
              var o = r.substr(e._pos);if ("x-user-defined" === e._charset) {
                for (var a = new n(o.length), s = 0; s < o.length; s++) {
                  a[s] = 255 & o.charCodeAt(s);
                }e.push(a);
              } else e.push(o, e._charset);e._pos = r.length;
            }break;case "arraybuffer":
            if (t.readyState !== u.DONE || !t.response) break;r = t.response, e.push(new n(new Uint8Array(r)));break;case "moz-chunked-arraybuffer":
            if (r = t.response, t.readyState !== u.LOADING || !r) break;e.push(new n(new Uint8Array(r)));break;case "ms-stream":
            if (r = t.response, t.readyState !== u.LOADING) break;var c = new i.MSStreamReader();c.onprogress = function () {
              c.result.byteLength > e._pos && (e.push(new n(new Uint8Array(c.result.slice(e._pos)))), e._pos = c.result.byteLength);
            }, c.onload = function () {
              e.push(null);
            }, c.readAsArrayBuffer(r);}e._xhr.readyState === u.DONE && "ms-stream" !== e._mode && e.push(null);
      };
    }).call(t, r(2), r(4).Buffer, r(0));
  }, function (e, t) {}, function (e, t, r) {
    "use strict";
    var n = r(17).Buffer;e.exports = function () {
      function e() {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.head = null, this.tail = null, this.length = 0;
      }return e.prototype.push = function (e) {
        var t = { data: e, next: null };this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
      }, e.prototype.unshift = function (e) {
        var t = { data: e, next: this.head };0 === this.length && (this.tail = t), this.head = t, ++this.length;
      }, e.prototype.shift = function () {
        if (0 !== this.length) {
          var e = this.head.data;return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
        }
      }, e.prototype.clear = function () {
        this.head = this.tail = null, this.length = 0;
      }, e.prototype.join = function (e) {
        if (0 === this.length) return "";for (var t = this.head, r = "" + t.data; t = t.next;) {
          r += e + t.data;
        }return r;
      }, e.prototype.concat = function (e) {
        if (0 === this.length) return n.alloc(0);if (1 === this.length) return this.head.data;for (var t, r, i = n.allocUnsafe(e >>> 0), o = this.head, a = 0; o;) {
          t = i, r = a, o.data.copy(t, r), a += o.data.length, o = o.next;
        }return i;
      }, e;
    }();
  }, function (e, t, r) {
    var n = Function.prototype.apply;function i(e, t) {
      this._id = e, this._clearFn = t;
    }t.setTimeout = function () {
      return new i(n.call(setTimeout, window, arguments), clearTimeout);
    }, t.setInterval = function () {
      return new i(n.call(setInterval, window, arguments), clearInterval);
    }, t.clearTimeout = t.clearInterval = function (e) {
      e && e.close();
    }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
      this._clearFn.call(window, this._id);
    }, t.enroll = function (e, t) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
    }, t.unenroll = function (e) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
    }, t._unrefActive = t.active = function (e) {
      clearTimeout(e._idleTimeoutId);var t = e._idleTimeout;t >= 0 && (e._idleTimeoutId = setTimeout(function () {
        e._onTimeout && e._onTimeout();
      }, t));
    }, r(129), t.setImmediate = setImmediate, t.clearImmediate = clearImmediate;
  }, function (e, t, r) {
    (function (e, t) {
      !function (e, r) {
        "use strict";
        if (!e.setImmediate) {
          var n,
              i,
              o,
              a,
              s,
              u = 1,
              c = {},
              f = !1,
              l = e.document,
              h = Object.getPrototypeOf && Object.getPrototypeOf(e);h = h && h.setTimeout ? h : e, "[object process]" === {}.toString.call(e.process) ? n = function n(e) {
            t.nextTick(function () {
              d(e);
            });
          } : function () {
            if (e.postMessage && !e.importScripts) {
              var t = !0,
                  r = e.onmessage;return e.onmessage = function () {
                t = !1;
              }, e.postMessage("", "*"), e.onmessage = r, t;
            }
          }() ? (a = "setImmediate$" + Math.random() + "$", s = function s(t) {
            t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && d(+t.data.slice(a.length));
          }, e.addEventListener ? e.addEventListener("message", s, !1) : e.attachEvent("onmessage", s), n = function n(t) {
            e.postMessage(a + t, "*");
          }) : e.MessageChannel ? ((o = new MessageChannel()).port1.onmessage = function (e) {
            d(e.data);
          }, n = function n(e) {
            o.port2.postMessage(e);
          }) : l && "onreadystatechange" in l.createElement("script") ? (i = l.documentElement, n = function n(e) {
            var t = l.createElement("script");t.onreadystatechange = function () {
              d(e), t.onreadystatechange = null, i.removeChild(t), t = null;
            }, i.appendChild(t);
          }) : n = function n(e) {
            setTimeout(d, 0, e);
          }, h.setImmediate = function (e) {
            "function" != typeof e && (e = new Function("" + e));for (var t = new Array(arguments.length - 1), r = 0; r < t.length; r++) {
              t[r] = arguments[r + 1];
            }var i = { callback: e, args: t };return c[u] = i, n(u), u++;
          }, h.clearImmediate = p;
        }function p(e) {
          delete c[e];
        }function d(e) {
          if (f) setTimeout(d, 0, e);else {
            var t = c[e];if (t) {
              f = !0;try {
                !function (e) {
                  var t = e.callback,
                      n = e.args;switch (n.length) {case 0:
                      t();break;case 1:
                      t(n[0]);break;case 2:
                      t(n[0], n[1]);break;case 3:
                      t(n[0], n[1], n[2]);break;default:
                      t.apply(r, n);}
                }(t);
              } finally {
                p(e), f = !1;
              }
            }
          }
        }
      }("undefined" == typeof self ? void 0 === e ? this : e : self);
    }).call(t, r(0), r(2));
  }, function (e, t, r) {
    (function (t) {
      function r(e) {
        try {
          if (!t.localStorage) return !1;
        } catch (e) {
          return !1;
        }var r = t.localStorage[e];return null != r && "true" === String(r).toLowerCase();
      }e.exports = function (e, t) {
        if (r("noDeprecation")) return e;var n = !1;return function () {
          if (!n) {
            if (r("throwDeprecation")) throw new Error(t);r("traceDeprecation") ? console.trace(t) : console.warn(t), n = !0;
          }return e.apply(this, arguments);
        };
      };
    }).call(t, r(0));
  }, function (e, t, r) {
    "use strict";
    e.exports = o;var n = r(60),
        i = r(10);function o(e) {
      if (!(this instanceof o)) return new o(e);n.call(this, e);
    }i.inherits = r(5), i.inherits(o, n), o.prototype._transform = function (e, t, r) {
      r(null, e);
    };
  }, function (e, t, r) {
    var n = r(4).Buffer;e.exports = function (e) {
      if (e instanceof Uint8Array) {
        if (0 === e.byteOffset && e.byteLength === e.buffer.byteLength) return e.buffer;if ("function" == typeof e.buffer.slice) return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
      }if (n.isBuffer(e)) {
        for (var t = new Uint8Array(e.length), r = e.length, i = 0; i < r; i++) {
          t[i] = e[i];
        }return t.buffer;
      }throw new Error("Argument must be a Buffer");
    };
  }, function (e, t) {
    e.exports = function () {
      for (var e = {}, t = 0; t < arguments.length; t++) {
        var n = arguments[t];for (var i in n) {
          r.call(n, i) && (e[i] = n[i]);
        }
      }return e;
    };var r = Object.prototype.hasOwnProperty;
  }, function (e, t) {
    e.exports = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a teapot", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Unordered Collection", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 451: "Unavailable For Legal Reasons", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 509: "Bandwidth Limit Exceeded", 510: "Not Extended", 511: "Network Authentication Required" };
  }, function (e, t, r) {
    (function (e, n) {
      var i = /%[sdj%]/g;t.format = function (e) {
        if (!v(e)) {
          for (var t = [], r = 0; r < arguments.length; r++) {
            t.push(s(arguments[r]));
          }return t.join(" ");
        }r = 1;for (var n = arguments, o = n.length, a = String(e).replace(i, function (e) {
          if ("%%" === e) return "%";if (r >= o) return e;switch (e) {case "%s":
              return String(n[r++]);case "%d":
              return Number(n[r++]);case "%j":
              try {
                return JSON.stringify(n[r++]);
              } catch (e) {
                return "[Circular]";
              }default:
              return e;}
        }), u = n[r]; r < o; u = n[++r]) {
          y(u) || !_(u) ? a += " " + u : a += " " + s(u);
        }return a;
      }, t.deprecate = function (r, i) {
        if (m(e.process)) return function () {
          return t.deprecate(r, i).apply(this, arguments);
        };if (!0 === n.noDeprecation) return r;var o = !1;return function () {
          if (!o) {
            if (n.throwDeprecation) throw new Error(i);n.traceDeprecation ? console.trace(i) : console.error(i), o = !0;
          }return r.apply(this, arguments);
        };
      };var o,
          a = {};function s(e, r) {
        var n = { seen: [], stylize: c };return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), d(r) ? n.showHidden = r : r && t._extend(n, r), m(n.showHidden) && (n.showHidden = !1), m(n.depth) && (n.depth = 2), m(n.colors) && (n.colors = !1), m(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = u), f(n, e, n.depth);
      }function u(e, t) {
        var r = s.styles[t];return r ? "[" + s.colors[r][0] + "m" + e + "[" + s.colors[r][1] + "m" : e;
      }function c(e, t) {
        return e;
      }function f(e, r, n) {
        if (e.customInspect && r && O(r.inspect) && r.inspect !== t.inspect && (!r.constructor || r.constructor.prototype !== r)) {
          var i = r.inspect(n, e);return v(i) || (i = f(e, i, n)), i;
        }var o = function (e, t) {
          if (m(t)) return e.stylize("undefined", "undefined");if (v(t)) {
            var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";return e.stylize(r, "string");
          }return g(t) ? e.stylize("" + t, "number") : d(t) ? e.stylize("" + t, "boolean") : y(t) ? e.stylize("null", "null") : void 0;
        }(e, r);if (o) return o;var a,
            s = Object.keys(r),
            u = (a = {}, s.forEach(function (e, t) {
          a[e] = !0;
        }), a);if (e.showHidden && (s = Object.getOwnPropertyNames(r)), E(r) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0)) return l(r);if (0 === s.length) {
          if (O(r)) {
            var c = r.name ? ": " + r.name : "";return e.stylize("[Function" + c + "]", "special");
          }if (b(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");if (w(r)) return e.stylize(Date.prototype.toString.call(r), "date");if (E(r)) return l(r);
        }var _,
            S = "",
            x = !1,
            P = ["{", "}"];return p(r) && (x = !0, P = ["[", "]"]), O(r) && (S = " [Function" + (r.name ? ": " + r.name : "") + "]"), b(r) && (S = " " + RegExp.prototype.toString.call(r)), w(r) && (S = " " + Date.prototype.toUTCString.call(r)), E(r) && (S = " " + l(r)), 0 !== s.length || x && 0 != r.length ? n < 0 ? b(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(r), _ = x ? function (e, t, r, n, i) {
          for (var o = [], a = 0, s = t.length; a < s; ++a) {
            k(t, String(a)) ? o.push(h(e, t, r, n, String(a), !0)) : o.push("");
          }return i.forEach(function (i) {
            i.match(/^\d+$/) || o.push(h(e, t, r, n, i, !0));
          }), o;
        }(e, r, n, u, s) : s.map(function (t) {
          return h(e, r, n, u, t, x);
        }), e.seen.pop(), function (e, t, r) {
          return e.reduce(function (e, t) {
            return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0) > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1];
        }(_, S, P)) : P[0] + S + P[1];
      }function l(e) {
        return "[" + Error.prototype.toString.call(e) + "]";
      }function h(e, t, r, n, i, o) {
        var a, s, u;if ((u = Object.getOwnPropertyDescriptor(t, i) || { value: t[i] }).get ? s = u.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : u.set && (s = e.stylize("[Setter]", "special")), k(n, i) || (a = "[" + i + "]"), s || (e.seen.indexOf(u.value) < 0 ? (s = y(r) ? f(e, u.value, null) : f(e, u.value, r - 1)).indexOf("\n") > -1 && (s = o ? s.split("\n").map(function (e) {
          return "  " + e;
        }).join("\n").substr(2) : "\n" + s.split("\n").map(function (e) {
          return "   " + e;
        }).join("\n")) : s = e.stylize("[Circular]", "special")), m(a)) {
          if (o && i.match(/^\d+$/)) return s;(a = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"));
        }return a + ": " + s;
      }function p(e) {
        return Array.isArray(e);
      }function d(e) {
        return "boolean" == typeof e;
      }function y(e) {
        return null === e;
      }function g(e) {
        return "number" == typeof e;
      }function v(e) {
        return "string" == typeof e;
      }function m(e) {
        return void 0 === e;
      }function b(e) {
        return _(e) && "[object RegExp]" === S(e);
      }function _(e) {
        return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
      }function w(e) {
        return _(e) && "[object Date]" === S(e);
      }function E(e) {
        return _(e) && ("[object Error]" === S(e) || e instanceof Error);
      }function O(e) {
        return "function" == typeof e;
      }function S(e) {
        return Object.prototype.toString.call(e);
      }function x(e) {
        return e < 10 ? "0" + e.toString(10) : e.toString(10);
      }t.debuglog = function (e) {
        if (m(o) && (o = n.env.NODE_DEBUG || ""), e = e.toUpperCase(), !a[e]) if (new RegExp("\\b" + e + "\\b", "i").test(o)) {
          var r = n.pid;a[e] = function () {
            var n = t.format.apply(t, arguments);console.error("%s %d: %s", e, r, n);
          };
        } else a[e] = function () {};return a[e];
      }, t.inspect = s, s.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, s.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" }, t.isArray = p, t.isBoolean = d, t.isNull = y, t.isNullOrUndefined = function (e) {
        return null == e;
      }, t.isNumber = g, t.isString = v, t.isSymbol = function (e) {
        return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
      }, t.isUndefined = m, t.isRegExp = b, t.isObject = _, t.isDate = w, t.isError = E, t.isFunction = O, t.isPrimitive = function (e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || void 0 === e;
      }, t.isBuffer = r(136);var P = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];function k(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }t.log = function () {
        var e, r;console.log("%s - %s", (r = [x((e = new Date()).getHours()), x(e.getMinutes()), x(e.getSeconds())].join(":"), [e.getDate(), P[e.getMonth()], r].join(" ")), t.format.apply(t, arguments));
      }, t.inherits = r(137), t._extend = function (e, t) {
        if (!t || !_(t)) return e;for (var r = Object.keys(t), n = r.length; n--;) {
          e[r[n]] = t[r[n]];
        }return e;
      };
    }).call(t, r(0), r(2));
  }, function (e, t) {
    e.exports = function (e) {
      return e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8;
    };
  }, function (e, t) {
    "function" == typeof Object.create ? e.exports = function (e, t) {
      e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
    } : e.exports = function (e, t) {
      e.super_ = t;var r = function r() {};r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
    };
  }, function (e, t, r) {
    var n = r(61),
        i = r(139),
        o = r(141),
        a = Math.max,
        s = Math.min;e.exports = function (e, t, r) {
      var u,
          c,
          f,
          l,
          h,
          p,
          d = 0,
          y = !1,
          g = !1,
          v = !0;if ("function" != typeof e) throw new TypeError("Expected a function");function m(t) {
        var r = u,
            n = c;return u = c = void 0, d = t, l = e.apply(n, r);
      }function b(e) {
        var r = e - p;return void 0 === p || r >= t || r < 0 || g && e - d >= f;
      }function _() {
        var e = i();if (b(e)) return w(e);h = setTimeout(_, function (e) {
          var r = t - (e - p);return g ? s(r, f - (e - d)) : r;
        }(e));
      }function w(e) {
        return h = void 0, v && u ? m(e) : (u = c = void 0, l);
      }function E() {
        var e = i(),
            r = b(e);if (u = arguments, c = this, p = e, r) {
          if (void 0 === h) return function (e) {
            return d = e, h = setTimeout(_, t), y ? m(e) : l;
          }(p);if (g) return h = setTimeout(_, t), m(p);
        }return void 0 === h && (h = setTimeout(_, t)), l;
      }return t = o(t) || 0, n(r) && (y = !!r.leading, f = (g = "maxWait" in r) ? a(o(r.maxWait) || 0, t) : f, v = "trailing" in r ? !!r.trailing : v), E.cancel = function () {
        void 0 !== h && clearTimeout(h), d = 0, u = p = c = h = void 0;
      }, E.flush = function () {
        return void 0 === h ? l : w(i());
      }, E;
    };
  }, function (e, t, r) {
    var n = r(62);e.exports = function () {
      return n.Date.now();
    };
  }, function (e, t, r) {
    (function (t) {
      var r = "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.Object === Object && t;e.exports = r;
    }).call(t, r(0));
  }, function (e, t, r) {
    var n = r(61),
        i = r(142),
        o = /^\s+|\s+$/g,
        a = /^[-+]0x[0-9a-f]+$/i,
        s = /^0b[01]+$/i,
        u = /^0o[0-7]+$/i,
        c = parseInt;e.exports = function (e) {
      if ("number" == typeof e) return e;if (i(e)) return NaN;if (n(e)) {
        var t = "function" == typeof e.valueOf ? e.valueOf() : e;e = n(t) ? t + "" : t;
      }if ("string" != typeof e) return 0 === e ? e : +e;e = e.replace(o, "");var r = s.test(e);return r || u.test(e) ? c(e.slice(2), r ? 2 : 8) : a.test(e) ? NaN : +e;
    };
  }, function (e, t, r) {
    var n = r(143),
        i = r(146);e.exports = function (e) {
      return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || i(e) && "[object Symbol]" == n(e);
    };
  }, function (e, t, r) {
    var n = r(63),
        i = r(144),
        o = r(145),
        a = n ? n.toStringTag : void 0;e.exports = function (e) {
      return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : a && a in Object(e) ? i(e) : o(e);
    };
  }, function (e, t, r) {
    var n = r(63),
        i = Object.prototype,
        o = i.hasOwnProperty,
        a = i.toString,
        s = n ? n.toStringTag : void 0;e.exports = function (e) {
      var t = o.call(e, s),
          r = e[s];try {
        e[s] = void 0;var n = !0;
      } catch (e) {}var i = a.call(e);return n && (t ? e[s] = r : delete e[s]), i;
    };
  }, function (e, t) {
    var r = Object.prototype.toString;e.exports = function (e) {
      return r.call(e);
    };
  }, function (e, t) {
    e.exports = function (e) {
      return null != e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
    };
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = r(148),
        a = function (e) {
      if (e && e.__esModule) return e;var t = {};if (null != e) for (var r in e) {
        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      }return t.default = e, t;
    }(r(48)),
        s = r(15),
        u = new ((n = r(50)) && n.__esModule ? n : { default: n }).default(),
        c = function () {
      function e(t, r, n, i, o) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this.appKey = t, this.deviceProperties = r, this.devModeSecret = n, this.networkOptions = i, this.options = o;
      }return i(e, [{ key: "send", value: function value() {
          s.RoxLogger.debug("check for cached state for appKey " + this.appKey);var e = this.buildSetState();try {
            (0, o.sendStateNetwork)(e, this.networkOptions, this.options);
          } catch (e) {
            s.RoxLogger.error("failed to send state", e);
          }
        } }, { key: "sortItemsByName", value: function value(e) {
          return e.sort(function (e, t) {
            return e.name > t.name ? -1 : 1;
          });
        } }, { key: "buildSetState", value: function value() {
          var e = this.deviceProperties.getProperties();return e.app_key = this.appKey, e.feature_flags = this.sortItemsByName(u.featureFlags), e.custom_properties = this.sortItemsByName(u.customProperties), e.remoteVariables = this.sortItemsByName(u.remoteConfiguration), e.devModeSecret = this.devModeSecret, e.md5 = a.generateStateMd5(e), e;
        } }]), e;
    }();t.default = c;
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.sendStateNetwork = function (e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          a = (0, i.buildSetStateS3URL)(e);if (r.selfManagedMode) {
        var s = (0, i.buildSetStateAPIURL)(e);return o((0, n.setStateToAPI)(s.url, s.body, t));
      }return o((0, n.stateFromCDN)(a, t).catch(function () {
        var r = (0, i.buildSetStateAPIURL)(e);return (0, n.setStateToAPI)(r.url, r.body, t);
      }));
    };var n = r(47),
        i = r(46);function o(e) {
      return e.catch(function (e) {
        throw e.message = "Unable to send state!\n" + e.message, e;
      });
    }
  }, function (e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var n,
        i = function () {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }return function (t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    }(),
        o = (n = r(44)) && n.__esModule ? n : { default: n },
        a = function () {
      function e(t) {
        !function (t, r) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this), this._json = t;
      }return i(e, [{ key: "parse", value: function value() {
          if (!this._json || !this._json.length) return [];var e = [];return this._json.forEach(function (t) {
            t && t._id && t.condition && e.push(new o.default(t._id, t.condition));
          }), e;
        } }]), e;
    }();t.default = a;
  }]).default;
});
//# sourceMappingURL=rox-base.min.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(93).setImmediate, __webpack_require__(93).clearImmediate, __webpack_require__(203)(module)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(29);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(56);
var createDesc = __webpack_require__(22);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(36);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(68);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(10);
var has = __webpack_require__(9);
var SRC = __webpack_require__(23)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(35).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(23)('meta');
var isObject = __webpack_require__(1);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(4)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(13);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(18);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(71);
var enumBugKeys = __webpack_require__(49);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(16);
var IObject = __webpack_require__(46);
var toObject = __webpack_require__(13);
var toLength = __webpack_require__(6);
var asc = __webpack_require__(100);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(71);
var hiddenKeys = __webpack_require__(49).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(2);
var dPs = __webpack_require__(99);
var enumBugKeys = __webpack_require__(49);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(43)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(75).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(18);
var redefineAll = __webpack_require__(30);
var meta = __webpack_require__(21);
var forOf = __webpack_require__(57);
var anInstance = __webpack_require__(31);
var isObject = __webpack_require__(1);
var fails = __webpack_require__(4);
var $iterDetect = __webpack_require__(55);
var setToStringTag = __webpack_require__(38);
var inheritIfRequired = __webpack_require__(113);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(10);
var redefine = __webpack_require__(18);
var fails = __webpack_require__(4);
var defined = __webpack_require__(20);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(10);
var uid = __webpack_require__(23);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(32);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(6);
var toAbsoluteIndex = __webpack_require__(24);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(72)('keys');
var uid = __webpack_require__(23);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(13);
var toAbsoluteIndex = __webpack_require__(24);
var toLength = __webpack_require__(6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(25);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(74);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(25);
module.exports = __webpack_require__(35).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(27);
var step = __webpack_require__(76);
var Iterators = __webpack_require__(25);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(77)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(16);
var call = __webpack_require__(80);
var isArrayIter = __webpack_require__(52);
var anObject = __webpack_require__(2);
var toLength = __webpack_require__(6);
var getIterFn = __webpack_require__(53);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(88);
var defined = __webpack_require__(20);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(22);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lscache = __webpack_require__(210);

var _lscache2 = _interopRequireDefault(_lscache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoxCache = function () {
  function RoxCache() {
    _classCallCheck(this, RoxCache);
  }

  _createClass(RoxCache, [{
    key: 'set',
    value: function set(key, value, ttl) {
      _lscache2.default.set(key, value, ttl);
    }
  }, {
    key: 'get',
    value: function get(key) {
      return _lscache2.default.get(key);
    }
  }]);

  return RoxCache;
}();

exports.default = new RoxCache();

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

var _FreezeOptions = __webpack_require__(66);

var _Overrider = __webpack_require__(67);

var Overrider = _interopRequireWildcard(_Overrider);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _RoxBase$Entities = _roxBase2.default.Entities,
    BaseVariant = _RoxBase$Entities.Variant,
    CallContextTypes = _RoxBase$Entities.CallContextTypes;
var RoxxParser = _roxBase2.default.Parsers.RoxxParser;

var Context = _roxBase2.default.Context;
var parser = new RoxxParser();

var RoxVariantBrowser = function (_BaseVariant) {
  _inherits(RoxVariantBrowser, _BaseVariant);

  function RoxVariantBrowser(defaultValue, options) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        freeze = _ref.freeze;

    var name = arguments[3];

    _classCallCheck(this, RoxVariantBrowser);

    var _this = _possibleConstructorReturn(this, (RoxVariantBrowser.__proto__ || Object.getPrototypeOf(RoxVariantBrowser)).call(this, defaultValue, options, name));

    if (freeze && !(0, _FreezeOptions.isFreezeOptionValid)(freeze)) {
      throw new Error('Freeze option is invalid ' + freeze);
    }
    _this._localFreeze = freeze;
    _this._lastResultExplanation = {};
    return _this;
  }

  _createClass(RoxVariantBrowser, [{
    key: 'unfreeze',
    value: function unfreeze() {
      this._frozen = false;
    }
  }, {
    key: 'setLastResultToExperiment',
    value: function setLastResultToExperiment(value, collecor) {
      this._lastResultExplanation = {
        value: value,
        from: 'experiment',
        payload: {
          condition: this.condition,
          expressionEvaluation: collecor
        }
      };
    }
  }, {
    key: 'setLastResultToDefault',
    value: function setLastResultToDefault(value) {
      if (this.condition) {
        this._lastResultExplanation = {
          value: value,
          from: 'exception',
          payload: {
            condition: this.condition
          }
        };
      } else {
        this._lastResultExplanation = {
          value: value,
          from: 'default'
        };
      }
    }
  }, {
    key: 'setLastResultToFreeze',
    value: function setLastResultToFreeze() {
      this._lastResultExplanation = {
        value: this._value,
        from: 'freeze',
        payload: {
          freezedBy: this._lastResultExplanation.from === 'freeze' ? this._lastResultExplanation.payload.freezedBy : this._lastResultExplanation
        }
      };
    }

    // set default, or calculate by condition (experiment), raises impression

  }, {
    key: 'calculateCondition',
    value: function calculateCondition(callContext, context) {
      var calculatedValue = { didUseExperimentToEvaluate: false, value: this._defaultValue };

      var collecor = [];
      if (this.condition) {
        var mergedContext = Context.Actions.getMergedContextWithGlobal(context);
        var newValue = parser.evaluateExpression(this.condition, callContext, mergedContext, collecor);
        newValue = newValue && newValue.toString ? newValue.toString() : newValue;
        if (this._type === (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) && newValue !== undefined) {
          calculatedValue = { didUseExperimentToEvaluate: true, value: newValue };
        }
      }
      callContext.dontInvokeFlagImpression || this._flagImpression(calculatedValue.value, context);
      if (!callContext.dontInvokeFlagImpression) {
        if (calculatedValue.didUseExperimentToEvaluate) {
          this.setLastResultToExperiment(calculatedValue.value, collecor);
        } else {
          this.setLastResultToDefault(calculatedValue.value);
        }
      }
      return calculatedValue;
    }
  }, {
    key: 'getOneTimeValue',
    value: function getOneTimeValue(callContext, context) {
      var valueToReturn = this.calculateCondition(callContext, context);
      callContext.isExperimenting = valueToReturn.didUseExperimentToEvaluate;
      return valueToReturn.value;
    }
  }, {
    key: 'getFreezedValue',
    value: function getFreezedValue(callContext) {
      callContext.isExperimenting = this._isExperimenting;
      if (!callContext.dontInvokeFlagImpression) {
        this.setLastResultToFreeze();
      }
      return this._value;
    }

    // ignoring overrides, considering freeze

  }, {
    key: 'getActiveValue',
    value: function getActiveValue(callContext, context) {
      // freeze=none
      if (this._freeze === _FreezeOptions.freezeOptions.freezeOptionNone) {
        return this.getOneTimeValue(callContext, context);
      }

      // handle freeze!=none
      if (callContext.type === CallContextTypes.frozenOrCalc) {
        if (!this._frozen) {
          return this.getOneTimeValue(callContext, context);
        } else {
          return this.getFreezedValue(callContext);
        }
      }
      if (callContext.type === CallContextTypes.oneTimeCalc) {
        return this.getOneTimeValue(callContext, context);
      }
      if (!callContext.type || callContext.type === CallContextTypes.default) {
        if (!this._frozen) {
          var valueToSet = this.calculateCondition(callContext, context);
          this.setValue(valueToSet);
          this._frozen = true;
          callContext.isExperimenting = this._isExperimenting;
          return this._value;
        } else {
          return this.getFreezedValue(callContext);
        }
      }
      return this.getFreezedValue(callContext);
    }

    // uses overrides

  }, {
    key: 'getInternalValue',
    value: function getInternalValue(callContext, context) {
      var overridenValue = this.overridenValue;
      if (overridenValue) {
        callContext.isExperimenting = true;
        this._lastResultExplanation = {
          value: overridenValue,
          from: 'override'
        };
        return overridenValue;
      }
      return this.getActiveValue(callContext, context);
    }
  }, {
    key: 'getValue',
    value: function getValue(context) {
      return this.getInternalValue({}, context);
    }

    // when freeze, _value and _isExperimenting should be sync, as freezed-value was dependent on if-this-freezed-value-calculated-with-condition

  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      if (this._frozen) return;

      this._isExperimenting = newValue.didUseExperimentToEvaluate;
      this._value = newValue.value;
    }
  }, {
    key: 'explainLastResult',
    value: function explainLastResult() {
      return this._lastResultExplanation;
    }
  }, {
    key: 'peek',
    value: function peek(context) {
      var callContext = { dontInvokeFlagImpression: true, type: CallContextTypes.oneTimeCalc };
      return this.getInternalValue(callContext, context);
    }
  }, {
    key: '_freeze',
    get: function get() {
      return this._localFreeze || (0, _FreezeOptions.getDefaultFreezeOption)() || _FreezeOptions.defaultFreezeOptionForPlatform;
    }
  }, {
    key: 'overrider',
    get: function get() {
      return Overrider;
    }
  }]);

  return RoxVariantBrowser;
}(BaseVariant);

exports.default = RoxVariantBrowser;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultFreezeOption = setDefaultFreezeOption;
exports.getDefaultFreezeOption = getDefaultFreezeOption;
exports.isFreezeOptionValid = isFreezeOptionValid;
var freezeOptions = exports.freezeOptions = {
  freezeOptionNone: 'none',
  freezeOptionUntilLaunch: 'untilLaunch'
};

var _defaultFreezeOptions = null;
function setDefaultFreezeOption(freezeOption) {
  if (isFreezeOptionValid(freezeOption)) {
    _defaultFreezeOptions = freezeOption;
  } else {
    throw new Error('Invalid freeze option: ' + freezeOption);
  }
}

function getDefaultFreezeOption() {
  return _defaultFreezeOptions;
}

function isFreezeOptionValid(freezeOption) {
  return Object.keys(freezeOptions).find(function (key) {
    return freezeOptions[key] === freezeOption;
  });
}

var defaultFreezeOptionForPlatform = exports.defaultFreezeOptionForPlatform = freezeOptions.freezeOptionUntilLaunch;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasOverride = hasOverride;
exports.getOverride = getOverride;
exports.setOverride = setOverride;
exports.clearOverride = clearOverride;
exports.clearAllOverrides = clearAllOverrides;
exports.getOriginalValue = getOriginalValue;

var _RoxCache = __webpack_require__(64);

var _RoxCache2 = _interopRequireDefault(_RoxCache);

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OVERRIDE_CACHE_KEY = 'roxOverrideValues';

var cache = _RoxCache2.default.get(OVERRIDE_CACHE_KEY);
if (!cache) {
  cache = {};
} else {
  cache = JSON.parse(cache);
}

function writeCache(cache) {
  _RoxCache2.default.set(OVERRIDE_CACHE_KEY, JSON.stringify(cache));
}

function hasOverride() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof name === 'undefined') return false;
  return typeof cache[name] !== 'undefined';
}

function getOverride() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (!name) throw new Error('Missing name');
  return cache[name];
}

function setOverride(name, value) {
  if (!name) throw new Error('Missing name');
  cache[name] = value;
  writeCache(cache);
}

function clearOverride(name) {
  if (!name) throw new Error('Missing name');
  cache[name] = undefined;
  delete cache[name];
  writeCache(cache);
}

function clearAllOverrides() {
  cache = {};
  writeCache(cache);
}

function getOriginalValue(name) {
  if (!name) throw new Error('Missing name');
  var flag = _roxBase2.default.Repositories.Flags.flagWithName(name);
  if (!flag) return null;
  return flag._originalValue();
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(43)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(8);
var LIBRARY = __webpack_require__(45);
var $typed = __webpack_require__(44);
var hide = __webpack_require__(10);
var redefineAll = __webpack_require__(30);
var fails = __webpack_require__(4);
var anInstance = __webpack_require__(31);
var toInteger = __webpack_require__(19);
var toLength = __webpack_require__(6);
var toIndex = __webpack_require__(70);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(50);
var setToStringTag = __webpack_require__(38);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(19);
var toLength = __webpack_require__(6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(47)(false);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(2);
var aFunction = __webpack_require__(29);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(32);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(45);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(18);
var hide = __webpack_require__(10);
var has = __webpack_require__(9);
var Iterators = __webpack_require__(25);
var $iterCreate = __webpack_require__(103);
var setToStringTag = __webpack_require__(38);
var getPrototypeOf = __webpack_require__(26);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(13);
var toAbsoluteIndex = __webpack_require__(24);
var toLength = __webpack_require__(6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(39);
var redefineAll = __webpack_require__(30);
var ctx = __webpack_require__(16);
var anInstance = __webpack_require__(31);
var forOf = __webpack_require__(57);
var $iterDefine = __webpack_require__(77);
var step = __webpack_require__(76);
var setSpecies = __webpack_require__(51);
var DESCRIPTORS = __webpack_require__(8);
var fastKey = __webpack_require__(21).fastKey;
var validate = __webpack_require__(28);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(2);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(1);
var anObject = __webpack_require__(2);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(16)(Function.call, __webpack_require__(17).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(33);
var gOPS = __webpack_require__(83);
var pIE = __webpack_require__(56);
var toObject = __webpack_require__(13);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(30);
var getWeak = __webpack_require__(21).getWeak;
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(1);
var anInstance = __webpack_require__(31);
var forOf = __webpack_require__(57);
var createArrayMethod = __webpack_require__(34);
var $has = __webpack_require__(9);
var validate = __webpack_require__(28);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(83);
var anObject = __webpack_require__(2);
var Reflect = __webpack_require__(3).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(20);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(1);
var cof = __webpack_require__(32);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(1);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(33);
var toIObject = __webpack_require__(12);
var isEnum = __webpack_require__(56).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(6);
var repeat = __webpack_require__(87);
var defined = __webpack_require__(20);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

;(function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
});
;(function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
});
;((function(timeout) {
  if (timeout) {
    timeout.close();
  }
}));

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
;(function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
});

;(function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
});

;((function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
}));

// setimmediate attaches itself to the global object
__webpack_require__(202);
;(setImmediate);
;(clearImmediate);


/***/ }),
/* 94 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Variant2 = __webpack_require__(65);

var _Variant3 = _interopRequireDefault(_Variant2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoxFlag = function (_Variant) {
  _inherits(RoxFlag, _Variant);

  function RoxFlag() {
    var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var options = arguments[1];

    _classCallCheck(this, RoxFlag);

    var _this = _possibleConstructorReturn(this, (RoxFlag.__proto__ || Object.getPrototypeOf(RoxFlag)).call(this, defaultValue ? 'true' : 'false', ['false', 'true'], options));

    _this._entityType = 'flag';
    return _this;
  }

  _createClass(RoxFlag, [{
    key: 'isEnabled',
    value: function isEnabled(context) {
      return this._normalizeValue(this.getValue(context));
    }
  }, {
    key: '_getInternalIsEnabled',
    value: function _getInternalIsEnabled(callContext, context) {
      return this._normalizeValue(this.getInternalValue(callContext, context));
    }
  }, {
    key: '_normalizeValue',
    value: function _normalizeValue(value) {
      if (typeof value === 'boolean') return value;
      return value === 'true';
    }
  }]);

  return RoxFlag;
}(_Variant3.default);

exports.default = RoxFlag;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(97);

__webpack_require__(98);

__webpack_require__(104);

__webpack_require__(105);

__webpack_require__(106);

__webpack_require__(107);

__webpack_require__(108);

__webpack_require__(109);

__webpack_require__(110);

__webpack_require__(111);

__webpack_require__(112);

__webpack_require__(114);

__webpack_require__(115);

__webpack_require__(116);

__webpack_require__(117);

__webpack_require__(118);

__webpack_require__(120);

__webpack_require__(121);

__webpack_require__(122);

__webpack_require__(123);

__webpack_require__(124);

__webpack_require__(125);

__webpack_require__(126);

__webpack_require__(127);

__webpack_require__(128);

__webpack_require__(129);

__webpack_require__(130);

__webpack_require__(131);

__webpack_require__(132);

__webpack_require__(133);

__webpack_require__(134);

__webpack_require__(135);

__webpack_require__(136);

__webpack_require__(137);

__webpack_require__(138);

__webpack_require__(139);

__webpack_require__(140);

__webpack_require__(142);

__webpack_require__(143);

__webpack_require__(145);

__webpack_require__(146);

__webpack_require__(147);

__webpack_require__(148);

__webpack_require__(150);

__webpack_require__(151);

__webpack_require__(152);

__webpack_require__(153);

__webpack_require__(154);

__webpack_require__(156);

__webpack_require__(157);

__webpack_require__(158);

__webpack_require__(159);

__webpack_require__(160);

__webpack_require__(161);

__webpack_require__(162);

__webpack_require__(163);

__webpack_require__(164);

__webpack_require__(165);

__webpack_require__(54);

__webpack_require__(166);

__webpack_require__(167);

__webpack_require__(168);

__webpack_require__(169);

__webpack_require__(170);

__webpack_require__(171);

__webpack_require__(172);

__webpack_require__(173);

__webpack_require__(174);

__webpack_require__(175);

__webpack_require__(176);

__webpack_require__(177);

__webpack_require__(178);

__webpack_require__(179);

__webpack_require__(180);

__webpack_require__(182);

__webpack_require__(183);

__webpack_require__(184);

__webpack_require__(185);

__webpack_require__(186);

__webpack_require__(187);

__webpack_require__(188);

__webpack_require__(189);

__webpack_require__(190);

__webpack_require__(191);

__webpack_require__(192);

__webpack_require__(193);

__webpack_require__(194);

__webpack_require__(195);

__webpack_require__(196);

__webpack_require__(197);

__webpack_require__(198);

__webpack_require__(200);

__webpack_require__(201);

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

var _Rox = __webpack_require__(205);

var _Rox2 = _interopRequireDefault(_Rox);

var _RemoteConfiguration = __webpack_require__(221);

var _RemoteConfiguration2 = _interopRequireDefault(_RemoteConfiguration);

var _Variant = __webpack_require__(65);

var _Variant2 = _interopRequireDefault(_Variant);

var _Flag = __webpack_require__(95);

var _Flag2 = _interopRequireDefault(_Flag);

var _DebuggerUI = __webpack_require__(222);

var _Overrider = __webpack_require__(67);

var overrides = _interopRequireWildcard(_Overrider);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Rox2.default.Configuration = _RemoteConfiguration2.default;
_Rox2.default.Variant = _Variant2.default;
_Rox2.default.setContext = _roxBase2.default.Context.Manager.setContext;
_Rox2.default.Flag = _Flag2.default;
_Rox2.default.showOverrides = _DebuggerUI.open;
_Rox2.default.overrides = overrides;

exports.default = _Rox2.default;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(44);
var buffer = __webpack_require__(69);
var anObject = __webpack_require__(2);
var toAbsoluteIndex = __webpack_require__(24);
var toLength = __webpack_require__(6);
var isObject = __webpack_require__(1);
var ArrayBuffer = __webpack_require__(3).ArrayBuffer;
var speciesConstructor = __webpack_require__(73);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(4)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(51)(ARRAY_BUFFER);


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(2);
var getKeys = __webpack_require__(33);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(101);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var isArray = __webpack_require__(102);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(32);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(39);
var descriptor = __webpack_require__(22);
var setToStringTag = __webpack_require__(38);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(79);
var validate = __webpack_require__(28);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(40)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var setPrototypeOf = __webpack_require__(81).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(79);
var validate = __webpack_require__(28);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(40)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(34)(0);
var redefine = __webpack_require__(18);
var meta = __webpack_require__(21);
var assign = __webpack_require__(82);
var weak = __webpack_require__(84);
var isObject = __webpack_require__(1);
var fails = __webpack_require__(4);
var validate = __webpack_require__(28);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(40)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(84);
var validate = __webpack_require__(28);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(40)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(29);
var anObject = __webpack_require__(2);
var rApply = (__webpack_require__(3).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(4)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(39);
var aFunction = __webpack_require__(29);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(1);
var fails = __webpack_require__(4);
var bind = __webpack_require__(119);
var rConstruct = (__webpack_require__(3).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(29);
var isObject = __webpack_require__(1);
var invoke = __webpack_require__(85);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var toPrimitive = __webpack_require__(36);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(4)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(17).f;
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(26);
var has = __webpack_require__(9);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(1);
var anObject = __webpack_require__(2);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(17);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(26);
var anObject = __webpack_require__(2);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(86) });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(2);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(17);
var getPrototypeOf = __webpack_require__(26);
var has = __webpack_require__(9);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(22);
var anObject = __webpack_require__(2);
var isObject = __webpack_require__(1);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(81);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(21).onFreeze;

__webpack_require__(11)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(21).onFreeze;

__webpack_require__(11)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(21).onFreeze;

__webpack_require__(11)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(1);

__webpack_require__(11)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(1);

__webpack_require__(11)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(1);

__webpack_require__(11)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(12);
var $getOwnPropertyDescriptor = __webpack_require__(17).f;

__webpack_require__(11)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(13);
var $getPrototypeOf = __webpack_require__(26);

__webpack_require__(11)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(13);
var $keys = __webpack_require__(33);

__webpack_require__(11)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(11)('getOwnPropertyNames', function () {
  return __webpack_require__(141).f;
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(82) });


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(144) });


/***/ }),
/* 144 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(8) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(24);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(149)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(19);
var defined = __webpack_require__(20);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(87)
});


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(58);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(59)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(58);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(59)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(58);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(59)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(8) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(155)
});


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(2);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(41)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(41)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(41)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(88);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(41)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(16);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(13);
var call = __webpack_require__(80);
var isArrayIter = __webpack_require__(52);
var toLength = __webpack_require__(6);
var createProperty = __webpack_require__(60);
var getIterFn = __webpack_require__(53);

$export($export.S + $export.F * !__webpack_require__(55)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(60);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(4)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(78) });

__webpack_require__(27)('copyWithin');


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(34)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(27)(KEY);


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(34)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(27)(KEY);


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(50) });

__webpack_require__(27)('fill');


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(3).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(89) });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(89);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(90);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(61);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(62);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(181) });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(61);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(4)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(90) });


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(61) });


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(62);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(4)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(62);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(47)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(27)('includes');


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(91)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(91)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(86);
var toIObject = __webpack_require__(12);
var gOPD = __webpack_require__(17);
var createProperty = __webpack_require__(60);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(92);
var userAgent = __webpack_require__(63);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(92);
var userAgent = __webpack_require__(63);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(3);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(63);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(199);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(16);
var invoke = __webpack_require__(85);
var html = __webpack_require__(75);
var cel = __webpack_require__(43);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(32)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(54);
var getKeys = __webpack_require__(33);
var redefine = __webpack_require__(18);
var global = __webpack_require__(3);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(25);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42), __webpack_require__(94)))

/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94), __webpack_require__(42)))

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RoxClient = __webpack_require__(206);

var _RoxClient2 = _interopRequireDefault(_RoxClient);

var _FreezeOptions = __webpack_require__(66);

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoxLogger = _roxBase2.default.RoxLogger,
    configuration = _roxBase2.default.Config,
    Repositories = _roxBase2.default.Repositories;

var Rox = function () {
  function Rox() {
    _classCallCheck(this, Rox);
  }

  _createClass(Rox, [{
    key: 'setup',

    /**
     * Initiate connection with ROX servers for the application identified by the application key. The registered containers will be synced and Rox entities will get the appropriate values.
     * @param {String} appKey application key as appears in ROX dashboard
     * @param {Object} options optional configuration object
     */
    value: function setup(appKey) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      RoxLogger.setVerboseMode(options.debugLevel);
      if (options.configuration) {
        configuration.setActive(options.configuration);
      }
      if (options.freeze) {
        (0, _FreezeOptions.setDefaultFreezeOption)(options.freeze);
      }
      _RoxClient2.default.setKey(appKey);
      _RoxClient2.default.setup(options);
      _RoxClient2.default.sendState();
      if (options.disableNetworkFetch) {
        return _RoxClient2.default.fetchCacheOnly();
      } else {
        return _RoxClient2.default.fetchWithCacheAndProceed();
      }
    }
  }, {
    key: 'fetch',
    value: function fetch() {
      _RoxClient2.default && _RoxClient2.default.fetch();
    }
  }, {
    key: 'setCustomStringProperty',
    value: function setCustomStringProperty(key, value) {
      _RoxClient2.default.setCustomProperty(key, String, value);
    }
  }, {
    key: 'setCustomNumberProperty',
    value: function setCustomNumberProperty(key, value) {
      _RoxClient2.default.setCustomProperty(key, Number, value);
    }
  }, {
    key: 'setCustomBooleanProperty',
    value: function setCustomBooleanProperty(key, value) {
      _RoxClient2.default.setCustomProperty(key, Boolean, value);
    }

    /**
     * Register a container of Rox entities by specifiying a namespace.
     * @param {String} name Container name
     * @param {Object} container Object literal whose properties are Rox entities
     */

  }, {
    key: 'register',
    value: function register(name, container) {
      _RoxClient2.default.register(name, container);
    }
  }, {
    key: 'unfreeze',
    value: function unfreeze(namespace) {
      _RoxClient2.default.unfreeze(namespace);
    }
  }, {
    key: 'setDynamicCustomPropertyRule',
    value: function setDynamicCustomPropertyRule(handler) {
      _RoxClient2.default.setDynamicCustomPropertyRule(handler);
    }
  }, {
    key: 'flags',
    get: function get() {
      return Repositories.Flags.flags;
    }
  }, {
    key: 'dynamicApi',
    get: function get() {
      return _RoxClient2.default.dynamicApi;
    }
  }]);

  return Rox;
}();

var instance = new Rox();
exports.default = instance;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

var _DeviceProperties = __webpack_require__(207);

var _DeviceProperties2 = _interopRequireDefault(_DeviceProperties);

var _DefaultSetupOptions = __webpack_require__(214);

var _DefaultProperties = __webpack_require__(215);

var _RoxCache = __webpack_require__(64);

var _RoxCache2 = _interopRequireDefault(_RoxCache);

var _RoxCrypto = __webpack_require__(216);

var _RoxCrypto2 = _interopRequireDefault(_RoxCrypto);

var _EntitiesProvider = __webpack_require__(220);

var _EntitiesProvider2 = _interopRequireDefault(_EntitiesProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRoxClient = _roxBase2.default.createRoxClient;
exports.default = createRoxClient({
  DeviceProperties: _DeviceProperties2.default,
  getDefaultCustomProperties: _DefaultProperties.getDefaultCustomProperties,
  DefaultSetupOptions: _DefaultSetupOptions.defaultSetupOptions,
  RoxCache: _RoxCache2.default,
  RoxCrypto: _RoxCrypto2.default,
  EntitiesProvider: _EntitiesProvider2.default
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

var _manifest = __webpack_require__(208);

var _manifest2 = _interopRequireDefault(_manifest);

var _RoxCache = __webpack_require__(64);

var _RoxCache2 = _interopRequireDefault(_RoxCache);

var _v = __webpack_require__(211);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DevicePropertiesBase = _roxBase2.default.DeviceProperties;
var api_version = _manifest2.default.api_version,
    lib_version = _manifest2.default.lib_version;

var DeviceProperties = function (_DevicePropertiesBase) {
  _inherits(DeviceProperties, _DevicePropertiesBase);

  function DeviceProperties() {
    _classCallCheck(this, DeviceProperties);

    return _possibleConstructorReturn(this, (DeviceProperties.__proto__ || Object.getPrototypeOf(DeviceProperties)).apply(this, arguments));
  }

  _createClass(DeviceProperties, [{
    key: 'getProperties',
    value: function getProperties() {
      var distinct_id = this.distinct_id,
          app_release = this.app_release,
          platform = this.platform;

      return {
        app_release: app_release,
        api_version: api_version,
        lib_version: lib_version,
        distinct_id: distinct_id,
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        platform: platform,
        customSigningCertificate: '5659eb0ca47811395ef85f0b09be63b7',
        language: navigator.language,
        anticache: +Date.now()
      };
    }
  }]);

  return DeviceProperties;
}(DevicePropertiesBase);

exports.default = new DeviceProperties(_RoxCache2.default, _v2.default);

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = __webpack_require__(209);

exports.default = {
  api_version: _package.ROX.api_version,
  lib_version: _package.version
};

/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = {"name": (("rox-browser"),null),"version":"4.9.5","description": (("Rollout.io ROX JS SDK Client"),null),"author": (("Rollout.io <support@rollout.io>"),null),"license": (("SEE LICENSE IN LICENSE"),null),"homepage": (("https://rollout.io"),null),"repository": (({"type":"git","url":"https://github.com/rollout/roxjs.git"}),null),"bugs": (({"url":"https://github.com/rollout/roxjs/issues","email":"support@rollout.io"}),null),"keywords": ((["feature-flag","feature-flags","remote-configuration","remote-variable","rollout","rox","flags","flag","configuration","remote-control","rollout.io"]),null),"scripts": (({"lint":"eslint src","start":"ROLLOUT_MODE=local webpack-dev-server","test":"BABEL_ENV=test jest --testPathPattern ./src/**","test:watch":"BABEL_ENV=test jest --testPathPattern ./src/** --watch","prebuild":"yarn run clean:dist","build:base":"BABEL_ENV=build webpack --config webpack.config.build.js","build":"yarn run build:base -- --progress --colors","build:stats":"yarn run build:base -- --progress --profile --display-reasons --json > rox-browser-stats.json","postbuild":"jest ./__tests__/**","prepublishOnly":"yarn run test && yarn run build","clean:dist":"rm -rf dist/*"}),null),"ROX":{"api_version":"1.8.0"},"main": (("dist/rox-browser.js"),null),"browser": (("dist/rox-browser.min.js"),null),"files": ((["dist/*.js"]),null),"devDependencies": (({"babel-eslint":"^10.0.3","babel-loader":"^7.1.1","babel-plugin-es6-promise":"^1.1.1","babel-plugin-transform-class-properties":"^6.24.1","babel-polyfill":"^6.26.0","babel-preset-env":"^1.7.0","babel-preset-es2015":"^6.24.1","babel-preset-react":"^6.24.1","crypto-js":"^3.1.9-1","css-loader":"^0.28.4","es6-promise":"^4.2.6","eslint":"^4.3.0","eslint-plugin-react":"^7.1.0","extract-text-webpack-plugin":"^3.0.0","html-webpack-plugin":"^2.29.0","jest":"^22.1.2","jsencrypt-verify":"https://github.com/rollout/jsencrypt-verify.git#e60ccffdb2caff3213ccaa57a4c0b1538a3537cf","lscache":"^1.1.0","react":"^15.6.1","react-dom":"^15.6.1","rox-base":"^4.9.5","rox-embedded-webpack-plugin":"^1.0.2","style-loader":"^0.18.2","uglifyjs-webpack-plugin":"^1.2.3","uuid-browser":"3.1.0","webpack":"^3.5.5","webpack-bundle-analyzer":"^2.8.3","webpack-common-shake":"^1.5.3","webpack-dev-server":"^2.6.0"}),null),"jest": (({"browser":true,"moduleFileExtensions":["js"],"moduleDirectories":["node_modules"],"transformIgnorePatterns":["/node_modules/(?!rox-base).+\\.js$"],"moduleNameMapper":{"rox-base":"<rootDir>/../rox-base/src"}}),null),"gitHead": (("bd4665ce2879ccd155d18d9b0f6ed3b72a27ed17"),null)}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * lscache library
 * Copyright (c) 2011, Pamela Fox
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* jshint undef:true, browser:true, node:true */
/* global define */

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== "undefined" && module.exports) {
        // CommonJS/Node module
        module.exports = factory();
    } else {
        // Browser globals
        root.lscache = factory();
    }
}(this, function () {

  // Prefix for all lscache keys
  var CACHE_PREFIX = 'lscache-';

  // Suffix for the key name on the expiration items in localStorage
  var CACHE_SUFFIX = '-cacheexpiration';

  // expiration date radix (set to Base-36 for most space savings)
  var EXPIRY_RADIX = 10;

  // time resolution in milliseconds
  var expiryMilliseconds = 60 * 1000;
  // ECMAScript max Date (epoch + 1e8 days)
  var maxDate = calculateMaxDate(expiryMilliseconds);

  var cachedStorage;
  var cachedJSON;
  var cacheBucket = '';
  var warnings = false;

  // Determines if localStorage is supported in the browser;
  // result is cached for better performance instead of being run each time.
  // Feature detection is based on how Modernizr does it;
  // it's not straightforward due to FF4 issues.
  // It's not run at parse-time as it takes 200ms in Android.
  function supportsStorage() {
    var key = '__lscachetest__';
    var value = key;

    if (cachedStorage !== undefined) {
      return cachedStorage;
    }

    // some browsers will throw an error if you try to access local storage (e.g. brave browser)
    // hence check is inside a try/catch
    try {
      if (!localStorage) {
        return false;
      }
    } catch (ex) {
      return false;
    }

    try {
      setItem(key, value);
      removeItem(key);
      cachedStorage = true;
    } catch (e) {
        // If we hit the limit, and we don't have an empty localStorage then it means we have support
        if (isOutOfSpace(e) && localStorage.length) {
            cachedStorage = true; // just maxed it out and even the set test failed.
        } else {
            cachedStorage = false;
        }
    }
    return cachedStorage;
  }

  // Check to set if the error is us dealing with being out of space
  function isOutOfSpace(e) {
    return e && (
      e.name === 'QUOTA_EXCEEDED_ERR' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      e.name === 'QuotaExceededError'
    );
  }

  // Determines if native JSON (de-)serialization is supported in the browser.
  function supportsJSON() {
    /*jshint eqnull:true */
    if (cachedJSON === undefined) {
      cachedJSON = (window.JSON != null);
    }
    return cachedJSON;
  }

  /**
   * Returns a string where all RegExp special characters are escaped with a \.
   * @param {String} text
   * @return {string}
   */
  function escapeRegExpSpecialCharacters(text) {
    return text.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
  }

  /**
   * Returns the full string for the localStorage expiration item.
   * @param {String} key
   * @return {string}
   */
  function expirationKey(key) {
    return key + CACHE_SUFFIX;
  }

  /**
   * Returns the number of minutes since the epoch.
   * @return {number}
   */
  function currentTime() {
    return Math.floor((new Date().getTime())/expiryMilliseconds);
  }

  /**
   * Wrapper functions for localStorage methods
   */

  function getItem(key) {
    return localStorage.getItem(CACHE_PREFIX + cacheBucket + key);
  }

  function setItem(key, value) {
    // Fix for iPad issue - sometimes throws QUOTA_EXCEEDED_ERR on setItem.
    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
    localStorage.setItem(CACHE_PREFIX + cacheBucket + key, value);
  }

  function removeItem(key) {
    localStorage.removeItem(CACHE_PREFIX + cacheBucket + key);
  }

  function eachKey(fn) {
    var prefixRegExp = new RegExp('^' + CACHE_PREFIX + escapeRegExpSpecialCharacters(cacheBucket) + '(.*)');
    // Loop in reverse as removing items will change indices of tail
    for (var i = localStorage.length-1; i >= 0 ; --i) {
      var key = localStorage.key(i);
      key = key && key.match(prefixRegExp);
      key = key && key[1];
      if (key && key.indexOf(CACHE_SUFFIX) < 0) {
        fn(key, expirationKey(key));
      }
    }
  }

  function flushItem(key) {
    var exprKey = expirationKey(key);

    removeItem(key);
    removeItem(exprKey);
  }

  function flushExpiredItem(key) {
    var exprKey = expirationKey(key);
    var expr = getItem(exprKey);

    if (expr) {
      var expirationTime = parseInt(expr, EXPIRY_RADIX);

      // Check if we should actually kick item out of storage
      if (currentTime() >= expirationTime) {
        removeItem(key);
        removeItem(exprKey);
        return true;
      }
    }
  }

  function warn(message, err) {
    if (!warnings) return;
    if (!('console' in window) || typeof window.console.warn !== 'function') return;
    window.console.warn("lscache - " + message);
    if (err) window.console.warn("lscache - The error was: " + err.message);
  }

  function calculateMaxDate(expiryMilliseconds) {
    return Math.floor(8.64e15/expiryMilliseconds);
  }

  var lscache = {
    /**
     * Stores the value in localStorage. Expires after specified number of minutes.
     * @param {string} key
     * @param {Object|string} value
     * @param {number} time
     * @return true if the value was inserted successfully
     */
    set: function(key, value, time) {
      if (!supportsStorage()) return false;

      // If we don't get a string value, try to stringify
      // In future, localStorage may properly support storing non-strings
      // and this can be removed.

      if (!supportsJSON()) return false;
      try {
        value = JSON.stringify(value);
      } catch (e) {
        // Sometimes we can't stringify due to circular refs
        // in complex objects, so we won't bother storing then.
        return false;
      }

      try {
        setItem(key, value);
      } catch (e) {
        if (isOutOfSpace(e)) {
          // If we exceeded the quota, then we will sort
          // by the expire time, and then remove the N oldest
          var storedKeys = [];
          var storedKey;
          eachKey(function(key, exprKey) {
            var expiration = getItem(exprKey);
            if (expiration) {
              expiration = parseInt(expiration, EXPIRY_RADIX);
            } else {
              // TODO: Store date added for non-expiring items for smarter removal
              expiration = maxDate;
            }
            storedKeys.push({
              key: key,
              size: (getItem(key) || '').length,
              expiration: expiration
            });
          });
          // Sorts the keys with oldest expiration time last
          storedKeys.sort(function(a, b) { return (b.expiration-a.expiration); });

          var targetSize = (value||'').length;
          while (storedKeys.length && targetSize > 0) {
            storedKey = storedKeys.pop();
            warn("Cache is full, removing item with key '" + key + "'");
            flushItem(storedKey.key);
            targetSize -= storedKey.size;
          }
          try {
            setItem(key, value);
          } catch (e) {
            // value may be larger than total quota
            warn("Could not add item with key '" + key + "', perhaps it's too big?", e);
            return false;
          }
        } else {
          // If it was some other error, just give up.
          warn("Could not add item with key '" + key + "'", e);
          return false;
        }
      }

      // If a time is specified, store expiration info in localStorage
      if (time) {
        setItem(expirationKey(key), (currentTime() + time).toString(EXPIRY_RADIX));
      } else {
        // In case they previously set a time, remove that info from localStorage.
        removeItem(expirationKey(key));
      }
      return true;
    },

    /**
     * Retrieves specified value from localStorage, if not expired.
     * @param {string} key
     * @return {string|Object}
     */
    get: function(key) {
      if (!supportsStorage()) return null;

      // Return the de-serialized item if not expired
      if (flushExpiredItem(key)) { return null; }

      // Tries to de-serialize stored value if its an object, and returns the normal value otherwise.
      var value = getItem(key);
      if (!value || !supportsJSON()) {
        return value;
      }

      try {
        // We can't tell if its JSON or a string, so we try to parse
        return JSON.parse(value);
      } catch (e) {
        // If we can't parse, it's probably because it isn't an object
        return value;
      }
    },

    /**
     * Removes a value from localStorage.
     * Equivalent to 'delete' in memcache, but that's a keyword in JS.
     * @param {string} key
     */
    remove: function(key) {
      if (!supportsStorage()) return;

      flushItem(key);
    },

    /**
     * Returns whether local storage is supported.
     * Currently exposed for testing purposes.
     * @return {boolean}
     */
    supported: function() {
      return supportsStorage();
    },

    /**
     * Flushes all lscache items and expiry markers without affecting rest of localStorage
     */
    flush: function() {
      if (!supportsStorage()) return;

      eachKey(function(key) {
        flushItem(key);
      });
    },

    /**
     * Flushes expired lscache items and expiry markers without affecting rest of localStorage
     */
    flushExpired: function() {
      if (!supportsStorage()) return;

      eachKey(function(key) {
        flushExpiredItem(key);
      });
    },

    /**
     * Appends CACHE_PREFIX so lscache will partition data in to different buckets.
     * @param {string} bucket
     */
    setBucket: function(bucket) {
      cacheBucket = bucket;
    },

    /**
     * Resets the string being appended to CACHE_PREFIX so lscache will use the default storage behavior.
     */
    resetBucket: function() {
      cacheBucket = '';
    },

    /**
     * @returns {number} The currently set number of milliseconds each time unit represents in
     *   the set() function's "time" argument.
     */
    getExpiryMilliseconds: function() {
      return expiryMilliseconds;
    },

    /**
     * Sets the number of milliseconds each time unit represents in the set() function's
     *   "time" argument.
     * Sample values:
     *  1: each time unit = 1 millisecond
     *  1000: each time unit = 1 second
     *  60000: each time unit = 1 minute (Default value)
     *  360000: each time unit = 1 hour
     * @param {number} milliseconds
     */
    setExpiryMilliseconds: function(milliseconds) {
        expiryMilliseconds = milliseconds;
        maxDate = calculateMaxDate(expiryMilliseconds);
    },

    /**
     * Sets whether to display warnings when an item is removed from the cache or not.
     */
    enableWarnings: function(enabled) {
      warnings = enabled;
    }
  };

  // Return the module
  return lscache;
}));


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(212);
var bytesToUuid = __webpack_require__(213);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = typeof global !== 'undefined' && (global.crypto || global.msCrypto); // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)))

/***/ }),
/* 213 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultSetupOptions = exports.defaultSetupOptions = {
  distinctId: null,
  version: '0',
  configurationFetchedHandler: function configurationFetchedHandler() {},
  impressionHandler: null,
  devModeSecret: null,
  platform: 'Browser',
  analytics: {
    flushAt: 1,
    flushInterval: 60000
  }
};

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultCustomProperties = getDefaultCustomProperties;

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomProperty = _roxBase2.default.Entities.CustomProperty;
function getDefaultCustomProperties(deviceProps, appKey) {
  var _props = deviceProps.getProperties();
  return [new CustomProperty('rox.app_release', String, _props.app_release), new CustomProperty('rox.platform', String, _props.platform), new CustomProperty('rox.screen_width', Number, _props.screen_width), new CustomProperty('rox.screen_height', Number, _props.screen_height), new CustomProperty('rox.language', String, _props.language), new CustomProperty('rox.distinct_id', String, _props.distinct_id), new CustomProperty('rox.internal.realPlatform', String, 'Browser'), new CustomProperty('rox.internal.customPlatform', String, _props.platform), new CustomProperty('rox.internal.appKey', String, appKey), new CustomProperty('rox.internal.distinct_id', String, _props.distinct_id)];
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsencryptVerify = __webpack_require__(217);

var _jsencryptVerify2 = _interopRequireDefault(_jsencryptVerify);

var _sha = __webpack_require__(218);

var _sha2 = _interopRequireDefault(_sha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoxCrypto = function () {
  function RoxCrypto() {
    _classCallCheck(this, RoxCrypto);

    this.verifier = new _jsencryptVerify2.default();
    this.verifier.getKey().setPublic('eaf0631114bc9a4150c475c1e5626ecd9c6ac0aa12cfd84ff6ed6db5c9341e8a7eebf05393ffb8c9d0f2e97062f0ff7cc34f9c33209dceb45cb81d6adeda19fbc26b7e6c8f9b6d2ffd90aae6aa4a63023d7e3f09c1e2584469ddbb96894c0aecf9a6eaea8b6d3d93bab9d4831d7ead3f3adecffc19a9f8b04db361788ccb0f6316545189154c098faa09f0c6e5a82596a7fce18d8ed8fd38683c78e70e7dccb10b818347f61a8a5fa486de08fc71deb125d5ba4a979edb1b7609d7285917ebcd93b853dcde977c972fba37a3925a96cd57c526115672827c564f7bf1053d935af15ec5b5b9d8a38563dd702248edf883c430f2413cf0e237d2769eeb6dbdf329', '10001');
  }

  _createClass(RoxCrypto, [{
    key: 'verify',
    value: function verify(payload, signature) {
      return this.verifier.verify(payload, signature, _sha2.default);
    }
  }]);

  return RoxCrypto;
}();

var instance = new RoxCrypto();

exports.default = instance;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.JSEncrypt = {})));
}(this, (function (exports) { 'use strict';

var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
    return BI_RM.charAt(n);
}
//#region BIT_OPERATIONS
// (public) this & a
function op_and(x, y) {
    return x & y;
}
// (public) this | a
function op_or(x, y) {
    return x | y;
}
// (public) this ^ a
function op_xor(x, y) {
    return x ^ y;
}
// (public) this & ~a
function op_andnot(x, y) {
    return x & ~y;
}
// return number of 1 bits in x
function cbit(x) {
    var r = 0;
    while (x != 0) {
        x &= x - 1;
        ++r;
    }
    return r;
}
//#endregion BIT_OPERATIONS

var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
// convert a base64 string to hex
function b64tohex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64pad) {
            break;
        }
        var v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue;
        }
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1) {
        ret += int2char(slop << 2);
    }
    return ret;
}

// Copyright (c) 2005  Tom Wu
// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);
/* Unnecessary for rox
//#region
const lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
const lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
//#endregion
*/
// (public) Constructor
var BigInteger = /** @class */ (function () {
    function BigInteger(a, b, c) {
        if (a != null) {
            if ("number" == typeof a) {
                /* Unnecessary for rox
                this.fromNumber(a, b, c);
                */
            }
            else if (b == null && "string" != typeof a) {
                this.fromString(a, 256);
            }
            else {
                this.fromString(a, b);
            }
        }
    }
    //#region PUBLIC
    // BigInteger.prototype.toString = bnToString;
    // (public) return string representation in given radix
    BigInteger.prototype.toString = function (b) {
        if (this.s < 0) {
            return "-" + this.negate().toString(b);
        }
        var k;
        if (b == 16) {
            k = 4;
        }
        else if (b == 8) {
            k = 3;
        }
        else if (b == 2) {
            k = 1;
        }
        else if (b == 32) {
            k = 5;
        }
        else if (b == 4) {
            k = 2;
        }
        else {
            return this.toRadix(b);
        }
        var km = (1 << k) - 1;
        var d;
        var m = false;
        var r = "";
        var i = this.t;
        var p = this.DB - (i * this.DB) % k;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
                m = true;
                r = int2char(d);
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this[i] & ((1 << p) - 1)) << (k - p);
                    d |= this[--i] >> (p += this.DB - k);
                }
                else {
                    d = (this[i] >> (p -= k)) & km;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                }
                if (d > 0) {
                    m = true;
                }
                if (m) {
                    r += int2char(d);
                }
            }
        }
        return m ? r : "0";
    };
    // BigInteger.prototype.negate = bnNegate;
    // (public) -this
    BigInteger.prototype.negate = function () {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
    };
    // BigInteger.prototype.abs = bnAbs;
    // (public) |this|
    BigInteger.prototype.abs = function () {
        return (this.s < 0) ? this.negate() : this;
    };
    // BigInteger.prototype.compareTo = bnCompareTo;
    // (public) return + if this > a, - if this < a, 0 if equal
    BigInteger.prototype.compareTo = function (a) {
        var r = this.s - a.s;
        if (r != 0) {
            return r;
        }
        var i = this.t;
        r = i - a.t;
        if (r != 0) {
            return (this.s < 0) ? -r : r;
        }
        while (--i >= 0) {
            if ((r = this[i] - a[i]) != 0) {
                return r;
            }
        }
        return 0;
    };
    // BigInteger.prototype.bitLength = bnBitLength;
    // (public) return the number of bits in "this"
    BigInteger.prototype.bitLength = function () {
        if (this.t <= 0) {
            return 0;
        }
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
    };
    // BigInteger.prototype.mod = bnMod;
    // (public) this mod a
    BigInteger.prototype.mod = function (a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            a.subTo(r, r);
        }
        return r;
    };
    // BigInteger.prototype.modPowInt = bnModPowInt;
    // (public) this^e % m, 0 <= e < 2^32
    BigInteger.prototype.modPowInt = function (e, m) {
        var z;
        if (e < 256 || m.isEven()) {
            z = new Classic(m);
        }
        else {
            z = new Montgomery(m);
        }
        return this.exp(e, z);
    };
    // BigInteger.prototype.clone = bnClone;
    // (public)
    BigInteger.prototype.clone = function () {
        var r = nbi();
        this.copyTo(r);
        return r;
    };
    // BigInteger.prototype.intValue = bnIntValue;
    // (public) return value as integer
    BigInteger.prototype.intValue = function () {
        if (this.s < 0) {
            if (this.t == 1) {
                return this[0] - this.DV;
            }
            else if (this.t == 0) {
                return -1;
            }
        }
        else if (this.t == 1) {
            return this[0];
        }
        else if (this.t == 0) {
            return 0;
        }
        // assumes 16 < DB < 32
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
    };
    // BigInteger.prototype.byteValue = bnByteValue;
    // (public) return value as byte
    BigInteger.prototype.byteValue = function () {
        return (this.t == 0) ? this.s : (this[0] << 24) >> 24;
    };
    // BigInteger.prototype.shortValue = bnShortValue;
    // (public) return value as short (assumes DB>=16)
    BigInteger.prototype.shortValue = function () {
        return (this.t == 0) ? this.s : (this[0] << 16) >> 16;
    };
    // BigInteger.prototype.signum = bnSigNum;
    // (public) 0 if this == 0, 1 if this > 0
    BigInteger.prototype.signum = function () {
        if (this.s < 0) {
            return -1;
        }
        else if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
            return 0;
        }
        else {
            return 1;
        }
    };
    // BigInteger.prototype.toByteArray = bnToByteArray;
    // (public) convert to bigendian byte array
    /* Unnecessary for rox
    public toByteArray():number[] {
        let i = this.t;
        const r = [];
        r[0] = this.s;
        let p = this.DB - (i * this.DB) % 8;
        let d;
        let k = 0;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) {
                r[k++] = d | (this.s << (this.DB - p));
            }
            while (i >= 0) {
                if (p < 8) {
                    d = (this[i] & ((1 << p) - 1)) << (8 - p);
                    d |= this[--i] >> (p += this.DB - 8);
                } else {
                    d = (this[i] >> (p -= 8)) & 0xff;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                }
                if ((d & 0x80) != 0) {
                    d |= -256;
                }
                if (k == 0 && (this.s & 0x80) != (d & 0x80)) {
                    ++k;
                }
                if (k > 0 || d != this.s) {
                    r[k++] = d;
                }
            }
        }
        return r;
    }
    */
    // BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.equals = function (a) {
        return (this.compareTo(a) == 0);
    };
    // BigInteger.prototype.min = bnMin;
    BigInteger.prototype.min = function (a) {
        return (this.compareTo(a) < 0) ? this : a;
    };
    // BigInteger.prototype.max = bnMax;
    BigInteger.prototype.max = function (a) {
        return (this.compareTo(a) > 0) ? this : a;
    };
    // BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.and = function (a) {
        var r = nbi();
        this.bitwiseTo(a, op_and, r);
        return r;
    };
    // BigInteger.prototype.or = bnOr;
    BigInteger.prototype.or = function (a) {
        var r = nbi();
        this.bitwiseTo(a, op_or, r);
        return r;
    };
    // BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.xor = function (a) {
        var r = nbi();
        this.bitwiseTo(a, op_xor, r);
        return r;
    };
    // BigInteger.prototype.andNot = bnAndNot;
    /* Unnecessary for rox
    protected andNot(a:BigInteger):BigInteger {
        const r = nbi();
        this.bitwiseTo(a, op_andnot, r);
        return r;
    }
    */
    // BigInteger.prototype.not = bnNot;
    // (public) ~this
    /* Unnecessary for rox
    protected not():BigInteger {
        const r = nbi();
        for (let i = 0; i < this.t; ++i) {
            r[i] = this.DM & ~this[i];
        }
        r.t = this.t;
        r.s = ~this.s;
        return r;
    }
    */
    // BigInteger.prototype.shiftLeft = bnShiftLeft;
    // (public) this << n
    BigInteger.prototype.shiftLeft = function (n) {
        var r = nbi();
        if (n < 0) {
            this.rShiftTo(-n, r);
        }
        else {
            this.lShiftTo(n, r);
        }
        return r;
    };
    // BigInteger.prototype.shiftRight = bnShiftRight;
    // (public) this >> n
    /* Unnecessary for rox
    protected shiftRight(n:number) {
        const r = nbi();
        if (n < 0) {
            this.lShiftTo(-n, r);
        } else {
            this.rShiftTo(n, r);
        }
        return r;
    }
    */
    // BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    // (public) returns index of lowest 1-bit (or -1 if none)
    /* Unnecessary for rox
    protected getLowestSetBit() {
        for (let i = 0; i < this.t; ++i) {
            if (this[i] != 0) {
                return i * this.DB + lbit(this[i]);
            }
        }
        if (this.s < 0) {
            return this.t * this.DB;
        }
        return -1;
    }
    */
    // BigInteger.prototype.bitCount = bnBitCount;
    // (public) return number of set bits
    BigInteger.prototype.bitCount = function () {
        var r = 0;
        var x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i) {
            r += cbit(this[i] ^ x);
        }
        return r;
    };
    // BigInteger.prototype.testBit = bnTestBit;
    // (public) true iff nth bit is set
    BigInteger.prototype.testBit = function (n) {
        var j = Math.floor(n / this.DB);
        if (j >= this.t) {
            return (this.s != 0);
        }
        return ((this[j] & (1 << (n % this.DB))) != 0);
    };
    // BigInteger.prototype.setBit = bnSetBit;
    // (public) this | (1<<n)
    BigInteger.prototype.setBit = function (n) {
        return this.changeBit(n, op_or);
    };
    // BigInteger.prototype.clearBit = bnClearBit;
    // (public) this & ~(1<<n)
    BigInteger.prototype.clearBit = function (n) {
        return this.changeBit(n, op_andnot);
    };
    // BigInteger.prototype.flipBit = bnFlipBit;
    // (public) this ^ (1<<n)
    BigInteger.prototype.flipBit = function (n) {
        return this.changeBit(n, op_xor);
    };
    // BigInteger.prototype.add = bnAdd;
    // (public) this + a
    /* Unnecessary for rox
    public add(a:BigInteger) {
        const r = nbi();
        this.addTo(a, r);
        return r;
    }
    */
    // BigInteger.prototype.subtract = bnSubtract;
    // (public) this - a
    BigInteger.prototype.subtract = function (a) {
        var r = nbi();
        this.subTo(a, r);
        return r;
    };
    // BigInteger.prototype.multiply = bnMultiply;
    // (public) this * a
    BigInteger.prototype.multiply = function (a) {
        var r = nbi();
        this.multiplyTo(a, r);
        return r;
    };
    // BigInteger.prototype.divide = bnDivide;
    // (public) this / a
    BigInteger.prototype.divide = function (a) {
        var r = nbi();
        this.divRemTo(a, r, null);
        return r;
    };
    // BigInteger.prototype.remainder = bnRemainder;
    // (public) this % a
    BigInteger.prototype.remainder = function (a) {
        var r = nbi();
        this.divRemTo(a, null, r);
        return r;
    };
    // BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    // (public) [this/a,this%a]
    BigInteger.prototype.divideAndRemainder = function (a) {
        var q = nbi();
        var r = nbi();
        this.divRemTo(a, q, r);
        return [q, r];
    };
    // BigInteger.prototype.modPow = bnModPow;
    // (public) this^e % m (HAC 14.85)
    /* Unnecessary for rox
    public modPow(e:BigInteger, m:BigInteger) {
        let i = e.bitLength();
        let k;
        let r = nbv(1);
        let z:IReduction;
        if (i <= 0) {
            return r;
        } else if (i < 18) {
            k = 1;
        } else if (i < 48) {
            k = 3;
        } else if (i < 144) {
            k = 4;
        } else if (i < 768) {
            k = 5;
        } else {
            k = 6;
        }
        if (i < 8) {
            z = new Classic(m);
        } else if (m.isEven()) {
            z = new Barrett(m);
        } else {
            z = new Montgomery(m);
        }

        // precomputation
        const g = [];
        let n = 3;
        const k1 = k - 1;
        const km = (1 << k) - 1;
        g[1] = z.convert(this);
        if (k > 1) {
            const g2 = nbi();
            z.sqrTo(g[1], g2);
            while (n <= km) {
                g[n] = nbi();
                z.mulTo(g2, g[n - 2], g[n]);
                n += 2;
            }
        }

        let j = e.t - 1;
        let w;
        let is1 = true;
        let r2 = nbi();
        let t;
        i = nbits(e[j]) - 1;
        while (j >= 0) {
            if (i >= k1) {
                w = (e[j] >> (i - k1)) & km;
            } else {
                w = (e[j] & ((1 << (i + 1)) - 1)) << (k1 - i);
                if (j > 0) {
                    w |= e[j - 1] >> (this.DB + i - k1);
                }
            }

            n = k;
            while ((w & 1) == 0) {
                w >>= 1;
                --n;
            }
            if ((i -= n) < 0) {
                i += this.DB;
                --j;
            }
            if (is1) {	// ret == 1, don't bother squaring or multiplying it
                g[w].copyTo(r);
                is1 = false;
            } else {
                while (n > 1) {
                    z.sqrTo(r, r2);
                    z.sqrTo(r2, r);
                    n -= 2;
                }
                if (n > 0) {
                    z.sqrTo(r, r2);
                } else {
                    t = r;
                    r = r2;
                    r2 = t;
                }
                z.mulTo(r2, g[w], r);
            }

            while (j >= 0 && (e[j] & (1 << i)) == 0) {
                z.sqrTo(r, r2);
                t = r;
                r = r2;
                r2 = t;
                if (--i < 0) {
                    i = this.DB - 1;
                    --j;
                }
            }
        }
        return z.revert(r);
    }
    */
    // BigInteger.prototype.modInverse = bnModInverse;
    // (public) 1/this % m (HAC 14.61)
    /* Unnecessary for rox
    public modInverse(m:BigInteger) {
        const ac = m.isEven();
        if ((this.isEven() && ac) || m.signum() == 0) {
            return BigInteger.ZERO;
        }
        const u = m.clone();
        const v = this.clone();
        const a = nbv(1);
        const b = nbv(0);
        const c = nbv(0);
        const d = nbv(1);
        while (u.signum() != 0) {
            while (u.isEven()) {
                u.rShiftTo(1, u);
                if (ac) {
                    if (!a.isEven() || !b.isEven()) {
                        a.addTo(this, a);
                        b.subTo(m, b);
                    }
                    a.rShiftTo(1, a);
                } else if (!b.isEven()) {
                    b.subTo(m, b);
                }
                b.rShiftTo(1, b);
            }
            while (v.isEven()) {
                v.rShiftTo(1, v);
                if (ac) {
                    if (!c.isEven() || !d.isEven()) {
                        c.addTo(this, c);
                        d.subTo(m, d);
                    }
                    c.rShiftTo(1, c);
                } else if (!d.isEven()) {
                    d.subTo(m, d);
                }
                d.rShiftTo(1, d);
            }
            if (u.compareTo(v) >= 0) {
                u.subTo(v, u);
                if (ac) {
                    a.subTo(c, a);
                }
                b.subTo(d, b);
            } else {
                v.subTo(u, v);
                if (ac) { c.subTo(a, c); }
                d.subTo(b, d);
            }
        }
        if (v.compareTo(BigInteger.ONE) != 0) {
            return BigInteger.ZERO;
        }
        if (d.compareTo(m) >= 0) {
            return d.subtract(m);
        }
        if (d.signum() < 0) {
            d.addTo(m, d);
        } else {
            return d;
        }
        if (d.signum() < 0) {
            return d.add(m);
        } else {
            return d;
        }
    }
    */
    // BigInteger.prototype.pow = bnPow;
    // (public) this^e
    BigInteger.prototype.pow = function (e) {
        return this.exp(e, new NullExp());
    };
    // BigInteger.prototype.gcd = bnGCD;
    // (public) gcd(this,a) (HAC 14.54)
    /* Unnecessary for rox
    public gcd(a:BigInteger) {
        let x = (this.s < 0) ? this.negate() : this.clone();
        let y = (a.s < 0) ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
            const t = x;
            x = y;
            y = t;
        }
        let i = x.getLowestSetBit();
        let g = y.getLowestSetBit();
        if (g < 0) {
            return x;
        }
        if (i < g) {
            g = i;
        }
        if (g > 0) {
            x.rShiftTo(g, x);
            y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
            if ((i = x.getLowestSetBit()) > 0) {
                x.rShiftTo(i, x);
            }
            if ((i = y.getLowestSetBit()) > 0) {
                y.rShiftTo(i, y);
            }
            if (x.compareTo(y) >= 0) {
                x.subTo(y, x);
                x.rShiftTo(1, x);
            } else {
                y.subTo(x, y);
                y.rShiftTo(1, y);
            }
        }
        if (g > 0) {
            y.lShiftTo(g, y);
        }
        return y;
    }
    */
    // BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
    // (public) test primality with certainty >= 1-.5^t
    /* Unnecessary for rox
    public isProbablePrime(t:number) {
        let i;
        const x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i) {
                if (x[0] == lowprimes[i]) {
                    return true;
                }
            }
            return false;
        }
        if (x.isEven()) {
            return false;
        }
        i = 1;
        while (i < lowprimes.length) {
            let m = lowprimes[i];
            let j = i + 1;
            while (j < lowprimes.length && m < lplim) {
                m *= lowprimes[j++];
            }
            m = x.modInt(m);
            while (i < j) {
                if (m % lowprimes[i++] == 0) {
                    return false;
                }
            }
        }
        return x.millerRabin(t);
    }
    */
    //#endregion PUBLIC
    //#region PROTECTED
    // BigInteger.prototype.copyTo = bnpCopyTo;
    // (protected) copy this to r
    BigInteger.prototype.copyTo = function (r) {
        for (var i = this.t - 1; i >= 0; --i) {
            r[i] = this[i];
        }
        r.t = this.t;
        r.s = this.s;
    };
    // BigInteger.prototype.fromInt = bnpFromInt;
    // (protected) set from integer value x, -DV <= x < DV
    BigInteger.prototype.fromInt = function (x) {
        this.t = 1;
        this.s = (x < 0) ? -1 : 0;
        if (x > 0) {
            this[0] = x;
        }
        else if (x < -1) {
            this[0] = x + this.DV;
        }
        else {
            this.t = 0;
        }
    };
    // BigInteger.prototype.fromString = bnpFromString;
    // (protected) set from string and radix
    BigInteger.prototype.fromString = function (s, b) {
        var k;
        if (b == 16) {
            k = 4;
        }
        else if (b == 8) {
            k = 3;
        }
        else if (b == 256) {
            k = 8;
            /* byte array */
        }
        else if (b == 2) {
            k = 1;
        }
        else if (b == 32) {
            k = 5;
        }
        else if (b == 4) {
            k = 2;
        }
        else {
            this.fromRadix(s, b);
            return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length;
        var mi = false;
        var sh = 0;
        while (--i >= 0) {
            var x = (k == 8) ? (+s[i]) & 0xff : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-") {
                    mi = true;
                }
                continue;
            }
            mi = false;
            if (sh == 0) {
                this[this.t++] = x;
            }
            else if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            }
            else {
                this[this.t - 1] |= x << sh;
            }
            sh += k;
            if (sh >= this.DB) {
                sh -= this.DB;
            }
        }
        if (k == 8 && ((+s[0]) & 0x80) != 0) {
            this.s = -1;
            if (sh > 0) {
                this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
            }
        }
        this.clamp();
        if (mi) {
            BigInteger.ZERO.subTo(this, this);
        }
    };
    // BigInteger.prototype.clamp = bnpClamp;
    // (protected) clamp off excess high words
    BigInteger.prototype.clamp = function () {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) {
            --this.t;
        }
    };
    // BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    // (protected) r = this << n*DB
    BigInteger.prototype.dlShiftTo = function (n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) {
            r[i + n] = this[i];
        }
        for (i = n - 1; i >= 0; --i) {
            r[i] = 0;
        }
        r.t = this.t + n;
        r.s = this.s;
    };
    // BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    // (protected) r = this >> n*DB
    BigInteger.prototype.drShiftTo = function (n, r) {
        for (var i = n; i < this.t; ++i) {
            r[i - n] = this[i];
        }
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
    };
    // BigInteger.prototype.lShiftTo = bnpLShiftTo;
    // (protected) r = this << n
    BigInteger.prototype.lShiftTo = function (n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB);
        var c = (this.s << bs) & this.DM;
        for (var i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = (this[i] >> cbs) | c;
            c = (this[i] & bm) << bs;
        }
        for (var i = ds - 1; i >= 0; --i) {
            r[i] = 0;
        }
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
    };
    // BigInteger.prototype.rShiftTo = bnpRShiftTo;
    // (protected) r = this >> n
    BigInteger.prototype.rShiftTo = function (n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
            r.t = 0;
            return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs;
        }
        if (bs > 0) {
            r[this.t - ds - 1] |= (this.s & bm) << cbs;
        }
        r.t = this.t - ds;
        r.clamp();
    };
    // BigInteger.prototype.subTo = bnpSubTo;
    // (protected) r = this - a
    BigInteger.prototype.subTo = function (a, r) {
        var i = 0;
        var c = 0;
        var m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        }
        else {
            c += this.s;
            while (i < a.t) {
                c -= a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c -= a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c < -1) {
            r[i++] = this.DV + c;
        }
        else if (c > 0) {
            r[i++] = c;
        }
        r.t = i;
        r.clamp();
    };
    // BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    // (protected) r = this * a, r != this,a (HAC 14.12)
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyTo = function (a, r) {
        var x = this.abs();
        var y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = 0; i < y.t; ++i) {
            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        }
        r.s = 0;
        r.clamp();
        if (this.s != a.s) {
            BigInteger.ZERO.subTo(r, r);
        }
    };
    // BigInteger.prototype.squareTo = bnpSquareTo;
    // (protected) r = this^2, r != this (HAC 14.16)
    BigInteger.prototype.squareTo = function (r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                r[i + x.t] -= x.DV;
                r[i + x.t + 1] = 1;
            }
        }
        if (r.t > 0) {
            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        }
        r.s = 0;
        r.clamp();
    };
    // BigInteger.prototype.divRemTo = bnpDivRemTo;
    // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
    // r != q, this != m.  q or r may be null.
    BigInteger.prototype.divRemTo = function (m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) {
            return;
        }
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null) {
                q.fromInt(0);
            }
            if (r != null) {
                this.copyTo(r);
            }
            return;
        }
        if (r == null) {
            r = nbi();
        }
        var y = nbi();
        var ts = this.s;
        var ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
        }
        else {
            pm.copyTo(y);
            pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) {
            return;
        }
        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt;
        var d2 = (1 << this.F1) / yt;
        var e = 1 << this.F2;
        var i = r.t;
        var j = i - ys;
        var t = (q == null) ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y); // "negative" y so we can replace sub with am later
        while (y.t < ys) {
            y[y.t++] = 0;
        }
        while (--j >= 0) {
            // Estimate quotient digit
            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r[i] < --qd) {
                    r.subTo(t, r);
                }
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms) {
                BigInteger.ZERO.subTo(q, q);
            }
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) {
            r.rShiftTo(nsh, r);
        } // Denormalize remainder
        if (ts < 0) {
            BigInteger.ZERO.subTo(r, r);
        }
    };
    // BigInteger.prototype.invDigit = bnpInvDigit;
    // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
    // justification:
    //         xy == 1 (mod m)
    //         xy =  1+km
    //   xy(2-xy) = (1+km)(1-km)
    // x[y(2-xy)] = 1-k^2m^2
    // x[y(2-xy)] == 1 (mod m^2)
    // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
    // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
    // JS multiply "overflows" differently from C/C++, so care is needed here.
    BigInteger.prototype.invDigit = function () {
        if (this.t < 1) {
            return 0;
        }
        var x = this[0];
        if ((x & 1) == 0) {
            return 0;
        }
        var y = x & 3; // y == 1/x mod 2^2
        y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
        y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
        // last step - calculate inverse mod DV directly;
        // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
        y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
        // we really want the negative inverse, and -DV < y < DV
        return (y > 0) ? this.DV - y : -y;
    };
    // BigInteger.prototype.isEven = bnpIsEven;
    // (protected) true iff this is even
    BigInteger.prototype.isEven = function () {
        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
    };
    // BigInteger.prototype.exp = bnpExp;
    // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
    BigInteger.prototype.exp = function (e, z) {
        if (e > 0xffffffff || e < 1) {
            return BigInteger.ONE;
        }
        var r = nbi();
        var r2 = nbi();
        var g = z.convert(this);
        var i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & (1 << i)) > 0) {
                z.mulTo(r2, g, r);
            }
            else {
                var t = r;
                r = r2;
                r2 = t;
            }
        }
        return z.revert(r);
    };
    // BigInteger.prototype.chunkSize = bnpChunkSize;
    // (protected) return x s.t. r^x < DV
    BigInteger.prototype.chunkSize = function (r) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r));
    };
    // BigInteger.prototype.toRadix = bnpToRadix;
    // (protected) convert to radix string
    BigInteger.prototype.toRadix = function (b) {
        if (b == null) {
            b = 10;
        }
        if (this.signum() == 0 || b < 2 || b > 36) {
            return "0";
        }
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a);
        var y = nbi();
        var z = nbi();
        var r = "";
        this.divRemTo(d, y, z);
        while (y.signum() > 0) {
            r = (a + z.intValue()).toString(b).substr(1) + r;
            y.divRemTo(d, y, z);
        }
        return z.intValue().toString(b) + r;
    };
    // BigInteger.prototype.fromRadix = bnpFromRadix;
    // (protected) convert from radix string
    BigInteger.prototype.fromRadix = function (s, b) {
        this.fromInt(0);
        if (b == null) {
            b = 10;
        }
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs);
        var mi = false;
        var j = 0;
        var w = 0;
        for (var i = 0; i < s.length; ++i) {
            var x = intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-" && this.signum() == 0) {
                    mi = true;
                }
                continue;
            }
            w = b * w + x;
            if (++j >= cs) {
                this.dMultiply(d);
                this.dAddOffset(w, 0);
                j = 0;
                w = 0;
            }
        }
        if (j > 0) {
            this.dMultiply(Math.pow(b, j));
            this.dAddOffset(w, 0);
        }
        if (mi) {
            BigInteger.ZERO.subTo(this, this);
        }
    };
    // BigInteger.prototype.fromNumber = bnpFromNumber;
    // (protected) alternate constructor
    /* Unnecessary for rox
    protected fromNumber(a:number, b:number|SecureRandom, c?:number|SecureRandom) {
        if ("number" == typeof b) {
            // new BigInteger(int,int,RNG)
            if (a < 2) {
                this.fromInt(1);
            } else {
                this.fromNumber(a, c);
                if (!this.testBit(a - 1)) {
                    // force MSB set
                    this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
                }
                if (this.isEven()) {
                    this.dAddOffset(1, 0);
                } // force odd
                while (!this.isProbablePrime(b)) {
                    this.dAddOffset(2, 0);
                    if (this.bitLength() > a) {
                        this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                    }
                }
            }
        } else {
            // new BigInteger(int,RNG)
            const x:number[] = [];
            const t = a & 7;
            x.length = (a >> 3) + 1;
            b.nextBytes(x);
            if (t > 0) {
                x[0] &= ((1 << t) - 1);
            } else {
                x[0] = 0;
            }
            this.fromString(x, 256);
        }
    }
    */
    // BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    // (protected) r = this op a (bitwise)
    BigInteger.prototype.bitwiseTo = function (a, op, r) {
        var i;
        var f;
        var m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i) {
            r[i] = op(this[i], a[i]);
        }
        if (a.t < this.t) {
            f = a.s & this.DM;
            for (i = m; i < this.t; ++i) {
                r[i] = op(this[i], f);
            }
            r.t = this.t;
        }
        else {
            f = this.s & this.DM;
            for (i = m; i < a.t; ++i) {
                r[i] = op(f, a[i]);
            }
            r.t = a.t;
        }
        r.s = op(this.s, a.s);
        r.clamp();
    };
    // BigInteger.prototype.changeBit = bnpChangeBit;
    // (protected) this op (1<<n)
    BigInteger.prototype.changeBit = function (n, op) {
        var r = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r, op, r);
        return r;
    };
    // BigInteger.prototype.addTo = bnpAddTo;
    // (protected) r = this + a
    /* Unnecessary for rox
    protected addTo(a:BigInteger, r:BigInteger) {
        let i = 0;
        let c = 0;
        const m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] + a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c += a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        } else {
            c += this.s;
            while (i < a.t) {
                c += a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c > 0) {
            r[i++] = c;
        } else if (c < -1) {
            r[i++] = this.DV + c;
        }
        r.t = i;
        r.clamp();
    }
    */
    // BigInteger.prototype.dMultiply = bnpDMultiply;
    // (protected) this *= n, this >= 0, 1 < n < DV
    BigInteger.prototype.dMultiply = function (n) {
        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
    };
    // BigInteger.prototype.dAddOffset = bnpDAddOffset;
    // (protected) this += n << w words, this >= 0
    BigInteger.prototype.dAddOffset = function (n, w) {
        if (n == 0) {
            return;
        }
        while (this.t <= w) {
            this[this.t++] = 0;
        }
        this[w] += n;
        while (this[w] >= this.DV) {
            this[w] -= this.DV;
            if (++w >= this.t) {
                this[this.t++] = 0;
            }
            ++this[w];
        }
    };
    // BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    // (protected) r = lower n words of "this * a", a.t <= n
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyLowerTo = function (a, n, r) {
        var i = Math.min(this.t + a.t, n);
        r.s = 0; // assumes a,this >= 0
        r.t = i;
        while (i > 0) {
            r[--i] = 0;
        }
        for (var j = r.t - this.t; i < j; ++i) {
            r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
        }
        for (var j = Math.min(a.t, n); i < j; ++i) {
            this.am(0, a[i], r, i, 0, n - i);
        }
        r.clamp();
    };
    // BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    // (protected) r = "this * a" without lower n words, n > 0
    // "this" should be the larger one if appropriate.
    BigInteger.prototype.multiplyUpperTo = function (a, n, r) {
        --n;
        var i = r.t = this.t + a.t - n;
        r.s = 0; // assumes a,this >= 0
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = Math.max(n - this.t, 0); i < a.t; ++i) {
            r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
        }
        r.clamp();
        r.drShiftTo(1, r);
    };
    // BigInteger.prototype.modInt = bnpModInt;
    // (protected) this % n, n < 2^26
    /* Unnecessary for rox
    protected modInt(n:number) {
        if (n <= 0) {
            return 0;
        }
        const d = this.DV % n;
        let r = (this.s < 0) ? n - 1 : 0;
        if (this.t > 0) {
            if (d == 0) {
                r = this[0] % n;
            } else {
                for (let i = this.t - 1; i >= 0; --i) {
                    r = (d * r + this[i]) % n;
                }
            }
        }
        return r;
    }
    */
    // BigInteger.prototype.millerRabin = bnpMillerRabin;
    // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
    /* Unnecessary for rox
    protected millerRabin(t:number) {
        const n1 = this.subtract(BigInteger.ONE);
        const k = n1.getLowestSetBit();
        if (k <= 0) {
            return false;
        }
        const r = n1.shiftRight(k);
        t = (t + 1) >> 1;
        if (t > lowprimes.length) {
            t = lowprimes.length;
        }
        const a = nbi();
        for (let i = 0; i < t; ++i) {
            // Pick bases at random, instead of starting at 2
            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
            let y = a.modPow(r, this);
            if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
                let j = 1;
                while (j++ < k && y.compareTo(n1) != 0) {
                    y = y.modPowInt(2, this);
                    if (y.compareTo(BigInteger.ONE) == 0) {
                        return false;
                    }
                }
                if (y.compareTo(n1) != 0) {
                    return false;
                }
            }
        }
        return true;
    }
    */
    // BigInteger.prototype.square = bnSquare;
    // (public) this^2
    BigInteger.prototype.square = function () {
        var r = nbi();
        this.squareTo(r);
        return r;
    };
    return BigInteger;
}());
//#region REDUCERS
//#region NullExp
var NullExp = /** @class */ (function () {
    function NullExp() {
    }
    // NullExp.prototype.convert = nNop;
    NullExp.prototype.convert = function (x) {
        return x;
    };
    // NullExp.prototype.revert = nNop;
    NullExp.prototype.revert = function (x) {
        return x;
    };
    // NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
    };
    // NullExp.prototype.sqrTo = nSqrTo;
    NullExp.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
    };
    return NullExp;
}());
// Modular reduction using "classic" algorithm
var Classic = /** @class */ (function () {
    function Classic(m) {
        this.m = m;
    }
    // Classic.prototype.convert = cConvert;
    Classic.prototype.convert = function (x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) {
            return x.mod(this.m);
        }
        else {
            return x;
        }
    };
    // Classic.prototype.revert = cRevert;
    Classic.prototype.revert = function (x) {
        return x;
    };
    // Classic.prototype.reduce = cReduce;
    Classic.prototype.reduce = function (x) {
        x.divRemTo(this.m, null, x);
    };
    // Classic.prototype.mulTo = cMulTo;
    Classic.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    };
    // Classic.prototype.sqrTo = cSqrTo;
    Classic.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
        this.reduce(r);
    };
    return Classic;
}());
//#endregion
//#region Montgomery
// Montgomery reduction
var Montgomery = /** @class */ (function () {
    function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 0x7fff;
        this.mph = this.mp >> 15;
        this.um = (1 << (m.DB - 15)) - 1;
        this.mt2 = 2 * m.t;
    }
    // Montgomery.prototype.convert = montConvert;
    // xR mod m
    Montgomery.prototype.convert = function (x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(r, r);
        }
        return r;
    };
    // Montgomery.prototype.revert = montRevert;
    // x/R mod m
    Montgomery.prototype.revert = function (x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
    };
    // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)
    Montgomery.prototype.reduce = function (x) {
        while (x.t <= this.mt2) {
            // pad x so am has enough room later
            x[x.t++] = 0;
        }
        for (var i = 0; i < this.m.t; ++i) {
            // faster way of calculating u0 = x[i]*mp mod DV
            var j = x[i] & 0x7fff;
            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
            // use am to combine the multiply-shift-add into one call
            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            // propagate carry
            while (x[j] >= x.DV) {
                x[j] -= x.DV;
                x[++j]++;
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    };
    // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r
    Montgomery.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    };
    // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r
    Montgomery.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
        this.reduce(r);
    };
    return Montgomery;
}());
//#endregion Montgomery
//#region Barrett
/* Unnecessary for rox
// Barrett modular reduction
class Barrett implements IReduction {
    constructor(protected m:BigInteger) {
        // setup Barrett
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
    }

    protected r2:BigInteger;
    protected q3:BigInteger;
    protected mu:BigInteger;

    // Barrett.prototype.convert = barrettConvert;
    public convert(x:BigInteger) {
        if (x.s < 0 || x.t > 2 * this.m.t) {
            return x.mod(this.m);
        } else if (x.compareTo(this.m) < 0) {
            return x;
        } else {
            const r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }
    }

    // Barrett.prototype.revert = barrettRevert;
    public revert(x:BigInteger) {
        return x;
    }

    // Barrett.prototype.reduce = barrettReduce;
    // x = x mod m (HAC 14.42)
    public reduce(x:BigInteger) {
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
            x.t = this.m.t + 1;
            x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0) {
            x.dAddOffset(1, this.m.t + 1);
        }
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    }


    // Barrett.prototype.mulTo = barrettMulTo;
    // r = x*y mod m; x,y != r
    public mulTo(x:BigInteger, y:BigInteger, r:BigInteger) {
        x.multiplyTo(y, r);
        this.reduce(r);
    }


    // Barrett.prototype.sqrTo = barrettSqrTo;
    // r = x^2 mod m; x != r
    public sqrTo(x:BigInteger, r:BigInteger) {
        x.squareTo(r);
        this.reduce(r);
    }
}
*/
//#endregion
//#endregion REDUCERS
// return new, unset BigInteger
function nbi() { return new BigInteger(null); }
function parseBigInt(str, r) {
    return new BigInteger(str, r);
}
// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i, x, w, j, c, n) {
    while (--n >= 0) {
        var v = x * this[i++] + w[j] + c;
        c = Math.floor(v / 0x4000000);
        w[j++] = v & 0x3ffffff;
    }
    return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i, x, w, j, c, n) {
    var xl = x & 0x7fff;
    var xh = x >> 15;
    while (--n >= 0) {
        var l = this[i] & 0x7fff;
        var h = this[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w[j++] = l & 0x3fffffff;
    }
    return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i, x, w, j, c, n) {
    var xl = x & 0x3fff;
    var xh = x >> 14;
    while (--n >= 0) {
        var l = this[i] & 0x3fff;
        var h = this[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w[j++] = l & 0xfffffff;
    }
    return c;
}
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
}
else if (j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
// Digit conversions
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
}
// return bigint initialized to value
function nbv(i) {
    var r = nbi();
    r.fromInt(i);
    return r;
}
// returns bit length of the integer x
function nbits(x) {
    var r = 1;
    var t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
}
// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

// Depends on jsbn.js and rng.js
// function linebrk(s,n) {
//   var ret = "";
//   var i = 0;
//   while(i + n < s.length) {
//     ret += s.substring(i,i+n) + "\n";
//     i += n;
//   }
//   return ret + s.substring(i,s.length);
// }
// function byte2Hex(b) {
//   if(b < 0x10)
//     return "0" + b.toString(16);
//   else
//     return b.toString(16);
// }
/* Unnecessary for rox
function pkcs1pad1(s:string, n:number) {
    if (n < s.length + 22) {
        console.error("Message too long for RSA");
        return null;
    }
    const len = n - s.length - 6;
    let filler = "";
    for (let f = 0; f < len; f += 2) {
        filler += "ff";
    }
    const m = "0001" + filler + "00" + s;
    return parseBigInt(m, 16);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
function pkcs1pad2(s:string, n:number) {
    if (n < s.length + 11) { // TODO: fix for utf-8

        console.error("Message too long for RSA");
        return null;
    }
    const ba = [];
    let i = s.length - 1;
    while (i >= 0 && n > 0) {
        const c = s.charCodeAt(i--);
        if (c < 128) { // encode using utf-8
            ba[--n] = c;
        } else if ((c > 127) && (c < 2048)) {
            ba[--n] = (c & 63) | 128;
            ba[--n] = (c >> 6) | 192;
        } else {
            ba[--n] = (c & 63) | 128;
            ba[--n] = ((c >> 6) & 63) | 128;
            ba[--n] = (c >> 12) | 224;
        }
    }
    ba[--n] = 0;
    const rng = new SecureRandom();
    const x = [];
    while (n > 2) { // random non-zero pad
        x[0] = 0;
        while (x[0] == 0) {
            rng.nextBytes(x);
        }
        ba[--n] = x[0];
    }
    ba[--n] = 2;
    ba[--n] = 0;
    return new BigInteger(ba);
}
*/
// "empty" RSA key constructor
var RSAKey = /** @class */ (function () {
    function RSAKey() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
    }
    //#region PROTECTED
    // protected
    // RSAKey.prototype.doPublic = RSADoPublic;
    // Perform raw public operation on "x": return x^e (mod n)
    RSAKey.prototype.doPublic = function (x) {
        return x.modPowInt(this.e, this.n);
    };
    /* Unnecessary for rox
    // RSAKey.prototype.doPrivate = RSADoPrivate;
    // Perform raw private operation on "x": return x^d (mod n)
    public doPrivate(x:BigInteger) {
        if (this.p == null || this.q == null) {
            return x.modPow(this.d, this.n);
        }

        // TODO: re-calculate any missing CRT params
        let xp = x.mod(this.p).modPow(this.dmp1, this.p);
        const xq = x.mod(this.q).modPow(this.dmq1, this.q);

        while (xp.compareTo(xq) < 0) {
            xp = xp.add(this.p);
        }
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
    }
    */
    //#endregion PROTECTED
    //#region PUBLIC
    // RSAKey.prototype.setPublic = RSASetPublic;
    // Set the public key fields N and e from hex strings
    RSAKey.prototype.setPublic = function (N, E) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
        }
        else {
            console.error("Invalid RSA public key");
        }
    };
    /* Unnecessary for rox
    // RSAKey.prototype.encrypt = RSAEncrypt;
    // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
    public encrypt(text:string) {
        const m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);

        if (m == null) {
            return null;
        }
        const c = this.doPublic(m);
        if (c == null) {
            return null;
        }
        const h = c.toString(16);
        if ((h.length & 1) == 0) {
            return h;
        } else {
            return "0" + h;
        }
    }


    // RSAKey.prototype.setPrivate = RSASetPrivate;
    // Set the private key fields N, e, and d from hex strings
    public setPrivate(N:string, E:string, D:string) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
        } else {
            console.error("Invalid RSA private key");
        }
    }


    // RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
    // Set the private key fields N, e, d and CRT params from hex strings
    public setPrivateEx(N:string, E:string, D:string, P:string, Q:string, DP:string, DQ:string, C:string) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16);
            this.e = parseInt(E, 16);
            this.d = parseBigInt(D, 16);
            this.p = parseBigInt(P, 16);
            this.q = parseBigInt(Q, 16);
            this.dmp1 = parseBigInt(DP, 16);
            this.dmq1 = parseBigInt(DQ, 16);
            this.coeff = parseBigInt(C, 16);
        } else {
            console.error("Invalid RSA private key");
        }
    }
    */
    // RSAKey.prototype.generate = RSAGenerate;
    // Generate a new random private key B bits long, using public expt E
    /* Unnecessary for rox
    public generate(B:number, E:string) {
        const rng = new SecureRandom();
        const qs = B >> 1;
        this.e = parseInt(E, 16);
        const ee = new BigInteger(E, 16);
        for (;;) {
            for (;;) {
                this.p = new BigInteger(B - qs, 1, rng);
                if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) { break; }
            }
            for (;;) {
                this.q = new BigInteger(qs, 1, rng);
                if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) { break; }
            }
            if (this.p.compareTo(this.q) <= 0) {
                const t = this.p;
                this.p = this.q;
                this.q = t;
            }
            const p1 = this.p.subtract(BigInteger.ONE);
            const q1 = this.q.subtract(BigInteger.ONE);
            const phi = p1.multiply(q1);
            if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                this.n = this.p.multiply(this.q);
                this.d = ee.modInverse(phi);
                this.dmp1 = this.d.mod(p1);
                this.dmq1 = this.d.mod(q1);
                this.coeff = this.q.modInverse(this.p);
                break;
            }
        }
    }
    */
    /* Unnecessary for rox
    // RSAKey.prototype.decrypt = RSADecrypt;
    // Return the PKCS#1 RSA decryption of "ctext".
    // "ctext" is an even-length hex string and the output is a plain string.
    public decrypt(ctext:string) {
        const c = parseBigInt(ctext, 16);
        const m = this.doPrivate(c);
        if (m == null) { return null; }
        return pkcs1unpad2(m, (this.n.bitLength() + 7) >> 3);
    }

    // Generate a new random private key B bits long, using public expt E
    public generateAsync(B:number, E:string, callback:() => void) {
        const rng = new SecureRandom();
        const qs = B >> 1;
        this.e = parseInt(E, 16);
        const ee = new BigInteger(E, 16);
        const rsa = this;
        // These functions have non-descript names because they were originally for(;;) loops.
        // I don't know about cryptography to give them better names than loop1-4.
        const loop1 = function () {
            const loop4 = function () {
                if (rsa.p.compareTo(rsa.q) <= 0) {
                    const t = rsa.p;
                    rsa.p = rsa.q;
                    rsa.q = t;
                }
                const p1 = rsa.p.subtract(BigInteger.ONE);
                const q1 = rsa.q.subtract(BigInteger.ONE);
                const phi = p1.multiply(q1);
                if (phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
                    rsa.n = rsa.p.multiply(rsa.q);
                    rsa.d = ee.modInverse(phi);
                    rsa.dmp1 = rsa.d.mod(p1);
                    rsa.dmq1 = rsa.d.mod(q1);
                    rsa.coeff = rsa.q.modInverse(rsa.p);
                    setTimeout(function () {callback(); }, 0); // escape
                } else {
                    setTimeout(loop1, 0);
                }
            };
            const loop3 = function () {
                rsa.q = nbi();
                rsa.q.fromNumberAsync(qs, 1, rng, function () {
                    rsa.q.subtract(BigInteger.ONE).gcda(ee, function (r) {
                        if (r.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                            setTimeout(loop4, 0);
                        } else {
                            setTimeout(loop3, 0);
                        }
                    });
                });
            };
            const loop2 = function () {
                rsa.p = nbi();
                rsa.p.fromNumberAsync(B - qs, 1, rng, function () {
                    rsa.p.subtract(BigInteger.ONE).gcda(ee, function (r) {
                        if (r.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                            setTimeout(loop3, 0);
                        } else {
                            setTimeout(loop2, 0);
                        }
                    });
                });
            };
            setTimeout(loop2, 0);
        };
        setTimeout(loop1, 0);
    }

    public sign(text:string, digestMethod:(str:string) => string, digestName:string):string {
        const header = getDigestHeader(digestName);
        const digest = header + digestMethod(text).toString();
        const m = pkcs1pad1(digest, this.n.bitLength() / 4);
        if (m == null) {
            return null;
        }
        const c = this.doPrivate(m);
        if (c == null) {
            return null;
        }
        const h = c.toString(16);
        if ((h.length & 1) == 0) {
            return h;
        } else {
            return "0" + h;
        }
    }
    */
    RSAKey.prototype.verify = function (text, signature, digestMethod) {
        var c = parseBigInt(signature, 16);
        var m = this.doPublic(c);
        if (m == null) {
            return null;
        }
        var unpadded = m.toString(16).replace(/^1f+00/, "");
        var digest = removeDigestHeader(unpadded);
        return digest == digestMethod(text).toString();
    };
    return RSAKey;
}());
/* Unnecessary for rox
// Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
function pkcs1unpad2(d:BigInteger, n:number):string {
    const b = d.toByteArray();
    let i = 0;
    while (i < b.length && b[i] == 0) { ++i; }
    if (b.length - i != n - 1 || b[i] != 2) {
        return null;
    }
    ++i;
    while (b[i] != 0) {
        if (++i >= b.length) { return null; }
    }
    let ret = "";
    while (++i < b.length) {
        const c = b[i] & 255;
        if (c < 128) { // utf-8 decode
            ret += String.fromCharCode(c);
        } else if ((c > 191) && (c < 224)) {
            ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63));
            ++i;
        } else {
            ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63));
            i += 2;
        }
    }
    return ret;
}
*/
// https://tools.ietf.org/html/rfc3447#page-43
var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414",
};
/* Unnecessary for rox
function getDigestHeader(name:string):string {
    return DIGEST_HEADERS[name] || "";
}
*/
function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
        if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
            var header = DIGEST_HEADERS[name_1];
            var len = header.length;
            if (str.substr(0, len) == header) {
                return str.substr(len);
            }
        }
    }
    return str;
}
// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
// function RSAEncryptB64(text) {
//  var h = this.encrypt(text);
//  if(h) return hex2b64(h); else return null;
// }
// public
// RSAKey.prototype.encrypt_b64 = RSAEncryptB64;

/**
 *
 * @param {Object} [options = {}] - An object to customize JSEncrypt behaviour
 * possible parameters are:
 * - default_key_size        {number}  default: 1024 the key size in bit
 * - default_public_exponent {string}  default: '010001' the hexadecimal representation of the public exponent
 * - log                     {boolean} default: false whether log warn/error or not
 * @constructor
 */
var JSEncrypt = /** @class */ (function () {
    function JSEncrypt(options) {
        options = options || {};
        /* Unnecessary for rox
        this.default_key_size = parseInt(options.default_key_size, 10) || 1024;
        this.default_public_exponent = options.default_public_exponent || "010001"; // 65537 default openssl public exponent for rsa key type
        this.log = options.log || false;
        */
        // The private and public key.
        this.key = null;
    }
    /**
     * Method to set the rsa key parameter (one method is enough to set both the public
     * and the private key, since the private key contains the public key paramenters)
     * Log a warning if logs are enabled
     * @param {Object|string} key the pem encoded string or an object (with or without header/footer)
     * @public
     */
    /* Unnecessary for rox
    public setKey(key:string) {
        if (this.log && this.key) {
            console.warn("A key was already set, overriding existing.");
        }
        this.key = new JSEncryptRSAKey(key);
    }
    */
    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */
    /* Unnecessary for rox
    public setPrivateKey(privkey:string) {
        // Create the key.
        this.setKey(privkey);
    }
    */
    /**
     * Proxy method for setKey, for api compatibility
     * @see setKey
     * @public
     */
    /* Unnecessary for rox
    public setPublicKey(pubkey:string) {
        // Sets the public key.
        this.setKey(pubkey);
    }
    */
    /**
     * Proxy method for RSAKey object's decrypt, decrypt the string using the private
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str base64 encoded crypted string to decrypt
     * @return {string} the decrypted string
     * @public
     */
    /* Unnecessary for rox
    public decrypt(str:string) {
        // Return the decrypted string.
        try {
            return this.getKey().decrypt(b64tohex(str));
        } catch (ex) {
            return false;
        }
    }
    */
    /**
     * Proxy method for RSAKey object's encrypt, encrypt the string using the public
     * components of the rsa key object. Note that if the object was not set will be created
     * on the fly (by the getKey method) using the parameters passed in the JSEncrypt constructor
     * @param {string} str the string to encrypt
     * @return {string} the encrypted string encoded in base64
     * @public
     */
    /* Unnecessary for rox
    public encrypt(str:string) {
        // Return the encrypted string.
        try {
            return hex2b64(this.getKey().encrypt(str));
        } catch (ex) {
            return false;
        }
    }
    */
    /**
     * Proxy method for RSAKey object's sign.
     * @param {string} str the string to sign
     * @param {function} digestMethod hash method
     * @param {string} digestName the name of the hash algorithm
     * @return {string} the signature encoded in base64
     * @public
     */
    /* Unnecessary for rox
    public sign(str:string, digestMethod:(str:string) => string, digestName:string):string|false {
        // return the RSA signature of 'str' in 'hex' format.
        try {
            return hex2b64(this.getKey().sign(str, digestMethod, digestName));
        } catch (ex) {
            return false;
        }
    }
    */
    /**
     * Proxy method for RSAKey object's verify.
     * @param {string} str the string to verify
     * @param {string} signature the signature encoded in base64 to compare the string to
     * @param {function} digestMethod hash method
     * @return {boolean} whether the data and signature match
     * @public
     */
    JSEncrypt.prototype.verify = function (str, signature, digestMethod) {
        // Return the decrypted 'digest' of the signature.
        try {
            return this.getKey().verify(str, b64tohex(signature), digestMethod);
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Getter for the current JSEncryptRSAKey object. If it doesn't exists a new object
     * will be created and returned
     * @param {callback} [cb] the callback to be called if we want the key to be generated
     * in an async fashion
     * @returns {JSEncryptRSAKey} the JSEncryptRSAKey object
     * @public
     */
    JSEncrypt.prototype.getKey = function (cb) {
        // Only create new if it does not exist.
        if (!this.key) {
            // Get a new private key.
            this.key = new RSAKey();
            /* Unnecessary for rox
            this.key = new JSEncryptRSAKey();
            if (cb && {}.toString.call(cb) === "[object Function]") {
                this.key.generateAsync(this.default_key_size, this.default_public_exponent, cb);
                return;
            }
            // Generate the key.
            this.key.generate(this.default_key_size, this.default_public_exponent);
            */
        }
        return this.key;
    };
    JSEncrypt.version = "3.0.0-rc.1";
    return JSEncrypt;
}());

window.JSEncrypt = JSEncrypt;

exports.JSEncrypt = JSEncrypt;
exports.default = JSEncrypt;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(219));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Variant = __webpack_require__(65);

var _Variant2 = _interopRequireDefault(_Variant);

var _Flag = __webpack_require__(95);

var _Flag2 = _interopRequireDefault(_Flag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrowserEntitiesProvider = function () {
  function BrowserEntitiesProvider() {
    _classCallCheck(this, BrowserEntitiesProvider);
  }

  _createClass(BrowserEntitiesProvider, [{
    key: 'createFlag',
    value: function createFlag(defaultValue) {
      return new _Flag2.default(defaultValue);
    }
  }, {
    key: 'createVariant',
    value: function createVariant(defaultValue, options) {
      return new _Variant2.default(defaultValue, options);
    }
  }]);

  return BrowserEntitiesProvider;
}();

exports.default = new BrowserEntitiesProvider();

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FreezeOptions = __webpack_require__(66);

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseRemoteConfiguration = _roxBase2.default.Entities.Configuration;
var RoxxParser = _roxBase2.default.Parsers.RoxxParser;


var parser = new RoxxParser();

var BrowserRemoteConfiguration = function (_BaseRemoteConfigurat) {
  _inherits(BrowserRemoteConfiguration, _BaseRemoteConfigurat);

  function BrowserRemoteConfiguration(defaultValue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        freeze = _ref.freeze;

    _classCallCheck(this, BrowserRemoteConfiguration);

    var _this = _possibleConstructorReturn(this, (BrowserRemoteConfiguration.__proto__ || Object.getPrototypeOf(BrowserRemoteConfiguration)).call(this, defaultValue));

    Object.defineProperty(_this, '_frozen', {
      value: false,
      writable: true,
      enumerable: false
    });

    if (freeze && !(0, _FreezeOptions.isFreezeOptionValid)(freeze)) {
      throw new Error('Freeze option is invalid ' + freeze);
    }
    _this._localFreeze = freeze;
    return _this;
  }

  _createClass(BrowserRemoteConfiguration, [{
    key: 'unfreeze',
    value: function unfreeze() {
      this._frozen = false;
    }
  }, {
    key: 'getValue',
    value: function getValue(context) {
      if (this._freeze === _FreezeOptions.freezeOptions.freezeOptionNone) {
        if (this.condition) {
          this.value = parser.evaluateExpression(this.condition, undefined, context);
        }
        return this._value;
      }

      if (!this._frozen) {
        if (this.condition) {
          this.value = parser.evaluateExpression(this.condition, undefined, context);
        }
        this._frozen = true;
      }

      return this._value;
    }
  }, {
    key: 'value',
    set: function set(newValue) {
      if (this._type !== (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) || newValue === undefined) {
        this._value = this._defaultValue;
        return;
      }

      this._value = newValue;
      this._frozen = false;
    }
  }, {
    key: '_freeze',
    get: function get() {
      return this._localFreeze || (0, _FreezeOptions.getDefaultFreezeOption)() || _FreezeOptions.defaultFreezeOptionForPlatform;
    }
  }]);

  return BrowserRemoteConfiguration;
}(BaseRemoteConfiguration);

exports.default = BrowserRemoteConfiguration;

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.open = open;
;(close);

var _roxBase = __webpack_require__(15);

var _roxBase2 = _interopRequireDefault(_roxBase);

var _Overrider = __webpack_require__(67);

var _uiUtils = __webpack_require__(223);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flagsRepo = _roxBase2.default.Repositories.Flags;


var _root = void 0;
var _position = void 0;
var _filter = void 0;
var _flags = void 0;

var RESET_ALL_TEXT = 'Reset All Overrides';
var SEARCH_PLACEHOLDER = 'Search Flags';
var TITLE = 'ROX Overrides';
var ORIGINAL_VALUE_TEXT = 'Original value';
var ORIGINAL_OPTION_PREFIX = 'Original';
var DEFAULT_POSITON = 'bottom right';
var CSS = 'https://connect.rollout.io/rox.browser.css';
var POSITIONS = {
  'top left': { top: 0, left: 0 },
  'top right': { top: 0, right: 0 },
  'bottom left': { bottom: 0, left: 0 },
  'bottom right': { bottom: 0, right: 0 }
};

var ROOT_STYLE = {
  background: 'white',
  'z-index': 999999,
  position: 'fixed',
  width: '400px',
  height: '600px',
  overflow: 'auto'
};

var getVariantsCategories = function getVariantsCategories() {
  return flagsRepo.items.map(function (i) {
    return i.dump();
  }).filter(function (f) {
    return _filter ? f.name.toLowerCase().indexOf(_filter.toLowerCase()) !== -1 : true;
  }).reduce(function (agg, f) {
    agg[f.nameDetails.namespace] ? null : agg[f.nameDetails.namespace] = [];
    agg[f.nameDetails.namespace].push(f);
    return agg;
  }, {});
};

var option = function option(_ref) {
  var value = _ref.value,
      text = _ref.text,
      selected = _ref.selected;

  var el = document.createElement('option');
  selected && el.setAttribute('selected', true);
  el.setAttribute('value', value);
  el.textContent = text;
  return el;
};

var getSelected = function getSelected(_ref2) {
  var originalValue = _ref2.originalValue,
      overridingValue = _ref2.overridingValue,
      option = _ref2.option;

  if (overridingValue) {
    return overridingValue === option;
  } else {
    return originalValue === option;
  }
};

var getFlagOptions = function getFlagOptions() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { options: [] },
      options = _ref3.options,
      originalValue = _ref3.originalValue,
      overridingValue = _ref3.overridingValue;

  return options.map(function (i) {
    return {
      text: i === originalValue ? ORIGINAL_OPTION_PREFIX + ' (' + i + ')' : i,
      value: i,
      selected: getSelected({ originalValue: originalValue, overridingValue: overridingValue, option: i })
    };
  });
};

var applyRootStyle = function applyRootStyle(el) {
  return (0, _uiUtils.setStyle)(el, (0, _uiUtils.compileStyles)(ROOT_STYLE) + ';' + (0, _uiUtils.compileStyles)(POSITIONS[_position]));
};

var makeFlagTitle = function makeFlagTitle(_ref4) {
  var name = _ref4.name,
      originalValue = _ref4.originalValue,
      overridingValue = _ref4.overridingValue;
  return (0, _uiUtils.divWithChildren)([(0, _uiUtils.divWithText)(name), overridingValue ? (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxFlagSub'), _uiUtils.divWithText)(ORIGINAL_VALUE_TEXT + ': ' + originalValue) : undefined]);
};

var makeCategory = function makeCategory(categories, category) {
  return (0, _uiUtils.divWithChildren)([(0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxNamespace'), _uiUtils.divWithText)(category), (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxFlagsList'), _uiUtils.divWithChildren)(categories[category].map(makeFlag))]);
};
var makeCategories = function makeCategories(categories) {
  return Object.keys(categories).map(makeCategory.bind(null, categories));
};

var makeFlag = function makeFlag(_ref5) {
  var name = _ref5.name,
      nameDetails = _ref5.nameDetails,
      originalValue = _ref5.originalValue,
      overridingValue = _ref5.overridingValue,
      options = _ref5.options;
  return (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxPushAside roxFlag'), _uiUtils.divWithChildren)([makeFlagTitle({ name: nameDetails.name, originalValue: originalValue, overridingValue: overridingValue }), selection(name, originalValue, getFlagOptions({ options: options, originalValue: originalValue, overridingValue: overridingValue }))]);
};

var header = function header() {
  return (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxPushAside roxTitle'), _uiUtils.divWithChildren)([(0, _uiUtils.elementWithText)('span', TITLE), (0, _uiUtils.attachOnClickHandler)((0, _uiUtils.elementWithText)('a', '╳'), close)]);
};

var handleSearchChange = function handleSearchChange(_ref6) {
  var target = _ref6.target,
      keyCode = _ref6.keyCode;

  keyCode === 27 ? (target.value = '', _filter = null) : _filter = target.value;
  render();
};

var search = function search() {
  return (0, _uiUtils.attachOnKeyUpHandler)((0, _uiUtils.elementWithAttrs)('input', {
    placeholder: SEARCH_PLACEHOLDER
  }), handleSearchChange);
};

var onResetAllClicked = function onResetAllClicked() {
  return (0, _Overrider.clearAllOverrides)(), render();
};
var resetAllAction = function resetAllAction() {
  return (0, _uiUtils.attachOnClickHandler)((0, _uiUtils.elementWithText)('a', RESET_ALL_TEXT), onResetAllClicked);
};

var onFlagChange = function onFlagChange(name, originalValue) {
  return function (e) {
    return e.preventDefault(), originalValue === e.target.value ? (0, _Overrider.clearOverride)(name) : (0, _Overrider.setOverride)(name, e.target.value), render();
  };
};

var selection = function selection(name, originalValue) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return (0, _uiUtils.attachOnChangeHandler)((0, _uiUtils.elementWithChildren)('select', options.map(option)), onFlagChange(name, originalValue));
};

var searchFieldWrapper = function searchFieldWrapper() {
  return (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxSearch roxPushAside'), _uiUtils.divWithChildren)([search(), resetAllAction()]);
};

var getFlagsView = function getFlagsView() {
  return (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxFlags'), _uiUtils.divWithChildren)(makeCategories(getVariantsCategories()));
};

function render() {
  _root.removeChild(_flags);
  _flags = getFlagsView();
  _root.appendChild(_flags);
}

function open() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_POSITON;

  if (_root) return;
  if (Object.keys(POSITIONS).indexOf(position) === -1) position = DEFAULT_POSITON;
  _position = position;

  _flags = getFlagsView();

  _root = (0, _uiUtils.compose)((0, _uiUtils.applyClass)('roxDbg'), applyRootStyle, _uiUtils.divWithChildren)([(0, _uiUtils.divWithChildren)([header(), searchFieldWrapper()]), _flags]);

  var body = document.getElementsByTagName('body')[0];
  body.appendChild((0, _uiUtils.elementWithAttrs)('link', {
    href: 'https://fonts.googleapis.com/css?family=Lato',
    rel: 'stylesheet'
  }));
  body.appendChild((0, _uiUtils.elementWithAttrs)('link', {
    href: CSS,
    rel: 'stylesheet'
  }));

  body.appendChild(_root);
  render();
}

function close() {
  var body = document.getElementsByTagName('body')[0];
  body.removeChild(_root);
  _root = undefined;
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
function compose() {
  var fns = arguments;

  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  };
}

var compileStyles = exports.compileStyles = function compileStyles() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(styles).map(function (key) {
    return key + ': ' + styles[key];
  }).join(';');
};

var setStyle = exports.setStyle = function setStyle(node) {
  var styleString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return node.setAttribute('style', styleString), node;
};
var applyClass = exports.applyClass = function applyClass(className) {
  return function (node) {
    return node.setAttribute('class', className), node;
  };
};

var attachEvent = function attachEvent(node, event, fn) {
  return node.addEventListener(event, fn), node;
};
var attachOnChangeHandler = exports.attachOnChangeHandler = function attachOnChangeHandler(node, fn) {
  return attachEvent(node, 'change', fn);
};
var attachOnClickHandler = exports.attachOnClickHandler = function attachOnClickHandler(node, fn) {
  return attachEvent(node, 'click', fn);
};
var attachOnKeyUpHandler = exports.attachOnKeyUpHandler = function attachOnKeyUpHandler(node, fn) {
  return attachEvent(node, 'keyup', fn);
};

// -----------------------

var appendChildren = void 0,
    elementWithText = void 0,
    elementWithAttrs = void 0,
    elementWithChildren = void 0,
    divWithText = void 0,
    divWithChildren = void 0;
(appendChildren = exports.elementWithText = elementWithText = exports.elementWithAttrs = elementWithAttrs = exports.elementWithChildren = elementWithChildren = divWithText), exports.divWithChildren = divWithChildren = function divWithChildren() {};

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  ;(appendChildren = function appendChildren(node) {
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return children.reduce(function (node, ch) {
      return ch ? node.appendChild(ch) && node : node;
    }, node);
  });

  exports.elementWithText = elementWithText = function elementWithText() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var el = document.createElement(name);
    el.textContent = text;
    return el;
  };

  exports.elementWithAttrs = elementWithAttrs = function elementWithAttrs() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = document.createElement(name);
    Object.keys(attrs).forEach(function (key) {
      return el.setAttribute(key, attrs[key]);
    });
    return el;
  };

  exports.elementWithChildren = elementWithChildren = function elementWithChildren() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return appendChildren(document.createElement(name), children);
  };

  exports.divWithText = divWithText = elementWithText.bind(document, 'div');
  exports.divWithChildren = divWithChildren = function divWithChildren() {
    var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return elementWithChildren('div', children);
  };
}

;(appendChildren);
exports.elementWithText = elementWithText;
exports.elementWithAttrs = elementWithAttrs;
exports.elementWithChildren = elementWithChildren;
exports.divWithText = divWithText;
exports.divWithChildren = divWithChildren;

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=rox-browser.js.map