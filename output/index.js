function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/**
 * Superclass for all implemented generators.
 */
class PRNG {
  /**
   * @constructor
   * @param {number | bigint} max -> Max number that can be generated by this generator.
   * @param {number | bigint} seed -> Initial seed.
   */
  constructor(max, seed) {
    /**
     * @protected
     * @readonly
     * @type {number | bigint}
     */
    this.max = max;
    /**
     * @protected
     * @type {number | bigint}
     */
    this._seed = seed;
  }

  /**
   * Casts the given BigInt number to an unsigned big int with the given
   * number of bits.
   *
   * @protected
   * @param {bigint} number -> A string param.
   * @param {number} bits -> An optional param (Closure syntax)
   * @return {bigint} This is the result
   */
  cast(number, bits) {
    return BigInt.asUintN(bits, number);
  }

  /**
   * Checks that a given number is within the range.
   *
   * @protected
   * @param {number} number -> A string param.
   * @throws Error -> Number greater than max.
   */
  checkNum(number) {
    if (number > this.max) {
      throw new Error(`Number greater than ${this.max}`);
    }
  }

  /**
   * Resets the PRNG.
   * To be implemented by sub-classes.
   *
   * @public
   * @throws Error -> Method not implemented.
   */
  reset() {
    if (this.constructor === PRNG) {
      throw new Error('Method not implemented');
    }
  }

  /**
   * Private method for integer generation.
   * To be implemented by sub-classes.
   *
   * @protected
   * @return {bigint} Random integer.
   */
  _int() {
    if (this.constructor === PRNG) {
      throw new Error('Method not implemented');
    }
    return BigInt(0);
  }

  /**
   * Generates a boolean with the formula random.float() >= 0.5
   *
   * @example
   * random.bool();
   *
   * @example
   * random.bool(); // true
   *
   * @public
   * @returns {boolean} True/False.
   */
  bool() {
    return this.float() >= 0.5;
  }

  /**
   * Generates a random boolean with probability of it being true denoted by the pTrue parameter.
   * For example, when pTrue=0.8, 80% of the numbers generated with this method will be true.
   *
   * @example
   * random.coin(pTrue);
   *
   * @example
   * random.coin(0.8); // true
   *
   * @public
   * @param {number} pTrue -> Probability of generating a true value.
   * @returns {boolean} True/False.
   */
  coin(pTrue = 0.5) {
    return this.float() < pTrue;
  }

  /**
   * Generates and returns the next number in the PRNGs sequence.
   *
   * @example
   * random.int();
   *
   * @example
   * random.int(); // 85424123
   *
   * @public
   * @returns {number} Number less than 2 ** 32 for 32 bit generators.
   */
  int() {
    return Number(this._int());
  }

  /**
   * Generates and returns the next number in the PRNGs sequence and returns it as a Bigint.
   *
   * @example
   * random.bigInt();
   *
   * @example
   * random.bigInt(); // 85424123n
   *
   * @public
   * @returns {bigint} Number less than 2 ** 32 for 32 bit generators represented as a BigInt class.
   */
  bigInt() {
    return this._int();
  }

  /**
   * Generates a random floating point number.
   *
   * @example
   * random.float();
   *
   * @example
   * random.float(); // 0.234242
   *
   * @public
   * @returns {number} Float between 0.0 - 1.0.
   */
  float() {
    return this.int() * (1.0 / this.max);
  }

  /**
   * Generates a random floating point number.
   *
   * @example
   * random.float53();
   *
   * @example
   * random.float53(); // 0.2342422341231
   *
   * @public
   * @returns {number} Float between 0.0 - 1.0.
   */
  float53() {
    const a = this.int() >>> 5;
    const b = this.int() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }

  /**
   * Generates a number within the given range.
   *
   * @example
   * random.randRange(min, max);
   *
   * @example
   * const lowerBound = 4;
   * const upperBound = 2432;
   * random.randRange(lowerBound, upperBound); // 36.
   *
   * @public
   * @param {number} min -> Lower bound of the numbers to generate (inclusive).
   * @param {number} max -> Upper bound of the numbers to generate (inclusive).
   * @returns {number} Number min <= Number <= max.
   */
  randRange(min, max) {
    // Debiased Modulo method,
    // https://docs.oracle.com/javase/6/docs/api/java/util/Random.html#nextInt%28int%29
    // https://peteroupc.github.io/randomnotes.html
    // https://www.pcg-random.org/posts/bounded-rands.html
    const range = max - min;
    const t = this.max % range;
    let r = this.int();
    while (r < t) {
      r = this.int();
    }
    return min + r % range;
  }

  /**
   * Generates a number below the given maximum.
   *
   * @example
   * random.randBelow(max);
   *
   * @example
   * const upperBound = 2432;
   * random.randBelow(upperBound);  // 285.
   *
   * @public
   * @param {number} max -> Upper bound of the numbers to generate (inclusive).
   * @returns {number} Number <= max
   */
  randBelow(max) {
    return this.randRange(0, max);
  }

  /**
   * Picks a random element from the array.
   *
   * @example
   * random.choice(array)
   *
   * @example
   * const arr = [1, 4, 2, 3];
   * random.choice(arr); // 4
   *
   * @public
   * @param {any[]} array -> Array of any type from which we randomly select one item.
   * @returns {any} A single item from the array of type ?.
   */
  choice(array) {
    return array[this.randBelow(array.length)];
  }

  /**
   * Randomly shuffles the given array using the fisher-yates algorithm.
   *
   * @example
   * random.shuffle(array, inPlace = false)
   *
   * @example
   * const arr = [1, 4, 2, 3];
   * const shuffled = random.shuffle(arr, false);
   * console.log(arr); // [1, 4, 2, 3]
   * console.log(shuffled); // [4, 2, 3, 1]
   *
   * @example
   * const arr = [1, 4, 2, 3];
   * const shuffled = random.shuffle(arr, true);
   * console.log(arr); // [4, 2, 3, 1]
   * console.log(shuffled); // [4, 2, 3, 1]
   *
   * @public
   * @param {any[]} array -> Array of any type to be shuffled.
   * @param {boolean} inPlace -> Shuffle the array (true) or shuffle a copy of array (false).
   * @returns {any[]} Array shuffled (inPlace === false), shuffled copy of array (inPlace === true).
   */
  shuffle(array, inPlace = true) {
    let toSort = array;
    if (!inPlace) {
      toSort = Array.from(toSort);
    }

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle.
    for (let i = toSort.length - 1; i > 0; i--) {
      const j = this.randRange(0, i);
      const temp = toSort[i];
      toSort[i] = toSort[j];
      toSort[j] = temp;
    }
    return toSort;
  }

  /**
   * Creates an array of the given size populated with the result of the mapFn.
   *
   * @protected
   * @param {number} size -> Length of the array to create.
   * @param {function(): boolean | number | bigint} mapFn -> Function which we use to fill array.
   * @returns {boolean[] | number[] | bigint[]} Array created by repeated calls to the mapFn.
   */
  initArray(size, mapFn) {
    return Array.from({
      length: size
    }, mapFn);
  }

  /**
   * Generates an n size array populated with booleans.
   *
   * @example
   * random.boolArray(size);
   *
   * @example
   * const size = 256;
   * random.boolArray(size);
   *
   * @public
   * @param {number} size -> Size of the array to generate.
   * @returns {boolean[]} Array[Boolean] of length size.
   */
  boolArray(size) {
    return this.initArray(size, () => this.bool());
  }

  /**
   * Generates an n size array of random booleans with probability of it being true
   * denoted by the pTrue parameter. For example, when pTrue=0.8, 80% of the numbers
   * in the generated array will be true.
   *
   * @example
   * random.coinArray(size, pTrue);
   *
   * @example
   * const size = 256;
   * const pTrue = 0.8;
   * random.coinArray(size, pTrue);
   *
   * @public
   * @param {number} size -> Size of the array to generate.
   * @param {number} pTrue -> Probability of generating a true value.
   * @returns {boolean[]} Array[Boolean] of length size.
   */
  coinArray(size, pTrue = 0.5) {
    return this.initArray(size, () => this.coin(pTrue));
  }

  /**
   * Generates an n size array populated with integers.
   *
   * @example
   * random.intArray(size);
   *
   * @example
   * const size = 256;
   * random.intArray(size);
   *
   * @public
   * @param size -> Size of the array to generate.
   * @returns {number[]} Array[Number] of length size.
   */
  intArray(size) {
    return this.initArray(size, () => this.int());
  }

  /**
   * Generates an n size array populated with Big Integers.
   *
   * @example
   * random.bigIntArray(size);
   *
   * @example
   * const size = 256;
   * random.bigIntArray(size);
   *
   * @public
   * @param size -> Size of the array to generate.
   * @returns {bigint[]} Array[BigInt] of length size.
   */
  bigIntArray(size) {
    return this.initArray(size, () => this.bigInt());
  }

  /**
   * Generates an n size array populated within the given range.
   *
   * @example
   * random.randRangeArray(size, min, max);
   *
   * @example
   * const size = 256;
   * const lowerBound = 4;
   * const upperBound = 2432;
   * random.randRangeArray(size, lowerBound, upperBound);
   *
   * @public
   * @param {number} size -> Size of the array to generate.
   * @param {number} min -> Lower bound of the numbers to generate (inclusive).
   * @param {number} max -> Upper bound of the numbers to generate (inclusive).
   * @returns {number[]} Array[Number] of length size filled w/ min <= num <= max.
   */
  randRangeArray(size, min, max) {
    return this.initArray(size, () => this.randRange(min, max));
  }

  /**
   * Generates an n size array populated with floats.
   *
   * @example
   * random.floatArray(size);
   *
   * @example
   * const size = 256;
   * random.floatArray(size);
   *
   * @public
   * @param size -> Size of the array to generate.
   * @returns {number[]} Array[Number] between 0.0 - 1.0 of length size.
   */
  floatArray(size) {
    return this.initArray(size, () => this.float());
  }

  /**
   * Generates an n size array populated with floats.
   *
   * @example
   * random.float53Array(size);
   *
   * @example
   * const size = 256;
   * random.float53Array(size);
   *
   * @public
   * @param size -> Size of the array to generate.
   * @returns {number[]} Array[Number] between 0.0 - 1.0 of length size.
   */
  float53Array(size) {
    return this.initArray(size, () => this.float53());
  }
}

/**
 * 64 bit modification of PRNG class.
 * @class
 * @extends {PRNG}
 * @param {number | bigint} max -> Max number that can be generated by this generator.
 * @param {number | bigint} seed -> Initial seed.
 */
class PRNG64 extends PRNG {
  /**
   * @constructor
   * @param {number | bigint} max -> Max number that can be generated by this generator.
   * @param {number | bigint} seed -> Initial seed.
   */
  constructor(max, seed) {
    super(max, seed);
  }

  /**
   * Generates and returns the next number in the PRNGs sequence.
   * As this is a 64 bit generator and javascript integers are limited to 53 bits,
   * the generated BigInt result is right-shifted 11 bits; discarding the least significant bits.
   *
   * @example
   * random.int();
   *
   * @example
   * random.int(); // 85424123
   *
   * @public
   * @returns {number} Number less than 2 ** 53 for 64 bit generators.
   */
  int() {
    // Javascript only has 2 ** 53 integer positions, take 64 bit output and only take the upper 53 bits for use
    // as our output Number in int mode.
    return Number(this._int() >> 11n);
  }

  /**
   * Generates a random floating point number.
   *
   * @example
   * random.float();
   *
   * @example
   * random.float(); // 0.234242
   *
   * @public
   * @returns {number} Float between 0.0 - 1.0.
   */
  float() {
    return this.int() / this.max;
  }

  /**
   * Generates a random floating point number.
   *
   * @example
   * random.float53();
   *
   * @example
   * random.float53(); // 0.2342422341231
   *
   * @public
   * @returns {number} Float between 0.0 - 1.0.
   */
  float53() {
    return this.float();
  }
}

/** @type {number} */
const MAX32 = 2 ** 32;
/** @type {number} */
const MAX53 = 2 ** 53;

/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * This implementation has 64 bit output with 64 bits of internal state.
 *
 * @example
 * const random = new XORShift64(11234, 13, 7, 17);
 *
 * @class
 * @extends {PRNG64}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} a -> First bit shift parameter.
 * @param {number | bigint} b -> Second bit shift parameter.
 * @param {number | bigint} c -> Third bit shift parameter.
 */
class XORShift64 extends PRNG64 {
  /**
   * @constructor
   * @param {number | bigint} seed -> Initial seed.
   * @param {number | bigint} a -> First bit shift parameter.
   * @param {number | bigint} b -> Second bit shift parameter.
   * @param {number | bigint} c -> Third bit shift parameter.
   */
  constructor(seed = Date.now(), a = 13, b = 7, c = 17) {
    super(MAX53, BigInt(seed));
    this.seed = seed;
    /**
     * @private
     * @type {BigInt}
     */
    this.a = this.cast(BigInt(a), 64);
    /**
     * @private
     * @type {BigInt}
     */
    this.b = this.cast(BigInt(b), 64);
    /**
     * @private
     * @type {BigInt}
     */
    this.c = this.cast(BigInt(c), 64);
  }

  /**
   * Resets the generator to its original state.
   */
  reset() {
    this.x = this.seed;
  }

  /**
   * Seed getter.
   *
   * @public
   * @returns {number | bigint} Retrieves seed.
   */
  get seed() {
    return this._seed;
  }

  /**
   * Converts seed into BigInt + takes steps to reset generator.
   *
   * @public
   * @param {number | bigint} seed -> New seed to set.
   */
  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 64);
    this.x = this._seed;
  }
  _int() {
    let {
      x
    } = this;
    x ^= x << this.a;
    x = this.cast(x, 64);
    x ^= x >> this.b;
    x ^= x << this.c;
    x = this.cast(x, 64);
    this.x = x;
    return x;
  }
}

/**
 * XorShift generators are fast, efficient generators with good randomness quality.
 * This generator has 32 bit output with 32 bits of internal state.
 *
 * @example
 * const random = new XORShift(11234, 13, 17, 5);
 *
 * @class
 * @extends {PRNG}
 * @param {number | bigint} seed -> Initial seed.
 * @param {number | bigint} a -> First bit shift parameter.
 * @param {number | bigint} b -> Second bit shift parameter.
 * @param {number | bigint} c -> Third bit shift parameter.
 */
class XORShift extends PRNG {
  /**
   * @constructor
   * @param {number | bigint} seed -> Initial seed.
   * @param {number | bigint} a -> First bit shift parameter.
   * @param {number | bigint} b -> Second bit shift parameter.
   * @param {number | bigint} c -> Third bit shift parameter.
   */
  constructor(seed = Date.now(), a = 13, b = 17, c = 5) {
    super(MAX32, BigInt(seed));
    this.seed = seed;
    /**
     * @private
     * @type {BigInt}
     */
    this.a = this.cast(BigInt(a), 32);
    /**
     * @private
     * @type {BigInt}
     */
    this.b = this.cast(BigInt(b), 32);
    /**
     * @private
     * @type {BigInt}
     */
    this.c = this.cast(BigInt(c), 32);
  }

  /**
   * Resets the generator to its original state.
   */
  reset() {
    this.x = this.seed;
  }

  /**
   * Seed getter.
   *
   * @public
   * @returns {number | bigint} Retrieves seed.
   */
  get seed() {
    return this._seed;
  }

  /**
   * Converts seed into BigInt + takes steps to reset generator.
   *
   * @public
   * @param {number | bigint} seed -> New seed to set.
   */
  set seed(seed) {
    this._seed = this.cast(BigInt(seed), 32);
    this.x = this._seed;
  }
  _int() {
    let {
      x
    } = this;
    x ^= x << this.a;
    // Recast to uint32. BigInt on a left shift will always shift and keep digits regardless
    // of previous casting. Therefore re-cast is necessary to ensure code behaves the same w/r to _seed c behaviour.
    x = this.cast(x, 32);
    x ^= x >> this.b;
    x ^= x << this.c;
    x = this.cast(x, 32);
    this.x = x;
    return x;
  }
}

const random = new XORShift64(Date.now());
new XORShift64(Date.now());

const e = {
    DIGITS: "123456789"
  },
  t = "ABCDEFGHI",
  n = e.DIGITS;
let r = null,
  i = null,
  l = null,
  o = null;
const f = {
  easy: 62,
  medium: 53,
  hard: 44,
  "very-hard": 35,
  insane: 26,
  inhuman: 17
};
e.BLANK_CHAR = ".", e.BLANK_BOARD = ".................................................................................", e.generate = function (t, n) {
  "string" != typeof t && void 0 !== t || (t = f[t] || f.easy), t = e._force_range(t, 82, 17);
  let i = "";
  for (let e = 0; e < 81; ++e) i += ".";
  const l = e._get_candidates_map(i),
    o = e._shuffle(r, n);
  for (let i in o) {
    let f = o[i],
      u = e._rand_range(l[f].length, 0, n),
      a = l[f][u];
    if (!e._assign(l, f, a)) break;
    let _ = [];
    for (let e in r) {
      let t = r[e];
      1 == l[t].length && _.push(l[t]);
    }
    if (_.length >= t && e._strip_dups(_).length >= 8) {
      let i = "",
        o = [];
      for (let t in r) {
        let n = r[t];
        1 == l[n].length ? (i += l[n], o.push(t)) : i += e.BLANK_CHAR;
      }
      let f = o.length;
      if (f > t) {
        o = e._shuffle(o, n);
        for (let n = 0; n < f - t; ++n) {
          let t = parseInt(o[n]);
          i = i.substr(0, t) + e.BLANK_CHAR + i.substr(t + 1);
        }
      }
      if (e.solve(i)) return i;
    }
  }
  return e.generate(t, n);
}, e.solve = function (t, n) {
  let r = e.validate_board(t);
  if (!0 !== r) throw r;
  let i = 0;
  for (let n in t) t[n] !== e.BLANK_CHAR && e._in(t[n], e.DIGITS) && ++i;
  if (i < 17) throw "Too few givens. Minimum givens is 17";
  n = n || !1;
  let l = e._get_candidates_map(t),
    o = e._search(l, n);
  if (o) {
    let e = "";
    for (let t in o) e += o[t];
    return e;
  }
  return !1;
}, e.get_candidates = function (t) {
  let n = e.validate_board(t);
  if (!0 !== n) throw n;
  let r = e._get_candidates_map(t);
  if (!r) return !1;
  let i = [],
    l = [],
    o = 0;
  for (let e in r) {
    let t = r[e];
    l.push(t), o % 9 == 8 && (i.push(l), l = []), ++o;
  }
  return i;
}, e._get_candidates_map = function (t) {
  let n = e.validate_board(t);
  if (!0 !== n) throw n;
  let i = {},
    l = e._get_square_vals_map(t);
  for (let t in r) i[r[t]] = e.DIGITS;
  for (let t in l) {
    let n = l[t];
    if (e._in(n, e.DIGITS)) {
      if (!e._assign(i, t, n)) return !1;
    }
  }
  return i;
}, e._search = function (t, n) {
  if (!t) return !1;
  n = n || !1;
  let i = 0;
  for (let e in r) {
    let n = t[r[e]].length;
    n > i && (i = n);
  }
  if (1 === i) return t;
  let l = 10,
    o = null;
  for (let e in r) {
    let n = r[e],
      i = t[n].length;
    i < l && i > 1 && (l = i, o = n);
  }
  let f = t[o];
  if (n) for (let r = f.length - 1; r >= 0; --r) {
    let i = f[r],
      l = JSON.parse(JSON.stringify(t)),
      u = e._search(e._assign(l, o, i), n);
    if (u) return u;
  } else for (let n in f) {
    let r = f[n],
      i = JSON.parse(JSON.stringify(t)),
      l = e._search(e._assign(i, o, r));
    if (l) return l;
  }
  return !1;
}, e._assign = function (t, n, r) {
  let i = t[n].replace(r, "");
  for (let r in i) {
    let l = i[r];
    if (!e._eliminate(t, n, l)) return !1;
  }
  return t;
}, e._eliminate = function (t, n, r) {
  if (!e._in(r, t[n])) return t;
  t[n] = t[n].replace(r, "");
  let i = t[n].length;
  if (1 === i) {
    let r = t[n];
    for (let i in o[n]) {
      let l = o[n][i];
      if (!e._eliminate(t, l, r)) return !1;
    }
  }
  if (0 === i) return !1;
  for (let i in l[n]) {
    let o = l[n][i],
      f = [];
    for (let n in o) {
      let i = o[n];
      e._in(r, t[i]) && f.push(i);
    }
    if (0 === f.length) return !1;
    if (1 === f.length) {
      if (!e._assign(t, f[0], r)) return !1;
    }
  }
  return t;
}, e._get_square_vals_map = function (e) {
  let t = {};
  if (e.length != r.length) throw "Board/squares length mismatch.";
  for (let n in r) t[r[n]] = e[n];
  return t;
}, e._get_square_units_map = function (e, t) {
  let n = {};
  for (let r in e) {
    let i = e[r],
      l = [];
    for (let e in t) {
      let n = t[e];
      -1 !== n.indexOf(i) && l.push(n);
    }
    n[i] = l;
  }
  return n;
}, e._get_square_peers_map = function (e, t) {
  let n = {};
  for (let r in e) {
    let i = e[r],
      l = t[i],
      o = [];
    for (let e in l) {
      let t = l[e];
      for (let e in t) {
        let n = t[e];
        -1 === o.indexOf(n) && n !== i && o.push(n);
      }
    }
    n[i] = o;
  }
  return n;
}, e._get_all_units = function (t, n) {
  let r = [];
  for (let i in t) r.push(e._cross(t[i], n));
  for (let i in n) r.push(e._cross(t, n[i]));
  let i = ["ABC", "DEF", "GHI"],
    l = ["123", "456", "789"];
  for (let t in i) for (let n in l) r.push(e._cross(i[t], l[n]));
  return r;
}, e.board_string_to_grid = function (e) {
  let t = [],
    n = [];
  for (let r in e) n.push(e[r]), r % 9 == 8 && (t.push(n), n = []);
  return t;
}, e.board_grid_to_string = function (e) {
  let t = "";
  for (let n = 0; n < 9; ++n) for (let r = 0; r < 9; ++r) t += e[n][r];
  return t;
}, e.print_board = function (t) {
  let n = e.validate_board(t);
  if (!0 !== n) throw n;
  let r = "";
  for (let e in t) {
    r += t[e] + " ", e % 3 == 2 && (r += "  "), e % 9 == 8 && (r += "\n"), e % 27 == 26 && (r += "\n");
  }
  console.log(r);
}, e.validate_board = function (t) {
  if (!t) return "Empty board";
  if (81 !== t.length) return "Invalid board size. Board must be exactly 81 squares.";
  for (let n in t) if (!e._in(t[n], e.DIGITS) && t[n] !== e.BLANK_CHAR) return "Invalid board character encountered at index " + n + ": " + t[n];
  return !0;
}, e._cross = function (e, t) {
  let n = [];
  for (let r in e) for (let i in t) n.push(e[r] + t[i]);
  return n;
}, e._in = function (e, t) {
  return -1 !== t.indexOf(e);
}, e._first_true = function (e) {
  for (let t in e) if (e[t]) return e[t];
  return !1;
}, e._shuffle = function (t, n) {
  const r = [];
  for (let e = 0; e < t.length; ++e) r.push(!1);
  for (let i in t) {
    let l = e._rand_range(t.length, 0, n);
    for (; r[l];) l = l + 1 > t.length - 1 ? 0 : l + 1;
    r[l] = t[i];
  }
  return r;
}, e._rand_range = function (e, t, n) {
  if (e) {
    let r;
    return r = n ? n.float() : Math.random(), Math.floor(r * (e - t)) + t;
  }
  throw "Range undefined";
}, e._strip_dups = function (e) {
  let t = [],
    n = {};
  for (let r in e) {
    let i = e[r];
    n[i] || (t.push(i), n[i] = !0);
  }
  return t;
}, e._force_range = function (e, t, n) {
  return (e = e || 0) < (n = n || 0) ? n : e > t ? t : e;
}, r = e._cross(t, n), i = e._get_all_units(t, n), l = e._get_square_units_map(r, i), o = e._get_square_peers_map(r, l);

var sudokuSolveLib = e;
var ProhibitedOverwriteError = /*#__PURE__*/function (_Error) {
  _inherits(ProhibitedOverwriteError, _Error);
  var _super = _createSuper(ProhibitedOverwriteError);
  function ProhibitedOverwriteError() {
    _classCallCheck(this, ProhibitedOverwriteError);
    return _super.apply(this, arguments);
  }
  return _createClass(ProhibitedOverwriteError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var SudokuSquareNode = /*#__PURE__*/function () {
  function SudokuSquareNode(idx, domElement) {
    _classCallCheck(this, SudokuSquareNode);
    this.idx = idx;
    this.domElement = domElement;
    this._valueDomElement = domElement.getElementsByTagName('strong')[0];
    this._pencilmarkDomElements = domElement.getElementsByClassName('pencilmarks')[0].children;
    this._activePencilmarks = new Set();
    this._isVisible = false;
    this._isError = false;
    this._isGiven = false;
    this._isSelected = false;
    this._highlightType = 'none';
  }
  _createClass(SudokuSquareNode, [{
    key: "updateView",
    value: function updateView() {
      // update domElement css class name controlling background color
      if (this._isSelected && this._highlightType === 'hover' || this._highlightType === 'hover-selected') {
        this._highlightType = 'hover-selected';
      } else if (this._isSelected) {
        this._highlightType = 'selected';
      }
      this.domElement.className = "highlight-".concat(this._highlightType);

      // update _valueDomElement css class names controlling visibility
      var valueClassName = 'hidden';
      if (this._isVisible) {
        valueClassName = 'visible';
        if (this._isError) {
          valueClassName = 'visible error';
        } else if (this._isGiven) {
          valueClassName = 'visible given';
        }
      }
      this._valueDomElement.className = valueClassName;
      // update _pencilmarkDomElements class names
      // start by setting all pencilmarks to hidden, then unhiding those which
      // are active
      var _iterator = _createForOfIteratorHelper(this._pencilmarkDomElements),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var next = _step.value;
          next.className = 'hidden';
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (this._isVisible) {
        // don't render pencilmarks if the square is filled
        return;
      }
      var _iterator2 = _createForOfIteratorHelper(this._activePencilmarks),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var nextActive = _step2.value;
          // unhide the pencilmark element with innerHTML matching the number
          var nextElement = this._pencilmarkDomElements[nextActive - 1];
          nextElement.className = 'visible';
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "clearHighlights",
    value: function clearHighlights() {
      this._highlightType = 'none';
      this.updateView();
    }
  }, {
    key: "setSelected",
    value: function setSelected(isSelected) {
      this._isSelected = isSelected;
      if (this._isSelected) {
        this.updateView();
        return;
      }
      if (this._highlightType === 'hover-selected') {
        this.updateView();
      } else {
        this.clearHighlights();
      }
    }
  }, {
    key: "setHighlightHoverOrFocused",
    value: function setHighlightHoverOrFocused() {
      this._highlightType = 'hover';
      this.updateView();
    }
  }, {
    key: "setTextColorError",
    value: function setTextColorError() {
      var isError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._isError = isError;
      this.updateView();
    }
  }, {
    key: "clearTextColorError",
    value: function clearTextColorError() {
      this.setTextColorError(false);
    }
  }, {
    key: "setTextColorGiven",
    value: function setTextColorGiven() {
      var isGiven = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this._isGiven = isGiven;
      this.updateView();
    }
  }, {
    key: "clearTextColorGiven",
    value: function clearTextColorGiven() {
      this.setTextColorGiven(false);
    }
  }, {
    key: "setValue",
    value: function setValue(number) {
      var isOverridingGiven = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!isOverridingGiven && this._isGiven) {
        throw new ProhibitedOverwriteError('Attempted to overwrite given');
      }
      if (number === '.') {
        this._isVisible = false;
        this.updateView();
        return;
      }
      // this.clearPencilMarks()
      this._isVisible = true;
      this.setTextColorGiven(isOverridingGiven);
      this._valueDomElement.innerHTML = number;
      this.updateView();
    }
  }, {
    key: "togglePencilMark",
    value: function togglePencilMark(number) {
      console.log(number);
      if (number <= 0 || number > 9) {
        return;
      }
      if (this._activePencilmarks.has(number)) {
        this._activePencilmarks["delete"](number);
        this.updateView();
        return;
      }
      this._activePencilmarks.add(number);
      this.updateView();
    }
  }, {
    key: "clearPencilMarks",
    value: function clearPencilMarks() {
      this._activePencilmarks = new Set();
      this.updateView();
    }
  }]);
  return SudokuSquareNode;
}();
var SudokuGrid = /*#__PURE__*/function () {
  function SudokuGrid(doc) {
    _classCallCheck(this, SudokuGrid);
    this._nodes = [];
    this._nodes.length = 81;
    this._selectedIdx = -1;
    this._sudokuStr = '.................................................................................';
    this._isInputEnabled = true;
    var gridDiv = doc.getElementById('sudoku');
    var templateBigSquare = doc.getElementById('template-big-square');
    templateBigSquare.removeAttribute('id');
    var templateSquare = doc.getElementById('template-square');
    templateSquare.removeAttribute('id');

    // the following array represents all delta values which, when added to the
    // index of the top left corner of a 3x3 square in the sudoku grid, will
    // yield all 9 squares within the 3x3 square
    // TODO: candidate for refactor due to repetition
    var squareIdxDelta = [getIdxByRowCol(0, 0), getIdxByRowCol(0, 1), getIdxByRowCol(0, 2), getIdxByRowCol(1, 0), getIdxByRowCol(1, 1), getIdxByRowCol(1, 2), getIdxByRowCol(2, 0), getIdxByRowCol(2, 1), getIdxByRowCol(2, 2)];
    // the following array represents all indices of top left corners of the nine
    // 3x3 squares in the sudoku grid
    var squareIdxsTopLeftOnly = [getIdxByRowCol(0, 0), getIdxByRowCol(0, 3), getIdxByRowCol(0, 6), getIdxByRowCol(3, 0), getIdxByRowCol(3, 3), getIdxByRowCol(3, 6), getIdxByRowCol(6, 0), getIdxByRowCol(6, 3), getIdxByRowCol(6, 6)];
    for (var i = 0; i < 9; i++) {
      var nextBigSquare = templateBigSquare.cloneNode(true);
      var topLeftIdx = squareIdxsTopLeftOnly[i];
      for (var j = 0; j < 9; j++) {
        var nextSquare = templateSquare.cloneNode(true);
        nextBigSquare.appendChild(nextSquare);
        var nextIdx = topLeftIdx + squareIdxDelta[j];
        this.setupSquareEvents(nextSquare, nextIdx);
        var nextNode = new SudokuSquareNode(nextIdx, nextSquare);
        this._nodes[nextIdx] = nextNode;
      }
      gridDiv.appendChild(nextBigSquare);
    }
    templateBigSquare.remove();
    templateSquare.remove();
  }
  _createClass(SudokuGrid, [{
    key: "setupSquareEvents",
    value: function setupSquareEvents(domElement, idx) {
      var _this = this;
      domElement.addEventListener('mouseenter', function (_) {
        _this.onMouseEnter(idx);
      });
      domElement.addEventListener('mouseleave', function (_) {
        _this.onMouseLeave(idx);
      });
      domElement.addEventListener('click', function (_) {
        _this.onClick(idx);
      });
      domElement.addEventListener('keydown', function (event) {
        _this.onKeyDown(idx, event.key, event.ctrlKey);
      });
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(idx) {
      this.getNodeByIdx(idx).setHighlightHoverOrFocused();
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave(idx) {
      this.getNodeByIdx(idx).clearHighlights();
    }
  }, {
    key: "onClick",
    value: function onClick(idx) {
      if (this._selectedIdx !== -1) {
        this.getNodeByIdx(this._selectedIdx).setSelected(false);
      }
      this.getNodeByIdx(idx).setSelected(true);
      this._selectedIdx = idx;
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(key, isCtrlKeyDown) {
      if (!this._isInputEnabled) {
        return;
      }
      this._isInputEnabled = false;
      switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this._onNumberKeyDown(key, isCtrlKeyDown);
          break;
        case 'Backspace':
        case 'Delete':
          this._onDeleteKeyDown();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
          this._onArrowKeyDown(key);
          break;
      }
      this._isInputEnabled = true;
    }
  }, {
    key: "_onNumberKeyDown",
    value: function _onNumberKeyDown(key, isCtrlKeyDown) {
      if (this._selectedIdx === -1) {
        return;
      }
      var node = this.getNodeByIdx(this._selectedIdx);
      if (isCtrlKeyDown) {
        node.togglePencilMark(key);
        return;
      }
      try {
        node.setValue(key);
        this._sudokuStr = setValueByIdx(this._sudokuStr, this._selectedIdx, key);
      } catch (e) {
        if (!(e instanceof ProhibitedOverwriteError)) {
          throw e;
        }
      }
      this._onSudokuStrUpdated();
    }
  }, {
    key: "_onDeleteKeyDown",
    value: function _onDeleteKeyDown() {
      if (this._selectedIdx === -1) {
        return;
      }
      this.getNodeByIdx(this._selectedIdx).setValue('.');
      this._sudokuStr = setValueByIdx(this._sudokuStr, this._selectedIdx, '.');
      this._onSudokuStrUpdated();
    }
  }, {
    key: "_onArrowKeyDown",
    value: function _onArrowKeyDown(key) {
      if (this._selectedIdx === -1) {
        // select the first square if none is selected
        this.onClick(getIdxByRowCol(0, 0));
        return;
      }
      var _getRowColByIdx = getRowColByIdx(this._selectedIdx),
        _getRowColByIdx2 = _slicedToArray(_getRowColByIdx, 2),
        row = _getRowColByIdx2[0],
        col = _getRowColByIdx2[1];
      switch (key) {
        case 'ArrowLeft':
          if (col == 0) {
            col = 8;
          } else {
            col -= 1;
          }
          break;
        case 'ArrowUp':
          if (row == 0) {
            row = 8;
          } else {
            row -= 1;
          }
          break;
        case 'ArrowRight':
          if (col == 8) {
            col = 0;
          } else {
            col += 1;
          }
          break;
        case 'ArrowDown':
          if (row == 8) {
            row = 0;
          } else {
            row += 1;
          }
          break;
      }
      this.onClick(getIdxByRowCol(row, col));
    }
  }, {
    key: "_onSudokuStrUpdated",
    value: function _onSudokuStrUpdated() {
      var sudokuStr = this._sudokuStr;
      // check if the sudoku is solved
      if (isSolved(sudokuStr)) {
        this._isInputEnabled = false;
        alert('Congratulations, you solved the sudoku!');
      }
      // reset the text color of all squares
      var _iterator3 = _createForOfIteratorHelper(this._nodes),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;
          node.clearTextColorError();
        }

        // check for invalid squares
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var invalidIdxs = getInvalidIdxsAll(sudokuStr);
      if (invalidIdxs.size === 0) {
        return;
      }
      // set the text color of invalid squares to red
      var _iterator4 = _createForOfIteratorHelper(invalidIdxs),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var idx = _step4.value;
          this.getNodeByIdx(idx).setTextColorError();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "getNodeByIdx",
    value: function getNodeByIdx(idx) {
      return this._nodes[idx];
    }
  }, {
    key: "populateWithSudokuStr",
    value: function populateWithSudokuStr(sudokuStr) {
      validateSudokuStr(sudokuStr);
      this._sudokuStr = sudokuStr;
      this._nodes.forEach(function (node) {
        node.clearHighlights();
        node.clearPencilMarks();
        node.clearTextColorError();
        node.clearTextColorGiven();
      });
      for (var idx in this._sudokuStr) {
        var nextNode = this.getNodeByIdx(idx);
        nextNode.setValue(this._sudokuStr[idx], true);
      }
    }
  }]);
  return SudokuGrid;
}();
var setValueByIdx = function setValueByIdx(sudokuStr, idx, setTo) {
  validateSudokuStr(sudokuStr);
  var result = '';
  for (var i = 0; i < sudokuStr.length; i++) {
    if (i == idx) {
      result += setTo;
      continue;
    }
    result += sudokuStr[i];
  }
  validateSudokuStr(result);
  return result;
};
var setValueByRowCol = function setValueByRowCol(sudokuStr, row, col, setTo) {
  return setValueByIdx(sudokuStr, getIdxByRowCol(row, col), setTo);
};
var getValueByRowCol = function getValueByRowCol(sudokuStr, row, col) {
  // row, col, idx
  // 0, 0, 0
  // 0, 1, 1
  // 1, 0, 9
  // 1, 1, 10
  // 1, 8, 17
  // x, y, x*9+y

  validateSudokuStr(sudokuStr);
  if (0 > row || 9 <= row) {
    throw RangeError('Row must be >= 0 and < 9');
  }
  if (0 > col || 9 <= col) {
    throw RangeError('Col must be >= 0 and < 9');
  }
  var idx = getIdxByRowCol(row, col);
  return sudokuStr[idx];
};
var getIdxByRowCol = function getIdxByRowCol(row, col) {
  return row * 9 + col;
};
var getRowColByIdx = function getRowColByIdx(idx) {
  return [Math.trunc(idx / 9), idx % 9];
};
var getInvalidIdxsByRowsRule = function getInvalidIdxsByRowsRule(sudokuStr) {
  validateSudokuStr(sudokuStr);

  // the following array represents all delta values which, when added to the
  // index of the leftmost square in a row of the sudoku grid, will yield all
  // 9 squares within the row
  var squareIdxDelta = [getIdxByRowCol(0, 0), getIdxByRowCol(0, 1), getIdxByRowCol(0, 2), getIdxByRowCol(0, 3), getIdxByRowCol(0, 4), getIdxByRowCol(0, 5), getIdxByRowCol(0, 6), getIdxByRowCol(0, 7), getIdxByRowCol(0, 8)];
  // the following array represents all indices of squares in the leftmost
  // column of the nine rows in the sudoku grid
  var squareIdxsLeftOnly = [getIdxByRowCol(0, 0), getIdxByRowCol(1, 0), getIdxByRowCol(2, 0), getIdxByRowCol(3, 0), getIdxByRowCol(4, 0), getIdxByRowCol(5, 0), getIdxByRowCol(6, 0), getIdxByRowCol(7, 0), getIdxByRowCol(8, 0)];

  // accumulate invalid indices to return at the end of the function using a
  // set to guard against duplicate indices
  var invalidIdxs = new Set();
  for (var _i = 0, _squareIdxsLeftOnly = squareIdxsLeftOnly; _i < _squareIdxsLeftOnly.length; _i++) {
    var start = _squareIdxsLeftOnly[_i];
    var idxsThisRow = {};
    var _iterator5 = _createForOfIteratorHelper(squareIdxDelta),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var delta = _step5.value;
        var nextIdx = start + delta;
        var next = sudokuStr[nextIdx];
        if (next === '.') {
          continue;
        }
        if (idxsThisRow.hasOwnProperty(next)) {
          idxsThisRow[next].push(nextIdx);
          var _iterator6 = _createForOfIteratorHelper(idxsThisRow[next]),
            _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var idx = _step6.value;
              invalidIdxs.add(idx);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          continue;
        }
        idxsThisRow[next] = [nextIdx];
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }
  return invalidIdxs;
};
var getInvalidIdxsByColsRule = function getInvalidIdxsByColsRule(sudokuStr) {
  validateSudokuStr(sudokuStr);

  // the following array represents all delta values which, when added to the
  // index of the topmost square in a column of the sudoku grid, will yield all
  // 9 squares within the column
  var squareIdxDelta = [getIdxByRowCol(0, 0), getIdxByRowCol(1, 0), getIdxByRowCol(2, 0), getIdxByRowCol(3, 0), getIdxByRowCol(4, 0), getIdxByRowCol(5, 0), getIdxByRowCol(6, 0), getIdxByRowCol(7, 0), getIdxByRowCol(8, 0)];
  // the following array represents all indices of squares in the topmost
  // row of the nine columns in the sudoku grid
  var squareIdxsTopOnly = [getIdxByRowCol(0, 0), getIdxByRowCol(0, 1), getIdxByRowCol(0, 2), getIdxByRowCol(0, 3), getIdxByRowCol(0, 4), getIdxByRowCol(0, 5), getIdxByRowCol(0, 6), getIdxByRowCol(0, 7), getIdxByRowCol(0, 8)];

  // accumulate invalid indices to return at the end of the function using a
  // set to guard against duplicate indices
  var invalidIdxs = new Set();
  for (var _i2 = 0, _squareIdxsTopOnly = squareIdxsTopOnly; _i2 < _squareIdxsTopOnly.length; _i2++) {
    var start = _squareIdxsTopOnly[_i2];
    var idxsThisColumn = {};
    var _iterator7 = _createForOfIteratorHelper(squareIdxDelta),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var delta = _step7.value;
        var nextIdx = start + delta;
        var next = sudokuStr[nextIdx];
        if (next === '.') {
          continue;
        }
        if (idxsThisColumn.hasOwnProperty(next)) {
          idxsThisColumn[next].push(nextIdx);
          var _iterator8 = _createForOfIteratorHelper(idxsThisColumn[next]),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var idx = _step8.value;
              invalidIdxs.add(idx);
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
          continue;
        }
        idxsThisColumn[next] = [nextIdx];
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
  return invalidIdxs;
};
var getInvalidIdxsBySquaresRule = function getInvalidIdxsBySquaresRule(sudokuStr) {
  validateSudokuStr(sudokuStr);

  // the following array represents all delta values which, when added to the
  // index of the top left corner of a 3x3 square in the sudoku grid, will
  // yield all 9 squares within the 3x3 square
  var squareIdxDelta = [getIdxByRowCol(0, 0), getIdxByRowCol(0, 1), getIdxByRowCol(0, 2), getIdxByRowCol(1, 0), getIdxByRowCol(1, 1), getIdxByRowCol(1, 2), getIdxByRowCol(2, 0), getIdxByRowCol(2, 1), getIdxByRowCol(2, 2)];
  // the following array represents all indices of top left corners of the nine
  // 3x3 squares in the sudoku grid
  var squareIdxsTopLeftOnly = [getIdxByRowCol(0, 0), getIdxByRowCol(0, 3), getIdxByRowCol(0, 6), getIdxByRowCol(3, 0), getIdxByRowCol(3, 3), getIdxByRowCol(3, 6), getIdxByRowCol(6, 0), getIdxByRowCol(6, 3), getIdxByRowCol(6, 6)];

  // accumulate invalid indices to return at the end of the function using a
  // set to guard against duplicate indices
  var invalidIdxs = new Set();
  for (var _i3 = 0, _squareIdxsTopLeftOnl = squareIdxsTopLeftOnly; _i3 < _squareIdxsTopLeftOnl.length; _i3++) {
    var topLeft = _squareIdxsTopLeftOnl[_i3];
    var idxsThisSquare = {};
    var _iterator9 = _createForOfIteratorHelper(squareIdxDelta),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var delta = _step9.value;
        var nextIdx = topLeft + delta;
        var next = sudokuStr[nextIdx];
        if (next === '.') {
          continue;
        }
        if (idxsThisSquare.hasOwnProperty(next)) {
          idxsThisSquare[next].push(nextIdx);
          var _iterator10 = _createForOfIteratorHelper(idxsThisSquare[next]),
            _step10;
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var idx = _step10.value;
              invalidIdxs.add(idx);
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
          continue;
        }
        idxsThisSquare[next] = [nextIdx];
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  }
  return invalidIdxs;
};
var getInvalidIdxsAll = function getInvalidIdxsAll(sudokuStr) {
  var result = new Set();
  var rowsRuleIdxs = getInvalidIdxsByColsRule(sudokuStr);
  var _iterator11 = _createForOfIteratorHelper(rowsRuleIdxs),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var elem = _step11.value;
      result.add(elem);
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
  var colsRuleIdxs = getInvalidIdxsByRowsRule(sudokuStr);
  var _iterator12 = _createForOfIteratorHelper(colsRuleIdxs),
    _step12;
  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      var _elem = _step12.value;
      result.add(_elem);
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
  var squaresRuleIdxs = getInvalidIdxsBySquaresRule(sudokuStr);
  var _iterator13 = _createForOfIteratorHelper(squaresRuleIdxs),
    _step13;
  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var _elem2 = _step13.value;
      result.add(_elem2);
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }
  return result;
};

// Correctly formatted sudoku strings are 81 characters long and only contain
// numeric digits 1-9 and '.'
var validateSudokuStr = function validateSudokuStr(sudokuStr) {
  if (sudokuStr.length !== 81) {
    throw Error("Illegally formatted sudoku string, length is ".concat(sudokuStr.length, ", !== 81"));
  }
  var validChars = '123456789.';
  var _iterator14 = _createForOfIteratorHelper(sudokuStr),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var nextChar = _step14.value;
      if (!validChars.includes(nextChar)) {
        throw Error("Illegally formatted sudoku string, bad character ".concat(nextChar));
      }
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
};
var getEmptyIdxs = function getEmptyIdxs(sudokuStr) {
  validateSudokuStr(sudokuStr);
  var result = new Set();
  for (var i = 0; i < sudokuStr.length; i++) {
    var nextChar = sudokuStr[i];
    if (nextChar == '.') {
      result.add(i);
    }
  }
  return result;
};
var isFilled = function isFilled(sudokuStr) {
  validateSudokuStr(sudokuStr);
  var emptyIdxs = getEmptyIdxs(sudokuStr);
  return emptyIdxs.size == 0;
};
var isValid = function isValid(sudokuStr) {
  validateSudokuStr(sudokuStr);
  if (getInvalidIdxsByColsRule(sudokuStr).size != 0) {
    return false;
  }
  if (getInvalidIdxsByRowsRule(sudokuStr).size != 0) {
    return false;
  }
  if (getInvalidIdxsBySquaresRule(sudokuStr).size != 0) {
    return false;
  }
  return true;
};
var isSolved = function isSolved(sudokuStr) {
  return isValid(sudokuStr) && isFilled(sudokuStr);
};
var SudokuGenLibAdapter = /*#__PURE__*/function () {
  function SudokuGenLibAdapter(randomSeed) {
    _classCallCheck(this, SudokuGenLibAdapter);
    if (randomSeed) {
      this.rng = new XORShift(randomSeed);
    } else {
      this.rng = random;
    }
    this._seed = randomSeed;
  }
  _createClass(SudokuGenLibAdapter, [{
    key: "generate",
    value: function generate(nGivens) {
      nGivens = nGivens || 50;
      // The type of nGivens must be Number for this to work correctly
      var result = e.generate(parseInt(nGivens), this.rng);
      validateSudokuStr(result);
      return result;
    }
  }, {
    key: "reset",
    value: function reset() {
      return new SudokuGenLibAdapter(this._seed);
    }
  }]);
  return SudokuGenLibAdapter;
}();
var SudokuSolveLibAdapter = /*#__PURE__*/function () {
  function SudokuSolveLibAdapter() {
    _classCallCheck(this, SudokuSolveLibAdapter);
  }
  _createClass(SudokuSolveLibAdapter, [{
    key: "solve",
    value: function solve(sudokuStr) {
      return sudokuSolveLib.solve(sudokuStr);
    }
  }]);
  return SudokuSolveLibAdapter;
}();

// Site setup
try {
  var grid = new SudokuGrid(document);

  // set up keyboard events
  document.onkeydown = function (event) {
    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
    }
    grid.onKeyDown(event.key, event.ctrlKey);
  };

  // Generate the initial sudoku
  // TODO: add fixed seed depending on if we are using a test adapter for the
  // browser
  var generator = new SudokuGenLibAdapter();
  var nGivens = 62;
  grid.populateWithSudokuStr(generator.generate(nGivens));

  // link the range input to its label
  var output = document.getElementById('difficulty-output');
  var input = document.getElementById('difficulty-range');
  input.addEventListener('input', function (event) {
    output.textContent = event.target.value;
    nGivens = event.target.value;
  });
  output.textContent = input.value;
  nGivens = input.value;

  // link the generate button with sudoku generation
  document.getElementById('generate-btn').addEventListener('click', function (event) {
    var result = generator.generate(nGivens);
    grid.populateWithSudokuStr(result);
  });
} catch (e) {}

export { SudokuGenLibAdapter, SudokuGrid, SudokuSolveLibAdapter, SudokuSquareNode, getEmptyIdxs, getIdxByRowCol, getInvalidIdxsByColsRule, getInvalidIdxsByRowsRule, getInvalidIdxsBySquaresRule, getRowColByIdx, getValueByRowCol, isFilled, isSolved, isValid, setValueByRowCol, validateSudokuStr };
