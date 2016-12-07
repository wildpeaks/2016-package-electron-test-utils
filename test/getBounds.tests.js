'use strict';
/* eslint-env browser, mocha */
const assert = require('assert');
const {getBounds} = require('..');


describe('getBounds', () => {
	beforeEach(() => {
		document.documentElement.style.padding = 0;
		document.documentElement.style.margin = 0;
		document.body.style.padding = 0;
		document.body.style.margin = 0;
		document.body.innerHTML = '';
	});

	it('Missing element', () => {
		assert.strictEqual(getBounds(), false);
	});
	it('Invalid element ({})', () => {
		assert.strictEqual(getBounds({}), false);
	});
	it('Invalid element (null)', () => {
		assert.strictEqual(getBounds(null), false);
	});

	it('Valid element (margin)', () => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 20px; padding: 0; border: 0"></div>`;
		const bounds = getBounds(document.body.childNodes[0]);
		assert.deepStrictEqual(bounds, {x: 20, y: 20, width: 100, height: 50});
	});
	it('Valid element (padding)', () => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 0; padding: 30px; border: 0"></div>`;
		const bounds = getBounds(document.body.childNodes[0]);
		assert.deepStrictEqual(bounds, {x: 0, y: 0, width: 160, height: 110});
	});
	it('Valid element (border)', () => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 0; padding: 0; border: 8px"></div>`;
		const bounds = getBounds(document.body.childNodes[0]);
		assert.deepStrictEqual(bounds, {x: 0, y: 0, width: 100, height: 50});
	});
	it('Valid element (margin, padding)', () => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 20px; padding: 30px; border: 0"></div>`;
		const bounds = getBounds(document.body.childNodes[0]);
		assert.deepStrictEqual(bounds, {x: 20, y: 20, width: 160, height: 110});
	});
	it('Valid element (margin, padding, border)', () => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 20px; padding: 30px; border: 8px"></div>`;
		const bounds = getBounds(document.body.childNodes[0]);
		assert.deepStrictEqual(bounds, {x: 20, y: 20, width: 160, height: 110});
	});
});
