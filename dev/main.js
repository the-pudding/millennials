// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"or4r":[function(require,module,exports) {
var global = arguments[3];
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

},{}],"WEtf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// device sniffing for mobile
var isMobile = {
  android: function android() {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: function blackberry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  ios: function ios() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  opera: function opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  windows: function windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.android() || isMobile.blackberry() || isMobile.ios() || isMobile.opera() || isMobile.windows();
  }
};
var _default = isMobile;
exports.default = _default;
},{}],"HGko":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Robert Penner's easeInOutQuad
// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js
var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks
  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)

  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)

  var easing = void 0; // easing function                        (function)

  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)

  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)

  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)
  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  } // element offset helper


  function top(element) {
    return element.getBoundingClientRect().top + start;
  } // rAF loop helper


  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    } // determine time spent scrolling so far


    timeElapsed = timeCurrent - timeStart; // calculate next scroll position

    next = easing(timeElapsed, start, distance, duration); // scroll to it

    window.scrollTo(0, next); // check progress

    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  } // scroll finished helper


  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance); // if scrolling to an element, and accessibility is enabled

    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1'); // focus the element

      element.focus();
    } // if it exists, fire the callback


    if (typeof callback === 'function') {
      callback();
    } // reset time for next jump


    timeStart = false;
  } // API


  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // resolve options, or use defaults

    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called

    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false; // cache starting position

    start = location(); // resolve target

    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to

        a11y = false; // make sure accessibility is off

        stop = start + target;
        break;
      // scroll to element (node)
      // bounding rect is relative to the viewport

      case 'object':
        element = target;
        stop = top(element);
        break;
      // scroll to element (selector)
      // bounding rect is relative to the viewport

      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    } // resolve scroll distance, accounting for offset


    distance = stop - start + offset; // resolve duration

    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;
      // function passed the distance of the scroll

      case 'function':
        duration = options.duration(distance);
        break;
    } // start the loop


    window.requestAnimationFrame(loop);
  } // expose only the jump method


  return jump;
}; // export singleton


var singleton = jumper();
var _default = singleton;
exports.default = _default;
},{}],"hTgy":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function generateEmoji() {
  var emojis = ['😄', '😃', '😀', '😊', '☺', '😉', '😍', '😘', '😚', '😗', '😙', '😜', '😝', '😛', '😳', '😁', '😔', '😌', '😒', '😞', '😣', '😢', '😂', '😭', '😪', '😥', '😰', '😅', '😓', '😩', '😫', '😨', '😱', '😠', '😡', '😤', '😖', '😆', '😋', '😷', '😎', '😴', '😵', '😲', '😟', '😦', '😧', '😈', '👿', '😮', '😬', '😐', '😕', '😯', '😶', '😇', '😏', '😑', '👲', '👳', '👮', '👷', '💂', '👶', '👦', '👧', '👨', '👩', '👴', '👵', '👱', '👼', '👸', '😺', '😸', '😻', '😽', '😼', '🙀', '😿', '😹', '😾', '👹', '👺', '🙈', '🙉', '🙊', '💀', '👽', '💩', '🔥', '✨', '🌟', '💫', '💥', '💢', '💦', '💧', '💤', '💨', '👂', '👀', '👃', '👅', '👄', '👍', '👎', '👌', '👊', '✊', '✌', '👋', '✋', '👐', '👆', '👇', '👉', '👈', '🙌', '🙏', '☝', '👏', '💪', '🚶', '🏃', '💃', '👫', '👪', '👬', '👭', '💏', '💑', '👯', '🙆', '🙅', '💁', '🙋', '💆', '💇', '💅', '👰', '🙎', '🙍', '🙇', '🎩', '👑', '👒', '👟', '👞', '👡', '👠', '👢', '👕', '👔', '👚', '👗', '🎽', '👖', '👘', '👙', '💼', '👜', '👝', '👛', '👓', '🎀', '🌂', '💄', '💛', '💙', '💜', '💚', '❤', '💔', '💗', '💓', '💕', '💖', '💞', '💘', '💌', '💋', '💍', '💎', '👤', '👥', '💬', '👣', '💭', '🐶', '🐺', '🐱', '🐭', '🐹', '🐰', '🐸', '🐯', '🐨', '🐻', '🐷', '🐽', '🐮', '🐗', '🐵', '🐒', '🐴', '🐑', '🐘', '🐼', '🐧', '🐦', '🐤', '🐥', '🐣', '🐔', '🐍', '🐢', '🐛', '🐝', '🐜', '🐞', '🐌', '🐙', '🐚', '🐠', '🐟', '🐬', '🐳', '🐋', '🐄', '🐏', '🐀', '🐃', '🐅', '🐇', '🐉', '🐎', '🐐', '🐓', '🐕', '🐖', '🐁', '🐂', '🐲', '🐡', '🐊', '🐫', '🐪', '🐆', '🐈', '🐩', '🐾', '💐', '🌸', '🌷', '🍀', '🌹', '🌻', '🌺', '🍁', '🍃', '🍂', '🌿', '🌾', '🍄', '🌵', '🌴', '🌲', '🌳', '🌰', '🌱', '🌼', '🌐', '🌞', '🌝', '🌚', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌜', '🌛', '🌙', '🌍', '🌎', '🌏', '🌋', '🌌', '🌠', '⭐', '☀', '⛅', '☁', '⚡', '☔', '❄', '⛄', '🌀', '🌁', '🌈', '🌊', '🎍', '💝', '🎎', '🎒', '🎓', '🎏', '🎆', '🎇', '🎐', '🎑', '🎃', '👻', '🎅', '🎄', '🎁', '🎋', '🎉', '🎊', '🎈', '🎌', '🔮', '🎥', '📷', '📹', '📼', '💿', '📀', '💽', '💾', '💻', '📱', '☎', '📞', '📟', '📠', '📡', '📺', '📻', '🔊', '🔉', '🔈', '🔇', '🔔', '🔕', '📢', '📣', '⏳', '⌛', '⏰', '⌚', '🔓', '🔒', '🔏', '🔐', '🔑', '🔎', '💡', '🔦', '🔆', '🔅', '🔌', '🔋', '🔍', '🛁', '🛀', '🚿', '🚽', '🔧', '🔩', '🔨', '🚪', '🚬', '💣', '🔫', '🔪', '💊', '💉', '💰', '💴', '💵', '💷', '💶', '💳', '💸', '📲', '📧', '📥', '📤', '✉', '📩', '📨', '📯', '📫', '📪', '📬', '📭', '📮', '📦', '📝', '📄', '📃', '📑', '📊', '📈', '📉', '📜', '📋', '📅', '📆', '📇', '📁', '📂', '✂', '📌', '📎', '✒', '✏', '📏', '📐', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📚', '📖', '🔖', '📛', '🔬', '🔭', '📰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎻', '🎺', '🎷', '🎸', '👾', '🎮', '🃏', '🎴', '🀄', '🎲', '🎯', '🏈', '🏀', '⚽', '⚾', '🎾', '🎱', '🏉', '🎳', '⛳', '🚵', '🚴', '🏁', '🏇', '🏆', '🎿', '🏂', '🏊', '🏄', '🎣', '☕', '🍵', '🍶', '🍼', '🍺', '🍻', '🍸', '🍹', '🍷', '🍴', '🍕', '🍔', '🍟', '🍗', '🍖', '🍝', '🍛', '🍤', '🍱', '🍣', '🍥', '🍙', '🍘', '🍚', '🍜', '🍲', '🍢', '🍡', '🍳', '🍞', '🍩', '🍮', '🍦', '🍨', '🍧', '🎂', '🍰', '🍪', '🍫', '🍬', '🍭', '🍯', '🍎', '🍏', '🍊', '🍋', '🍒', '🍇', '🍉', '🍓', '🍑', '🍈', '🍌', '🍐', '🍍', '🍠', '🍆', '🍅', '🌽', '🏠', '🏡', '🏫', '🏢', '🏣', '🏥', '🏦', '🏪', '🏩', '🏨', '💒', '⛪', '🏬', '🏤', '🌇', '🌆', '🏯', '🏰', '⛺', '🏭', '🗼', '🗾', '🗻', '🌄', '🌅', '🌃', '🗽', '🌉', '🎠', '🎡', '⛲', '🎢', '🚢', '⛵', '🚤', '🚣', '⚓', '🚀', '✈', '💺', '🚁', '🚂', '🚊', '🚉', '🚞', '🚆', '🚄', '🚅', '🚈', '🚇', '🚝', '🚋', '🚃', '🚎', '🚌', '🚍', '🚙', '🚘', '🚗', '🚕', '🚖', '🚛', '🚚', '🚨', '🚓', '🚔', '🚒', '🚑', '🚐', '🚲', '🚡', '🚟', '🚠', '🚜', '💈', '🚏', '🎫', '🚦', '🚥', '⚠', '🚧', '🔰', '⛽', '🏮', '🎰', '♨', '🗿', '🎪', '🎭', '📍', '🚩', '⬆', '⬇', '⬅', '➡', '🔠', '🔡', '🔤', '↗', '↖', '↘', '↙', '↔', '↕', '🔄', '◀', '▶', '🔼', '🔽', '↩', '↪', 'ℹ', '⏪', '⏩', '⏫', '⏬', '⤵', '⤴', '🆗', '🔀', '🔁', '🔂', '🆕', '🆙', '🆒', '🆓', '🆖', '📶', '🎦', '🈁', '🈯', '🈳', '🈵', '🈴', '🈲', '🉐', '🈹', '🈺', '🈶', '🈚', '🚻', '🚹', '🚺', '🚼', '🚾', '🚰', '🚮', '🅿', '♿', '🚭', '🈷', '🈸', '🈂', 'Ⓜ', '🛂', '🛄', '🛅', '🛃', '🉑', '㊙', '㊗', '🆑', '🆘', '🆔', '🚫', '🔞', '📵', '🚯', '🚱', '🚳', '🚷', '🚸', '⛔', '✳', '❇', '❎', '✅', '✴', '💟', '🆚', '📳', '📴', '🅰', '🅱', '🆎', '🅾', '💠', '➿', '♻', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '🔯', '🏧', '💹', '💲', '💱', '©', '®', '™', '〽', '〰', '🔝', '🔚', '🔙', '🔛', '🔜', '❌', '⭕', '❗', '❓', '❕', '❔', '🔃', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓', '🕟', '🕔', '🕠', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '✖', '➕', '➖', '➗', '♠', '♥', '♣', '♦', '💮', '💯', '✔', '☑', '🔘', '🔗', '➰', '🔱', '🔲', '🔳', '◼', '◻', '◾', '◽', '▪', '▫', '🔺', '⬜', '⬛', '⚫', '⚪', '🔴', '🔵', '🔻', '🔶', '🔷', '🔸', '🔹'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

var _default = {
  generateEmoji: generateEmoji
};
exports.default = _default;
},{}],"RZIL":[function(require,module,exports) {
var define;
"use strict";!function(e){"function"==typeof define&&define.amd?define(e):"undefined"!=typeof module&&module.exports?module.exports=e():window.enterView=e.call(this)}(function(){var e=function(e){function n(){E=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)}}function t(){if(y&&"number"==typeof y){var e=Math.min(Math.max(0,y),1);return F-e*F}return F}function o(){var e=document.documentElement.clientHeight,n=window.innerHeight||0;F=Math.max(e,n)}function r(){L=!1;var e=t();M=M.filter(function(n){var t=n.getBoundingClientRect(),o=t.top,r=t.bottom,i=t.height,s=o<e,u=r<e;if(s&&!n.__ev_entered){if(m(n),n.__ev_progress=0,h(n,n.__ev_progress),q)return!1}else!s&&n.__ev_entered&&(n.__ev_progress=0,h(n,n.__ev_progress),g(n));if(s&&!u){var d=(e-o)/i;n.__ev_progress=Math.min(1,Math.max(0,d)),h(n,n.__ev_progress)}return s&&u&&1!==n.__ev_progress&&(n.__ev_progress=1,h(n,n.__ev_progress)),n.__ev_entered=s,!0}),M.length||window.removeEventListener("scroll",i,!0)}function i(){L||(L=!0,E(r))}function s(){o(),r()}function u(){o(),r()}function d(e){for(var n=e.length,t=[],o=0;o<n;o+=1)t.push(e[o]);return t}function f(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return"string"==typeof e?d(n.querySelectorAll(e)):e instanceof NodeList?d(e):e instanceof Array?e:void 0}function c(){M=f(v)}function a(){window.addEventListener("resize",s,!0),window.addEventListener("scroll",i,!0),window.addEventListener("load",u,!0),s()}function _(){return v?(c(),M&&M.length?(n(),a(),void r()):(console.error("no selector elements found"),!1)):(console.error("must pass a selector"),!1)}var v=e.selector,l=e.enter,m=void 0===l?function(){}:l,w=e.exit,g=void 0===w?function(){}:w,p=e.progress,h=void 0===p?function(){}:p,x=e.offset,y=void 0===x?0:x,A=e.once,q=void 0!==A&&A,E=null,L=!1,M=[],F=0;_()};return e});
},{}],"TAPd":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jump = _interopRequireDefault(require("jump.js"));

var _generateEmoji = _interopRequireDefault(require("./generateEmoji"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var enterView = require('enter-view');

console.log(enterView);
var $content;
var verbJoin;
var nounJoin;
var articlesJoin;
var $verb;
var $noun;
var $articles;
var $separators;
var $progressBar;
var backgroundBarWidthPx;
var barWidthPx;
var barUpdater;
var articleNumber;
var currentArticle = 0;
var $nounSearch;
var $verbSelect;
var formattedVerbs;
var height;
var fixedSearchHeight;
var separatorHeight;
var articleInterval;

function enterViewSetup() {
  enterView({
    selector: '.verb-container',
    enter: function enter(el) {
      // el.classList.add('entered');
      var thisVerb = d3.select(el).select('div.verb-name').attr('id');
      d3.selectAll('.verb-name').classed('verb-selected', false);
      d3.select(el).select('.verb-name').classed('verb-selected', true);
      d3.select('.choices__item--selectable').text(thisVerb);
      console.log('enter 1');
      fixedSearchHeight = d3.select('.fixed-search-bar').node().offsetHeight;
    },
    exit: function exit(el) {
      var thisVerb = d3.select(el).select('div.verb-name').attr('id');
      d3.selectAll('.verb-name').classed('verb-selected', false);
      d3.select(el).select('.verb-name').classed('verb-selected', true);
      d3.select('.choices__item--selectable').text(thisVerb);
      console.log('enter 1');
      fixedSearchHeight = d3.select('.fixed-search-bar').node().offsetHeight;
    },
    progress: function progress(el, _progress) {// el.style.opacity = progress;
    },
    offset: 0.75,
    // enter at middle of viewport
    once: false // trigger just once

  });
  enterView({
    selector: '.main-page__content',
    enter: function enter(el) {
      d3.select('.main-page__sidebar').classed('hidden', false);
      d3.select('.fixed-search-bar').classed('hidden', false);
      console.log('enter 2');
    },
    exit: function exit(el) {
      //   el.classList.remove('entered');
      d3.select('.main-page__sidebar').classed('hidden', true);
      d3.select('.fixed-search-bar').classed('hidden', true);
      console.log('exit 2');
    },
    progress: function progress(el, _progress2) {// el.style.opacity = progress;
    },
    offset: 0.999,
    // enter at middle of viewport
    once: false // trigger just once

  });
  enterView({
    selector: '.separator',
    enter: function enter(el) {
      var currentSentiment = el.classList[1].split('__')[1];
      d3.selectAll('.button').style('font-size', '18px');
      d3.select(".button-".concat(currentSentiment)).style('font-size', '32px');
    },
    exit: function exit(el) {
      // const currentSentiment = el.classList[1].split('__')[1];
      // d3.selectAll('.button').style('font-size', '18px');
      // d3.select(`.button-${currentSentiment}`).style('font-size', '32px');
      getPreviousSentiment(el);
    },
    progress: function progress(el, _progress3) {},
    offset: 0.75,
    once: false
  });
}

function getPreviousSentiment(lastSentiment) {
  var leavingSentiment = lastSentiment.classList[1].split('__')[1];

  if (leavingSentiment === 'positive-low') {
    d3.selectAll('.button').style('font-size', '18px');
    d3.select('.button-positive-high').style('font-size', '32px');
  } else if (leavingSentiment === 'neutral') {
    d3.selectAll('.button').style('font-size', '18px');
    d3.select('.button-positive-low').style('font-size', '32px');
  } else if (leavingSentiment === 'negative-low') {
    d3.selectAll('.button').style('font-size', '18px');
    d3.select('.button-neutral').style('font-size', '32px');
  } else if (leavingSentiment === 'negative-high') {
    d3.selectAll('.button').style('font-size', '18px');
    d3.select('.button-negative-low').style('font-size', '32px');
  }
}

function updateProgressBar(el, elapsed) {
  var $foregroundBar = d3.select(el.parentNode).select('.tooltip').select('.tooltip__progress-bar-foreground');
  $foregroundBar.style('width', d3.format('%')(elapsed / 5000));
}

function updateTooltip(d, el, $tooltip) {
  // show tooltip, load data
  $tooltip.classed('hidden', false);
  $tooltip.select('p.tooltip__meta').text("".concat(d.articles[currentArticle].url.split('//')[1].split('/')[0], " \u2022 ").concat(d.articles[currentArticle].pub_date, " \u2022 ").concat(currentArticle + 1, "/").concat(articleNumber, " articles"));
  $tooltip.select('p.tooltip__hed').text("".concat(d.articles[currentArticle].headline));
  $tooltip.select('p.tooltip__other-verbs').html(function () {
    var additionalArticles = d.articles.length > 1 ? "<span class='noun-selected'>".concat(_generateEmoji.default.generateEmoji(), " ").concat(d.noun, "</span> is also found in these verbs: <span class='additional-verbs'>").concat(d.other_verbs.join(', '), "</span>") : "";
    return additionalArticles;
  });
  var x = el.offsetLeft;
  var y = el.offsetTop;
  var toolTipHeight = $tooltip.node().offsetHeight; //   console.log(d3.mouse(this));

  $tooltip.style('left', "".concat(x, "px")).style('top', "".concat(y - toolTipHeight - 10, "px"));
}

function updateArticle(d, el, $tooltip) {
  if (currentArticle >= articleNumber && articleInterval) {
    clearInterval(articleInterval);
    articleInterval = null;
  } else {
    var t = d3.timer(function (elapsed) {
      updateProgressBar(el, elapsed);
      if (elapsed > 5000) t.stop();
    }, 10);
    updateTooltip(d, el, $tooltip); // updateProgressBar(el);

    currentArticle += 1;
    articleInterval = setTimeout(function () {
      updateArticle(d, el, $tooltip);
    }, 5000);
  }
}

function handleMouseEnter(d) {
  console.log(d);
  currentArticle = 0;
  var el = this;
  var $sel = d3.select(el);
  var $selVerb = d3.select(el.parentNode);
  var $tooltip = $selVerb.select('.tooltip');
  articleNumber = d.articles.length;
  updateArticle(d, el, $tooltip);
}

function handleMouseLeave() {
  currentArticle = 0;
  articleNumber = 0;
  clearInterval(barUpdater);
  clearInterval(articleInterval);
  d3.selectAll('.tooltip__progress-bar-foreground').style('width', '0px');
  d3.selectAll('.tooltip').classed('hidden', true); // $noun.classed('faded',false)
}

function resize() {
  height = window.innerHeight;
  d3.selectAll('section.intro').style('height', "".concat(height, "px"));
}

function setSentimentScroll() {
  var parentDiv = d3.select('div.content').node();
  var posHighFirstEl = d3.select('.verb-container-love').node();
  var sepPositiveHigh = document.createElement('div');
  sepPositiveHigh.className = 'separator separator__positive-high';
  sepPositiveHigh.innerHTML = '😁 highly positive sentiments';
  var posLowFirstEl = d3.select('.verb-container-favor').node();
  var sepPositiveLow = document.createElement('div');
  sepPositiveLow.className = 'separator separator__positive-low';
  sepPositiveLow.innerHTML = '🙂 positive sentiments';
  var neutralFirstEl = d3.select('.verb-container-say').node();
  var sepNeutral = document.createElement('div');
  sepNeutral.className = 'separator separator__neutral';
  sepNeutral.innerHTML = '😐 neutral sentiments';
  var negLowFirstEl = d3.select('.verb-container-leave').node();
  var sepNegativeLow = document.createElement('div');
  sepNegativeLow.className = 'separator separator__negative-low';
  sepNegativeLow.innerHTML = '🙁 negative sentiments';
  var negHighFirstEl = d3.select('.verb-container-hate').node();
  var sepNegativeHigh = document.createElement('div');
  sepNegativeHigh.className = 'separator separator__negative-high';
  sepNegativeHigh.innerHTML = '😱 highly negative sentiments';
  parentDiv.insertBefore(sepPositiveHigh, posHighFirstEl);
  parentDiv.insertBefore(sepPositiveLow, posLowFirstEl);
  parentDiv.insertBefore(sepNeutral, neutralFirstEl);
  parentDiv.insertBefore(sepNegativeLow, negLowFirstEl);
  parentDiv.insertBefore(sepNegativeHigh, negHighFirstEl); // const verbEl = d3.select(this);
  // const verbValue = verbEl.text();
  // const scrollTarget = d3.select(`.verb-container-${verbValue}`).node()

  d3.select('.button-positive-high').on('click', function () {
    scrollTo(d3.select('.separator__positive-high').node());
  });
  d3.select('.button-positive-low').on('click', function () {
    scrollTo(d3.select('.separator__positive-low').node());
  });
  d3.select('.button-negative-low').on('click', function () {
    scrollTo(d3.select('.separator__negative-low').node());
  });
  d3.select('.button-negative-high').on('click', function () {
    scrollTo(d3.select('.separator__negative-high').node());
  });
  d3.select('.button-neutral').on('click', function () {
    scrollTo(d3.select('.separator__neutral').node());
  });
}

function handleMouseOver(el, noun) {
  console.log(d3.mouse(el)); // .attr('')
  // let coordinates= d3.mouse(el);
  // d3.select('.tooltip')
  // .classed('hidden',false)
  // .style("left", (d3.event.pageX) + "px")
  // .style("top", (d3.event.pageY - 28) + "px");
}

function handleInputChange() {
  var $input = d3.select(this);
  var val = this.value.toLowerCase();
  handleMouseLeave();

  if (val == '') {
    $noun.style('font-size', '14px');
    $verb.classed('hidden', false);
    $separators.classed('hidden', false);
    $noun.classed('faded', false);
    handleMouseLeave();
  } else {
    $noun.style('font-size', function (d) {
      if (d.noun.includes(val)) {
        return '48px';
      }

      return '14px';
    }).classed('faded', function (d) {
      if (d.noun.includes(val)) {
        return false;
      }

      return true;
    });
    $separators.classed('hidden', true);
    $verb.classed('hidden', function (d) {
      handleMouseLeave();
      var nounMatch = d.nounList.filter(function (item) {
        return item.includes(val);
      });

      if (nounMatch.length >= 1) {
        return false;
      }

      return true;
    });
  } // const start = $input.attr('data-start');

}

function scrollTo(element) {
  (0, _jump.default)(element, {
    duration: 1000,
    offset: -fixedSearchHeight
  });
}

function handleDropDown() {
  var verbEl = d3.select(this);
  var verbValue = verbEl.text();
  var scrollTarget = d3.select(".verb-container-".concat(verbValue)).node();
  scrollTo(scrollTarget);
}

function addArticles(data) {
  $nounSearch = d3.select('.search-noun__input');
  $nounSearch.on('keyup', handleInputChange);
  console.log(data.length);
  $content = d3.select('.content'); // verbs (top-level)

  verbJoin = $content.selectAll('div.verb-container').data(data).enter();
  $verb = verbJoin.append('div').attr('class', function (d) {
    return "verb-container verb-container-".concat(d.verb);
  });
  $verb.append('div').attr('class', 'verb-name').attr('id', function (d) {
    return d.verb;
  }).text(function (d) {
    return d.verb;
  }); // tooltip:

  var $tooltip = $verb.append('div').attr('class', 'tooltip hidden'); // tooltip: progress bar

  $progressBar = $tooltip.append('div').attr('class', 'tooltip__progress-bar-background');
  $progressBar.append('div').attr('class', 'tooltip__progress-bar-foreground'); // tooltip: text sections

  $tooltip.append('p').attr('class', 'tooltip__meta');
  $tooltip.append('p').attr('class', 'tooltip__hed');
  $tooltip.append('p').attr('class', 'tooltip__other-verbs'); // nouns (bottom-level)

  nounJoin = $verb.selectAll('span.noun').data(function (d) {
    return d.nouns;
  }).enter();
  $noun = nounJoin.append('div').attr('class', 'noun').text(function (d) {
    return " ".concat(d.noun, " ").concat(_generateEmoji.default.generateEmoji(), " \xB7 ");
  }).on('mouseenter', handleMouseEnter).on('mouseleave', handleMouseLeave).on('click', function (d) {
    return window.open(d.articles[0].url);
  });
  var verbDropDown = d3.select('.search-verb__input').node();
  var verbDropDownChoices = new Choices(verbDropDown, {
    choices: formattedVerbs.map(function (value) {
      return {
        value: value,
        label: "".concat(value.verb)
      };
    })
  });
  d3.select(verbDropDown).on('change', handleDropDown);
  $separators = d3.selectAll('.separator'); // Adjusting content to fit below fixed
}

function cleanData(data) {
  var verbsToKeep = data[0];
  var verbsToKeepList = verbsToKeep.map(function (item) {
    return item.verb;
  });
  var allVerbs = data[1];
  var filteredVerbs = allVerbs.filter(function (verb) {
    return verbsToKeepList.includes(verb.verb);
  });
  formattedVerbs = filteredVerbs.map(function (verb) {
    return _objectSpread({}, verb, {
      nounList: verb.nouns.map(function (item) {
        return item.noun;
      }),
      nouns: verb.nouns.map(function (noun) {
        return _objectSpread({}, noun, {
          nounLevelVerb: verb.verb
        });
      })
    });
  });
  formattedVerbs.forEach(function (verb) {
    var result = data[0].filter(function (item) {
      return item.verb === verb.verb;
    });
    verb.sentiment = result[0] !== undefined ? +result[0].sentiment_5 : null;
  });
  formattedVerbs = formattedVerbs.sort(function (a, b) {
    return parseFloat(b.sentiment) - parseFloat(a.sentiment);
  });
  console.log(formattedVerbs);
  return formattedVerbs;
}

function setHeights() {
  setSentimentScroll();
  fixedSearchHeight = d3.select('.fixed-search-bar').node().offsetHeight;
  separatorHeight = d3.select('.separator').node().offsetHeight;
  console.log({
    separatorHeight: separatorHeight,
    fixedSearchHeight: fixedSearchHeight
  });
}

function init() {
  resize();
  Promise.all([d3.csv('assets/data/verbs_to_include.csv'), d3.json('assets/data/articles_json_v2_small.json')]).then(function (data) {
    return cleanData(data);
  }).then(function (cleanedData) {
    return addArticles(cleanedData);
  }).then(function () {
    return setHeights();
  }).then(function () {
    return enterViewSetup();
  });
}

var _default = {
  init: init,
  resize: resize
};
exports.default = _default;
},{"jump.js":"HGko","./generateEmoji":"hTgy","enter-view":"RZIL"}],"v9Q8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fallbackData = [{
  image: '2018_02_stand-up',
  url: '2018/02/stand-up',
  hed: 'The Structure of Stand-Up Comedy'
}, {
  image: '2018_04_birthday-paradox',
  url: '2018/04/birthday-paradox',
  hed: 'The Birthday Paradox Experiment'
}, {
  image: '2018_11_boy-bands',
  url: '2018/11/boy-bands',
  hed: 'Internet Boy Band Database'
}, {
  image: '2018_08_pockets',
  url: '2018/08/pockets',
  hed: 'Women’s Pockets are Inferior'
}];
var storyData = null;

function loadJS(src, cb) {
  var ref = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  if (cb && typeof cb === 'function') {
    script.onload = cb;
  }

  return script;
}

function loadStories(cb) {
  var request = new XMLHttpRequest();
  var v = Date.now();
  var url = "https://pudding.cool/assets/data/stories.json?v=".concat(v);
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cb(data);
    } else cb(fallbackData);
  };

  request.onerror = function () {
    return cb(fallbackData);
  };

  request.send();
}

function createLink(d) {
  return "\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(d.url, "' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(d.image, ".jpg' alt='").concat(d.hed, "'>\n\t\t<p class='article__headline'>").concat(d.hed, "</p>\n\t</a>\n\t");
}

function recircHTML() {
  var url = window.location.href;
  var html = storyData.filter(function (d) {
    return !url.includes(d.url);
  }).slice(0, 4).map(createLink).join('');
  d3.select('.pudding-footer .footer-recirc__articles').html(html);
}

function setupSocialJS() {
  // facebook
  (function (d, s, id) {
    var js;
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');

  loadJS('https://platform.twitter.com/widgets.js');
}

function init() {
  loadStories(function (data) {
    storyData = data;
    recircHTML();
    setupSocialJS();
  });
}

var _default = {
  init: init
};
exports.default = _default;
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _isMobile = _interopRequireDefault(require("./utils/is-mobile"));

var _graphic = _interopRequireDefault(require("./graphic"));

var _footer = _interopRequireDefault(require("./footer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global d3 */
var $body = d3.select('body');
var previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  var width = $body.node().offsetWidth;

  if (previousWidth !== width) {
    previousWidth = width;

    _graphic.default.resize();
  }
}

function setupStickyHeader() {
  var $header = $body.select('header');

  if ($header.classed('is-sticky')) {
    var $menu = $body.select('.header__menu');
    var $toggle = $body.select('.header__toggle');
    $toggle.on('click', function () {
      var visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function init() {
  // add mobile class to body tag
  $body.classed('is-mobile', _isMobile.default.any()); // setup resize event

  window.addEventListener('resize', (0, _lodash.default)(resize, 150)); // setup sticky header menu
  //   setupStickyHeader();
  // kick off graphic code

  _graphic.default.init(); // load footer stories


  _footer.default.init();
}

init();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./footer":"v9Q8"}]},{},["epB2"], null)
//# sourceMappingURL=/main.js.map