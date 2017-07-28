/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "77b2a62568fa4c7f05c5"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "js/" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(326)(__webpack_require__.s = 326);
/******/ })
/************************************************************************/
/******/ ({

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 2016-09-20.
 * 后端接口对接
 * edit by wangzhiyong
 * date:2016-10-04,将ajax直接改用原生xhr
 * date;2016-10-05 将rest独立出来,将格式化参数方法独立出来
 ** date;2016-11-05 验证可行性修改
 ** date;2017-01-14 验证可行性再次修改
 * date:207-04-18 修改在IE8，与360中的bug
 * date:207-06-16 修改asnyc参数的配置
 * 使用方法
 *     ajax({
       url:"http://localhost:7499/Admin/Add",
        type:"post",
        data:{name:"test",password:"1111",nickname:"dddd"},
        success:function (result) {
        console.log(result);
        },
    })
 */
var paramFormat = __webpack_require__(75);
var httpCode = __webpack_require__(114);
//普通ajax
var ajax = function ajax(settings) {
  var xhrRequest = createXHR();
  if (!validate()) {
    //验证不通过
    return;
  }

  if (xhrParamsSet()) {
    //设置参数

    //开始发送数据
    if (settings.data) {
      if (settings.type.toLowerCase() == "get") {
        xhrRequest.send();
      } else {
        //post
        xhrRequest.send(settings.data);
      }
    } else {
      xhrRequest.send();
    }
  } else {}

  /**
   * 创建xhr对象
   * @returns {*}
   */
  function createXHR() {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    return xhr;
  }

  /**
   * 验证
   * @returns {boolean}
   */
  function validate() {
    if (!xhrRequest) {
      throw new Error("您的浏览器不支持ajax请求");
      return false;
    }
    if (!settings || !settings instanceof Object) {
      throw new Error("ajax配置无效,不能为空,必须为对象");
      return false;
    }
    if (settings.data instanceof Array) {
      throw new Error("ajax的data参数必须是字符,空值,对象,FormData,不可以为数组");
      return false;
    }
    if (!settings.dataType) {
      //回传的数据格式,默认为json
      settings.dataType = "json";
    }
    if (!settings.type) {
      //请求方式
      settings.type = "GET";
    }
    if (settings.async !== false) {
      settings.async = true; //默认为异步的
    }
    if (settings.url == null || settings.url == undefined || settings.url === "") {
      throw new Error("请求地址不能为空");
      return false;
    }
    if (!settings.success) {
      throw new Error("ajax的success[请求成功函数]不能为空");
      return false;
    } else if (typeof settings.success !== "function") {
      throw new Error("ajax的success[请求成功函数]必须为函数");
      return false;
    }

    if (settings.error && typeof settings.error !== "function") {
      throw new Error("ajax的error[请求失败函数]必须为函数");
      return false;
    }
    if (settings.progress && typeof settings.progress !== "function") {
      throw new Error("ajax的progress[上传进度函数]必须为函数");
      return false;
    }
    if (settings.data && settings.data.constructor === FormData) {
      //如果是FormData不进行处理，相当于jquery ajax中contentType=false,processData=false,不设置Content-Type
      settings.contentType == false;
    } else if (settings.contentType == false) {//为false，是正确值

    } else if (settings.contentType == null || settings.contentType == undefined || settings.contentType == "") {
      //请求的数据格式,默认值
      //如果为false，是正确值
      settings.contentType = "application/x-www-form-urlencoded"; //默认表单提交
    }

    //格式化中已经处理了FormData的情况
    settings.data = paramFormat(settings.data);

    if (settings.type.toLowerCase() == "get") {
      if (settings.data && settings.url.indexOf("?") <= -1) {
        settings.url += "?";
      }
      if (settings.data && settings.url.indexOf("?") > -1 && settings.url.indexOf("?") == settings.url.length - 1) {
        settings.url += settings.data;
      } else if (settings.data && settings.url.indexOf("?") > -1 && settings.url.indexOf("?") < settings.url.length - 1) {
        settings.url += "&" + settings.data;
      }
    }

    return true;
  }

  /**
   * xhr参数设置
   */
  function xhrParamsSet() {
    try {
      xhrRequest.open(settings.type, settings.url, settings.async);
    } catch (e) {
      //说明不支持跨域
      errorHandler(xhrRequest, 803, "[IE,360]自动阻止了跨域:" + e.message);
    }

    //设置请求格式
    if (settings.contentType == false) {//为false,不设置Content-Type
    } else {
      xhrRequest.setRequestHeader("Content-Type", settings.contentType); //请求的数据格式,
    }
    //设置返回格式
    try {
      xhrRequest.responseType = settings.dataType; //回传的数据格式
    } catch (e) {
      console.log("该浏览器[IE，360]不支持responseType的设置，跳过");
    }
    try {
      xhrRequest.withCredentials = settings.cors ? true : false; //表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。
    } catch (e) {
      console.log("该浏览器[IE，360]不支持withCredentials的设置，跳过");
    }
    if (!settings.timeout) {
      //设置超时时间
      xhrRequest.timeout = settings.timeout; //超时时间
    }

    try {

      xhrRequest.addEventListener("load", load, false); ///执行成功事件
      xhrRequest.addEventListener("loadend", loadEnd, false); //执行完成事件
      xhrRequest.addEventListener("timeout", timeout, false); //超时事件
      xhrRequest.addEventListener("error", error, false); //执行错误事件
      if (typeof settings.progress === "function") {
        //没有设置时不要处理
        xhrRequest.upload.addEventListener("progress", progress, false); //上传进度
      } else {}
    } catch (e) {
      //说明不支持xhr2.0
      console.log("浏览器不支持xhr2.0，已经转为1.0");
      xhrRequest.onreadystatechange = function () {
        if (xhrRequest.readyState == 4) {
          var e = {};
          e.target = xhrRequest;
          load(e); //调用加载成功事件
        }
      };
    }
    return true;
  }

  /**
   * 上传进度事件
   * @param event
   */
  function progress(event) {
    if (event.lengthComputable) {
      var percentComplete = Math.round(event.loaded * 100 / event.total);
      if (typeof settings.progress === "function") {
        settings.progress(percentComplete); //执行上传进度事件
      }
    }
  }

  /**
   * 请求成功
   * @param event
   */
  function load(event) {
    var xhr = event.target;
    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
      //请求成功
      if (settings.dataType == "json") {
        //json格式请求
        var result = xhr.response ? xhr.response : xhr.responseText; //1.0
        if (result) {
          if (typeof result == "string") {
            //IE8.360 中没有对结果进行JSON化
            result = JSON.parse(result);
          }
          if (result.success != null && result.success != undefined) {
            //后台传了这个字段
            if (result.success) {
              if (settings.success && typeof settings.success === "function") {
                settings.success(result); //执行成功
              } else {
                throw new Error("您没的设置请求成功后的处理函数-success");
              }
            } else {
              if (result.message) {
                //有标准的错误信息
                errorHandler(result, result.errCode, result.message);
              } else {
                errorHandler(result, 801, "服务器正常响应，后台业务代码的逻辑报错");
              }
            }
          } else {
            //后台没有传这个字段
            if (settings.success && typeof settings.success === "function") {
              settings.success(result); //直接认为是成功的
            } else {
              throw new Error("您没的设置请求成功后的处理函数-success");
            }
          }
        } else {
          errorHandler(xhr, 802, "服务器返回的数据格式不正确");
        }
      } else if (settings.dataType == "blob" || settings.dataType == "arrayBuffer") {
        //二进制数据
        settings.success(xhr.response);
      } else {
        //其他格式
        try {
          settings.success(xhr.responseText);
        } catch (e) {
          //如果没有responseText对象,不能通过if判断,原因不详
          settings.success(xhr.response);
        }
      }
    } else {
      //是4xx错误时属于客户端的错误，并不属于Network error,不会触发error事件

      errorHandler(xhr, xhr.status, xhr.statusText);
    }
  }

  /**
   * 请求完成
   * @param event
   */
  //
  function loadEnd(event) {
    var xhr = event.target;
    if (typeof settings.complete === "function") {
      //设置了完成事件,
      if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)) {
        //请求成功
        //304客户端已经执行了GET，但文件未变化,认为也是成功的
        settings.complete(xhr, "success");
      } else if (xhr.readyState == 4 && xhr.status == 0) {//本地响应成功，TODO 暂时不知道如何处理

      } else {
        //错误
        settings.complete(xhr, "error");
      }
    }
  }

  /**
   * 请求超时
   * @param event
   */
  function timeout(event) {
    var xhr = event.target;
    errorHandler(xhr, 802, "请求超时");
  }

  /**
   * 请求失败
   * @param event
   */
  function error(event) {
    var xhr = event.target;
    errorHandler(xhr, xhr.status, xhr.statusText);
  }

  /**
   * 通用错误处理函数
   * @param xhr
   * @param errCode
   * @param message
   */
  function errorHandler(xhr, errCode, message) {

    if (errCode >= 300 && errCode < 600) {

      console.log(errCode, httpCode[errCode.toString()]); //直接处理http错误代码
      if (typeof settings.error === "function") {
        //设置了错误事件,
        settings.error(xhr, errCode, httpCode[errCode.toString()]);
      }
    } else {
      console.log(errCode, message);
      if (typeof settings.error === "function") {
        //设置了错误事件,
        settings.error(xhr, errCode, message);
      }
    }
  }
};

module.exports = ajax;

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 17/1/15.
 * 将http请求的错误列出来
 */
var httpCode = {
  "100": "客户必须继续发出请求",
  "101": "客户要求服务器根据请求转换HTTP协议版本",
  "200": "交易成功",
  "201": "提示知道新文件的URL",
  "202": "接受和处理、但处理未完成",
  "203": "返回信息不确定或不完整",
  "204": "请求收到，但返回信息为空",
  "205": "服务器完成了请求，用户代理必须复位当前已经浏览过的文件",
  "206": "服务器已经完成了部分用户的GET请求",
  "300": "请求的资源可在多处得到",
  "301": "删除请求数据",
  "302": "在其他地址发现了请求数据",
  "303": "建议客户访问其他URL或访问方式",
  "304": "客户端已经执行了GET，但文件未变化",
  "305": "请求的资源必须从服务器指定的地址得到",
  "306": "前一版本HTTP中使用的代码，现行版本中不再使用",
  "307": "申明请求的资源临时性删除",
  "400": "错误请求，如语法错误",
  "401": "请求授权失败",
  "402": "保留有效ChargeTo头响应",
  "403": "请求不允许",
  "404": "没有发现文件、查询或URl",
  "405": "用户在Request-Line字段定义的方法不允许",
  "406": "根据用户发送的Accept拖，请求资源不可访问",
  "407": "类似401，用户必须首先在代理服务器上得到授权",
  "408": "客户端没有在用户指定的饿时间内完成请求",
  "409": "对当前资源状态，请求不能完成",
  "410": "服务器上不再有此资源且无进一步的参考地址",
  "411": "服务器拒绝用户定义的Content-Length属性请求",
  "412": "一个或多个请求头字段在当前请求中错误",
  "413": "请求的资源大于服务器允许的大小",
  "414": "请求的资源URL长于服务器允许的长度",
  "415": "请求资源不支持请求项目格式",
  "416": "请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段",
  "417": "服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求",
  "500": "服务器产生内部错误",
  "501": "服务器不支持请求的函数",
  "502": "服务器暂时不可用，有时是为了防止发生系统过载",
  "503": "服务器过载或暂停维修",
  "504": "关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长",
  "505": "服务器不支持或拒绝支请求头中指定的HTTP版本"
};

module.exports = httpCode;

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by wangzhiyong on 16/10/5.
 * ajax数据模型
 */
var Model = function Model() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "GET";
    var url = arguments[1];
    var success = arguments[2];
    var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var error = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Model);

    this.type = type; //请求类型
    this.url = url; //请求地址
    this.data = data; //参数
    this.success = success; //成功处理函数
    this.error = error; //错误处理函数
    this.progress = null; //进度函数
    this.dataType = "json"; //返回的数据格式
    this.contentType = "application/x-www-form-urlencoded"; //请求数据格式，可以设置为false
    this.async = true; //是否异步
    this.timeout = null; //超时
};

module.exports = Model;

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by zhiyongwang
 * date:2016-10-05 将原来pc端框架中fetch查询独立出来
 * desc:fetch 查询时的数据模型
 *
 */

var FetchModel = function FetchModel(url, success) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "GET";

    _classCallCheck(this, FetchModel);

    this.url = url;
    this.data = data;
    this.success = success;
    this.error = error;
    this.type = type; //类型
    this.contentType = "application/x-www-form-urlencoded"; //请求数据格式
    this.credentials = false; //是否带上cookie
    this.promise = false; //是否返回promise对象，如果为true,则fetchapi就可以使用then来处理异步
};

module.exports = FetchModel;

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by wangzhiong on 2016/11/6.
 * 单独为rest设置模型
 */

var RestModel = function RestModel(controller, success) {
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, RestModel);

    this.controller = controller; //控制器名称
    this.success = success; //成功处理函数
    this.error = error; //错误处理函数
    this.model = null; //参数
    this.id = null; //id,get与delete方法所用
    this.paramModel = null; //查询条件
    this.paramModelName = "paramModel"; //因为查询条件是数组,但回传给后台必须是对象,所以可以自定义的查询参数名称
    this.pageModel = null; //分页条件
    this.async = true; //是否异步
    this.timeout = 25000; //超时
    this.corsUrl = "/"; //超时

};

module.exports = RestModel;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/10/5.
 * 将fetch 方法从框架独立出来
 * 2017-01-15进行修改，完善
 * 使用方法
 *
 * 1.使用promise
 *
 fetchapi({
        url: "http://localhost:7499/Admin/Add",
        type: "post",
        data: {name: "test", password: "1111", nickname: "dddd"},
        promise:true,
    }).then(function (result) {
        console.log(result);

    })

 *2.使用回调
 *
 fetchapi({
        url: "http://localhost:7499/Admin/Add",
        type: "post",
        data: {name: "test", password: "1111", nickname: "dddd"},
        success: function (result) {
            console.log(result);
        },
        error: function (errCode,message) {
            console.log(errCode,message);
        }
    })；
 */

var paramFormat = __webpack_require__(75);
var httpCode = __webpack_require__(114);
var fetchapi = function fetchapi(fetchmodel) {
    this.then = null;
    if (!fetchmodel || !fetchmodel instanceof Object) {
        throw new Error("fetchmodel配置无效,不能为空,必须为对象");
        return false;
    }
    if (!fetchmodel.success && !fetchmodel.promise) {
        throw new Error("promise属性设置false的时候,fetchmodel的success[请求成功函数]不能为空");
        return false;
    } else if (!fetchmodel.promise && typeof fetchmodel.success !== "function") {
        throw new Error("fetchmodel的success[请求成功函数]必须为函数");
        return false;
    }

    if (fetchmodel.error && typeof fetchmodel.error !== "function") {
        throw new Error("fetchmodel的error[请求失败函数]必须为函数");
        return false;
    }

    if (fetchmodel.data instanceof Array) {
        throw new Error("fetchmodel的data参数必须是字符,空值,对象,FormData,不可以为数组");
        return false;
    }
    if (fetchmodel.data.constructor === FormData) {
        //如果是FormData不进行处理，相当于jquery ajax中contentType=false,processData=false
        fetchmodel.contentType = false; //也设置为false
    } else if (fetchmodel.contentType == false) {//为false，也不处理

    } else if (fetchmodel.contentType == null || fetchmodel.contentType == undefined || fetchmodel.contentType == "") {
        //请求的数据格式,默认值

        //如果为false，是正确值
        fetchmodel.contentType = "application/x-www-form-urlencoded";
    }

    //如果是get方式，又有参数，则要将参数转换
    if (fetchmodel.type.toLowerCase() == "get") {
        //TODO 这里的代码要优化
        fetchmodel.data = paramFormat(fetchmodel.data);
        if (fetchmodel.data && fetchmodel.url.indexOf("?") <= -1) {
            fetchmodel.url += "?";
        }
        if (fetchmodel.data && fetchmodel.url.indexOf("?") > -1 && fetchmodel.url.indexOf("?") == fetchmodel.url.length - 1) {
            fetchmodel.url += fetchmodel.data;
        } else if (fetchmodel.data && fetchmodel.url.indexOf("?") > -1 && fetchmodel.url.indexOf("?") < fetchmodel.url.length - 1) {
            fetchmodel.url += "&" + fetchmodel.data;
        }
    }

    //错误处理函数
    function errorHandler(fetchmodel, errCode, message) {
        console.log(errCode, message);
        if (typeof fetchmodel.error === "function") {
            //设置了错误事件,
            fetchmodel.error(errCode, message);
        }
    }

    if (fetchmodel.promise) {
        //直接返回promise对象
        return fetch(fetchmodel.url, {
            credentials: fetchmodel.credentials ? 'include' : null, //附带cookies之类的凭证信息
            method: fetchmodel.type,
            headers: fetchmodel.contentType ? {
                "Content-Type": fetchmodel.contentType
            } : {},
            body: fetchmodel.data ? paramFormat(fetchmodel.data) : null
        });
    } else {
        try {
            fetch(fetchmodel.url, {
                credentials: fetchmodel.credentials ? 'include' : null, //附带cookies之类的凭证信息
                method: fetchmodel.type,
                headers: fetchmodel.contentType ? {
                    "Content-Type": fetchmodel.contentType
                } : {},
                body: fetchmodel.data ? paramFormat(fetchmodel.data) : null
            }).then(function (res) {
                if (res.ok) {

                    try {
                        res.json().then(function (result) {
                            if (result.success != null && result.success != undefined) {
                                //后台传了这个字段
                                if (result.success) {
                                    if (fetchmodel.success && typeof fetchmodel.success === "function") {
                                        fetchmodel.success(result); //执行成功
                                    } else {
                                        throw new Error("您没的设置请求成功后的处理函数-success");
                                    }
                                } else {
                                    if (result.message) {
                                        //有标准的错误信息
                                        errorHandler(result, result.errCode, result.message);
                                    } else {
                                        errorHandler(result, 801, "服务器正常响应，后台业务代码的逻辑报错");
                                    }
                                }
                            } else {
                                //后台没有传这个字段
                                if (fetchmodel.success && typeof fetchmodel.success === "function") {
                                    fetchmodel.success(result); //直接认为是成功的,执行成功
                                } else {
                                    throw new Error("您没的设置请求成功后的处理函数-success");
                                }
                            }
                        });
                    } catch (e) {
                        errorHandler(fetchmodel, 802, e.message);
                    }
                } else {
                    errorHandler(fetchmodel, res.status, httpCode[res.status]);
                }
            });
        } catch (e) {
            errorHandler(fetchmodel, "4xx", e.message);
        }
    }
};
module.exports = fetchapi;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/10/5.
 * 将rest独立出来
 * ** date;2016-11-05 修改
 */

var ajax = __webpack_require__(113);
//RSST开发模式
var rest = {
    validate: function validate(settings, type) {
        if (!settings || !settings instanceof Object) {
            throw new Error("ajax配置无效,不能为空,必须为对象");
            return false;
        }

        if (!settings.controller) {
            //控制器为空
            throw new Error("ajax的controller[控制器]不能为空");
            return false;
        }

        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        } else if (typeof settings.corsUrl !== "string") {
            throw new Error("corsUrl 必须为字符类型");
            return false;
        }
        if (!settings.success) {
            throw new Error("ajax的success[请求成功函数]不能为空");
            return false;
        } else if (typeof settings.success !== "function") {
            throw new Error("ajax的success[请求成功函数]必须为函数");
            return false;
        }

        if (settings.error && typeof settings.error !== "function") {
            throw new Error("ajax的error[请求失败函数]必须为函数");
            return false;
        }

        if (!type) {
            switch (type) {
                case "get":
                    //获取实例模型
                    if (settings.id == null || settings.id == undefined) {
                        throw new Error("id参数不能空");
                        return false;
                    } else if (typeof settings.id !== "number") {
                        throw new Error("id必须为数字");
                        return false;
                    }
                    break;
                case "add":
                    //新增或者修改
                    if (settings.model == null || settings.model == undefined) {
                        throw new Error("数据模型不能为空");
                        return false;
                    }
                    break;
            }
        }
        return true;
    },
    //获取模型
    getModel: function getModel(settings) {
        /// <summary>
        /// 获取模型
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings)) {
            ajax({
                type: "GET",
                url: settings.corsUrl + settings.controller + "/GetModel",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //获取模型实例
    get: function get() {
        /// <summary>
        /// 获取模型实例
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings, "get")) {
            ajax({
                type: "GET",
                url: settings.corsUrl + settings.controller + "/Get?id=" + id,
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //新增
    add: function add(settings) {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        var data = {};
        if (this.validate(settings, "add")) {
            if (settings.model instanceof Array) {
                //如果是数组，则将其转对象
                data = { model: settings.model };
            } else {
                data = settings.model;
            }

            ajax({
                type: "POST",
                url: settings.corsUrl + settings.controller + "/Add",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //更新
    update: function update(settings) {
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        var data = {}; //数据模型
        if (this.validate(settings, "add")) {
            if (settings.model instanceof Array) {
                //如果是数组，则将其转对象
                data = { model: settings.model };
            } else {
                data = settings.model;
            }

            ajax({
                type: "POST",
                url: settings.corsUrl + settings.controller + "/Update",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //删除
    delete: function _delete(settings) {
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        var type = "POST"; //请求类型
        if (this.validate(settings)) {

            var url = settings.corsUrl + settings.controller + "/Delete";
            var data = {}; //因为要转换为后端能解析的数据格式必须是对象
            if (settings.paramModel instanceof Array) {
                if (settings.paramModelName) {
                    //自定义,不为空
                    if (typeof settings.paramModelName === "string") {
                        data[settings.paramModelName] = settings.paramModel;
                    } else {
                        throw new Error("paramModelName[自定义条件参数名称]必须为字符类型");
                        return false;
                    }
                } else {
                    data.paramModel = settings.paramModel; //默认对象名
                }
            } else if (typeof (paramModel * 1) === "number") {
                //数值型

                type = "GET";
                url = url + "?id=" + paramModel;
                data = null;
            } else {
                throw new Error("paramModel要么查询格式的数组,要么为id字段数字");
                return false;
            }

            ajax({
                type: type,
                url: url,
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //条件查询
    query: function query(settings) {
        /// <summary>
        /// 条件查询
        /// </summary>
        /// <param name="settings" type="array">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings)) {
            var data = {}; //因为要转换为后端能解析的数据格式必须是对象

            if (!settings.paramModel || settings.paramModel && settings.paramModel instanceof Array) {
                if (settings.paramModelName) {
                    //自定义,不为空
                    if (typeof settings.paramModelName === "string") {
                        data[settings.paramModelName] = settings.paramModel;
                    } else {
                        throw new Error("paramModelName[自定义查询条件参数名称]必须为字符类型");
                        return false;
                    }
                } else {
                    data.paramModel = settings.paramModel; //默认对象名
                }
            } else {
                throw new Error("paramModel[查询条件]格式不正确,要么为空要么为是数组");
                return false;
            }

            ajax({
                type: "POST",
                url: "/" + settings.controller + "/Query",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: data,
                success: settings.success,
                error: settings.error
            });
        }
    },
    //分页条件查询
    page: function page(settings) {
        /// <summary>
        /// 分页条件查询
        /// </summary>
        /// <param name="settings" type="object">settings</param>
        if (!settings.corsUrl) {
            //允许为空,则为当前域名
            settings.corsUrl = "/";
        }
        if (this.validate(settings)) {
            if (settings.pageModel && settings.pageModel instanceof Object) {
                //不能为空
                if (!settings.pageModel.paramModel || settings.pageModel.paramModel && settings.pageModel.paramModel instanceof Array) {
                    //是否数组
                } else {
                    //可以为空
                    throw new Error("pageModel中的paramModel[查询条件]格式不正确,要么为空要么为是数组");
                    return false;
                }
            } else {
                throw new Error("pageModel[分页参数]格式不正确,不能为空必须是对象");
                return false;
            }
            ajax({
                type: "POST",
                url: "/" + settings.controller + "/Page",
                async: settings.async,
                dataType: "json",
                timeout: settings.timeout ? settings.timeout : 25000,
                data: settings.pageModel,
                success: settings.success,
                error: settings.error
            });
        }
    }
};

module.exports = rest;

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56);


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by wangzhiyong on 16/10/5.
 */

//格式化参数
exports.paramFormat = __webpack_require__(75); //格式化参数

//接口
exports.ajax = __webpack_require__(113); //ajax
exports.fetchapi = __webpack_require__(254); //fetch
exports.rest = __webpack_require__(255); //rest

//数据模型
exports.AjaxModel = __webpack_require__(251); //ajax的配置模型
exports.FetchModel = __webpack_require__(252); //fetch的配置模型
exports.RestModel = __webpack_require__(253); //rest的配置模型

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by wangzhiyong on 16/10/5.
 */
//将参数模型中数组转换为对象

//格式化参数
var paramFormat = function paramFormat(data) {
    //将参数中的数组转为后台可识别的格式

    if (!data) {
        return data;
    } else if (typeof data === "string") {
        return data;
    } else if (data.constructor === FormData) {
        //参数为FormData,直接返回
        return data;
    } else if (data instanceof Array) {
        throw new Error("参数必须是字符,空值,对象,FormData,不可以为数组");
        return null;
    }

    data = arrayFormat(data); //将参数模型中数组转换为对象,再格式式参数
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    if (arr.length > 0) {
        return arr.join("&");
    } else {
        return null;
    }

    function arrayFormat(data) {
        var MvcParameterAdaptive = {};
        //验证是否为数组
        MvcParameterAdaptive.isArray = Function.isArray || function (o) {
            return (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && Object.prototype.toString.call(o) === "[object Array]";
        };

        //将数组转换为对象
        MvcParameterAdaptive.convertArrayToObject = function ( /*数组名*/arrName, /*待转换的数组*/array, /*转换后存放的对象，不用输入*/saveOjb) {
            var obj = saveOjb || {};

            function func(name, arr) {
                for (var i in arr) {
                    if (!MvcParameterAdaptive.isArray(arr[i]) && _typeof(arr[i]) === "object") {
                        for (var j in arr[i]) {
                            if (MvcParameterAdaptive.isArray(arr[i][j])) {
                                func(name + "[" + i + "]." + j, arr[i][j]);
                            } else if (_typeof(arr[i][j]) === "object") {
                                MvcParameterAdaptive.convertObject(name + "[" + i + "]." + j + ".", arr[i][j], obj);
                            } else {
                                obj[name + "[" + i + "]." + j] = arr[i][j];
                            }
                        }
                    } else {
                        obj[name + "[" + i + "]"] = arr[i];
                    }
                }
            }

            func(arrName, array);

            return obj;
        };

        //转换对象
        MvcParameterAdaptive.convertObject = function ( /*对象名*/objName, /*待转换的对象*/turnObj, /*转换后存放的对象，不用输入*/saveOjb) {
            var obj = saveOjb || {};

            function func(name, tobj) {
                for (var i in tobj) {
                    if (MvcParameterAdaptive.isArray(tobj[i])) {
                        MvcParameterAdaptive.convertArrayToObject(i, tobj[i], obj);
                    } else if (_typeof(tobj[i]) === "object") {
                        func(name + i + ".", tobj[i]);
                    } else {
                        obj[name + i] = tobj[i];
                    }
                }
            }

            func(objName, turnObj);
            return obj;
        };

        var arrName = ""; //参数名

        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) !== "object") throw new Error("请传入json对象");
        if (MvcParameterAdaptive.isArray(data) && !arrName) throw new Error("必须是对象,如果是数组请使用对象包裹！");

        if (MvcParameterAdaptive.isArray(data)) {
            return MvcParameterAdaptive.convertArrayToObject(arrName, data);
        }
        return MvcParameterAdaptive.convertObject("", data);
    }
};

module.exports = paramFormat;

/***/ })

/******/ });
//# sourceMappingURL=api.js.map