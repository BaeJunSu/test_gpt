(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "resource/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index_wq.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = __webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version;

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/css-tree/data/index.js":
/*!*********************************************!*\
  !*** ./node_modules/css-tree/data/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mdnAtrules = __webpack_require__(/*! mdn-data/css/at-rules.json */ "./node_modules/mdn-data/css/at-rules.json");
const mdnProperties = __webpack_require__(/*! mdn-data/css/properties.json */ "./node_modules/mdn-data/css/properties.json");
const mdnSyntaxes = __webpack_require__(/*! mdn-data/css/syntaxes.json */ "./node_modules/mdn-data/css/syntaxes.json");
const patch = __webpack_require__(/*! ./patch.json */ "./node_modules/css-tree/data/patch.json");
const extendSyntax = /^\s*\|\s*/;

function preprocessAtrules(dict) {
    const result = Object.create(null);

    for (const atruleName in dict) {
        const atrule = dict[atruleName];
        let descriptors = null;

        if (atrule.descriptors) {
            descriptors = Object.create(null);

            for (const descriptor in atrule.descriptors) {
                descriptors[descriptor] = atrule.descriptors[descriptor].syntax;
            }
        }

        result[atruleName.substr(1)] = {
            prelude: atrule.syntax.trim().match(/^@\S+\s+([^;\{]*)/)[1].trim() || null,
            descriptors
        };
    }

    return result;
}

function patchDictionary(dict, patchDict) {
    const result = {};

    // copy all syntaxes for an original dict
    for (const key in dict) {
        result[key] = dict[key].syntax || dict[key];
    }

    // apply a patch
    for (const key in patchDict) {
        if (key in dict) {
            if (patchDict[key].syntax) {
                result[key] = extendSyntax.test(patchDict[key].syntax)
                    ? result[key] + ' ' + patchDict[key].syntax.trim()
                    : patchDict[key].syntax;
            } else {
                delete result[key];
            }
        } else {
            if (patchDict[key].syntax) {
                result[key] = patchDict[key].syntax.replace(extendSyntax, '');
            }
        }
    }

    return result;
}

function unpackSyntaxes(dict) {
    const result = {};

    for (const key in dict) {
        result[key] = dict[key].syntax;
    }

    return result;
}

function patchAtrules(dict, patchDict) {
    const result = {};

    // copy all syntaxes for an original dict
    for (const key in dict) {
        const patchDescriptors = (patchDict[key] && patchDict[key].descriptors) || null;

        result[key] = {
            prelude: key in patchDict && 'prelude' in patchDict[key]
                ? patchDict[key].prelude
                : dict[key].prelude || null,
            descriptors: dict[key].descriptors
                ? patchDictionary(dict[key].descriptors, patchDescriptors || {})
                : patchDescriptors && unpackSyntaxes(patchDescriptors)
        };
    }

    // apply a patch
    for (const key in patchDict) {
        if (!hasOwnProperty.call(dict, key)) {
            result[key] = {
                prelude: patchDict[key].prelude || null,
                descriptors: patchDict[key].descriptors && unpackSyntaxes(patchDict[key].descriptors)
            };
        }
    }

    return result;
}

module.exports = {
    types: patchDictionary(mdnSyntaxes, patch.syntaxes),
    atrules: patchAtrules(preprocessAtrules(mdnAtrules), patch.atrules),
    properties: patchDictionary(mdnProperties, patch.properties)
};


/***/ }),

/***/ "./node_modules/css-tree/data/patch.json":
/*!***********************************************!*\
  !*** ./node_modules/css-tree/data/patch.json ***!
  \***********************************************/
/*! exports provided: atrules, properties, syntaxes, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"atrules\":{\"charset\":{\"prelude\":\"<string>\"},\"font-face\":{\"descriptors\":{\"unicode-range\":{\"comment\":\"replaces <unicode-range>, an old production name\",\"syntax\":\"<urange>#\"}}}},\"properties\":{\"-moz-background-clip\":{\"comment\":\"deprecated syntax in old Firefox, https://developer.mozilla.org/en/docs/Web/CSS/background-clip\",\"syntax\":\"padding | border\"},\"-moz-border-radius-bottomleft\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius\",\"syntax\":\"<'border-bottom-left-radius'>\"},\"-moz-border-radius-bottomright\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius\",\"syntax\":\"<'border-bottom-right-radius'>\"},\"-moz-border-radius-topleft\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius\",\"syntax\":\"<'border-top-left-radius'>\"},\"-moz-border-radius-topright\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius\",\"syntax\":\"<'border-bottom-right-radius'>\"},\"-moz-control-character-visibility\":{\"comment\":\"firefox specific keywords, https://bugzilla.mozilla.org/show_bug.cgi?id=947588\",\"syntax\":\"visible | hidden\"},\"-moz-osx-font-smoothing\":{\"comment\":\"misssed old syntax https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth\",\"syntax\":\"auto | grayscale\"},\"-moz-user-select\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\",\"syntax\":\"none | text | all | -moz-none\"},\"-ms-flex-align\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align\",\"syntax\":\"start | end | center | baseline | stretch\"},\"-ms-flex-item-align\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align\",\"syntax\":\"auto | start | end | center | baseline | stretch\"},\"-ms-flex-line-pack\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack\",\"syntax\":\"start | end | center | justify | distribute | stretch\"},\"-ms-flex-negative\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-shrink'>\"},\"-ms-flex-pack\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack\",\"syntax\":\"start | end | center | justify | distribute\"},\"-ms-flex-order\":{\"comment\":\"misssed old syntax implemented in IE; https://msdn.microsoft.com/en-us/library/jj127303(v=vs.85).aspx\",\"syntax\":\"<integer>\"},\"-ms-flex-positive\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-grow'>\"},\"-ms-flex-preferred-size\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-basis'>\"},\"-ms-interpolation-mode\":{\"comment\":\"https://msdn.microsoft.com/en-us/library/ff521095(v=vs.85).aspx\",\"syntax\":\"nearest-neighbor | bicubic\"},\"-ms-grid-column-align\":{\"comment\":\"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466338.aspx\",\"syntax\":\"start | end | center | stretch\"},\"-ms-grid-row-align\":{\"comment\":\"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466348.aspx\",\"syntax\":\"start | end | center | stretch\"},\"-ms-hyphenate-limit-last\":{\"comment\":\"misssed old syntax implemented in IE; https://www.w3.org/TR/css-text-4/#hyphenate-line-limits\",\"syntax\":\"none | always | column | page | spread\"},\"-webkit-appearance\":{\"comment\":\"webkit specific keywords\",\"references\":[\"http://css-infos.net/property/-webkit-appearance\"],\"syntax\":\"none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button\"},\"-webkit-background-clip\":{\"comment\":\"https://developer.mozilla.org/en/docs/Web/CSS/background-clip\",\"syntax\":\"[ <box> | border | padding | content | text ]#\"},\"-webkit-column-break-after\":{\"comment\":\"added, http://help.dottoro.com/lcrthhhv.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-column-break-before\":{\"comment\":\"added, http://help.dottoro.com/lcxquvkf.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-column-break-inside\":{\"comment\":\"added, http://help.dottoro.com/lclhnthl.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-font-smoothing\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth\",\"syntax\":\"auto | none | antialiased | subpixel-antialiased\"},\"-webkit-mask-box-image\":{\"comment\":\"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image\",\"syntax\":\"[ <url> | <gradient> | none ] [ <length-percentage>{4} <-webkit-mask-box-repeat>{2} ]?\"},\"-webkit-print-color-adjust\":{\"comment\":\"missed\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/-webkit-print-color-adjust\"],\"syntax\":\"economy | exact\"},\"-webkit-text-security\":{\"comment\":\"missed; http://help.dottoro.com/lcbkewgt.php\",\"syntax\":\"none | circle | disc | square\"},\"-webkit-user-drag\":{\"comment\":\"missed; http://help.dottoro.com/lcbixvwm.php\",\"syntax\":\"none | element | auto\"},\"-webkit-user-select\":{\"comment\":\"auto is supported by old webkit, https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\",\"syntax\":\"auto | none | text | all\"},\"alignment-baseline\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty\"],\"syntax\":\"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical\"},\"baseline-shift\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#BaselineShiftProperty\"],\"syntax\":\"baseline | sub | super | <svg-length>\"},\"behavior\":{\"comment\":\"added old IE property https://msdn.microsoft.com/en-us/library/ms530723(v=vs.85).aspx\",\"syntax\":\"<url>+\"},\"clip-rule\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/masking.html#ClipRuleProperty\"],\"syntax\":\"nonzero | evenodd\"},\"cue\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'cue-before'> <'cue-after'>?\"},\"cue-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<url> <decibel>? | none\"},\"cue-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<url> <decibel>? | none\"},\"cursor\":{\"comment\":\"added legacy keywords: hand, -webkit-grab. -webkit-grabbing, -webkit-zoom-in, -webkit-zoom-out, -moz-grab, -moz-grabbing, -moz-zoom-in, -moz-zoom-out\",\"references\":[\"https://www.sitepoint.com/css3-cursor-styles/\"],\"syntax\":\"[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing | hand | -webkit-grab | -webkit-grabbing | -webkit-zoom-in | -webkit-zoom-out | -moz-grab | -moz-grabbing | -moz-zoom-in | -moz-zoom-out ] ]\"},\"display\":{\"comment\":\"extended with -ms-flexbox\",\"syntax\":\"| <-non-standard-display>\"},\"position\":{\"comment\":\"extended with -webkit-sticky\",\"syntax\":\"| -webkit-sticky\"},\"dominant-baseline\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty\"],\"syntax\":\"auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge\"},\"image-rendering\":{\"comment\":\"extended with <-non-standard-image-rendering>, added SVG keywords optimizeSpeed and optimizeQuality\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/image-rendering\",\"https://www.w3.org/TR/SVG/painting.html#ImageRenderingProperty\"],\"syntax\":\"| optimizeSpeed | optimizeQuality | <-non-standard-image-rendering>\"},\"fill\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"<paint>\"},\"fill-opacity\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"<number-zero-one>\"},\"fill-rule\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"nonzero | evenodd\"},\"filter\":{\"comment\":\"extend with IE legacy syntaxes\",\"syntax\":\"| <-ms-filter-function-list>\"},\"glyph-orientation-horizontal\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#GlyphOrientationHorizontalProperty\"],\"syntax\":\"<angle>\"},\"glyph-orientation-vertical\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#GlyphOrientationVerticalProperty\"],\"syntax\":\"<angle>\"},\"kerning\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#KerningProperty\"],\"syntax\":\"auto | <svg-length>\"},\"letter-spacing\":{\"comment\":\"fix syntax <length> -> <length-percentage>\",\"references\":[\"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing\"],\"syntax\":\"normal | <length-percentage>\"},\"marker\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-end\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-mid\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-start\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"max-width\":{\"comment\":\"fix auto -> none (https://github.com/mdn/data/pull/431); extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/max-width\",\"syntax\":\"none | <length-percentage> | min-content | max-content | fit-content(<length-percentage>) | <-non-standard-width>\"},\"width\":{\"comment\":\"per spec fit-content should be a function, however browsers are supporting it as a keyword (https://github.com/csstree/stylelint-validator/issues/29)\",\"syntax\":\"| fit-content | -moz-fit-content | -webkit-fit-content\"},\"min-width\":{\"comment\":\"extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"syntax\":\"auto | <length-percentage> | min-content | max-content | fit-content(<length-percentage>) | <-non-standard-width>\"},\"overflow\":{\"comment\":\"extend by vendor keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow\",\"syntax\":\"| <-non-standard-overflow>\"},\"pause\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'pause-before'> <'pause-after'>?\"},\"pause-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"pause-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"rest\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'rest-before'> <'rest-after'>?\"},\"rest-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"rest-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"shape-rendering\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#ShapeRenderingPropert\"],\"syntax\":\"auto | optimizeSpeed | crispEdges | geometricPrecision\"},\"src\":{\"comment\":\"added @font-face's src property https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src\",\"syntax\":\"[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#\"},\"speak\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"auto | none | normal\"},\"speak-as\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"normal | spell-out || digits || [ literal-punctuation | no-punctuation ]\"},\"stroke\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<paint>\"},\"stroke-dasharray\":{\"comment\":\"added SVG property; a list of comma and/or white space separated <length>s and <percentage>s\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"none | [ <svg-length>+ ]#\"},\"stroke-dashoffset\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<svg-length>\"},\"stroke-linecap\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"butt | round | square\"},\"stroke-linejoin\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"miter | round | bevel\"},\"stroke-miterlimit\":{\"comment\":\"added SVG property (<miterlimit> = <number-one-or-greater>) \",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<number-one-or-greater>\"},\"stroke-opacity\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<number-zero-one>\"},\"stroke-width\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<svg-length>\"},\"text-anchor\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#TextAlignmentProperties\"],\"syntax\":\"start | middle | end\"},\"unicode-bidi\":{\"comment\":\"added prefixed keywords https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi\",\"syntax\":\"| -moz-isolate | -moz-isolate-override | -moz-plaintext | -webkit-isolate | -webkit-isolate-override | -webkit-plaintext\"},\"unicode-range\":{\"comment\":\"added missed property https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range\",\"syntax\":\"<urange>#\"},\"voice-balance\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<number> | left | center | right | leftwards | rightwards\"},\"voice-duration\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"auto | <time>\"},\"voice-family\":{\"comment\":\"<name> -> <family-name>, https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"[ [ <family-name> | <generic-voice> ] , ]* [ <family-name> | <generic-voice> ] | preserve\"},\"voice-pitch\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]\"},\"voice-range\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]\"},\"voice-rate\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"[ normal | x-slow | slow | medium | fast | x-fast ] || <percentage>\"},\"voice-stress\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"normal | strong | moderate | none | reduced\"},\"voice-volume\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"silent | [ [ x-soft | soft | medium | loud | x-loud ] || <decibel> ]\"},\"writing-mode\":{\"comment\":\"extend with SVG keywords\",\"syntax\":\"| <svg-writing-mode>\"}},\"syntaxes\":{\"-legacy-gradient\":{\"comment\":\"added collection of legacy gradient syntaxes\",\"syntax\":\"<-webkit-gradient()> | <-legacy-linear-gradient> | <-legacy-repeating-linear-gradient> | <-legacy-radial-gradient> | <-legacy-repeating-radial-gradient>\"},\"-legacy-linear-gradient\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"-moz-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-linear-gradient( <-legacy-linear-gradient-arguments> )\"},\"-legacy-repeating-linear-gradient\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )\"},\"-legacy-linear-gradient-arguments\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"[ <angle> | <side-or-corner> ]? , <color-stop-list>\"},\"-legacy-radial-gradient\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"-moz-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-radial-gradient( <-legacy-radial-gradient-arguments> )\"},\"-legacy-repeating-radial-gradient\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )\"},\"-legacy-radial-gradient-arguments\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"[ <position> , ]? [ [ [ <-legacy-radial-gradient-shape> || <-legacy-radial-gradient-size> ] | [ <length> | <percentage> ]{2} ] , ]? <color-stop-list>\"},\"-legacy-radial-gradient-size\":{\"comment\":\"before a standard it contains 2 extra keywords (`contain` and `cover`) https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltsize\",\"syntax\":\"closest-side | closest-corner | farthest-side | farthest-corner | contain | cover\"},\"-legacy-radial-gradient-shape\":{\"comment\":\"define to double sure it doesn't extends in future https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltshape\",\"syntax\":\"circle | ellipse\"},\"-non-standard-font\":{\"comment\":\"non standard fonts\",\"references\":[\"https://webkit.org/blog/3709/using-the-system-font-in-web-content/\"],\"syntax\":\"-apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-body | -apple-system-short-headline | -apple-system-short-subheadline | -apple-system-short-caption1 | -apple-system-short-footnote | -apple-system-tall-body\"},\"-non-standard-color\":{\"comment\":\"non standard colors\",\"references\":[\"http://cssdot.ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_CSS/color-i305.html\",\"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_Color_Preference_Extensions\"],\"syntax\":\"-moz-ButtonDefault | -moz-ButtonHoverFace | -moz-ButtonHoverText | -moz-CellHighlight | -moz-CellHighlightText | -moz-Combobox | -moz-ComboboxText | -moz-Dialog | -moz-DialogText | -moz-dragtargetzone | -moz-EvenTreeRow | -moz-Field | -moz-FieldText | -moz-html-CellHighlight | -moz-html-CellHighlightText | -moz-mac-accentdarkestshadow | -moz-mac-accentdarkshadow | -moz-mac-accentface | -moz-mac-accentlightesthighlight | -moz-mac-accentlightshadow | -moz-mac-accentregularhighlight | -moz-mac-accentregularshadow | -moz-mac-chrome-active | -moz-mac-chrome-inactive | -moz-mac-focusring | -moz-mac-menuselect | -moz-mac-menushadow | -moz-mac-menutextselect | -moz-MenuHover | -moz-MenuHoverText | -moz-MenuBarText | -moz-MenuBarHoverText | -moz-nativehyperlinktext | -moz-OddTreeRow | -moz-win-communicationstext | -moz-win-mediatext | -moz-activehyperlinktext | -moz-default-background-color | -moz-default-color | -moz-hyperlinktext | -moz-visitedhyperlinktext | -webkit-activelink | -webkit-focus-ring-color | -webkit-link | -webkit-text\"},\"-non-standard-image-rendering\":{\"comment\":\"non-standard keywords http://phrogz.net/tmp/canvas_image_zoom.html\",\"syntax\":\"optimize-contrast | -moz-crisp-edges | -o-crisp-edges | -webkit-optimize-contrast\"},\"-non-standard-overflow\":{\"comment\":\"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow\",\"syntax\":\"-moz-scrollbars-none | -moz-scrollbars-horizontal | -moz-scrollbars-vertical | -moz-hidden-unscrollable\"},\"-non-standard-width\":{\"comment\":\"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"syntax\":\"fill-available | min-intrinsic | intrinsic | -moz-available | -moz-fit-content | -moz-min-content | -moz-max-content | -webkit-min-content | -webkit-max-content\"},\"-webkit-gradient()\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/ - TODO: simplify when after match algorithm improvement ( [, point, radius | , point] -> [, radius]? , point )\",\"syntax\":\"-webkit-gradient( <-webkit-gradient-type>, <-webkit-gradient-point> [, <-webkit-gradient-point> | , <-webkit-gradient-radius>, <-webkit-gradient-point> ] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )\"},\"-webkit-gradient-color-stop\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"from( <color> ) | color-stop( [ <number-zero-one> | <percentage> ] , <color> ) | to( <color> )\"},\"-webkit-gradient-point\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"[ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]\"},\"-webkit-gradient-radius\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"<length> | <percentage>\"},\"-webkit-gradient-type\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"linear | radial\"},\"-webkit-mask-box-repeat\":{\"comment\":\"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image\",\"syntax\":\"repeat | stretch | round\"},\"-webkit-mask-clip-style\":{\"comment\":\"missed; there is no enough information about `-webkit-mask-clip` property, but looks like all those keywords are working\",\"syntax\":\"border | border-box | padding | padding-box | content | content-box | text\"},\"-ms-filter-function-list\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"<-ms-filter-function>+\"},\"-ms-filter-function\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"<-ms-filter-function-progid> | <-ms-filter-function-legacy>\"},\"-ms-filter-function-progid\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"'progid:' [ <ident-token> '.' ]* [ <ident-token> | <function-token> <any-value>? ) ]\"},\"-ms-filter-function-legacy\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/-ms-filter\",\"syntax\":\"<ident-token> | <function-token> <any-value>? )\"},\"-ms-filter\":{\"syntax\":\"<string>\"},\"age\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"child | young | old\"},\"attr-name\":{\"syntax\":\"<wq-name>\"},\"attr-fallback\":{\"syntax\":\"<any-value>\"},\"border-radius\":{\"comment\":\"missed, https://drafts.csswg.org/css-backgrounds-3/#the-border-radius\",\"syntax\":\"<length-percentage>{1,2}\"},\"bottom\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"content-list\":{\"comment\":\"missed -> https://drafts.csswg.org/css-content/#typedef-content-list (document-url, <target> and leader() is omitted util stabilization)\",\"syntax\":\"[ <string> | contents | <image> | <quote> | <target> | <leader()> | <attr()> | counter( <ident>, <'list-style-type'>? ) ]+\"},\"element()\":{\"comment\":\"https://drafts.csswg.org/css-gcpm/#element-syntax & https://drafts.csswg.org/css-images-4/#element-notation\",\"syntax\":\"element( <custom-ident> , [ first | start | last | first-except ]? ) | element( <id-selector> )\"},\"generic-voice\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"[ <age>? <gender> <integer>? ]\"},\"gender\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"male | female | neutral\"},\"generic-family\":{\"comment\":\"added -apple-system\",\"references\":[\"https://webkit.org/blog/3709/using-the-system-font-in-web-content/\"],\"syntax\":\"| -apple-system\"},\"gradient\":{\"comment\":\"added legacy syntaxes support\",\"syntax\":\"| <-legacy-gradient>\"},\"left\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"mask-image\":{\"comment\":\"missed; https://drafts.fxtf.org/css-masking-1/#the-mask-image\",\"syntax\":\"<mask-reference>#\"},\"name-repeat\":{\"comment\":\"missed, and looks like obsolete, keep it as is since other property syntaxes should be changed too; https://www.w3.org/TR/2015/WD-css-grid-1-20150917/#typedef-name-repeat\",\"syntax\":\"repeat( [ <positive-integer> | auto-fill ], <line-names>+)\"},\"named-color\":{\"comment\":\"added non standard color names\",\"syntax\":\"| <-non-standard-color>\"},\"paint\":{\"comment\":\"used by SVG https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint\",\"syntax\":\"none | <color> | <url> [ none | <color> ]? | context-fill | context-stroke\"},\"page-size\":{\"comment\":\"https://www.w3.org/TR/css-page-3/#typedef-page-size-page-size\",\"syntax\":\"A5 | A4 | A3 | B5 | B4 | JIS-B5 | JIS-B4 | letter | legal | ledger\"},\"ratio\":{\"comment\":\"missed, https://drafts.csswg.org/mediaqueries-4/#typedef-ratio\",\"syntax\":\"<integer> / <integer>\"},\"right\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"shape\":{\"comment\":\"missed spaces in function body and add backwards compatible syntax\",\"syntax\":\"rect( <top>, <right>, <bottom>, <left> ) | rect( <top> <right> <bottom> <left> )\"},\"svg-length\":{\"comment\":\"All coordinates and lengths in SVG can be specified with or without a unit identifier\",\"references\":[\"https://www.w3.org/TR/SVG11/coords.html#Units\"],\"syntax\":\"<percentage> | <length> | <number>\"},\"svg-writing-mode\":{\"comment\":\"SVG specific keywords (deprecated for CSS)\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/writing-mode\",\"https://www.w3.org/TR/SVG/text.html#WritingModeProperty\"],\"syntax\":\"lr-tb | rl-tb | tb-rl | lr | rl | tb\"},\"top\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"track-group\":{\"comment\":\"used by old grid-columns and grid-rows syntax v0\",\"syntax\":\"'(' [ <string>* <track-minmax> <string>* ]+ ')' [ '[' <positive-integer> ']' ]? | <track-minmax>\"},\"track-list-v0\":{\"comment\":\"used by old grid-columns and grid-rows syntax v0\",\"syntax\":\"[ <string>* <track-group> <string>* ]+ | none\"},\"track-minmax\":{\"comment\":\"used by old grid-columns and grid-rows syntax v0\",\"syntax\":\"minmax( <track-breadth> , <track-breadth> ) | auto | <track-breadth> | fit-content\"},\"x\":{\"comment\":\"missed; not sure we should add it, but no others except `cursor` is using it so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor\",\"syntax\":\"<number>\"},\"y\":{\"comment\":\"missed; not sure we should add it, but no others except `cursor` is using so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor\",\"syntax\":\"<number>\"},\"declaration\":{\"comment\":\"missed, restored by https://drafts.csswg.org/css-syntax\",\"syntax\":\"<ident-token> : <declaration-value>? [ '!' important ]?\"},\"declaration-list\":{\"comment\":\"missed, restored by https://drafts.csswg.org/css-syntax\",\"syntax\":\"[ <declaration>? ';' ]* <declaration>?\"},\"url\":{\"comment\":\"https://drafts.csswg.org/css-values-4/#urls\",\"syntax\":\"url( <string> <url-modifier>* ) | <url-token>\"},\"url-modifier\":{\"comment\":\"https://drafts.csswg.org/css-values-4/#typedef-url-modifier\",\"syntax\":\"<ident> | <function-token> <any-value> )\"},\"number-zero-one\":{\"syntax\":\"<number [0,1]>\"},\"number-one-or-greater\":{\"syntax\":\"<number [1,∞]>\"},\"positive-integer\":{\"syntax\":\"<integer [0,∞]>\"},\"-non-standard-display\":{\"syntax\":\"-ms-inline-flexbox | -ms-grid | -ms-inline-grid | -webkit-flex | -webkit-inline-flex | -webkit-box | -webkit-inline-box | -moz-inline-stack | -moz-box | -moz-inline-box\"}}}");

/***/ }),

/***/ "./node_modules/css-tree/lib/common/List.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/common/List.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//
//                              list
//                            ┌──────┐
//             ┌──────────────┼─head │
//             │              │ tail─┼──────────────┐
//             │              └──────┘              │
//             ▼                                    ▼
//            item        item        item        item
//          ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐
//  null ◀──┼─prev │◀───┼─prev │◀───┼─prev │◀───┼─prev │
//          │ next─┼───▶│ next─┼───▶│ next─┼───▶│ next─┼──▶ null
//          ├──────┤    ├──────┤    ├──────┤    ├──────┤
//          │ data │    │ data │    │ data │    │ data │
//          └──────┘    └──────┘    └──────┘    └──────┘
//

function createItem(data) {
    return {
        prev: null,
        next: null,
        data: data
    };
}

function allocateCursor(node, prev, next) {
    var cursor;

    if (cursors !== null) {
        cursor = cursors;
        cursors = cursors.cursor;
        cursor.prev = prev;
        cursor.next = next;
        cursor.cursor = node.cursor;
    } else {
        cursor = {
            prev: prev,
            next: next,
            cursor: node.cursor
        };
    }

    node.cursor = cursor;

    return cursor;
}

function releaseCursor(node) {
    var cursor = node.cursor;

    node.cursor = cursor.cursor;
    cursor.prev = null;
    cursor.next = null;
    cursor.cursor = cursors;
    cursors = cursor;
}

var cursors = null;
var List = function() {
    this.cursor = null;
    this.head = null;
    this.tail = null;
};

List.createItem = createItem;
List.prototype.createItem = createItem;

List.prototype.updateCursors = function(prevOld, prevNew, nextOld, nextNew) {
    var cursor = this.cursor;

    while (cursor !== null) {
        if (cursor.prev === prevOld) {
            cursor.prev = prevNew;
        }

        if (cursor.next === nextOld) {
            cursor.next = nextNew;
        }

        cursor = cursor.cursor;
    }
};

List.prototype.getSize = function() {
    var size = 0;
    var cursor = this.head;

    while (cursor) {
        size++;
        cursor = cursor.next;
    }

    return size;
};

List.prototype.fromArray = function(array) {
    var cursor = null;

    this.head = null;

    for (var i = 0; i < array.length; i++) {
        var item = createItem(array[i]);

        if (cursor !== null) {
            cursor.next = item;
        } else {
            this.head = item;
        }

        item.prev = cursor;
        cursor = item;
    }

    this.tail = cursor;

    return this;
};

List.prototype.toArray = function() {
    var cursor = this.head;
    var result = [];

    while (cursor) {
        result.push(cursor.data);
        cursor = cursor.next;
    }

    return result;
};

List.prototype.toJSON = List.prototype.toArray;

List.prototype.isEmpty = function() {
    return this.head === null;
};

List.prototype.first = function() {
    return this.head && this.head.data;
};

List.prototype.last = function() {
    return this.tail && this.tail.data;
};

List.prototype.each = function(fn, context) {
    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, null, this.head);

    while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;

        fn.call(context, item.data, item, this);
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.forEach = List.prototype.each;

List.prototype.eachRight = function(fn, context) {
    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, this.tail, null);

    while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;

        fn.call(context, item.data, item, this);
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.forEachRight = List.prototype.eachRight;

List.prototype.reduce = function(fn, initialValue, context) {
    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, null, this.head);
    var acc = initialValue;

    while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;

        acc = fn.call(context, acc, item.data, item, this);
    }

    // pop cursor
    releaseCursor(this);

    return acc;
};

List.prototype.reduceRight = function(fn, initialValue, context) {
    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, this.tail, null);
    var acc = initialValue;

    while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;

        acc = fn.call(context, acc, item.data, item, this);
    }

    // pop cursor
    releaseCursor(this);

    return acc;
};

List.prototype.nextUntil = function(start, fn, context) {
    if (start === null) {
        return;
    }

    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, null, start);

    while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;

        if (fn.call(context, item.data, item, this)) {
            break;
        }
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.prevUntil = function(start, fn, context) {
    if (start === null) {
        return;
    }

    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, start, null);

    while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;

        if (fn.call(context, item.data, item, this)) {
            break;
        }
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.some = function(fn, context) {
    var cursor = this.head;

    if (context === undefined) {
        context = this;
    }

    while (cursor !== null) {
        if (fn.call(context, cursor.data, cursor, this)) {
            return true;
        }

        cursor = cursor.next;
    }

    return false;
};

List.prototype.map = function(fn, context) {
    var result = new List();
    var cursor = this.head;

    if (context === undefined) {
        context = this;
    }

    while (cursor !== null) {
        result.appendData(fn.call(context, cursor.data, cursor, this));
        cursor = cursor.next;
    }

    return result;
};

List.prototype.filter = function(fn, context) {
    var result = new List();
    var cursor = this.head;

    if (context === undefined) {
        context = this;
    }

    while (cursor !== null) {
        if (fn.call(context, cursor.data, cursor, this)) {
            result.appendData(cursor.data);
        }
        cursor = cursor.next;
    }

    return result;
};

List.prototype.clear = function() {
    this.head = null;
    this.tail = null;
};

List.prototype.copy = function() {
    var result = new List();
    var cursor = this.head;

    while (cursor !== null) {
        result.insert(createItem(cursor.data));
        cursor = cursor.next;
    }

    return result;
};

List.prototype.prepend = function(item) {
    //      head
    //    ^
    // item
    this.updateCursors(null, item, this.head, item);

    // insert to the beginning of the list
    if (this.head !== null) {
        // new item <- first item
        this.head.prev = item;

        // new item -> first item
        item.next = this.head;
    } else {
        // if list has no head, then it also has no tail
        // in this case tail points to the new item
        this.tail = item;
    }

    // head always points to new item
    this.head = item;

    return this;
};

List.prototype.prependData = function(data) {
    return this.prepend(createItem(data));
};

List.prototype.append = function(item) {
    return this.insert(item);
};

List.prototype.appendData = function(data) {
    return this.insert(createItem(data));
};

List.prototype.insert = function(item, before) {
    if (before !== undefined && before !== null) {
        // prev   before
        //      ^
        //     item
        this.updateCursors(before.prev, item, before, item);

        if (before.prev === null) {
            // insert to the beginning of list
            if (this.head !== before) {
                throw new Error('before doesn\'t belong to list');
            }

            // since head points to before therefore list doesn't empty
            // no need to check tail
            this.head = item;
            before.prev = item;
            item.next = before;

            this.updateCursors(null, item);
        } else {

            // insert between two items
            before.prev.next = item;
            item.prev = before.prev;

            before.prev = item;
            item.next = before;
        }
    } else {
        // tail
        //      ^
        //      item
        this.updateCursors(this.tail, item, null, item);

        // insert to the ending of the list
        if (this.tail !== null) {
            // last item -> new item
            this.tail.next = item;

            // last item <- new item
            item.prev = this.tail;
        } else {
            // if list has no tail, then it also has no head
            // in this case head points to new item
            this.head = item;
        }

        // tail always points to new item
        this.tail = item;
    }

    return this;
};

List.prototype.insertData = function(data, before) {
    return this.insert(createItem(data), before);
};

List.prototype.remove = function(item) {
    //      item
    //       ^
    // prev     next
    this.updateCursors(item, item.prev, item, item.next);

    if (item.prev !== null) {
        item.prev.next = item.next;
    } else {
        if (this.head !== item) {
            throw new Error('item doesn\'t belong to list');
        }

        this.head = item.next;
    }

    if (item.next !== null) {
        item.next.prev = item.prev;
    } else {
        if (this.tail !== item) {
            throw new Error('item doesn\'t belong to list');
        }

        this.tail = item.prev;
    }

    item.prev = null;
    item.next = null;

    return item;
};

List.prototype.push = function(data) {
    this.insert(createItem(data));
};

List.prototype.pop = function() {
    if (this.tail !== null) {
        return this.remove(this.tail);
    }
};

List.prototype.unshift = function(data) {
    this.prepend(createItem(data));
};

List.prototype.shift = function() {
    if (this.head !== null) {
        return this.remove(this.head);
    }
};

List.prototype.prependList = function(list) {
    return this.insertList(list, this.head);
};

List.prototype.appendList = function(list) {
    return this.insertList(list);
};

List.prototype.insertList = function(list, before) {
    // ignore empty lists
    if (list.head === null) {
        return this;
    }

    if (before !== undefined && before !== null) {
        this.updateCursors(before.prev, list.tail, before, list.head);

        // insert in the middle of dist list
        if (before.prev !== null) {
            // before.prev <-> list.head
            before.prev.next = list.head;
            list.head.prev = before.prev;
        } else {
            this.head = list.head;
        }

        before.prev = list.tail;
        list.tail.next = before;
    } else {
        this.updateCursors(this.tail, list.tail, null, list.head);

        // insert to end of the list
        if (this.tail !== null) {
            // if destination list has a tail, then it also has a head,
            // but head doesn't change

            // dest tail -> source head
            this.tail.next = list.head;

            // dest tail <- source head
            list.head.prev = this.tail;
        } else {
            // if list has no a tail, then it also has no a head
            // in this case points head to new item
            this.head = list.head;
        }

        // tail always start point to new item
        this.tail = list.tail;
    }

    list.head = null;
    list.tail = null;

    return this;
};

List.prototype.replace = function(oldItem, newItemOrList) {
    if ('head' in newItemOrList) {
        this.insertList(newItemOrList, oldItem);
    } else {
        this.insert(newItemOrList, oldItem);
    }

    this.remove(oldItem);
};

module.exports = List;


/***/ }),

/***/ "./node_modules/css-tree/lib/common/OffsetToLocation.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/common/OffsetToLocation.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var adoptBuffer = __webpack_require__(/*! ./adopt-buffer */ "./node_modules/css-tree/lib/common/adopt-buffer.js");
var isBOM = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isBOM;

var N = 10;
var F = 12;
var R = 13;

function computeLinesAndColumns(host, source) {
    var sourceLength = source.length;
    var lines = adoptBuffer(host.lines, sourceLength); // +1
    var line = host.startLine;
    var columns = adoptBuffer(host.columns, sourceLength);
    var column = host.startColumn;
    var startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0;

    for (var i = startOffset; i < sourceLength; i++) { // -1
        var code = source.charCodeAt(i);

        lines[i] = line;
        columns[i] = column++;

        if (code === N || code === R || code === F) {
            if (code === R && i + 1 < sourceLength && source.charCodeAt(i + 1) === N) {
                i++;
                lines[i] = line;
                columns[i] = column;
            }

            line++;
            column = 1;
        }
    }

    lines[i] = line;
    columns[i] = column;

    host.lines = lines;
    host.columns = columns;
}

var OffsetToLocation = function() {
    this.lines = null;
    this.columns = null;
    this.linesAndColumnsComputed = false;
};

OffsetToLocation.prototype = {
    setSource: function(source, startOffset, startLine, startColumn) {
        this.source = source;
        this.startOffset = typeof startOffset === 'undefined' ? 0 : startOffset;
        this.startLine = typeof startLine === 'undefined' ? 1 : startLine;
        this.startColumn = typeof startColumn === 'undefined' ? 1 : startColumn;
        this.linesAndColumnsComputed = false;
    },

    ensureLinesAndColumnsComputed: function() {
        if (!this.linesAndColumnsComputed) {
            computeLinesAndColumns(this, this.source);
            this.linesAndColumnsComputed = true;
        }
    },
    getLocation: function(offset, filename) {
        this.ensureLinesAndColumnsComputed();

        return {
            source: filename,
            offset: this.startOffset + offset,
            line: this.lines[offset],
            column: this.columns[offset]
        };
    },
    getLocationRange: function(start, end, filename) {
        this.ensureLinesAndColumnsComputed();

        return {
            source: filename,
            start: {
                offset: this.startOffset + start,
                line: this.lines[start],
                column: this.columns[start]
            },
            end: {
                offset: this.startOffset + end,
                line: this.lines[end],
                column: this.columns[end]
            }
        };
    }
};

module.exports = OffsetToLocation;


/***/ }),

/***/ "./node_modules/css-tree/lib/common/SyntaxError.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/common/SyntaxError.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createCustomError = __webpack_require__(/*! ../utils/createCustomError */ "./node_modules/css-tree/lib/utils/createCustomError.js");
var MAX_LINE_LENGTH = 100;
var OFFSET_CORRECTION = 60;
var TAB_REPLACEMENT = '    ';

function sourceFragment(error, extraLines) {
    function processLines(start, end) {
        return lines.slice(start, end).map(function(line, idx) {
            var num = String(start + idx + 1);

            while (num.length < maxNumLength) {
                num = ' ' + num;
            }

            return num + ' |' + line;
        }).join('\n');
    }

    var lines = error.source.split(/\r\n?|\n|\f/);
    var line = error.line;
    var column = error.column;
    var startLine = Math.max(1, line - extraLines) - 1;
    var endLine = Math.min(line + extraLines, lines.length + 1);
    var maxNumLength = Math.max(4, String(endLine).length) + 1;
    var cutLeft = 0;

    // column correction according to replaced tab before column
    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;

    if (column > MAX_LINE_LENGTH) {
        cutLeft = column - OFFSET_CORRECTION + 3;
        column = OFFSET_CORRECTION - 2;
    }

    for (var i = startLine; i <= endLine; i++) {
        if (i >= 0 && i < lines.length) {
            lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
            lines[i] =
                (cutLeft > 0 && lines[i].length > cutLeft ? '\u2026' : '') +
                lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
                (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '\u2026' : '');
        }
    }

    return [
        processLines(startLine, line),
        new Array(column + maxNumLength + 2).join('-') + '^',
        processLines(line, endLine)
    ].filter(Boolean).join('\n');
}

var SyntaxError = function(message, source, offset, line, column) {
    var error = createCustomError('SyntaxError', message);

    error.source = source;
    error.offset = offset;
    error.line = line;
    error.column = column;

    error.sourceFragment = function(extraLines) {
        return sourceFragment(error, isNaN(extraLines) ? 0 : extraLines);
    };
    Object.defineProperty(error, 'formattedMessage', {
        get: function() {
            return (
                'Parse error: ' + error.message + '\n' +
                sourceFragment(error, 2)
            );
        }
    });

    // for backward capability
    error.parseError = {
        offset: offset,
        line: line,
        column: column
    };

    return error;
};

module.exports = SyntaxError;


/***/ }),

/***/ "./node_modules/css-tree/lib/common/TokenStream.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/common/TokenStream.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(/*! ../tokenizer/const */ "./node_modules/css-tree/lib/tokenizer/const.js");
var TYPE = constants.TYPE;
var NAME = constants.NAME;

var utils = __webpack_require__(/*! ../tokenizer/utils */ "./node_modules/css-tree/lib/tokenizer/utils.js");
var cmpStr = utils.cmpStr;

var EOF = TYPE.EOF;
var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;

var OFFSET_MASK = 0x00FFFFFF;
var TYPE_SHIFT = 24;

var TokenStream = function() {
    this.offsetAndType = null;
    this.balance = null;

    this.reset();
};

TokenStream.prototype = {
    reset: function() {
        this.eof = false;
        this.tokenIndex = -1;
        this.tokenType = 0;
        this.tokenStart = this.firstCharOffset;
        this.tokenEnd = this.firstCharOffset;
    },

    lookupType: function(offset) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset] >> TYPE_SHIFT;
        }

        return EOF;
    },
    lookupOffset: function(offset) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset - 1] & OFFSET_MASK;
        }

        return this.source.length;
    },
    lookupValue: function(offset, referenceStr) {
        offset += this.tokenIndex;

        if (offset < this.tokenCount) {
            return cmpStr(
                this.source,
                this.offsetAndType[offset - 1] & OFFSET_MASK,
                this.offsetAndType[offset] & OFFSET_MASK,
                referenceStr
            );
        }

        return false;
    },
    getTokenStart: function(tokenIndex) {
        if (tokenIndex === this.tokenIndex) {
            return this.tokenStart;
        }

        if (tokenIndex > 0) {
            return tokenIndex < this.tokenCount
                ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK
                : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
        }

        return this.firstCharOffset;
    },

    // TODO: -> skipUntilBalanced
    getRawLength: function(startToken, mode) {
        var cursor = startToken;
        var balanceEnd;
        var offset = this.offsetAndType[Math.max(cursor - 1, 0)] & OFFSET_MASK;
        var type;

        loop:
        for (; cursor < this.tokenCount; cursor++) {
            balanceEnd = this.balance[cursor];

            // stop scanning on balance edge that points to offset before start token
            if (balanceEnd < startToken) {
                break loop;
            }

            type = this.offsetAndType[cursor] >> TYPE_SHIFT;

            // check token is stop type
            switch (mode(type, this.source, offset)) {
                case 1:
                    break loop;

                case 2:
                    cursor++;
                    break loop;

                default:
                    // fast forward to the end of balanced block
                    if (this.balance[balanceEnd] === cursor) {
                        cursor = balanceEnd;
                    }

                    offset = this.offsetAndType[cursor] & OFFSET_MASK;
            }
        }

        return cursor - this.tokenIndex;
    },
    isBalanceEdge: function(pos) {
        return this.balance[this.tokenIndex] < pos;
    },
    isDelim: function(code, offset) {
        if (offset) {
            return (
                this.lookupType(offset) === TYPE.Delim &&
                this.source.charCodeAt(this.lookupOffset(offset)) === code
            );
        }

        return (
            this.tokenType === TYPE.Delim &&
            this.source.charCodeAt(this.tokenStart) === code
        );
    },

    getTokenValue: function() {
        return this.source.substring(this.tokenStart, this.tokenEnd);
    },
    getTokenLength: function() {
        return this.tokenEnd - this.tokenStart;
    },
    substrToCursor: function(start) {
        return this.source.substring(start, this.tokenStart);
    },

    skipWS: function() {
        for (var i = this.tokenIndex, skipTokenCount = 0; i < this.tokenCount; i++, skipTokenCount++) {
            if ((this.offsetAndType[i] >> TYPE_SHIFT) !== WHITESPACE) {
                break;
            }
        }

        if (skipTokenCount > 0) {
            this.skip(skipTokenCount);
        }
    },
    skipSC: function() {
        while (this.tokenType === WHITESPACE || this.tokenType === COMMENT) {
            this.next();
        }
    },
    skip: function(tokenCount) {
        var next = this.tokenIndex + tokenCount;

        if (next < this.tokenCount) {
            this.tokenIndex = next;
            this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.tokenIndex = this.tokenCount;
            this.next();
        }
    },
    next: function() {
        var next = this.tokenIndex + 1;

        if (next < this.tokenCount) {
            this.tokenIndex = next;
            this.tokenStart = this.tokenEnd;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.tokenIndex = this.tokenCount;
            this.eof = true;
            this.tokenType = EOF;
            this.tokenStart = this.tokenEnd = this.source.length;
        }
    },

    forEachToken(fn) {
        for (var i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
            var start = offset;
            var item = this.offsetAndType[i];
            var end = item & OFFSET_MASK;
            var type = item >> TYPE_SHIFT;

            offset = end;

            fn(type, start, end, i);
        }
    },

    dump() {
        var tokens = new Array(this.tokenCount);

        this.forEachToken((type, start, end, index) => {
            tokens[index] = {
                idx: index,
                type: NAME[type],
                chunk: this.source.substring(start, end),
                balance: this.balance[index]
            };
        });

        return tokens;
    }
};

module.exports = TokenStream;


/***/ }),

/***/ "./node_modules/css-tree/lib/common/adopt-buffer.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/common/adopt-buffer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var MIN_SIZE = 16 * 1024;
var SafeUint32Array = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported

module.exports = function adoptBuffer(buffer, size) {
    if (buffer === null || buffer.length < size) {
        return new SafeUint32Array(Math.max(size + 1024, MIN_SIZE));
    }

    return buffer;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/convertor/create.js":
/*!*******************************************************!*\
  !*** ./node_modules/css-tree/lib/convertor/create.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(/*! ../common/List */ "./node_modules/css-tree/lib/common/List.js");

module.exports = function createConvertors(walk) {
    return {
        fromPlainObject: function(ast) {
            walk(ast, {
                enter: function(node) {
                    if (node.children && node.children instanceof List === false) {
                        node.children = new List().fromArray(node.children);
                    }
                }
            });

            return ast;
        },
        toPlainObject: function(ast) {
            walk(ast, {
                leave: function(node) {
                    if (node.children && node.children instanceof List) {
                        node.children = node.children.toArray();
                    }
                }
            });

            return ast;
        }
    };
};


/***/ }),

/***/ "./node_modules/css-tree/lib/definition-syntax/SyntaxError.js":
/*!********************************************************************!*\
  !*** ./node_modules/css-tree/lib/definition-syntax/SyntaxError.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createCustomError = __webpack_require__(/*! ../utils/createCustomError */ "./node_modules/css-tree/lib/utils/createCustomError.js");

module.exports = function SyntaxError(message, input, offset) {
    var error = createCustomError('SyntaxError', message);

    error.input = input;
    error.offset = offset;
    error.rawMessage = message;
    error.message = error.rawMessage + '\n' +
        '  ' + error.input + '\n' +
        '--' + new Array((error.offset || error.input.length) + 1).join('-') + '^';

    return error;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/definition-syntax/generate.js":
/*!*****************************************************************!*\
  !*** ./node_modules/css-tree/lib/definition-syntax/generate.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function noop(value) {
    return value;
}

function generateMultiplier(multiplier) {
    if (multiplier.min === 0 && multiplier.max === 0) {
        return '*';
    }

    if (multiplier.min === 0 && multiplier.max === 1) {
        return '?';
    }

    if (multiplier.min === 1 && multiplier.max === 0) {
        return multiplier.comma ? '#' : '+';
    }

    if (multiplier.min === 1 && multiplier.max === 1) {
        return '';
    }

    return (
        (multiplier.comma ? '#' : '') +
        (multiplier.min === multiplier.max
            ? '{' + multiplier.min + '}'
            : '{' + multiplier.min + ',' + (multiplier.max !== 0 ? multiplier.max : '') + '}'
        )
    );
}

function generateTypeOpts(node) {
    switch (node.type) {
        case 'Range':
            return (
                ' [' +
                (node.min === null ? '-∞' : node.min) +
                ',' +
                (node.max === null ? '∞' : node.max) +
                ']'
            );

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }
}

function generateSequence(node, decorate, forceBraces, compact) {
    var combinator = node.combinator === ' ' || compact ? node.combinator : ' ' + node.combinator + ' ';
    var result = node.terms.map(function(term) {
        return generate(term, decorate, forceBraces, compact);
    }).join(combinator);

    if (node.explicit || forceBraces) {
        result = (compact || result[0] === ',' ? '[' : '[ ') + result + (compact ? ']' : ' ]');
    }

    return result;
}

function generate(node, decorate, forceBraces, compact) {
    var result;

    switch (node.type) {
        case 'Group':
            result =
                generateSequence(node, decorate, forceBraces, compact) +
                (node.disallowEmpty ? '!' : '');
            break;

        case 'Multiplier':
            // return since node is a composition
            return (
                generate(node.term, decorate, forceBraces, compact) +
                decorate(generateMultiplier(node), node)
            );

        case 'Type':
            result = '<' + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : '') + '>';
            break;

        case 'Property':
            result = '<\'' + node.name + '\'>';
            break;

        case 'Keyword':
            result = node.name;
            break;

        case 'AtKeyword':
            result = '@' + node.name;
            break;

        case 'Function':
            result = node.name + '(';
            break;

        case 'String':
        case 'Token':
            result = node.value;
            break;

        case 'Comma':
            result = ',';
            break;

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }

    return decorate(result, node);
}

module.exports = function(node, options) {
    var decorate = noop;
    var forceBraces = false;
    var compact = false;

    if (typeof options === 'function') {
        decorate = options;
    } else if (options) {
        forceBraces = Boolean(options.forceBraces);
        compact = Boolean(options.compact);
        if (typeof options.decorate === 'function') {
            decorate = options.decorate;
        }
    }

    return generate(node, decorate, forceBraces, compact);
};


/***/ }),

/***/ "./node_modules/css-tree/lib/definition-syntax/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/definition-syntax/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    SyntaxError: __webpack_require__(/*! ./SyntaxError */ "./node_modules/css-tree/lib/definition-syntax/SyntaxError.js"),
    parse: __webpack_require__(/*! ./parse */ "./node_modules/css-tree/lib/definition-syntax/parse.js"),
    generate: __webpack_require__(/*! ./generate */ "./node_modules/css-tree/lib/definition-syntax/generate.js"),
    walk: __webpack_require__(/*! ./walk */ "./node_modules/css-tree/lib/definition-syntax/walk.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/definition-syntax/parse.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/definition-syntax/parse.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Tokenizer = __webpack_require__(/*! ./tokenizer */ "./node_modules/css-tree/lib/definition-syntax/tokenizer.js");
var TAB = 9;
var N = 10;
var F = 12;
var R = 13;
var SPACE = 32;
var EXCLAMATIONMARK = 33;    // !
var NUMBERSIGN = 35;         // #
var AMPERSAND = 38;          // &
var APOSTROPHE = 39;         // '
var LEFTPARENTHESIS = 40;    // (
var RIGHTPARENTHESIS = 41;   // )
var ASTERISK = 42;           // *
var PLUSSIGN = 43;           // +
var COMMA = 44;              // ,
var HYPERMINUS = 45;         // -
var LESSTHANSIGN = 60;       // <
var GREATERTHANSIGN = 62;    // >
var QUESTIONMARK = 63;       // ?
var COMMERCIALAT = 64;       // @
var LEFTSQUAREBRACKET = 91;  // [
var RIGHTSQUAREBRACKET = 93; // ]
var LEFTCURLYBRACKET = 123;  // {
var VERTICALLINE = 124;      // |
var RIGHTCURLYBRACKET = 125; // }
var INFINITY = 8734;         // ∞
var NAME_CHAR = createCharMap(function(ch) {
    return /[a-zA-Z0-9\-]/.test(ch);
});
var COMBINATOR_PRECEDENCE = {
    ' ': 1,
    '&&': 2,
    '||': 3,
    '|': 4
};

function createCharMap(fn) {
    var array = typeof Uint32Array === 'function' ? new Uint32Array(128) : new Array(128);
    for (var i = 0; i < 128; i++) {
        array[i] = fn(String.fromCharCode(i)) ? 1 : 0;
    }
    return array;
}

function scanSpaces(tokenizer) {
    return tokenizer.substringToPos(
        tokenizer.findWsEnd(tokenizer.pos)
    );
}

function scanWord(tokenizer) {
    var end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        var code = tokenizer.str.charCodeAt(end);
        if (code >= 128 || NAME_CHAR[code] === 0) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a keyword');
    }

    return tokenizer.substringToPos(end);
}

function scanNumber(tokenizer) {
    var end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        var code = tokenizer.str.charCodeAt(end);
        if (code < 48 || code > 57) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a number');
    }

    return tokenizer.substringToPos(end);
}

function scanString(tokenizer) {
    var end = tokenizer.str.indexOf('\'', tokenizer.pos + 1);

    if (end === -1) {
        tokenizer.pos = tokenizer.str.length;
        tokenizer.error('Expect an apostrophe');
    }

    return tokenizer.substringToPos(end + 1);
}

function readMultiplierRange(tokenizer) {
    var min = null;
    var max = null;

    tokenizer.eat(LEFTCURLYBRACKET);

    min = scanNumber(tokenizer);

    if (tokenizer.charCode() === COMMA) {
        tokenizer.pos++;
        if (tokenizer.charCode() !== RIGHTCURLYBRACKET) {
            max = scanNumber(tokenizer);
        }
    } else {
        max = min;
    }

    tokenizer.eat(RIGHTCURLYBRACKET);

    return {
        min: Number(min),
        max: max ? Number(max) : 0
    };
}

function readMultiplier(tokenizer) {
    var range = null;
    var comma = false;

    switch (tokenizer.charCode()) {
        case ASTERISK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 0
            };

            break;

        case PLUSSIGN:
            tokenizer.pos++;

            range = {
                min: 1,
                max: 0
            };

            break;

        case QUESTIONMARK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 1
            };

            break;

        case NUMBERSIGN:
            tokenizer.pos++;

            comma = true;

            if (tokenizer.charCode() === LEFTCURLYBRACKET) {
                range = readMultiplierRange(tokenizer);
            } else {
                range = {
                    min: 1,
                    max: 0
                };
            }

            break;

        case LEFTCURLYBRACKET:
            range = readMultiplierRange(tokenizer);
            break;

        default:
            return null;
    }

    return {
        type: 'Multiplier',
        comma: comma,
        min: range.min,
        max: range.max,
        term: null
    };
}

function maybeMultiplied(tokenizer, node) {
    var multiplier = readMultiplier(tokenizer);

    if (multiplier !== null) {
        multiplier.term = node;
        return multiplier;
    }

    return node;
}

function maybeToken(tokenizer) {
    var ch = tokenizer.peek();

    if (ch === '') {
        return null;
    }

    return {
        type: 'Token',
        value: ch
    };
}

function readProperty(tokenizer) {
    var name;

    tokenizer.eat(LESSTHANSIGN);
    tokenizer.eat(APOSTROPHE);

    name = scanWord(tokenizer);

    tokenizer.eat(APOSTROPHE);
    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Property',
        name: name
    });
}

// https://drafts.csswg.org/css-values-3/#numeric-ranges
// 4.1. Range Restrictions and Range Definition Notation
//
// Range restrictions can be annotated in the numeric type notation using CSS bracketed
// range notation—[min,max]—within the angle brackets, after the identifying keyword,
// indicating a closed range between (and including) min and max.
// For example, <integer [0, 10]> indicates an integer between 0 and 10, inclusive.
function readTypeRange(tokenizer) {
    // use null for Infinity to make AST format JSON serializable/deserializable
    var min = null; // -Infinity
    var max = null; // Infinity
    var sign = 1;

    tokenizer.eat(LEFTSQUAREBRACKET);

    if (tokenizer.charCode() === HYPERMINUS) {
        tokenizer.peek();
        sign = -1;
    }

    if (sign == -1 && tokenizer.charCode() === INFINITY) {
        tokenizer.peek();
    } else {
        min = sign * Number(scanNumber(tokenizer));
    }

    scanSpaces(tokenizer);
    tokenizer.eat(COMMA);
    scanSpaces(tokenizer);

    if (tokenizer.charCode() === INFINITY) {
        tokenizer.peek();
    } else {
        sign = 1;

        if (tokenizer.charCode() === HYPERMINUS) {
            tokenizer.peek();
            sign = -1;
        }

        max = sign * Number(scanNumber(tokenizer));
    }

    tokenizer.eat(RIGHTSQUAREBRACKET);

    // If no range is indicated, either by using the bracketed range notation
    // or in the property description, then [−∞,∞] is assumed.
    if (min === null && max === null) {
        return null;
    }

    return {
        type: 'Range',
        min: min,
        max: max
    };
}

function readType(tokenizer) {
    var name;
    var opts = null;

    tokenizer.eat(LESSTHANSIGN);
    name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS &&
        tokenizer.nextCharCode() === RIGHTPARENTHESIS) {
        tokenizer.pos += 2;
        name += '()';
    }

    if (tokenizer.charCodeAt(tokenizer.findWsEnd(tokenizer.pos)) === LEFTSQUAREBRACKET) {
        scanSpaces(tokenizer);
        opts = readTypeRange(tokenizer);
    }

    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Type',
        name: name,
        opts: opts
    });
}

function readKeywordOrFunction(tokenizer) {
    var name;

    name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS) {
        tokenizer.pos++;

        return {
            type: 'Function',
            name: name
        };
    }

    return maybeMultiplied(tokenizer, {
        type: 'Keyword',
        name: name
    });
}

function regroupTerms(terms, combinators) {
    function createGroup(terms, combinator) {
        return {
            type: 'Group',
            terms: terms,
            combinator: combinator,
            disallowEmpty: false,
            explicit: false
        };
    }

    combinators = Object.keys(combinators).sort(function(a, b) {
        return COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b];
    });

    while (combinators.length > 0) {
        var combinator = combinators.shift();
        for (var i = 0, subgroupStart = 0; i < terms.length; i++) {
            var term = terms[i];
            if (term.type === 'Combinator') {
                if (term.value === combinator) {
                    if (subgroupStart === -1) {
                        subgroupStart = i - 1;
                    }
                    terms.splice(i, 1);
                    i--;
                } else {
                    if (subgroupStart !== -1 && i - subgroupStart > 1) {
                        terms.splice(
                            subgroupStart,
                            i - subgroupStart,
                            createGroup(terms.slice(subgroupStart, i), combinator)
                        );
                        i = subgroupStart + 1;
                    }
                    subgroupStart = -1;
                }
            }
        }

        if (subgroupStart !== -1 && combinators.length) {
            terms.splice(
                subgroupStart,
                i - subgroupStart,
                createGroup(terms.slice(subgroupStart, i), combinator)
            );
        }
    }

    return combinator;
}

function readImplicitGroup(tokenizer) {
    var terms = [];
    var combinators = {};
    var token;
    var prevToken = null;
    var prevTokenPos = tokenizer.pos;

    while (token = peek(tokenizer)) {
        if (token.type !== 'Spaces') {
            if (token.type === 'Combinator') {
                // check for combinator in group beginning and double combinator sequence
                if (prevToken === null || prevToken.type === 'Combinator') {
                    tokenizer.pos = prevTokenPos;
                    tokenizer.error('Unexpected combinator');
                }

                combinators[token.value] = true;
            } else if (prevToken !== null && prevToken.type !== 'Combinator') {
                combinators[' '] = true;  // a b
                terms.push({
                    type: 'Combinator',
                    value: ' '
                });
            }

            terms.push(token);
            prevToken = token;
            prevTokenPos = tokenizer.pos;
        }
    }

    // check for combinator in group ending
    if (prevToken !== null && prevToken.type === 'Combinator') {
        tokenizer.pos -= prevTokenPos;
        tokenizer.error('Unexpected combinator');
    }

    return {
        type: 'Group',
        terms: terms,
        combinator: regroupTerms(terms, combinators) || ' ',
        disallowEmpty: false,
        explicit: false
    };
}

function readGroup(tokenizer) {
    var result;

    tokenizer.eat(LEFTSQUAREBRACKET);
    result = readImplicitGroup(tokenizer);
    tokenizer.eat(RIGHTSQUAREBRACKET);

    result.explicit = true;

    if (tokenizer.charCode() === EXCLAMATIONMARK) {
        tokenizer.pos++;
        result.disallowEmpty = true;
    }

    return result;
}

function peek(tokenizer) {
    var code = tokenizer.charCode();

    if (code < 128 && NAME_CHAR[code] === 1) {
        return readKeywordOrFunction(tokenizer);
    }

    switch (code) {
        case RIGHTSQUAREBRACKET:
            // don't eat, stop scan a group
            break;

        case LEFTSQUAREBRACKET:
            return maybeMultiplied(tokenizer, readGroup(tokenizer));

        case LESSTHANSIGN:
            return tokenizer.nextCharCode() === APOSTROPHE
                ? readProperty(tokenizer)
                : readType(tokenizer);

        case VERTICALLINE:
            return {
                type: 'Combinator',
                value: tokenizer.substringToPos(
                    tokenizer.nextCharCode() === VERTICALLINE
                        ? tokenizer.pos + 2
                        : tokenizer.pos + 1
                )
            };

        case AMPERSAND:
            tokenizer.pos++;
            tokenizer.eat(AMPERSAND);

            return {
                type: 'Combinator',
                value: '&&'
            };

        case COMMA:
            tokenizer.pos++;
            return {
                type: 'Comma'
            };

        case APOSTROPHE:
            return maybeMultiplied(tokenizer, {
                type: 'String',
                value: scanString(tokenizer)
            });

        case SPACE:
        case TAB:
        case N:
        case R:
        case F:
            return {
                type: 'Spaces',
                value: scanSpaces(tokenizer)
            };

        case COMMERCIALAT:
            code = tokenizer.nextCharCode();

            if (code < 128 && NAME_CHAR[code] === 1) {
                tokenizer.pos++;
                return {
                    type: 'AtKeyword',
                    name: scanWord(tokenizer)
                };
            }

            return maybeToken(tokenizer);

        case ASTERISK:
        case PLUSSIGN:
        case QUESTIONMARK:
        case NUMBERSIGN:
        case EXCLAMATIONMARK:
            // prohibited tokens (used as a multiplier start)
            break;

        case LEFTCURLYBRACKET:
            // LEFTCURLYBRACKET is allowed since mdn/data uses it w/o quoting
            // check next char isn't a number, because it's likely a disjoined multiplier
            code = tokenizer.nextCharCode();

            if (code < 48 || code > 57) {
                return maybeToken(tokenizer);
            }

            break;

        default:
            return maybeToken(tokenizer);
    }
}

function parse(source) {
    var tokenizer = new Tokenizer(source);
    var result = readImplicitGroup(tokenizer);

    if (tokenizer.pos !== source.length) {
        tokenizer.error('Unexpected input');
    }

    // reduce redundant groups with single group term
    if (result.terms.length === 1 && result.terms[0].type === 'Group') {
        result = result.terms[0];
    }

    return result;
}

// warm up parse to elimitate code branches that never execute
// fix soft deoptimizations (insufficient type feedback)
parse('[a&&<b>#|<\'c\'>*||e() f{2} /,(% g#{1,2} h{2,})]!');

module.exports = parse;


/***/ }),

/***/ "./node_modules/css-tree/lib/definition-syntax/tokenizer.js":
/*!******************************************************************!*\
  !*** ./node_modules/css-tree/lib/definition-syntax/tokenizer.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SyntaxError = __webpack_require__(/*! ./SyntaxError */ "./node_modules/css-tree/lib/definition-syntax/SyntaxError.js");

var TAB = 9;
var N = 10;
var F = 12;
var R = 13;
var SPACE = 32;

var Tokenizer = function(str) {
    this.str = str;
    this.pos = 0;
};

Tokenizer.prototype = {
    charCodeAt: function(pos) {
        return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
    },
    charCode: function() {
        return this.charCodeAt(this.pos);
    },
    nextCharCode: function() {
        return this.charCodeAt(this.pos + 1);
    },
    nextNonWsCode: function(pos) {
        return this.charCodeAt(this.findWsEnd(pos));
    },
    findWsEnd: function(pos) {
        for (; pos < this.str.length; pos++) {
            var code = this.str.charCodeAt(pos);
            if (code !== R && code !== N && code !== F && code !== SPACE && code !== TAB) {
                break;
            }
        }

        return pos;
    },
    substringToPos: function(end) {
        return this.str.substring(this.pos, this.pos = end);
    },
    eat: function(code) {
        if (this.charCode() !== code) {
            this.error('Expect `' + String.fromCharCode(code) + '`');
        }

        this.pos++;
    },
    peek: function() {
        return this.pos < this.str.length ? this.str.charAt(this.pos++) : '';
    },
    error: function(message) {
        throw new SyntaxError(message, this.str, this.pos);
    }
};

module.exports = Tokenizer;


/***/ }),

/***/ "./node_modules/css-tree/lib/definition-syntax/walk.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/definition-syntax/walk.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

module.exports = function(node, options, context) {
    function walk(node) {
        enter.call(context, node);

        switch (node.type) {
            case 'Group':
                node.terms.forEach(walk);
                break;

            case 'Multiplier':
                walk(node.term);
                break;

            case 'Type':
            case 'Property':
            case 'Keyword':
            case 'AtKeyword':
            case 'Function':
            case 'String':
            case 'Token':
            case 'Comma':
                break;

            default:
                throw new Error('Unknown type: ' + node.type);
        }

        leave.call(context, node);
    }

    var enter = noop;
    var leave = noop;

    if (typeof options === 'function') {
        enter = options;
    } else if (options) {
        enter = ensureFunction(options.enter);
        leave = ensureFunction(options.leave);
    }

    if (enter === noop && leave === noop) {
        throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
    }

    walk(node, context);
};


/***/ }),

/***/ "./node_modules/css-tree/lib/generator/create.js":
/*!*******************************************************!*\
  !*** ./node_modules/css-tree/lib/generator/create.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var sourceMap = __webpack_require__(/*! ./sourceMap */ "./node_modules/css-tree/lib/generator/sourceMap.js");
var hasOwnProperty = Object.prototype.hasOwnProperty;

function processChildren(node, delimeter) {
    var list = node.children;
    var prev = null;

    if (typeof delimeter !== 'function') {
        list.forEach(this.node, this);
    } else {
        list.forEach(function(node) {
            if (prev !== null) {
                delimeter.call(this, prev);
            }

            this.node(node);
            prev = node;
        }, this);
    }
}

module.exports = function createGenerator(config) {
    function processNode(node) {
        if (hasOwnProperty.call(types, node.type)) {
            types[node.type].call(this, node);
        } else {
            throw new Error('Unknown node type: ' + node.type);
        }
    }

    var types = {};

    if (config.node) {
        for (var name in config.node) {
            types[name] = config.node[name].generate;
        }
    }

    return function(node, options) {
        var buffer = '';
        var handlers = {
            children: processChildren,
            node: processNode,
            chunk: function(chunk) {
                buffer += chunk;
            },
            result: function() {
                return buffer;
            }
        };

        if (options) {
            if (typeof options.decorator === 'function') {
                handlers = options.decorator(handlers);
            }

            if (options.sourceMap) {
                handlers = sourceMap(handlers);
            }
        }

        handlers.node(node);

        return handlers.result();
    };
};


/***/ }),

/***/ "./node_modules/css-tree/lib/generator/sourceMap.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/generator/sourceMap.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SourceMapGenerator = __webpack_require__(/*! source-map/lib/source-map-generator */ "./node_modules/css-tree/node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator;
var trackNodes = {
    Atrule: true,
    Selector: true,
    Declaration: true
};

module.exports = function generateSourceMap(handlers) {
    var map = new SourceMapGenerator();
    var line = 1;
    var column = 0;
    var generated = {
        line: 1,
        column: 0
    };
    var original = {
        line: 0, // should be zero to add first mapping
        column: 0
    };
    var sourceMappingActive = false;
    var activatedGenerated = {
        line: 1,
        column: 0
    };
    var activatedMapping = {
        generated: activatedGenerated
    };

    var handlersNode = handlers.node;
    handlers.node = function(node) {
        if (node.loc && node.loc.start && trackNodes.hasOwnProperty(node.type)) {
            var nodeLine = node.loc.start.line;
            var nodeColumn = node.loc.start.column - 1;

            if (original.line !== nodeLine ||
                original.column !== nodeColumn) {
                original.line = nodeLine;
                original.column = nodeColumn;

                generated.line = line;
                generated.column = column;

                if (sourceMappingActive) {
                    sourceMappingActive = false;
                    if (generated.line !== activatedGenerated.line ||
                        generated.column !== activatedGenerated.column) {
                        map.addMapping(activatedMapping);
                    }
                }

                sourceMappingActive = true;
                map.addMapping({
                    source: node.loc.source,
                    original: original,
                    generated: generated
                });
            }
        }

        handlersNode.call(this, node);

        if (sourceMappingActive && trackNodes.hasOwnProperty(node.type)) {
            activatedGenerated.line = line;
            activatedGenerated.column = column;
        }
    };

    var handlersChunk = handlers.chunk;
    handlers.chunk = function(chunk) {
        for (var i = 0; i < chunk.length; i++) {
            if (chunk.charCodeAt(i) === 10) { // \n
                line++;
                column = 0;
            } else {
                column++;
            }
        }

        handlersChunk(chunk);
    };

    var handlersResult = handlers.result;
    handlers.result = function() {
        if (sourceMappingActive) {
            map.addMapping(activatedMapping);
        }

        return {
            css: handlersResult(),
            map: map
        };
    };

    return handlers;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/css-tree/lib/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./syntax */ "./node_modules/css-tree/lib/syntax/index.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/Lexer.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/Lexer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var SyntaxReferenceError = __webpack_require__(/*! ./error */ "./node_modules/css-tree/lib/lexer/error.js").SyntaxReferenceError;
var SyntaxMatchError = __webpack_require__(/*! ./error */ "./node_modules/css-tree/lib/lexer/error.js").SyntaxMatchError;
var names = __webpack_require__(/*! ../utils/names */ "./node_modules/css-tree/lib/utils/names.js");
var generic = __webpack_require__(/*! ./generic */ "./node_modules/css-tree/lib/lexer/generic.js");
var parse = __webpack_require__(/*! ../definition-syntax/parse */ "./node_modules/css-tree/lib/definition-syntax/parse.js");
var generate = __webpack_require__(/*! ../definition-syntax/generate */ "./node_modules/css-tree/lib/definition-syntax/generate.js");
var walk = __webpack_require__(/*! ../definition-syntax/walk */ "./node_modules/css-tree/lib/definition-syntax/walk.js");
var prepareTokens = __webpack_require__(/*! ./prepare-tokens */ "./node_modules/css-tree/lib/lexer/prepare-tokens.js");
var buildMatchGraph = __webpack_require__(/*! ./match-graph */ "./node_modules/css-tree/lib/lexer/match-graph.js").buildMatchGraph;
var matchAsTree = __webpack_require__(/*! ./match */ "./node_modules/css-tree/lib/lexer/match.js").matchAsTree;
var trace = __webpack_require__(/*! ./trace */ "./node_modules/css-tree/lib/lexer/trace.js");
var search = __webpack_require__(/*! ./search */ "./node_modules/css-tree/lib/lexer/search.js");
var getStructureFromConfig = __webpack_require__(/*! ./structure */ "./node_modules/css-tree/lib/lexer/structure.js").getStructureFromConfig;
var cssWideKeywords = buildMatchGraph('inherit | initial | unset');
var cssWideKeywordsWithExpression = buildMatchGraph('inherit | initial | unset | <-ms-legacy-expression>');

function dumpMapSyntax(map, compact, syntaxAsAst) {
    var result = {};

    for (var name in map) {
        if (map[name].syntax) {
            result[name] = syntaxAsAst
                ? map[name].syntax
                : generate(map[name].syntax, { compact: compact });
        }
    }

    return result;
}

function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
    const result = {};

    for (const [name, atrule] of Object.entries(map)) {
        result[name] = {
            prelude: atrule.prelude && (
                syntaxAsAst
                    ? atrule.prelude.syntax
                    : generate(atrule.prelude.syntax, { compact })
            ),
            descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
        };
    }

    return result;
}

function valueHasVar(tokens) {
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].value.toLowerCase() === 'var(') {
            return true;
        }
    }

    return false;
}

function buildMatchResult(match, error, iterations) {
    return {
        matched: match,
        iterations: iterations,
        error: error,
        getTrace: trace.getTrace,
        isType: trace.isType,
        isProperty: trace.isProperty,
        isKeyword: trace.isKeyword
    };
}

function matchSyntax(lexer, syntax, value, useCommon) {
    var tokens = prepareTokens(value, lexer.syntax);
    var result;

    if (valueHasVar(tokens)) {
        return buildMatchResult(null, new Error('Matching for a tree with var() is not supported'));
    }

    if (useCommon) {
        result = matchAsTree(tokens, lexer.valueCommonSyntax, lexer);
    }

    if (!useCommon || !result.match) {
        result = matchAsTree(tokens, syntax.match, lexer);
        if (!result.match) {
            return buildMatchResult(
                null,
                new SyntaxMatchError(result.reason, syntax.syntax, value, result),
                result.iterations
            );
        }
    }

    return buildMatchResult(result.match, null, result.iterations);
}

var Lexer = function(config, syntax, structure) {
    this.valueCommonSyntax = cssWideKeywords;
    this.syntax = syntax;
    this.generic = false;
    this.atrules = {};
    this.properties = {};
    this.types = {};
    this.structure = structure || getStructureFromConfig(config);

    if (config) {
        if (config.types) {
            for (var name in config.types) {
                this.addType_(name, config.types[name]);
            }
        }

        if (config.generic) {
            this.generic = true;
            for (var name in generic) {
                this.addType_(name, generic[name]);
            }
        }

        if (config.atrules) {
            for (var name in config.atrules) {
                this.addAtrule_(name, config.atrules[name]);
            }
        }

        if (config.properties) {
            for (var name in config.properties) {
                this.addProperty_(name, config.properties[name]);
            }
        }
    }
};

Lexer.prototype = {
    structure: {},
    checkStructure: function(ast) {
        function collectWarning(node, message) {
            warns.push({
                node: node,
                message: message
            });
        }

        var structure = this.structure;
        var warns = [];

        this.syntax.walk(ast, function(node) {
            if (structure.hasOwnProperty(node.type)) {
                structure[node.type].check(node, collectWarning);
            } else {
                collectWarning(node, 'Unknown node type `' + node.type + '`');
            }
        });

        return warns.length ? warns : false;
    },

    createDescriptor: function(syntax, type, name, parent = null) {
        var ref = {
            type: type,
            name: name
        };
        var descriptor = {
            type: type,
            name: name,
            parent: parent,
            syntax: null,
            match: null
        };

        if (typeof syntax === 'function') {
            descriptor.match = buildMatchGraph(syntax, ref);
        } else {
            if (typeof syntax === 'string') {
                // lazy parsing on first access
                Object.defineProperty(descriptor, 'syntax', {
                    get: function() {
                        Object.defineProperty(descriptor, 'syntax', {
                            value: parse(syntax)
                        });

                        return descriptor.syntax;
                    }
                });
            } else {
                descriptor.syntax = syntax;
            }

            // lazy graph build on first access
            Object.defineProperty(descriptor, 'match', {
                get: function() {
                    Object.defineProperty(descriptor, 'match', {
                        value: buildMatchGraph(descriptor.syntax, ref)
                    });

                    return descriptor.match;
                }
            });
        }

        return descriptor;
    },
    addAtrule_: function(name, syntax) {
        if (!syntax) {
            return;
        }

        this.atrules[name] = {
            type: 'Atrule',
            name: name,
            prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, 'AtrulePrelude', name) : null,
            descriptors: syntax.descriptors
                ? Object.keys(syntax.descriptors).reduce((res, descName) => {
                    res[descName] = this.createDescriptor(syntax.descriptors[descName], 'AtruleDescriptor', descName, name);
                    return res;
                }, {})
                : null
        };
    },
    addProperty_: function(name, syntax) {
        if (!syntax) {
            return;
        }

        this.properties[name] = this.createDescriptor(syntax, 'Property', name);
    },
    addType_: function(name, syntax) {
        if (!syntax) {
            return;
        }

        this.types[name] = this.createDescriptor(syntax, 'Type', name);

        if (syntax === generic['-ms-legacy-expression']) {
            this.valueCommonSyntax = cssWideKeywordsWithExpression;
        }
    },

    checkAtruleName: function(atruleName) {
        if (!this.getAtrule(atruleName)) {
            return new SyntaxReferenceError('Unknown at-rule', '@' + atruleName);
        }
    },
    checkAtrulePrelude: function(atruleName, prelude) {
        let error = this.checkAtruleName(atruleName);

        if (error) {
            return error;
        }

        var atrule = this.getAtrule(atruleName);

        if (!atrule.prelude && prelude) {
            return new SyntaxError('At-rule `@' + atruleName + '` should not contain a prelude');
        }

        if (atrule.prelude && !prelude) {
            return new SyntaxError('At-rule `@' + atruleName + '` should contain a prelude');
        }
    },
    checkAtruleDescriptorName: function(atruleName, descriptorName) {
        let error = this.checkAtruleName(atruleName);

        if (error) {
            return error;
        }

        var atrule = this.getAtrule(atruleName);
        var descriptor = names.keyword(descriptorName);

        if (!atrule.descriptors) {
            return new SyntaxError('At-rule `@' + atruleName + '` has no known descriptors');
        }

        if (!atrule.descriptors[descriptor.name] &&
            !atrule.descriptors[descriptor.basename]) {
            return new SyntaxReferenceError('Unknown at-rule descriptor', descriptorName);
        }
    },
    checkPropertyName: function(propertyName) {
        var property = names.property(propertyName);

        // don't match syntax for a custom property
        if (property.custom) {
            return new Error('Lexer matching doesn\'t applicable for custom properties');
        }

        if (!this.getProperty(propertyName)) {
            return new SyntaxReferenceError('Unknown property', propertyName);
        }
    },

    matchAtrulePrelude: function(atruleName, prelude) {
        var error = this.checkAtrulePrelude(atruleName, prelude);

        if (error) {
            return buildMatchResult(null, error);
        }

        if (!prelude) {
            return buildMatchResult(null, null);
        }

        return matchSyntax(this, this.getAtrule(atruleName).prelude, prelude, false);
    },
    matchAtruleDescriptor: function(atruleName, descriptorName, value) {
        var error = this.checkAtruleDescriptorName(atruleName, descriptorName);

        if (error) {
            return buildMatchResult(null, error);
        }

        var atrule = this.getAtrule(atruleName);
        var descriptor = names.keyword(descriptorName);

        return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
    },
    matchDeclaration: function(node) {
        if (node.type !== 'Declaration') {
            return buildMatchResult(null, new Error('Not a Declaration node'));
        }

        return this.matchProperty(node.property, node.value);
    },
    matchProperty: function(propertyName, value) {
        var error = this.checkPropertyName(propertyName);

        if (error) {
            return buildMatchResult(null, error);
        }

        return matchSyntax(this, this.getProperty(propertyName), value, true);
    },
    matchType: function(typeName, value) {
        var typeSyntax = this.getType(typeName);

        if (!typeSyntax) {
            return buildMatchResult(null, new SyntaxReferenceError('Unknown type', typeName));
        }

        return matchSyntax(this, typeSyntax, value, false);
    },
    match: function(syntax, value) {
        if (typeof syntax !== 'string' && (!syntax || !syntax.type)) {
            return buildMatchResult(null, new SyntaxReferenceError('Bad syntax'));
        }

        if (typeof syntax === 'string' || !syntax.match) {
            syntax = this.createDescriptor(syntax, 'Type', 'anonymous');
        }

        return matchSyntax(this, syntax, value, false);
    },

    findValueFragments: function(propertyName, value, type, name) {
        return search.matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
    },
    findDeclarationValueFragments: function(declaration, type, name) {
        return search.matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
    },
    findAllFragments: function(ast, type, name) {
        var result = [];

        this.syntax.walk(ast, {
            visit: 'Declaration',
            enter: function(declaration) {
                result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
            }.bind(this)
        });

        return result;
    },

    getAtrule: function(atruleName, fallbackBasename = true) {
        var atrule = names.keyword(atruleName);
        var atruleEntry = atrule.vendor && fallbackBasename
            ? this.atrules[atrule.name] || this.atrules[atrule.basename]
            : this.atrules[atrule.name];

        return atruleEntry || null;
    },
    getAtrulePrelude: function(atruleName, fallbackBasename = true) {
        const atrule = this.getAtrule(atruleName, fallbackBasename);

        return atrule && atrule.prelude || null;
    },
    getAtruleDescriptor: function(atruleName, name) {
        return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators
            ? this.atrules[atruleName].declarators[name] || null
            : null;
    },
    getProperty: function(propertyName, fallbackBasename = true) {
        var property = names.property(propertyName);
        var propertyEntry = property.vendor && fallbackBasename
            ? this.properties[property.name] || this.properties[property.basename]
            : this.properties[property.name];

        return propertyEntry || null;
    },
    getType: function(name) {
        return this.types.hasOwnProperty(name) ? this.types[name] : null;
    },

    validate: function() {
        function validate(syntax, name, broken, descriptor) {
            if (broken.hasOwnProperty(name)) {
                return broken[name];
            }

            broken[name] = false;
            if (descriptor.syntax !== null) {
                walk(descriptor.syntax, function(node) {
                    if (node.type !== 'Type' && node.type !== 'Property') {
                        return;
                    }

                    var map = node.type === 'Type' ? syntax.types : syntax.properties;
                    var brokenMap = node.type === 'Type' ? brokenTypes : brokenProperties;

                    if (!map.hasOwnProperty(node.name) || validate(syntax, node.name, brokenMap, map[node.name])) {
                        broken[name] = true;
                    }
                }, this);
            }
        }

        var brokenTypes = {};
        var brokenProperties = {};

        for (var key in this.types) {
            validate(this, key, brokenTypes, this.types[key]);
        }

        for (var key in this.properties) {
            validate(this, key, brokenProperties, this.properties[key]);
        }

        brokenTypes = Object.keys(brokenTypes).filter(function(name) {
            return brokenTypes[name];
        });
        brokenProperties = Object.keys(brokenProperties).filter(function(name) {
            return brokenProperties[name];
        });

        if (brokenTypes.length || brokenProperties.length) {
            return {
                types: brokenTypes,
                properties: brokenProperties
            };
        }

        return null;
    },
    dump: function(syntaxAsAst, pretty) {
        return {
            generic: this.generic,
            types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
            properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
            atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
        };
    },
    toString: function() {
        return JSON.stringify(this.dump());
    }
};

module.exports = Lexer;


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/error.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/error.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const createCustomError = __webpack_require__(/*! ../utils/createCustomError */ "./node_modules/css-tree/lib/utils/createCustomError.js");
const generate = __webpack_require__(/*! ../definition-syntax/generate */ "./node_modules/css-tree/lib/definition-syntax/generate.js");
const defaultLoc = { offset: 0, line: 1, column: 1 };

function locateMismatch(matchResult, node) {
    const tokens = matchResult.tokens;
    const longestMatch = matchResult.longestMatch;
    const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
    const badNode = mismatchNode !== node ? mismatchNode : null;
    let mismatchOffset = 0;
    let mismatchLength = 0;
    let entries = 0;
    let css = '';
    let start;
    let end;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].value;

        if (i === longestMatch) {
            mismatchLength = token.length;
            mismatchOffset = css.length;
        }

        if (badNode !== null && tokens[i].node === badNode) {
            if (i <= longestMatch) {
                entries++;
            } else {
                entries = 0;
            }
        }

        css += token;
    }

    if (longestMatch === tokens.length || entries > 1) { // last
        start = fromLoc(badNode || node, 'end') || buildLoc(defaultLoc, css);
        end = buildLoc(start);
    } else {
        start = fromLoc(badNode, 'start') ||
            buildLoc(fromLoc(node, 'start') || defaultLoc, css.slice(0, mismatchOffset));
        end = fromLoc(badNode, 'end') ||
            buildLoc(start, css.substr(mismatchOffset, mismatchLength));
    }

    return {
        css,
        mismatchOffset,
        mismatchLength,
        start,
        end
    };
}

function fromLoc(node, point) {
    const value = node && node.loc && node.loc[point];

    if (value) {
        return 'line' in value ? buildLoc(value) : value;
    }

    return null;
}

function buildLoc({ offset, line, column }, extra) {
    const loc = {
        offset,
        line,
        column
    };

    if (extra) {
        const lines = extra.split(/\n|\r\n?|\f/);

        loc.offset += extra.length;
        loc.line += lines.length - 1;
        loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
    }

    return loc;
}

const SyntaxReferenceError = function(type, referenceName) {
    const error = createCustomError(
        'SyntaxReferenceError',
        type + (referenceName ? ' `' + referenceName + '`' : '')
    );

    error.reference = referenceName;

    return error;
};

const SyntaxMatchError = function(message, syntax, node, matchResult) {
    const error = createCustomError('SyntaxMatchError', message);
    const {
        css,
        mismatchOffset,
        mismatchLength,
        start,
        end
    } = locateMismatch(matchResult, node);

    error.rawMessage = message;
    error.syntax = syntax ? generate(syntax) : '<generic>';
    error.css = css;
    error.mismatchOffset = mismatchOffset;
    error.mismatchLength = mismatchLength;
    error.message = message + '\n' +
        '  syntax: ' + error.syntax + '\n' +
        '   value: ' + (css || '<empty string>') + '\n' +
        '  --------' + new Array(error.mismatchOffset + 1).join('-') + '^';

    Object.assign(error, start);
    error.loc = {
        source: (node && node.loc && node.loc.source) || '<unknown>',
        start,
        end
    };

    return error;
};

module.exports = {
    SyntaxReferenceError,
    SyntaxMatchError
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/generic-an-plus-b.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/generic-an-plus-b.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isDigit = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isDigit;
var cmpChar = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpChar;
var TYPE = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var DELIM = TYPE.Delim;
var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENT = TYPE.Ident;
var NUMBER = TYPE.Number;
var DIMENSION = TYPE.Dimension;
var PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
var HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
var N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
var DISALLOW_SIGN = true;
var ALLOW_SIGN = false;

function isDelim(token, code) {
    return token !== null && token.type === DELIM && token.value.charCodeAt(0) === code;
}

function skipSC(token, offset, getNextToken) {
    while (token !== null && (token.type === WHITESPACE || token.type === COMMENT)) {
        token = getNextToken(++offset);
    }

    return offset;
}

function checkInteger(token, valueOffset, disallowSign, offset) {
    if (!token) {
        return 0;
    }

    var code = token.value.charCodeAt(valueOffset);

    if (code === PLUSSIGN || code === HYPHENMINUS) {
        if (disallowSign) {
            // Number sign is not allowed
            return 0;
        }
        valueOffset++;
    }

    for (; valueOffset < token.value.length; valueOffset++) {
        if (!isDigit(token.value.charCodeAt(valueOffset))) {
            // Integer is expected
            return 0;
        }
    }

    return offset + 1;
}

// ... <signed-integer>
// ... ['+' | '-'] <signless-integer>
function consumeB(token, offset_, getNextToken) {
    var sign = false;
    var offset = skipSC(token, offset_, getNextToken);

    token = getNextToken(offset);

    if (token === null) {
        return offset_;
    }

    if (token.type !== NUMBER) {
        if (isDelim(token, PLUSSIGN) || isDelim(token, HYPHENMINUS)) {
            sign = true;
            offset = skipSC(getNextToken(++offset), offset, getNextToken);
            token = getNextToken(offset);

            if (token === null && token.type !== NUMBER) {
                return 0;
            }
        } else {
            return offset_;
        }
    }

    if (!sign) {
        var code = token.value.charCodeAt(0);
        if (code !== PLUSSIGN && code !== HYPHENMINUS) {
            // Number sign is expected
            return 0;
        }
    }

    return checkInteger(token, sign ? 0 : 1, sign, offset);
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
module.exports = function anPlusB(token, getNextToken) {
    /* eslint-disable brace-style*/
    var offset = 0;

    if (!token) {
        return 0;
    }

    // <integer>
    if (token.type === NUMBER) {
        return checkInteger(token, 0, ALLOW_SIGN, offset); // b
    }

    // -n
    // -n <signed-integer>
    // -n ['+' | '-'] <signless-integer>
    // -n- <signless-integer>
    // <dashndashdigit-ident>
    else if (token.type === IDENT && token.value.charCodeAt(0) === HYPHENMINUS) {
        // expect 1st char is N
        if (!cmpChar(token.value, 1, N)) {
            return 0;
        }

        switch (token.value.length) {
            // -n
            // -n <signed-integer>
            // -n ['+' | '-'] <signless-integer>
            case 2:
                return consumeB(getNextToken(++offset), offset, getNextToken);

            // -n- <signless-integer>
            case 3:
                if (token.value.charCodeAt(2) !== HYPHENMINUS) {
                    return 0;
                }

                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);

            // <dashndashdigit-ident>
            default:
                if (token.value.charCodeAt(2) !== HYPHENMINUS) {
                    return 0;
                }

                return checkInteger(token, 3, DISALLOW_SIGN, offset);
        }
    }

    // '+'? n
    // '+'? n <signed-integer>
    // '+'? n ['+' | '-'] <signless-integer>
    // '+'? n- <signless-integer>
    // '+'? <ndashdigit-ident>
    else if (token.type === IDENT || (isDelim(token, PLUSSIGN) && getNextToken(offset + 1).type === IDENT)) {
        // just ignore a plus
        if (token.type !== IDENT) {
            token = getNextToken(++offset);
        }

        if (token === null || !cmpChar(token.value, 0, N)) {
            return 0;
        }

        switch (token.value.length) {
            // '+'? n
            // '+'? n <signed-integer>
            // '+'? n ['+' | '-'] <signless-integer>
            case 1:
                return consumeB(getNextToken(++offset), offset, getNextToken);

            // '+'? n- <signless-integer>
            case 2:
                if (token.value.charCodeAt(1) !== HYPHENMINUS) {
                    return 0;
                }

                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);

            // '+'? <ndashdigit-ident>
            default:
                if (token.value.charCodeAt(1) !== HYPHENMINUS) {
                    return 0;
                }

                return checkInteger(token, 2, DISALLOW_SIGN, offset);
        }
    }

    // <ndashdigit-dimension>
    // <ndash-dimension> <signless-integer>
    // <n-dimension>
    // <n-dimension> <signed-integer>
    // <n-dimension> ['+' | '-'] <signless-integer>
    else if (token.type === DIMENSION) {
        var code = token.value.charCodeAt(0);
        var sign = code === PLUSSIGN || code === HYPHENMINUS ? 1 : 0;

        for (var i = sign; i < token.value.length; i++) {
            if (!isDigit(token.value.charCodeAt(i))) {
                break;
            }
        }

        if (i === sign) {
            // Integer is expected
            return 0;
        }

        if (!cmpChar(token.value, i, N)) {
            return 0;
        }

        // <n-dimension>
        // <n-dimension> <signed-integer>
        // <n-dimension> ['+' | '-'] <signless-integer>
        if (i + 1 === token.value.length) {
            return consumeB(getNextToken(++offset), offset, getNextToken);
        } else {
            if (token.value.charCodeAt(i + 1) !== HYPHENMINUS) {
                return 0;
            }

            // <ndash-dimension> <signless-integer>
            if (i + 2 === token.value.length) {
                offset = skipSC(getNextToken(++offset), offset, getNextToken);
                token = getNextToken(offset);

                return checkInteger(token, 0, DISALLOW_SIGN, offset);
            }
            // <ndashdigit-dimension>
            else {
                return checkInteger(token, i + 2, DISALLOW_SIGN, offset);
            }
        }
    }

    return 0;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/generic-urange.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/generic-urange.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isHexDigit = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isHexDigit;
var cmpChar = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpChar;
var TYPE = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var DELIM = TYPE.Delim;
var NUMBER = TYPE.Number;
var DIMENSION = TYPE.Dimension;
var PLUSSIGN = 0x002B;     // U+002B PLUS SIGN (+)
var HYPHENMINUS = 0x002D;  // U+002D HYPHEN-MINUS (-)
var QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)
var U = 0x0075;            // U+0075 LATIN SMALL LETTER U (u)

function isDelim(token, code) {
    return token !== null && token.type === DELIM && token.value.charCodeAt(0) === code;
}

function startsWith(token, code) {
    return token.value.charCodeAt(0) === code;
}

function hexSequence(token, offset, allowDash) {
    for (var pos = offset, hexlen = 0; pos < token.value.length; pos++) {
        var code = token.value.charCodeAt(pos);

        if (code === HYPHENMINUS && allowDash && hexlen !== 0) {
            if (hexSequence(token, offset + hexlen + 1, false) > 0) {
                return 6; // dissallow following question marks
            }

            return 0; // dash at the ending of a hex sequence is not allowed
        }

        if (!isHexDigit(code)) {
            return 0; // not a hex digit
        }

        if (++hexlen > 6) {
            return 0; // too many hex digits
        };
    }

    return hexlen;
}

function withQuestionMarkSequence(consumed, length, getNextToken) {
    if (!consumed) {
        return 0; // nothing consumed
    }

    while (isDelim(getNextToken(length), QUESTIONMARK)) {
        if (++consumed > 6) {
            return 0; // too many question marks
        }

        length++;
    }

    return length;
}

// https://drafts.csswg.org/css-syntax/#urange
// Informally, the <urange> production has three forms:
// U+0001
//      Defines a range consisting of a single code point, in this case the code point "1".
// U+0001-00ff
//      Defines a range of codepoints between the first and the second value, in this case
//      the range between "1" and "ff" (255 in decimal) inclusive.
// U+00??
//      Defines a range of codepoints where the "?" characters range over all hex digits,
//      in this case defining the same as the value U+0000-00ff.
// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
//
// <urange> =
//   u '+' <ident-token> '?'* |
//   u <dimension-token> '?'* |
//   u <number-token> '?'* |
//   u <number-token> <dimension-token> |
//   u <number-token> <number-token> |
//   u '+' '?'+
module.exports = function urange(token, getNextToken) {
    var length = 0;

    // should start with `u` or `U`
    if (token === null || token.type !== IDENT || !cmpChar(token.value, 0, U)) {
        return 0;
    }

    token = getNextToken(++length);
    if (token === null) {
        return 0;
    }

    // u '+' <ident-token> '?'*
    // u '+' '?'+
    if (isDelim(token, PLUSSIGN)) {
        token = getNextToken(++length);
        if (token === null) {
            return 0;
        }

        if (token.type === IDENT) {
            // u '+' <ident-token> '?'*
            return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
        }

        if (isDelim(token, QUESTIONMARK)) {
            // u '+' '?'+
            return withQuestionMarkSequence(1, ++length, getNextToken);
        }

        // Hex digit or question mark is expected
        return 0;
    }

    // u <number-token> '?'*
    // u <number-token> <dimension-token>
    // u <number-token> <number-token>
    if (token.type === NUMBER) {
        if (!startsWith(token, PLUSSIGN)) {
            return 0;
        }

        var consumedHexLength = hexSequence(token, 1, true);
        if (consumedHexLength === 0) {
            return 0;
        }

        token = getNextToken(++length);
        if (token === null) {
            // u <number-token> <eof>
            return length;
        }

        if (token.type === DIMENSION || token.type === NUMBER) {
            // u <number-token> <dimension-token>
            // u <number-token> <number-token>
            if (!startsWith(token, HYPHENMINUS) || !hexSequence(token, 1, false)) {
                return 0;
            }

            return length + 1;
        }

        // u <number-token> '?'*
        return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
    }

    // u <dimension-token> '?'*
    if (token.type === DIMENSION) {
        if (!startsWith(token, PLUSSIGN)) {
            return 0;
        }

        return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
    }

    return 0;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/generic.js":
/*!****************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/generic.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tokenizer = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js");
var isIdentifierStart = tokenizer.isIdentifierStart;
var isHexDigit = tokenizer.isHexDigit;
var isDigit = tokenizer.isDigit;
var cmpStr = tokenizer.cmpStr;
var consumeNumber = tokenizer.consumeNumber;
var TYPE = tokenizer.TYPE;
var anPlusB = __webpack_require__(/*! ./generic-an-plus-b */ "./node_modules/css-tree/lib/lexer/generic-an-plus-b.js");
var urange = __webpack_require__(/*! ./generic-urange */ "./node_modules/css-tree/lib/lexer/generic-urange.js");

var cssWideKeywords = ['unset', 'initial', 'inherit'];
var calcFunctionNames = ['calc(', '-moz-calc(', '-webkit-calc('];

// https://www.w3.org/TR/css-values-3/#lengths
var LENGTH = {
    // absolute length units
    'px': true,
    'mm': true,
    'cm': true,
    'in': true,
    'pt': true,
    'pc': true,
    'q': true,

    // relative length units
    'em': true,
    'ex': true,
    'ch': true,
    'rem': true,

    // viewport-percentage lengths
    'vh': true,
    'vw': true,
    'vmin': true,
    'vmax': true,
    'vm': true
};

var ANGLE = {
    'deg': true,
    'grad': true,
    'rad': true,
    'turn': true
};

var TIME = {
    's': true,
    'ms': true
};

var FREQUENCY = {
    'hz': true,
    'khz': true
};

// https://www.w3.org/TR/css-values-3/#resolution (https://drafts.csswg.org/css-values/#resolution)
var RESOLUTION = {
    'dpi': true,
    'dpcm': true,
    'dppx': true,
    'x': true      // https://github.com/w3c/csswg-drafts/issues/461
};

// https://drafts.csswg.org/css-grid/#fr-unit
var FLEX = {
    'fr': true
};

// https://www.w3.org/TR/css3-speech/#mixing-props-voice-volume
var DECIBEL = {
    'db': true
};

// https://www.w3.org/TR/css3-speech/#voice-props-voice-pitch
var SEMITONES = {
    'st': true
};

// safe char code getter
function charCode(str, index) {
    return index < str.length ? str.charCodeAt(index) : 0;
}

function eqStr(actual, expected) {
    return cmpStr(actual, 0, actual.length, expected);
}

function eqStrAny(actual, expected) {
    for (var i = 0; i < expected.length; i++) {
        if (eqStr(actual, expected[i])) {
            return true;
        }
    }

    return false;
}

// IE postfix hack, i.e. 123\0 or 123px\9
function isPostfixIeHack(str, offset) {
    if (offset !== str.length - 2) {
        return false;
    }

    return (
        str.charCodeAt(offset) === 0x005C &&  // U+005C REVERSE SOLIDUS (\)
        isDigit(str.charCodeAt(offset + 1))
    );
}

function outOfRange(opts, value, numEnd) {
    if (opts && opts.type === 'Range') {
        var num = Number(
            numEnd !== undefined && numEnd !== value.length
                ? value.substr(0, numEnd)
                : value
        );

        if (isNaN(num)) {
            return true;
        }

        if (opts.min !== null && num < opts.min) {
            return true;
        }

        if (opts.max !== null && num > opts.max) {
            return true;
        }
    }

    return false;
}

function consumeFunction(token, getNextToken) {
    var startIdx = token.index;
    var length = 0;

    // balanced token consuming
    do {
        length++;

        if (token.balance <= startIdx) {
            break;
        }
    } while (token = getNextToken(length));

    return length;
}

// TODO: implement
// can be used wherever <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> values are allowed
// https://drafts.csswg.org/css-values/#calc-notation
function calc(next) {
    return function(token, getNextToken, opts) {
        if (token === null) {
            return 0;
        }

        if (token.type === TYPE.Function && eqStrAny(token.value, calcFunctionNames)) {
            return consumeFunction(token, getNextToken);
        }

        return next(token, getNextToken, opts);
    };
}

function tokenType(expectedTokenType) {
    return function(token) {
        if (token === null || token.type !== expectedTokenType) {
            return 0;
        }

        return 1;
    };
}

function func(name) {
    name = name + '(';

    return function(token, getNextToken) {
        if (token !== null && eqStr(token.value, name)) {
            return consumeFunction(token, getNextToken);
        }

        return 0;
    };
}

// =========================
// Complex types
//

// https://drafts.csswg.org/css-values-4/#custom-idents
// 4.2. Author-defined Identifiers: the <custom-ident> type
// Some properties accept arbitrary author-defined identifiers as a component value.
// This generic data type is denoted by <custom-ident>, and represents any valid CSS identifier
// that would not be misinterpreted as a pre-defined keyword in that property’s value definition.
//
// See also: https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
function customIdent(token) {
    if (token === null || token.type !== TYPE.Ident) {
        return 0;
    }

    var name = token.value.toLowerCase();

    // The CSS-wide keywords are not valid <custom-ident>s
    if (eqStrAny(name, cssWideKeywords)) {
        return 0;
    }

    // The default keyword is reserved and is also not a valid <custom-ident>
    if (eqStr(name, 'default')) {
        return 0;
    }

    // TODO: ignore property specific keywords (as described https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident)
    // Specifications using <custom-ident> must specify clearly what other keywords
    // are excluded from <custom-ident>, if any—for example by saying that any pre-defined keywords
    // in that property’s value definition are excluded. Excluded keywords are excluded
    // in all ASCII case permutations.

    return 1;
}

// https://drafts.csswg.org/css-variables/#typedef-custom-property-name
// A custom property is any property whose name starts with two dashes (U+002D HYPHEN-MINUS), like --foo.
// The <custom-property-name> production corresponds to this: it’s defined as any valid identifier
// that starts with two dashes, except -- itself, which is reserved for future use by CSS.
// NOTE: Current implementation treat `--` as a valid name since most (all?) major browsers treat it as valid.
function customPropertyName(token) {
    // ... defined as any valid identifier
    if (token === null || token.type !== TYPE.Ident) {
        return 0;
    }

    // ... that starts with two dashes (U+002D HYPHEN-MINUS)
    if (charCode(token.value, 0) !== 0x002D || charCode(token.value, 1) !== 0x002D) {
        return 0;
    }

    return 1;
}

// https://drafts.csswg.org/css-color-4/#hex-notation
// The syntax of a <hex-color> is a <hash-token> token whose value consists of 3, 4, 6, or 8 hexadecimal digits.
// In other words, a hex color is written as a hash character, "#", followed by some number of digits 0-9 or
// letters a-f (the case of the letters doesn’t matter - #00ff00 is identical to #00FF00).
function hexColor(token) {
    if (token === null || token.type !== TYPE.Hash) {
        return 0;
    }

    var length = token.value.length;

    // valid values (length): #rgb (4), #rgba (5), #rrggbb (7), #rrggbbaa (9)
    if (length !== 4 && length !== 5 && length !== 7 && length !== 9) {
        return 0;
    }

    for (var i = 1; i < length; i++) {
        if (!isHexDigit(token.value.charCodeAt(i))) {
            return 0;
        }
    }

    return 1;
}

function idSelector(token) {
    if (token === null || token.type !== TYPE.Hash) {
        return 0;
    }

    if (!isIdentifierStart(charCode(token.value, 1), charCode(token.value, 2), charCode(token.value, 3))) {
        return 0;
    }

    return 1;
}

// https://drafts.csswg.org/css-syntax/#any-value
// It represents the entirety of what a valid declaration can have as its value.
function declarationValue(token, getNextToken) {
    if (!token) {
        return 0;
    }

    var length = 0;
    var level = 0;
    var startIdx = token.index;

    // The <declaration-value> production matches any sequence of one or more tokens,
    // so long as the sequence ...
    scan:
    do {
        switch (token.type) {
            // ... does not contain <bad-string-token>, <bad-url-token>,
            case TYPE.BadString:
            case TYPE.BadUrl:
                break scan;

            // ... unmatched <)-token>, <]-token>, or <}-token>,
            case TYPE.RightCurlyBracket:
            case TYPE.RightParenthesis:
            case TYPE.RightSquareBracket:
                if (token.balance > token.index || token.balance < startIdx) {
                    break scan;
                }

                level--;
                break;

            // ... or top-level <semicolon-token> tokens
            case TYPE.Semicolon:
                if (level === 0) {
                    break scan;
                }

                break;

            // ... or <delim-token> tokens with a value of "!"
            case TYPE.Delim:
                if (token.value === '!' && level === 0) {
                    break scan;
                }

                break;

            case TYPE.Function:
            case TYPE.LeftParenthesis:
            case TYPE.LeftSquareBracket:
            case TYPE.LeftCurlyBracket:
                level++;
                break;
        }

        length++;

        // until balance closing
        if (token.balance <= startIdx) {
            break;
        }
    } while (token = getNextToken(length));

    return length;
}

// https://drafts.csswg.org/css-syntax/#any-value
// The <any-value> production is identical to <declaration-value>, but also
// allows top-level <semicolon-token> tokens and <delim-token> tokens
// with a value of "!". It represents the entirety of what valid CSS can be in any context.
function anyValue(token, getNextToken) {
    if (!token) {
        return 0;
    }

    var startIdx = token.index;
    var length = 0;

    // The <any-value> production matches any sequence of one or more tokens,
    // so long as the sequence ...
    scan:
    do {
        switch (token.type) {
            // ... does not contain <bad-string-token>, <bad-url-token>,
            case TYPE.BadString:
            case TYPE.BadUrl:
                break scan;

            // ... unmatched <)-token>, <]-token>, or <}-token>,
            case TYPE.RightCurlyBracket:
            case TYPE.RightParenthesis:
            case TYPE.RightSquareBracket:
                if (token.balance > token.index || token.balance < startIdx) {
                    break scan;
                }

                break;
        }

        length++;

        // until balance closing
        if (token.balance <= startIdx) {
            break;
        }
    } while (token = getNextToken(length));

    return length;
}

// =========================
// Dimensions
//

function dimension(type) {
    return function(token, getNextToken, opts) {
        if (token === null || token.type !== TYPE.Dimension) {
            return 0;
        }

        var numberEnd = consumeNumber(token.value, 0);

        // check unit
        if (type !== null) {
            // check for IE postfix hack, i.e. 123px\0 or 123px\9
            var reverseSolidusOffset = token.value.indexOf('\\', numberEnd);
            var unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset)
                ? token.value.substr(numberEnd)
                : token.value.substring(numberEnd, reverseSolidusOffset);

            if (type.hasOwnProperty(unit.toLowerCase()) === false) {
                return 0;
            }
        }

        // check range if specified
        if (outOfRange(opts, token.value, numberEnd)) {
            return 0;
        }

        return 1;
    };
}

// =========================
// Percentage
//

// §5.5. Percentages: the <percentage> type
// https://drafts.csswg.org/css-values-4/#percentages
function percentage(token, getNextToken, opts) {
    // ... corresponds to the <percentage-token> production
    if (token === null || token.type !== TYPE.Percentage) {
        return 0;
    }

    // check range if specified
    if (outOfRange(opts, token.value, token.value.length - 1)) {
        return 0;
    }

    return 1;
}

// =========================
// Numeric
//

// https://drafts.csswg.org/css-values-4/#numbers
// The value <zero> represents a literal number with the value 0. Expressions that merely
// evaluate to a <number> with the value 0 (for example, calc(0)) do not match <zero>;
// only literal <number-token>s do.
function zero(next) {
    if (typeof next !== 'function') {
        next = function() {
            return 0;
        };
    }

    return function(token, getNextToken, opts) {
        if (token !== null && token.type === TYPE.Number) {
            if (Number(token.value) === 0) {
                return 1;
            }
        }

        return next(token, getNextToken, opts);
    };
}

// § 5.3. Real Numbers: the <number> type
// https://drafts.csswg.org/css-values-4/#numbers
// Number values are denoted by <number>, and represent real numbers, possibly with a fractional component.
// ... It corresponds to the <number-token> production
function number(token, getNextToken, opts) {
    if (token === null) {
        return 0;
    }

    var numberEnd = consumeNumber(token.value, 0);
    var isNumber = numberEnd === token.value.length;
    if (!isNumber && !isPostfixIeHack(token.value, numberEnd)) {
        return 0;
    }

    // check range if specified
    if (outOfRange(opts, token.value, numberEnd)) {
        return 0;
    }

    return 1;
}

// §5.2. Integers: the <integer> type
// https://drafts.csswg.org/css-values-4/#integers
function integer(token, getNextToken, opts) {
    // ... corresponds to a subset of the <number-token> production
    if (token === null || token.type !== TYPE.Number) {
        return 0;
    }

    // The first digit of an integer may be immediately preceded by `-` or `+` to indicate the integer’s sign.
    var i = token.value.charCodeAt(0) === 0x002B ||       // U+002B PLUS SIGN (+)
            token.value.charCodeAt(0) === 0x002D ? 1 : 0; // U+002D HYPHEN-MINUS (-)

    // When written literally, an integer is one or more decimal digits 0 through 9 ...
    for (; i < token.value.length; i++) {
        if (!isDigit(token.value.charCodeAt(i))) {
            return 0;
        }
    }

    // check range if specified
    if (outOfRange(opts, token.value, i)) {
        return 0;
    }

    return 1;
}

module.exports = {
    // token types
    'ident-token': tokenType(TYPE.Ident),
    'function-token': tokenType(TYPE.Function),
    'at-keyword-token': tokenType(TYPE.AtKeyword),
    'hash-token': tokenType(TYPE.Hash),
    'string-token': tokenType(TYPE.String),
    'bad-string-token': tokenType(TYPE.BadString),
    'url-token': tokenType(TYPE.Url),
    'bad-url-token': tokenType(TYPE.BadUrl),
    'delim-token': tokenType(TYPE.Delim),
    'number-token': tokenType(TYPE.Number),
    'percentage-token': tokenType(TYPE.Percentage),
    'dimension-token': tokenType(TYPE.Dimension),
    'whitespace-token': tokenType(TYPE.WhiteSpace),
    'CDO-token': tokenType(TYPE.CDO),
    'CDC-token': tokenType(TYPE.CDC),
    'colon-token': tokenType(TYPE.Colon),
    'semicolon-token': tokenType(TYPE.Semicolon),
    'comma-token': tokenType(TYPE.Comma),
    '[-token': tokenType(TYPE.LeftSquareBracket),
    ']-token': tokenType(TYPE.RightSquareBracket),
    '(-token': tokenType(TYPE.LeftParenthesis),
    ')-token': tokenType(TYPE.RightParenthesis),
    '{-token': tokenType(TYPE.LeftCurlyBracket),
    '}-token': tokenType(TYPE.RightCurlyBracket),

    // token type aliases
    'string': tokenType(TYPE.String),
    'ident': tokenType(TYPE.Ident),

    // complex types
    'custom-ident': customIdent,
    'custom-property-name': customPropertyName,
    'hex-color': hexColor,
    'id-selector': idSelector, // element( <id-selector> )
    'an-plus-b': anPlusB,
    'urange': urange,
    'declaration-value': declarationValue,
    'any-value': anyValue,

    // dimensions
    'dimension': calc(dimension(null)),
    'angle': calc(dimension(ANGLE)),
    'decibel': calc(dimension(DECIBEL)),
    'frequency': calc(dimension(FREQUENCY)),
    'flex': calc(dimension(FLEX)),
    'length': calc(zero(dimension(LENGTH))),
    'resolution': calc(dimension(RESOLUTION)),
    'semitones': calc(dimension(SEMITONES)),
    'time': calc(dimension(TIME)),

    // percentage
    'percentage': calc(percentage),

    // numeric
    'zero': zero(),
    'number': calc(number),
    'integer': calc(integer),

    // old IE stuff
    '-ms-legacy-expression': func('expression')
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/match-graph.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/match-graph.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../definition-syntax/parse */ "./node_modules/css-tree/lib/definition-syntax/parse.js");

var MATCH = { type: 'Match' };
var MISMATCH = { type: 'Mismatch' };
var DISALLOW_EMPTY = { type: 'DisallowEmpty' };
var LEFTPARENTHESIS = 40;  // (
var RIGHTPARENTHESIS = 41; // )

function createCondition(match, thenBranch, elseBranch) {
    // reduce node count
    if (thenBranch === MATCH && elseBranch === MISMATCH) {
        return match;
    }

    if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
        return match;
    }

    if (match.type === 'If' && match.else === MISMATCH && thenBranch === MATCH) {
        thenBranch = match.then;
        match = match.match;
    }

    return {
        type: 'If',
        match: match,
        then: thenBranch,
        else: elseBranch
    };
}

function isFunctionType(name) {
    return (
        name.length > 2 &&
        name.charCodeAt(name.length - 2) === LEFTPARENTHESIS &&
        name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS
    );
}

function isEnumCapatible(term) {
    return (
        term.type === 'Keyword' ||
        term.type === 'AtKeyword' ||
        term.type === 'Function' ||
        term.type === 'Type' && isFunctionType(term.name)
    );
}

function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
    switch (combinator) {
        case ' ':
            // Juxtaposing components means that all of them must occur, in the given order.
            //
            // a b c
            // =
            // match a
            //   then match b
            //     then match c
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            //   else MISMATCH
            var result = MATCH;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];

                result = createCondition(
                    term,
                    result,
                    MISMATCH
                );
            };

            return result;

        case '|':
            // A bar (|) separates two or more alternatives: exactly one of them must occur.
            //
            // a | b | c
            // =
            // match a
            //   then MATCH
            //   else match b
            //     then MATCH
            //     else match c
            //       then MATCH
            //       else MISMATCH

            var result = MISMATCH;
            var map = null;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];

                // reduce sequence of keywords into a Enum
                if (isEnumCapatible(term)) {
                    if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
                        map = Object.create(null);
                        result = createCondition(
                            {
                                type: 'Enum',
                                map: map
                            },
                            MATCH,
                            result
                        );
                    }

                    if (map !== null) {
                        var key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
                        if (key in map === false) {
                            map[key] = term;
                            continue;
                        }
                    }
                }

                map = null;

                // create a new conditonal node
                result = createCondition(
                    term,
                    MATCH,
                    result
                );
            };

            return result;

        case '&&':
            // A double ampersand (&&) separates two or more components,
            // all of which must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since &&-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms: terms,
                    all: true
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a && b && c
            // =
            // match a
            //   then [b && c]
            //   else match b
            //     then [a && c]
            //     else match c
            //       then [a && b]
            //       else MISMATCH
            //
            // a && b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MISMATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            var result = MISMATCH;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];
                var thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        false
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            };

            return result;

        case '||':
            // A double bar (||) separates two or more options:
            // one or more of them must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since ||-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms: terms,
                    all: false
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a || b || c
            // =
            // match a
            //   then [b || c]
            //   else match b
            //     then [a || c]
            //     else match c
            //       then [a || b]
            //       else MISMATCH
            //
            // a || b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MATCH
            //     else MISMATCH
            var result = atLeastOneTermMatched ? MATCH : MISMATCH;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];
                var thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        true
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            };

            return result;
    }
}

function buildMultiplierMatchGraph(node) {
    var result = MATCH;
    var matchTerm = buildMatchGraph(node.term);

    if (node.max === 0) {
        // disable repeating of empty match to prevent infinite loop
        matchTerm = createCondition(
            matchTerm,
            DISALLOW_EMPTY,
            MISMATCH
        );

        // an occurrence count is not limited, make a cycle;
        // to collect more terms on each following matching mismatch
        result = createCondition(
            matchTerm,
            null, // will be a loop
            MISMATCH
        );

        result.then = createCondition(
            MATCH,
            MATCH,
            result // make a loop
        );

        if (node.comma) {
            result.then.else = createCondition(
                { type: 'Comma', syntax: node },
                result,
                MISMATCH
            );
        }
    } else {
        // create a match node chain for [min .. max] interval with optional matches
        for (var i = node.min || 1; i <= node.max; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                createCondition(
                    MATCH,
                    MATCH,
                    result
                ),
                MISMATCH
            );
        }
    }

    if (node.min === 0) {
        // allow zero match
        result = createCondition(
            MATCH,
            MATCH,
            result
        );
    } else {
        // create a match node chain to collect [0 ... min - 1] required matches
        for (var i = 0; i < node.min - 1; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                result,
                MISMATCH
            );
        }
    }

    return result;
}

function buildMatchGraph(node) {
    if (typeof node === 'function') {
        return {
            type: 'Generic',
            fn: node
        };
    }

    switch (node.type) {
        case 'Group':
            var result = buildGroupMatchGraph(
                node.combinator,
                node.terms.map(buildMatchGraph),
                false
            );

            if (node.disallowEmpty) {
                result = createCondition(
                    result,
                    DISALLOW_EMPTY,
                    MISMATCH
                );
            }

            return result;

        case 'Multiplier':
            return buildMultiplierMatchGraph(node);

        case 'Type':
        case 'Property':
            return {
                type: node.type,
                name: node.name,
                syntax: node
            };

        case 'Keyword':
            return {
                type: node.type,
                name: node.name.toLowerCase(),
                syntax: node
            };

        case 'AtKeyword':
            return {
                type: node.type,
                name: '@' + node.name.toLowerCase(),
                syntax: node
            };

        case 'Function':
            return {
                type: node.type,
                name: node.name.toLowerCase() + '(',
                syntax: node
            };

        case 'String':
            // convert a one char length String to a Token
            if (node.value.length === 3) {
                return {
                    type: 'Token',
                    value: node.value.charAt(1),
                    syntax: node
                };
            }

            // otherwise use it as is
            return {
                type: node.type,
                value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, '\''),
                syntax: node
            };

        case 'Token':
            return {
                type: node.type,
                value: node.value,
                syntax: node
            };

        case 'Comma':
            return {
                type: node.type,
                syntax: node
            };

        default:
            throw new Error('Unknown node type:', node.type);
    }
}

module.exports = {
    MATCH: MATCH,
    MISMATCH: MISMATCH,
    DISALLOW_EMPTY: DISALLOW_EMPTY,
    buildMatchGraph: function(syntaxTree, ref) {
        if (typeof syntaxTree === 'string') {
            syntaxTree = parse(syntaxTree);
        }

        return {
            type: 'MatchGraph',
            match: buildMatchGraph(syntaxTree),
            syntax: ref || null,
            source: syntaxTree
        };
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/match.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/match.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hasOwnProperty = Object.prototype.hasOwnProperty;
var matchGraph = __webpack_require__(/*! ./match-graph */ "./node_modules/css-tree/lib/lexer/match-graph.js");
var MATCH = matchGraph.MATCH;
var MISMATCH = matchGraph.MISMATCH;
var DISALLOW_EMPTY = matchGraph.DISALLOW_EMPTY;
var TYPE = __webpack_require__(/*! ../tokenizer/const */ "./node_modules/css-tree/lib/tokenizer/const.js").TYPE;

var STUB = 0;
var TOKEN = 1;
var OPEN_SYNTAX = 2;
var CLOSE_SYNTAX = 3;

var EXIT_REASON_MATCH = 'Match';
var EXIT_REASON_MISMATCH = 'Mismatch';
var EXIT_REASON_ITERATION_LIMIT = 'Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)';

var ITERATION_LIMIT = 15000;
var totalIterationCount = 0;

function reverseList(list) {
    var prev = null;
    var next = null;
    var item = list;

    while (item !== null) {
        next = item.prev;
        item.prev = prev;
        prev = item;
        item = next;
    }

    return prev;
}

function areStringsEqualCaseInsensitive(testStr, referenceStr) {
    if (testStr.length !== referenceStr.length) {
        return false;
    }

    for (var i = 0; i < testStr.length; i++) {
        var testCode = testStr.charCodeAt(i);
        var referenceCode = referenceStr.charCodeAt(i);

        // testCode.toLowerCase() for U+0041 LATIN CAPITAL LETTER A (A) .. U+005A LATIN CAPITAL LETTER Z (Z).
        if (testCode >= 0x0041 && testCode <= 0x005A) {
            testCode = testCode | 32;
        }

        if (testCode !== referenceCode) {
            return false;
        }
    }

    return true;
}

function isContextEdgeDelim(token) {
    if (token.type !== TYPE.Delim) {
        return false;
    }

    // Fix matching for unicode-range: U+30??, U+FF00-FF9F
    // Probably we need to check out previous match instead
    return token.value !== '?';
}

function isCommaContextStart(token) {
    if (token === null) {
        return true;
    }

    return (
        token.type === TYPE.Comma ||
        token.type === TYPE.Function ||
        token.type === TYPE.LeftParenthesis ||
        token.type === TYPE.LeftSquareBracket ||
        token.type === TYPE.LeftCurlyBracket ||
        isContextEdgeDelim(token)
    );
}

function isCommaContextEnd(token) {
    if (token === null) {
        return true;
    }

    return (
        token.type === TYPE.RightParenthesis ||
        token.type === TYPE.RightSquareBracket ||
        token.type === TYPE.RightCurlyBracket ||
        token.type === TYPE.Delim
    );
}

function internalMatch(tokens, state, syntaxes) {
    function moveToNextToken() {
        do {
            tokenIndex++;
            token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
        } while (token !== null && (token.type === TYPE.WhiteSpace || token.type === TYPE.Comment));
    }

    function getNextToken(offset) {
        var nextIndex = tokenIndex + offset;

        return nextIndex < tokens.length ? tokens[nextIndex] : null;
    }

    function stateSnapshotFromSyntax(nextState, prev) {
        return {
            nextState: nextState,
            matchStack: matchStack,
            syntaxStack: syntaxStack,
            thenStack: thenStack,
            tokenIndex: tokenIndex,
            prev: prev
        };
    }

    function pushThenStack(nextState) {
        thenStack = {
            nextState: nextState,
            matchStack: matchStack,
            syntaxStack: syntaxStack,
            prev: thenStack
        };
    }

    function pushElseStack(nextState) {
        elseStack = stateSnapshotFromSyntax(nextState, elseStack);
    }

    function addTokenToMatch() {
        matchStack = {
            type: TOKEN,
            syntax: state.syntax,
            token: token,
            prev: matchStack
        };

        moveToNextToken();
        syntaxStash = null;

        if (tokenIndex > longestMatch) {
            longestMatch = tokenIndex;
        }
    }

    function openSyntax() {
        syntaxStack = {
            syntax: state.syntax,
            opts: state.syntax.opts || (syntaxStack !== null && syntaxStack.opts) || null,
            prev: syntaxStack
        };

        matchStack = {
            type: OPEN_SYNTAX,
            syntax: state.syntax,
            token: matchStack.token,
            prev: matchStack
        };
    }

    function closeSyntax() {
        if (matchStack.type === OPEN_SYNTAX) {
            matchStack = matchStack.prev;
        } else {
            matchStack = {
                type: CLOSE_SYNTAX,
                syntax: syntaxStack.syntax,
                token: matchStack.token,
                prev: matchStack
            };
        }

        syntaxStack = syntaxStack.prev;
    }

    var syntaxStack = null;
    var thenStack = null;
    var elseStack = null;

    // null – stashing allowed, nothing stashed
    // false – stashing disabled, nothing stashed
    // anithing else – fail stashable syntaxes, some syntax stashed
    var syntaxStash = null;

    var iterationCount = 0; // count iterations and prevent infinite loop
    var exitReason = null;

    var token = null;
    var tokenIndex = -1;
    var longestMatch = 0;
    var matchStack = {
        type: STUB,
        syntax: null,
        token: null,
        prev: null
    };

    moveToNextToken();

    while (exitReason === null && ++iterationCount < ITERATION_LIMIT) {
        // function mapList(list, fn) {
        //     var result = [];
        //     while (list) {
        //         result.unshift(fn(list));
        //         list = list.prev;
        //     }
        //     return result;
        // }
        // console.log('--\n',
        //     '#' + iterationCount,
        //     require('util').inspect({
        //         match: mapList(matchStack, x => x.type === TOKEN ? x.token && x.token.value : x.syntax ? ({ [OPEN_SYNTAX]: '<', [CLOSE_SYNTAX]: '</' }[x.type] || x.type) + '!' + x.syntax.name : null),
        //         token: token && token.value,
        //         tokenIndex,
        //         syntax: syntax.type + (syntax.id ? ' #' + syntax.id : '')
        //     }, { depth: null })
        // );
        switch (state.type) {
            case 'Match':
                if (thenStack === null) {
                    // turn to MISMATCH when some tokens left unmatched
                    if (token !== null) {
                        // doesn't mismatch if just one token left and it's an IE hack
                        if (tokenIndex !== tokens.length - 1 || (token.value !== '\\0' && token.value !== '\\9')) {
                            state = MISMATCH;
                            break;
                        }
                    }

                    // break the main loop, return a result - MATCH
                    exitReason = EXIT_REASON_MATCH;
                    break;
                }

                // go to next syntax (`then` branch)
                state = thenStack.nextState;

                // check match is not empty
                if (state === DISALLOW_EMPTY) {
                    if (thenStack.matchStack === matchStack) {
                        state = MISMATCH;
                        break;
                    } else {
                        state = MATCH;
                    }
                }

                // close syntax if needed
                while (thenStack.syntaxStack !== syntaxStack) {
                    closeSyntax();
                }

                // pop stack
                thenStack = thenStack.prev;
                break;

            case 'Mismatch':
                // when some syntax is stashed
                if (syntaxStash !== null && syntaxStash !== false) {
                    // there is no else branches or a branch reduce match stack
                    if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
                        // restore state from the stash
                        elseStack = syntaxStash;
                        syntaxStash = false; // disable stashing
                    }
                } else if (elseStack === null) {
                    // no else branches -> break the main loop
                    // return a result - MISMATCH
                    exitReason = EXIT_REASON_MISMATCH;
                    break;
                }

                // go to next syntax (`else` branch)
                state = elseStack.nextState;

                // restore all the rest stack states
                thenStack = elseStack.thenStack;
                syntaxStack = elseStack.syntaxStack;
                matchStack = elseStack.matchStack;
                tokenIndex = elseStack.tokenIndex;
                token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;

                // pop stack
                elseStack = elseStack.prev;
                break;

            case 'MatchGraph':
                state = state.match;
                break;

            case 'If':
                // IMPORTANT: else stack push must go first,
                // since it stores the state of thenStack before changes
                if (state.else !== MISMATCH) {
                    pushElseStack(state.else);
                }

                if (state.then !== MATCH) {
                    pushThenStack(state.then);
                }

                state = state.match;
                break;

            case 'MatchOnce':
                state = {
                    type: 'MatchOnceBuffer',
                    syntax: state,
                    index: 0,
                    mask: 0
                };
                break;

            case 'MatchOnceBuffer':
                var terms = state.syntax.terms;

                if (state.index === terms.length) {
                    // no matches at all or it's required all terms to be matched
                    if (state.mask === 0 || state.syntax.all) {
                        state = MISMATCH;
                        break;
                    }

                    // a partial match is ok
                    state = MATCH;
                    break;
                }

                // all terms are matched
                if (state.mask === (1 << terms.length) - 1) {
                    state = MATCH;
                    break;
                }

                for (; state.index < terms.length; state.index++) {
                    var matchFlag = 1 << state.index;

                    if ((state.mask & matchFlag) === 0) {
                        // IMPORTANT: else stack push must go first,
                        // since it stores the state of thenStack before changes
                        pushElseStack(state);
                        pushThenStack({
                            type: 'AddMatchOnce',
                            syntax: state.syntax,
                            mask: state.mask | matchFlag
                        });

                        // match
                        state = terms[state.index++];
                        break;
                    }
                }
                break;

            case 'AddMatchOnce':
                state = {
                    type: 'MatchOnceBuffer',
                    syntax: state.syntax,
                    index: 0,
                    mask: state.mask
                };
                break;

            case 'Enum':
                if (token !== null) {
                    var name = token.value.toLowerCase();

                    // drop \0 and \9 hack from keyword name
                    if (name.indexOf('\\') !== -1) {
                        name = name.replace(/\\[09].*$/, '');
                    }

                    if (hasOwnProperty.call(state.map, name)) {
                        state = state.map[name];
                        break;
                    }
                }

                state = MISMATCH;
                break;

            case 'Generic':
                var opts = syntaxStack !== null ? syntaxStack.opts : null;
                var lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));

                if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
                    while (tokenIndex < lastTokenIndex) {
                        addTokenToMatch();
                    }

                    state = MATCH;
                } else {
                    state = MISMATCH;
                }

                break;

            case 'Type':
            case 'Property':
                var syntaxDict = state.type === 'Type' ? 'types' : 'properties';
                var dictSyntax = hasOwnProperty.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;

                if (!dictSyntax || !dictSyntax.match) {
                    throw new Error(
                        'Bad syntax reference: ' +
                        (state.type === 'Type'
                            ? '<' + state.name + '>'
                            : '<\'' + state.name + '\'>')
                    );
                }

                // stash a syntax for types with low priority
                if (syntaxStash !== false && token !== null && state.type === 'Type') {
                    var lowPriorityMatching =
                        // https://drafts.csswg.org/css-values-4/#custom-idents
                        // When parsing positionally-ambiguous keywords in a property value, a <custom-ident> production
                        // can only claim the keyword if no other unfulfilled production can claim it.
                        (state.name === 'custom-ident' && token.type === TYPE.Ident) ||

                        // https://drafts.csswg.org/css-values-4/#lengths
                        // ... if a `0` could be parsed as either a <number> or a <length> in a property (such as line-height),
                        // it must parse as a <number>
                        (state.name === 'length' && token.value === '0');

                    if (lowPriorityMatching) {
                        if (syntaxStash === null) {
                            syntaxStash = stateSnapshotFromSyntax(state, elseStack);
                        }

                        state = MISMATCH;
                        break;
                    }
                }

                openSyntax();
                state = dictSyntax.match;
                break;

            case 'Keyword':
                var name = state.name;

                if (token !== null) {
                    var keywordName = token.value;

                    // drop \0 and \9 hack from keyword name
                    if (keywordName.indexOf('\\') !== -1) {
                        keywordName = keywordName.replace(/\\[09].*$/, '');
                    }

                    if (areStringsEqualCaseInsensitive(keywordName, name)) {
                        addTokenToMatch();
                        state = MATCH;
                        break;
                    }
                }

                state = MISMATCH;
                break;

            case 'AtKeyword':
            case 'Function':
                if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
                    addTokenToMatch();
                    state = MATCH;
                    break;
                }

                state = MISMATCH;
                break;

            case 'Token':
                if (token !== null && token.value === state.value) {
                    addTokenToMatch();
                    state = MATCH;
                    break;
                }

                state = MISMATCH;
                break;

            case 'Comma':
                if (token !== null && token.type === TYPE.Comma) {
                    if (isCommaContextStart(matchStack.token)) {
                        state = MISMATCH;
                    } else {
                        addTokenToMatch();
                        state = isCommaContextEnd(token) ? MISMATCH : MATCH;
                    }
                } else {
                    state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
                }

                break;

            case 'String':
                var string = '';

                for (var lastTokenIndex = tokenIndex; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) {
                    string += tokens[lastTokenIndex].value;
                }

                if (areStringsEqualCaseInsensitive(string, state.value)) {
                    while (tokenIndex < lastTokenIndex) {
                        addTokenToMatch();
                    }

                    state = MATCH;
                } else {
                    state = MISMATCH;
                }

                break;

            default:
                throw new Error('Unknown node type: ' + state.type);
        }
    }

    totalIterationCount += iterationCount;

    switch (exitReason) {
        case null:
            console.warn('[csstree-match] BREAK after ' + ITERATION_LIMIT + ' iterations');
            exitReason = EXIT_REASON_ITERATION_LIMIT;
            matchStack = null;
            break;

        case EXIT_REASON_MATCH:
            while (syntaxStack !== null) {
                closeSyntax();
            }
            break;

        default:
            matchStack = null;
    }

    return {
        tokens: tokens,
        reason: exitReason,
        iterations: iterationCount,
        match: matchStack,
        longestMatch: longestMatch
    };
}

function matchAsList(tokens, matchGraph, syntaxes) {
    var matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match !== null) {
        var item = reverseList(matchResult.match).prev;

        matchResult.match = [];

        while (item !== null) {
            switch (item.type) {
                case STUB:
                    break;

                case OPEN_SYNTAX:
                case CLOSE_SYNTAX:
                    matchResult.match.push({
                        type: item.type,
                        syntax: item.syntax
                    });
                    break;

                default:
                    matchResult.match.push({
                        token: item.token.value,
                        node: item.token.node
                    });
                    break;
            }

            item = item.prev;
        }
    }

    return matchResult;
}

function matchAsTree(tokens, matchGraph, syntaxes) {
    var matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match === null) {
        return matchResult;
    }

    var item = matchResult.match;
    var host = matchResult.match = {
        syntax: matchGraph.syntax || null,
        match: []
    };
    var hostStack = [host];

    // revert a list and start with 2nd item since 1st is a stub item
    item = reverseList(item).prev;

    // build a tree
    while (item !== null) {
        switch (item.type) {
            case OPEN_SYNTAX:
                host.match.push(host = {
                    syntax: item.syntax,
                    match: []
                });
                hostStack.push(host);
                break;

            case CLOSE_SYNTAX:
                hostStack.pop();
                host = hostStack[hostStack.length - 1];
                break;

            default:
                host.match.push({
                    syntax: item.syntax || null,
                    token: item.token.value,
                    node: item.token.node
                });
        }

        item = item.prev;
    }

    return matchResult;
}

module.exports = {
    matchAsList: matchAsList,
    matchAsTree: matchAsTree,
    getTotalIterationCount: function() {
        return totalIterationCount;
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/prepare-tokens.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/prepare-tokens.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js");
var TokenStream = __webpack_require__(/*! ../common/TokenStream */ "./node_modules/css-tree/lib/common/TokenStream.js");
var tokenStream = new TokenStream();
var astToTokens = {
    decorator: function(handlers) {
        var curNode = null;
        var prev = { len: 0, node: null };
        var nodes = [prev];
        var buffer = '';

        return {
            children: handlers.children,
            node: function(node) {
                var tmp = curNode;
                curNode = node;
                handlers.node.call(this, node);
                curNode = tmp;
            },
            chunk: function(chunk) {
                buffer += chunk;
                if (prev.node !== curNode) {
                    nodes.push({
                        len: chunk.length,
                        node: curNode
                    });
                } else {
                    prev.len += chunk.length;
                }
            },
            result: function() {
                return prepareTokens(buffer, nodes);
            }
        };
    }
};

function prepareTokens(str, nodes) {
    var tokens = [];
    var nodesOffset = 0;
    var nodesIndex = 0;
    var currentNode = nodes ? nodes[nodesIndex].node : null;

    tokenize(str, tokenStream);

    while (!tokenStream.eof) {
        if (nodes) {
            while (nodesIndex < nodes.length && nodesOffset + nodes[nodesIndex].len <= tokenStream.tokenStart) {
                nodesOffset += nodes[nodesIndex++].len;
                currentNode = nodes[nodesIndex].node;
            }
        }

        tokens.push({
            type: tokenStream.tokenType,
            value: tokenStream.getTokenValue(),
            index: tokenStream.tokenIndex, // TODO: remove it, temporary solution
            balance: tokenStream.balance[tokenStream.tokenIndex], // TODO: remove it, temporary solution
            node: currentNode
        });
        tokenStream.next();
        // console.log({ ...tokens[tokens.length - 1], node: undefined });
    }

    return tokens;
}

module.exports = function(value, syntax) {
    if (typeof value === 'string') {
        return prepareTokens(value, null);
    }

    return syntax.generate(value, astToTokens);
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/search.js":
/*!***************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/search.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(/*! ../common/List */ "./node_modules/css-tree/lib/common/List.js");

function getFirstMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getFirstMatchNode(matchNode.match[0]);
}

function getLastMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}

function matchFragments(lexer, ast, match, type, name) {
    function findFragments(matchNode) {
        if (matchNode.syntax !== null &&
            matchNode.syntax.type === type &&
            matchNode.syntax.name === name) {
            var start = getFirstMatchNode(matchNode);
            var end = getLastMatchNode(matchNode);

            lexer.syntax.walk(ast, function(node, item, list) {
                if (node === start) {
                    var nodes = new List();

                    do {
                        nodes.appendData(item.data);

                        if (item.data === end) {
                            break;
                        }

                        item = item.next;
                    } while (item !== null);

                    fragments.push({
                        parent: list,
                        nodes: nodes
                    });
                }
            });
        }

        if (Array.isArray(matchNode.match)) {
            matchNode.match.forEach(findFragments);
        }
    }

    var fragments = [];

    if (match.matched !== null) {
        findFragments(match.matched);
    }

    return fragments;
}

module.exports = {
    matchFragments: matchFragments
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/structure.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/structure.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(/*! ../common/List */ "./node_modules/css-tree/lib/common/List.js");
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isValidNumber(value) {
    // Number.isInteger(value) && value >= 0
    return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value &&
        value >= 0
    );
}

function isValidLocation(loc) {
    return (
        Boolean(loc) &&
        isValidNumber(loc.offset) &&
        isValidNumber(loc.line) &&
        isValidNumber(loc.column)
    );
}

function createNodeStructureChecker(type, fields) {
    return function checkNode(node, warn) {
        if (!node || node.constructor !== Object) {
            return warn(node, 'Type of node should be an Object');
        }

        for (var key in node) {
            var valid = true;

            if (hasOwnProperty.call(node, key) === false) {
                continue;
            }

            if (key === 'type') {
                if (node.type !== type) {
                    warn(node, 'Wrong node type `' + node.type + '`, expected `' + type + '`');
                }
            } else if (key === 'loc') {
                if (node.loc === null) {
                    continue;
                } else if (node.loc && node.loc.constructor === Object) {
                    if (typeof node.loc.source !== 'string') {
                        key += '.source';
                    } else if (!isValidLocation(node.loc.start)) {
                        key += '.start';
                    } else if (!isValidLocation(node.loc.end)) {
                        key += '.end';
                    } else {
                        continue;
                    }
                }

                valid = false;
            } else if (fields.hasOwnProperty(key)) {
                for (var i = 0, valid = false; !valid && i < fields[key].length; i++) {
                    var fieldType = fields[key][i];

                    switch (fieldType) {
                        case String:
                            valid = typeof node[key] === 'string';
                            break;

                        case Boolean:
                            valid = typeof node[key] === 'boolean';
                            break;

                        case null:
                            valid = node[key] === null;
                            break;

                        default:
                            if (typeof fieldType === 'string') {
                                valid = node[key] && node[key].type === fieldType;
                            } else if (Array.isArray(fieldType)) {
                                valid = node[key] instanceof List;
                            }
                    }
                }
            } else {
                warn(node, 'Unknown field `' + key + '` for ' + type + ' node type');
            }

            if (!valid) {
                warn(node, 'Bad value for `' + type + '.' + key + '`');
            }
        }

        for (var key in fields) {
            if (hasOwnProperty.call(fields, key) &&
                hasOwnProperty.call(node, key) === false) {
                warn(node, 'Field `' + type + '.' + key + '` is missed');
            }
        }
    };
}

function processStructure(name, nodeType) {
    var structure = nodeType.structure;
    var fields = {
        type: String,
        loc: true
    };
    var docs = {
        type: '"' + name + '"'
    };

    for (var key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        var docsTypes = [];
        var fieldTypes = fields[key] = Array.isArray(structure[key])
            ? structure[key].slice()
            : [structure[key]];

        for (var i = 0; i < fieldTypes.length; i++) {
            var fieldType = fieldTypes[i];
            if (fieldType === String || fieldType === Boolean) {
                docsTypes.push(fieldType.name);
            } else if (fieldType === null) {
                docsTypes.push('null');
            } else if (typeof fieldType === 'string') {
                docsTypes.push('<' + fieldType + '>');
            } else if (Array.isArray(fieldType)) {
                docsTypes.push('List'); // TODO: use type enum
            } else {
                throw new Error('Wrong value `' + fieldType + '` in `' + name + '.' + key + '` structure definition');
            }
        }

        docs[key] = docsTypes.join(' | ');
    }

    return {
        docs: docs,
        check: createNodeStructureChecker(name, fields)
    };
}

module.exports = {
    getStructureFromConfig: function(config) {
        var structure = {};

        if (config.node) {
            for (var name in config.node) {
                if (hasOwnProperty.call(config.node, name)) {
                    var nodeType = config.node[name];

                    if (nodeType.structure) {
                        structure[name] = processStructure(name, nodeType);
                    } else {
                        throw new Error('Missed `structure` field in `' + name + '` node type definition');
                    }
                }
            }
        }

        return structure;
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/lexer/trace.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/lexer/trace.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function getTrace(node) {
    function shouldPutToTrace(syntax) {
        if (syntax === null) {
            return false;
        }

        return (
            syntax.type === 'Type' ||
            syntax.type === 'Property' ||
            syntax.type === 'Keyword'
        );
    }

    function hasMatch(matchNode) {
        if (Array.isArray(matchNode.match)) {
            // use for-loop for better perfomance
            for (var i = 0; i < matchNode.match.length; i++) {
                if (hasMatch(matchNode.match[i])) {
                    if (shouldPutToTrace(matchNode.syntax)) {
                        result.unshift(matchNode.syntax);
                    }

                    return true;
                }
            }
        } else if (matchNode.node === node) {
            result = shouldPutToTrace(matchNode.syntax)
                ? [matchNode.syntax]
                : [];

            return true;
        }

        return false;
    }

    var result = null;

    if (this.matched !== null) {
        hasMatch(this.matched);
    }

    return result;
}

function testNode(match, node, fn) {
    var trace = getTrace.call(match, node);

    if (trace === null) {
        return false;
    }

    return trace.some(fn);
}

function isType(node, type) {
    return testNode(this, node, function(matchNode) {
        return matchNode.type === 'Type' && matchNode.name === type;
    });
}

function isProperty(node, property) {
    return testNode(this, node, function(matchNode) {
        return matchNode.type === 'Property' && matchNode.name === property;
    });
}

function isKeyword(node) {
    return testNode(this, node, function(matchNode) {
        return matchNode.type === 'Keyword';
    });
}

module.exports = {
    getTrace: getTrace,
    isType: isType,
    isProperty: isProperty,
    isKeyword: isKeyword
};


/***/ }),

/***/ "./node_modules/css-tree/lib/parser/create.js":
/*!****************************************************!*\
  !*** ./node_modules/css-tree/lib/parser/create.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var OffsetToLocation = __webpack_require__(/*! ../common/OffsetToLocation */ "./node_modules/css-tree/lib/common/OffsetToLocation.js");
var SyntaxError = __webpack_require__(/*! ../common/SyntaxError */ "./node_modules/css-tree/lib/common/SyntaxError.js");
var TokenStream = __webpack_require__(/*! ../common/TokenStream */ "./node_modules/css-tree/lib/common/TokenStream.js");
var List = __webpack_require__(/*! ../common/List */ "./node_modules/css-tree/lib/common/List.js");
var tokenize = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js");
var constants = __webpack_require__(/*! ../tokenizer/const */ "./node_modules/css-tree/lib/tokenizer/const.js");
var { findWhiteSpaceStart, cmpStr } = __webpack_require__(/*! ../tokenizer/utils */ "./node_modules/css-tree/lib/tokenizer/utils.js");
var sequence = __webpack_require__(/*! ./sequence */ "./node_modules/css-tree/lib/parser/sequence.js");
var noop = function() {};

var TYPE = constants.TYPE;
var NAME = constants.NAME;
var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENT = TYPE.Ident;
var FUNCTION = TYPE.Function;
var URL = TYPE.Url;
var HASH = TYPE.Hash;
var PERCENTAGE = TYPE.Percentage;
var NUMBER = TYPE.Number;
var NUMBERSIGN = 0x0023; // U+0023 NUMBER SIGN (#)
var NULL = 0;

function createParseContext(name) {
    return function() {
        return this[name]();
    };
}

function processConfig(config) {
    var parserConfig = {
        context: {},
        scope: {},
        atrule: {},
        pseudo: {}
    };

    if (config.parseContext) {
        for (var name in config.parseContext) {
            switch (typeof config.parseContext[name]) {
                case 'function':
                    parserConfig.context[name] = config.parseContext[name];
                    break;

                case 'string':
                    parserConfig.context[name] = createParseContext(config.parseContext[name]);
                    break;
            }
        }
    }

    if (config.scope) {
        for (var name in config.scope) {
            parserConfig.scope[name] = config.scope[name];
        }
    }

    if (config.atrule) {
        for (var name in config.atrule) {
            var atrule = config.atrule[name];

            if (atrule.parse) {
                parserConfig.atrule[name] = atrule.parse;
            }
        }
    }

    if (config.pseudo) {
        for (var name in config.pseudo) {
            var pseudo = config.pseudo[name];

            if (pseudo.parse) {
                parserConfig.pseudo[name] = pseudo.parse;
            }
        }
    }

    if (config.node) {
        for (var name in config.node) {
            parserConfig[name] = config.node[name].parse;
        }
    }

    return parserConfig;
}

module.exports = function createParser(config) {
    var parser = {
        scanner: new TokenStream(),
        locationMap: new OffsetToLocation(),

        filename: '<unknown>',
        needPositions: false,
        onParseError: noop,
        onParseErrorThrow: false,
        parseAtrulePrelude: true,
        parseRulePrelude: true,
        parseValue: true,
        parseCustomProperty: false,

        readSequence: sequence,

        createList: function() {
            return new List();
        },
        createSingleNodeList: function(node) {
            return new List().appendData(node);
        },
        getFirstListNode: function(list) {
            return list && list.first();
        },
        getLastListNode: function(list) {
            return list.last();
        },

        parseWithFallback: function(consumer, fallback) {
            var startToken = this.scanner.tokenIndex;

            try {
                return consumer.call(this);
            } catch (e) {
                if (this.onParseErrorThrow) {
                    throw e;
                }

                var fallbackNode = fallback.call(this, startToken);

                this.onParseErrorThrow = true;
                this.onParseError(e, fallbackNode);
                this.onParseErrorThrow = false;

                return fallbackNode;
            }
        },

        lookupNonWSType: function(offset) {
            do {
                var type = this.scanner.lookupType(offset++);
                if (type !== WHITESPACE) {
                    return type;
                }
            } while (type !== NULL);

            return NULL;
        },

        eat: function(tokenType) {
            if (this.scanner.tokenType !== tokenType) {
                var offset = this.scanner.tokenStart;
                var message = NAME[tokenType] + ' is expected';

                // tweak message and offset
                switch (tokenType) {
                    case IDENT:
                        // when identifier is expected but there is a function or url
                        if (this.scanner.tokenType === FUNCTION || this.scanner.tokenType === URL) {
                            offset = this.scanner.tokenEnd - 1;
                            message = 'Identifier is expected but function found';
                        } else {
                            message = 'Identifier is expected';
                        }
                        break;

                    case HASH:
                        if (this.scanner.isDelim(NUMBERSIGN)) {
                            this.scanner.next();
                            offset++;
                            message = 'Name is expected';
                        }
                        break;

                    case PERCENTAGE:
                        if (this.scanner.tokenType === NUMBER) {
                            offset = this.scanner.tokenEnd;
                            message = 'Percent sign is expected';
                        }
                        break;

                    default:
                        // when test type is part of another token show error for current position + 1
                        // e.g. eat(HYPHENMINUS) will fail on "-foo", but pointing on "-" is odd
                        if (this.scanner.source.charCodeAt(this.scanner.tokenStart) === tokenType) {
                            offset = offset + 1;
                        }
                }

                this.error(message, offset);
            }

            this.scanner.next();
        },

        consume: function(tokenType) {
            var value = this.scanner.getTokenValue();

            this.eat(tokenType);

            return value;
        },
        consumeFunctionName: function() {
            var name = this.scanner.source.substring(this.scanner.tokenStart, this.scanner.tokenEnd - 1);

            this.eat(FUNCTION);

            return name;
        },

        getLocation: function(start, end) {
            if (this.needPositions) {
                return this.locationMap.getLocationRange(
                    start,
                    end,
                    this.filename
                );
            }

            return null;
        },
        getLocationFromList: function(list) {
            if (this.needPositions) {
                var head = this.getFirstListNode(list);
                var tail = this.getLastListNode(list);
                return this.locationMap.getLocationRange(
                    head !== null ? head.loc.start.offset - this.locationMap.startOffset : this.scanner.tokenStart,
                    tail !== null ? tail.loc.end.offset - this.locationMap.startOffset : this.scanner.tokenStart,
                    this.filename
                );
            }

            return null;
        },

        error: function(message, offset) {
            var location = typeof offset !== 'undefined' && offset < this.scanner.source.length
                ? this.locationMap.getLocation(offset)
                : this.scanner.eof
                    ? this.locationMap.getLocation(findWhiteSpaceStart(this.scanner.source, this.scanner.source.length - 1))
                    : this.locationMap.getLocation(this.scanner.tokenStart);

            throw new SyntaxError(
                message || 'Unexpected input',
                this.scanner.source,
                location.offset,
                location.line,
                location.column
            );
        }
    };

    config = processConfig(config || {});
    for (var key in config) {
        parser[key] = config[key];
    }

    return function(source, options) {
        options = options || {};

        var context = options.context || 'default';
        var onComment = options.onComment;
        var ast;

        tokenize(source, parser.scanner);
        parser.locationMap.setSource(
            source,
            options.offset,
            options.line,
            options.column
        );

        parser.filename = options.filename || '<unknown>';
        parser.needPositions = Boolean(options.positions);
        parser.onParseError = typeof options.onParseError === 'function' ? options.onParseError : noop;
        parser.onParseErrorThrow = false;
        parser.parseAtrulePrelude = 'parseAtrulePrelude' in options ? Boolean(options.parseAtrulePrelude) : true;
        parser.parseRulePrelude = 'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true;
        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

        if (!parser.context.hasOwnProperty(context)) {
            throw new Error('Unknown context `' + context + '`');
        }

        if (typeof onComment === 'function') {
            parser.scanner.forEachToken((type, start, end) => {
                if (type === COMMENT) {
                    const loc = parser.getLocation(start, end);
                    const value = cmpStr(source, end - 2, end, '*/')
                        ? source.slice(start + 2, end - 2)
                        : source.slice(start + 2, end);

                    onComment(value, loc);
                }
            });
        }

        ast = parser.context[context].call(parser, options);

        if (!parser.scanner.eof) {
            parser.error();
        }

        return ast;
    };
};


/***/ }),

/***/ "./node_modules/css-tree/lib/parser/sequence.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/parser/sequence.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;

module.exports = function readSequence(recognizer) {
    var children = this.createList();
    var child = null;
    var context = {
        recognizer: recognizer,
        space: null,
        ignoreWS: false,
        ignoreWSAfter: false
    };

    this.scanner.skipSC();

    while (!this.scanner.eof) {
        switch (this.scanner.tokenType) {
            case COMMENT:
                this.scanner.next();
                continue;

            case WHITESPACE:
                if (context.ignoreWS) {
                    this.scanner.next();
                } else {
                    context.space = this.WhiteSpace();
                }
                continue;
        }

        child = recognizer.getNode.call(this, context);

        if (child === undefined) {
            break;
        }

        if (context.space !== null) {
            children.push(context.space);
            context.space = null;
        }

        children.push(child);

        if (context.ignoreWSAfter) {
            context.ignoreWSAfter = false;
            context.ignoreWS = true;
        } else {
            context.ignoreWS = false;
        }
    }

    return children;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/atrule/font-face.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/atrule/font-face.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: {
        prelude: null,
        block: function() {
            return this.Block(true);
        }
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/atrule/import.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/atrule/import.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var STRING = TYPE.String;
var IDENT = TYPE.Ident;
var URL = TYPE.Url;
var FUNCTION = TYPE.Function;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;

module.exports = {
    parse: {
        prelude: function() {
            var children = this.createList();

            this.scanner.skipSC();

            switch (this.scanner.tokenType) {
                case STRING:
                    children.push(this.String());
                    break;

                case URL:
                case FUNCTION:
                    children.push(this.Url());
                    break;

                default:
                    this.error('String or url() is expected');
            }

            if (this.lookupNonWSType(0) === IDENT ||
                this.lookupNonWSType(0) === LEFTPARENTHESIS) {
                children.push(this.WhiteSpace());
                children.push(this.MediaQueryList());
            }

            return children;
        },
        block: null
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/atrule/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/atrule/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'font-face': __webpack_require__(/*! ./font-face */ "./node_modules/css-tree/lib/syntax/atrule/font-face.js"),
    'import': __webpack_require__(/*! ./import */ "./node_modules/css-tree/lib/syntax/atrule/import.js"),
    'media': __webpack_require__(/*! ./media */ "./node_modules/css-tree/lib/syntax/atrule/media.js"),
    'page': __webpack_require__(/*! ./page */ "./node_modules/css-tree/lib/syntax/atrule/page.js"),
    'supports': __webpack_require__(/*! ./supports */ "./node_modules/css-tree/lib/syntax/atrule/supports.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/atrule/media.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/atrule/media.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: {
        prelude: function() {
            return this.createSingleNodeList(
                this.MediaQueryList()
            );
        },
        block: function() {
            return this.Block(false);
        }
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/atrule/page.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/atrule/page.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: {
        prelude: function() {
            return this.createSingleNodeList(
                this.SelectorList()
            );
        },
        block: function() {
            return this.Block(true);
        }
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/atrule/supports.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/atrule/supports.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENT = TYPE.Ident;
var FUNCTION = TYPE.Function;
var COLON = TYPE.Colon;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;

function consumeRaw() {
    return this.createSingleNodeList(
        this.Raw(this.scanner.tokenIndex, null, false)
    );
}

function parentheses() {
    this.scanner.skipSC();

    if (this.scanner.tokenType === IDENT &&
        this.lookupNonWSType(1) === COLON) {
        return this.createSingleNodeList(
            this.Declaration()
        );
    }

    return readSequence.call(this);
}

function readSequence() {
    var children = this.createList();
    var space = null;
    var child;

    this.scanner.skipSC();

    scan:
    while (!this.scanner.eof) {
        switch (this.scanner.tokenType) {
            case WHITESPACE:
                space = this.WhiteSpace();
                continue;

            case COMMENT:
                this.scanner.next();
                continue;

            case FUNCTION:
                child = this.Function(consumeRaw, this.scope.AtrulePrelude);
                break;

            case IDENT:
                child = this.Identifier();
                break;

            case LEFTPARENTHESIS:
                child = this.Parentheses(parentheses, this.scope.AtrulePrelude);
                break;

            default:
                break scan;
        }

        if (space !== null) {
            children.push(space);
            space = null;
        }

        children.push(child);
    }

    return children;
}

module.exports = {
    parse: {
        prelude: function() {
            var children = readSequence.call(this);

            if (this.getFirstListNode(children) === null) {
                this.error('Condition is expected');
            }

            return children;
        },
        block: function() {
            return this.Block(false);
        }
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/config/lexer.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/config/lexer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var data = __webpack_require__(/*! ../../../data */ "./node_modules/css-tree/data/index.js");

module.exports = {
    generic: true,
    types: data.types,
    atrules: data.atrules,
    properties: data.properties,
    node: __webpack_require__(/*! ../node */ "./node_modules/css-tree/lib/syntax/node/index.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/config/mix.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/config/mix.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const hasOwnProperty = Object.prototype.hasOwnProperty;
const shape = {
    generic: true,
    types: appendOrAssign,
    atrules: {
        prelude: appendOrAssignOrNull,
        descriptors: appendOrAssignOrNull
    },
    properties: appendOrAssign,
    parseContext: assign,
    scope: deepAssign,
    atrule: ['parse'],
    pseudo: ['parse'],
    node: ['name', 'structure', 'parse', 'generate', 'walkContext']
};

function isObject(value) {
    return value && value.constructor === Object;
}

function copy(value) {
    return isObject(value)
        ? Object.assign({}, value)
        : value;
}

function assign(dest, src) {
    return Object.assign(dest, src);
}

function deepAssign(dest, src) {
    for (const key in src) {
        if (hasOwnProperty.call(src, key)) {
            if (isObject(dest[key])) {
                deepAssign(dest[key], copy(src[key]));
            } else {
                dest[key] = copy(src[key]);
            }
        }
    }

    return dest;
}

function append(a, b) {
    if (typeof b === 'string' && /^\s*\|/.test(b)) {
        return typeof a === 'string'
            ? a + b
            : b.replace(/^\s*\|\s*/, '');
    }

    return b || null;
}

function appendOrAssign(a, b) {
    if (typeof b === 'string') {
        return append(a, b);
    }

    const result = Object.assign({}, a);
    for (let key in b) {
        if (hasOwnProperty.call(b, key)) {
            result[key] = append(hasOwnProperty.call(a, key) ? a[key] : undefined, b[key]);
        }
    }

    return result;
}

function appendOrAssignOrNull(a, b) {
    const result = appendOrAssign(a, b);

    return !isObject(result) || Object.keys(result).length
        ? result
        : null;
}

function mix(dest, src, shape) {
    for (const key in shape) {
        if (hasOwnProperty.call(shape, key) === false) {
            continue;
        }

        if (shape[key] === true) {
            if (key in src) {
                if (hasOwnProperty.call(src, key)) {
                    dest[key] = copy(src[key]);
                }
            }
        } else if (shape[key]) {
            if (typeof shape[key] === 'function') {
                const fn = shape[key];
                dest[key] = fn({}, dest[key]);
                dest[key] = fn(dest[key] || {}, src[key]);
            } else if (isObject(shape[key])) {
                const result = {};

                for (let name in dest[key]) {
                    result[name] = mix({}, dest[key][name], shape[key]);
                }

                for (let name in src[key]) {
                    result[name] = mix(result[name] || {}, src[key][name], shape[key]);
                }

                dest[key] = result;
            } else if (Array.isArray(shape[key])) {
                const res = {};
                const innerShape = shape[key].reduce(function(s, k) {
                    s[k] = true;
                    return s;
                }, {});

                for (const [name, value] of Object.entries(dest[key] || {})) {
                    res[name] = {};
                    if (value) {
                        mix(res[name], value, innerShape);
                    }
                }

                for (const name in src[key]) {
                    if (hasOwnProperty.call(src[key], name)) {
                        if (!res[name]) {
                            res[name] = {};
                        }

                        if (src[key] && src[key][name]) {
                            mix(res[name], src[key][name], innerShape);
                        }
                    }
                }

                dest[key] = res;
            }
        }
    }
    return dest;
}

module.exports = (dest, src) => mix(dest, src, shape);


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/config/parser.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/config/parser.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    parseContext: {
        default: 'StyleSheet',
        stylesheet: 'StyleSheet',
        atrule: 'Atrule',
        atrulePrelude: function(options) {
            return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
        },
        mediaQueryList: 'MediaQueryList',
        mediaQuery: 'MediaQuery',
        rule: 'Rule',
        selectorList: 'SelectorList',
        selector: 'Selector',
        block: function() {
            return this.Block(true);
        },
        declarationList: 'DeclarationList',
        declaration: 'Declaration',
        value: 'Value'
    },
    scope: __webpack_require__(/*! ../scope */ "./node_modules/css-tree/lib/syntax/scope/index.js"),
    atrule: __webpack_require__(/*! ../atrule */ "./node_modules/css-tree/lib/syntax/atrule/index.js"),
    pseudo: __webpack_require__(/*! ../pseudo */ "./node_modules/css-tree/lib/syntax/pseudo/index.js"),
    node: __webpack_require__(/*! ../node */ "./node_modules/css-tree/lib/syntax/node/index.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/config/walker.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/config/walker.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    node: __webpack_require__(/*! ../node */ "./node_modules/css-tree/lib/syntax/node/index.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/create.js":
/*!****************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/create.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(/*! ../common/List */ "./node_modules/css-tree/lib/common/List.js");
var SyntaxError = __webpack_require__(/*! ../common/SyntaxError */ "./node_modules/css-tree/lib/common/SyntaxError.js");
var TokenStream = __webpack_require__(/*! ../common/TokenStream */ "./node_modules/css-tree/lib/common/TokenStream.js");
var Lexer = __webpack_require__(/*! ../lexer/Lexer */ "./node_modules/css-tree/lib/lexer/Lexer.js");
var definitionSyntax = __webpack_require__(/*! ../definition-syntax */ "./node_modules/css-tree/lib/definition-syntax/index.js");
var tokenize = __webpack_require__(/*! ../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js");
var createParser = __webpack_require__(/*! ../parser/create */ "./node_modules/css-tree/lib/parser/create.js");
var createGenerator = __webpack_require__(/*! ../generator/create */ "./node_modules/css-tree/lib/generator/create.js");
var createConvertor = __webpack_require__(/*! ../convertor/create */ "./node_modules/css-tree/lib/convertor/create.js");
var createWalker = __webpack_require__(/*! ../walker/create */ "./node_modules/css-tree/lib/walker/create.js");
var clone = __webpack_require__(/*! ../utils/clone */ "./node_modules/css-tree/lib/utils/clone.js");
var names = __webpack_require__(/*! ../utils/names */ "./node_modules/css-tree/lib/utils/names.js");
var mix = __webpack_require__(/*! ./config/mix */ "./node_modules/css-tree/lib/syntax/config/mix.js");

function createSyntax(config) {
    var parse = createParser(config);
    var walk = createWalker(config);
    var generate = createGenerator(config);
    var convert = createConvertor(walk);

    var syntax = {
        List: List,
        SyntaxError: SyntaxError,
        TokenStream: TokenStream,
        Lexer: Lexer,

        vendorPrefix: names.vendorPrefix,
        keyword: names.keyword,
        property: names.property,
        isCustomProperty: names.isCustomProperty,

        definitionSyntax: definitionSyntax,
        lexer: null,
        createLexer: function(config) {
            return new Lexer(config, syntax, syntax.lexer.structure);
        },

        tokenize: tokenize,
        parse: parse,
        walk: walk,
        generate: generate,

        find: walk.find,
        findLast: walk.findLast,
        findAll: walk.findAll,

        clone: clone,
        fromPlainObject: convert.fromPlainObject,
        toPlainObject: convert.toPlainObject,

        createSyntax: function(config) {
            return createSyntax(mix({}, config));
        },
        fork: function(extension) {
            var base = mix({}, config); // copy of config
            return createSyntax(
                typeof extension === 'function'
                    ? extension(base, Object.assign)
                    : mix(base, extension)
            );
        }
    };

    syntax.lexer = new Lexer({
        generic: true,
        types: config.types,
        atrules: config.atrules,
        properties: config.properties,
        node: config.node
    }, syntax);

    return syntax;
};

exports.create = function(config) {
    return createSyntax(mix({}, config));
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/function/expression.js":
/*!*****************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/function/expression.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// legacy IE function
// expression( <any-value> )
module.exports = function() {
    return this.createSingleNodeList(
        this.Raw(this.scanner.tokenIndex, null, false)
    );
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/function/var.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/function/var.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var rawMode = __webpack_require__(/*! ../node/Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js").mode;

var COMMA = TYPE.Comma;
var WHITESPACE = TYPE.WhiteSpace;

// var( <ident> , <value>? )
module.exports = function() {
    var children = this.createList();

    this.scanner.skipSC();

    // NOTE: Don't check more than a first argument is an ident, rest checks are for lexer
    children.push(this.Identifier());

    this.scanner.skipSC();

    if (this.scanner.tokenType === COMMA) {
        children.push(this.Operator());

        const startIndex = this.scanner.tokenIndex;
        const value = this.parseCustomProperty
            ? this.Value(null)
            : this.Raw(this.scanner.tokenIndex, rawMode.exclamationMarkOrSemicolon, false);

        if (value.type === 'Value' && value.children.isEmpty()) {
            for (let offset = startIndex - this.scanner.tokenIndex; offset <= 0; offset++) {
                if (this.scanner.lookupType(offset) === WHITESPACE) {
                    value.children.appendData({
                        type: 'WhiteSpace',
                        loc: null,
                        value: ' '
                    });
                    break;
                }
            }
        }

        children.push(value);
    }

    return children;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/index.js":
/*!***************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function merge() {
    var dest = {};

    for (var i = 0; i < arguments.length; i++) {
        var src = arguments[i];
        for (var key in src) {
            dest[key] = src[key];
        }
    }

    return dest;
}

module.exports = __webpack_require__(/*! ./create */ "./node_modules/css-tree/lib/syntax/create.js").create(
    merge(
        __webpack_require__(/*! ./config/lexer */ "./node_modules/css-tree/lib/syntax/config/lexer.js"),
        __webpack_require__(/*! ./config/parser */ "./node_modules/css-tree/lib/syntax/config/parser.js"),
        __webpack_require__(/*! ./config/walker */ "./node_modules/css-tree/lib/syntax/config/walker.js")
    )
);
module.exports.version = __webpack_require__(/*! ../../package.json */ "./node_modules/css-tree/package.json").version;


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/AnPlusB.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/AnPlusB.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cmpChar = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpChar;
var isDigit = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isDigit;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENT = TYPE.Ident;
var NUMBER = TYPE.Number;
var DIMENSION = TYPE.Dimension;
var PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
var HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
var N = 0x006E;           // U+006E LATIN SMALL LETTER N (n)
var DISALLOW_SIGN = true;
var ALLOW_SIGN = false;

function checkInteger(offset, disallowSign) {
    var pos = this.scanner.tokenStart + offset;
    var code = this.scanner.source.charCodeAt(pos);

    if (code === PLUSSIGN || code === HYPHENMINUS) {
        if (disallowSign) {
            this.error('Number sign is not allowed');
        }
        pos++;
    }

    for (; pos < this.scanner.tokenEnd; pos++) {
        if (!isDigit(this.scanner.source.charCodeAt(pos))) {
            this.error('Integer is expected', pos);
        }
    }
}

function checkTokenIsInteger(disallowSign) {
    return checkInteger.call(this, 0, disallowSign);
}

function expectCharCode(offset, code) {
    if (!cmpChar(this.scanner.source, this.scanner.tokenStart + offset, code)) {
        var msg = '';

        switch (code) {
            case N:
                msg = 'N is expected';
                break;
            case HYPHENMINUS:
                msg = 'HyphenMinus is expected';
                break;
        }

        this.error(msg, this.scanner.tokenStart + offset);
    }
}

// ... <signed-integer>
// ... ['+' | '-'] <signless-integer>
function consumeB() {
    var offset = 0;
    var sign = 0;
    var type = this.scanner.tokenType;

    while (type === WHITESPACE || type === COMMENT) {
        type = this.scanner.lookupType(++offset);
    }

    if (type !== NUMBER) {
        if (this.scanner.isDelim(PLUSSIGN, offset) ||
            this.scanner.isDelim(HYPHENMINUS, offset)) {
            sign = this.scanner.isDelim(PLUSSIGN, offset) ? PLUSSIGN : HYPHENMINUS;

            do {
                type = this.scanner.lookupType(++offset);
            } while (type === WHITESPACE || type === COMMENT);

            if (type !== NUMBER) {
                this.scanner.skip(offset);
                checkTokenIsInteger.call(this, DISALLOW_SIGN);
            }
        } else {
            return null;
        }
    }

    if (offset > 0) {
        this.scanner.skip(offset);
    }

    if (sign === 0) {
        type = this.scanner.source.charCodeAt(this.scanner.tokenStart);
        if (type !== PLUSSIGN && type !== HYPHENMINUS) {
            this.error('Number sign is expected');
        }
    }

    checkTokenIsInteger.call(this, sign !== 0);
    return sign === HYPHENMINUS ? '-' + this.consume(NUMBER) : this.consume(NUMBER);
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
module.exports = {
    name: 'AnPlusB',
    structure: {
        a: [String, null],
        b: [String, null]
    },
    parse: function() {
        /* eslint-disable brace-style*/
        var start = this.scanner.tokenStart;
        var a = null;
        var b = null;

        // <integer>
        if (this.scanner.tokenType === NUMBER) {
            checkTokenIsInteger.call(this, ALLOW_SIGN);
            b = this.consume(NUMBER);
        }

        // -n
        // -n <signed-integer>
        // -n ['+' | '-'] <signless-integer>
        // -n- <signless-integer>
        // <dashndashdigit-ident>
        else if (this.scanner.tokenType === IDENT && cmpChar(this.scanner.source, this.scanner.tokenStart, HYPHENMINUS)) {
            a = '-1';

            expectCharCode.call(this, 1, N);

            switch (this.scanner.getTokenLength()) {
                // -n
                // -n <signed-integer>
                // -n ['+' | '-'] <signless-integer>
                case 2:
                    this.scanner.next();
                    b = consumeB.call(this);
                    break;

                // -n- <signless-integer>
                case 3:
                    expectCharCode.call(this, 2, HYPHENMINUS);

                    this.scanner.next();
                    this.scanner.skipSC();

                    checkTokenIsInteger.call(this, DISALLOW_SIGN);

                    b = '-' + this.consume(NUMBER);
                    break;

                // <dashndashdigit-ident>
                default:
                    expectCharCode.call(this, 2, HYPHENMINUS);
                    checkInteger.call(this, 3, DISALLOW_SIGN);
                    this.scanner.next();

                    b = this.scanner.substrToCursor(start + 2);
            }
        }

        // '+'? n
        // '+'? n <signed-integer>
        // '+'? n ['+' | '-'] <signless-integer>
        // '+'? n- <signless-integer>
        // '+'? <ndashdigit-ident>
        else if (this.scanner.tokenType === IDENT || (this.scanner.isDelim(PLUSSIGN) && this.scanner.lookupType(1) === IDENT)) {
            var sign = 0;
            a = '1';

            // just ignore a plus
            if (this.scanner.isDelim(PLUSSIGN)) {
                sign = 1;
                this.scanner.next();
            }

            expectCharCode.call(this, 0, N);

            switch (this.scanner.getTokenLength()) {
                // '+'? n
                // '+'? n <signed-integer>
                // '+'? n ['+' | '-'] <signless-integer>
                case 1:
                    this.scanner.next();
                    b = consumeB.call(this);
                    break;

                // '+'? n- <signless-integer>
                case 2:
                    expectCharCode.call(this, 1, HYPHENMINUS);

                    this.scanner.next();
                    this.scanner.skipSC();

                    checkTokenIsInteger.call(this, DISALLOW_SIGN);

                    b = '-' + this.consume(NUMBER);
                    break;

                // '+'? <ndashdigit-ident>
                default:
                    expectCharCode.call(this, 1, HYPHENMINUS);
                    checkInteger.call(this, 2, DISALLOW_SIGN);
                    this.scanner.next();

                    b = this.scanner.substrToCursor(start + sign + 1);
            }
        }

        // <ndashdigit-dimension>
        // <ndash-dimension> <signless-integer>
        // <n-dimension>
        // <n-dimension> <signed-integer>
        // <n-dimension> ['+' | '-'] <signless-integer>
        else if (this.scanner.tokenType === DIMENSION) {
            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);
            var sign = code === PLUSSIGN || code === HYPHENMINUS;

            for (var i = this.scanner.tokenStart + sign; i < this.scanner.tokenEnd; i++) {
                if (!isDigit(this.scanner.source.charCodeAt(i))) {
                    break;
                }
            }

            if (i === this.scanner.tokenStart + sign) {
                this.error('Integer is expected', this.scanner.tokenStart + sign);
            }

            expectCharCode.call(this, i - this.scanner.tokenStart, N);
            a = this.scanner.source.substring(start, i);

            // <n-dimension>
            // <n-dimension> <signed-integer>
            // <n-dimension> ['+' | '-'] <signless-integer>
            if (i + 1 === this.scanner.tokenEnd) {
                this.scanner.next();
                b = consumeB.call(this);
            } else {
                expectCharCode.call(this, i - this.scanner.tokenStart + 1, HYPHENMINUS);

                // <ndash-dimension> <signless-integer>
                if (i + 2 === this.scanner.tokenEnd) {
                    this.scanner.next();
                    this.scanner.skipSC();
                    checkTokenIsInteger.call(this, DISALLOW_SIGN);
                    b = '-' + this.consume(NUMBER);
                }
                // <ndashdigit-dimension>
                else {
                    checkInteger.call(this, i - this.scanner.tokenStart + 2, DISALLOW_SIGN);
                    this.scanner.next();
                    b = this.scanner.substrToCursor(i + 1);
                }
            }
        } else {
            this.error();
        }

        if (a !== null && a.charCodeAt(0) === PLUSSIGN) {
            a = a.substr(1);
        }

        if (b !== null && b.charCodeAt(0) === PLUSSIGN) {
            b = b.substr(1);
        }

        return {
            type: 'AnPlusB',
            loc: this.getLocation(start, this.scanner.tokenStart),
            a: a,
            b: b
        };
    },
    generate: function(node) {
        var a = node.a !== null && node.a !== undefined;
        var b = node.b !== null && node.b !== undefined;

        if (a) {
            this.chunk(
                node.a === '+1' ? '+n' : // eslint-disable-line operator-linebreak, indent
                node.a ===  '1' ?  'n' : // eslint-disable-line operator-linebreak, indent
                node.a === '-1' ? '-n' : // eslint-disable-line operator-linebreak, indent
                node.a + 'n'             // eslint-disable-line operator-linebreak, indent
            );

            if (b) {
                b = String(node.b);
                if (b.charAt(0) === '-' || b.charAt(0) === '+') {
                    this.chunk(b.charAt(0));
                    this.chunk(b.substr(1));
                } else {
                    this.chunk('+');
                    this.chunk(b);
                }
            }
        } else {
            this.chunk(String(node.b));
        }
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Atrule.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Atrule.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var rawMode = __webpack_require__(/*! ./Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js").mode;

var ATKEYWORD = TYPE.AtKeyword;
var SEMICOLON = TYPE.Semicolon;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;
var RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;

function consumeRaw(startToken) {
    return this.Raw(startToken, rawMode.leftCurlyBracketOrSemicolon, true);
}

function isDeclarationBlockAtrule() {
    for (var offset = 1, type; type = this.scanner.lookupType(offset); offset++) {
        if (type === RIGHTCURLYBRACKET) {
            return true;
        }

        if (type === LEFTCURLYBRACKET ||
            type === ATKEYWORD) {
            return false;
        }
    }

    return false;
}

module.exports = {
    name: 'Atrule',
    structure: {
        name: String,
        prelude: ['AtrulePrelude', 'Raw', null],
        block: ['Block', null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var name;
        var nameLowerCase;
        var prelude = null;
        var block = null;

        this.eat(ATKEYWORD);

        name = this.scanner.substrToCursor(start + 1);
        nameLowerCase = name.toLowerCase();
        this.scanner.skipSC();

        // parse prelude
        if (this.scanner.eof === false &&
            this.scanner.tokenType !== LEFTCURLYBRACKET &&
            this.scanner.tokenType !== SEMICOLON) {
            if (this.parseAtrulePrelude) {
                prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name), consumeRaw);

                // turn empty AtrulePrelude into null
                if (prelude.type === 'AtrulePrelude' && prelude.children.head === null) {
                    prelude = null;
                }
            } else {
                prelude = consumeRaw.call(this, this.scanner.tokenIndex);
            }

            this.scanner.skipSC();
        }

        switch (this.scanner.tokenType) {
            case SEMICOLON:
                this.scanner.next();
                break;

            case LEFTCURLYBRACKET:
                if (this.atrule.hasOwnProperty(nameLowerCase) &&
                    typeof this.atrule[nameLowerCase].block === 'function') {
                    block = this.atrule[nameLowerCase].block.call(this);
                } else {
                    // TODO: should consume block content as Raw?
                    block = this.Block(isDeclarationBlockAtrule.call(this));
                }

                break;
        }

        return {
            type: 'Atrule',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            prelude: prelude,
            block: block
        };
    },
    generate: function(node) {
        this.chunk('@');
        this.chunk(node.name);

        if (node.prelude !== null) {
            this.chunk(' ');
            this.node(node.prelude);
        }

        if (node.block) {
            this.node(node.block);
        } else {
            this.chunk(';');
        }
    },
    walkContext: 'atrule'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/AtrulePrelude.js":
/*!****************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/AtrulePrelude.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var SEMICOLON = TYPE.Semicolon;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;

module.exports = {
    name: 'AtrulePrelude',
    structure: {
        children: [[]]
    },
    parse: function(name) {
        var children = null;

        if (name !== null) {
            name = name.toLowerCase();
        }

        this.scanner.skipSC();

        if (this.atrule.hasOwnProperty(name) &&
            typeof this.atrule[name].prelude === 'function') {
            // custom consumer
            children = this.atrule[name].prelude.call(this);
        } else {
            // default consumer
            children = this.readSequence(this.scope.AtrulePrelude);
        }

        this.scanner.skipSC();

        if (this.scanner.eof !== true &&
            this.scanner.tokenType !== LEFTCURLYBRACKET &&
            this.scanner.tokenType !== SEMICOLON) {
            this.error('Semicolon or block is expected');
        }

        if (children === null) {
            children = this.createList();
        }

        return {
            type: 'AtrulePrelude',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    },
    walkContext: 'atrulePrelude'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/AttributeSelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/AttributeSelector.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var STRING = TYPE.String;
var COLON = TYPE.Colon;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var RIGHTSQUAREBRACKET = TYPE.RightSquareBracket;
var DOLLARSIGN = 0x0024;       // U+0024 DOLLAR SIGN ($)
var ASTERISK = 0x002A;         // U+002A ASTERISK (*)
var EQUALSSIGN = 0x003D;       // U+003D EQUALS SIGN (=)
var CIRCUMFLEXACCENT = 0x005E; // U+005E (^)
var VERTICALLINE = 0x007C;     // U+007C VERTICAL LINE (|)
var TILDE = 0x007E;            // U+007E TILDE (~)

function getAttributeName() {
    if (this.scanner.eof) {
        this.error('Unexpected end of input');
    }

    var start = this.scanner.tokenStart;
    var expectIdent = false;
    var checkColon = true;

    if (this.scanner.isDelim(ASTERISK)) {
        expectIdent = true;
        checkColon = false;
        this.scanner.next();
    } else if (!this.scanner.isDelim(VERTICALLINE)) {
        this.eat(IDENT);
    }

    if (this.scanner.isDelim(VERTICALLINE)) {
        if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 1) !== EQUALSSIGN) {
            this.scanner.next();
            this.eat(IDENT);
        } else if (expectIdent) {
            this.error('Identifier is expected', this.scanner.tokenEnd);
        }
    } else if (expectIdent) {
        this.error('Vertical line is expected');
    }

    if (checkColon && this.scanner.tokenType === COLON) {
        this.scanner.next();
        this.eat(IDENT);
    }

    return {
        type: 'Identifier',
        loc: this.getLocation(start, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(start)
    };
}

function getOperator() {
    var start = this.scanner.tokenStart;
    var code = this.scanner.source.charCodeAt(start);

    if (code !== EQUALSSIGN &&        // =
        code !== TILDE &&             // ~=
        code !== CIRCUMFLEXACCENT &&  // ^=
        code !== DOLLARSIGN &&        // $=
        code !== ASTERISK &&          // *=
        code !== VERTICALLINE         // |=
    ) {
        this.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected');
    }

    this.scanner.next();

    if (code !== EQUALSSIGN) {
        if (!this.scanner.isDelim(EQUALSSIGN)) {
            this.error('Equal sign is expected');
        }

        this.scanner.next();
    }

    return this.scanner.substrToCursor(start);
}

// '[' <wq-name> ']'
// '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'
module.exports = {
    name: 'AttributeSelector',
    structure: {
        name: 'Identifier',
        matcher: [String, null],
        value: ['String', 'Identifier', null],
        flags: [String, null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var name;
        var matcher = null;
        var value = null;
        var flags = null;

        this.eat(LEFTSQUAREBRACKET);
        this.scanner.skipSC();

        name = getAttributeName.call(this);
        this.scanner.skipSC();

        if (this.scanner.tokenType !== RIGHTSQUAREBRACKET) {
            // avoid case `[name i]`
            if (this.scanner.tokenType !== IDENT) {
                matcher = getOperator.call(this);

                this.scanner.skipSC();

                value = this.scanner.tokenType === STRING
                    ? this.String()
                    : this.Identifier();

                this.scanner.skipSC();
            }

            // attribute flags
            if (this.scanner.tokenType === IDENT) {
                flags = this.scanner.getTokenValue();
                this.scanner.next();

                this.scanner.skipSC();
            }
        }

        this.eat(RIGHTSQUAREBRACKET);

        return {
            type: 'AttributeSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            matcher: matcher,
            value: value,
            flags: flags
        };
    },
    generate: function(node) {
        var flagsPrefix = ' ';

        this.chunk('[');
        this.node(node.name);

        if (node.matcher !== null) {
            this.chunk(node.matcher);

            if (node.value !== null) {
                this.node(node.value);

                // space between string and flags is not required
                if (node.value.type === 'String') {
                    flagsPrefix = '';
                }
            }
        }

        if (node.flags !== null) {
            this.chunk(flagsPrefix);
            this.chunk(node.flags);
        }

        this.chunk(']');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Block.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Block.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var rawMode = __webpack_require__(/*! ./Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js").mode;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var SEMICOLON = TYPE.Semicolon;
var ATKEYWORD = TYPE.AtKeyword;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;
var RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;

function consumeRaw(startToken) {
    return this.Raw(startToken, null, true);
}
function consumeRule() {
    return this.parseWithFallback(this.Rule, consumeRaw);
}
function consumeRawDeclaration(startToken) {
    return this.Raw(startToken, rawMode.semicolonIncluded, true);
}
function consumeDeclaration() {
    if (this.scanner.tokenType === SEMICOLON) {
        return consumeRawDeclaration.call(this, this.scanner.tokenIndex);
    }

    var node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);

    if (this.scanner.tokenType === SEMICOLON) {
        this.scanner.next();
    }

    return node;
}

module.exports = {
    name: 'Block',
    structure: {
        children: [[
            'Atrule',
            'Rule',
            'Declaration'
        ]]
    },
    parse: function(isDeclaration) {
        var consumer = isDeclaration ? consumeDeclaration : consumeRule;

        var start = this.scanner.tokenStart;
        var children = this.createList();

        this.eat(LEFTCURLYBRACKET);

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case RIGHTCURLYBRACKET:
                    break scan;

                case WHITESPACE:
                case COMMENT:
                    this.scanner.next();
                    break;

                case ATKEYWORD:
                    children.push(this.parseWithFallback(this.Atrule, consumeRaw));
                    break;

                default:
                    children.push(consumer.call(this));
            }
        }

        if (!this.scanner.eof) {
            this.eat(RIGHTCURLYBRACKET);
        }

        return {
            type: 'Block',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.chunk('{');
        this.children(node, function(prev) {
            if (prev.type === 'Declaration') {
                this.chunk(';');
            }
        });
        this.chunk('}');
    },
    walkContext: 'block'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Brackets.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Brackets.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var RIGHTSQUAREBRACKET = TYPE.RightSquareBracket;

module.exports = {
    name: 'Brackets',
    structure: {
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var children = null;

        this.eat(LEFTSQUAREBRACKET);

        children = readSequence.call(this, recognizer);

        if (!this.scanner.eof) {
            this.eat(RIGHTSQUAREBRACKET);
        }

        return {
            type: 'Brackets',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.chunk('[');
        this.children(node);
        this.chunk(']');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/CDC.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/CDC.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CDC = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE.CDC;

module.exports = {
    name: 'CDC',
    structure: [],
    parse: function() {
        var start = this.scanner.tokenStart;

        this.eat(CDC); // -->

        return {
            type: 'CDC',
            loc: this.getLocation(start, this.scanner.tokenStart)
        };
    },
    generate: function() {
        this.chunk('-->');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/CDO.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/CDO.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CDO = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE.CDO;

module.exports = {
    name: 'CDO',
    structure: [],
    parse: function() {
        var start = this.scanner.tokenStart;

        this.eat(CDO); // <!--

        return {
            type: 'CDO',
            loc: this.getLocation(start, this.scanner.tokenStart)
        };
    },
    generate: function() {
        this.chunk('<!--');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/ClassSelector.js":
/*!****************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/ClassSelector.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var FULLSTOP = 0x002E; // U+002E FULL STOP (.)

// '.' ident
module.exports = {
    name: 'ClassSelector',
    structure: {
        name: String
    },
    parse: function() {
        if (!this.scanner.isDelim(FULLSTOP)) {
            this.error('Full stop is expected');
        }

        this.scanner.next();

        return {
            type: 'ClassSelector',
            loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
            name: this.consume(IDENT)
        };
    },
    generate: function(node) {
        this.chunk('.');
        this.chunk(node.name);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Combinator.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Combinator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
var SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
var GREATERTHANSIGN = 0x003E; // U+003E GREATER-THAN SIGN (>)
var TILDE = 0x007E;           // U+007E TILDE (~)

// + | > | ~ | /deep/
module.exports = {
    name: 'Combinator',
    structure: {
        name: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

        switch (code) {
            case GREATERTHANSIGN:
            case PLUSSIGN:
            case TILDE:
                this.scanner.next();
                break;

            case SOLIDUS:
                this.scanner.next();

                if (this.scanner.tokenType !== IDENT || this.scanner.lookupValue(0, 'deep') === false) {
                    this.error('Identifier `deep` is expected');
                }

                this.scanner.next();

                if (!this.scanner.isDelim(SOLIDUS)) {
                    this.error('Solidus is expected');
                }

                this.scanner.next();
                break;

            default:
                this.error('Combinator is expected');
        }

        return {
            type: 'Combinator',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.name);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Comment.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Comment.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var COMMENT = TYPE.Comment;
var ASTERISK = 0x002A;        // U+002A ASTERISK (*)
var SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)

// '/*' .* '*/'
module.exports = {
    name: 'Comment',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var end = this.scanner.tokenEnd;

        this.eat(COMMENT);

        if ((end - start + 2) >= 2 &&
            this.scanner.source.charCodeAt(end - 2) === ASTERISK &&
            this.scanner.source.charCodeAt(end - 1) === SOLIDUS) {
            end -= 2;
        }

        return {
            type: 'Comment',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.source.substring(start + 2, end)
        };
    },
    generate: function(node) {
        this.chunk('/*');
        this.chunk(node.value);
        this.chunk('*/');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Declaration.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Declaration.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isCustomProperty = __webpack_require__(/*! ../../utils/names */ "./node_modules/css-tree/lib/utils/names.js").isCustomProperty;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var rawMode = __webpack_require__(/*! ./Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js").mode;

var IDENT = TYPE.Ident;
var HASH = TYPE.Hash;
var COLON = TYPE.Colon;
var SEMICOLON = TYPE.Semicolon;
var DELIM = TYPE.Delim;
var WHITESPACE = TYPE.WhiteSpace;
var EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)
var NUMBERSIGN = 0x0023;      // U+0023 NUMBER SIGN (#)
var DOLLARSIGN = 0x0024;      // U+0024 DOLLAR SIGN ($)
var AMPERSAND = 0x0026;       // U+0026 ANPERSAND (&)
var ASTERISK = 0x002A;        // U+002A ASTERISK (*)
var PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
var SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)

function consumeValueRaw(startToken) {
    return this.Raw(startToken, rawMode.exclamationMarkOrSemicolon, true);
}

function consumeCustomPropertyRaw(startToken) {
    return this.Raw(startToken, rawMode.exclamationMarkOrSemicolon, false);
}

function consumeValue() {
    var startValueToken = this.scanner.tokenIndex;
    var value = this.Value();

    if (value.type !== 'Raw' &&
        this.scanner.eof === false &&
        this.scanner.tokenType !== SEMICOLON &&
        this.scanner.isDelim(EXCLAMATIONMARK) === false &&
        this.scanner.isBalanceEdge(startValueToken) === false) {
        this.error();
    }

    return value;
}

module.exports = {
    name: 'Declaration',
    structure: {
        important: [Boolean, String],
        property: String,
        value: ['Value', 'Raw']
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var startToken = this.scanner.tokenIndex;
        var property = readProperty.call(this);
        var customProperty = isCustomProperty(property);
        var parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
        var consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
        var important = false;
        var value;

        this.scanner.skipSC();
        this.eat(COLON);

        const valueStart = this.scanner.tokenIndex;

        if (!customProperty) {
            this.scanner.skipSC();
        }

        if (parseValue) {
            value = this.parseWithFallback(consumeValue, consumeRaw);
        } else {
            value = consumeRaw.call(this, this.scanner.tokenIndex);
        }

        if (customProperty && value.type === 'Value' && value.children.isEmpty()) {
            for (let offset = valueStart - this.scanner.tokenIndex; offset <= 0; offset++) {
                if (this.scanner.lookupType(offset) === WHITESPACE) {
                    value.children.appendData({
                        type: 'WhiteSpace',
                        loc: null,
                        value: ' '
                    });
                    break;
                }
            }
        }

        if (this.scanner.isDelim(EXCLAMATIONMARK)) {
            important = getImportant.call(this);
            this.scanner.skipSC();
        }

        // Do not include semicolon to range per spec
        // https://drafts.csswg.org/css-syntax/#declaration-diagram

        if (this.scanner.eof === false &&
            this.scanner.tokenType !== SEMICOLON &&
            this.scanner.isBalanceEdge(startToken) === false) {
            this.error();
        }

        return {
            type: 'Declaration',
            loc: this.getLocation(start, this.scanner.tokenStart),
            important: important,
            property: property,
            value: value
        };
    },
    generate: function(node) {
        this.chunk(node.property);
        this.chunk(':');
        this.node(node.value);

        if (node.important) {
            this.chunk(node.important === true ? '!important' : '!' + node.important);
        }
    },
    walkContext: 'declaration'
};

function readProperty() {
    var start = this.scanner.tokenStart;
    var prefix = 0;

    // hacks
    if (this.scanner.tokenType === DELIM) {
        switch (this.scanner.source.charCodeAt(this.scanner.tokenStart)) {
            case ASTERISK:
            case DOLLARSIGN:
            case PLUSSIGN:
            case NUMBERSIGN:
            case AMPERSAND:
                this.scanner.next();
                break;

            // TODO: not sure we should support this hack
            case SOLIDUS:
                this.scanner.next();
                if (this.scanner.isDelim(SOLIDUS)) {
                    this.scanner.next();
                }
                break;
        }
    }

    if (prefix) {
        this.scanner.skip(prefix);
    }

    if (this.scanner.tokenType === HASH) {
        this.eat(HASH);
    } else {
        this.eat(IDENT);
    }

    return this.scanner.substrToCursor(start);
}

// ! ws* important
function getImportant() {
    this.eat(DELIM);
    this.scanner.skipSC();

    var important = this.consume(IDENT);

    // store original value in case it differ from `important`
    // for better original source restoring and hacks like `!ie` support
    return important === 'important' ? true : important;
}


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/DeclarationList.js":
/*!******************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/DeclarationList.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var rawMode = __webpack_require__(/*! ./Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js").mode;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var SEMICOLON = TYPE.Semicolon;

function consumeRaw(startToken) {
    return this.Raw(startToken, rawMode.semicolonIncluded, true);
}

module.exports = {
    name: 'DeclarationList',
    structure: {
        children: [[
            'Declaration'
        ]]
    },
    parse: function() {
        var children = this.createList();

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case WHITESPACE:
                case COMMENT:
                case SEMICOLON:
                    this.scanner.next();
                    break;

                default:
                    children.push(this.parseWithFallback(this.Declaration, consumeRaw));
            }
        }

        return {
            type: 'DeclarationList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node, function(prev) {
            if (prev.type === 'Declaration') {
                this.chunk(';');
            }
        });
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Dimension.js":
/*!************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Dimension.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var consumeNumber = __webpack_require__(/*! ../../tokenizer/utils */ "./node_modules/css-tree/lib/tokenizer/utils.js").consumeNumber;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var DIMENSION = TYPE.Dimension;

module.exports = {
    name: 'Dimension',
    structure: {
        value: String,
        unit: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var numberEnd = consumeNumber(this.scanner.source, start);

        this.eat(DIMENSION);

        return {
            type: 'Dimension',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.source.substring(start, numberEnd),
            unit: this.scanner.source.substring(numberEnd, this.scanner.tokenStart)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
        this.chunk(node.unit);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Function.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Function.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// <function-token> <sequence> )
module.exports = {
    name: 'Function',
    structure: {
        name: String,
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var name = this.consumeFunctionName();
        var nameLowerCase = name.toLowerCase();
        var children;

        children = recognizer.hasOwnProperty(nameLowerCase)
            ? recognizer[nameLowerCase].call(this, recognizer)
            : readSequence.call(this, recognizer);

        if (!this.scanner.eof) {
            this.eat(RIGHTPARENTHESIS);
        }

        return {
            type: 'Function',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(node) {
        this.chunk(node.name);
        this.chunk('(');
        this.children(node);
        this.chunk(')');
    },
    walkContext: 'function'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Hash.js":
/*!*******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Hash.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var HASH = TYPE.Hash;

// '#' ident
module.exports = {
    name: 'Hash',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        this.eat(HASH);

        return {
            type: 'Hash',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.substrToCursor(start + 1)
        };
    },
    generate: function(node) {
        this.chunk('#');
        this.chunk(node.value);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/IdSelector.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/IdSelector.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var HASH = TYPE.Hash;

// <hash-token>
module.exports = {
    name: 'IdSelector',
    structure: {
        name: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        // TODO: check value is an ident
        this.eat(HASH);

        return {
            type: 'IdSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: this.scanner.substrToCursor(start + 1)
        };
    },
    generate: function(node) {
        this.chunk('#');
        this.chunk(node.name);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Identifier.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Identifier.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;

module.exports = {
    name: 'Identifier',
    structure: {
        name: String
    },
    parse: function() {
        return {
            type: 'Identifier',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            name: this.consume(IDENT)
        };
    },
    generate: function(node) {
        this.chunk(node.name);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/MediaFeature.js":
/*!***************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/MediaFeature.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var NUMBER = TYPE.Number;
var DIMENSION = TYPE.Dimension;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;
var COLON = TYPE.Colon;
var DELIM = TYPE.Delim;

module.exports = {
    name: 'MediaFeature',
    structure: {
        name: String,
        value: ['Identifier', 'Number', 'Dimension', 'Ratio', null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var name;
        var value = null;

        this.eat(LEFTPARENTHESIS);
        this.scanner.skipSC();

        name = this.consume(IDENT);
        this.scanner.skipSC();

        if (this.scanner.tokenType !== RIGHTPARENTHESIS) {
            this.eat(COLON);
            this.scanner.skipSC();

            switch (this.scanner.tokenType) {
                case NUMBER:
                    if (this.lookupNonWSType(1) === DELIM) {
                        value = this.Ratio();
                    } else {
                        value = this.Number();
                    }

                    break;

                case DIMENSION:
                    value = this.Dimension();
                    break;

                case IDENT:
                    value = this.Identifier();

                    break;

                default:
                    this.error('Number, dimension, ratio or identifier is expected');
            }

            this.scanner.skipSC();
        }

        this.eat(RIGHTPARENTHESIS);

        return {
            type: 'MediaFeature',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            value: value
        };
    },
    generate: function(node) {
        this.chunk('(');
        this.chunk(node.name);
        if (node.value !== null) {
            this.chunk(':');
            this.node(node.value);
        }
        this.chunk(')');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/MediaQuery.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/MediaQuery.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENT = TYPE.Ident;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;

module.exports = {
    name: 'MediaQuery',
    structure: {
        children: [[
            'Identifier',
            'MediaFeature',
            'WhiteSpace'
        ]]
    },
    parse: function() {
        this.scanner.skipSC();

        var children = this.createList();
        var child = null;
        var space = null;

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case COMMENT:
                    this.scanner.next();
                    continue;

                case WHITESPACE:
                    space = this.WhiteSpace();
                    continue;

                case IDENT:
                    child = this.Identifier();
                    break;

                case LEFTPARENTHESIS:
                    child = this.MediaFeature();
                    break;

                default:
                    break scan;
            }

            if (space !== null) {
                children.push(space);
                space = null;
            }

            children.push(child);
        }

        if (child === null) {
            this.error('Identifier or parenthesis is expected');
        }

        return {
            type: 'MediaQuery',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/MediaQueryList.js":
/*!*****************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/MediaQueryList.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var COMMA = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE.Comma;

module.exports = {
    name: 'MediaQueryList',
    structure: {
        children: [[
            'MediaQuery'
        ]]
    },
    parse: function(relative) {
        var children = this.createList();

        this.scanner.skipSC();

        while (!this.scanner.eof) {
            children.push(this.MediaQuery(relative));

            if (this.scanner.tokenType !== COMMA) {
                break;
            }

            this.scanner.next();
        }

        return {
            type: 'MediaQueryList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node, function() {
            this.chunk(',');
        });
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Nth.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Nth.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    name: 'Nth',
    structure: {
        nth: ['AnPlusB', 'Identifier'],
        selector: ['SelectorList', null]
    },
    parse: function(allowOfClause) {
        this.scanner.skipSC();

        var start = this.scanner.tokenStart;
        var end = start;
        var selector = null;
        var query;

        if (this.scanner.lookupValue(0, 'odd') || this.scanner.lookupValue(0, 'even')) {
            query = this.Identifier();
        } else {
            query = this.AnPlusB();
        }

        this.scanner.skipSC();

        if (allowOfClause && this.scanner.lookupValue(0, 'of')) {
            this.scanner.next();

            selector = this.SelectorList();

            if (this.needPositions) {
                end = this.getLastListNode(selector.children).loc.end.offset;
            }
        } else {
            if (this.needPositions) {
                end = query.loc.end.offset;
            }
        }

        return {
            type: 'Nth',
            loc: this.getLocation(start, end),
            nth: query,
            selector: selector
        };
    },
    generate: function(node) {
        this.node(node.nth);
        if (node.selector !== null) {
            this.chunk(' of ');
            this.node(node.selector);
        }
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Number.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Number.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NUMBER = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE.Number;

module.exports = {
    name: 'Number',
    structure: {
        value: String
    },
    parse: function() {
        return {
            type: 'Number',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            value: this.consume(NUMBER)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Operator.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Operator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// '/' | '*' | ',' | ':' | '+' | '-'
module.exports = {
    name: 'Operator',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        this.scanner.next();

        return {
            type: 'Operator',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Parentheses.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Parentheses.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

module.exports = {
    name: 'Parentheses',
    structure: {
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var children = null;

        this.eat(LEFTPARENTHESIS);

        children = readSequence.call(this, recognizer);

        if (!this.scanner.eof) {
            this.eat(RIGHTPARENTHESIS);
        }

        return {
            type: 'Parentheses',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.chunk('(');
        this.children(node);
        this.chunk(')');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Percentage.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Percentage.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var consumeNumber = __webpack_require__(/*! ../../tokenizer/utils */ "./node_modules/css-tree/lib/tokenizer/utils.js").consumeNumber;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var PERCENTAGE = TYPE.Percentage;

module.exports = {
    name: 'Percentage',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var numberEnd = consumeNumber(this.scanner.source, start);

        this.eat(PERCENTAGE);

        return {
            type: 'Percentage',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.source.substring(start, numberEnd)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
        this.chunk('%');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js":
/*!**********************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var FUNCTION = TYPE.Function;
var COLON = TYPE.Colon;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// : [ <ident> | <function-token> <any-value>? ) ]
module.exports = {
    name: 'PseudoClassSelector',
    structure: {
        name: String,
        children: [['Raw'], null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = null;
        var name;
        var nameLowerCase;

        this.eat(COLON);

        if (this.scanner.tokenType === FUNCTION) {
            name = this.consumeFunctionName();
            nameLowerCase = name.toLowerCase();

            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
                this.scanner.skipSC();
                children = this.pseudo[nameLowerCase].call(this);
                this.scanner.skipSC();
            } else {
                children = this.createList();
                children.push(
                    this.Raw(this.scanner.tokenIndex, null, false)
                );
            }

            this.eat(RIGHTPARENTHESIS);
        } else {
            name = this.consume(IDENT);
        }

        return {
            type: 'PseudoClassSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(node) {
        this.chunk(':');
        this.chunk(node.name);

        if (node.children !== null) {
            this.chunk('(');
            this.children(node);
            this.chunk(')');
        }
    },
    walkContext: 'function'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var FUNCTION = TYPE.Function;
var COLON = TYPE.Colon;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// :: [ <ident> | <function-token> <any-value>? ) ]
module.exports = {
    name: 'PseudoElementSelector',
    structure: {
        name: String,
        children: [['Raw'], null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = null;
        var name;
        var nameLowerCase;

        this.eat(COLON);
        this.eat(COLON);

        if (this.scanner.tokenType === FUNCTION) {
            name = this.consumeFunctionName();
            nameLowerCase = name.toLowerCase();

            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
                this.scanner.skipSC();
                children = this.pseudo[nameLowerCase].call(this);
                this.scanner.skipSC();
            } else {
                children = this.createList();
                children.push(
                    this.Raw(this.scanner.tokenIndex, null, false)
                );
            }

            this.eat(RIGHTPARENTHESIS);
        } else {
            name = this.consume(IDENT);
        }

        return {
            type: 'PseudoElementSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(node) {
        this.chunk('::');
        this.chunk(node.name);

        if (node.children !== null) {
            this.chunk('(');
            this.children(node);
            this.chunk(')');
        }
    },
    walkContext: 'function'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Ratio.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Ratio.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isDigit = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isDigit;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var NUMBER = TYPE.Number;
var DELIM = TYPE.Delim;
var SOLIDUS = 0x002F;  // U+002F SOLIDUS (/)
var FULLSTOP = 0x002E; // U+002E FULL STOP (.)

// Terms of <ratio> should be a positive numbers (not zero or negative)
// (see https://drafts.csswg.org/mediaqueries-3/#values)
// However, -o-min-device-pixel-ratio takes fractional values as a ratio's term
// and this is using by various sites. Therefore we relax checking on parse
// to test a term is unsigned number without an exponent part.
// Additional checking may be applied on lexer validation.
function consumeNumber() {
    this.scanner.skipWS();

    var value = this.consume(NUMBER);

    for (var i = 0; i < value.length; i++) {
        var code = value.charCodeAt(i);
        if (!isDigit(code) && code !== FULLSTOP) {
            this.error('Unsigned number is expected', this.scanner.tokenStart - value.length + i);
        }
    }

    if (Number(value) === 0) {
        this.error('Zero number is not allowed', this.scanner.tokenStart - value.length);
    }

    return value;
}

// <positive-integer> S* '/' S* <positive-integer>
module.exports = {
    name: 'Ratio',
    structure: {
        left: String,
        right: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var left = consumeNumber.call(this);
        var right;

        this.scanner.skipWS();

        if (!this.scanner.isDelim(SOLIDUS)) {
            this.error('Solidus is expected');
        }
        this.eat(DELIM);
        right = consumeNumber.call(this);

        return {
            type: 'Ratio',
            loc: this.getLocation(start, this.scanner.tokenStart),
            left: left,
            right: right
        };
    },
    generate: function(node) {
        this.chunk(node.left);
        this.chunk('/');
        this.chunk(node.right);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Raw.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Raw.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tokenizer = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js");
var TYPE = tokenizer.TYPE;

var WhiteSpace = TYPE.WhiteSpace;
var Semicolon = TYPE.Semicolon;
var LeftCurlyBracket = TYPE.LeftCurlyBracket;
var Delim = TYPE.Delim;
var EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)

function getOffsetExcludeWS() {
    if (this.scanner.tokenIndex > 0) {
        if (this.scanner.lookupType(-1) === WhiteSpace) {
            return this.scanner.tokenIndex > 1
                ? this.scanner.getTokenStart(this.scanner.tokenIndex - 1)
                : this.scanner.firstCharOffset;
        }
    }

    return this.scanner.tokenStart;
}

// 0, 0, false
function balanceEnd() {
    return 0;
}

// LEFTCURLYBRACKET, 0, false
function leftCurlyBracket(tokenType) {
    return tokenType === LeftCurlyBracket ? 1 : 0;
}

// LEFTCURLYBRACKET, SEMICOLON, false
function leftCurlyBracketOrSemicolon(tokenType) {
    return tokenType === LeftCurlyBracket || tokenType === Semicolon ? 1 : 0;
}

// EXCLAMATIONMARK, SEMICOLON, false
function exclamationMarkOrSemicolon(tokenType, source, offset) {
    if (tokenType === Delim && source.charCodeAt(offset) === EXCLAMATIONMARK) {
        return 1;
    }

    return tokenType === Semicolon ? 1 : 0;
}

// 0, SEMICOLON, true
function semicolonIncluded(tokenType) {
    return tokenType === Semicolon ? 2 : 0;
}

module.exports = {
    name: 'Raw',
    structure: {
        value: String
    },
    parse: function(startToken, mode, excludeWhiteSpace) {
        var startOffset = this.scanner.getTokenStart(startToken);
        var endOffset;

        this.scanner.skip(
            this.scanner.getRawLength(startToken, mode || balanceEnd)
        );

        if (excludeWhiteSpace && this.scanner.tokenStart > startOffset) {
            endOffset = getOffsetExcludeWS.call(this);
        } else {
            endOffset = this.scanner.tokenStart;
        }

        return {
            type: 'Raw',
            loc: this.getLocation(startOffset, endOffset),
            value: this.scanner.source.substring(startOffset, endOffset)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    },

    mode: {
        default: balanceEnd,
        leftCurlyBracket: leftCurlyBracket,
        leftCurlyBracketOrSemicolon: leftCurlyBracketOrSemicolon,
        exclamationMarkOrSemicolon: exclamationMarkOrSemicolon,
        semicolonIncluded: semicolonIncluded
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Rule.js":
/*!*******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Rule.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var rawMode = __webpack_require__(/*! ./Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js").mode;

var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;

function consumeRaw(startToken) {
    return this.Raw(startToken, rawMode.leftCurlyBracket, true);
}

function consumePrelude() {
    var prelude = this.SelectorList();

    if (prelude.type !== 'Raw' &&
        this.scanner.eof === false &&
        this.scanner.tokenType !== LEFTCURLYBRACKET) {
        this.error();
    }

    return prelude;
}

module.exports = {
    name: 'Rule',
    structure: {
        prelude: ['SelectorList', 'Raw'],
        block: ['Block']
    },
    parse: function() {
        var startToken = this.scanner.tokenIndex;
        var startOffset = this.scanner.tokenStart;
        var prelude;
        var block;

        if (this.parseRulePrelude) {
            prelude = this.parseWithFallback(consumePrelude, consumeRaw);
        } else {
            prelude = consumeRaw.call(this, startToken);
        }

        block = this.Block(true);

        return {
            type: 'Rule',
            loc: this.getLocation(startOffset, this.scanner.tokenStart),
            prelude: prelude,
            block: block
        };
    },
    generate: function(node) {
        this.node(node.prelude);
        this.node(node.block);
    },
    walkContext: 'rule'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Selector.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Selector.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    name: 'Selector',
    structure: {
        children: [[
            'TypeSelector',
            'IdSelector',
            'ClassSelector',
            'AttributeSelector',
            'PseudoClassSelector',
            'PseudoElementSelector',
            'Combinator',
            'WhiteSpace'
        ]]
    },
    parse: function() {
        var children = this.readSequence(this.scope.Selector);

        // nothing were consumed
        if (this.getFirstListNode(children) === null) {
            this.error('Selector is expected');
        }

        return {
            type: 'Selector',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/SelectorList.js":
/*!***************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/SelectorList.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var COMMA = TYPE.Comma;

module.exports = {
    name: 'SelectorList',
    structure: {
        children: [[
            'Selector',
            'Raw'
        ]]
    },
    parse: function() {
        var children = this.createList();

        while (!this.scanner.eof) {
            children.push(this.Selector());

            if (this.scanner.tokenType === COMMA) {
                this.scanner.next();
                continue;
            }

            break;
        }

        return {
            type: 'SelectorList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node, function() {
            this.chunk(',');
        });
    },
    walkContext: 'selector'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/String.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/String.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var STRING = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE.String;

module.exports = {
    name: 'String',
    structure: {
        value: String
    },
    parse: function() {
        return {
            type: 'String',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            value: this.consume(STRING)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/StyleSheet.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/StyleSheet.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var ATKEYWORD = TYPE.AtKeyword;
var CDO = TYPE.CDO;
var CDC = TYPE.CDC;
var EXCLAMATIONMARK = 0x0021; // U+0021 EXCLAMATION MARK (!)

function consumeRaw(startToken) {
    return this.Raw(startToken, null, false);
}

module.exports = {
    name: 'StyleSheet',
    structure: {
        children: [[
            'Comment',
            'CDO',
            'CDC',
            'Atrule',
            'Rule',
            'Raw'
        ]]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = this.createList();
        var child;

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case WHITESPACE:
                    this.scanner.next();
                    continue;

                case COMMENT:
                    // ignore comments except exclamation comments (i.e. /*! .. */) on top level
                    if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== EXCLAMATIONMARK) {
                        this.scanner.next();
                        continue;
                    }

                    child = this.Comment();
                    break;

                case CDO: // <!--
                    child = this.CDO();
                    break;

                case CDC: // -->
                    child = this.CDC();
                    break;

                // CSS Syntax Module Level 3
                // §2.2 Error handling
                // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
                case ATKEYWORD:
                    child = this.parseWithFallback(this.Atrule, consumeRaw);
                    break;

                // Anything else starts a qualified rule ...
                default:
                    child = this.parseWithFallback(this.Rule, consumeRaw);
            }

            children.push(child);
        }

        return {
            type: 'StyleSheet',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    },
    walkContext: 'stylesheet'
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/TypeSelector.js":
/*!***************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/TypeSelector.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var ASTERISK = 0x002A;     // U+002A ASTERISK (*)
var VERTICALLINE = 0x007C; // U+007C VERTICAL LINE (|)

function eatIdentifierOrAsterisk() {
    if (this.scanner.tokenType !== IDENT &&
        this.scanner.isDelim(ASTERISK) === false) {
        this.error('Identifier or asterisk is expected');
    }

    this.scanner.next();
}

// ident
// ident|ident
// ident|*
// *
// *|ident
// *|*
// |ident
// |*
module.exports = {
    name: 'TypeSelector',
    structure: {
        name: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        if (this.scanner.isDelim(VERTICALLINE)) {
            this.scanner.next();
            eatIdentifierOrAsterisk.call(this);
        } else {
            eatIdentifierOrAsterisk.call(this);

            if (this.scanner.isDelim(VERTICALLINE)) {
                this.scanner.next();
                eatIdentifierOrAsterisk.call(this);
            }
        }

        return {
            type: 'TypeSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.name);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/UnicodeRange.js":
/*!***************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/UnicodeRange.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isHexDigit = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isHexDigit;
var cmpChar = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpChar;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;
var NAME = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").NAME;

var IDENT = TYPE.Ident;
var NUMBER = TYPE.Number;
var DIMENSION = TYPE.Dimension;
var PLUSSIGN = 0x002B;     // U+002B PLUS SIGN (+)
var HYPHENMINUS = 0x002D;  // U+002D HYPHEN-MINUS (-)
var QUESTIONMARK = 0x003F; // U+003F QUESTION MARK (?)
var U = 0x0075;            // U+0075 LATIN SMALL LETTER U (u)

function eatHexSequence(offset, allowDash) {
    for (var pos = this.scanner.tokenStart + offset, len = 0; pos < this.scanner.tokenEnd; pos++) {
        var code = this.scanner.source.charCodeAt(pos);

        if (code === HYPHENMINUS && allowDash && len !== 0) {
            if (eatHexSequence.call(this, offset + len + 1, false) === 0) {
                this.error();
            }

            return -1;
        }

        if (!isHexDigit(code)) {
            this.error(
                allowDash && len !== 0
                    ? 'HyphenMinus' + (len < 6 ? ' or hex digit' : '') + ' is expected'
                    : (len < 6 ? 'Hex digit is expected' : 'Unexpected input'),
                pos
            );
        }

        if (++len > 6) {
            this.error('Too many hex digits', pos);
        };
    }

    this.scanner.next();
    return len;
}

function eatQuestionMarkSequence(max) {
    var count = 0;

    while (this.scanner.isDelim(QUESTIONMARK)) {
        if (++count > max) {
            this.error('Too many question marks');
        }

        this.scanner.next();
    }
}

function startsWith(code) {
    if (this.scanner.source.charCodeAt(this.scanner.tokenStart) !== code) {
        this.error(NAME[code] + ' is expected');
    }
}

// https://drafts.csswg.org/css-syntax/#urange
// Informally, the <urange> production has three forms:
// U+0001
//      Defines a range consisting of a single code point, in this case the code point "1".
// U+0001-00ff
//      Defines a range of codepoints between the first and the second value, in this case
//      the range between "1" and "ff" (255 in decimal) inclusive.
// U+00??
//      Defines a range of codepoints where the "?" characters range over all hex digits,
//      in this case defining the same as the value U+0000-00ff.
// In each form, a maximum of 6 digits is allowed for each hexadecimal number (if you treat "?" as a hexadecimal digit).
//
// <urange> =
//   u '+' <ident-token> '?'* |
//   u <dimension-token> '?'* |
//   u <number-token> '?'* |
//   u <number-token> <dimension-token> |
//   u <number-token> <number-token> |
//   u '+' '?'+
function scanUnicodeRange() {
    var hexLength = 0;

    // u '+' <ident-token> '?'*
    // u '+' '?'+
    if (this.scanner.isDelim(PLUSSIGN)) {
        this.scanner.next();

        if (this.scanner.tokenType === IDENT) {
            hexLength = eatHexSequence.call(this, 0, true);
            if (hexLength > 0) {
                eatQuestionMarkSequence.call(this, 6 - hexLength);
            }
            return;
        }

        if (this.scanner.isDelim(QUESTIONMARK)) {
            this.scanner.next();
            eatQuestionMarkSequence.call(this, 5);
            return;
        }

        this.error('Hex digit or question mark is expected');
        return;
    }

    // u <number-token> '?'*
    // u <number-token> <dimension-token>
    // u <number-token> <number-token>
    if (this.scanner.tokenType === NUMBER) {
        startsWith.call(this, PLUSSIGN);
        hexLength = eatHexSequence.call(this, 1, true);

        if (this.scanner.isDelim(QUESTIONMARK)) {
            eatQuestionMarkSequence.call(this, 6 - hexLength);
            return;
        }

        if (this.scanner.tokenType === DIMENSION ||
            this.scanner.tokenType === NUMBER) {
            startsWith.call(this, HYPHENMINUS);
            eatHexSequence.call(this, 1, false);
            return;
        }

        return;
    }

    // u <dimension-token> '?'*
    if (this.scanner.tokenType === DIMENSION) {
        startsWith.call(this, PLUSSIGN);
        hexLength = eatHexSequence.call(this, 1, true);

        if (hexLength > 0) {
            eatQuestionMarkSequence.call(this, 6 - hexLength);
        }

        return;
    }

    this.error();
}

module.exports = {
    name: 'UnicodeRange',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        // U or u
        if (!cmpChar(this.scanner.source, start, U)) {
            this.error('U is expected');
        }

        if (!cmpChar(this.scanner.source, start + 1, PLUSSIGN)) {
            this.error('Plus sign is expected');
        }

        this.scanner.next();
        scanUnicodeRange.call(this);

        return {
            type: 'UnicodeRange',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Url.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Url.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isWhiteSpace = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").isWhiteSpace;
var cmpStr = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpStr;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var FUNCTION = TYPE.Function;
var URL = TYPE.Url;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// <url-token> | <function-token> <string> )
module.exports = {
    name: 'Url',
    structure: {
        value: ['String', 'Raw']
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var value;

        switch (this.scanner.tokenType) {
            case URL:
                var rawStart = start + 4;
                var rawEnd = this.scanner.tokenEnd - 1;

                while (rawStart < rawEnd && isWhiteSpace(this.scanner.source.charCodeAt(rawStart))) {
                    rawStart++;
                }

                while (rawStart < rawEnd && isWhiteSpace(this.scanner.source.charCodeAt(rawEnd - 1))) {
                    rawEnd--;
                }

                value = {
                    type: 'Raw',
                    loc: this.getLocation(rawStart, rawEnd),
                    value: this.scanner.source.substring(rawStart, rawEnd)
                };

                this.eat(URL);
                break;

            case FUNCTION:
                if (!cmpStr(this.scanner.source, this.scanner.tokenStart, this.scanner.tokenEnd, 'url(')) {
                    this.error('Function name must be `url`');
                }

                this.eat(FUNCTION);
                this.scanner.skipSC();
                value = this.String();
                this.scanner.skipSC();
                this.eat(RIGHTPARENTHESIS);
                break;

            default:
                this.error('Url or Function is expected');
        }

        return {
            type: 'Url',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: value
        };
    },
    generate: function(node) {
        this.chunk('url');
        this.chunk('(');
        this.node(node.value);
        this.chunk(')');
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/Value.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/Value.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    name: 'Value',
    structure: {
        children: [[]]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = this.readSequence(this.scope.Value);

        return {
            type: 'Value',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/WhiteSpace.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/WhiteSpace.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var WHITESPACE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE.WhiteSpace;
var SPACE = Object.freeze({
    type: 'WhiteSpace',
    loc: null,
    value: ' '
});

module.exports = {
    name: 'WhiteSpace',
    structure: {
        value: String
    },
    parse: function() {
        this.eat(WHITESPACE);
        return SPACE;

        // return {
        //     type: 'WhiteSpace',
        //     loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        //     value: this.consume(WHITESPACE)
        // };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/node/index.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/node/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    AnPlusB: __webpack_require__(/*! ./AnPlusB */ "./node_modules/css-tree/lib/syntax/node/AnPlusB.js"),
    Atrule: __webpack_require__(/*! ./Atrule */ "./node_modules/css-tree/lib/syntax/node/Atrule.js"),
    AtrulePrelude: __webpack_require__(/*! ./AtrulePrelude */ "./node_modules/css-tree/lib/syntax/node/AtrulePrelude.js"),
    AttributeSelector: __webpack_require__(/*! ./AttributeSelector */ "./node_modules/css-tree/lib/syntax/node/AttributeSelector.js"),
    Block: __webpack_require__(/*! ./Block */ "./node_modules/css-tree/lib/syntax/node/Block.js"),
    Brackets: __webpack_require__(/*! ./Brackets */ "./node_modules/css-tree/lib/syntax/node/Brackets.js"),
    CDC: __webpack_require__(/*! ./CDC */ "./node_modules/css-tree/lib/syntax/node/CDC.js"),
    CDO: __webpack_require__(/*! ./CDO */ "./node_modules/css-tree/lib/syntax/node/CDO.js"),
    ClassSelector: __webpack_require__(/*! ./ClassSelector */ "./node_modules/css-tree/lib/syntax/node/ClassSelector.js"),
    Combinator: __webpack_require__(/*! ./Combinator */ "./node_modules/css-tree/lib/syntax/node/Combinator.js"),
    Comment: __webpack_require__(/*! ./Comment */ "./node_modules/css-tree/lib/syntax/node/Comment.js"),
    Declaration: __webpack_require__(/*! ./Declaration */ "./node_modules/css-tree/lib/syntax/node/Declaration.js"),
    DeclarationList: __webpack_require__(/*! ./DeclarationList */ "./node_modules/css-tree/lib/syntax/node/DeclarationList.js"),
    Dimension: __webpack_require__(/*! ./Dimension */ "./node_modules/css-tree/lib/syntax/node/Dimension.js"),
    Function: __webpack_require__(/*! ./Function */ "./node_modules/css-tree/lib/syntax/node/Function.js"),
    Hash: __webpack_require__(/*! ./Hash */ "./node_modules/css-tree/lib/syntax/node/Hash.js"),
    Identifier: __webpack_require__(/*! ./Identifier */ "./node_modules/css-tree/lib/syntax/node/Identifier.js"),
    IdSelector: __webpack_require__(/*! ./IdSelector */ "./node_modules/css-tree/lib/syntax/node/IdSelector.js"),
    MediaFeature: __webpack_require__(/*! ./MediaFeature */ "./node_modules/css-tree/lib/syntax/node/MediaFeature.js"),
    MediaQuery: __webpack_require__(/*! ./MediaQuery */ "./node_modules/css-tree/lib/syntax/node/MediaQuery.js"),
    MediaQueryList: __webpack_require__(/*! ./MediaQueryList */ "./node_modules/css-tree/lib/syntax/node/MediaQueryList.js"),
    Nth: __webpack_require__(/*! ./Nth */ "./node_modules/css-tree/lib/syntax/node/Nth.js"),
    Number: __webpack_require__(/*! ./Number */ "./node_modules/css-tree/lib/syntax/node/Number.js"),
    Operator: __webpack_require__(/*! ./Operator */ "./node_modules/css-tree/lib/syntax/node/Operator.js"),
    Parentheses: __webpack_require__(/*! ./Parentheses */ "./node_modules/css-tree/lib/syntax/node/Parentheses.js"),
    Percentage: __webpack_require__(/*! ./Percentage */ "./node_modules/css-tree/lib/syntax/node/Percentage.js"),
    PseudoClassSelector: __webpack_require__(/*! ./PseudoClassSelector */ "./node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js"),
    PseudoElementSelector: __webpack_require__(/*! ./PseudoElementSelector */ "./node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js"),
    Ratio: __webpack_require__(/*! ./Ratio */ "./node_modules/css-tree/lib/syntax/node/Ratio.js"),
    Raw: __webpack_require__(/*! ./Raw */ "./node_modules/css-tree/lib/syntax/node/Raw.js"),
    Rule: __webpack_require__(/*! ./Rule */ "./node_modules/css-tree/lib/syntax/node/Rule.js"),
    Selector: __webpack_require__(/*! ./Selector */ "./node_modules/css-tree/lib/syntax/node/Selector.js"),
    SelectorList: __webpack_require__(/*! ./SelectorList */ "./node_modules/css-tree/lib/syntax/node/SelectorList.js"),
    String: __webpack_require__(/*! ./String */ "./node_modules/css-tree/lib/syntax/node/String.js"),
    StyleSheet: __webpack_require__(/*! ./StyleSheet */ "./node_modules/css-tree/lib/syntax/node/StyleSheet.js"),
    TypeSelector: __webpack_require__(/*! ./TypeSelector */ "./node_modules/css-tree/lib/syntax/node/TypeSelector.js"),
    UnicodeRange: __webpack_require__(/*! ./UnicodeRange */ "./node_modules/css-tree/lib/syntax/node/UnicodeRange.js"),
    Url: __webpack_require__(/*! ./Url */ "./node_modules/css-tree/lib/syntax/node/Url.js"),
    Value: __webpack_require__(/*! ./Value */ "./node_modules/css-tree/lib/syntax/node/Value.js"),
    WhiteSpace: __webpack_require__(/*! ./WhiteSpace */ "./node_modules/css-tree/lib/syntax/node/WhiteSpace.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/common/nth.js":
/*!***************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/common/nth.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var DISALLOW_OF_CLAUSE = false;

module.exports = {
    parse: function nth() {
        return this.createSingleNodeList(
            this.Nth(DISALLOW_OF_CLAUSE)
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/common/nthWithOfClause.js":
/*!***************************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/common/nthWithOfClause.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ALLOW_OF_CLAUSE = true;

module.exports = {
    parse: function nthWithOfClause() {
        return this.createSingleNodeList(
            this.Nth(ALLOW_OF_CLAUSE)
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/common/selectorList.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/common/selectorList.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: function selectorList() {
        return this.createSingleNodeList(
            this.SelectorList()
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/dir.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/dir.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: function() {
        return this.createSingleNodeList(
            this.Identifier()
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/has.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/has.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: function() {
        return this.createSingleNodeList(
            this.SelectorList()
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'dir': __webpack_require__(/*! ./dir */ "./node_modules/css-tree/lib/syntax/pseudo/dir.js"),
    'has': __webpack_require__(/*! ./has */ "./node_modules/css-tree/lib/syntax/pseudo/has.js"),
    'lang': __webpack_require__(/*! ./lang */ "./node_modules/css-tree/lib/syntax/pseudo/lang.js"),
    'matches': __webpack_require__(/*! ./matches */ "./node_modules/css-tree/lib/syntax/pseudo/matches.js"),
    'not': __webpack_require__(/*! ./not */ "./node_modules/css-tree/lib/syntax/pseudo/not.js"),
    'nth-child': __webpack_require__(/*! ./nth-child */ "./node_modules/css-tree/lib/syntax/pseudo/nth-child.js"),
    'nth-last-child': __webpack_require__(/*! ./nth-last-child */ "./node_modules/css-tree/lib/syntax/pseudo/nth-last-child.js"),
    'nth-last-of-type': __webpack_require__(/*! ./nth-last-of-type */ "./node_modules/css-tree/lib/syntax/pseudo/nth-last-of-type.js"),
    'nth-of-type': __webpack_require__(/*! ./nth-of-type */ "./node_modules/css-tree/lib/syntax/pseudo/nth-of-type.js"),
    'slotted': __webpack_require__(/*! ./slotted */ "./node_modules/css-tree/lib/syntax/pseudo/slotted.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/lang.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/lang.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: function() {
        return this.createSingleNodeList(
            this.Identifier()
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/matches.js":
/*!************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/matches.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./common/selectorList */ "./node_modules/css-tree/lib/syntax/pseudo/common/selectorList.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/not.js":
/*!********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/not.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./common/selectorList */ "./node_modules/css-tree/lib/syntax/pseudo/common/selectorList.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/nth-child.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/nth-child.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./common/nthWithOfClause */ "./node_modules/css-tree/lib/syntax/pseudo/common/nthWithOfClause.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/nth-last-child.js":
/*!*******************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/nth-last-child.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./common/nthWithOfClause */ "./node_modules/css-tree/lib/syntax/pseudo/common/nthWithOfClause.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/nth-last-of-type.js":
/*!*********************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/nth-last-of-type.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./common/nth */ "./node_modules/css-tree/lib/syntax/pseudo/common/nth.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/nth-of-type.js":
/*!****************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/nth-of-type.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./common/nth */ "./node_modules/css-tree/lib/syntax/pseudo/common/nth.js");


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/pseudo/slotted.js":
/*!************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/pseudo/slotted.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    parse: function compoundSelector() {
        return this.createSingleNodeList(
            this.Selector()
        );
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/scope/atrulePrelude.js":
/*!*****************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/scope/atrulePrelude.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    getNode: __webpack_require__(/*! ./default */ "./node_modules/css-tree/lib/syntax/scope/default.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/scope/default.js":
/*!***********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/scope/default.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cmpChar = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpChar;
var cmpStr = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").cmpStr;
var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var IDENT = TYPE.Ident;
var STRING = TYPE.String;
var NUMBER = TYPE.Number;
var FUNCTION = TYPE.Function;
var URL = TYPE.Url;
var HASH = TYPE.Hash;
var DIMENSION = TYPE.Dimension;
var PERCENTAGE = TYPE.Percentage;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var COMMA = TYPE.Comma;
var DELIM = TYPE.Delim;
var NUMBERSIGN = 0x0023;  // U+0023 NUMBER SIGN (#)
var ASTERISK = 0x002A;    // U+002A ASTERISK (*)
var PLUSSIGN = 0x002B;    // U+002B PLUS SIGN (+)
var HYPHENMINUS = 0x002D; // U+002D HYPHEN-MINUS (-)
var SOLIDUS = 0x002F;     // U+002F SOLIDUS (/)
var U = 0x0075;           // U+0075 LATIN SMALL LETTER U (u)

module.exports = function defaultRecognizer(context) {
    switch (this.scanner.tokenType) {
        case HASH:
            return this.Hash();

        case COMMA:
            context.space = null;
            context.ignoreWSAfter = true;
            return this.Operator();

        case LEFTPARENTHESIS:
            return this.Parentheses(this.readSequence, context.recognizer);

        case LEFTSQUAREBRACKET:
            return this.Brackets(this.readSequence, context.recognizer);

        case STRING:
            return this.String();

        case DIMENSION:
            return this.Dimension();

        case PERCENTAGE:
            return this.Percentage();

        case NUMBER:
            return this.Number();

        case FUNCTION:
            return cmpStr(this.scanner.source, this.scanner.tokenStart, this.scanner.tokenEnd, 'url(')
                ? this.Url()
                : this.Function(this.readSequence, context.recognizer);

        case URL:
            return this.Url();

        case IDENT:
            // check for unicode range, it should start with u+ or U+
            if (cmpChar(this.scanner.source, this.scanner.tokenStart, U) &&
                cmpChar(this.scanner.source, this.scanner.tokenStart + 1, PLUSSIGN)) {
                return this.UnicodeRange();
            } else {
                return this.Identifier();
            }

        case DELIM:
            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

            if (code === SOLIDUS ||
                code === ASTERISK ||
                code === PLUSSIGN ||
                code === HYPHENMINUS) {
                return this.Operator(); // TODO: replace with Delim
            }

            // TODO: produce a node with Delim node type

            if (code === NUMBERSIGN) {
                this.error('Hex or identifier is expected', this.scanner.tokenStart + 1);
            }

            break;
    }
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/scope/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/scope/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    AtrulePrelude: __webpack_require__(/*! ./atrulePrelude */ "./node_modules/css-tree/lib/syntax/scope/atrulePrelude.js"),
    Selector: __webpack_require__(/*! ./selector */ "./node_modules/css-tree/lib/syntax/scope/selector.js"),
    Value: __webpack_require__(/*! ./value */ "./node_modules/css-tree/lib/syntax/scope/value.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/scope/selector.js":
/*!************************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/scope/selector.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(/*! ../../tokenizer */ "./node_modules/css-tree/lib/tokenizer/index.js").TYPE;

var DELIM = TYPE.Delim;
var IDENT = TYPE.Ident;
var DIMENSION = TYPE.Dimension;
var PERCENTAGE = TYPE.Percentage;
var NUMBER = TYPE.Number;
var HASH = TYPE.Hash;
var COLON = TYPE.Colon;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var NUMBERSIGN = 0x0023;      // U+0023 NUMBER SIGN (#)
var ASTERISK = 0x002A;        // U+002A ASTERISK (*)
var PLUSSIGN = 0x002B;        // U+002B PLUS SIGN (+)
var SOLIDUS = 0x002F;         // U+002F SOLIDUS (/)
var FULLSTOP = 0x002E;        // U+002E FULL STOP (.)
var GREATERTHANSIGN = 0x003E; // U+003E GREATER-THAN SIGN (>)
var VERTICALLINE = 0x007C;    // U+007C VERTICAL LINE (|)
var TILDE = 0x007E;           // U+007E TILDE (~)

function getNode(context) {
    switch (this.scanner.tokenType) {
        case LEFTSQUAREBRACKET:
            return this.AttributeSelector();

        case HASH:
            return this.IdSelector();

        case COLON:
            if (this.scanner.lookupType(1) === COLON) {
                return this.PseudoElementSelector();
            } else {
                return this.PseudoClassSelector();
            }

        case IDENT:
            return this.TypeSelector();

        case NUMBER:
        case PERCENTAGE:
            return this.Percentage();

        case DIMENSION:
            // throws when .123ident
            if (this.scanner.source.charCodeAt(this.scanner.tokenStart) === FULLSTOP) {
                this.error('Identifier is expected', this.scanner.tokenStart + 1);
            }
            break;

        case DELIM:
            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

            switch (code) {
                case PLUSSIGN:
                case GREATERTHANSIGN:
                case TILDE:
                    context.space = null;
                    context.ignoreWSAfter = true;
                    return this.Combinator();

                case SOLIDUS:  // /deep/
                    return this.Combinator();

                case FULLSTOP:
                    return this.ClassSelector();

                case ASTERISK:
                case VERTICALLINE:
                    return this.TypeSelector();

                case NUMBERSIGN:
                    return this.IdSelector();
            }

            break;
    }
};

module.exports = {
    getNode: getNode
};


/***/ }),

/***/ "./node_modules/css-tree/lib/syntax/scope/value.js":
/*!*********************************************************!*\
  !*** ./node_modules/css-tree/lib/syntax/scope/value.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    getNode: __webpack_require__(/*! ./default */ "./node_modules/css-tree/lib/syntax/scope/default.js"),
    'expression': __webpack_require__(/*! ../function/expression */ "./node_modules/css-tree/lib/syntax/function/expression.js"),
    'var': __webpack_require__(/*! ../function/var */ "./node_modules/css-tree/lib/syntax/function/var.js")
};


/***/ }),

/***/ "./node_modules/css-tree/lib/tokenizer/char-code-definitions.js":
/*!**********************************************************************!*\
  !*** ./node_modules/css-tree/lib/tokenizer/char-code-definitions.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var EOF = 0;

// https://drafts.csswg.org/css-syntax-3/
// § 4.2. Definitions

// digit
// A code point between U+0030 DIGIT ZERO (0) and U+0039 DIGIT NINE (9).
function isDigit(code) {
    return code >= 0x0030 && code <= 0x0039;
}

// hex digit
// A digit, or a code point between U+0041 LATIN CAPITAL LETTER A (A) and U+0046 LATIN CAPITAL LETTER F (F),
// or a code point between U+0061 LATIN SMALL LETTER A (a) and U+0066 LATIN SMALL LETTER F (f).
function isHexDigit(code) {
    return (
        isDigit(code) || // 0 .. 9
        (code >= 0x0041 && code <= 0x0046) || // A .. F
        (code >= 0x0061 && code <= 0x0066)    // a .. f
    );
}

// uppercase letter
// A code point between U+0041 LATIN CAPITAL LETTER A (A) and U+005A LATIN CAPITAL LETTER Z (Z).
function isUppercaseLetter(code) {
    return code >= 0x0041 && code <= 0x005A;
}

// lowercase letter
// A code point between U+0061 LATIN SMALL LETTER A (a) and U+007A LATIN SMALL LETTER Z (z).
function isLowercaseLetter(code) {
    return code >= 0x0061 && code <= 0x007A;
}

// letter
// An uppercase letter or a lowercase letter.
function isLetter(code) {
    return isUppercaseLetter(code) || isLowercaseLetter(code);
}

// non-ASCII code point
// A code point with a value equal to or greater than U+0080 <control>.
function isNonAscii(code) {
    return code >= 0x0080;
}

// name-start code point
// A letter, a non-ASCII code point, or U+005F LOW LINE (_).
function isNameStart(code) {
    return isLetter(code) || isNonAscii(code) || code === 0x005F;
}

// name code point
// A name-start code point, a digit, or U+002D HYPHEN-MINUS (-).
function isName(code) {
    return isNameStart(code) || isDigit(code) || code === 0x002D;
}

// non-printable code point
// A code point between U+0000 NULL and U+0008 BACKSPACE, or U+000B LINE TABULATION,
// or a code point between U+000E SHIFT OUT and U+001F INFORMATION SEPARATOR ONE, or U+007F DELETE.
function isNonPrintable(code) {
    return (
        (code >= 0x0000 && code <= 0x0008) ||
        (code === 0x000B) ||
        (code >= 0x000E && code <= 0x001F) ||
        (code === 0x007F)
    );
}

// newline
// U+000A LINE FEED. Note that U+000D CARRIAGE RETURN and U+000C FORM FEED are not included in this definition,
// as they are converted to U+000A LINE FEED during preprocessing.
// TODO: we doesn't do a preprocessing, so check a code point for U+000D CARRIAGE RETURN and U+000C FORM FEED
function isNewline(code) {
    return code === 0x000A || code === 0x000D || code === 0x000C;
}

// whitespace
// A newline, U+0009 CHARACTER TABULATION, or U+0020 SPACE.
function isWhiteSpace(code) {
    return isNewline(code) || code === 0x0020 || code === 0x0009;
}

// § 4.3.8. Check if two code points are a valid escape
function isValidEscape(first, second) {
    // If the first code point is not U+005C REVERSE SOLIDUS (\), return false.
    if (first !== 0x005C) {
        return false;
    }

    // Otherwise, if the second code point is a newline or EOF, return false.
    if (isNewline(second) || second === EOF) {
        return false;
    }

    // Otherwise, return true.
    return true;
}

// § 4.3.9. Check if three code points would start an identifier
function isIdentifierStart(first, second, third) {
    // Look at the first code point:

    // U+002D HYPHEN-MINUS
    if (first === 0x002D) {
        // If the second code point is a name-start code point or a U+002D HYPHEN-MINUS,
        // or the second and third code points are a valid escape, return true. Otherwise, return false.
        return (
            isNameStart(second) ||
            second === 0x002D ||
            isValidEscape(second, third)
        );
    }

    // name-start code point
    if (isNameStart(first)) {
        // Return true.
        return true;
    }

    // U+005C REVERSE SOLIDUS (\)
    if (first === 0x005C) {
        // If the first and second code points are a valid escape, return true. Otherwise, return false.
        return isValidEscape(first, second);
    }

    // anything else
    // Return false.
    return false;
}

// § 4.3.10. Check if three code points would start a number
function isNumberStart(first, second, third) {
    // Look at the first code point:

    // U+002B PLUS SIGN (+)
    // U+002D HYPHEN-MINUS (-)
    if (first === 0x002B || first === 0x002D) {
        // If the second code point is a digit, return true.
        if (isDigit(second)) {
            return 2;
        }

        // Otherwise, if the second code point is a U+002E FULL STOP (.)
        // and the third code point is a digit, return true.
        // Otherwise, return false.
        return second === 0x002E && isDigit(third) ? 3 : 0;
    }

    // U+002E FULL STOP (.)
    if (first === 0x002E) {
        // If the second code point is a digit, return true. Otherwise, return false.
        return isDigit(second) ? 2 : 0;
    }

    // digit
    if (isDigit(first)) {
        // Return true.
        return 1;
    }

    // anything else
    // Return false.
    return 0;
}

//
// Misc
//

// detect BOM (https://en.wikipedia.org/wiki/Byte_order_mark)
function isBOM(code) {
    // UTF-16BE
    if (code === 0xFEFF) {
        return 1;
    }

    // UTF-16LE
    if (code === 0xFFFE) {
        return 1;
    }

    return 0;
}

// Fast code category
//
// https://drafts.csswg.org/css-syntax/#tokenizer-definitions
// > non-ASCII code point
// >   A code point with a value equal to or greater than U+0080 <control>
// > name-start code point
// >   A letter, a non-ASCII code point, or U+005F LOW LINE (_).
// > name code point
// >   A name-start code point, a digit, or U+002D HYPHEN-MINUS (-)
// That means only ASCII code points has a special meaning and we define a maps for 0..127 codes only
var CATEGORY = new Array(0x80);
charCodeCategory.Eof = 0x80;
charCodeCategory.WhiteSpace = 0x82;
charCodeCategory.Digit = 0x83;
charCodeCategory.NameStart = 0x84;
charCodeCategory.NonPrintable = 0x85;

for (var i = 0; i < CATEGORY.length; i++) {
    switch (true) {
        case isWhiteSpace(i):
            CATEGORY[i] = charCodeCategory.WhiteSpace;
            break;

        case isDigit(i):
            CATEGORY[i] = charCodeCategory.Digit;
            break;

        case isNameStart(i):
            CATEGORY[i] = charCodeCategory.NameStart;
            break;

        case isNonPrintable(i):
            CATEGORY[i] = charCodeCategory.NonPrintable;
            break;

        default:
            CATEGORY[i] = i || charCodeCategory.Eof;
    }
}

function charCodeCategory(code) {
    return code < 0x80 ? CATEGORY[code] : charCodeCategory.NameStart;
};

module.exports = {
    isDigit: isDigit,
    isHexDigit: isHexDigit,
    isUppercaseLetter: isUppercaseLetter,
    isLowercaseLetter: isLowercaseLetter,
    isLetter: isLetter,
    isNonAscii: isNonAscii,
    isNameStart: isNameStart,
    isName: isName,
    isNonPrintable: isNonPrintable,
    isNewline: isNewline,
    isWhiteSpace: isWhiteSpace,
    isValidEscape: isValidEscape,
    isIdentifierStart: isIdentifierStart,
    isNumberStart: isNumberStart,

    isBOM: isBOM,
    charCodeCategory: charCodeCategory
};


/***/ }),

/***/ "./node_modules/css-tree/lib/tokenizer/const.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/tokenizer/const.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// CSS Syntax Module Level 3
// https://www.w3.org/TR/css-syntax-3/
var TYPE = {
    EOF: 0,                 // <EOF-token>
    Ident: 1,               // <ident-token>
    Function: 2,            // <function-token>
    AtKeyword: 3,           // <at-keyword-token>
    Hash: 4,                // <hash-token>
    String: 5,              // <string-token>
    BadString: 6,           // <bad-string-token>
    Url: 7,                 // <url-token>
    BadUrl: 8,              // <bad-url-token>
    Delim: 9,               // <delim-token>
    Number: 10,             // <number-token>
    Percentage: 11,         // <percentage-token>
    Dimension: 12,          // <dimension-token>
    WhiteSpace: 13,         // <whitespace-token>
    CDO: 14,                // <CDO-token>
    CDC: 15,                // <CDC-token>
    Colon: 16,              // <colon-token>     :
    Semicolon: 17,          // <semicolon-token> ;
    Comma: 18,              // <comma-token>     ,
    LeftSquareBracket: 19,  // <[-token>
    RightSquareBracket: 20, // <]-token>
    LeftParenthesis: 21,    // <(-token>
    RightParenthesis: 22,   // <)-token>
    LeftCurlyBracket: 23,   // <{-token>
    RightCurlyBracket: 24,  // <}-token>
    Comment: 25
};

var NAME = Object.keys(TYPE).reduce(function(result, key) {
    result[TYPE[key]] = key;
    return result;
}, {});

module.exports = {
    TYPE: TYPE,
    NAME: NAME
};


/***/ }),

/***/ "./node_modules/css-tree/lib/tokenizer/index.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/tokenizer/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TokenStream = __webpack_require__(/*! ../common/TokenStream */ "./node_modules/css-tree/lib/common/TokenStream.js");
var adoptBuffer = __webpack_require__(/*! ../common/adopt-buffer */ "./node_modules/css-tree/lib/common/adopt-buffer.js");

var constants = __webpack_require__(/*! ./const */ "./node_modules/css-tree/lib/tokenizer/const.js");
var TYPE = constants.TYPE;

var charCodeDefinitions = __webpack_require__(/*! ./char-code-definitions */ "./node_modules/css-tree/lib/tokenizer/char-code-definitions.js");
var isNewline = charCodeDefinitions.isNewline;
var isName = charCodeDefinitions.isName;
var isValidEscape = charCodeDefinitions.isValidEscape;
var isNumberStart = charCodeDefinitions.isNumberStart;
var isIdentifierStart = charCodeDefinitions.isIdentifierStart;
var charCodeCategory = charCodeDefinitions.charCodeCategory;
var isBOM = charCodeDefinitions.isBOM;

var utils = __webpack_require__(/*! ./utils */ "./node_modules/css-tree/lib/tokenizer/utils.js");
var cmpStr = utils.cmpStr;
var getNewlineLength = utils.getNewlineLength;
var findWhiteSpaceEnd = utils.findWhiteSpaceEnd;
var consumeEscaped = utils.consumeEscaped;
var consumeName = utils.consumeName;
var consumeNumber = utils.consumeNumber;
var consumeBadUrlRemnants = utils.consumeBadUrlRemnants;

var OFFSET_MASK = 0x00FFFFFF;
var TYPE_SHIFT = 24;

function tokenize(source, stream) {
    function getCharCode(offset) {
        return offset < sourceLength ? source.charCodeAt(offset) : 0;
    }

    // § 4.3.3. Consume a numeric token
    function consumeNumericToken() {
        // Consume a number and let number be the result.
        offset = consumeNumber(source, offset);

        // If the next 3 input code points would start an identifier, then:
        if (isIdentifierStart(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
            // Create a <dimension-token> with the same value and type flag as number, and a unit set initially to the empty string.
            // Consume a name. Set the <dimension-token>’s unit to the returned value.
            // Return the <dimension-token>.
            type = TYPE.Dimension;
            offset = consumeName(source, offset);
            return;
        }

        // Otherwise, if the next input code point is U+0025 PERCENTAGE SIGN (%), consume it.
        if (getCharCode(offset) === 0x0025) {
            // Create a <percentage-token> with the same value as number, and return it.
            type = TYPE.Percentage;
            offset++;
            return;
        }

        // Otherwise, create a <number-token> with the same value and type flag as number, and return it.
        type = TYPE.Number;
    }

    // § 4.3.4. Consume an ident-like token
    function consumeIdentLikeToken() {
        const nameStartOffset = offset;

        // Consume a name, and let string be the result.
        offset = consumeName(source, offset);

        // If string’s value is an ASCII case-insensitive match for "url",
        // and the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
        if (cmpStr(source, nameStartOffset, offset, 'url') && getCharCode(offset) === 0x0028) {
            // While the next two input code points are whitespace, consume the next input code point.
            offset = findWhiteSpaceEnd(source, offset + 1);

            // If the next one or two input code points are U+0022 QUOTATION MARK ("), U+0027 APOSTROPHE ('),
            // or whitespace followed by U+0022 QUOTATION MARK (") or U+0027 APOSTROPHE ('),
            // then create a <function-token> with its value set to string and return it.
            if (getCharCode(offset) === 0x0022 ||
                getCharCode(offset) === 0x0027) {
                type = TYPE.Function;
                offset = nameStartOffset + 4;
                return;
            }

            // Otherwise, consume a url token, and return it.
            consumeUrlToken();
            return;
        }

        // Otherwise, if the next input code point is U+0028 LEFT PARENTHESIS ((), consume it.
        // Create a <function-token> with its value set to string and return it.
        if (getCharCode(offset) === 0x0028) {
            type = TYPE.Function;
            offset++;
            return;
        }

        // Otherwise, create an <ident-token> with its value set to string and return it.
        type = TYPE.Ident;
    }

    // § 4.3.5. Consume a string token
    function consumeStringToken(endingCodePoint) {
        // This algorithm may be called with an ending code point, which denotes the code point
        // that ends the string. If an ending code point is not specified,
        // the current input code point is used.
        if (!endingCodePoint) {
            endingCodePoint = getCharCode(offset++);
        }

        // Initially create a <string-token> with its value set to the empty string.
        type = TYPE.String;

        // Repeatedly consume the next input code point from the stream:
        for (; offset < source.length; offset++) {
            var code = source.charCodeAt(offset);

            switch (charCodeCategory(code)) {
                // ending code point
                case endingCodePoint:
                    // Return the <string-token>.
                    offset++;
                    return;

                // EOF
                case charCodeCategory.Eof:
                    // This is a parse error. Return the <string-token>.
                    return;

                // newline
                case charCodeCategory.WhiteSpace:
                    if (isNewline(code)) {
                        // This is a parse error. Reconsume the current input code point,
                        // create a <bad-string-token>, and return it.
                        offset += getNewlineLength(source, offset, code);
                        type = TYPE.BadString;
                        return;
                    }
                    break;

                // U+005C REVERSE SOLIDUS (\)
                case 0x005C:
                    // If the next input code point is EOF, do nothing.
                    if (offset === source.length - 1) {
                        break;
                    }

                    var nextCode = getCharCode(offset + 1);

                    // Otherwise, if the next input code point is a newline, consume it.
                    if (isNewline(nextCode)) {
                        offset += getNewlineLength(source, offset + 1, nextCode);
                    } else if (isValidEscape(code, nextCode)) {
                        // Otherwise, (the stream starts with a valid escape) consume
                        // an escaped code point and append the returned code point to
                        // the <string-token>’s value.
                        offset = consumeEscaped(source, offset) - 1;
                    }
                    break;

                // anything else
                // Append the current input code point to the <string-token>’s value.
            }
        }
    }

    // § 4.3.6. Consume a url token
    // Note: This algorithm assumes that the initial "url(" has already been consumed.
    // This algorithm also assumes that it’s being called to consume an "unquoted" value, like url(foo).
    // A quoted value, like url("foo"), is parsed as a <function-token>. Consume an ident-like token
    // automatically handles this distinction; this algorithm shouldn’t be called directly otherwise.
    function consumeUrlToken() {
        // Initially create a <url-token> with its value set to the empty string.
        type = TYPE.Url;

        // Consume as much whitespace as possible.
        offset = findWhiteSpaceEnd(source, offset);

        // Repeatedly consume the next input code point from the stream:
        for (; offset < source.length; offset++) {
            var code = source.charCodeAt(offset);

            switch (charCodeCategory(code)) {
                // U+0029 RIGHT PARENTHESIS ())
                case 0x0029:
                    // Return the <url-token>.
                    offset++;
                    return;

                // EOF
                case charCodeCategory.Eof:
                    // This is a parse error. Return the <url-token>.
                    return;

                // whitespace
                case charCodeCategory.WhiteSpace:
                    // Consume as much whitespace as possible.
                    offset = findWhiteSpaceEnd(source, offset);

                    // If the next input code point is U+0029 RIGHT PARENTHESIS ()) or EOF,
                    // consume it and return the <url-token>
                    // (if EOF was encountered, this is a parse error);
                    if (getCharCode(offset) === 0x0029 || offset >= source.length) {
                        if (offset < source.length) {
                            offset++;
                        }
                        return;
                    }

                    // otherwise, consume the remnants of a bad url, create a <bad-url-token>,
                    // and return it.
                    offset = consumeBadUrlRemnants(source, offset);
                    type = TYPE.BadUrl;
                    return;

                // U+0022 QUOTATION MARK (")
                // U+0027 APOSTROPHE (')
                // U+0028 LEFT PARENTHESIS (()
                // non-printable code point
                case 0x0022:
                case 0x0027:
                case 0x0028:
                case charCodeCategory.NonPrintable:
                    // This is a parse error. Consume the remnants of a bad url,
                    // create a <bad-url-token>, and return it.
                    offset = consumeBadUrlRemnants(source, offset);
                    type = TYPE.BadUrl;
                    return;

                // U+005C REVERSE SOLIDUS (\)
                case 0x005C:
                    // If the stream starts with a valid escape, consume an escaped code point and
                    // append the returned code point to the <url-token>’s value.
                    if (isValidEscape(code, getCharCode(offset + 1))) {
                        offset = consumeEscaped(source, offset) - 1;
                        break;
                    }

                    // Otherwise, this is a parse error. Consume the remnants of a bad url,
                    // create a <bad-url-token>, and return it.
                    offset = consumeBadUrlRemnants(source, offset);
                    type = TYPE.BadUrl;
                    return;

                // anything else
                // Append the current input code point to the <url-token>’s value.
            }
        }
    }

    if (!stream) {
        stream = new TokenStream();
    }

    // ensure source is a string
    source = String(source || '');

    var sourceLength = source.length;
    var offsetAndType = adoptBuffer(stream.offsetAndType, sourceLength + 1); // +1 because of eof-token
    var balance = adoptBuffer(stream.balance, sourceLength + 1);
    var tokenCount = 0;
    var start = isBOM(getCharCode(0));
    var offset = start;
    var balanceCloseType = 0;
    var balanceStart = 0;
    var balancePrev = 0;

    // https://drafts.csswg.org/css-syntax-3/#consume-token
    // § 4.3.1. Consume a token
    while (offset < sourceLength) {
        var code = source.charCodeAt(offset);
        var type = 0;

        balance[tokenCount] = sourceLength;

        switch (charCodeCategory(code)) {
            // whitespace
            case charCodeCategory.WhiteSpace:
                // Consume as much whitespace as possible. Return a <whitespace-token>.
                type = TYPE.WhiteSpace;
                offset = findWhiteSpaceEnd(source, offset + 1);
                break;

            // U+0022 QUOTATION MARK (")
            case 0x0022:
                // Consume a string token and return it.
                consumeStringToken();
                break;

            // U+0023 NUMBER SIGN (#)
            case 0x0023:
                // If the next input code point is a name code point or the next two input code points are a valid escape, then:
                if (isName(getCharCode(offset + 1)) || isValidEscape(getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // Create a <hash-token>.
                    type = TYPE.Hash;

                    // If the next 3 input code points would start an identifier, set the <hash-token>’s type flag to "id".
                    // if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
                    //     // TODO: set id flag
                    // }

                    // Consume a name, and set the <hash-token>’s value to the returned string.
                    offset = consumeName(source, offset + 1);

                    // Return the <hash-token>.
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = TYPE.Delim;
                    offset++;
                }

                break;

            // U+0027 APOSTROPHE (')
            case 0x0027:
                // Consume a string token and return it.
                consumeStringToken();
                break;

            // U+0028 LEFT PARENTHESIS (()
            case 0x0028:
                // Return a <(-token>.
                type = TYPE.LeftParenthesis;
                offset++;
                break;

            // U+0029 RIGHT PARENTHESIS ())
            case 0x0029:
                // Return a <)-token>.
                type = TYPE.RightParenthesis;
                offset++;
                break;

            // U+002B PLUS SIGN (+)
            case 0x002B:
                // If the input stream starts with a number, ...
                if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // ... reconsume the current input code point, consume a numeric token, and return it.
                    consumeNumericToken();
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = TYPE.Delim;
                    offset++;
                }
                break;

            // U+002C COMMA (,)
            case 0x002C:
                // Return a <comma-token>.
                type = TYPE.Comma;
                offset++;
                break;

            // U+002D HYPHEN-MINUS (-)
            case 0x002D:
                // If the input stream starts with a number, reconsume the current input code point, consume a numeric token, and return it.
                if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    consumeNumericToken();
                } else {
                    // Otherwise, if the next 2 input code points are U+002D HYPHEN-MINUS U+003E GREATER-THAN SIGN (->), consume them and return a <CDC-token>.
                    if (getCharCode(offset + 1) === 0x002D &&
                        getCharCode(offset + 2) === 0x003E) {
                        type = TYPE.CDC;
                        offset = offset + 3;
                    } else {
                        // Otherwise, if the input stream starts with an identifier, ...
                        if (isIdentifierStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                            // ... reconsume the current input code point, consume an ident-like token, and return it.
                            consumeIdentLikeToken();
                        } else {
                            // Otherwise, return a <delim-token> with its value set to the current input code point.
                            type = TYPE.Delim;
                            offset++;
                        }
                    }
                }
                break;

            // U+002E FULL STOP (.)
            case 0x002E:
                // If the input stream starts with a number, ...
                if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) {
                    // ... reconsume the current input code point, consume a numeric token, and return it.
                    consumeNumericToken();
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = TYPE.Delim;
                    offset++;
                }

                break;

            // U+002F SOLIDUS (/)
            case 0x002F:
                // If the next two input code point are U+002F SOLIDUS (/) followed by a U+002A ASTERISK (*),
                if (getCharCode(offset + 1) === 0x002A) {
                    // ... consume them and all following code points up to and including the first U+002A ASTERISK (*)
                    // followed by a U+002F SOLIDUS (/), or up to an EOF code point.
                    type = TYPE.Comment;
                    offset = source.indexOf('*/', offset + 2) + 2;
                    if (offset === 1) {
                        offset = source.length;
                    }
                } else {
                    type = TYPE.Delim;
                    offset++;
                }
                break;

            // U+003A COLON (:)
            case 0x003A:
                // Return a <colon-token>.
                type = TYPE.Colon;
                offset++;
                break;

            // U+003B SEMICOLON (;)
            case 0x003B:
                // Return a <semicolon-token>.
                type = TYPE.Semicolon;
                offset++;
                break;

            // U+003C LESS-THAN SIGN (<)
            case 0x003C:
                // If the next 3 input code points are U+0021 EXCLAMATION MARK U+002D HYPHEN-MINUS U+002D HYPHEN-MINUS (!--), ...
                if (getCharCode(offset + 1) === 0x0021 &&
                    getCharCode(offset + 2) === 0x002D &&
                    getCharCode(offset + 3) === 0x002D) {
                    // ... consume them and return a <CDO-token>.
                    type = TYPE.CDO;
                    offset = offset + 4;
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = TYPE.Delim;
                    offset++;
                }

                break;

            // U+0040 COMMERCIAL AT (@)
            case 0x0040:
                // If the next 3 input code points would start an identifier, ...
                if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
                    // ... consume a name, create an <at-keyword-token> with its value set to the returned value, and return it.
                    type = TYPE.AtKeyword;
                    offset = consumeName(source, offset + 1);
                } else {
                    // Otherwise, return a <delim-token> with its value set to the current input code point.
                    type = TYPE.Delim;
                    offset++;
                }

                break;

            // U+005B LEFT SQUARE BRACKET ([)
            case 0x005B:
                // Return a <[-token>.
                type = TYPE.LeftSquareBracket;
                offset++;
                break;

            // U+005C REVERSE SOLIDUS (\)
            case 0x005C:
                // If the input stream starts with a valid escape, ...
                if (isValidEscape(code, getCharCode(offset + 1))) {
                    // ... reconsume the current input code point, consume an ident-like token, and return it.
                    consumeIdentLikeToken();
                } else {
                    // Otherwise, this is a parse error. Return a <delim-token> with its value set to the current input code point.
                    type = TYPE.Delim;
                    offset++;
                }
                break;

            // U+005D RIGHT SQUARE BRACKET (])
            case 0x005D:
                // Return a <]-token>.
                type = TYPE.RightSquareBracket;
                offset++;
                break;

            // U+007B LEFT CURLY BRACKET ({)
            case 0x007B:
                // Return a <{-token>.
                type = TYPE.LeftCurlyBracket;
                offset++;
                break;

            // U+007D RIGHT CURLY BRACKET (})
            case 0x007D:
                // Return a <}-token>.
                type = TYPE.RightCurlyBracket;
                offset++;
                break;

            // digit
            case charCodeCategory.Digit:
                // Reconsume the current input code point, consume a numeric token, and return it.
                consumeNumericToken();
                break;

            // name-start code point
            case charCodeCategory.NameStart:
                // Reconsume the current input code point, consume an ident-like token, and return it.
                consumeIdentLikeToken();
                break;

            // EOF
            case charCodeCategory.Eof:
                // Return an <EOF-token>.
                break;

            // anything else
            default:
                // Return a <delim-token> with its value set to the current input code point.
                type = TYPE.Delim;
                offset++;
        }

        switch (type) {
            case balanceCloseType:
                balancePrev = balanceStart & OFFSET_MASK;
                balanceStart = balance[balancePrev];
                balanceCloseType = balanceStart >> TYPE_SHIFT;
                balance[tokenCount] = balancePrev;
                balance[balancePrev++] = tokenCount;
                for (; balancePrev < tokenCount; balancePrev++) {
                    if (balance[balancePrev] === sourceLength) {
                        balance[balancePrev] = tokenCount;
                    }
                }
                break;

            case TYPE.LeftParenthesis:
            case TYPE.Function:
                balance[tokenCount] = balanceStart;
                balanceCloseType = TYPE.RightParenthesis;
                balanceStart = (balanceCloseType << TYPE_SHIFT) | tokenCount;
                break;

            case TYPE.LeftSquareBracket:
                balance[tokenCount] = balanceStart;
                balanceCloseType = TYPE.RightSquareBracket;
                balanceStart = (balanceCloseType << TYPE_SHIFT) | tokenCount;
                break;

            case TYPE.LeftCurlyBracket:
                balance[tokenCount] = balanceStart;
                balanceCloseType = TYPE.RightCurlyBracket;
                balanceStart = (balanceCloseType << TYPE_SHIFT) | tokenCount;
                break;
        }

        offsetAndType[tokenCount++] = (type << TYPE_SHIFT) | offset;
    }

    // finalize buffers
    offsetAndType[tokenCount] = (TYPE.EOF << TYPE_SHIFT) | offset; // <EOF-token>
    balance[tokenCount] = sourceLength;
    balance[sourceLength] = sourceLength; // prevents false positive balance match with any token
    while (balanceStart !== 0) {
        balancePrev = balanceStart & OFFSET_MASK;
        balanceStart = balance[balancePrev];
        balance[balancePrev] = sourceLength;
    }

    // update stream
    stream.source = source;
    stream.firstCharOffset = start;
    stream.offsetAndType = offsetAndType;
    stream.tokenCount = tokenCount;
    stream.balance = balance;
    stream.reset();
    stream.next();

    return stream;
}

// extend tokenizer with constants
Object.keys(constants).forEach(function(key) {
    tokenize[key] = constants[key];
});

// extend tokenizer with static methods from utils
Object.keys(charCodeDefinitions).forEach(function(key) {
    tokenize[key] = charCodeDefinitions[key];
});
Object.keys(utils).forEach(function(key) {
    tokenize[key] = utils[key];
});

module.exports = tokenize;


/***/ }),

/***/ "./node_modules/css-tree/lib/tokenizer/utils.js":
/*!******************************************************!*\
  !*** ./node_modules/css-tree/lib/tokenizer/utils.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var charCodeDef = __webpack_require__(/*! ./char-code-definitions */ "./node_modules/css-tree/lib/tokenizer/char-code-definitions.js");
var isDigit = charCodeDef.isDigit;
var isHexDigit = charCodeDef.isHexDigit;
var isUppercaseLetter = charCodeDef.isUppercaseLetter;
var isName = charCodeDef.isName;
var isWhiteSpace = charCodeDef.isWhiteSpace;
var isValidEscape = charCodeDef.isValidEscape;

function getCharCode(source, offset) {
    return offset < source.length ? source.charCodeAt(offset) : 0;
}

function getNewlineLength(source, offset, code) {
    if (code === 13 /* \r */ && getCharCode(source, offset + 1) === 10 /* \n */) {
        return 2;
    }

    return 1;
}

function cmpChar(testStr, offset, referenceCode) {
    var code = testStr.charCodeAt(offset);

    // code.toLowerCase() for A..Z
    if (isUppercaseLetter(code)) {
        code = code | 32;
    }

    return code === referenceCode;
}

function cmpStr(testStr, start, end, referenceStr) {
    if (end - start !== referenceStr.length) {
        return false;
    }

    if (start < 0 || end > testStr.length) {
        return false;
    }

    for (var i = start; i < end; i++) {
        var testCode = testStr.charCodeAt(i);
        var referenceCode = referenceStr.charCodeAt(i - start);

        // testCode.toLowerCase() for A..Z
        if (isUppercaseLetter(testCode)) {
            testCode = testCode | 32;
        }

        if (testCode !== referenceCode) {
            return false;
        }
    }

    return true;
}

function findWhiteSpaceStart(source, offset) {
    for (; offset >= 0; offset--) {
        if (!isWhiteSpace(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset + 1;
}

function findWhiteSpaceEnd(source, offset) {
    for (; offset < source.length; offset++) {
        if (!isWhiteSpace(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset;
}

function findDecimalNumberEnd(source, offset) {
    for (; offset < source.length; offset++) {
        if (!isDigit(source.charCodeAt(offset))) {
            break;
        }
    }

    return offset;
}

// § 4.3.7. Consume an escaped code point
function consumeEscaped(source, offset) {
    // It assumes that the U+005C REVERSE SOLIDUS (\) has already been consumed and
    // that the next input code point has already been verified to be part of a valid escape.
    offset += 2;

    // hex digit
    if (isHexDigit(getCharCode(source, offset - 1))) {
        // Consume as many hex digits as possible, but no more than 5.
        // Note that this means 1-6 hex digits have been consumed in total.
        for (var maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) {
            if (!isHexDigit(getCharCode(source, offset))) {
                break;
            }
        }

        // If the next input code point is whitespace, consume it as well.
        var code = getCharCode(source, offset);
        if (isWhiteSpace(code)) {
            offset += getNewlineLength(source, offset, code);
        }
    }

    return offset;
}

// §4.3.11. Consume a name
// Note: This algorithm does not do the verification of the first few code points that are necessary
// to ensure the returned code points would constitute an <ident-token>. If that is the intended use,
// ensure that the stream starts with an identifier before calling this algorithm.
function consumeName(source, offset) {
    // Let result initially be an empty string.
    // Repeatedly consume the next input code point from the stream:
    for (; offset < source.length; offset++) {
        var code = source.charCodeAt(offset);

        // name code point
        if (isName(code)) {
            // Append the code point to result.
            continue;
        }

        // the stream starts with a valid escape
        if (isValidEscape(code, getCharCode(source, offset + 1))) {
            // Consume an escaped code point. Append the returned code point to result.
            offset = consumeEscaped(source, offset) - 1;
            continue;
        }

        // anything else
        // Reconsume the current input code point. Return result.
        break;
    }

    return offset;
}

// §4.3.12. Consume a number
function consumeNumber(source, offset) {
    var code = source.charCodeAt(offset);

    // 2. If the next input code point is U+002B PLUS SIGN (+) or U+002D HYPHEN-MINUS (-),
    // consume it and append it to repr.
    if (code === 0x002B || code === 0x002D) {
        code = source.charCodeAt(offset += 1);
    }

    // 3. While the next input code point is a digit, consume it and append it to repr.
    if (isDigit(code)) {
        offset = findDecimalNumberEnd(source, offset + 1);
        code = source.charCodeAt(offset);
    }

    // 4. If the next 2 input code points are U+002E FULL STOP (.) followed by a digit, then:
    if (code === 0x002E && isDigit(source.charCodeAt(offset + 1))) {
        // 4.1 Consume them.
        // 4.2 Append them to repr.
        code = source.charCodeAt(offset += 2);

        // 4.3 Set type to "number".
        // TODO

        // 4.4 While the next input code point is a digit, consume it and append it to repr.

        offset = findDecimalNumberEnd(source, offset);
    }

    // 5. If the next 2 or 3 input code points are U+0045 LATIN CAPITAL LETTER E (E)
    // or U+0065 LATIN SMALL LETTER E (e), ... , followed by a digit, then:
    if (cmpChar(source, offset, 101 /* e */)) {
        var sign = 0;
        code = source.charCodeAt(offset + 1);

        // ... optionally followed by U+002D HYPHEN-MINUS (-) or U+002B PLUS SIGN (+) ...
        if (code === 0x002D || code === 0x002B) {
            sign = 1;
            code = source.charCodeAt(offset + 2);
        }

        // ... followed by a digit
        if (isDigit(code)) {
            // 5.1 Consume them.
            // 5.2 Append them to repr.

            // 5.3 Set type to "number".
            // TODO

            // 5.4 While the next input code point is a digit, consume it and append it to repr.
            offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
        }
    }

    return offset;
}

// § 4.3.14. Consume the remnants of a bad url
// ... its sole use is to consume enough of the input stream to reach a recovery point
// where normal tokenizing can resume.
function consumeBadUrlRemnants(source, offset) {
    // Repeatedly consume the next input code point from the stream:
    for (; offset < source.length; offset++) {
        var code = source.charCodeAt(offset);

        // U+0029 RIGHT PARENTHESIS ())
        // EOF
        if (code === 0x0029) {
            // Return.
            offset++;
            break;
        }

        if (isValidEscape(code, getCharCode(source, offset + 1))) {
            // Consume an escaped code point.
            // Note: This allows an escaped right parenthesis ("\)") to be encountered
            // without ending the <bad-url-token>. This is otherwise identical to
            // the "anything else" clause.
            offset = consumeEscaped(source, offset);
        }
    }

    return offset;
}

module.exports = {
    consumeEscaped: consumeEscaped,
    consumeName: consumeName,
    consumeNumber: consumeNumber,
    consumeBadUrlRemnants: consumeBadUrlRemnants,

    cmpChar: cmpChar,
    cmpStr: cmpStr,

    getNewlineLength: getNewlineLength,
    findWhiteSpaceStart: findWhiteSpaceStart,
    findWhiteSpaceEnd: findWhiteSpaceEnd
};


/***/ }),

/***/ "./node_modules/css-tree/lib/utils/clone.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/utils/clone.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(/*! ../common/List */ "./node_modules/css-tree/lib/common/List.js");

module.exports = function clone(node) {
    var result = {};

    for (var key in node) {
        var value = node[key];

        if (value) {
            if (Array.isArray(value) || value instanceof List) {
                value = value.map(clone);
            } else if (value.constructor === Object) {
                value = clone(value);
            }
        }

        result[key] = value;
    }

    return result;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/utils/createCustomError.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-tree/lib/utils/createCustomError.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function createCustomError(name, message) {
    // use Object.create(), because some VMs prevent setting line/column otherwise
    // (iOS Safari 10 even throws an exception)
    var error = Object.create(SyntaxError.prototype);
    var errorStack = new Error();

    error.name = name;
    error.message = message;

    Object.defineProperty(error, 'stack', {
        get: function() {
            return (errorStack.stack || '').replace(/^(.+\n){1,3}/, name + ': ' + message + '\n');
        }
    });

    return error;
};


/***/ }),

/***/ "./node_modules/css-tree/lib/utils/names.js":
/*!**************************************************!*\
  !*** ./node_modules/css-tree/lib/utils/names.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty;
var keywords = Object.create(null);
var properties = Object.create(null);
var HYPHENMINUS = 45; // '-'.charCodeAt()

function isCustomProperty(str, offset) {
    offset = offset || 0;

    return str.length - offset >= 2 &&
           str.charCodeAt(offset) === HYPHENMINUS &&
           str.charCodeAt(offset + 1) === HYPHENMINUS;
}

function getVendorPrefix(str, offset) {
    offset = offset || 0;

    // verdor prefix should be at least 3 chars length
    if (str.length - offset >= 3) {
        // vendor prefix starts with hyper minus following non-hyper minus
        if (str.charCodeAt(offset) === HYPHENMINUS &&
            str.charCodeAt(offset + 1) !== HYPHENMINUS) {
            // vendor prefix should contain a hyper minus at the ending
            var secondDashIndex = str.indexOf('-', offset + 2);

            if (secondDashIndex !== -1) {
                return str.substring(offset, secondDashIndex + 1);
            }
        }
    }

    return '';
}

function getKeywordDescriptor(keyword) {
    if (hasOwnProperty.call(keywords, keyword)) {
        return keywords[keyword];
    }

    var name = keyword.toLowerCase();

    if (hasOwnProperty.call(keywords, name)) {
        return keywords[keyword] = keywords[name];
    }

    var custom = isCustomProperty(name, 0);
    var vendor = !custom ? getVendorPrefix(name, 0) : '';

    return keywords[keyword] = Object.freeze({
        basename: name.substr(vendor.length),
        name: name,
        vendor: vendor,
        prefix: vendor,
        custom: custom
    });
}

function getPropertyDescriptor(property) {
    if (hasOwnProperty.call(properties, property)) {
        return properties[property];
    }

    var name = property;
    var hack = property[0];

    if (hack === '/') {
        hack = property[1] === '/' ? '//' : '/';
    } else if (hack !== '_' &&
               hack !== '*' &&
               hack !== '$' &&
               hack !== '#' &&
               hack !== '+' &&
               hack !== '&') {
        hack = '';
    }

    var custom = isCustomProperty(name, hack.length);

    // re-use result when possible (the same as for lower case)
    if (!custom) {
        name = name.toLowerCase();
        if (hasOwnProperty.call(properties, name)) {
            return properties[property] = properties[name];
        }
    }

    var vendor = !custom ? getVendorPrefix(name, hack.length) : '';
    var prefix = name.substr(0, hack.length + vendor.length);

    return properties[property] = Object.freeze({
        basename: name.substr(prefix.length),
        name: name.substr(hack.length),
        hack: hack,
        vendor: vendor,
        prefix: prefix,
        custom: custom
    });
}

module.exports = {
    keyword: getKeywordDescriptor,
    property: getPropertyDescriptor,
    isCustomProperty: isCustomProperty,
    vendorPrefix: getVendorPrefix
};


/***/ }),

/***/ "./node_modules/css-tree/lib/walker/create.js":
/*!****************************************************!*\
  !*** ./node_modules/css-tree/lib/walker/create.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty;
var noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

function invokeForType(fn, type) {
    return function(node, item, list) {
        if (node.type === type) {
            fn.call(this, node, item, list);
        }
    };
}

function getWalkersFromStructure(name, nodeType) {
    var structure = nodeType.structure;
    var walkers = [];

    for (var key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        var fieldTypes = structure[key];
        var walker = {
            name: key,
            type: false,
            nullable: false
        };

        if (!Array.isArray(structure[key])) {
            fieldTypes = [structure[key]];
        }

        for (var i = 0; i < fieldTypes.length; i++) {
            var fieldType = fieldTypes[i];
            if (fieldType === null) {
                walker.nullable = true;
            } else if (typeof fieldType === 'string') {
                walker.type = 'node';
            } else if (Array.isArray(fieldType)) {
                walker.type = 'list';
            }
        }

        if (walker.type) {
            walkers.push(walker);
        }
    }

    if (walkers.length) {
        return {
            context: nodeType.walkContext,
            fields: walkers
        };
    }

    return null;
}

function getTypesFromConfig(config) {
    var types = {};

    for (var name in config.node) {
        if (hasOwnProperty.call(config.node, name)) {
            var nodeType = config.node[name];

            if (!nodeType.structure) {
                throw new Error('Missed `structure` field in `' + name + '` node type definition');
            }

            types[name] = getWalkersFromStructure(name, nodeType);
        }
    }

    return types;
}

function createTypeIterator(config, reverse) {
    var fields = config.fields.slice();
    var contextName = config.context;
    var useContext = typeof contextName === 'string';

    if (reverse) {
        fields.reverse();
    }

    return function(node, context, walk, walkReducer) {
        var prevContextValue;

        if (useContext) {
            prevContextValue = context[contextName];
            context[contextName] = node;
        }

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var ref = node[field.name];

            if (!field.nullable || ref) {
                if (field.type === 'list') {
                    var breakWalk = reverse
                        ? ref.reduceRight(walkReducer, false)
                        : ref.reduce(walkReducer, false);

                    if (breakWalk) {
                        return true;
                    }
                } else if (walk(ref)) {
                    return true;
                }
            }
        }

        if (useContext) {
            context[contextName] = prevContextValue;
        }
    };
}

function createFastTraveralMap(iterators) {
    return {
        Atrule: {
            StyleSheet: iterators.StyleSheet,
            Atrule: iterators.Atrule,
            Rule: iterators.Rule,
            Block: iterators.Block
        },
        Rule: {
            StyleSheet: iterators.StyleSheet,
            Atrule: iterators.Atrule,
            Rule: iterators.Rule,
            Block: iterators.Block
        },
        Declaration: {
            StyleSheet: iterators.StyleSheet,
            Atrule: iterators.Atrule,
            Rule: iterators.Rule,
            Block: iterators.Block,
            DeclarationList: iterators.DeclarationList
        }
    };
}

module.exports = function createWalker(config) {
    var types = getTypesFromConfig(config);
    var iteratorsNatural = {};
    var iteratorsReverse = {};
    var breakWalk = Symbol('break-walk');
    var skipNode = Symbol('skip-node');

    for (var name in types) {
        if (hasOwnProperty.call(types, name) && types[name] !== null) {
            iteratorsNatural[name] = createTypeIterator(types[name], false);
            iteratorsReverse[name] = createTypeIterator(types[name], true);
        }
    }

    var fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
    var fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);

    var walk = function(root, options) {
        function walkNode(node, item, list) {
            var enterRet = enter.call(context, node, item, list);

            if (enterRet === breakWalk) {
                debugger;
                return true;
            }

            if (enterRet === skipNode) {
                return false;
            }

            if (iterators.hasOwnProperty(node.type)) {
                if (iterators[node.type](node, context, walkNode, walkReducer)) {
                    return true;
                }
            }

            if (leave.call(context, node, item, list) === breakWalk) {
                return true;
            }

            return false;
        }

        var walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
        var enter = noop;
        var leave = noop;
        var iterators = iteratorsNatural;
        var context = {
            break: breakWalk,
            skip: skipNode,

            root: root,
            stylesheet: null,
            atrule: null,
            atrulePrelude: null,
            rule: null,
            selector: null,
            block: null,
            declaration: null,
            function: null
        };

        if (typeof options === 'function') {
            enter = options;
        } else if (options) {
            enter = ensureFunction(options.enter);
            leave = ensureFunction(options.leave);

            if (options.reverse) {
                iterators = iteratorsReverse;
            }

            if (options.visit) {
                if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
                    iterators = options.reverse
                        ? fastTraversalIteratorsReverse[options.visit]
                        : fastTraversalIteratorsNatural[options.visit];
                } else if (!types.hasOwnProperty(options.visit)) {
                    throw new Error('Bad value `' + options.visit + '` for `visit` option (should be: ' + Object.keys(types).join(', ') + ')');
                }

                enter = invokeForType(enter, options.visit);
                leave = invokeForType(leave, options.visit);
            }
        }

        if (enter === noop && leave === noop) {
            throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
        }

        walkNode(root);
    };

    walk.break = breakWalk;
    walk.skip = skipNode;

    walk.find = function(ast, fn) {
        var found = null;

        walk(ast, function(node, item, list) {
            if (fn.call(this, node, item, list)) {
                found = node;
                return breakWalk;
            }
        });

        return found;
    };

    walk.findLast = function(ast, fn) {
        var found = null;

        walk(ast, {
            reverse: true,
            enter: function(node, item, list) {
                if (fn.call(this, node, item, list)) {
                    found = node;
                    return breakWalk;
                }
            }
        });

        return found;
    };

    walk.findAll = function(ast, fn) {
        var found = [];

        walk(ast, function(node, item, list) {
            if (fn.call(this, node, item, list)) {
                found.push(node);
            }
        });

        return found;
    };

    return walk;
};


/***/ }),

/***/ "./node_modules/css-tree/node_modules/source-map/lib/array-set.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-tree/node_modules/source-map/lib/array-set.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./node_modules/css-tree/node_modules/source-map/lib/util.js");
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),

/***/ "./node_modules/css-tree/node_modules/source-map/lib/base64-vlq.js":
/*!*************************************************************************!*\
  !*** ./node_modules/css-tree/node_modules/source-map/lib/base64-vlq.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(/*! ./base64 */ "./node_modules/css-tree/node_modules/source-map/lib/base64.js");

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),

/***/ "./node_modules/css-tree/node_modules/source-map/lib/base64.js":
/*!*********************************************************************!*\
  !*** ./node_modules/css-tree/node_modules/source-map/lib/base64.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),

/***/ "./node_modules/css-tree/node_modules/source-map/lib/mapping-list.js":
/*!***************************************************************************!*\
  !*** ./node_modules/css-tree/node_modules/source-map/lib/mapping-list.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(/*! ./util */ "./node_modules/css-tree/node_modules/source-map/lib/util.js");

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),

/***/ "./node_modules/css-tree/node_modules/source-map/lib/source-map-generator.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/css-tree/node_modules/source-map/lib/source-map-generator.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(/*! ./base64-vlq */ "./node_modules/css-tree/node_modules/source-map/lib/base64-vlq.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/css-tree/node_modules/source-map/lib/util.js");
var ArraySet = __webpack_require__(/*! ./array-set */ "./node_modules/css-tree/node_modules/source-map/lib/array-set.js").ArraySet;
var MappingList = __webpack_require__(/*! ./mapping-list */ "./node_modules/css-tree/node_modules/source-map/lib/mapping-list.js").MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),

/***/ "./node_modules/css-tree/node_modules/source-map/lib/util.js":
/*!*******************************************************************!*\
  !*** ./node_modules/css-tree/node_modules/source-map/lib/util.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),

/***/ "./node_modules/css-tree/package.json":
/*!********************************************!*\
  !*** ./node_modules/css-tree/package.json ***!
  \********************************************/
/*! exports provided: name, version, description, author, license, repository, keywords, main, unpkg, jsdelivr, scripts, dependencies, devDependencies, engines, files, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"css-tree\",\"version\":\"1.1.3\",\"description\":\"A tool set for CSS: fast detailed parser (CSS → AST), walker (AST traversal), generator (AST → CSS) and lexer (validation and matching) based on specs and browser implementations\",\"author\":\"Roman Dvornov <rdvornov@gmail.com> (https://github.com/lahmatiy)\",\"license\":\"MIT\",\"repository\":\"csstree/csstree\",\"keywords\":[\"css\",\"ast\",\"tokenizer\",\"parser\",\"walker\",\"lexer\",\"generator\",\"utils\",\"syntax\",\"validation\"],\"main\":\"lib/index.js\",\"unpkg\":\"dist/csstree.min.js\",\"jsdelivr\":\"dist/csstree.min.js\",\"scripts\":{\"build\":\"rollup --config\",\"lint\":\"eslint data lib scripts test && node scripts/review-syntax-patch --lint && node scripts/update-docs --lint\",\"lint-and-test\":\"npm run lint && npm test\",\"update:docs\":\"node scripts/update-docs\",\"review:syntax-patch\":\"node scripts/review-syntax-patch\",\"test\":\"mocha --reporter progress\",\"coverage\":\"nyc npm test\",\"travis\":\"nyc npm run lint-and-test && npm run coveralls\",\"coveralls\":\"nyc report --reporter=text-lcov | coveralls\",\"prepublishOnly\":\"npm run build\",\"hydrogen\":\"node --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces --redirect-code-traces-to=code.asm --trace_hydrogen_file=code.cfg --print-opt-code bin/parse --stat -o /dev/null\"},\"dependencies\":{\"mdn-data\":\"2.0.14\",\"source-map\":\"^0.6.1\"},\"devDependencies\":{\"@rollup/plugin-commonjs\":\"^11.0.2\",\"@rollup/plugin-json\":\"^4.0.2\",\"@rollup/plugin-node-resolve\":\"^7.1.1\",\"coveralls\":\"^3.0.9\",\"eslint\":\"^6.8.0\",\"json-to-ast\":\"^2.1.0\",\"mocha\":\"^6.2.3\",\"nyc\":\"^14.1.1\",\"rollup\":\"^1.32.1\",\"rollup-plugin-terser\":\"^5.3.0\"},\"engines\":{\"node\":\">=8.0.0\"},\"files\":[\"data\",\"dist\",\"lib\"]}");

/***/ }),

/***/ "./node_modules/form-data/lib/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/form-data/lib/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-env browser */
module.exports = typeof self == 'object' ? self.FormData : window.FormData;


/***/ }),

/***/ "./node_modules/mdn-data/css/at-rules.json":
/*!*************************************************!*\
  !*** ./node_modules/mdn-data/css/at-rules.json ***!
  \*************************************************/
/*! exports provided: @charset, @counter-style, @document, @font-face, @font-feature-values, @import, @keyframes, @media, @namespace, @page, @property, @supports, @viewport, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"@charset\":{\"syntax\":\"@charset \\\"<charset>\\\";\",\"groups\":[\"CSS Charsets\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@charset\"},\"@counter-style\":{\"syntax\":\"@counter-style <counter-style-name> {\\n  [ system: <counter-system>; ] ||\\n  [ symbols: <counter-symbols>; ] ||\\n  [ additive-symbols: <additive-symbols>; ] ||\\n  [ negative: <negative-symbol>; ] ||\\n  [ prefix: <prefix>; ] ||\\n  [ suffix: <suffix>; ] ||\\n  [ range: <range>; ] ||\\n  [ pad: <padding>; ] ||\\n  [ speak-as: <speak-as>; ] ||\\n  [ fallback: <counter-style-name>; ]\\n}\",\"interfaces\":[\"CSSCounterStyleRule\"],\"groups\":[\"CSS Counter Styles\"],\"descriptors\":{\"additive-symbols\":{\"syntax\":\"[ <integer> && <symbol> ]#\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"fallback\":{\"syntax\":\"<counter-style-name>\",\"media\":\"all\",\"initial\":\"decimal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"negative\":{\"syntax\":\"<symbol> <symbol>?\",\"media\":\"all\",\"initial\":\"\\\"-\\\" hyphen-minus\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"pad\":{\"syntax\":\"<integer> && <symbol>\",\"media\":\"all\",\"initial\":\"0 \\\"\\\"\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"prefix\":{\"syntax\":\"<symbol>\",\"media\":\"all\",\"initial\":\"\\\"\\\"\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"range\":{\"syntax\":\"[ [ <integer> | infinite ]{2} ]# | auto\",\"media\":\"all\",\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"speak-as\":{\"syntax\":\"auto | bullets | numbers | words | spell-out | <counter-style-name>\",\"media\":\"all\",\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"suffix\":{\"syntax\":\"<symbol>\",\"media\":\"all\",\"initial\":\"\\\". \\\"\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"symbols\":{\"syntax\":\"<symbol>+\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"system\":{\"syntax\":\"cyclic | numeric | alphabetic | symbolic | additive | [ fixed <integer>? ] | [ extends <counter-style-name> ]\",\"media\":\"all\",\"initial\":\"symbolic\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@counter-style\"},\"@document\":{\"syntax\":\"@document [ <url> | url-prefix(<string>) | domain(<string>) | media-document(<string>) | regexp(<string>) ]# {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSGroupingRule\",\"CSSConditionRule\"],\"groups\":[\"CSS Conditional Rules\"],\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@document\"},\"@font-face\":{\"syntax\":\"@font-face {\\n  [ font-family: <family-name>; ] ||\\n  [ src: <src>; ] ||\\n  [ unicode-range: <unicode-range>; ] ||\\n  [ font-variant: <font-variant>; ] ||\\n  [ font-feature-settings: <font-feature-settings>; ] ||\\n  [ font-variation-settings: <font-variation-settings>; ] ||\\n  [ font-stretch: <font-stretch>; ] ||\\n  [ font-weight: <font-weight>; ] ||\\n  [ font-style: <font-style>; ]\\n}\",\"interfaces\":[\"CSSFontFaceRule\"],\"groups\":[\"CSS Fonts\"],\"descriptors\":{\"font-display\":{\"syntax\":\"[ auto | block | swap | fallback | optional ]\",\"media\":\"visual\",\"percentages\":\"no\",\"initial\":\"auto\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"font-family\":{\"syntax\":\"<family-name>\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-feature-settings\":{\"syntax\":\"normal | <feature-tag-value>#\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"font-variation-settings\":{\"syntax\":\"normal | [ <string> <number> ]#\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"font-stretch\":{\"syntax\":\"<font-stretch-absolute>{1,2}\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-style\":{\"syntax\":\"normal | italic | oblique <angle>{0,2}\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-weight\":{\"syntax\":\"<font-weight-absolute>{1,2}\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font-variant\":{\"syntax\":\"normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic(<feature-value-name>) || historical-forms || styleset(<feature-value-name>#) || character-variant(<feature-value-name>#) || swash(<feature-value-name>) || ornaments(<feature-value-name>) || annotation(<feature-value-name>) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]\",\"media\":\"all\",\"initial\":\"normal\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"src\":{\"syntax\":\"[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"unicode-range\":{\"syntax\":\"<unicode-range>#\",\"media\":\"all\",\"initial\":\"U+0-10FFFF\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@font-face\"},\"@font-feature-values\":{\"syntax\":\"@font-feature-values <family-name># {\\n  <feature-value-block-list>\\n}\",\"interfaces\":[\"CSSFontFeatureValuesRule\"],\"groups\":[\"CSS Fonts\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@font-feature-values\"},\"@import\":{\"syntax\":\"@import [ <string> | <url> ] [ <media-query-list> ]?;\",\"groups\":[\"Media Queries\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@import\"},\"@keyframes\":{\"syntax\":\"@keyframes <keyframes-name> {\\n  <keyframe-block-list>\\n}\",\"interfaces\":[\"CSSKeyframeRule\",\"CSSKeyframesRule\"],\"groups\":[\"CSS Animations\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@keyframes\"},\"@media\":{\"syntax\":\"@media <media-query-list> {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSGroupingRule\",\"CSSConditionRule\",\"CSSMediaRule\",\"CSSCustomMediaRule\"],\"groups\":[\"CSS Conditional Rules\",\"Media Queries\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@media\"},\"@namespace\":{\"syntax\":\"@namespace <namespace-prefix>? [ <string> | <url> ];\",\"groups\":[\"CSS Namespaces\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@namespace\"},\"@page\":{\"syntax\":\"@page <page-selector-list> {\\n  <page-body>\\n}\",\"interfaces\":[\"CSSPageRule\"],\"groups\":[\"CSS Pages\"],\"descriptors\":{\"bleed\":{\"syntax\":\"auto | <length>\",\"media\":[\"visual\",\"paged\"],\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"marks\":{\"syntax\":\"none | [ crop || cross ]\",\"media\":[\"visual\",\"paged\"],\"initial\":\"none\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"size\":{\"syntax\":\"<length>{1,2} | auto | [ <page-size> || [ portrait | landscape ] ]\",\"media\":[\"visual\",\"paged\"],\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@page\"},\"@property\":{\"syntax\":\"@property <custom-property-name> {\\n  <declaration-list>\\n}\",\"interfaces\":[\"CSS\",\"CSSPropertyRule\"],\"groups\":[\"CSS Houdini\"],\"descriptors\":{\"syntax\":{\"syntax\":\"<string>\",\"media\":\"all\",\"percentages\":\"no\",\"initial\":\"n/a (required)\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"inherits\":{\"syntax\":\"true | false\",\"media\":\"all\",\"percentages\":\"no\",\"initial\":\"auto\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"initial-value\":{\"syntax\":\"<string>\",\"media\":\"all\",\"initial\":\"n/a (required)\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"}},\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@property\"},\"@supports\":{\"syntax\":\"@supports <supports-condition> {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSGroupingRule\",\"CSSConditionRule\",\"CSSSupportsRule\"],\"groups\":[\"CSS Conditional Rules\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@supports\"},\"@viewport\":{\"syntax\":\"@viewport {\\n  <group-rule-body>\\n}\",\"interfaces\":[\"CSSViewportRule\"],\"groups\":[\"CSS Device Adaptation\"],\"descriptors\":{\"height\":{\"syntax\":\"<viewport-length>{1,2}\",\"media\":[\"visual\",\"continuous\"],\"initial\":[\"min-height\",\"max-height\"],\"percentages\":[\"min-height\",\"max-height\"],\"computed\":[\"min-height\",\"max-height\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"max-height\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToHeightOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"max-width\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToWidthOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"max-zoom\":{\"syntax\":\"auto | <number> | <percentage>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"the zoom factor itself\",\"computed\":\"autoNonNegativeOrPercentage\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-height\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToHeightOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-width\":{\"syntax\":\"<viewport-length>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToWidthOfInitialViewport\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-zoom\":{\"syntax\":\"auto | <number> | <percentage>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"the zoom factor itself\",\"computed\":\"autoNonNegativeOrPercentage\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"orientation\":{\"syntax\":\"auto | portrait | landscape\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"referToSizeOfBoundingBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"user-zoom\":{\"syntax\":\"zoom | fixed\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"zoom\",\"percentages\":\"referToSizeOfBoundingBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"viewport-fit\":{\"syntax\":\"auto | contain | cover\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"no\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"width\":{\"syntax\":\"<viewport-length>{1,2}\",\"media\":[\"visual\",\"continuous\"],\"initial\":[\"min-width\",\"max-width\"],\"percentages\":[\"min-width\",\"max-width\"],\"computed\":[\"min-width\",\"max-width\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"zoom\":{\"syntax\":\"auto | <number> | <percentage>\",\"media\":[\"visual\",\"continuous\"],\"initial\":\"auto\",\"percentages\":\"the zoom factor itself\",\"computed\":\"autoNonNegativeOrPercentage\",\"order\":\"uniqueOrder\",\"status\":\"standard\"}},\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/@viewport\"}}");

/***/ }),

/***/ "./node_modules/mdn-data/css/properties.json":
/*!***************************************************!*\
  !*** ./node_modules/mdn-data/css/properties.json ***!
  \***************************************************/
/*! exports provided: --*, -ms-accelerator, -ms-block-progression, -ms-content-zoom-chaining, -ms-content-zooming, -ms-content-zoom-limit, -ms-content-zoom-limit-max, -ms-content-zoom-limit-min, -ms-content-zoom-snap, -ms-content-zoom-snap-points, -ms-content-zoom-snap-type, -ms-filter, -ms-flow-from, -ms-flow-into, -ms-grid-columns, -ms-grid-rows, -ms-high-contrast-adjust, -ms-hyphenate-limit-chars, -ms-hyphenate-limit-lines, -ms-hyphenate-limit-zone, -ms-ime-align, -ms-overflow-style, -ms-scrollbar-3dlight-color, -ms-scrollbar-arrow-color, -ms-scrollbar-base-color, -ms-scrollbar-darkshadow-color, -ms-scrollbar-face-color, -ms-scrollbar-highlight-color, -ms-scrollbar-shadow-color, -ms-scrollbar-track-color, -ms-scroll-chaining, -ms-scroll-limit, -ms-scroll-limit-x-max, -ms-scroll-limit-x-min, -ms-scroll-limit-y-max, -ms-scroll-limit-y-min, -ms-scroll-rails, -ms-scroll-snap-points-x, -ms-scroll-snap-points-y, -ms-scroll-snap-type, -ms-scroll-snap-x, -ms-scroll-snap-y, -ms-scroll-translation, -ms-text-autospace, -ms-touch-select, -ms-user-select, -ms-wrap-flow, -ms-wrap-margin, -ms-wrap-through, -moz-appearance, -moz-binding, -moz-border-bottom-colors, -moz-border-left-colors, -moz-border-right-colors, -moz-border-top-colors, -moz-context-properties, -moz-float-edge, -moz-force-broken-image-icon, -moz-image-region, -moz-orient, -moz-outline-radius, -moz-outline-radius-bottomleft, -moz-outline-radius-bottomright, -moz-outline-radius-topleft, -moz-outline-radius-topright, -moz-stack-sizing, -moz-text-blink, -moz-user-focus, -moz-user-input, -moz-user-modify, -moz-window-dragging, -moz-window-shadow, -webkit-appearance, -webkit-border-before, -webkit-border-before-color, -webkit-border-before-style, -webkit-border-before-width, -webkit-box-reflect, -webkit-line-clamp, -webkit-mask, -webkit-mask-attachment, -webkit-mask-clip, -webkit-mask-composite, -webkit-mask-image, -webkit-mask-origin, -webkit-mask-position, -webkit-mask-position-x, -webkit-mask-position-y, -webkit-mask-repeat, -webkit-mask-repeat-x, -webkit-mask-repeat-y, -webkit-mask-size, -webkit-overflow-scrolling, -webkit-tap-highlight-color, -webkit-text-fill-color, -webkit-text-stroke, -webkit-text-stroke-color, -webkit-text-stroke-width, -webkit-touch-callout, -webkit-user-modify, align-content, align-items, align-self, align-tracks, all, animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, aspect-ratio, azimuth, backdrop-filter, backface-visibility, background, background-attachment, background-blend-mode, background-clip, background-color, background-image, background-origin, background-position, background-position-x, background-position-y, background-repeat, background-size, block-overflow, block-size, border, border-block, border-block-color, border-block-style, border-block-width, border-block-end, border-block-end-color, border-block-end-style, border-block-end-width, border-block-start, border-block-start-color, border-block-start-style, border-block-start-width, border-bottom, border-bottom-color, border-bottom-left-radius, border-bottom-right-radius, border-bottom-style, border-bottom-width, border-collapse, border-color, border-end-end-radius, border-end-start-radius, border-image, border-image-outset, border-image-repeat, border-image-slice, border-image-source, border-image-width, border-inline, border-inline-end, border-inline-color, border-inline-style, border-inline-width, border-inline-end-color, border-inline-end-style, border-inline-end-width, border-inline-start, border-inline-start-color, border-inline-start-style, border-inline-start-width, border-left, border-left-color, border-left-style, border-left-width, border-radius, border-right, border-right-color, border-right-style, border-right-width, border-spacing, border-start-end-radius, border-start-start-radius, border-style, border-top, border-top-color, border-top-left-radius, border-top-right-radius, border-top-style, border-top-width, border-width, bottom, box-align, box-decoration-break, box-direction, box-flex, box-flex-group, box-lines, box-ordinal-group, box-orient, box-pack, box-shadow, box-sizing, break-after, break-before, break-inside, caption-side, caret-color, clear, clip, clip-path, color, color-adjust, column-count, column-fill, column-gap, column-rule, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, columns, contain, content, counter-increment, counter-reset, counter-set, cursor, direction, display, empty-cells, filter, flex, flex-basis, flex-direction, flex-flow, flex-grow, flex-shrink, flex-wrap, float, font, font-family, font-feature-settings, font-kerning, font-language-override, font-optical-sizing, font-variation-settings, font-size, font-size-adjust, font-smooth, font-stretch, font-style, font-synthesis, font-variant, font-variant-alternates, font-variant-caps, font-variant-east-asian, font-variant-ligatures, font-variant-numeric, font-variant-position, font-weight, gap, grid, grid-area, grid-auto-columns, grid-auto-flow, grid-auto-rows, grid-column, grid-column-end, grid-column-gap, grid-column-start, grid-gap, grid-row, grid-row-end, grid-row-gap, grid-row-start, grid-template, grid-template-areas, grid-template-columns, grid-template-rows, hanging-punctuation, height, hyphens, image-orientation, image-rendering, image-resolution, ime-mode, initial-letter, initial-letter-align, inline-size, inset, inset-block, inset-block-end, inset-block-start, inset-inline, inset-inline-end, inset-inline-start, isolation, justify-content, justify-items, justify-self, justify-tracks, left, letter-spacing, line-break, line-clamp, line-height, line-height-step, list-style, list-style-image, list-style-position, list-style-type, margin, margin-block, margin-block-end, margin-block-start, margin-bottom, margin-inline, margin-inline-end, margin-inline-start, margin-left, margin-right, margin-top, margin-trim, mask, mask-border, mask-border-mode, mask-border-outset, mask-border-repeat, mask-border-slice, mask-border-source, mask-border-width, mask-clip, mask-composite, mask-image, mask-mode, mask-origin, mask-position, mask-repeat, mask-size, mask-type, masonry-auto-flow, math-style, max-block-size, max-height, max-inline-size, max-lines, max-width, min-block-size, min-height, min-inline-size, min-width, mix-blend-mode, object-fit, object-position, offset, offset-anchor, offset-distance, offset-path, offset-position, offset-rotate, opacity, order, orphans, outline, outline-color, outline-offset, outline-style, outline-width, overflow, overflow-anchor, overflow-block, overflow-clip-box, overflow-inline, overflow-wrap, overflow-x, overflow-y, overscroll-behavior, overscroll-behavior-block, overscroll-behavior-inline, overscroll-behavior-x, overscroll-behavior-y, padding, padding-block, padding-block-end, padding-block-start, padding-bottom, padding-inline, padding-inline-end, padding-inline-start, padding-left, padding-right, padding-top, page-break-after, page-break-before, page-break-inside, paint-order, perspective, perspective-origin, place-content, place-items, place-self, pointer-events, position, quotes, resize, right, rotate, row-gap, ruby-align, ruby-merge, ruby-position, scale, scrollbar-color, scrollbar-gutter, scrollbar-width, scroll-behavior, scroll-margin, scroll-margin-block, scroll-margin-block-start, scroll-margin-block-end, scroll-margin-bottom, scroll-margin-inline, scroll-margin-inline-start, scroll-margin-inline-end, scroll-margin-left, scroll-margin-right, scroll-margin-top, scroll-padding, scroll-padding-block, scroll-padding-block-start, scroll-padding-block-end, scroll-padding-bottom, scroll-padding-inline, scroll-padding-inline-start, scroll-padding-inline-end, scroll-padding-left, scroll-padding-right, scroll-padding-top, scroll-snap-align, scroll-snap-coordinate, scroll-snap-destination, scroll-snap-points-x, scroll-snap-points-y, scroll-snap-stop, scroll-snap-type, scroll-snap-type-x, scroll-snap-type-y, shape-image-threshold, shape-margin, shape-outside, tab-size, table-layout, text-align, text-align-last, text-combine-upright, text-decoration, text-decoration-color, text-decoration-line, text-decoration-skip, text-decoration-skip-ink, text-decoration-style, text-decoration-thickness, text-emphasis, text-emphasis-color, text-emphasis-position, text-emphasis-style, text-indent, text-justify, text-orientation, text-overflow, text-rendering, text-shadow, text-size-adjust, text-transform, text-underline-offset, text-underline-position, top, touch-action, transform, transform-box, transform-origin, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, translate, unicode-bidi, user-select, vertical-align, visibility, white-space, widows, width, will-change, word-break, word-spacing, word-wrap, writing-mode, z-index, zoom, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"--*\":{\"syntax\":\"<declaration-value>\",\"media\":\"all\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Variables\"],\"initial\":\"seeProse\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedWithVarsSubstituted\",\"order\":\"perGrammar\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/--*\"},\"-ms-accelerator\":{\"syntax\":\"false | true\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"false\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-accelerator\"},\"-ms-block-progression\":{\"syntax\":\"tb | rl | bt | lr\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"tb\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-block-progression\"},\"-ms-content-zoom-chaining\":{\"syntax\":\"none | chained\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-chaining\"},\"-ms-content-zooming\":{\"syntax\":\"none | zoom\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"zoomForTheTopLevelNoneForTheRest\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zooming\"},\"-ms-content-zoom-limit\":{\"syntax\":\"<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"-ms-content-zoom-limit-max\",\"-ms-content-zoom-limit-min\"],\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-content-zoom-limit-max\",\"-ms-content-zoom-limit-min\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-content-zoom-limit-max\",\"-ms-content-zoom-limit-min\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit\"},\"-ms-content-zoom-limit-max\":{\"syntax\":\"<percentage>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"maxZoomFactor\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"400%\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-max\"},\"-ms-content-zoom-limit-min\":{\"syntax\":\"<percentage>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"minZoomFactor\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"100%\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-limit-min\"},\"-ms-content-zoom-snap\":{\"syntax\":\"<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-content-zoom-snap-type\",\"-ms-content-zoom-snap-points\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-content-zoom-snap-type\",\"-ms-content-zoom-snap-points\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap\"},\"-ms-content-zoom-snap-points\":{\"syntax\":\"snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"snapInterval(0%, 100%)\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-points\"},\"-ms-content-zoom-snap-type\":{\"syntax\":\"none | proximity | mandatory\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-content-zoom-snap-type\"},\"-ms-filter\":{\"syntax\":\"<string>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"\\\"\\\"\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-filter\"},\"-ms-flow-from\":{\"syntax\":\"[ none | <custom-ident> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-flow-from\"},\"-ms-flow-into\":{\"syntax\":\"[ none | <custom-ident> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"iframeElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-flow-into\"},\"-ms-grid-columns\":{\"syntax\":\"none | <track-list> | <auto-track-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpcDifferenceLpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-grid-columns\"},\"-ms-grid-rows\":{\"syntax\":\"none | <track-list> | <auto-track-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpcDifferenceLpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-grid-rows\"},\"-ms-high-contrast-adjust\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-high-contrast-adjust\"},\"-ms-hyphenate-limit-chars\":{\"syntax\":\"auto | <integer>{1,3}\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-chars\"},\"-ms-hyphenate-limit-lines\":{\"syntax\":\"no-limit | <integer>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"no-limit\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-lines\"},\"-ms-hyphenate-limit-zone\":{\"syntax\":\"<percentage> | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"referToLineBoxWidth\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-hyphenate-limit-zone\"},\"-ms-ime-align\":{\"syntax\":\"auto | after\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-ime-align\"},\"-ms-overflow-style\":{\"syntax\":\"auto | none | scrollbar | -ms-autohiding-scrollbar\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-overflow-style\"},\"-ms-scrollbar-3dlight-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-3dlight-color\"},\"-ms-scrollbar-arrow-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ButtonText\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-arrow-color\"},\"-ms-scrollbar-base-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-base-color\"},\"-ms-scrollbar-darkshadow-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDDarkShadow\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-darkshadow-color\"},\"-ms-scrollbar-face-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDFace\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-face-color\"},\"-ms-scrollbar-highlight-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDHighlight\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-highlight-color\"},\"-ms-scrollbar-shadow-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDDarkShadow\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-shadow-color\"},\"-ms-scrollbar-track-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"Scrollbar\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scrollbar-track-color\"},\"-ms-scroll-chaining\":{\"syntax\":\"chained | none\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"chained\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-chaining\"},\"-ms-scroll-limit\":{\"syntax\":\"<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-scroll-limit-x-min\",\"-ms-scroll-limit-y-min\",\"-ms-scroll-limit-x-max\",\"-ms-scroll-limit-y-max\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-scroll-limit-x-min\",\"-ms-scroll-limit-y-min\",\"-ms-scroll-limit-x-max\",\"-ms-scroll-limit-y-max\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit\"},\"-ms-scroll-limit-x-max\":{\"syntax\":\"auto | <length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-max\"},\"-ms-scroll-limit-x-min\":{\"syntax\":\"<length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-x-min\"},\"-ms-scroll-limit-y-max\":{\"syntax\":\"auto | <length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-max\"},\"-ms-scroll-limit-y-min\":{\"syntax\":\"<length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-limit-y-min\"},\"-ms-scroll-rails\":{\"syntax\":\"none | railed\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"railed\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-rails\"},\"-ms-scroll-snap-points-x\":{\"syntax\":\"snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"snapInterval(0px, 100%)\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-x\"},\"-ms-scroll-snap-points-y\":{\"syntax\":\"snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"snapInterval(0px, 100%)\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-points-y\"},\"-ms-scroll-snap-type\":{\"syntax\":\"none | proximity | mandatory\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-type\"},\"-ms-scroll-snap-x\":{\"syntax\":\"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-x\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-x\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-x\"},\"-ms-scroll-snap-y\":{\"syntax\":\"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-y\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-y\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-snap-y\"},\"-ms-scroll-translation\":{\"syntax\":\"none | vertical-to-horizontal\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-scroll-translation\"},\"-ms-text-autospace\":{\"syntax\":\"none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-text-autospace\"},\"-ms-touch-select\":{\"syntax\":\"grippers | none\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"grippers\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-touch-select\"},\"-ms-user-select\":{\"syntax\":\"none | element | text\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"text\",\"appliesto\":\"nonReplacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-user-select\"},\"-ms-wrap-flow\":{\"syntax\":\"auto | both | start | end | maximum | clear\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-flow\"},\"-ms-wrap-margin\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"exclusionElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-margin\"},\"-ms-wrap-through\":{\"syntax\":\"wrap | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"wrap\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-ms-wrap-through\"},\"-moz-appearance\":{\"syntax\":\"none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"noneButOverriddenInUserAgentCSS\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/appearance\"},\"-moz-binding\":{\"syntax\":\"<url> | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElementsExceptGeneratedContentOrPseudoElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-binding\"},\"-moz-border-bottom-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors\"},\"-moz-border-left-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors\"},\"-moz-border-right-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors\"},\"-moz-border-top-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors\"},\"-moz-context-properties\":{\"syntax\":\"none | [ fill | fill-opacity | stroke | stroke-opacity ]#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElementsThatCanReferenceImages\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-context-properties\"},\"-moz-float-edge\":{\"syntax\":\"border-box | content-box | margin-box | padding-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"content-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-float-edge\"},\"-moz-force-broken-image-icon\":{\"syntax\":\"<integer [0,1]>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"images\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-force-broken-image-icon\"},\"-moz-image-region\":{\"syntax\":\"<shape> | auto\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"auto\",\"appliesto\":\"xulImageElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-image-region\"},\"-moz-orient\":{\"syntax\":\"inline | block | horizontal | vertical\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"inline\",\"appliesto\":\"anyElementEffectOnProgressAndMeter\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-orient\"},\"-moz-outline-radius\":{\"syntax\":\"<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"percentages\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"groups\":[\"Mozilla Extensions\"],\"initial\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"appliesto\":\"allElements\",\"computed\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius\"},\"-moz-outline-radius-bottomleft\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomleft\"},\"-moz-outline-radius-bottomright\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-bottomright\"},\"-moz-outline-radius-topleft\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topleft\"},\"-moz-outline-radius-topright\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-outline-radius-topright\"},\"-moz-stack-sizing\":{\"syntax\":\"ignore | stretch-to-fit\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"stretch-to-fit\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-stack-sizing\"},\"-moz-text-blink\":{\"syntax\":\"none | blink\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-text-blink\"},\"-moz-user-focus\":{\"syntax\":\"ignore | normal | select-after | select-before | select-menu | select-same | select-all | none\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-user-focus\"},\"-moz-user-input\":{\"syntax\":\"auto | none | enabled | disabled\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-user-input\"},\"-moz-user-modify\":{\"syntax\":\"read-only | read-write | write-only\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"read-only\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-user-modify\"},\"-moz-window-dragging\":{\"syntax\":\"drag | no-drag\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"drag\",\"appliesto\":\"allElementsCreatingNativeWindows\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-window-dragging\"},\"-moz-window-shadow\":{\"syntax\":\"default | menu | tooltip | sheet | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"default\",\"appliesto\":\"allElementsCreatingNativeWindows\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-moz-window-shadow\"},\"-webkit-appearance\":{\"syntax\":\"none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield | -apple-pay-button\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"noneButOverriddenInUserAgentCSS\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/appearance\"},\"-webkit-border-before\":{\"syntax\":\"<'border-width'> || <'border-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":[\"-webkit-border-before-width\"],\"groups\":[\"WebKit Extensions\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"color\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-border-before\"},\"-webkit-border-before-color\":{\"syntax\":\"<'color'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-border-before-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-border-before-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-box-reflect\":{\"syntax\":\"[ above | below | right | left ]? <length>? <image>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-box-reflect\"},\"-webkit-line-clamp\":{\"syntax\":\"none | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\",\"CSS Overflow\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-line-clamp\"},\"-webkit-mask\":{\"syntax\":\"[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <box> | border | padding | content | text ] || [ <box> | border | padding | content ] ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":[\"-webkit-mask-image\",\"-webkit-mask-repeat\",\"-webkit-mask-attachment\",\"-webkit-mask-position\",\"-webkit-mask-origin\",\"-webkit-mask-clip\"],\"appliesto\":\"allElements\",\"computed\":[\"-webkit-mask-image\",\"-webkit-mask-repeat\",\"-webkit-mask-attachment\",\"-webkit-mask-position\",\"-webkit-mask-origin\",\"-webkit-mask-clip\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask\"},\"-webkit-mask-attachment\":{\"syntax\":\"<attachment>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"scroll\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment\"},\"-webkit-mask-clip\":{\"syntax\":\"[ <box> | border | padding | content | text ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"border\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-clip\"},\"-webkit-mask-composite\":{\"syntax\":\"<composite-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"source-over\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-composite\"},\"-webkit-mask-image\":{\"syntax\":\"<mask-reference>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"absoluteURIOrNone\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-image\"},\"-webkit-mask-origin\":{\"syntax\":\"[ <box> | border | padding | content ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"padding\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-origin\"},\"-webkit-mask-position\":{\"syntax\":\"<position>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfElement\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0% 0%\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-position\"},\"-webkit-mask-position-x\":{\"syntax\":\"[ <length-percentage> | left | center | right ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfElement\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0%\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-x\"},\"-webkit-mask-position-y\":{\"syntax\":\"[ <length-percentage> | top | center | bottom ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfElement\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0%\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-position-y\"},\"-webkit-mask-repeat\":{\"syntax\":\"<repeat-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-repeat\"},\"-webkit-mask-repeat-x\":{\"syntax\":\"repeat | no-repeat | space | round\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-x\"},\"-webkit-mask-repeat-y\":{\"syntax\":\"repeat | no-repeat | space | round\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-repeat-y\"},\"-webkit-mask-size\":{\"syntax\":\"<bg-size>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToBackgroundPositioningArea\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"auto auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-size\"},\"-webkit-overflow-scrolling\":{\"syntax\":\"auto | touch\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"auto\",\"appliesto\":\"scrollingBoxes\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-overflow-scrolling\"},\"-webkit-tap-highlight-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"black\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-tap-highlight-color\"},\"-webkit-text-fill-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-text-fill-color\"},\"-webkit-text-stroke\":{\"syntax\":\"<length> || <color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":[\"-webkit-text-stroke-width\",\"-webkit-text-stroke-color\"],\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":[\"-webkit-text-stroke-width\",\"-webkit-text-stroke-color\"],\"appliesto\":\"allElements\",\"computed\":[\"-webkit-text-stroke-width\",\"-webkit-text-stroke-color\"],\"order\":\"canonicalOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke\"},\"-webkit-text-stroke-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-color\"},\"-webkit-text-stroke-width\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-text-stroke-width\"},\"-webkit-touch-callout\":{\"syntax\":\"default | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"default\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/-webkit-touch-callout\"},\"-webkit-user-modify\":{\"syntax\":\"read-only | read-write | read-write-plaintext-only\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"read-only\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"align-content\":{\"syntax\":\"normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"multilineFlexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/align-content\"},\"align-items\":{\"syntax\":\"normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/align-items\"},\"align-self\":{\"syntax\":\"auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"auto\",\"appliesto\":\"flexItemsGridItemsAndAbsolutelyPositionedBoxes\",\"computed\":\"autoOnAbsolutelyPositionedElementsValueOfAlignItemsOnParent\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/align-self\"},\"align-tracks\":{\"syntax\":\"[ normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"normal\",\"appliesto\":\"gridContainersWithMasonryLayoutInTheirBlockAxis\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/align-tracks\"},\"all\":{\"syntax\":\"initial | inherit | unset | revert\",\"media\":\"noPracticalMedia\",\"inherited\":false,\"animationType\":\"eachOfShorthandPropertiesExceptUnicodeBiDiAndDirection\",\"percentages\":\"no\",\"groups\":[\"CSS Miscellaneous\"],\"initial\":\"noPracticalInitialValue\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedAppliesToEachProperty\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/all\"},\"animation\":{\"syntax\":\"<single-animation>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":[\"animation-name\",\"animation-duration\",\"animation-timing-function\",\"animation-delay\",\"animation-iteration-count\",\"animation-direction\",\"animation-fill-mode\",\"animation-play-state\"],\"appliesto\":\"allElementsAndPseudos\",\"computed\":[\"animation-name\",\"animation-duration\",\"animation-timing-function\",\"animation-delay\",\"animation-direction\",\"animation-iteration-count\",\"animation-fill-mode\",\"animation-play-state\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation\"},\"animation-delay\":{\"syntax\":\"<time>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-delay\"},\"animation-direction\":{\"syntax\":\"<single-animation-direction>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"normal\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-direction\"},\"animation-duration\":{\"syntax\":\"<time>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-duration\"},\"animation-fill-mode\":{\"syntax\":\"<single-animation-fill-mode>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"none\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode\"},\"animation-iteration-count\":{\"syntax\":\"<single-animation-iteration-count>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"1\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count\"},\"animation-name\":{\"syntax\":\"[ none | <keyframes-name> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"none\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-name\"},\"animation-play-state\":{\"syntax\":\"<single-animation-play-state>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"running\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-play-state\"},\"animation-timing-function\":{\"syntax\":\"<timing-function>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"ease\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/animation-timing-function\"},\"appearance\":{\"syntax\":\"none | auto | textfield | menulist-button | <compat-auto>\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/appearance\"},\"aspect-ratio\":{\"syntax\":\"auto | <ratio>\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElementsExceptInlineBoxesAndInternalRubyOrTableBoxes\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/aspect-ratio\"},\"azimuth\":{\"syntax\":\"<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards\",\"media\":\"aural\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Speech\"],\"initial\":\"center\",\"appliesto\":\"allElements\",\"computed\":\"normalizedAngle\",\"order\":\"orderOfAppearance\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/azimuth\"},\"backdrop-filter\":{\"syntax\":\"none | <filter-function-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"filterList\",\"percentages\":\"no\",\"groups\":[\"Filter Effects\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/backdrop-filter\"},\"backface-visibility\":{\"syntax\":\"visible | hidden\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"visible\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/backface-visibility\"},\"background\":{\"syntax\":\"[ <bg-layer> , ]* <final-bg-layer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"background-color\",\"background-image\",\"background-clip\",\"background-position\",\"background-size\",\"background-repeat\",\"background-attachment\"],\"percentages\":[\"background-position\",\"background-size\"],\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"background-image\",\"background-position\",\"background-size\",\"background-repeat\",\"background-origin\",\"background-clip\",\"background-attachment\",\"background-color\"],\"appliesto\":\"allElements\",\"computed\":[\"background-image\",\"background-position\",\"background-size\",\"background-repeat\",\"background-origin\",\"background-clip\",\"background-attachment\",\"background-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background\"},\"background-attachment\":{\"syntax\":\"<attachment>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"scroll\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-attachment\"},\"background-blend-mode\":{\"syntax\":\"<blend-mode>#\",\"media\":\"none\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Compositing and Blending\"],\"initial\":\"normal\",\"appliesto\":\"allElementsSVGContainerGraphicsAndGraphicsReferencingElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-blend-mode\"},\"background-clip\":{\"syntax\":\"<box>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"border-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-clip\"},\"background-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"transparent\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-color\"},\"background-image\":{\"syntax\":\"<bg-image>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-image\"},\"background-origin\":{\"syntax\":\"<box>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"padding-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-origin\"},\"background-position\":{\"syntax\":\"<bg-position>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"referToSizeOfBackgroundPositioningAreaMinusBackgroundImageSize\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0% 0%\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemTwoKeywordsOriginOffsets\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-position\"},\"background-position-x\":{\"syntax\":\"[ center | [ [ left | right | x-start | x-end ]? <length-percentage>? ]! ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToWidthOfBackgroundPositioningAreaMinusBackgroundImageHeight\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"left\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-position-x\"},\"background-position-y\":{\"syntax\":\"[ center | [ [ top | bottom | y-start | y-end ]? <length-percentage>? ]! ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToHeightOfBackgroundPositioningAreaMinusBackgroundImageHeight\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"top\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-position-y\"},\"background-repeat\":{\"syntax\":\"<repeat-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemHasTwoKeywordsOnePerDimension\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-repeat\"},\"background-size\":{\"syntax\":\"<bg-size>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"relativeToBackgroundPositioningArea\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"auto auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/background-size\"},\"block-overflow\":{\"syntax\":\"clip | ellipsis | <string>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"clip\",\"appliesto\":\"blockContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"block-size\":{\"syntax\":\"<'width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"blockSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsWidthAndHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/block-size\"},\"border\":{\"syntax\":\"<line-width> || <line-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-color\",\"border-style\",\"border-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-width\",\"border-style\",\"border-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border\"},\"border-block\":{\"syntax\":\"<'border-top-width'> || <'border-top-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block\"},\"border-block-color\":{\"syntax\":\"<'border-top-color'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-color\"},\"border-block-style\":{\"syntax\":\"<'border-top-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-style\"},\"border-block-width\":{\"syntax\":\"<'border-top-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-width\"},\"border-block-end\":{\"syntax\":\"<'border-top-width'> || <'border-top-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-block-end-color\",\"border-block-end-style\",\"border-block-end-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-end\"},\"border-block-end-color\":{\"syntax\":\"<'border-top-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-end-color\"},\"border-block-end-style\":{\"syntax\":\"<'border-top-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-end-style\"},\"border-block-end-width\":{\"syntax\":\"<'border-top-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-end-width\"},\"border-block-start\":{\"syntax\":\"<'border-top-width'> || <'border-top-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-block-start-color\",\"border-block-start-style\",\"border-block-start-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-block-start-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-start\"},\"border-block-start-color\":{\"syntax\":\"<'border-top-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-start-color\"},\"border-block-start-style\":{\"syntax\":\"<'border-top-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-start-style\"},\"border-block-start-width\":{\"syntax\":\"<'border-top-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-block-start-width\"},\"border-bottom\":{\"syntax\":\"<line-width> || <line-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-bottom-color\",\"border-bottom-style\",\"border-bottom-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-bottom-width\",\"border-bottom-style\",\"border-bottom-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-width\",\"border-bottom-style\",\"border-bottom-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-bottom\"},\"border-bottom-color\":{\"syntax\":\"<'border-top-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-bottom-color\"},\"border-bottom-left-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius\"},\"border-bottom-right-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius\"},\"border-bottom-style\":{\"syntax\":\"<line-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-bottom-style\"},\"border-bottom-width\":{\"syntax\":\"<line-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderBottomStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-bottom-width\"},\"border-collapse\":{\"syntax\":\"collapse | separate\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"separate\",\"appliesto\":\"tableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-collapse\"},\"border-color\":{\"syntax\":\"<color>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-bottom-color\",\"border-left-color\",\"border-right-color\",\"border-top-color\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-color\",\"border-right-color\",\"border-bottom-color\",\"border-left-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-color\",\"border-left-color\",\"border-right-color\",\"border-top-color\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-color\"},\"border-end-end-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-end-end-radius\"},\"border-end-start-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-end-start-radius\"},\"border-image\":{\"syntax\":\"<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"border-image-slice\",\"border-image-width\"],\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-image-source\",\"border-image-slice\",\"border-image-width\",\"border-image-outset\",\"border-image-repeat\"],\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":[\"border-image-outset\",\"border-image-repeat\",\"border-image-slice\",\"border-image-source\",\"border-image-width\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-image\"},\"border-image-outset\":{\"syntax\":\"[ <length> | <number> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-image-outset\"},\"border-image-repeat\":{\"syntax\":\"[ stretch | repeat | round | space ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"stretch\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-image-repeat\"},\"border-image-slice\":{\"syntax\":\"<number-percentage>{1,4} && fill?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"referToSizeOfBorderImage\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"100%\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"oneToFourPercentagesOrAbsoluteLengthsPlusFill\",\"order\":\"percentagesOrLengthsFollowedByFill\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-image-slice\"},\"border-image-source\":{\"syntax\":\"none | <image>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"noneOrImageWithAbsoluteURI\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-image-source\"},\"border-image-width\":{\"syntax\":\"[ <length-percentage> | <number> | auto ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"referToWidthOrHeightOfBorderImageArea\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"1\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-image-width\"},\"border-inline\":{\"syntax\":\"<'border-top-width'> || <'border-top-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline\"},\"border-inline-end\":{\"syntax\":\"<'border-top-width'> || <'border-top-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-inline-end-color\",\"border-inline-end-style\",\"border-inline-end-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-inline-end-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-end\"},\"border-inline-color\":{\"syntax\":\"<'border-top-color'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-color\"},\"border-inline-style\":{\"syntax\":\"<'border-top-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-style\"},\"border-inline-width\":{\"syntax\":\"<'border-top-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-width\"},\"border-inline-end-color\":{\"syntax\":\"<'border-top-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color\"},\"border-inline-end-style\":{\"syntax\":\"<'border-top-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style\"},\"border-inline-end-width\":{\"syntax\":\"<'border-top-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width\"},\"border-inline-start\":{\"syntax\":\"<'border-top-width'> || <'border-top-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-inline-start-color\",\"border-inline-start-style\",\"border-inline-start-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-inline-start-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-start\"},\"border-inline-start-color\":{\"syntax\":\"<'border-top-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color\"},\"border-inline-start-style\":{\"syntax\":\"<'border-top-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style\"},\"border-inline-start-width\":{\"syntax\":\"<'border-top-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width\"},\"border-left\":{\"syntax\":\"<line-width> || <line-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-left-color\",\"border-left-style\",\"border-left-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-left-width\",\"border-left-style\",\"border-left-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-left-width\",\"border-left-style\",\"border-left-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-left\"},\"border-left-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-left-color\"},\"border-left-style\":{\"syntax\":\"<line-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-left-style\"},\"border-left-width\":{\"syntax\":\"<line-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderLeftStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-left-width\"},\"border-radius\":{\"syntax\":\"<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-top-left-radius\",\"border-top-right-radius\",\"border-bottom-right-radius\",\"border-bottom-left-radius\"],\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-left-radius\",\"border-top-right-radius\",\"border-bottom-right-radius\",\"border-bottom-left-radius\"],\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":[\"border-bottom-left-radius\",\"border-bottom-right-radius\",\"border-top-left-radius\",\"border-top-right-radius\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-radius\"},\"border-right\":{\"syntax\":\"<line-width> || <line-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-right-color\",\"border-right-style\",\"border-right-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-right-width\",\"border-right-style\",\"border-right-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-right-width\",\"border-right-style\",\"border-right-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-right\"},\"border-right-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-right-color\"},\"border-right-style\":{\"syntax\":\"<line-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-right-style\"},\"border-right-width\":{\"syntax\":\"<line-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderRightStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-right-width\"},\"border-spacing\":{\"syntax\":\"<length> <length>?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"0\",\"appliesto\":\"tableElements\",\"computed\":\"twoAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-spacing\"},\"border-start-end-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-start-end-radius\"},\"border-start-start-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-start-start-radius\"},\"border-style\":{\"syntax\":\"<line-style>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-style\",\"border-right-style\",\"border-bottom-style\",\"border-left-style\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-style\",\"border-left-style\",\"border-right-style\",\"border-top-style\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-style\"},\"border-top\":{\"syntax\":\"<line-width> || <line-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-top-color\",\"border-top-style\",\"border-top-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-top\"},\"border-top-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-top-color\"},\"border-top-left-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius\"},\"border-top-right-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius\"},\"border-top-style\":{\"syntax\":\"<line-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-top-style\"},\"border-top-width\":{\"syntax\":\"<line-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderTopStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-top-width\"},\"border-width\":{\"syntax\":\"<line-width>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-bottom-width\",\"border-left-width\",\"border-right-width\",\"border-top-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-width\",\"border-right-width\",\"border-bottom-width\",\"border-left-width\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-width\",\"border-left-width\",\"border-right-width\",\"border-top-width\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/border-width\"},\"bottom\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToContainingBlockHeight\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/bottom\"},\"box-align\":{\"syntax\":\"start | center | end | baseline | stretch\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"stretch\",\"appliesto\":\"elementsWithDisplayBoxOrInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-align\"},\"box-decoration-break\":{\"syntax\":\"slice | clone\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"slice\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-decoration-break\"},\"box-direction\":{\"syntax\":\"normal | reverse | inherit\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"normal\",\"appliesto\":\"elementsWithDisplayBoxOrInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-direction\"},\"box-flex\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"0\",\"appliesto\":\"directChildrenOfElementsWithDisplayMozBoxMozInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-flex\"},\"box-flex-group\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"1\",\"appliesto\":\"inFlowChildrenOfBoxElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-flex-group\"},\"box-lines\":{\"syntax\":\"single | multiple\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"single\",\"appliesto\":\"boxElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-lines\"},\"box-ordinal-group\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"1\",\"appliesto\":\"childrenOfBoxElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-ordinal-group\"},\"box-orient\":{\"syntax\":\"horizontal | vertical | inline-axis | block-axis | inherit\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"inlineAxisHorizontalInXUL\",\"appliesto\":\"elementsWithDisplayBoxOrInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-orient\"},\"box-pack\":{\"syntax\":\"start | center | end | justify\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"start\",\"appliesto\":\"elementsWithDisplayMozBoxMozInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-pack\"},\"box-shadow\":{\"syntax\":\"none | <shadow>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"shadowList\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthsSpecifiedColorAsSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-shadow\"},\"box-sizing\":{\"syntax\":\"content-box | border-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"content-box\",\"appliesto\":\"allElementsAcceptingWidthOrHeight\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/box-sizing\"},\"break-after\":{\"syntax\":\"auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/break-after\"},\"break-before\":{\"syntax\":\"auto | avoid | always | all | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/break-before\"},\"break-inside\":{\"syntax\":\"auto | avoid | avoid-page | avoid-column | avoid-region\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/break-inside\"},\"caption-side\":{\"syntax\":\"top | bottom | block-start | block-end | inline-start | inline-end\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"top\",\"appliesto\":\"tableCaptionElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/caption-side\"},\"caret-color\":{\"syntax\":\"auto | <color>\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asAutoOrColor\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/caret-color\"},\"clear\":{\"syntax\":\"none | left | right | both | inline-start | inline-end\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"none\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/clear\"},\"clip\":{\"syntax\":\"<shape> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"rectangle\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"auto\",\"appliesto\":\"absolutelyPositionedElements\",\"computed\":\"autoOrRectangle\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/clip\"},\"clip-path\":{\"syntax\":\"<clip-source> | [ <basic-shape> || <geometry-box> ] | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"basicShapeOtherwiseNo\",\"percentages\":\"referToReferenceBoxWhenSpecifiedOtherwiseBorderBox\",\"groups\":[\"CSS Masking\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/clip-path\"},\"color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Color\"],\"initial\":\"variesFromBrowserToBrowser\",\"appliesto\":\"allElements\",\"computed\":\"translucentValuesRGBAOtherwiseRGB\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/color\"},\"color-adjust\":{\"syntax\":\"economy | exact\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Color\"],\"initial\":\"economy\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/color-adjust\"},\"column-count\":{\"syntax\":\"<integer> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersExceptTableWrappers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-count\"},\"column-fill\":{\"syntax\":\"auto | balance | balance-all\",\"media\":\"visualInContinuousMediaNoEffectInOverflowColumns\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"balance\",\"appliesto\":\"multicolElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-fill\"},\"column-gap\":{\"syntax\":\"normal | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"multiColumnElementsFlexContainersGridContainers\",\"computed\":\"asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-gap\"},\"column-rule\":{\"syntax\":\"<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"column-rule-color\",\"column-rule-style\",\"column-rule-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":[\"column-rule-width\",\"column-rule-style\",\"column-rule-color\"],\"appliesto\":\"multicolElements\",\"computed\":[\"column-rule-color\",\"column-rule-style\",\"column-rule-width\"],\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-rule\"},\"column-rule-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"currentcolor\",\"appliesto\":\"multicolElements\",\"computed\":\"computedColor\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-rule-color\"},\"column-rule-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"none\",\"appliesto\":\"multicolElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-rule-style\"},\"column-rule-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"medium\",\"appliesto\":\"multicolElements\",\"computed\":\"absoluteLength0IfColumnRuleStyleNoneOrHidden\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-rule-width\"},\"column-span\":{\"syntax\":\"none | all\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"none\",\"appliesto\":\"inFlowBlockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-span\"},\"column-width\":{\"syntax\":\"<length> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersExceptTableWrappers\",\"computed\":\"absoluteLengthZeroOrLarger\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-width\"},\"columns\":{\"syntax\":\"<'column-width'> || <'column-count'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"column-width\",\"column-count\"],\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":[\"column-width\",\"column-count\"],\"appliesto\":\"blockContainersExceptTableWrappers\",\"computed\":[\"column-width\",\"column-count\"],\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/columns\"},\"contain\":{\"syntax\":\"none | strict | content | [ size || layout || style || paint ]\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Containment\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/contain\"},\"content\":{\"syntax\":\"normal | none | [ <content-replacement> | <content-list> ] [/ <string> ]?\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Generated Content\"],\"initial\":\"normal\",\"appliesto\":\"beforeAndAfterPseudos\",\"computed\":\"normalOnElementsForPseudosNoneAbsoluteURIStringOrAsSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/content\"},\"counter-increment\":{\"syntax\":\"[ <custom-ident> <integer>? ]+ | none\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Counter Styles\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/counter-increment\"},\"counter-reset\":{\"syntax\":\"[ <custom-ident> <integer>? ]+ | none\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Counter Styles\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/counter-reset\"},\"counter-set\":{\"syntax\":\"[ <custom-ident> <integer>? ]+ | none\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Counter Styles\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/counter-set\"},\"cursor\":{\"syntax\":\"[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]\",\"media\":[\"visual\",\"interactive\"],\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/cursor\"},\"direction\":{\"syntax\":\"ltr | rtl\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"ltr\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/direction\"},\"display\":{\"syntax\":\"[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Display\"],\"initial\":\"inline\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedExceptPositionedFloatingAndRootElementsKeywordMaybeDifferent\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/display\"},\"empty-cells\":{\"syntax\":\"show | hide\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"show\",\"appliesto\":\"tableCellElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/empty-cells\"},\"filter\":{\"syntax\":\"none | <filter-function-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"filterList\",\"percentages\":\"no\",\"groups\":[\"Filter Effects\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/filter\"},\"flex\":{\"syntax\":\"none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"flex-grow\",\"flex-shrink\",\"flex-basis\"],\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":[\"flex-grow\",\"flex-shrink\",\"flex-basis\"],\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":[\"flex-grow\",\"flex-shrink\",\"flex-basis\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex\"},\"flex-basis\":{\"syntax\":\"content | <'width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToFlexContainersInnerMainSize\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"auto\",\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"lengthOrPercentageBeforeKeywordIfBothPresent\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex-basis\"},\"flex-direction\":{\"syntax\":\"row | row-reverse | column | column-reverse\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"row\",\"appliesto\":\"flexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex-direction\"},\"flex-flow\":{\"syntax\":\"<'flex-direction'> || <'flex-wrap'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":[\"flex-direction\",\"flex-wrap\"],\"appliesto\":\"flexContainers\",\"computed\":[\"flex-direction\",\"flex-wrap\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex-flow\"},\"flex-grow\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"0\",\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex-grow\"},\"flex-shrink\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"1\",\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex-shrink\"},\"flex-wrap\":{\"syntax\":\"nowrap | wrap | wrap-reverse\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"nowrap\",\"appliesto\":\"flexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/flex-wrap\"},\"float\":{\"syntax\":\"left | right | none | inline-start | inline-end\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"none\",\"appliesto\":\"allElementsNoEffectIfDisplayNone\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/float\"},\"font\":{\"syntax\":\"[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar\",\"media\":\"visual\",\"inherited\":true,\"animationType\":[\"font-style\",\"font-variant\",\"font-weight\",\"font-stretch\",\"font-size\",\"line-height\",\"font-family\"],\"percentages\":[\"font-size\",\"line-height\"],\"groups\":[\"CSS Fonts\"],\"initial\":[\"font-style\",\"font-variant\",\"font-weight\",\"font-stretch\",\"font-size\",\"line-height\",\"font-family\"],\"appliesto\":\"allElements\",\"computed\":[\"font-style\",\"font-variant\",\"font-weight\",\"font-stretch\",\"font-size\",\"line-height\",\"font-family\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font\"},\"font-family\":{\"syntax\":\"[ <family-name> | <generic-family> ]#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-family\"},\"font-feature-settings\":{\"syntax\":\"normal | <feature-tag-value>#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-feature-settings\"},\"font-kerning\":{\"syntax\":\"auto | normal | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-kerning\"},\"font-language-override\":{\"syntax\":\"normal | <string>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-language-override\"},\"font-optical-sizing\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-optical-sizing\"},\"font-variation-settings\":{\"syntax\":\"normal | [ <string> <number> ]#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"transform\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variation-settings\"},\"font-size\":{\"syntax\":\"<absolute-size> | <relative-size> | <length-percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"referToParentElementsFontSize\",\"groups\":[\"CSS Fonts\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-size\"},\"font-size-adjust\":{\"syntax\":\"none | <number>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-size-adjust\"},\"font-smooth\":{\"syntax\":\"auto | never | always | <absolute-size> | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-smooth\"},\"font-stretch\":{\"syntax\":\"<font-stretch-absolute>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"fontStretch\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-stretch\"},\"font-style\":{\"syntax\":\"normal | italic | oblique <angle>?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-style\"},\"font-synthesis\":{\"syntax\":\"none | [ weight || style ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"weight style\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-synthesis\"},\"font-variant\":{\"syntax\":\"normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant\"},\"font-variant-alternates\":{\"syntax\":\"normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates\"},\"font-variant-caps\":{\"syntax\":\"normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant-caps\"},\"font-variant-east-asian\":{\"syntax\":\"normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian\"},\"font-variant-ligatures\":{\"syntax\":\"normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures\"},\"font-variant-numeric\":{\"syntax\":\"normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric\"},\"font-variant-position\":{\"syntax\":\"normal | sub | super\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-variant-position\"},\"font-weight\":{\"syntax\":\"<font-weight-absolute> | bolder | lighter\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"fontWeight\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"keywordOrNumericalValueBolderLighterTransformedToRealValue\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/font-weight\"},\"gap\":{\"syntax\":\"<'row-gap'> <'column-gap'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"row-gap\",\"column-gap\"],\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":[\"row-gap\",\"column-gap\"],\"appliesto\":\"multiColumnElementsFlexContainersGridContainers\",\"computed\":[\"row-gap\",\"column-gap\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/gap\"},\"grid\":{\"syntax\":\"<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"grid-template-rows\",\"grid-template-columns\",\"grid-auto-rows\",\"grid-auto-columns\"],\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-template-rows\",\"grid-template-columns\",\"grid-template-areas\",\"grid-auto-rows\",\"grid-auto-columns\",\"grid-auto-flow\",\"grid-column-gap\",\"grid-row-gap\",\"column-gap\",\"row-gap\"],\"appliesto\":\"gridContainers\",\"computed\":[\"grid-template-rows\",\"grid-template-columns\",\"grid-template-areas\",\"grid-auto-rows\",\"grid-auto-columns\",\"grid-auto-flow\",\"grid-column-gap\",\"grid-row-gap\",\"column-gap\",\"row-gap\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid\"},\"grid-area\":{\"syntax\":\"<grid-line> [ / <grid-line> ]{0,3}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-row-start\",\"grid-column-start\",\"grid-row-end\",\"grid-column-end\"],\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":[\"grid-row-start\",\"grid-column-start\",\"grid-row-end\",\"grid-column-end\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-area\"},\"grid-auto-columns\":{\"syntax\":\"<track-size>+\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns\"},\"grid-auto-flow\":{\"syntax\":\"[ row | column ] || dense\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"row\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow\"},\"grid-auto-rows\":{\"syntax\":\"<track-size>+\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-auto-rows\"},\"grid-column\":{\"syntax\":\"<grid-line> [ / <grid-line> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-column-start\",\"grid-column-end\"],\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":[\"grid-column-start\",\"grid-column-end\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-column\"},\"grid-column-end\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-column-end\"},\"grid-column-gap\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"0\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/column-gap\"},\"grid-column-start\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-column-start\"},\"grid-gap\":{\"syntax\":\"<'grid-row-gap'> <'grid-column-gap'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"grid-row-gap\",\"grid-column-gap\"],\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-row-gap\",\"grid-column-gap\"],\"appliesto\":\"gridContainers\",\"computed\":[\"grid-row-gap\",\"grid-column-gap\"],\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/gap\"},\"grid-row\":{\"syntax\":\"<grid-line> [ / <grid-line> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-row-start\",\"grid-row-end\"],\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":[\"grid-row-start\",\"grid-row-end\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-row\"},\"grid-row-end\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-row-end\"},\"grid-row-gap\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"0\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/row-gap\"},\"grid-row-start\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-row-start\"},\"grid-template\":{\"syntax\":\"none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"grid-template-columns\",\"grid-template-rows\"],\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-template-columns\",\"grid-template-rows\",\"grid-template-areas\"],\"appliesto\":\"gridContainers\",\"computed\":[\"grid-template-columns\",\"grid-template-rows\",\"grid-template-areas\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-template\"},\"grid-template-areas\":{\"syntax\":\"none | <string>+\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-template-areas\"},\"grid-template-columns\":{\"syntax\":\"none | <track-list> | <auto-track-list> | subgrid <line-name-list>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpcDifferenceLpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-template-columns\"},\"grid-template-rows\":{\"syntax\":\"none | <track-list> | <auto-track-list> | subgrid <line-name-list>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpcDifferenceLpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/grid-template-rows\"},\"hanging-punctuation\":{\"syntax\":\"none | [ first || [ force-end | allow-end ] || last ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/hanging-punctuation\"},\"height\":{\"syntax\":\"auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"regardingHeightOfGeneratedBoxContainingBlockPercentagesRelativeToContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"allElementsButNonReplacedAndTableColumns\",\"computed\":\"percentageAutoOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/height\"},\"hyphens\":{\"syntax\":\"none | manual | auto\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"manual\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/hyphens\"},\"image-orientation\":{\"syntax\":\"from-image | <angle> | [ <angle>? flip ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"from-image\",\"appliesto\":\"allElements\",\"computed\":\"angleRoundedToNextQuarter\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/image-orientation\"},\"image-rendering\":{\"syntax\":\"auto | crisp-edges | pixelated\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/image-rendering\"},\"image-resolution\":{\"syntax\":\"[ from-image || <resolution> ] && snap?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"1dppx\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedWithExceptionOfResolution\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"ime-mode\":{\"syntax\":\"auto | normal | active | inactive | disabled\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"textFields\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/ime-mode\"},\"initial-letter\":{\"syntax\":\"normal | [ <number> <integer>? ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Inline\"],\"initial\":\"normal\",\"appliesto\":\"firstLetterPseudoElementsAndInlineLevelFirstChildren\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/initial-letter\"},\"initial-letter-align\":{\"syntax\":\"[ auto | alphabetic | hanging | ideographic ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Inline\"],\"initial\":\"auto\",\"appliesto\":\"firstLetterPseudoElementsAndInlineLevelFirstChildren\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/initial-letter-align\"},\"inline-size\":{\"syntax\":\"<'width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"inlineSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsWidthAndHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inline-size\"},\"inset\":{\"syntax\":\"<'top'>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalHeightOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset\"},\"inset-block\":{\"syntax\":\"<'top'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalHeightOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset-block\"},\"inset-block-end\":{\"syntax\":\"<'top'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalHeightOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset-block-end\"},\"inset-block-start\":{\"syntax\":\"<'top'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalHeightOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset-block-start\"},\"inset-inline\":{\"syntax\":\"<'top'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset-inline\"},\"inset-inline-end\":{\"syntax\":\"<'top'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset-inline-end\"},\"inset-inline-start\":{\"syntax\":\"<'top'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/inset-inline-start\"},\"isolation\":{\"syntax\":\"auto | isolate\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Compositing and Blending\"],\"initial\":\"auto\",\"appliesto\":\"allElementsSVGContainerGraphicsAndGraphicsReferencingElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/isolation\"},\"justify-content\":{\"syntax\":\"normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"flexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/justify-content\"},\"justify-items\":{\"syntax\":\"normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"legacy\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/justify-items\"},\"justify-self\":{\"syntax\":\"auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/justify-self\"},\"justify-tracks\":{\"syntax\":\"[ normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ] ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"normal\",\"appliesto\":\"gridContainersWithMasonryLayoutInTheirInlineAxis\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/justify-tracks\"},\"left\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/left\"},\"letter-spacing\":{\"syntax\":\"normal | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"optimumValueOfAbsoluteLengthOrNormal\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/letter-spacing\"},\"line-break\":{\"syntax\":\"auto | loose | normal | strict | anywhere\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/line-break\"},\"line-clamp\":{\"syntax\":\"none | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"none\",\"appliesto\":\"blockContainersExceptMultiColumnContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"line-height\":{\"syntax\":\"normal | <number> | <length> | <percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"numberOrLength\",\"percentages\":\"referToElementFontSize\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrAsSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/line-height\"},\"line-height-step\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"0\",\"appliesto\":\"blockContainers\",\"computed\":\"absoluteLength\",\"order\":\"perGrammar\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/line-height-step\"},\"list-style\":{\"syntax\":\"<'list-style-type'> || <'list-style-position'> || <'list-style-image'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":[\"list-style-type\",\"list-style-position\",\"list-style-image\"],\"appliesto\":\"listItems\",\"computed\":[\"list-style-image\",\"list-style-position\",\"list-style-type\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/list-style\"},\"list-style-image\":{\"syntax\":\"<url> | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":\"none\",\"appliesto\":\"listItems\",\"computed\":\"noneOrImageWithAbsoluteURI\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/list-style-image\"},\"list-style-position\":{\"syntax\":\"inside | outside\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":\"outside\",\"appliesto\":\"listItems\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/list-style-position\"},\"list-style-type\":{\"syntax\":\"<counter-style> | <string> | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":\"disc\",\"appliesto\":\"listItems\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/list-style-type\"},\"margin\":{\"syntax\":\"[ <length> | <percentage> | auto ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":[\"margin-bottom\",\"margin-left\",\"margin-right\",\"margin-top\"],\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":[\"margin-bottom\",\"margin-left\",\"margin-right\",\"margin-top\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin\"},\"margin-block\":{\"syntax\":\"<'margin-left'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-block\"},\"margin-block-end\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-block-end\"},\"margin-block-start\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-block-start\"},\"margin-bottom\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-bottom\"},\"margin-inline\":{\"syntax\":\"<'margin-left'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-inline\"},\"margin-inline-end\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-inline-end\"},\"margin-inline-start\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-inline-start\"},\"margin-left\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-left\"},\"margin-right\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-right\"},\"margin-top\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-top\"},\"margin-trim\":{\"syntax\":\"none | in-flow | all\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"none\",\"appliesto\":\"blockContainersAndMultiColumnContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/margin-trim\"},\"mask\":{\"syntax\":\"<mask-layer>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"mask-image\",\"mask-mode\",\"mask-repeat\",\"mask-position\",\"mask-clip\",\"mask-origin\",\"mask-size\",\"mask-composite\"],\"percentages\":[\"mask-position\"],\"groups\":[\"CSS Masking\"],\"initial\":[\"mask-image\",\"mask-mode\",\"mask-repeat\",\"mask-position\",\"mask-clip\",\"mask-origin\",\"mask-size\",\"mask-composite\"],\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":[\"mask-image\",\"mask-mode\",\"mask-repeat\",\"mask-position\",\"mask-clip\",\"mask-origin\",\"mask-size\",\"mask-composite\"],\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask\"},\"mask-border\":{\"syntax\":\"<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"mask-border-mode\",\"mask-border-outset\",\"mask-border-repeat\",\"mask-border-slice\",\"mask-border-source\",\"mask-border-width\"],\"percentages\":[\"mask-border-slice\",\"mask-border-width\"],\"groups\":[\"CSS Masking\"],\"initial\":[\"mask-border-mode\",\"mask-border-outset\",\"mask-border-repeat\",\"mask-border-slice\",\"mask-border-source\",\"mask-border-width\"],\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":[\"mask-border-mode\",\"mask-border-outset\",\"mask-border-repeat\",\"mask-border-slice\",\"mask-border-source\",\"mask-border-width\"],\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border\"},\"mask-border-mode\":{\"syntax\":\"luminance | alpha\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"alpha\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border-mode\"},\"mask-border-outset\":{\"syntax\":\"[ <length> | <number> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"0\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border-outset\"},\"mask-border-repeat\":{\"syntax\":\"[ stretch | repeat | round | space ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"stretch\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border-repeat\"},\"mask-border-slice\":{\"syntax\":\"<number-percentage>{1,4} fill?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfMaskBorderImage\",\"groups\":[\"CSS Masking\"],\"initial\":\"0\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border-slice\"},\"mask-border-source\":{\"syntax\":\"none | <image>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border-source\"},\"mask-border-width\":{\"syntax\":\"[ <length-percentage> | <number> | auto ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToMaskBorderImageArea\",\"groups\":[\"CSS Masking\"],\"initial\":\"auto\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-border-width\"},\"mask-clip\":{\"syntax\":\"[ <geometry-box> | no-clip ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"border-box\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-clip\"},\"mask-composite\":{\"syntax\":\"<compositing-operator>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"add\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-composite\"},\"mask-image\":{\"syntax\":\"<mask-reference>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-image\"},\"mask-mode\":{\"syntax\":\"<masking-mode>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"match-source\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-mode\"},\"mask-origin\":{\"syntax\":\"<geometry-box>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"border-box\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-origin\"},\"mask-position\":{\"syntax\":\"<position>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"referToSizeOfMaskPaintingArea\",\"groups\":[\"CSS Masking\"],\"initial\":\"center\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"consistsOfTwoKeywordsForOriginAndOffsets\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-position\"},\"mask-repeat\":{\"syntax\":\"<repeat-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"no-repeat\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"consistsOfTwoDimensionKeywords\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-repeat\"},\"mask-size\":{\"syntax\":\"<bg-size>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"auto\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-size\"},\"mask-type\":{\"syntax\":\"luminance | alpha\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"luminance\",\"appliesto\":\"maskElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mask-type\"},\"masonry-auto-flow\":{\"syntax\":\"[ pack | next ] || [ definite-first | ordered ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"pack\",\"appliesto\":\"gridContainersWithMasonryLayout\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/masonry-auto-flow\"},\"math-style\":{\"syntax\":\"normal | compact\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"notAnimatable\",\"percentages\":\"no\",\"groups\":[\"MathML\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/math-style\"},\"max-block-size\":{\"syntax\":\"<'max-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"blockSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMaxWidthAndMaxHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/max-block-size\"},\"max-height\":{\"syntax\":\"none | <length-percentage> | min-content | max-content | fit-content(<length-percentage>)\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"regardingHeightOfGeneratedBoxContainingBlockPercentagesNone\",\"groups\":[\"CSS Box Model\"],\"initial\":\"none\",\"appliesto\":\"allElementsButNonReplacedAndTableColumns\",\"computed\":\"percentageAsSpecifiedAbsoluteLengthOrNone\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/max-height\"},\"max-inline-size\":{\"syntax\":\"<'max-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"inlineSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMaxWidthAndMaxHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/max-inline-size\"},\"max-lines\":{\"syntax\":\"none | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"none\",\"appliesto\":\"blockContainersExceptMultiColumnContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"max-width\":{\"syntax\":\"none | <length-percentage> | min-content | max-content | fit-content(<length-percentage>)\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"none\",\"appliesto\":\"allElementsButNonReplacedAndTableRows\",\"computed\":\"percentageAsSpecifiedAbsoluteLengthOrNone\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/max-width\"},\"min-block-size\":{\"syntax\":\"<'min-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"blockSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMinWidthAndMinHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/min-block-size\"},\"min-height\":{\"syntax\":\"auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"regardingHeightOfGeneratedBoxContainingBlockPercentages0\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"allElementsButNonReplacedAndTableColumns\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/min-height\"},\"min-inline-size\":{\"syntax\":\"<'min-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"inlineSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMinWidthAndMinHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/min-inline-size\"},\"min-width\":{\"syntax\":\"auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"allElementsButNonReplacedAndTableRows\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/min-width\"},\"mix-blend-mode\":{\"syntax\":\"<blend-mode>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Compositing and Blending\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/mix-blend-mode\"},\"object-fit\":{\"syntax\":\"fill | contain | cover | none | scale-down\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"fill\",\"appliesto\":\"replacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/object-fit\"},\"object-position\":{\"syntax\":\"<position>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"referToWidthAndHeightOfElement\",\"groups\":[\"CSS Images\"],\"initial\":\"50% 50%\",\"appliesto\":\"replacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/object-position\"},\"offset\":{\"syntax\":\"[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"offset-position\",\"offset-path\",\"offset-distance\",\"offset-anchor\",\"offset-rotate\"],\"percentages\":[\"offset-position\",\"offset-distance\",\"offset-anchor\"],\"groups\":[\"CSS Motion Path\"],\"initial\":[\"offset-position\",\"offset-path\",\"offset-distance\",\"offset-anchor\",\"offset-rotate\"],\"appliesto\":\"transformableElements\",\"computed\":[\"offset-position\",\"offset-path\",\"offset-distance\",\"offset-anchor\",\"offset-rotate\"],\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/offset\"},\"offset-anchor\":{\"syntax\":\"auto | <position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"relativeToWidthAndHeight\",\"groups\":[\"CSS Motion Path\"],\"initial\":\"auto\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"offset-distance\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToTotalPathLength\",\"groups\":[\"CSS Motion Path\"],\"initial\":\"0\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/offset-distance\"},\"offset-path\":{\"syntax\":\"none | ray( [ <angle> && <size> && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"angleOrBasicShapeOrPath\",\"percentages\":\"no\",\"groups\":[\"CSS Motion Path\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/offset-path\"},\"offset-position\":{\"syntax\":\"auto | <position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"referToSizeOfContainingBlock\",\"groups\":[\"CSS Motion Path\"],\"initial\":\"auto\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"offset-rotate\":{\"syntax\":\"[ auto | reverse ] || <angle>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"angleOrBasicShapeOrPath\",\"percentages\":\"no\",\"groups\":[\"CSS Motion Path\"],\"initial\":\"auto\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/offset-rotate\"},\"opacity\":{\"syntax\":\"<alpha-value>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Color\"],\"initial\":\"1.0\",\"appliesto\":\"allElements\",\"computed\":\"specifiedValueClipped0To1\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/opacity\"},\"order\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"0\",\"appliesto\":\"flexItemsGridItemsAbsolutelyPositionedContainerChildren\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/order\"},\"orphans\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"2\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/orphans\"},\"outline\":{\"syntax\":\"[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":[\"outline-color\",\"outline-width\",\"outline-style\"],\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":[\"outline-color\",\"outline-style\",\"outline-width\"],\"appliesto\":\"allElements\",\"computed\":[\"outline-color\",\"outline-width\",\"outline-style\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/outline\"},\"outline-color\":{\"syntax\":\"<color> | invert\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"invertOrCurrentColor\",\"appliesto\":\"allElements\",\"computed\":\"invertForTranslucentColorRGBAOtherwiseRGB\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/outline-color\"},\"outline-offset\":{\"syntax\":\"<length>\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/outline-offset\"},\"outline-style\":{\"syntax\":\"auto | <'border-style'>\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/outline-style\"},\"outline-width\":{\"syntax\":\"<line-width>\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLength0ForNone\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/outline-width\"},\"overflow\":{\"syntax\":\"[ visible | hidden | clip | scroll | auto ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"visible\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":[\"overflow-x\",\"overflow-y\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overflow\"},\"overflow-anchor\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Anchoring\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"overflow-block\":{\"syntax\":\"visible | hidden | clip | scroll | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"overflow-clip-box\":{\"syntax\":\"padding-box | content-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"padding-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Mozilla/CSS/overflow-clip-box\"},\"overflow-inline\":{\"syntax\":\"visible | hidden | clip | scroll | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"overflow-wrap\":{\"syntax\":\"normal | break-word | anywhere\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"nonReplacedInlineElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overflow-wrap\"},\"overflow-x\":{\"syntax\":\"visible | hidden | clip | scroll | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"visible\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overflow-x\"},\"overflow-y\":{\"syntax\":\"visible | hidden | clip | scroll | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"visible\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecifiedButVisibleOrClipReplacedToAutoOrHiddenIfOtherValueDifferent\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overflow-y\"},\"overscroll-behavior\":{\"syntax\":\"[ contain | none | auto ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior\"},\"overscroll-behavior-block\":{\"syntax\":\"contain | none | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-block\"},\"overscroll-behavior-inline\":{\"syntax\":\"contain | none | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-inline\"},\"overscroll-behavior-x\":{\"syntax\":\"contain | none | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-x\"},\"overscroll-behavior-y\":{\"syntax\":\"contain | none | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overscroll-behavior-y\"},\"padding\":{\"syntax\":\"[ <length> | <percentage> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":[\"padding-bottom\",\"padding-left\",\"padding-right\",\"padding-top\"],\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":[\"padding-bottom\",\"padding-left\",\"padding-right\",\"padding-top\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding\"},\"padding-block\":{\"syntax\":\"<'padding-left'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-block\"},\"padding-block-end\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-block-end\"},\"padding-block-start\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-block-start\"},\"padding-bottom\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-bottom\"},\"padding-inline\":{\"syntax\":\"<'padding-left'>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-inline\"},\"padding-inline-end\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-inline-end\"},\"padding-inline-start\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-inline-start\"},\"padding-left\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-left\"},\"padding-right\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-right\"},\"padding-top\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/padding-top\"},\"page-break-after\":{\"syntax\":\"auto | always | avoid | left | right | recto | verso\",\"media\":[\"visual\",\"paged\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Pages\"],\"initial\":\"auto\",\"appliesto\":\"blockElementsInNormalFlow\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/page-break-after\"},\"page-break-before\":{\"syntax\":\"auto | always | avoid | left | right | recto | verso\",\"media\":[\"visual\",\"paged\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Pages\"],\"initial\":\"auto\",\"appliesto\":\"blockElementsInNormalFlow\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/page-break-before\"},\"page-break-inside\":{\"syntax\":\"auto | avoid\",\"media\":[\"visual\",\"paged\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Pages\"],\"initial\":\"auto\",\"appliesto\":\"blockElementsInNormalFlow\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/page-break-inside\"},\"paint-order\":{\"syntax\":\"normal | [ fill || stroke || markers ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"textElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/paint-order\"},\"perspective\":{\"syntax\":\"none | <length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"absoluteLengthOrNone\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/perspective\"},\"perspective-origin\":{\"syntax\":\"<position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpc\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"50% 50%\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"oneOrTwoValuesLengthAbsoluteKeywordsPercentages\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/perspective-origin\"},\"place-content\":{\"syntax\":\"<'align-content'> <'justify-content'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"multilineFlexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/place-content\"},\"place-items\":{\"syntax\":\"<'align-items'> <'justify-items'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":[\"align-items\",\"justify-items\"],\"appliesto\":\"allElements\",\"computed\":[\"align-items\",\"justify-items\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/place-items\"},\"place-self\":{\"syntax\":\"<'align-self'> <'justify-self'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":[\"align-self\",\"justify-self\"],\"appliesto\":\"blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems\",\"computed\":[\"align-self\",\"justify-self\"],\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/place-self\"},\"pointer-events\":{\"syntax\":\"auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Pointer Events\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/pointer-events\"},\"position\":{\"syntax\":\"static | relative | absolute | sticky | fixed\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"static\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/position\"},\"quotes\":{\"syntax\":\"none | auto | [ <string> <string> ]+\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Generated Content\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/quotes\"},\"resize\":{\"syntax\":\"none | both | horizontal | vertical | block | inline\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"none\",\"appliesto\":\"elementsWithOverflowNotVisibleAndReplacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/resize\"},\"right\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/right\"},\"rotate\":{\"syntax\":\"none | <angle> | [ x | y | z | <number>{3} ] && <angle>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/rotate\"},\"row-gap\":{\"syntax\":\"normal | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"multiColumnElementsFlexContainersGridContainers\",\"computed\":\"asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/row-gap\"},\"ruby-align\":{\"syntax\":\"start | center | space-between | space-around\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Ruby\"],\"initial\":\"space-around\",\"appliesto\":\"rubyBasesAnnotationsBaseAnnotationContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/ruby-align\"},\"ruby-merge\":{\"syntax\":\"separate | collapse | auto\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Ruby\"],\"initial\":\"separate\",\"appliesto\":\"rubyAnnotationsContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"ruby-position\":{\"syntax\":\"over | under | inter-character\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Ruby\"],\"initial\":\"over\",\"appliesto\":\"rubyAnnotationsContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/ruby-position\"},\"scale\":{\"syntax\":\"none | <number>{1,3}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scale\"},\"scrollbar-color\":{\"syntax\":\"auto | dark | light | <color>{2}\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Scrollbars\"],\"initial\":\"auto\",\"appliesto\":\"scrollingBoxes\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scrollbar-color\"},\"scrollbar-gutter\":{\"syntax\":\"auto | [ stable | always ] && both? && force?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scrollbar-gutter\"},\"scrollbar-width\":{\"syntax\":\"auto | thin | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scrollbars\"],\"initial\":\"auto\",\"appliesto\":\"scrollingBoxes\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scrollbar-width\"},\"scroll-behavior\":{\"syntax\":\"auto | smooth\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSSOM View\"],\"initial\":\"auto\",\"appliesto\":\"scrollingBoxes\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-behavior\"},\"scroll-margin\":{\"syntax\":\"<length>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin\"},\"scroll-margin-block\":{\"syntax\":\"<length>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block\"},\"scroll-margin-block-start\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-start\"},\"scroll-margin-block-end\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-block-end\"},\"scroll-margin-bottom\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-bottom\"},\"scroll-margin-inline\":{\"syntax\":\"<length>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline\"},\"scroll-margin-inline-start\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-start\"},\"scroll-margin-inline-end\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-inline-end\"},\"scroll-margin-left\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-left\"},\"scroll-margin-right\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-right\"},\"scroll-margin-top\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-margin-top\"},\"scroll-padding\":{\"syntax\":\"[ auto | <length-percentage> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding\"},\"scroll-padding-block\":{\"syntax\":\"[ auto | <length-percentage> ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block\"},\"scroll-padding-block-start\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-start\"},\"scroll-padding-block-end\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-block-end\"},\"scroll-padding-bottom\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-bottom\"},\"scroll-padding-inline\":{\"syntax\":\"[ auto | <length-percentage> ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline\"},\"scroll-padding-inline-start\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-start\"},\"scroll-padding-inline-end\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-inline-end\"},\"scroll-padding-left\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-left\"},\"scroll-padding-right\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-right\"},\"scroll-padding-top\":{\"syntax\":\"auto | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"relativeToTheScrollContainersScrollport\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"auto\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-padding-top\"},\"scroll-snap-align\":{\"syntax\":\"[ none | start | end | center ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-align\"},\"scroll-snap-coordinate\":{\"syntax\":\"none | <position>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"referToBorderBox\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate\"},\"scroll-snap-destination\":{\"syntax\":\"<position>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"relativeToScrollContainerPaddingBoxAxis\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0px 0px\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination\"},\"scroll-snap-points-x\":{\"syntax\":\"none | repeat( <length-percentage> )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToScrollContainerPaddingBoxAxis\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x\"},\"scroll-snap-points-y\":{\"syntax\":\"none | repeat( <length-percentage> )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToScrollContainerPaddingBoxAxis\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y\"},\"scroll-snap-stop\":{\"syntax\":\"normal | always\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-stop\"},\"scroll-snap-type\":{\"syntax\":\"none | [ x | y | block | inline | both ] [ mandatory | proximity ]?\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type\"},\"scroll-snap-type-x\":{\"syntax\":\"none | mandatory | proximity\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x\"},\"scroll-snap-type-y\":{\"syntax\":\"none | mandatory | proximity\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y\"},\"shape-image-threshold\":{\"syntax\":\"<alpha-value>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Shapes\"],\"initial\":\"0.0\",\"appliesto\":\"floats\",\"computed\":\"specifiedValueNumberClipped0To1\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/shape-image-threshold\"},\"shape-margin\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Shapes\"],\"initial\":\"0\",\"appliesto\":\"floats\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/shape-margin\"},\"shape-outside\":{\"syntax\":\"none | <shape-box> || <basic-shape> | <image>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"basicShapeOtherwiseNo\",\"percentages\":\"no\",\"groups\":[\"CSS Shapes\"],\"initial\":\"none\",\"appliesto\":\"floats\",\"computed\":\"asDefinedForBasicShapeWithAbsoluteURIOtherwiseAsSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/shape-outside\"},\"tab-size\":{\"syntax\":\"<integer> | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"8\",\"appliesto\":\"blockContainers\",\"computed\":\"specifiedIntegerOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/tab-size\"},\"table-layout\":{\"syntax\":\"auto | fixed\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"auto\",\"appliesto\":\"tableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/table-layout\"},\"text-align\":{\"syntax\":\"start | end | left | right | center | justify | match-parent\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"startOrNamelessValueIfLTRRightIfRTL\",\"appliesto\":\"blockContainers\",\"computed\":\"asSpecifiedExceptMatchParent\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-align\"},\"text-align-last\":{\"syntax\":\"auto | start | end | left | right | center | justify\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"auto\",\"appliesto\":\"blockContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-align-last\"},\"text-combine-upright\":{\"syntax\":\"none | all | [ digits <integer>? ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"notAnimatable\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedInlineElements\",\"computed\":\"keywordPlusIntegerIfDigits\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-combine-upright\"},\"text-decoration\":{\"syntax\":\"<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'> || <'text-decoration-thickness'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"text-decoration-color\",\"text-decoration-style\",\"text-decoration-line\",\"text-decoration-thickness\"],\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":[\"text-decoration-color\",\"text-decoration-style\",\"text-decoration-line\"],\"appliesto\":\"allElements\",\"computed\":[\"text-decoration-line\",\"text-decoration-style\",\"text-decoration-color\",\"text-decoration-thickness\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration\"},\"text-decoration-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration-color\"},\"text-decoration-line\":{\"syntax\":\"none | [ underline || overline || line-through || blink ] | spelling-error | grammar-error\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration-line\"},\"text-decoration-skip\":{\"syntax\":\"none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"objects\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip\"},\"text-decoration-skip-ink\":{\"syntax\":\"auto | all | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration-skip-ink\"},\"text-decoration-style\":{\"syntax\":\"solid | double | dotted | dashed | wavy\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"solid\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration-style\"},\"text-decoration-thickness\":{\"syntax\":\"auto | from-font | <length> | <percentage> \",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"byComputedValueType\",\"percentages\":\"referToElementFontSize\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-decoration-thickness\"},\"text-emphasis\":{\"syntax\":\"<'text-emphasis-style'> || <'text-emphasis-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"text-emphasis-color\",\"text-emphasis-style\"],\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":[\"text-emphasis-style\",\"text-emphasis-color\"],\"appliesto\":\"allElements\",\"computed\":[\"text-emphasis-style\",\"text-emphasis-color\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-emphasis\"},\"text-emphasis-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-emphasis-color\"},\"text-emphasis-position\":{\"syntax\":\"[ over | under ] && [ right | left ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"over right\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-emphasis-position\"},\"text-emphasis-style\":{\"syntax\":\"none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-emphasis-style\"},\"text-indent\":{\"syntax\":\"<length-percentage> && hanging? && each-line?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Text\"],\"initial\":\"0\",\"appliesto\":\"blockContainers\",\"computed\":\"percentageOrAbsoluteLengthPlusKeywords\",\"order\":\"lengthOrPercentageBeforeKeywords\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-indent\"},\"text-justify\":{\"syntax\":\"auto | inter-character | inter-word | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"auto\",\"appliesto\":\"inlineLevelAndTableCellElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-justify\"},\"text-orientation\":{\"syntax\":\"mixed | upright | sideways\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"mixed\",\"appliesto\":\"allElementsExceptTableRowGroupsRowsColumnGroupsAndColumns\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-orientation\"},\"text-overflow\":{\"syntax\":\"[ clip | ellipsis | <string> ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"clip\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-overflow\"},\"text-rendering\":{\"syntax\":\"auto | optimizeSpeed | optimizeLegibility | geometricPrecision\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Miscellaneous\"],\"initial\":\"auto\",\"appliesto\":\"textElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-rendering\"},\"text-shadow\":{\"syntax\":\"none | <shadow-t>#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"shadowList\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"colorPlusThreeAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-shadow\"},\"text-size-adjust\":{\"syntax\":\"none | auto | <percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfFont\",\"groups\":[\"CSS Text\"],\"initial\":\"autoForSmartphoneBrowsersSupportingInflation\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-size-adjust\"},\"text-transform\":{\"syntax\":\"none | capitalize | uppercase | lowercase | full-width | full-size-kana\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-transform\"},\"text-underline-offset\":{\"syntax\":\"auto | <length> | <percentage> \",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"byComputedValueType\",\"percentages\":\"referToElementFontSize\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-underline-offset\"},\"text-underline-position\":{\"syntax\":\"auto | from-font | [ under || [ left | right ] ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/text-underline-position\"},\"top\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToContainingBlockHeight\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/top\"},\"touch-action\":{\"syntax\":\"auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Pointer Events\"],\"initial\":\"auto\",\"appliesto\":\"allElementsExceptNonReplacedInlineElementsTableRowsColumnsRowColumnGroups\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/touch-action\"},\"transform\":{\"syntax\":\"none | <transform-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transform\"},\"transform-box\":{\"syntax\":\"content-box | border-box | fill-box | stroke-box | view-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"view-box\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transform-box\"},\"transform-origin\":{\"syntax\":\"[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpc\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"50% 50% 0\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"oneOrTwoValuesLengthAbsoluteKeywordsPercentages\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transform-origin\"},\"transform-style\":{\"syntax\":\"flat | preserve-3d\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"flat\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transform-style\"},\"transition\":{\"syntax\":\"<single-transition>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":[\"transition-delay\",\"transition-duration\",\"transition-property\",\"transition-timing-function\"],\"appliesto\":\"allElementsAndPseudos\",\"computed\":[\"transition-delay\",\"transition-duration\",\"transition-property\",\"transition-timing-function\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transition\"},\"transition-delay\":{\"syntax\":\"<time>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transition-delay\"},\"transition-duration\":{\"syntax\":\"<time>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transition-duration\"},\"transition-property\":{\"syntax\":\"none | <single-transition-property>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"all\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transition-property\"},\"transition-timing-function\":{\"syntax\":\"<timing-function>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"ease\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/transition-timing-function\"},\"translate\":{\"syntax\":\"none | <length-percentage> [ <length-percentage> <length>? ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/translate\"},\"unicode-bidi\":{\"syntax\":\"normal | embed | isolate | bidi-override | isolate-override | plaintext\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"normal\",\"appliesto\":\"allElementsSomeValuesNoEffectOnNonInlineElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/unicode-bidi\"},\"user-select\":{\"syntax\":\"auto | text | none | contain | all\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/user-select\"},\"vertical-align\":{\"syntax\":\"baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToLineHeight\",\"groups\":[\"CSS Table\"],\"initial\":\"baseline\",\"appliesto\":\"inlineLevelAndTableCellElements\",\"computed\":\"absoluteLengthOrKeyword\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/vertical-align\"},\"visibility\":{\"syntax\":\"visible | hidden | collapse\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"visibility\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"visible\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/visibility\"},\"white-space\":{\"syntax\":\"normal | pre | nowrap | pre-wrap | pre-line | break-spaces\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/white-space\"},\"widows\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"2\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/widows\"},\"width\":{\"syntax\":\"auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"allElementsButNonReplacedAndTableRows\",\"computed\":\"percentageAutoOrAbsoluteLength\",\"order\":\"lengthOrPercentageBeforeKeywordIfBothPresent\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/width\"},\"will-change\":{\"syntax\":\"auto | <animateable-feature>#\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Will Change\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/will-change\"},\"word-break\":{\"syntax\":\"normal | break-all | keep-all | break-word\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/word-break\"},\"word-spacing\":{\"syntax\":\"normal | <length-percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"referToWidthOfAffectedGlyph\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"optimumMinAndMaxValueOfAbsoluteLengthPercentageOrNormal\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/word-spacing\"},\"word-wrap\":{\"syntax\":\"normal | break-word\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"nonReplacedInlineElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/overflow-wrap\"},\"writing-mode\":{\"syntax\":\"horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"horizontal-tb\",\"appliesto\":\"allElementsExceptTableRowColumnGroupsTableRowsColumns\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/writing-mode\"},\"z-index\":{\"syntax\":\"auto | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/z-index\"},\"zoom\":{\"syntax\":\"normal | reset | <number> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\",\"mdn_url\":\"https://developer.mozilla.org/docs/Web/CSS/zoom\"}}");

/***/ }),

/***/ "./node_modules/mdn-data/css/syntaxes.json":
/*!*************************************************!*\
  !*** ./node_modules/mdn-data/css/syntaxes.json ***!
  \*************************************************/
/*! exports provided: absolute-size, alpha-value, angle-percentage, angular-color-hint, angular-color-stop, angular-color-stop-list, animateable-feature, attachment, attr(), attr-matcher, attr-modifier, attribute-selector, auto-repeat, auto-track-list, baseline-position, basic-shape, bg-image, bg-layer, bg-position, bg-size, blur(), blend-mode, box, brightness(), calc(), calc-sum, calc-product, calc-value, cf-final-image, cf-mixing-image, circle(), clamp(), class-selector, clip-source, color, color-stop, color-stop-angle, color-stop-length, color-stop-list, combinator, common-lig-values, compat-auto, composite-style, compositing-operator, compound-selector, compound-selector-list, complex-selector, complex-selector-list, conic-gradient(), contextual-alt-values, content-distribution, content-list, content-position, content-replacement, contrast(), counter(), counter-style, counter-style-name, counters(), cross-fade(), cubic-bezier-timing-function, deprecated-system-color, discretionary-lig-values, display-box, display-inside, display-internal, display-legacy, display-listitem, display-outside, drop-shadow(), east-asian-variant-values, east-asian-width-values, element(), ellipse(), ending-shape, env(), explicit-track-list, family-name, feature-tag-value, feature-type, feature-value-block, feature-value-block-list, feature-value-declaration, feature-value-declaration-list, feature-value-name, fill-rule, filter-function, filter-function-list, final-bg-layer, fit-content(), fixed-breadth, fixed-repeat, fixed-size, font-stretch-absolute, font-variant-css21, font-weight-absolute, frequency-percentage, general-enclosed, generic-family, generic-name, geometry-box, gradient, grayscale(), grid-line, historical-lig-values, hsl(), hsla(), hue, hue-rotate(), id-selector, image, image(), image-set(), image-set-option, image-src, image-tags, inflexible-breadth, inset(), invert(), keyframes-name, keyframe-block, keyframe-block-list, keyframe-selector, leader(), leader-type, length-percentage, line-names, line-name-list, line-style, line-width, linear-color-hint, linear-color-stop, linear-gradient(), mask-layer, mask-position, mask-reference, mask-source, masking-mode, matrix(), matrix3d(), max(), media-and, media-condition, media-condition-without-or, media-feature, media-in-parens, media-not, media-or, media-query, media-query-list, media-type, mf-boolean, mf-name, mf-plain, mf-range, mf-value, min(), minmax(), named-color, namespace-prefix, ns-prefix, number-percentage, numeric-figure-values, numeric-fraction-values, numeric-spacing-values, nth, opacity(), overflow-position, outline-radius, page-body, page-margin-box, page-margin-box-type, page-selector-list, page-selector, path(), paint(), perspective(), polygon(), position, pseudo-class-selector, pseudo-element-selector, pseudo-page, quote, radial-gradient(), relative-selector, relative-selector-list, relative-size, repeat-style, repeating-linear-gradient(), repeating-radial-gradient(), rgb(), rgba(), rotate(), rotate3d(), rotateX(), rotateY(), rotateZ(), saturate(), scale(), scale3d(), scaleX(), scaleY(), scaleZ(), self-position, shape-radius, skew(), skewX(), skewY(), sepia(), shadow, shadow-t, shape, shape-box, side-or-corner, single-animation, single-animation-direction, single-animation-fill-mode, single-animation-iteration-count, single-animation-play-state, single-transition, single-transition-property, size, step-position, step-timing-function, subclass-selector, supports-condition, supports-in-parens, supports-feature, supports-decl, supports-selector-fn, symbol, target, target-counter(), target-counters(), target-text(), time-percentage, timing-function, track-breadth, track-list, track-repeat, track-size, transform-function, transform-list, translate(), translate3d(), translateX(), translateY(), translateZ(), type-or-unit, type-selector, var(), viewport-length, wq-name, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"absolute-size\":{\"syntax\":\"xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large\"},\"alpha-value\":{\"syntax\":\"<number> | <percentage>\"},\"angle-percentage\":{\"syntax\":\"<angle> | <percentage>\"},\"angular-color-hint\":{\"syntax\":\"<angle-percentage>\"},\"angular-color-stop\":{\"syntax\":\"<color> && <color-stop-angle>?\"},\"angular-color-stop-list\":{\"syntax\":\"[ <angular-color-stop> [, <angular-color-hint>]? ]# , <angular-color-stop>\"},\"animateable-feature\":{\"syntax\":\"scroll-position | contents | <custom-ident>\"},\"attachment\":{\"syntax\":\"scroll | fixed | local\"},\"attr()\":{\"syntax\":\"attr( <attr-name> <type-or-unit>? [, <attr-fallback> ]? )\"},\"attr-matcher\":{\"syntax\":\"[ '~' | '|' | '^' | '$' | '*' ]? '='\"},\"attr-modifier\":{\"syntax\":\"i | s\"},\"attribute-selector\":{\"syntax\":\"'[' <wq-name> ']' | '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'\"},\"auto-repeat\":{\"syntax\":\"repeat( [ auto-fill | auto-fit ] , [ <line-names>? <fixed-size> ]+ <line-names>? )\"},\"auto-track-list\":{\"syntax\":\"[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat>\\n[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?\"},\"baseline-position\":{\"syntax\":\"[ first | last ]? baseline\"},\"basic-shape\":{\"syntax\":\"<inset()> | <circle()> | <ellipse()> | <polygon()> | <path()>\"},\"bg-image\":{\"syntax\":\"none | <image>\"},\"bg-layer\":{\"syntax\":\"<bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>\"},\"bg-position\":{\"syntax\":\"[ [ left | center | right | top | bottom | <length-percentage> ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] | [ center | [ left | right ] <length-percentage>? ] && [ center | [ top | bottom ] <length-percentage>? ] ]\"},\"bg-size\":{\"syntax\":\"[ <length-percentage> | auto ]{1,2} | cover | contain\"},\"blur()\":{\"syntax\":\"blur( <length> )\"},\"blend-mode\":{\"syntax\":\"normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity\"},\"box\":{\"syntax\":\"border-box | padding-box | content-box\"},\"brightness()\":{\"syntax\":\"brightness( <number-percentage> )\"},\"calc()\":{\"syntax\":\"calc( <calc-sum> )\"},\"calc-sum\":{\"syntax\":\"<calc-product> [ [ '+' | '-' ] <calc-product> ]*\"},\"calc-product\":{\"syntax\":\"<calc-value> [ '*' <calc-value> | '/' <number> ]*\"},\"calc-value\":{\"syntax\":\"<number> | <dimension> | <percentage> | ( <calc-sum> )\"},\"cf-final-image\":{\"syntax\":\"<image> | <color>\"},\"cf-mixing-image\":{\"syntax\":\"<percentage>? && <image>\"},\"circle()\":{\"syntax\":\"circle( [ <shape-radius> ]? [ at <position> ]? )\"},\"clamp()\":{\"syntax\":\"clamp( <calc-sum>#{3} )\"},\"class-selector\":{\"syntax\":\"'.' <ident-token>\"},\"clip-source\":{\"syntax\":\"<url>\"},\"color\":{\"syntax\":\"<rgb()> | <rgba()> | <hsl()> | <hsla()> | <hex-color> | <named-color> | currentcolor | <deprecated-system-color>\"},\"color-stop\":{\"syntax\":\"<color-stop-length> | <color-stop-angle>\"},\"color-stop-angle\":{\"syntax\":\"<angle-percentage>{1,2}\"},\"color-stop-length\":{\"syntax\":\"<length-percentage>{1,2}\"},\"color-stop-list\":{\"syntax\":\"[ <linear-color-stop> [, <linear-color-hint>]? ]# , <linear-color-stop>\"},\"combinator\":{\"syntax\":\"'>' | '+' | '~' | [ '||' ]\"},\"common-lig-values\":{\"syntax\":\"[ common-ligatures | no-common-ligatures ]\"},\"compat-auto\":{\"syntax\":\"searchfield | textarea | push-button | slider-horizontal | checkbox | radio | square-button | menulist | listbox | meter | progress-bar | button\"},\"composite-style\":{\"syntax\":\"clear | copy | source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | xor\"},\"compositing-operator\":{\"syntax\":\"add | subtract | intersect | exclude\"},\"compound-selector\":{\"syntax\":\"[ <type-selector>? <subclass-selector>* [ <pseudo-element-selector> <pseudo-class-selector>* ]* ]!\"},\"compound-selector-list\":{\"syntax\":\"<compound-selector>#\"},\"complex-selector\":{\"syntax\":\"<compound-selector> [ <combinator>? <compound-selector> ]*\"},\"complex-selector-list\":{\"syntax\":\"<complex-selector>#\"},\"conic-gradient()\":{\"syntax\":\"conic-gradient( [ from <angle> ]? [ at <position> ]?, <angular-color-stop-list> )\"},\"contextual-alt-values\":{\"syntax\":\"[ contextual | no-contextual ]\"},\"content-distribution\":{\"syntax\":\"space-between | space-around | space-evenly | stretch\"},\"content-list\":{\"syntax\":\"[ <string> | contents | <image> | <quote> | <target> | <leader()> ]+\"},\"content-position\":{\"syntax\":\"center | start | end | flex-start | flex-end\"},\"content-replacement\":{\"syntax\":\"<image>\"},\"contrast()\":{\"syntax\":\"contrast( [ <number-percentage> ] )\"},\"counter()\":{\"syntax\":\"counter( <custom-ident>, <counter-style>? )\"},\"counter-style\":{\"syntax\":\"<counter-style-name> | symbols()\"},\"counter-style-name\":{\"syntax\":\"<custom-ident>\"},\"counters()\":{\"syntax\":\"counters( <custom-ident>, <string>, <counter-style>? )\"},\"cross-fade()\":{\"syntax\":\"cross-fade( <cf-mixing-image> , <cf-final-image>? )\"},\"cubic-bezier-timing-function\":{\"syntax\":\"ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number [0,1]>, <number>, <number [0,1]>, <number>)\"},\"deprecated-system-color\":{\"syntax\":\"ActiveBorder | ActiveCaption | AppWorkspace | Background | ButtonFace | ButtonHighlight | ButtonShadow | ButtonText | CaptionText | GrayText | Highlight | HighlightText | InactiveBorder | InactiveCaption | InactiveCaptionText | InfoBackground | InfoText | Menu | MenuText | Scrollbar | ThreeDDarkShadow | ThreeDFace | ThreeDHighlight | ThreeDLightShadow | ThreeDShadow | Window | WindowFrame | WindowText\"},\"discretionary-lig-values\":{\"syntax\":\"[ discretionary-ligatures | no-discretionary-ligatures ]\"},\"display-box\":{\"syntax\":\"contents | none\"},\"display-inside\":{\"syntax\":\"flow | flow-root | table | flex | grid | ruby\"},\"display-internal\":{\"syntax\":\"table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container\"},\"display-legacy\":{\"syntax\":\"inline-block | inline-list-item | inline-table | inline-flex | inline-grid\"},\"display-listitem\":{\"syntax\":\"<display-outside>? && [ flow | flow-root ]? && list-item\"},\"display-outside\":{\"syntax\":\"block | inline | run-in\"},\"drop-shadow()\":{\"syntax\":\"drop-shadow( <length>{2,3} <color>? )\"},\"east-asian-variant-values\":{\"syntax\":\"[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]\"},\"east-asian-width-values\":{\"syntax\":\"[ full-width | proportional-width ]\"},\"element()\":{\"syntax\":\"element( <id-selector> )\"},\"ellipse()\":{\"syntax\":\"ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )\"},\"ending-shape\":{\"syntax\":\"circle | ellipse\"},\"env()\":{\"syntax\":\"env( <custom-ident> , <declaration-value>? )\"},\"explicit-track-list\":{\"syntax\":\"[ <line-names>? <track-size> ]+ <line-names>?\"},\"family-name\":{\"syntax\":\"<string> | <custom-ident>+\"},\"feature-tag-value\":{\"syntax\":\"<string> [ <integer> | on | off ]?\"},\"feature-type\":{\"syntax\":\"@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation\"},\"feature-value-block\":{\"syntax\":\"<feature-type> '{' <feature-value-declaration-list> '}'\"},\"feature-value-block-list\":{\"syntax\":\"<feature-value-block>+\"},\"feature-value-declaration\":{\"syntax\":\"<custom-ident>: <integer>+;\"},\"feature-value-declaration-list\":{\"syntax\":\"<feature-value-declaration>\"},\"feature-value-name\":{\"syntax\":\"<custom-ident>\"},\"fill-rule\":{\"syntax\":\"nonzero | evenodd\"},\"filter-function\":{\"syntax\":\"<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <saturate()> | <sepia()>\"},\"filter-function-list\":{\"syntax\":\"[ <filter-function> | <url> ]+\"},\"final-bg-layer\":{\"syntax\":\"<'background-color'> || <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>\"},\"fit-content()\":{\"syntax\":\"fit-content( [ <length> | <percentage> ] )\"},\"fixed-breadth\":{\"syntax\":\"<length-percentage>\"},\"fixed-repeat\":{\"syntax\":\"repeat( [ <positive-integer> ] , [ <line-names>? <fixed-size> ]+ <line-names>? )\"},\"fixed-size\":{\"syntax\":\"<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )\"},\"font-stretch-absolute\":{\"syntax\":\"normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>\"},\"font-variant-css21\":{\"syntax\":\"[ normal | small-caps ]\"},\"font-weight-absolute\":{\"syntax\":\"normal | bold | <number [1,1000]>\"},\"frequency-percentage\":{\"syntax\":\"<frequency> | <percentage>\"},\"general-enclosed\":{\"syntax\":\"[ <function-token> <any-value> ) ] | ( <ident> <any-value> )\"},\"generic-family\":{\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace\"},\"generic-name\":{\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace\"},\"geometry-box\":{\"syntax\":\"<shape-box> | fill-box | stroke-box | view-box\"},\"gradient\":{\"syntax\":\"<linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()> | <conic-gradient()>\"},\"grayscale()\":{\"syntax\":\"grayscale( <number-percentage> )\"},\"grid-line\":{\"syntax\":\"auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]\"},\"historical-lig-values\":{\"syntax\":\"[ historical-ligatures | no-historical-ligatures ]\"},\"hsl()\":{\"syntax\":\"hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )\"},\"hsla()\":{\"syntax\":\"hsla( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsla( <hue>, <percentage>, <percentage>, <alpha-value>? )\"},\"hue\":{\"syntax\":\"<number> | <angle>\"},\"hue-rotate()\":{\"syntax\":\"hue-rotate( <angle> )\"},\"id-selector\":{\"syntax\":\"<hash-token>\"},\"image\":{\"syntax\":\"<url> | <image()> | <image-set()> | <element()> | <paint()> | <cross-fade()> | <gradient>\"},\"image()\":{\"syntax\":\"image( <image-tags>? [ <image-src>? , <color>? ]! )\"},\"image-set()\":{\"syntax\":\"image-set( <image-set-option># )\"},\"image-set-option\":{\"syntax\":\"[ <image> | <string> ] <resolution>\"},\"image-src\":{\"syntax\":\"<url> | <string>\"},\"image-tags\":{\"syntax\":\"ltr | rtl\"},\"inflexible-breadth\":{\"syntax\":\"<length> | <percentage> | min-content | max-content | auto\"},\"inset()\":{\"syntax\":\"inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )\"},\"invert()\":{\"syntax\":\"invert( <number-percentage> )\"},\"keyframes-name\":{\"syntax\":\"<custom-ident> | <string>\"},\"keyframe-block\":{\"syntax\":\"<keyframe-selector># {\\n  <declaration-list>\\n}\"},\"keyframe-block-list\":{\"syntax\":\"<keyframe-block>+\"},\"keyframe-selector\":{\"syntax\":\"from | to | <percentage>\"},\"leader()\":{\"syntax\":\"leader( <leader-type> )\"},\"leader-type\":{\"syntax\":\"dotted | solid | space | <string>\"},\"length-percentage\":{\"syntax\":\"<length> | <percentage>\"},\"line-names\":{\"syntax\":\"'[' <custom-ident>* ']'\"},\"line-name-list\":{\"syntax\":\"[ <line-names> | <name-repeat> ]+\"},\"line-style\":{\"syntax\":\"none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset\"},\"line-width\":{\"syntax\":\"<length> | thin | medium | thick\"},\"linear-color-hint\":{\"syntax\":\"<length-percentage>\"},\"linear-color-stop\":{\"syntax\":\"<color> <color-stop-length>?\"},\"linear-gradient()\":{\"syntax\":\"linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )\"},\"mask-layer\":{\"syntax\":\"<mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || <geometry-box> || [ <geometry-box> | no-clip ] || <compositing-operator> || <masking-mode>\"},\"mask-position\":{\"syntax\":\"[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?\"},\"mask-reference\":{\"syntax\":\"none | <image> | <mask-source>\"},\"mask-source\":{\"syntax\":\"<url>\"},\"masking-mode\":{\"syntax\":\"alpha | luminance | match-source\"},\"matrix()\":{\"syntax\":\"matrix( <number>#{6} )\"},\"matrix3d()\":{\"syntax\":\"matrix3d( <number>#{16} )\"},\"max()\":{\"syntax\":\"max( <calc-sum># )\"},\"media-and\":{\"syntax\":\"<media-in-parens> [ and <media-in-parens> ]+\"},\"media-condition\":{\"syntax\":\"<media-not> | <media-and> | <media-or> | <media-in-parens>\"},\"media-condition-without-or\":{\"syntax\":\"<media-not> | <media-and> | <media-in-parens>\"},\"media-feature\":{\"syntax\":\"( [ <mf-plain> | <mf-boolean> | <mf-range> ] )\"},\"media-in-parens\":{\"syntax\":\"( <media-condition> ) | <media-feature> | <general-enclosed>\"},\"media-not\":{\"syntax\":\"not <media-in-parens>\"},\"media-or\":{\"syntax\":\"<media-in-parens> [ or <media-in-parens> ]+\"},\"media-query\":{\"syntax\":\"<media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?\"},\"media-query-list\":{\"syntax\":\"<media-query>#\"},\"media-type\":{\"syntax\":\"<ident>\"},\"mf-boolean\":{\"syntax\":\"<mf-name>\"},\"mf-name\":{\"syntax\":\"<ident>\"},\"mf-plain\":{\"syntax\":\"<mf-name> : <mf-value>\"},\"mf-range\":{\"syntax\":\"<mf-name> [ '<' | '>' ]? '='? <mf-value>\\n| <mf-value> [ '<' | '>' ]? '='? <mf-name>\\n| <mf-value> '<' '='? <mf-name> '<' '='? <mf-value>\\n| <mf-value> '>' '='? <mf-name> '>' '='? <mf-value>\"},\"mf-value\":{\"syntax\":\"<number> | <dimension> | <ident> | <ratio>\"},\"min()\":{\"syntax\":\"min( <calc-sum># )\"},\"minmax()\":{\"syntax\":\"minmax( [ <length> | <percentage> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )\"},\"named-color\":{\"syntax\":\"transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen\"},\"namespace-prefix\":{\"syntax\":\"<ident>\"},\"ns-prefix\":{\"syntax\":\"[ <ident-token> | '*' ]? '|'\"},\"number-percentage\":{\"syntax\":\"<number> | <percentage>\"},\"numeric-figure-values\":{\"syntax\":\"[ lining-nums | oldstyle-nums ]\"},\"numeric-fraction-values\":{\"syntax\":\"[ diagonal-fractions | stacked-fractions ]\"},\"numeric-spacing-values\":{\"syntax\":\"[ proportional-nums | tabular-nums ]\"},\"nth\":{\"syntax\":\"<an-plus-b> | even | odd\"},\"opacity()\":{\"syntax\":\"opacity( [ <number-percentage> ] )\"},\"overflow-position\":{\"syntax\":\"unsafe | safe\"},\"outline-radius\":{\"syntax\":\"<length> | <percentage>\"},\"page-body\":{\"syntax\":\"<declaration>? [ ; <page-body> ]? | <page-margin-box> <page-body>\"},\"page-margin-box\":{\"syntax\":\"<page-margin-box-type> '{' <declaration-list> '}'\"},\"page-margin-box-type\":{\"syntax\":\"@top-left-corner | @top-left | @top-center | @top-right | @top-right-corner | @bottom-left-corner | @bottom-left | @bottom-center | @bottom-right | @bottom-right-corner | @left-top | @left-middle | @left-bottom | @right-top | @right-middle | @right-bottom\"},\"page-selector-list\":{\"syntax\":\"[ <page-selector># ]?\"},\"page-selector\":{\"syntax\":\"<pseudo-page>+ | <ident> <pseudo-page>*\"},\"path()\":{\"syntax\":\"path( [ <fill-rule>, ]? <string> )\"},\"paint()\":{\"syntax\":\"paint( <ident>, <declaration-value>? )\"},\"perspective()\":{\"syntax\":\"perspective( <length> )\"},\"polygon()\":{\"syntax\":\"polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )\"},\"position\":{\"syntax\":\"[ [ left | center | right ] || [ top | center | bottom ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]? | [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ] ]\"},\"pseudo-class-selector\":{\"syntax\":\"':' <ident-token> | ':' <function-token> <any-value> ')'\"},\"pseudo-element-selector\":{\"syntax\":\"':' <pseudo-class-selector>\"},\"pseudo-page\":{\"syntax\":\": [ left | right | first | blank ]\"},\"quote\":{\"syntax\":\"open-quote | close-quote | no-open-quote | no-close-quote\"},\"radial-gradient()\":{\"syntax\":\"radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )\"},\"relative-selector\":{\"syntax\":\"<combinator>? <complex-selector>\"},\"relative-selector-list\":{\"syntax\":\"<relative-selector>#\"},\"relative-size\":{\"syntax\":\"larger | smaller\"},\"repeat-style\":{\"syntax\":\"repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}\"},\"repeating-linear-gradient()\":{\"syntax\":\"repeating-linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )\"},\"repeating-radial-gradient()\":{\"syntax\":\"repeating-radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )\"},\"rgb()\":{\"syntax\":\"rgb( <percentage>{3} [ / <alpha-value> ]? ) | rgb( <number>{3} [ / <alpha-value> ]? ) | rgb( <percentage>#{3} , <alpha-value>? ) | rgb( <number>#{3} , <alpha-value>? )\"},\"rgba()\":{\"syntax\":\"rgba( <percentage>{3} [ / <alpha-value> ]? ) | rgba( <number>{3} [ / <alpha-value> ]? ) | rgba( <percentage>#{3} , <alpha-value>? ) | rgba( <number>#{3} , <alpha-value>? )\"},\"rotate()\":{\"syntax\":\"rotate( [ <angle> | <zero> ] )\"},\"rotate3d()\":{\"syntax\":\"rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )\"},\"rotateX()\":{\"syntax\":\"rotateX( [ <angle> | <zero> ] )\"},\"rotateY()\":{\"syntax\":\"rotateY( [ <angle> | <zero> ] )\"},\"rotateZ()\":{\"syntax\":\"rotateZ( [ <angle> | <zero> ] )\"},\"saturate()\":{\"syntax\":\"saturate( <number-percentage> )\"},\"scale()\":{\"syntax\":\"scale( <number> , <number>? )\"},\"scale3d()\":{\"syntax\":\"scale3d( <number> , <number> , <number> )\"},\"scaleX()\":{\"syntax\":\"scaleX( <number> )\"},\"scaleY()\":{\"syntax\":\"scaleY( <number> )\"},\"scaleZ()\":{\"syntax\":\"scaleZ( <number> )\"},\"self-position\":{\"syntax\":\"center | start | end | self-start | self-end | flex-start | flex-end\"},\"shape-radius\":{\"syntax\":\"<length-percentage> | closest-side | farthest-side\"},\"skew()\":{\"syntax\":\"skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )\"},\"skewX()\":{\"syntax\":\"skewX( [ <angle> | <zero> ] )\"},\"skewY()\":{\"syntax\":\"skewY( [ <angle> | <zero> ] )\"},\"sepia()\":{\"syntax\":\"sepia( <number-percentage> )\"},\"shadow\":{\"syntax\":\"inset? && <length>{2,4} && <color>?\"},\"shadow-t\":{\"syntax\":\"[ <length>{2,3} && <color>? ]\"},\"shape\":{\"syntax\":\"rect(<top>, <right>, <bottom>, <left>)\"},\"shape-box\":{\"syntax\":\"<box> | margin-box\"},\"side-or-corner\":{\"syntax\":\"[ left | right ] || [ top | bottom ]\"},\"single-animation\":{\"syntax\":\"<time> || <timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]\"},\"single-animation-direction\":{\"syntax\":\"normal | reverse | alternate | alternate-reverse\"},\"single-animation-fill-mode\":{\"syntax\":\"none | forwards | backwards | both\"},\"single-animation-iteration-count\":{\"syntax\":\"infinite | <number>\"},\"single-animation-play-state\":{\"syntax\":\"running | paused\"},\"single-transition\":{\"syntax\":\"[ none | <single-transition-property> ] || <time> || <timing-function> || <time>\"},\"single-transition-property\":{\"syntax\":\"all | <custom-ident>\"},\"size\":{\"syntax\":\"closest-side | farthest-side | closest-corner | farthest-corner | <length> | <length-percentage>{2}\"},\"step-position\":{\"syntax\":\"jump-start | jump-end | jump-none | jump-both | start | end\"},\"step-timing-function\":{\"syntax\":\"step-start | step-end | steps(<integer>[, <step-position>]?)\"},\"subclass-selector\":{\"syntax\":\"<id-selector> | <class-selector> | <attribute-selector> | <pseudo-class-selector>\"},\"supports-condition\":{\"syntax\":\"not <supports-in-parens> | <supports-in-parens> [ and <supports-in-parens> ]* | <supports-in-parens> [ or <supports-in-parens> ]*\"},\"supports-in-parens\":{\"syntax\":\"( <supports-condition> ) | <supports-feature> | <general-enclosed>\"},\"supports-feature\":{\"syntax\":\"<supports-decl> | <supports-selector-fn>\"},\"supports-decl\":{\"syntax\":\"( <declaration> )\"},\"supports-selector-fn\":{\"syntax\":\"selector( <complex-selector> )\"},\"symbol\":{\"syntax\":\"<string> | <image> | <custom-ident>\"},\"target\":{\"syntax\":\"<target-counter()> | <target-counters()> | <target-text()>\"},\"target-counter()\":{\"syntax\":\"target-counter( [ <string> | <url> ] , <custom-ident> , <counter-style>? )\"},\"target-counters()\":{\"syntax\":\"target-counters( [ <string> | <url> ] , <custom-ident> , <string> , <counter-style>? )\"},\"target-text()\":{\"syntax\":\"target-text( [ <string> | <url> ] , [ content | before | after | first-letter ]? )\"},\"time-percentage\":{\"syntax\":\"<time> | <percentage>\"},\"timing-function\":{\"syntax\":\"linear | <cubic-bezier-timing-function> | <step-timing-function>\"},\"track-breadth\":{\"syntax\":\"<length-percentage> | <flex> | min-content | max-content | auto\"},\"track-list\":{\"syntax\":\"[ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?\"},\"track-repeat\":{\"syntax\":\"repeat( [ <positive-integer> ] , [ <line-names>? <track-size> ]+ <line-names>? )\"},\"track-size\":{\"syntax\":\"<track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( [ <length> | <percentage> ] )\"},\"transform-function\":{\"syntax\":\"<matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()> | <scaleY()> | <rotate()> | <skew()> | <skewX()> | <skewY()> | <matrix3d()> | <translate3d()> | <translateZ()> | <scale3d()> | <scaleZ()> | <rotate3d()> | <rotateX()> | <rotateY()> | <rotateZ()> | <perspective()>\"},\"transform-list\":{\"syntax\":\"<transform-function>+\"},\"translate()\":{\"syntax\":\"translate( <length-percentage> , <length-percentage>? )\"},\"translate3d()\":{\"syntax\":\"translate3d( <length-percentage> , <length-percentage> , <length> )\"},\"translateX()\":{\"syntax\":\"translateX( <length-percentage> )\"},\"translateY()\":{\"syntax\":\"translateY( <length-percentage> )\"},\"translateZ()\":{\"syntax\":\"translateZ( <length> )\"},\"type-or-unit\":{\"syntax\":\"string | color | url | integer | number | length | angle | time | frequency | cap | ch | em | ex | ic | lh | rlh | rem | vb | vi | vw | vh | vmin | vmax | mm | Q | cm | in | pt | pc | px | deg | grad | rad | turn | ms | s | Hz | kHz | %\"},\"type-selector\":{\"syntax\":\"<wq-name> | <ns-prefix>? '*'\"},\"var()\":{\"syntax\":\"var( <custom-property-name> , <declaration-value>? )\"},\"viewport-length\":{\"syntax\":\"auto | <length-percentage>\"},\"wq-name\":{\"syntax\":\"<ns-prefix>? <ident-token>\"}}");

/***/ }),

/***/ "./node_modules/openai/dist/api.js":
/*!*****************************************!*\
  !*** ./node_modules/openai/dist/api.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIApi = exports.OpenAIApiFactory = exports.OpenAIApiFp = exports.OpenAIApiAxiosParamCreator = exports.CreateImageRequestResponseFormatEnum = exports.CreateImageRequestSizeEnum = exports.ChatCompletionResponseMessageRoleEnum = exports.ChatCompletionRequestMessageRoleEnum = void 0;
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
// Some imports not used depending on template conditions
// @ts-ignore
const common_1 = __webpack_require__(/*! ./common */ "./node_modules/openai/dist/common.js");
// @ts-ignore
const base_1 = __webpack_require__(/*! ./base */ "./node_modules/openai/dist/base.js");
exports.ChatCompletionRequestMessageRoleEnum = {
    System: 'system',
    User: 'user',
    Assistant: 'assistant'
};
exports.ChatCompletionResponseMessageRoleEnum = {
    System: 'system',
    User: 'user',
    Assistant: 'assistant'
};
exports.CreateImageRequestSizeEnum = {
    _256x256: '256x256',
    _512x512: '512x512',
    _1024x1024: '1024x1024'
};
exports.CreateImageRequestResponseFormatEnum = {
    Url: 'url',
    B64Json: 'b64_json'
};
/**
 * OpenAIApi - axios parameter creator
 * @export
 */
exports.OpenAIApiAxiosParamCreator = function (configuration) {
    return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune: (fineTuneId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'fineTuneId' is not null or undefined
            common_1.assertParamExists('cancelFineTune', 'fineTuneId', fineTuneId);
            const localVarPath = `/fine-tunes/{fine_tune_id}/cancel`
                .replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer: (createAnswerRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createAnswerRequest' is not null or undefined
            common_1.assertParamExists('createAnswer', 'createAnswerRequest', createAnswerRequest);
            const localVarPath = `/answers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createAnswerRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates a completion for the chat message
         * @param {CreateChatCompletionRequest} createChatCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createChatCompletion: (createChatCompletionRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createChatCompletionRequest' is not null or undefined
            common_1.assertParamExists('createChatCompletion', 'createChatCompletionRequest', createChatCompletionRequest);
            const localVarPath = `/chat/completions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createChatCompletionRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification: (createClassificationRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createClassificationRequest' is not null or undefined
            common_1.assertParamExists('createClassification', 'createClassificationRequest', createClassificationRequest);
            const localVarPath = `/classifications`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createClassificationRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion: (createCompletionRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createCompletionRequest' is not null or undefined
            common_1.assertParamExists('createCompletion', 'createCompletionRequest', createCompletionRequest);
            const localVarPath = `/completions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createCompletionRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters.
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit: (createEditRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createEditRequest' is not null or undefined
            common_1.assertParamExists('createEdit', 'createEditRequest', createEditRequest);
            const localVarPath = `/edits`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEditRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding: (createEmbeddingRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createEmbeddingRequest' is not null or undefined
            common_1.assertParamExists('createEmbedding', 'createEmbeddingRequest', createEmbeddingRequest);
            const localVarPath = `/embeddings`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createEmbeddingRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile: (file, purpose, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'file' is not null or undefined
            common_1.assertParamExists('createFile', 'file', file);
            // verify required parameter 'purpose' is not null or undefined
            common_1.assertParamExists('createFile', 'purpose', purpose);
            const localVarPath = `/files`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (file !== undefined) {
                localVarFormParams.append('file', file);
            }
            if (purpose !== undefined) {
                localVarFormParams.append('purpose', purpose);
            }
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune: (createFineTuneRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createFineTuneRequest' is not null or undefined
            common_1.assertParamExists('createFineTune', 'createFineTuneRequest', createFineTuneRequest);
            const localVarPath = `/fine-tunes`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createFineTuneRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates an image given a prompt.
         * @param {CreateImageRequest} createImageRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage: (createImageRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createImageRequest' is not null or undefined
            common_1.assertParamExists('createImage', 'createImageRequest', createImageRequest);
            const localVarPath = `/images/generations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createImageRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates an edited or extended image given an original image and a prompt.
         * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
         * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
         * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageEdit: (image, prompt, mask, n, size, responseFormat, user, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'image' is not null or undefined
            common_1.assertParamExists('createImageEdit', 'image', image);
            // verify required parameter 'prompt' is not null or undefined
            common_1.assertParamExists('createImageEdit', 'prompt', prompt);
            const localVarPath = `/images/edits`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (image !== undefined) {
                localVarFormParams.append('image', image);
            }
            if (mask !== undefined) {
                localVarFormParams.append('mask', mask);
            }
            if (prompt !== undefined) {
                localVarFormParams.append('prompt', prompt);
            }
            if (n !== undefined) {
                localVarFormParams.append('n', n);
            }
            if (size !== undefined) {
                localVarFormParams.append('size', size);
            }
            if (responseFormat !== undefined) {
                localVarFormParams.append('response_format', responseFormat);
            }
            if (user !== undefined) {
                localVarFormParams.append('user', user);
            }
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Creates a variation of a given image.
         * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageVariation: (image, n, size, responseFormat, user, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'image' is not null or undefined
            common_1.assertParamExists('createImageVariation', 'image', image);
            const localVarPath = `/images/variations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (image !== undefined) {
                localVarFormParams.append('image', image);
            }
            if (n !== undefined) {
                localVarFormParams.append('n', n);
            }
            if (size !== undefined) {
                localVarFormParams.append('size', size);
            }
            if (responseFormat !== undefined) {
                localVarFormParams.append('response_format', responseFormat);
            }
            if (user !== undefined) {
                localVarFormParams.append('user', user);
            }
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Classifies if text violates OpenAI\'s Content Policy
         * @param {CreateModerationRequest} createModerationRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModeration: (createModerationRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'createModerationRequest' is not null or undefined
            common_1.assertParamExists('createModeration', 'createModerationRequest', createModerationRequest);
            const localVarPath = `/moderations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createModerationRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch: (engineId, createSearchRequest, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'engineId' is not null or undefined
            common_1.assertParamExists('createSearch', 'engineId', engineId);
            // verify required parameter 'createSearchRequest' is not null or undefined
            common_1.assertParamExists('createSearch', 'createSearchRequest', createSearchRequest);
            const localVarPath = `/engines/{engine_id}/search`
                .replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = common_1.serializeDataIfNeeded(createSearchRequest, localVarRequestOptions, configuration);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Transcribes audio into the input language.
         * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranscription: (file, model, prompt, responseFormat, temperature, language, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'file' is not null or undefined
            common_1.assertParamExists('createTranscription', 'file', file);
            // verify required parameter 'model' is not null or undefined
            common_1.assertParamExists('createTranscription', 'model', model);
            const localVarPath = `/audio/transcriptions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (file !== undefined) {
                localVarFormParams.append('file', file);
            }
            if (model !== undefined) {
                localVarFormParams.append('model', model);
            }
            if (prompt !== undefined) {
                localVarFormParams.append('prompt', prompt);
            }
            if (responseFormat !== undefined) {
                localVarFormParams.append('response_format', responseFormat);
            }
            if (temperature !== undefined) {
                localVarFormParams.append('temperature', temperature);
            }
            if (language !== undefined) {
                localVarFormParams.append('language', language);
            }
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Translates audio into into English.
         * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranslation: (file, model, prompt, responseFormat, temperature, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'file' is not null or undefined
            common_1.assertParamExists('createTranslation', 'file', file);
            // verify required parameter 'model' is not null or undefined
            common_1.assertParamExists('createTranslation', 'model', model);
            const localVarPath = `/audio/translations`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'POST' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (file !== undefined) {
                localVarFormParams.append('file', file);
            }
            if (model !== undefined) {
                localVarFormParams.append('model', model);
            }
            if (prompt !== undefined) {
                localVarFormParams.append('prompt', prompt);
            }
            if (responseFormat !== undefined) {
                localVarFormParams.append('response_format', responseFormat);
            }
            if (temperature !== undefined) {
                localVarFormParams.append('temperature', temperature);
            }
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), localVarFormParams.getHeaders()), headersFromBaseOptions), options.headers);
            localVarRequestOptions.data = localVarFormParams;
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'fileId' is not null or undefined
            common_1.assertParamExists('deleteFile', 'fileId', fileId);
            const localVarPath = `/files/{file_id}`
                .replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel: (model, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'model' is not null or undefined
            common_1.assertParamExists('deleteModel', 'model', model);
            const localVarPath = `/models/{model}`
                .replace(`{${"model"}}`, encodeURIComponent(String(model)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'DELETE' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'fileId' is not null or undefined
            common_1.assertParamExists('downloadFile', 'fileId', fileId);
            const localVarPath = `/files/{file_id}/content`
                .replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/engines`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/files`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents: (fineTuneId, stream, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'fineTuneId' is not null or undefined
            common_1.assertParamExists('listFineTuneEvents', 'fineTuneId', fineTuneId);
            const localVarPath = `/fine-tunes/{fine_tune_id}/events`
                .replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (stream !== undefined) {
                localVarQueryParameter['stream'] = stream;
            }
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/fine-tunes`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels: (options = {}) => __awaiter(this, void 0, void 0, function* () {
            const localVarPath = `/models`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine: (engineId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'engineId' is not null or undefined
            common_1.assertParamExists('retrieveEngine', 'engineId', engineId);
            const localVarPath = `/engines/{engine_id}`
                .replace(`{${"engine_id"}}`, encodeURIComponent(String(engineId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile: (fileId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'fileId' is not null or undefined
            common_1.assertParamExists('retrieveFile', 'fileId', fileId);
            const localVarPath = `/files/{file_id}`
                .replace(`{${"file_id"}}`, encodeURIComponent(String(fileId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune: (fineTuneId, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'fineTuneId' is not null or undefined
            common_1.assertParamExists('retrieveFineTune', 'fineTuneId', fineTuneId);
            const localVarPath = `/fine-tunes/{fine_tune_id}`
                .replace(`{${"fine_tune_id"}}`, encodeURIComponent(String(fineTuneId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel: (model, options = {}) => __awaiter(this, void 0, void 0, function* () {
            // verify required parameter 'model' is not null or undefined
            common_1.assertParamExists('retrieveModel', 'model', model);
            const localVarPath = `/models/{model}`
                .replace(`{${"model"}}`, encodeURIComponent(String(model)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = Object.assign(Object.assign({ method: 'GET' }, baseOptions), options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            common_1.setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = Object.assign(Object.assign(Object.assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
            return {
                url: common_1.toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        }),
    };
};
/**
 * OpenAIApi - functional programming interface
 * @export
 */
exports.OpenAIApiFp = function (configuration) {
    const localVarAxiosParamCreator = exports.OpenAIApiAxiosParamCreator(configuration);
    return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune(fineTuneId, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.cancelFineTune(fineTuneId, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer(createAnswerRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createAnswer(createAnswerRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates a completion for the chat message
         * @param {CreateChatCompletionRequest} createChatCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createChatCompletion(createChatCompletionRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createChatCompletion(createChatCompletionRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification(createClassificationRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createClassification(createClassificationRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion(createCompletionRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createCompletion(createCompletionRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters.
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit(createEditRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createEdit(createEditRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding(createEmbeddingRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createEmbedding(createEmbeddingRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile(file, purpose, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createFile(file, purpose, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune(createFineTuneRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createFineTune(createFineTuneRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates an image given a prompt.
         * @param {CreateImageRequest} createImageRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage(createImageRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createImage(createImageRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates an edited or extended image given an original image and a prompt.
         * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
         * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
         * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Creates a variation of a given image.
         * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageVariation(image, n, size, responseFormat, user, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createImageVariation(image, n, size, responseFormat, user, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Classifies if text violates OpenAI\'s Content Policy
         * @param {CreateModerationRequest} createModerationRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModeration(createModerationRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createModeration(createModerationRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch(engineId, createSearchRequest, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createSearch(engineId, createSearchRequest, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Transcribes audio into the input language.
         * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranscription(file, model, prompt, responseFormat, temperature, language, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Translates audio into into English.
         * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranslation(file, model, prompt, responseFormat, temperature, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.createTranslation(file, model, prompt, responseFormat, temperature, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile(fileId, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteFile(fileId, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel(model, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.deleteModel(model, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile(fileId, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.downloadFile(fileId, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.listEngines(options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.listFiles(options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents(fineTuneId, stream, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTuneEvents(fineTuneId, stream, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.listFineTunes(options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.listModels(options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine(engineId, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveEngine(engineId, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile(fileId, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFile(fileId, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune(fineTuneId, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveFineTune(fineTuneId, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel(model, options) {
            return __awaiter(this, void 0, void 0, function* () {
                const localVarAxiosArgs = yield localVarAxiosParamCreator.retrieveModel(model, options);
                return common_1.createRequestFunction(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration);
            });
        },
    };
};
/**
 * OpenAIApi - factory interface
 * @export
 */
exports.OpenAIApiFactory = function (configuration, basePath, axios) {
    const localVarFp = exports.OpenAIApiFp(configuration);
    return {
        /**
         *
         * @summary Immediately cancel a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to cancel
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        cancelFineTune(fineTuneId, options) {
            return localVarFp.cancelFineTune(fineTuneId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
         * @param {CreateAnswerRequest} createAnswerRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAnswer(createAnswerRequest, options) {
            return localVarFp.createAnswer(createAnswerRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a completion for the chat message
         * @param {CreateChatCompletionRequest} createChatCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createChatCompletion(createChatCompletionRequest, options) {
            return localVarFp.createChatCompletion(createChatCompletionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
         * @param {CreateClassificationRequest} createClassificationRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createClassification(createClassificationRequest, options) {
            return localVarFp.createClassification(createClassificationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a completion for the provided prompt and parameters
         * @param {CreateCompletionRequest} createCompletionRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCompletion(createCompletionRequest, options) {
            return localVarFp.createCompletion(createCompletionRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a new edit for the provided input, instruction, and parameters.
         * @param {CreateEditRequest} createEditRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEdit(createEditRequest, options) {
            return localVarFp.createEdit(createEditRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates an embedding vector representing the input text.
         * @param {CreateEmbeddingRequest} createEmbeddingRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createEmbedding(createEmbeddingRequest, options) {
            return localVarFp.createEmbedding(createEmbeddingRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
         * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
         * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile(file, purpose, options) {
            return localVarFp.createFile(file, purpose, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {CreateFineTuneRequest} createFineTuneRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFineTune(createFineTuneRequest, options) {
            return localVarFp.createFineTune(createFineTuneRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates an image given a prompt.
         * @param {CreateImageRequest} createImageRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage(createImageRequest, options) {
            return localVarFp.createImage(createImageRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates an edited or extended image given an original image and a prompt.
         * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
         * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
         * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
            return localVarFp.createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Creates a variation of a given image.
         * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
         * @param {number} [n] The number of images to generate. Must be between 1 and 10.
         * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
         * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
         * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImageVariation(image, n, size, responseFormat, user, options) {
            return localVarFp.createImageVariation(image, n, size, responseFormat, user, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Classifies if text violates OpenAI\'s Content Policy
         * @param {CreateModerationRequest} createModerationRequest
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createModeration(createModerationRequest, options) {
            return localVarFp.createModeration(createModerationRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
         * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
         * @param {CreateSearchRequest} createSearchRequest
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createSearch(engineId, createSearchRequest, options) {
            return localVarFp.createSearch(engineId, createSearchRequest, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Transcribes audio into the input language.
         * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
            return localVarFp.createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Translates audio into into English.
         * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
         * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
         * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
         * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
         * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTranslation(file, model, prompt, responseFormat, temperature, options) {
            return localVarFp.createTranslation(file, model, prompt, responseFormat, temperature, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Delete a file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile(fileId, options) {
            return localVarFp.deleteFile(fileId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
         * @param {string} model The model to delete
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteModel(model, options) {
            return localVarFp.deleteModel(model, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Returns the contents of the specified file
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadFile(fileId, options) {
            return localVarFp.downloadFile(fileId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        listEngines(options) {
            return localVarFp.listEngines(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Returns a list of files that belong to the user\'s organization.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles(options) {
            return localVarFp.listFiles(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Get fine-grained status updates for a fine-tune job.
         * @param {string} fineTuneId The ID of the fine-tune job to get events for.
         * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTuneEvents(fineTuneId, stream, options) {
            return localVarFp.listFineTuneEvents(fineTuneId, stream, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary List your organization\'s fine-tuning jobs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFineTunes(options) {
            return localVarFp.listFineTunes(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listModels(options) {
            return localVarFp.listModels(options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
         * @param {string} engineId The ID of the engine to use for this request
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        retrieveEngine(engineId, options) {
            return localVarFp.retrieveEngine(engineId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Returns information about a specific file.
         * @param {string} fileId The ID of the file to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFile(fileId, options) {
            return localVarFp.retrieveFile(fileId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
         * @param {string} fineTuneId The ID of the fine-tune job
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveFineTune(fineTuneId, options) {
            return localVarFp.retrieveFineTune(fineTuneId, options).then((request) => request(axios, basePath));
        },
        /**
         *
         * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
         * @param {string} model The ID of the model to use for this request
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        retrieveModel(model, options) {
            return localVarFp.retrieveModel(model, options).then((request) => request(axios, basePath));
        },
    };
};
/**
 * OpenAIApi - object-oriented interface
 * @export
 * @class OpenAIApi
 * @extends {BaseAPI}
 */
class OpenAIApi extends base_1.BaseAPI {
    /**
     *
     * @summary Immediately cancel a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to cancel
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    cancelFineTune(fineTuneId, options) {
        return exports.OpenAIApiFp(this.configuration).cancelFineTune(fineTuneId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Answers the specified question using the provided documents and examples.  The endpoint first [searches](/docs/api-reference/searches) over provided documents or files to find relevant context. The relevant context is combined with the provided examples and question to create the prompt for [completion](/docs/api-reference/completions).
     * @param {CreateAnswerRequest} createAnswerRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createAnswer(createAnswerRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createAnswer(createAnswerRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates a completion for the chat message
     * @param {CreateChatCompletionRequest} createChatCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createChatCompletion(createChatCompletionRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createChatCompletion(createChatCompletionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Classifies the specified `query` using provided examples.  The endpoint first [searches](/docs/api-reference/searches) over the labeled examples to select the ones most relevant for the particular query. Then, the relevant examples are combined with the query to construct a prompt to produce the final label via the [completions](/docs/api-reference/completions) endpoint.  Labeled examples can be provided via an uploaded `file`, or explicitly listed in the request using the `examples` parameter for quick tests and small scale use cases.
     * @param {CreateClassificationRequest} createClassificationRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createClassification(createClassificationRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createClassification(createClassificationRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates a completion for the provided prompt and parameters
     * @param {CreateCompletionRequest} createCompletionRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createCompletion(createCompletionRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createCompletion(createCompletionRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates a new edit for the provided input, instruction, and parameters.
     * @param {CreateEditRequest} createEditRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createEdit(createEditRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createEdit(createEditRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates an embedding vector representing the input text.
     * @param {CreateEmbeddingRequest} createEmbeddingRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createEmbedding(createEmbeddingRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createEmbedding(createEmbeddingRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Upload a file that contains document(s) to be used across various endpoints/features. Currently, the size of all the files uploaded by one organization can be up to 1 GB. Please contact us if you need to increase the storage limit.
     * @param {File} file Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.  If the &#x60;purpose&#x60; is set to \\\&quot;fine-tune\\\&quot;, each line is a JSON record with \\\&quot;prompt\\\&quot; and \\\&quot;completion\\\&quot; fields representing your [training examples](/docs/guides/fine-tuning/prepare-training-data).
     * @param {string} purpose The intended purpose of the uploaded documents.  Use \\\&quot;fine-tune\\\&quot; for [Fine-tuning](/docs/api-reference/fine-tunes). This allows us to validate the format of the uploaded file.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createFile(file, purpose, options) {
        return exports.OpenAIApiFp(this.configuration).createFile(file, purpose, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates a job that fine-tunes a specified model from a given dataset.  Response includes details of the enqueued job including job status and the name of the fine-tuned models once complete.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {CreateFineTuneRequest} createFineTuneRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createFineTune(createFineTuneRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createFineTune(createFineTuneRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates an image given a prompt.
     * @param {CreateImageRequest} createImageRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createImage(createImageRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createImage(createImageRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates an edited or extended image given an original image and a prompt.
     * @param {File} image The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not provided, image must have transparency, which will be used as the mask.
     * @param {string} prompt A text description of the desired image(s). The maximum length is 1000 characters.
     * @param {File} [mask] An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where &#x60;image&#x60; should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions as &#x60;image&#x60;.
     * @param {number} [n] The number of images to generate. Must be between 1 and 10.
     * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
     * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
     * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createImageEdit(image, prompt, mask, n, size, responseFormat, user, options) {
        return exports.OpenAIApiFp(this.configuration).createImageEdit(image, prompt, mask, n, size, responseFormat, user, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Creates a variation of a given image.
     * @param {File} image The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.
     * @param {number} [n] The number of images to generate. Must be between 1 and 10.
     * @param {string} [size] The size of the generated images. Must be one of &#x60;256x256&#x60;, &#x60;512x512&#x60;, or &#x60;1024x1024&#x60;.
     * @param {string} [responseFormat] The format in which the generated images are returned. Must be one of &#x60;url&#x60; or &#x60;b64_json&#x60;.
     * @param {string} [user] A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createImageVariation(image, n, size, responseFormat, user, options) {
        return exports.OpenAIApiFp(this.configuration).createImageVariation(image, n, size, responseFormat, user, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Classifies if text violates OpenAI\'s Content Policy
     * @param {CreateModerationRequest} createModerationRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createModeration(createModerationRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createModeration(createModerationRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary The search endpoint computes similarity scores between provided query and documents. Documents can be passed directly to the API if there are no more than 200 of them.  To go beyond the 200 document limit, documents can be processed offline and then used for efficient retrieval at query time. When `file` is set, the search endpoint searches over all the documents in the given file and returns up to the `max_rerank` number of documents. These documents will be returned along with their search scores.  The similarity score is a positive score that usually ranges from 0 to 300 (but can sometimes go higher), where a score above 200 usually means the document is semantically similar to the query.
     * @param {string} engineId The ID of the engine to use for this request.  You can select one of &#x60;ada&#x60;, &#x60;babbage&#x60;, &#x60;curie&#x60;, or &#x60;davinci&#x60;.
     * @param {CreateSearchRequest} createSearchRequest
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createSearch(engineId, createSearchRequest, options) {
        return exports.OpenAIApiFp(this.configuration).createSearch(engineId, createSearchRequest, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Transcribes audio into the input language.
     * @param {File} file The audio file to transcribe, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
     * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
     * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
     * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
     * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
     * @param {string} [language] The language of the input audio. Supplying the input language in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy and latency.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createTranscription(file, model, prompt, responseFormat, temperature, language, options) {
        return exports.OpenAIApiFp(this.configuration).createTranscription(file, model, prompt, responseFormat, temperature, language, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Translates audio into into English.
     * @param {File} file The audio file to translate, in one of these formats: mp3, mp4, mpeg, mpga, m4a, wav, or webm.
     * @param {string} model ID of the model to use. Only &#x60;whisper-1&#x60; is currently available.
     * @param {string} [prompt] An optional text to guide the model\\\&#39;s style or continue a previous audio segment. The [prompt](/docs/guides/speech-to-text/prompting) should be in English.
     * @param {string} [responseFormat] The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.
     * @param {number} [temperature] The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to automatically increase the temperature until certain thresholds are hit.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    createTranslation(file, model, prompt, responseFormat, temperature, options) {
        return exports.OpenAIApiFp(this.configuration).createTranslation(file, model, prompt, responseFormat, temperature, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Delete a file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    deleteFile(fileId, options) {
        return exports.OpenAIApiFp(this.configuration).deleteFile(fileId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Delete a fine-tuned model. You must have the Owner role in your organization.
     * @param {string} model The model to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    deleteModel(model, options) {
        return exports.OpenAIApiFp(this.configuration).deleteModel(model, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Returns the contents of the specified file
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    downloadFile(fileId, options) {
        return exports.OpenAIApiFp(this.configuration).downloadFile(fileId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Lists the currently available (non-finetuned) models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    listEngines(options) {
        return exports.OpenAIApiFp(this.configuration).listEngines(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Returns a list of files that belong to the user\'s organization.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    listFiles(options) {
        return exports.OpenAIApiFp(this.configuration).listFiles(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Get fine-grained status updates for a fine-tune job.
     * @param {string} fineTuneId The ID of the fine-tune job to get events for.
     * @param {boolean} [stream] Whether to stream events for the fine-tune job. If set to true, events will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available. The stream will terminate with a &#x60;data: [DONE]&#x60; message when the job is finished (succeeded, cancelled, or failed).  If set to false, only events generated so far will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    listFineTuneEvents(fineTuneId, stream, options) {
        return exports.OpenAIApiFp(this.configuration).listFineTuneEvents(fineTuneId, stream, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary List your organization\'s fine-tuning jobs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    listFineTunes(options) {
        return exports.OpenAIApiFp(this.configuration).listFineTunes(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Lists the currently available models, and provides basic information about each one such as the owner and availability.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    listModels(options) {
        return exports.OpenAIApiFp(this.configuration).listModels(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Retrieves a model instance, providing basic information about it such as the owner and availability.
     * @param {string} engineId The ID of the engine to use for this request
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    retrieveEngine(engineId, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveEngine(engineId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Returns information about a specific file.
     * @param {string} fileId The ID of the file to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    retrieveFile(fileId, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveFile(fileId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Gets info about the fine-tune job.  [Learn more about Fine-tuning](/docs/guides/fine-tuning)
     * @param {string} fineTuneId The ID of the fine-tune job
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    retrieveFineTune(fineTuneId, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveFineTune(fineTuneId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     *
     * @summary Retrieves a model instance, providing basic information about the model such as the owner and permissioning.
     * @param {string} model The ID of the model to use for this request
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OpenAIApi
     */
    retrieveModel(model, options) {
        return exports.OpenAIApiFp(this.configuration).retrieveModel(model, options).then((request) => request(this.axios, this.basePath));
    }
}
exports.OpenAIApi = OpenAIApi;


/***/ }),

/***/ "./node_modules/openai/dist/base.js":
/*!******************************************!*\
  !*** ./node_modules/openai/dist/base.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = exports.BASE_PATH = void 0;
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
exports.BASE_PATH = "https://api.openai.com/v1".replace(/\/+$/, "");
/**
 *
 * @export
 */
exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};
/**
 *
 * @export
 * @class BaseAPI
 */
class BaseAPI {
    constructor(configuration, basePath = exports.BASE_PATH, axios = axios_1.default) {
        this.basePath = basePath;
        this.axios = axios;
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}
exports.BaseAPI = BaseAPI;
;
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
class RequiredError extends Error {
    constructor(field, msg) {
        super(msg);
        this.field = field;
        this.name = "RequiredError";
    }
}
exports.RequiredError = RequiredError;


/***/ }),

/***/ "./node_modules/openai/dist/common.js":
/*!********************************************!*\
  !*** ./node_modules/openai/dist/common.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestFunction = exports.toPathString = exports.serializeDataIfNeeded = exports.setSearchParams = exports.setOAuthToObject = exports.setBearerAuthToObject = exports.setBasicAuthToObject = exports.setApiKeyToObject = exports.assertParamExists = exports.DUMMY_BASE_URL = void 0;
const base_1 = __webpack_require__(/*! ./base */ "./node_modules/openai/dist/base.js");
/**
 *
 * @export
 */
exports.DUMMY_BASE_URL = 'https://example.com';
/**
 *
 * @throws {RequiredError}
 * @export
 */
exports.assertParamExists = function (functionName, paramName, paramValue) {
    if (paramValue === null || paramValue === undefined) {
        throw new base_1.RequiredError(paramName, `Required parameter ${paramName} was null or undefined when calling ${functionName}.`);
    }
};
/**
 *
 * @export
 */
exports.setApiKeyToObject = function (object, keyParamName, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.apiKey) {
            const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                ? yield configuration.apiKey(keyParamName)
                : yield configuration.apiKey;
            object[keyParamName] = localVarApiKeyValue;
        }
    });
};
/**
 *
 * @export
 */
exports.setBasicAuthToObject = function (object, configuration) {
    if (configuration && (configuration.username || configuration.password)) {
        object["auth"] = { username: configuration.username, password: configuration.password };
    }
};
/**
 *
 * @export
 */
exports.setBearerAuthToObject = function (object, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
            const accessToken = typeof configuration.accessToken === 'function'
                ? yield configuration.accessToken()
                : yield configuration.accessToken;
            object["Authorization"] = "Bearer " + accessToken;
        }
    });
};
/**
 *
 * @export
 */
exports.setOAuthToObject = function (object, name, scopes, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration && configuration.accessToken) {
            const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                ? yield configuration.accessToken(name, scopes)
                : yield configuration.accessToken;
            object["Authorization"] = "Bearer " + localVarAccessTokenValue;
        }
    });
};
function setFlattenedQueryParams(urlSearchParams, parameter, key = "") {
    if (parameter == null)
        return;
    if (typeof parameter === "object") {
        if (Array.isArray(parameter)) {
            parameter.forEach(item => setFlattenedQueryParams(urlSearchParams, item, key));
        }
        else {
            Object.keys(parameter).forEach(currentKey => setFlattenedQueryParams(urlSearchParams, parameter[currentKey], `${key}${key !== '' ? '.' : ''}${currentKey}`));
        }
    }
    else {
        if (urlSearchParams.has(key)) {
            urlSearchParams.append(key, parameter);
        }
        else {
            urlSearchParams.set(key, parameter);
        }
    }
}
/**
 *
 * @export
 */
exports.setSearchParams = function (url, ...objects) {
    const searchParams = new URLSearchParams(url.search);
    setFlattenedQueryParams(searchParams, objects);
    url.search = searchParams.toString();
};
/**
 *
 * @export
 */
exports.serializeDataIfNeeded = function (value, requestOptions, configuration) {
    const nonString = typeof value !== 'string';
    const needsSerialization = nonString && configuration && configuration.isJsonMime
        ? configuration.isJsonMime(requestOptions.headers['Content-Type'])
        : nonString;
    return needsSerialization
        ? JSON.stringify(value !== undefined ? value : {})
        : (value || "");
};
/**
 *
 * @export
 */
exports.toPathString = function (url) {
    return url.pathname + url.search + url.hash;
};
/**
 *
 * @export
 */
exports.createRequestFunction = function (axiosArgs, globalAxios, BASE_PATH, configuration) {
    return (axios = globalAxios, basePath = BASE_PATH) => {
        const axiosRequestArgs = Object.assign(Object.assign({}, axiosArgs.options), { url: ((configuration === null || configuration === void 0 ? void 0 : configuration.basePath) || basePath) + axiosArgs.url });
        return axios.request(axiosRequestArgs);
    };
};


/***/ }),

/***/ "./node_modules/openai/dist/configuration.js":
/*!***************************************************!*\
  !*** ./node_modules/openai/dist/configuration.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const packageJson = __webpack_require__(/*! ../package.json */ "./node_modules/openai/package.json");
class Configuration {
    constructor(param = {}) {
        this.apiKey = param.apiKey;
        this.organization = param.organization;
        this.username = param.username;
        this.password = param.password;
        this.accessToken = param.accessToken;
        this.basePath = param.basePath;
        this.baseOptions = param.baseOptions;
        this.formDataCtor = param.formDataCtor;
        if (!this.baseOptions) {
            this.baseOptions = {};
        }
        this.baseOptions.headers = Object.assign({ 'User-Agent': `OpenAI/NodeJS/${packageJson.version}`, 'Authorization': `Bearer ${this.apiKey}` }, this.baseOptions.headers);
        if (this.organization) {
            this.baseOptions.headers['OpenAI-Organization'] = this.organization;
        }
        if (!this.formDataCtor) {
            this.formDataCtor = __webpack_require__(/*! form-data */ "./node_modules/form-data/lib/browser.js");
        }
    }
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
}
exports.Configuration = Configuration;


/***/ }),

/***/ "./node_modules/openai/dist/index.js":
/*!*******************************************!*\
  !*** ./node_modules/openai/dist/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable */
/* eslint-disable */
/**
 * OpenAI API
 * APIs for sampling from and fine-tuning language models
 *
 * The version of the OpenAPI document: 1.2.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./api */ "./node_modules/openai/dist/api.js"), exports);
__exportStar(__webpack_require__(/*! ./configuration */ "./node_modules/openai/dist/configuration.js"), exports);


/***/ }),

/***/ "./node_modules/openai/package.json":
/*!******************************************!*\
  !*** ./node_modules/openai/package.json ***!
  \******************************************/
/*! exports provided: name, version, description, repository, keywords, author, license, main, types, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"openai\",\"version\":\"3.2.1\",\"description\":\"Node.js library for the OpenAI API\",\"repository\":{\"type\":\"git\",\"url\":\"git@github.com:openai/openai-node.git\"},\"keywords\":[\"openai\",\"open\",\"ai\",\"gpt-3\",\"gpt3\"],\"author\":\"OpenAI\",\"license\":\"MIT\",\"main\":\"./dist/index.js\",\"types\":\"./dist/index.d.ts\",\"scripts\":{\"build\":\"tsc --outDir dist/\"},\"dependencies\":{\"axios\":\"^0.26.0\",\"form-data\":\"^4.0.0\"},\"devDependencies\":{\"@types/node\":\"^12.11.5\",\"typescript\":\"^3.6.4\"}}");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
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

/***/ "./src/index_wq.js":
/*!*************************!*\
  !*** ./src/index_wq.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openai */ "./node_modules/openai/dist/index.js");
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(openai__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! css-tree */ "./node_modules/css-tree/lib/index.js");
/* harmony import */ var css_tree__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(css_tree__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var defaultPrompt = "\n\uB2F9\uC2E0\uC740 \uC6F9\uD37C\uBE14\uB9AC\uC154\uC785\uB2C8\uB2E4.\n\uC81C\uAC00 \uC81C\uACF5\uD558\uB294 \uC18C\uC2A4\uB97C \uC544\uB798 \uADDC\uCE59\uC744 \uC801\uC6A9\uD558\uC5EC \uBCC0\uD658\uD574\uC8FC\uC138\uC694.\n\n\uC218\uD589\uADDC\uCE59\uC740 \uC544\uB798\uC640 \uAC19\uC2B5\uB2C8\uB2E4.\n\n* \uD074\uB798\uC2A4\uC120\uD0DD\uC790\uB294 \uCD9C\uB825\uD558\uC9C0 \uC54A\uB294\uB2E4.\n* rgba\uB97C 16\uC9C4\uC218 \uC0C9\uC0C1 \uCF54\uB4DC\uB85C \uBCC0\uACBD\n* id \uC120\uD0DD\uC790\uB97C \uD074\uB798\uC2A4\uB85C \uBCC0\uACBD\n* id \uC120\uD0DD\uC790\uC758 \uC18D\uC131\uC744  :root\uC5D0 ws-\uB97C prefix \uBD99\uC5EC \uC0AC\uC6A9\uC790 \uC815\uC758\uC18D\uC131\uC73C\uB85C \uCD94\uAC00\uD558\uACE0, \uD574\uB2F9 \uC18D\uC131(fill)\uBA85\uC740 \uC0AD\uC81C\uD558\uACE0 value\uAC12\uB9CC \uCD9C\uB825\uD55C\uB2E4.\n* \uC544\uC774\uB514\uC120\uD0DD\uC790\uC640 \uC18D\uC131\uC740 \uC0AD\uC81C\uD55C\uB2E4.\n* :root \uAC12\uB9CC \uCD9C\uB825\uD55C\uB2E4.\n\n\uC81C\uACF5\uD558\uB294 \uC18C\uC2A4\uB294 \uB2E4\uC74C\uACFC \uAC19\uC2B5\uB2C8\uB2E4.\n";
var systemPrompt = "";
var wq_gpt = {};
wq_gpt.aplayOpenAi = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(prompt, myApiKey, customPrompt) {
    var errorMsg, configuration, openai, message, response;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          errorMsg = '';
          configuration = new openai__WEBPACK_IMPORTED_MODULE_0__["Configuration"]({
            apiKey: myApiKey // 해당 방법으로 사용하는 이유는 환경변수에 설정된 OPENAI_API_KEY를 adobe xd플러그인이 못들고오는 듯 함
          });
          openai = new openai__WEBPACK_IMPORTED_MODULE_0__["OpenAIApi"](configuration);
          message = [{
            role: 'user',
            content: prompt
          }, {
            role: 'system',
            content: systemPrompt
          }];
          _context.next = 6;
          return openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: message
          })["catch"](function (error) {
            errorMsg = error.message;
          });
        case 6:
          response = _context.sent;
          if (!(errorMsg !== '')) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", errorMsg);
        case 9:
          console.log('- completion:\n' + response.data.choices[0].message.content);
          console.log('\n- total tokens: ' + response.data.usage.total_tokens);
          console.log('*- completion ended...');
          return _context.abrupt("return", response.data.choices[0].message.content);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
wq_gpt.convertCss = function (cssfile) {
  // parse CSS to AST
  var flag = false;
  var ast = css_tree__WEBPACK_IMPORTED_MODULE_1__["parse"](cssfile);
  // traverse AST and modify it
  css_tree__WEBPACK_IMPORTED_MODULE_1__["walk"](ast, function (node, item, list) {
    if (node.type === 'ClassSelector' && node.name === 'mediaViewInfo' && list) {
      flag = true;
    } else if (node.type === 'PseudoClassSelector' && node.name === 'root' && list) {
      flag = true;
    } else if (node.type === 'TypeSelector' && node.name === '*' && list) {
      flag = true;
    }
    if (node.type === 'Declaration' && flag) {
      list.remove(item);
    }
    if (node.type === 'Selector') {
      flag = false;
    }
    if (node.type === 'Rule' && flag) {
      list.remove(item);
    }
  });
  var newCssCode = css_tree__WEBPACK_IMPORTED_MODULE_1__["generate"](ast);
  newCssCode = "".concat(defaultPrompt, "\n") + '```\n' + "".concat(newCssCode) + '\n```';
  console.log(newCssCode);
  return newCssCode;
};
wq_gpt.openai = {
  Configuration: openai__WEBPACK_IMPORTED_MODULE_0__["Configuration"],
  OpenAIApi: openai__WEBPACK_IMPORTED_MODULE_0__["OpenAIApi"]
};
wq_gpt.csstree = css_tree__WEBPACK_IMPORTED_MODULE_1__;
window.wq_gpt = wq_gpt;

/***/ })

/******/ });
});