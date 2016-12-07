'use strict';
/* eslint-env browser, mocha */
const assert = require('assert');
const {spy} = require('sinon');
const {simulateClick, hasFocus} = require('..');


function test_left_click_div(done){
	const onclick = spy();
	const click = spy();
	const mousedown = spy();
	const mouseup = spy();
	const oncontextmenu = spy();
	const contextmenu = spy();

	document.body.innerHTML = `<div id="mydiv" style="width: 100px; height: 50px;"></div>`;
	const mydiv = document.getElementById('mydiv');
	mydiv.onclick = onclick;
	mydiv.addEventListener('click', click);
	mydiv.addEventListener('mousedown', mousedown);
	mydiv.addEventListener('mouseup', mouseup);
	mydiv.oncontextmenu = oncontextmenu;
	mydiv.addEventListener('contextmenu', contextmenu);

	simulateClick({x: 10, y: 10, button: 'left'});
	setTimeout(() => {
		assert.strictEqual(onclick.callCount, 1, 'onclick is called once');
		assert.strictEqual(click.callCount, 1, 'click is called once');
		assert.strictEqual(mousedown.callCount, 1, 'mousedown is called once');
		assert.strictEqual(mouseup.callCount, 1, 'mouseup is called once');
		assert.strictEqual(oncontextmenu.callCount, 0, 'oncontextmenu is never called');
		assert.strictEqual(contextmenu.callCount, 0, 'contextmenu is never called');

		assert.ok(mousedown.calledBefore(mouseup), 'mousedown is called before mouseup');
		assert.ok(mousedown.calledBefore(click), 'mousedown is called before click');
		assert.ok(mousedown.calledBefore(onclick), 'mousedown is called before onclick');

		done();
	});
}


function test_right_click_div(done){
	const onclick = spy();
	const click = spy();
	const mousedown = spy();
	const mouseup = spy();
	const oncontextmenu = spy();
	const contextmenu = spy();

	document.body.innerHTML = `<div id="mydiv" style="width: 100px; height: 50px;"></div>`;
	const mydiv = document.getElementById('mydiv');
	mydiv.onclick = onclick;
	mydiv.addEventListener('click', click);
	mydiv.addEventListener('mousedown', mousedown);
	mydiv.addEventListener('mouseup', mouseup);
	mydiv.oncontextmenu = oncontextmenu;
	mydiv.addEventListener('contextmenu', contextmenu);

	simulateClick({x: 10, y: 10, button: 'right'});
	setTimeout(() => {
		assert.strictEqual(onclick.callCount, 0, 'onclick is never called');
		assert.strictEqual(click.callCount, 0, 'click is never called');
		assert.strictEqual(mousedown.callCount, 1, 'mousedown is called once');
		assert.strictEqual(mouseup.callCount, 1, 'mouseup is called once');
		assert.strictEqual(oncontextmenu.callCount, 1, 'oncontextmenu is called once');
		assert.strictEqual(contextmenu.callCount, 1, 'contextmenu is called once');

		assert.ok(mousedown.calledBefore(mouseup), 'mousedown is called before mouseup');
		assert.ok(mousedown.calledBefore(contextmenu), 'mousedown is called before contextmenu');
		assert.ok(mousedown.calledBefore(oncontextmenu), 'mousedown is called before oncontextmenu');

		done();
	});
}


function test_left_click_textfield(done){
	document.body.innerHTML = `<input type="text" id="myinput" style="width: 100px; height: 50px;" />`;
	const myinput = document.getElementById('myinput');
	assert.strictEqual(hasFocus(myinput), false, 'Not focused before');
	simulateClick({x: 10, y: 10, button: 'left'});
	setTimeout(() => {
		assert.strictEqual(hasFocus(myinput), true, 'Focused after');
		done();
	});
}


describe('simulateClick', () => {
	beforeEach(() => {
		document.documentElement.style.padding = 0;
		document.documentElement.style.margin = 0;
		document.body.style.padding = 0;
		document.body.style.margin = 0;
		document.body.innerHTML = '';
	});
	it('Left-click on div', test_left_click_div);
	it('Right-click on div', test_right_click_div);
	it('Left-click on textfield', test_left_click_textfield);
});
