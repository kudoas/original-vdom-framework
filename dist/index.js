/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/framework/app.ts":
/*!******************************!*\
  !*** ./src/framework/app.ts ***!
  \******************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/framework/view.ts");

class App {
    constructor(params) {
        this.el = typeof params.el === "string" ? document.querySelector(params.el) : params.el;
        this.view = params.view;
        this.state = params.state;
        this.actions = this.dispatchAction(params.actions);
        this.resolveNode();
    }
    /**
     * ユーザが定義したActionsに仮想DOM再構築用のフックを仕込む
     * @param actions
     */
    dispatchAction(actions) {
        const dispatched = {};
        for (const key in actions) {
            const action = actions[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatched[key] = (state, ...data) => {
                const ret = action(state, ...data);
                this.resolveNode();
                return ret;
            };
        }
        return dispatched;
    }
    /**
     * 仮想DOMを構築する
     */
    resolveNode() {
        // 仮想DOMを再構築する
        this.newNode = this.view(this.state, this.actions);
        this.scheduleRender();
    }
    /**
     * renderのスケジューリングを行う
     */
    scheduleRender() {
        if (!this.skipRender) {
            this.skipRender = true;
            // setTimeoutを使うことで非同期になり、かつ実行を数ミリ秒遅延できる
            setTimeout(this.render.bind(this));
        }
    }
    /**
     * リアルDOMに反映する
     */
    render() {
        if (this.oldNode) {
            Object(_view__WEBPACK_IMPORTED_MODULE_0__["updateElement"])(this.el, this.oldNode, this.newNode);
        }
        else {
            this.el.appendChild(Object(_view__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.newNode));
        }
        this.oldNode = this.newNode;
        this.skipRender = false;
    }
}


/***/ }),

/***/ "./src/framework/view.ts":
/*!*******************************!*\
  !*** ./src/framework/view.ts ***!
  \*******************************/
/*! exports provided: h, createElement, updateElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateElement", function() { return updateElement; });
/** image */
/**
input h(): h("h1", {class: "title"}, "仮想DOM実践入門")
output vdom:
  {
    nodeName: "h1",
    attributes: { class: "title", "onclick": funcition() },
    children: "仮想DOM実践入門"
  }
*/
/** vdomを作成する関数 */
const h = (nodeName, attributes, ...children) => {
    return { nodeName, attributes, children };
};
/** リアルDOMを生成する */
const createElement = (node) => {
    if (!isVNode(node)) {
        return document.createTextNode(node.toString());
    }
    const el = document.createElement(node.nodeName);
    setAttributes(el, node.attributes);
    node.children.forEach((child) => el.appendChild(createElement(child)));
    return el;
};
const isVNode = (node) => {
    return typeof node !== "string" && typeof node !== "number";
};
/** targetに属性を設定する */
/** attr: {"class": "hoge", "onclick": function} */
const setAttributes = (target, attrs) => {
    for (let attr in attrs) {
        if (isEventAttr(attr)) {
            const eventName = attr.slice(2);
            target.addEventListener(eventName, attrs[attr]);
        }
        else {
            target.setAttribute(attr, attrs[attr]);
        }
    }
};
/** onがついてたらイベント */
const isEventAttr = (attr) => {
    return /^on/.test(attr);
};
/**　差分検知 */
var ChangedType;
(function (ChangedType) {
    /** no diff */
    ChangedType[ChangedType["None"] = 0] = "None";
    /** nodeの型が違う */
    ChangedType[ChangedType["Type"] = 1] = "Type";
    /** テキストノードが違う */
    ChangedType[ChangedType["Text"] = 2] = "Text";
    /** ノード名(タグ名)が違う */
    ChangedType[ChangedType["Node"] = 3] = "Node";
    /** inputのvalueが違う */
    ChangedType[ChangedType["Value"] = 4] = "Value";
    /** 属性が違う */
    ChangedType[ChangedType["Attr"] = 5] = "Attr";
})(ChangedType || (ChangedType = {}));
const hasChanged = (a, b) => {
    // different type
    if (typeof a != typeof b) {
        return ChangedType.Type;
    }
    // different string
    if (!isVNode(a) && a !== b) {
        return ChangedType.Text;
    }
    if (isVNode(a) && isVNode(b)) {
        if (a.nodeName != b.nodeName) {
            return ChangedType.Node;
        }
        if (a.attributes.value !== b.attributes.value) {
            return ChangedType.Value;
        }
        if (JSON.stringify(a.attributes) !== JSON.stringify(b.attributes)) {
            return ChangedType.Attr;
        }
    }
    return ChangedType.None;
};
/**
 * 仮想DOMの差分を検知し、リアルDOMに反映する
 */
const updateElement = (parent, oldNode, newNode, index = 0) => {
    // oldNodeがない場合は新しいNodeを作成する
    if (!oldNode) {
        parent.appendChild(createElement(newNode));
        return;
    }
    // newNodeがない場合は削除されたと判断し、そのNodeを削除する
    const target = parent.childNodes[index];
    if (!newNode) {
        parent.removeChild(target);
        return;
    }
    // 差分検知し、パッチ処理（変更箇所だけ反映）を行う
    const changeType = hasChanged(oldNode, newNode);
    switch (changeType) {
        case ChangedType.Type:
        case ChangedType.Text:
        case ChangedType.Node:
            parent.replaceChild(createElement(newNode), target);
            return;
        case ChangedType.Value:
            updateValue(target, newNode.attributes.value);
            return;
        case ChangedType.Attr:
            updateAttributes(target, oldNode.attributes, newNode.attributes);
            return;
    }
    // 子要素の差分検知・リアルDOM反映を再帰的に実行する
    if (isVNode(oldNode) && isVNode(newNode)) {
        for (let i = 0; i < newNode.children.length || i < oldNode.children.length; i++) {
            updateElement(target, oldNode.children[i], newNode.children[i], i);
        }
    }
};
const updateAttributes = (target, oldAttrs, newAttrs) => {
    for (let attr in oldAttrs) {
        if (!isEventAttr(attr)) {
            target.removeAttribute(attr);
        }
    }
    for (let attr in newAttrs) {
        if (!isEventAttr(attr)) {
            target.setAttribute(attr, newAttrs[attr]);
        }
    }
};
const updateValue = (target, newValue) => {
    target.value = newValue;
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _framework_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework/view */ "./src/framework/view.ts");
/* harmony import */ var _framework_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./framework/app */ "./src/framework/app.ts");


const state = {
    tasks: ["Learn about Virtual DOM", "Write a document"],
    form: {
        title: "",
        hasError: false,
    },
};
const actions = {
    validate(state, title) {
        if (!title || title.length < 3 || title.length > 20) {
            state.form.hasError = true;
        }
        else {
            state.form.hasError = false;
        }
        return !state.form.hasError;
    },
    createTask(state, title = "") {
        state.tasks.push(title);
        state.form.title = "";
    },
    removeTask(state, index) {
        state.tasks.splice(index, 1);
    },
};
/**
 * View: 描画関連
 */
const view = (state, actions) => {
    // prettier-ignore
    return Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('div', {
        class: 'nes-container is-rounded',
        style: 'padding: 2rem;'
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('h1', {
        class: 'title',
        style: 'margin-bottom: 2rem;'
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('i', { class: 'nes-icon heart is-medium' }), 'Virtual DOM TODO App '), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('form', {
        class: 'nes-container',
        style: 'margin-bottom: 2rem;'
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('div', {
        class: 'nes-field',
        style: 'margin-bottom: 1rem;',
    }, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('label', {
        class: 'label',
        for: 'task-title'
    }, 'Title'), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('input', {
        type: 'text',
        id: 'task-title',
        class: 'nes-input',
        value: state.form.title,
        oninput: (ev) => {
            const target = ev.target;
            state.form.title = target.value;
            actions.validate(state, target.value);
        }
    })), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('p', {
        class: 'nes-text is-error',
        style: `display: ${state.form.hasError ? 'display' : 'none'}`,
    }, 'Enter a value between 3 and 20 characters'), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('button', {
        type: 'button',
        class: 'nes-btn is-primary',
        onclick: () => {
            if (state.form.hasError)
                return;
            actions.createTask(state, state.form.title);
        }
    }, 'Create')), Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('ul', { class: 'nes-list is-disc nes-container' }, ...state.tasks.map((task, i) => {
        return Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('li', {
            class: 'item',
            style: 'margin-bottom: 1rem;'
        }, task, Object(_framework_view__WEBPACK_IMPORTED_MODULE_0__["h"])('button', {
            type: 'button',
            class: 'nes-btn is-error',
            style: 'margin-left: 1rem;',
            onclick: () => actions.removeTask(state, i)
        }, '×'));
    })));
};
new _framework_app__WEBPACK_IMPORTED_MODULE_1__["App"]({
    el: "#app",
    state,
    view,
    actions,
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay92aWV3LnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFtRTtBQWM1RCxNQUFNLEdBQUc7SUFjZCxZQUFZLE1BQXNDO1FBQ2hELElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDeEYsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFN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LHlEQUFDLENBQ04sSUFBSSxFQUNKO1lBQ0UsS0FBSyxFQUFFLE1BQU07WUFDYixLQUFLLEVBQUUsc0JBQXNCO1NBQzlCLEVBQ0QsSUFBSSxFQUNKLHlEQUFDLENBQ0MsUUFBUSxFQUNSO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFDZCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM1QyxFQUNELEdBQUcsQ0FDSixDQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FDRjtBQUNILENBQUMsQ0FBQztBQUVGLElBQUksa0RBQUcsQ0FBaUI7SUFDdEIsRUFBRSxFQUFFLE1BQU07SUFDVixLQUFLO0lBQ0wsSUFBSTtJQUNKLE9BQU87Q0FDUixDQUFDLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IFZpZXcsIFZOb2RlLCB1cGRhdGVFbGVtZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcIi4vdmlld1wiO1xuaW1wb3J0IHsgQWN0aW9uVHJlZSB9IGZyb20gXCIuL2FjdGlvblwiO1xuXG5pbnRlcmZhY2UgQXBwQ29uc3RydWN0b3I8U3RhdGUsIEFjdGlvbnMgZXh0ZW5kcyBBY3Rpb25UcmVlPFN0YXRlPj4ge1xuICAvKiog44Oh44Kk44OzTm9kZSAqL1xuICBlbDogRWxlbWVudCB8IHN0cmluZztcbiAgLyoqIFZpZXfjga7lrprnvqkgKi9cbiAgdmlldzogVmlldzxTdGF0ZSwgQWN0aW9ucz47XG4gIC8qKiDnirbmhYvnrqHnkIYgKi9cbiAgc3RhdGU6IFN0YXRlO1xuICAvKiogQWN0aW9u44Gu5a6a576pICovXG4gIGFjdGlvbnM6IEFjdGlvbnM7XG59XG5cbmV4cG9ydCBjbGFzcyBBcHA8U3RhdGUsIEFjdGlvbnMgZXh0ZW5kcyBBY3Rpb25UcmVlPFN0YXRlPj4ge1xuICBwcml2YXRlIHJlYWRvbmx5IGVsOiBFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IHZpZXc6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPltcInZpZXdcIl07XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhdGU6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPltcInN0YXRlXCJdO1xuICBwcml2YXRlIHJlYWRvbmx5IGFjdGlvbnM6IEFwcENvbnN0cnVjdG9yPFN0YXRlLCBBY3Rpb25zPltcImFjdGlvbnNcIl07XG5cbiAgLyoqIOS7ruaDs0RPTe+8iOWkieabtOWJjeeUqO+8iSAqL1xuICBwcml2YXRlIG9sZE5vZGU6IFZOb2RlO1xuICAvKiog5Luu5oOzRE9N77yI5aSJ5pu05b6M55So77yJICovXG4gIHByaXZhdGUgbmV3Tm9kZTogVk5vZGU7XG5cbiAgLyoqIOmAo+e2muOBp+ODquOCouODq0RPTeaTjeS9nOOBjOi1sOOCieOBquOBhOOBn+OCgeOBruODleODqeOCsCAqL1xuICBwcml2YXRlIHNraXBSZW5kZXI6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiBBcHBDb25zdHJ1Y3RvcjxTdGF0ZSwgQWN0aW9ucz4pIHtcbiAgICB0aGlzLmVsID0gdHlwZW9mIHBhcmFtcy5lbCA9PT0gXCJzdHJpbmdcIiA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1zLmVsKSA6IHBhcmFtcy5lbDtcbiAgICB0aGlzLnZpZXcgPSBwYXJhbXMudmlldztcbiAgICB0aGlzLnN0YXRlID0gcGFyYW1zLnN0YXRlO1xuICAgIHRoaXMuYWN0aW9ucyA9IHRoaXMuZGlzcGF0Y2hBY3Rpb24ocGFyYW1zLmFjdGlvbnMpO1xuICAgIHRoaXMucmVzb2x2ZU5vZGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg6bjg7zjgrbjgYzlrprnvqnjgZfjgZ9BY3Rpb25z44Gr5Luu5oOzRE9N5YaN5qeL56+J55So44Gu44OV44OD44Kv44KS5LuV6L6844KAXG4gICAqIEBwYXJhbSBhY3Rpb25zXG4gICAqL1xuICBwcml2YXRlIGRpc3BhdGNoQWN0aW9uKGFjdGlvbnM6IEFjdGlvbnMpOiBBY3Rpb25zIHtcbiAgICBjb25zdCBkaXNwYXRjaGVkOiBBY3Rpb25UcmVlPFN0YXRlPiA9IHt9O1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gYWN0aW9ucykge1xuICAgICAgY29uc3QgYWN0aW9uID0gYWN0aW9uc1trZXldO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGRpc3BhdGNoZWRba2V5XSA9IChzdGF0ZTogU3RhdGUsIC4uLmRhdGE6IGFueSk6IGFueSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IGFjdGlvbihzdGF0ZSwgLi4uZGF0YSk7XG4gICAgICAgIHRoaXMucmVzb2x2ZU5vZGUoKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3BhdGNoZWQgYXMgQWN0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiDku67mg7NET03jgpLmp4vnr4njgZnjgotcbiAgICovXG4gIHByaXZhdGUgcmVzb2x2ZU5vZGUoKTogdm9pZCB7XG4gICAgLy8g5Luu5oOzRE9N44KS5YaN5qeL56+J44GZ44KLXG4gICAgdGhpcy5uZXdOb2RlID0gdGhpcy52aWV3KHRoaXMuc3RhdGUsIHRoaXMuYWN0aW9ucyk7XG4gICAgdGhpcy5zY2hlZHVsZVJlbmRlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbmRlcuOBruOCueOCseOCuOODpeODvOODquODs+OCsOOCkuihjOOBhlxuICAgKi9cbiAgcHJpdmF0ZSBzY2hlZHVsZVJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc2tpcFJlbmRlcikge1xuICAgICAgdGhpcy5za2lwUmVuZGVyID0gdHJ1ZTtcbiAgICAgIC8vIHNldFRpbWVvdXTjgpLkvb/jgYbjgZPjgajjgafpnZ7lkIzmnJ/jgavjgarjgorjgIHjgYvjgaTlrp/ooYzjgpLmlbDjg5/jg6rnp5LpgYXlu7bjgafjgY3jgotcbiAgICAgIHNldFRpbWVvdXQodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODquOCouODq0RPTeOBq+WPjeaYoOOBmeOCi1xuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub2xkTm9kZSkge1xuICAgICAgdXBkYXRlRWxlbWVudCh0aGlzLmVsIGFzIEhUTUxFbGVtZW50LCB0aGlzLm9sZE5vZGUsIHRoaXMubmV3Tm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCh0aGlzLm5ld05vZGUpKTtcbiAgICB9XG5cbiAgICB0aGlzLm9sZE5vZGUgPSB0aGlzLm5ld05vZGU7XG4gICAgdGhpcy5za2lwUmVuZGVyID0gZmFsc2U7XG4gIH1cbn1cbiIsIi8qKiBpbWFnZSAqL1xuLyoqXG5pbnB1dCBoKCk6IGgoXCJoMVwiLCB7Y2xhc3M6IFwidGl0bGVcIn0sIFwi5Luu5oOzRE9N5a6f6Le15YWl6ZaAXCIpXG5vdXRwdXQgdmRvbTogXG4gIHtcbiAgICBub2RlTmFtZTogXCJoMVwiLFxuICAgIGF0dHJpYnV0ZXM6IHsgY2xhc3M6IFwidGl0bGVcIiwgXCJvbmNsaWNrXCI6IGZ1bmNpdGlvbigpIH0sXG4gICAgY2hpbGRyZW46IFwi5Luu5oOzRE9N5a6f6Le15YWl6ZaAXCJcbiAgfVxuKi9cblxudHlwZSBOb2RlVHlwZSA9IFZOb2RlIHwgc3RyaW5nIHwgbnVtYmVyO1xudHlwZSBBdHRyaWJ1dGVzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBGdW5jdGlvbiB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpZXc8U3RhdGUsIEFjdGlvbj4ge1xuICAoc3RhdGU6IFN0YXRlLCBhY3Rpb246IEFjdGlvbik6IFZOb2RlO1xufVxuXG4vKiogdmRvbSAqL1xuZXhwb3J0IGludGVyZmFjZSBWTm9kZSB7XG4gIG5vZGVOYW1lOiBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXA7XG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXM7XG4gIGNoaWxkcmVuOiBOb2RlVHlwZVtdO1xufVxuXG4vKiogdmRvbeOCkuS9nOaIkOOBmeOCi+mWouaVsCAqL1xuZXhwb3J0IGNvbnN0IGggPSAoXG4gIG5vZGVOYW1lOiBrZXlvZiBIVE1MRWxlbWVudFRhZ05hbWVNYXAsXG4gIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXMsXG4gIC4uLmNoaWxkcmVuOiBOb2RlVHlwZVtdXG4pOiBWTm9kZSA9PiB7XG4gIHJldHVybiB7IG5vZGVOYW1lLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbiB9O1xufTtcblxuLyoqIOODquOCouODq0RPTeOCkueUn+aIkOOBmeOCiyAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAobm9kZTogTm9kZVR5cGUpOiBIVE1MRWxlbWVudCB8IFRleHQgPT4ge1xuICBpZiAoIWlzVk5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZS50b1N0cmluZygpKTtcbiAgfVxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZS5ub2RlTmFtZSk7XG4gIHNldEF0dHJpYnV0ZXMoZWwsIG5vZGUuYXR0cmlidXRlcyk7XG4gIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IGVsLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoY2hpbGQpKSk7XG4gIHJldHVybiBlbDtcbn07XG5cbmNvbnN0IGlzVk5vZGUgPSAobm9kZTogTm9kZVR5cGUpOiBub2RlIGlzIFZOb2RlID0+IHtcbiAgcmV0dXJuIHR5cGVvZiBub2RlICE9PSBcInN0cmluZ1wiICYmIHR5cGVvZiBub2RlICE9PSBcIm51bWJlclwiO1xufTtcblxuLyoqIHRhcmdldOOBq+WxnuaAp+OCkuioreWumuOBmeOCiyAqL1xuLyoqIGF0dHI6IHtcImNsYXNzXCI6IFwiaG9nZVwiLCBcIm9uY2xpY2tcIjogZnVuY3Rpb259ICovXG5jb25zdCBzZXRBdHRyaWJ1dGVzID0gKHRhcmdldDogSFRNTEVsZW1lbnQsIGF0dHJzOiBBdHRyaWJ1dGVzKSA9PiB7XG4gIGZvciAobGV0IGF0dHIgaW4gYXR0cnMpIHtcbiAgICBpZiAoaXNFdmVudEF0dHIoYXR0cikpIHtcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGF0dHIuc2xpY2UoMik7XG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGF0dHJzW2F0dHJdIGFzIEV2ZW50TGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdIGFzIHN0cmluZyk7XG4gICAgfVxuICB9XG59O1xuXG4vKiogb27jgYzjgaTjgYTjgabjgZ/jgonjgqTjg5njg7Pjg4ggKi9cbmNvbnN0IGlzRXZlbnRBdHRyID0gKGF0dHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gL15vbi8udGVzdChhdHRyKTtcbn07XG5cbi8qKuOAgOW3ruWIhuaknOefpSAqL1xuZW51bSBDaGFuZ2VkVHlwZSB7XG4gIC8qKiBubyBkaWZmICovXG4gIE5vbmUsXG5cbiAgLyoqIG5vZGXjga7lnovjgYzpgZXjgYYgKi9cbiAgVHlwZSxcblxuICAvKiog44OG44Kt44K544OI44OO44O844OJ44GM6YGV44GGICovXG4gIFRleHQsXG5cbiAgLyoqIOODjuODvOODieWQjSjjgr/jgrDlkI0p44GM6YGV44GGICovXG4gIE5vZGUsXG5cbiAgLyoqIGlucHV044GudmFsdWXjgYzpgZXjgYYgKi9cbiAgVmFsdWUsXG5cbiAgLyoqIOWxnuaAp+OBjOmBleOBhiAqL1xuICBBdHRyLFxufVxuXG5jb25zdCBoYXNDaGFuZ2VkID0gKGE6IE5vZGVUeXBlLCBiOiBOb2RlVHlwZSk6IENoYW5nZWRUeXBlID0+IHtcbiAgLy8gZGlmZmVyZW50IHR5cGVcbiAgaWYgKHR5cGVvZiBhICE9IHR5cGVvZiBiKSB7XG4gICAgcmV0dXJuIENoYW5nZWRUeXBlLlR5cGU7XG4gIH1cblxuICAvLyBkaWZmZXJlbnQgc3RyaW5nXG4gIGlmICghaXNWTm9kZShhKSAmJiBhICE9PSBiKSB7XG4gICAgcmV0dXJuIENoYW5nZWRUeXBlLlRleHQ7XG4gIH1cblxuICBpZiAoaXNWTm9kZShhKSAmJiBpc1ZOb2RlKGIpKSB7XG4gICAgaWYgKGEubm9kZU5hbWUgIT0gYi5ub2RlTmFtZSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLk5vZGU7XG4gICAgfVxuICAgIGlmIChhLmF0dHJpYnV0ZXMudmFsdWUgIT09IGIuYXR0cmlidXRlcy52YWx1ZSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLlZhbHVlO1xuICAgIH1cbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkoYS5hdHRyaWJ1dGVzKSAhPT0gSlNPTi5zdHJpbmdpZnkoYi5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIENoYW5nZWRUeXBlLkF0dHI7XG4gICAgfVxuICB9XG4gIHJldHVybiBDaGFuZ2VkVHlwZS5Ob25lO1xufTtcblxuLyoqXG4gKiDku67mg7NET03jga7lt67liIbjgpLmpJznn6XjgZfjgIHjg6rjgqLjg6tET03jgavlj43mmKDjgZnjgotcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUVsZW1lbnQgPSAoXG4gIHBhcmVudDogSFRNTEVsZW1lbnQsXG4gIG9sZE5vZGU6IE5vZGVUeXBlLFxuICBuZXdOb2RlOiBOb2RlVHlwZSxcbiAgaW5kZXggPSAwXG4pID0+IHtcbiAgLy8gb2xkTm9kZeOBjOOBquOBhOWgtOWQiOOBr+aWsOOBl+OBhE5vZGXjgpLkvZzmiJDjgZnjgotcbiAgaWYgKCFvbGROb2RlKSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQobmV3Tm9kZSkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIG5ld05vZGXjgYzjgarjgYTloLTlkIjjga/liYrpmaTjgZXjgozjgZ/jgajliKTmlq3jgZfjgIHjgZ3jga5Ob2Rl44KS5YmK6Zmk44GZ44KLXG4gIGNvbnN0IHRhcmdldCA9IHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XTtcbiAgaWYgKCFuZXdOb2RlKSB7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHRhcmdldCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8g5beu5YiG5qSc55+l44GX44CB44OR44OD44OB5Yem55CG77yI5aSJ5pu0566H5omA44Gg44GR5Y+N5pig77yJ44KS6KGM44GGXG4gIGNvbnN0IGNoYW5nZVR5cGUgPSBoYXNDaGFuZ2VkKG9sZE5vZGUsIG5ld05vZGUpO1xuICBzd2l0Y2ggKGNoYW5nZVR5cGUpIHtcbiAgICBjYXNlIENoYW5nZWRUeXBlLlR5cGU6XG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5UZXh0OlxuICAgIGNhc2UgQ2hhbmdlZFR5cGUuTm9kZTpcbiAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoY3JlYXRlRWxlbWVudChuZXdOb2RlKSwgdGFyZ2V0KTtcbiAgICAgIHJldHVybjtcbiAgICBjYXNlIENoYW5nZWRUeXBlLlZhbHVlOlxuICAgICAgdXBkYXRlVmFsdWUodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQsIChuZXdOb2RlIGFzIFZOb2RlKS5hdHRyaWJ1dGVzLnZhbHVlIGFzIHN0cmluZyk7XG4gICAgICByZXR1cm47XG4gICAgY2FzZSBDaGFuZ2VkVHlwZS5BdHRyOlxuICAgICAgdXBkYXRlQXR0cmlidXRlcyhcbiAgICAgICAgdGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gICAgICAgIChvbGROb2RlIGFzIFZOb2RlKS5hdHRyaWJ1dGVzLFxuICAgICAgICAobmV3Tm9kZSBhcyBWTm9kZSkuYXR0cmlidXRlc1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIOWtkOimgee0oOOBruW3ruWIhuaknOefpeODu+ODquOCouODq0RPTeWPjeaYoOOCkuWGjeW4sOeahOOBq+Wun+ihjOOBmeOCi1xuICBpZiAoaXNWTm9kZShvbGROb2RlKSAmJiBpc1ZOb2RlKG5ld05vZGUpKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdOb2RlLmNoaWxkcmVuLmxlbmd0aCB8fCBpIDwgb2xkTm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgdXBkYXRlRWxlbWVudCh0YXJnZXQgYXMgSFRNTEVsZW1lbnQsIG9sZE5vZGUuY2hpbGRyZW5baV0sIG5ld05vZGUuY2hpbGRyZW5baV0sIGkpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlQXR0cmlidXRlcyA9ICh0YXJnZXQ6IEhUTUxFbGVtZW50LCBvbGRBdHRyczogQXR0cmlidXRlcywgbmV3QXR0cnM6IEF0dHJpYnV0ZXMpID0+IHtcbiAgZm9yIChsZXQgYXR0ciBpbiBvbGRBdHRycykge1xuICAgIGlmICghaXNFdmVudEF0dHIoYXR0cikpIHtcbiAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgYXR0ciBpbiBuZXdBdHRycykge1xuICAgIGlmICghaXNFdmVudEF0dHIoYXR0cikpIHtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmV3QXR0cnNbYXR0cl0gYXMgc3RyaW5nKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVZhbHVlID0gKHRhcmdldDogSFRNTElucHV0RWxlbWVudCwgbmV3VmFsdWU6IHN0cmluZykgPT4ge1xuICB0YXJnZXQudmFsdWUgPSBuZXdWYWx1ZTtcbn07XG4iLCJpbXBvcnQgeyBBY3Rpb25UcmVlIH0gZnJvbSBcIi4vZnJhbWV3b3JrL2FjdGlvblwiO1xuaW1wb3J0IHsgVmlldywgaCB9IGZyb20gXCIuL2ZyYW1ld29yay92aWV3XCI7XG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9mcmFtZXdvcmsvYXBwXCI7XG5cbi8qKlxuICogU3RhdGU6IOeKtuaFi+euoeeQhlxuICovXG50eXBlIFRhc2sgPSBzdHJpbmc7XG50eXBlIEZvcm0gPSB7XG4gIC8qKiDjgr/jgrnjgq/jga7jgr/jgqTjg4jjg6sgKi9cbiAgdGl0bGU6IHN0cmluZztcbiAgLyoqIOODkOODquODh+ODvOOCt+ODp+ODs+e1kOaenCAqL1xuICBoYXNFcnJvcjogYm9vbGVhbjtcbn07XG50eXBlIFN0YXRlID0ge1xuICAvKiog44K/44K544Kv5LiA6KanICovXG4gIHRhc2tzOiBUYXNrW107XG4gIC8qKiDjg5Xjgqnjg7zjg6Djga7nirbmhYsgKi9cbiAgZm9ybTogRm9ybTtcbn07XG5jb25zdCBzdGF0ZTogU3RhdGUgPSB7XG4gIHRhc2tzOiBbXCJMZWFybiBhYm91dCBWaXJ0dWFsIERPTVwiLCBcIldyaXRlIGEgZG9jdW1lbnRcIl0sXG4gIGZvcm06IHtcbiAgICB0aXRsZTogXCJcIixcbiAgICBoYXNFcnJvcjogZmFsc2UsXG4gIH0sXG59O1xuXG4vKipcbiAqIEFjdGlvbnM6IOWQhOeoruOCpOODmeODs+ODiOWHpueQhlxuICovXG5pbnRlcmZhY2UgQWN0aW9ucyBleHRlbmRzIEFjdGlvblRyZWU8U3RhdGU+IHtcbiAgLyoqIOOCv+OCpOODiOODq+OBruWFpeWKm+ODgeOCp+ODg+OCr+OCkuihjOOBhiAqL1xuICB2YWxpZGF0ZTogKHN0YXRlOiBTdGF0ZSwgdGl0bGU6IHN0cmluZykgPT4gYm9vbGVhbjtcbiAgLyoqIOaWsOOBl+OBhOOCv+OCueOCr+OCkuS9nOaIkOOBmeOCiyAqL1xuICBjcmVhdGVUYXNrOiAoc3RhdGU6IFN0YXRlLCB0aXRsZTogc3RyaW5nKSA9PiB2b2lkO1xuICAvKiogaW5kZXjjgafmjIflrprjgZfjgZ/jgr/jgrnjgq/jgpLliYrpmaTjgZnjgosgKi9cbiAgcmVtb3ZlVGFzazogKHN0YXRlOiBTdGF0ZSwgaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcbn1cbmNvbnN0IGFjdGlvbnM6IEFjdGlvbnMgPSB7XG4gIHZhbGlkYXRlKHN0YXRlLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aXRsZSB8fCB0aXRsZS5sZW5ndGggPCAzIHx8IHRpdGxlLmxlbmd0aCA+IDIwKSB7XG4gICAgICBzdGF0ZS5mb3JtLmhhc0Vycm9yID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuZm9ybS5oYXNFcnJvciA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhc3RhdGUuZm9ybS5oYXNFcnJvcjtcbiAgfSxcblxuICBjcmVhdGVUYXNrKHN0YXRlLCB0aXRsZSA9IFwiXCIpIHtcbiAgICBzdGF0ZS50YXNrcy5wdXNoKHRpdGxlKTtcbiAgICBzdGF0ZS5mb3JtLnRpdGxlID0gXCJcIjtcbiAgfSxcblxuICByZW1vdmVUYXNrKHN0YXRlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgc3RhdGUudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfSxcbn07XG5cbi8qKlxuICogVmlldzog5o+P55S76Zai6YCjXG4gKi9cbmNvbnN0IHZpZXc6IFZpZXc8U3RhdGUsIEFjdGlvbnM+ID0gKHN0YXRlLCBhY3Rpb25zKSA9PiB7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICByZXR1cm4gaChcbiAgICAnZGl2JyxcbiAgICB7XG4gICAgICBjbGFzczogJ25lcy1jb250YWluZXIgaXMtcm91bmRlZCcsXG4gICAgICBzdHlsZTogJ3BhZGRpbmc6IDJyZW07J1xuICAgIH0sXG4gICAgaChcbiAgICAgICdoMScsXG4gICAgICB7XG4gICAgICAgIGNsYXNzOiAndGl0bGUnLFxuICAgICAgICBzdHlsZTogJ21hcmdpbi1ib3R0b206IDJyZW07J1xuICAgICAgfSxcbiAgICAgIGgoJ2knLCB7IGNsYXNzOiAnbmVzLWljb24gaGVhcnQgaXMtbWVkaXVtJyB9KSxcbiAgICAgICdWaXJ0dWFsIERPTSBUT0RPIEFwcCAnXG4gICAgKSxcbiAgICBoKFxuICAgICAgJ2Zvcm0nLFxuICAgICAge1xuICAgICAgICBjbGFzczogJ25lcy1jb250YWluZXInLFxuICAgICAgICBzdHlsZTogJ21hcmdpbi1ib3R0b206IDJyZW07J1xuICAgICAgfSxcbiAgICAgIGgoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3M6ICduZXMtZmllbGQnLFxuICAgICAgICAgIHN0eWxlOiAnbWFyZ2luLWJvdHRvbTogMXJlbTsnLFxuICAgICAgICB9LFxuICAgICAgICBoKFxuICAgICAgICAgICdsYWJlbCcsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3M6ICdsYWJlbCcsXG4gICAgICAgICAgICBmb3I6ICd0YXNrLXRpdGxlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ1RpdGxlJ1xuICAgICAgICApLFxuICAgICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgaWQ6ICd0YXNrLXRpdGxlJyxcbiAgICAgICAgICBjbGFzczogJ25lcy1pbnB1dCcsXG4gICAgICAgICAgdmFsdWU6IHN0YXRlLmZvcm0udGl0bGUsXG4gICAgICAgICAgb25pbnB1dDogKGV2OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXYudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICAgICAgICAgIHN0YXRlLmZvcm0udGl0bGUgPSB0YXJnZXQudmFsdWVcbiAgICAgICAgICAgIGFjdGlvbnMudmFsaWRhdGUoc3RhdGUsIHRhcmdldC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICAgIGgoXG4gICAgICAgICdwJyxcbiAgICAgICAge1xuICAgICAgICAgIGNsYXNzOiAnbmVzLXRleHQgaXMtZXJyb3InLFxuICAgICAgICAgIHN0eWxlOiBgZGlzcGxheTogJHtzdGF0ZS5mb3JtLmhhc0Vycm9yID8gJ2Rpc3BsYXknIDogJ25vbmUnfWAsXG4gICAgICAgIH0sXG4gICAgICAgICdFbnRlciBhIHZhbHVlIGJldHdlZW4gMyBhbmQgMjAgY2hhcmFjdGVycydcbiAgICAgICksXG4gICAgICBoKFxuICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIGNsYXNzOiAnbmVzLWJ0biBpcy1wcmltYXJ5JyxcbiAgICAgICAgICBvbmNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZm9ybS5oYXNFcnJvcikgcmV0dXJuXG4gICAgICAgICAgICBhY3Rpb25zLmNyZWF0ZVRhc2soc3RhdGUsIHN0YXRlLmZvcm0udGl0bGUpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAnQ3JlYXRlJ1xuICAgICAgKVxuICAgICksXG4gICAgaChcbiAgICAgICd1bCcsXG4gICAgICB7IGNsYXNzOiAnbmVzLWxpc3QgaXMtZGlzYyBuZXMtY29udGFpbmVyJyB9LFxuICAgICAgLi4uc3RhdGUudGFza3MubWFwKCh0YXNrLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiBoKFxuICAgICAgICAgICdsaScsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3M6ICdpdGVtJyxcbiAgICAgICAgICAgIHN0eWxlOiAnbWFyZ2luLWJvdHRvbTogMXJlbTsnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0YXNrLFxuICAgICAgICAgIGgoXG4gICAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgICAgIGNsYXNzOiAnbmVzLWJ0biBpcy1lcnJvcicsXG4gICAgICAgICAgICAgIHN0eWxlOiAnbWFyZ2luLWxlZnQ6IDFyZW07JyxcbiAgICAgICAgICAgICAgb25jbGljazogKCkgPT4gYWN0aW9ucy5yZW1vdmVUYXNrKHN0YXRlLCBpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICfDlydcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICApXG59O1xuXG5uZXcgQXBwPFN0YXRlLCBBY3Rpb25zPih7XG4gIGVsOiBcIiNhcHBcIixcbiAgc3RhdGUsXG4gIHZpZXcsXG4gIGFjdGlvbnMsXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=