'use strict';
/* eslint-env browser, mocha */
/* eslint-disable no-undefined */
/* eslint-disable no-empty-function */
const assert = require('assert');
const {screenshot} = require('..');


function isNativeImage(image){
	return (typeof image === 'object') && (image !== null) && ('isEmpty' in image);
}


describe('screenshot', () => {
	beforeEach(() => {
		document.documentElement.style.padding = 0;
		document.documentElement.style.margin = 0;
		document.body.style.padding = 0;
		document.body.style.margin = 0;
		document.body.innerHTML = '';
	});

	it('Missing element, Missing callback', () => {
		screenshot();
	});
	it('Missing callback', () => {
		screenshot(document.body);
	});

	it('Invalid callback (null)', () => {
		screenshot(document.body, null);
	});
	it('Invalid callback ({})', () => {
		screenshot(document.body, {});
	});
	it('Invalid callback (true)', () => {
		screenshot(document.body, true);
	});
	it('Invalid callback (1)', () => {
		screenshot(document.body, 1);
	});
	it('Invalid callback ("")', () => {
		screenshot(document.body, '');
	});

	it('Invalid element (undefined)', done => {
		screenshot(undefined, image => {
			assert.ok(isNativeImage(image));
			assert.ok(image.isEmpty());
			done();
		});
	});
	it('Invalid element (null)', done => {
		screenshot(null, image => {
			assert.ok(isNativeImage(image));
			assert.ok(image.isEmpty());
			done();
		});
	});
	it('Invalid element ({})', done => {
		screenshot({}, image => {
			assert.ok(isNativeImage(image));
			assert.ok(image.isEmpty());
			done();
		});
	});
	it('Invalid element (true)', done => {
		screenshot(true, image => {
			assert.ok(isNativeImage(image));
			assert.ok(image.isEmpty());
			done();
		});
	});
	it('Invalid element (1)', done => {
		screenshot(1, image => {
			assert.ok(isNativeImage(image));
			assert.ok(image.isEmpty());
			done();
		});
	});
	it('Invalid element ("")', done => {
		screenshot('', image => {
			assert.ok(isNativeImage(image));
			assert.ok(image.isEmpty());
			done();
		});
	});

	it('Valid element (margin)', done => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 20px; padding: 0; border: 0"></div>`;
		screenshot(
			document.body.childNodes[0],
			image => {
				assert.ok(isNativeImage(image));
				assert.ok(!image.isEmpty());
				assert.deepStrictEqual(image.getSize(), {width: 100, height: 50});
				done();
			}
		);
	});

	it('Valid element (padding)', done => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 0; padding: 30px; border: 0"></div>`;
		screenshot(
			document.body.childNodes[0],
			image => {
				assert.ok(isNativeImage(image));
				assert.ok(!image.isEmpty());
				assert.deepStrictEqual(image.getSize(), {width: 160, height: 110});
				done();
			}
		);
	});

	it('Valid element (border)', done => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 0; padding: 0; border: 8px"></div>`;
		screenshot(
			document.body.childNodes[0],
			image => {
				assert.ok(isNativeImage(image));
				assert.ok(!image.isEmpty());
				assert.deepStrictEqual(image.getSize(), {width: 100, height: 50});
				done();
			}
		);
	});

	it('Valid element (margin, padding)', done => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 20px; padding: 30px; border: 0"></div>`;
		screenshot(
			document.body.childNodes[0],
			image => {
				assert.ok(isNativeImage(image));
				assert.ok(!image.isEmpty());
				assert.deepStrictEqual(image.getSize(), {width: 160, height: 110});
				done();
			}
		);
	});

	it('Valid element (margin, padding, border)', done => {
		document.body.innerHTML = `<div style="width: 100px; height: 50px; margin: 20px; padding: 30px; border: 8px"></div>`;
		screenshot(
			document.body.childNodes[0],
			image => {
				assert.ok(isNativeImage(image));
				assert.ok(!image.isEmpty());
				assert.deepStrictEqual(image.getSize(), {width: 160, height: 110});
				done();
			}
		);
	});
});
