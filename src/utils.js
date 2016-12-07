'use strict';
/* eslint-env browser*/
const {remote, nativeImage} = require('electron');


/**
 * Calculates the size and position of a DOM element.
 * The size includes padding, border, and excludes margin.
 * @param  {HTMLElement}  element
 * @return {Object}
 */
function getBounds(element){
	let bounds = false;
	const valid = (typeof element === 'object') && (element !== null) && ('getBoundingClientRect' in element);
	if (valid){
		const rect = element.getBoundingClientRect();
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
		const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
		const clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
		bounds = {
			x: rect.left + scrollLeft - clientLeft,
			y: rect.top + scrollTop - clientTop,
			width: element.offsetWidth,
			height: element.offsetHeight
		};
	}
	return bounds;
}


/**
 * Tests if a DOM element has the focus.
 * @param  {HTMLElement}  element
 * @return {Boolean}
 */
function hasFocus(element){
	return (element === document.activeElement);
}


/**
 * Send an arbitrary mouse click.
 * @param  {Number} options.x          Position from the left
 * @param  {Number} options.y          Position from the top
 * @param  {String} options.button     Type of button, e.g. "left"
 * @param  {Object} options.modifiers  Special keys that are also active
 * @warning: x and y MUST be integer numbers (not floats), otherwise Electron throws an error.
 */
function simulateClick({x = 0, y = 0, button = 'left', modifiers} = {}){
	const webview = remote.getCurrentWebContents();
	webview.sendInputEvent({type: 'mouseDown', x, y, button, clickCount: 1, modifiers});
	webview.sendInputEvent({type: 'mouseUp', x, y, button, clickCount: 1, modifiers});
}


/**
 * Sends an arbitrary keyboard key.
 * @param  {String}  options.keyCode     Character or code of the key being sent
 * @param  {Array}   options.modifiers   Special keys that are also active
 */
function simulateKey({keyCode, modifiers} = {}){
	let code;
	/* eslint-disable indent */
	switch(String(keyCode).toLowerCase()){
		case 'enter':
		case 'return':
			code = '\u000d';
		break;
		default:
			code = keyCode;
		break;
	}
	/* eslint-enable indent */
	const webview = remote.getCurrentWebContents();
	webview.sendInputEvent({type: 'keyDown', keyCode: code, modifiers});
	webview.sendInputEvent({type: 'keyUp', keyCode: code, modifiers});
	webview.sendInputEvent({type: 'char', keyCode: code, modifiers});
}


/**
 * Takes a screenshot of a DOM element.
 * @param  {HTMLElement}  element  The element to render to image
 * @param  {Function}     done     Callback that receives a NativeImage object
 */
function screenshot(element, done){
	if (typeof done === 'function'){
		const valid = (typeof element === 'object') && (element !== null) && ('offsetWidth' in element);
		if (valid){
			const win = remote.getCurrentWindow();
			const bounds = getBounds(element);
			win.capturePage(bounds, done);
		} else {
			done(nativeImage.createEmpty());
		}
	}
}


module.exports = {
	getBounds,
	hasFocus,
	simulateClick,
	simulateKey,
	screenshot
};

