'use strict';
/* eslint-env browser, mocha */
const assert = require('assert');
const {hasFocus, simulateKey} = require('..');


function test_tabindex_0_not_autofocused(){
	document.body.innerHTML = `<input id="input0" tabIndex="0" /><input id="input1" tabIndex="1" /><input id="input2" tabIndex="2" />`;
	const input0 = document.getElementById('input0');
	assert.strictEqual(hasFocus(input0), false);
	input0.focus();
	assert.strictEqual(hasFocus(input0), true);
}


function test_tabindex_1_not_autofocused(){
	document.body.innerHTML = `<input id="input0" tabIndex="0" /><input id="input1" tabIndex="1" /><input id="input2" tabIndex="2" />`;
	const input1 = document.getElementById('input1');
	assert.strictEqual(hasFocus(input1), false);
	input1.focus();
	assert.strictEqual(hasFocus(input1), true);
}


function test_tab_none(done){
	document.body.innerHTML = `<input id="input0" tabIndex="0" /><input id="input1" tabIndex="1" /><input id="input2" tabIndex="2" />`;
	const input0 = document.getElementById('input0');
	const input1 = document.getElementById('input1');
	const input2 = document.getElementById('input2');
	assert.strictEqual(hasFocus(input0), false);
	assert.strictEqual(hasFocus(input1), false);
	assert.strictEqual(hasFocus(input2), false);

	simulateKey({keyCode: 'tab'});
	setTimeout(() => {
		assert.strictEqual(hasFocus(input0), true);
		assert.strictEqual(hasFocus(input1), false);
		assert.strictEqual(hasFocus(input2), false);
		done();
	});
}


function test_tab_tabindex_1(done){
	document.body.innerHTML = `<input id="input0" tabIndex="0" /><input id="input1" tabIndex="1" /><input id="input2" tabIndex="2" />`;
	const input0 = document.getElementById('input0');
	const input1 = document.getElementById('input1');
	const input2 = document.getElementById('input2');
	assert.strictEqual(hasFocus(input0), false);
	assert.strictEqual(hasFocus(input1), false);
	assert.strictEqual(hasFocus(input2), false);

	input1.focus();
	assert.strictEqual(hasFocus(input0), false);
	assert.strictEqual(hasFocus(input1), true);
	assert.strictEqual(hasFocus(input2), false);

	simulateKey({keyCode: 'tab'});
	setTimeout(() => {
		assert.strictEqual(hasFocus(input0), false);
		assert.strictEqual(hasFocus(input1), false);
		assert.strictEqual(hasFocus(input2), true);
		done();
	});
}


function test_tab_tabindex_2(done){
	document.body.innerHTML = `<input id="input0" tabIndex="0" /><input id="input1" tabIndex="1" /><input id="input2" tabIndex="2" />`;
	const input0 = document.getElementById('input0');
	const input1 = document.getElementById('input1');
	const input2 = document.getElementById('input2');
	assert.strictEqual(hasFocus(input0), false);
	assert.strictEqual(hasFocus(input1), false);
	assert.strictEqual(hasFocus(input2), false);

	input2.focus();
	assert.strictEqual(hasFocus(input0), false);
	assert.strictEqual(hasFocus(input1), false);
	assert.strictEqual(hasFocus(input2), true);

	simulateKey({keyCode: 'tab'});
	setTimeout(() => {
		assert.strictEqual(hasFocus(input0), true);
		assert.strictEqual(hasFocus(input1), false);
		assert.strictEqual(hasFocus(input2), false);
		done();
	});
}


describe('hasFocus', () => {
	beforeEach(() => {
		document.documentElement.style.padding = 0;
		document.documentElement.style.margin = 0;
		document.body.style.padding = 0;
		document.body.style.margin = 0;
		document.body.innerHTML = '';
	});
	it('Missing element', () => {
		assert.strictEqual(hasFocus(), false);
	});
	it('Invalid element ({})', () => {
		assert.strictEqual(hasFocus({}), false);
	});
	it('Invalid element (null)', () => {
		assert.strictEqual(hasFocus(null), false);
	});
	it('tabIndex 0 is not autofocused', test_tabindex_0_not_autofocused);
	it('tabIndex 1 is not autofocused', test_tabindex_1_not_autofocused);
	it('TAB (none initially focused)', test_tab_none);
	it('TAB (tabIndex 1 initially focused)', test_tab_tabindex_1);
	it('TAB (tabIndex 2 initially focused)', test_tab_tabindex_2);
});
