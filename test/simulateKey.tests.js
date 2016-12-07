'use strict';
/* eslint-env browser, mocha */
const assert = require('assert');
const {spy} = require('sinon');
const {simulateKey} = require('..');


function test_textfield_letters(done){
	document.body.innerHTML = `<input type="text" id="myinput" />`;
	const myinput = document.getElementById('myinput');
	myinput.focus();

	assert.strictEqual(myinput.value, '', 'Value before');

	simulateKey({keyCode: 'H', modifiers: ['shift']});
	simulateKey({keyCode: 'e'});
	simulateKey({keyCode: 'l'});
	simulateKey({keyCode: 'l'});
	simulateKey({keyCode: 'o'});

	setTimeout(() => {
		assert.strictEqual(myinput.value, 'Hello', 'Value after');
		done();
	});
}


function test_textfield_enter(done){
	/* eslint-disable max-len */
	document.body.innerHTML = `<form id="myform" method="get" action="fake"><input type="text" id="myinput" /></form>`;
	const myform = document.getElementById('myform');
	const myinput = document.getElementById('myinput');

	const onsubmit = spy(() => false);
	myform.onsubmit = onsubmit;

	myinput.focus();
	simulateKey({keyCode: 'enter'});

	setTimeout(() => {
		assert.strictEqual(onsubmit.callCount, 1, 'onsubmit is called once');
		done();
	});
}


describe('simulateKey', () => {
	beforeEach(() => {
		document.documentElement.style.padding = 0;
		document.documentElement.style.margin = 0;
		document.body.style.padding = 0;
		document.body.style.margin = 0;
		document.body.innerHTML = '';
	});

	it('Letter keys in textfield', test_textfield_letters);
	it('Enter key in textfield', test_textfield_enter);
});
