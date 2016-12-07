# Electron Test Utilities

[![Build Status](https://travis-ci.org/wildpeaks/package-electron-test-utils.svg?branch=master)](https://travis-ci.org/wildpeaks/package-electron-test-utils)

Collection of helpers for **DOM tests running in Electron**.

Install:

	npm install @wildpeaks/electron-test-utils --save-dev


---

## Function "getBounds"

Calculates the **bounding box of an HTMLElement** in the page.

This is useful to check how CSS styles or text contents affect the size of known elements,
or test things like whether important elements are above the fold or not.


Usage:

	getBounds(HTMLElement element)


Example:

```js
const {getBounds} = require('@wildpeaks/electron-test-utils');

const container = document.getElementById('application');
const bbox = getBounds(container);
```


---

## Function "hasFocus"

Checks if an **HTMLElement has focus**.


Usage:

	hasFocus(HTMLElement element)


Example:

```js
const assert = require('assert');
const {hasFocus} = require('@wildpeaks/electron-test-utils');

const textfield = document.getElementById('username');
assert.ok(hasFocus(textfield), 'The text input does not have focus initially');
someFunctionBeingTested();
assert.ok(hasFocus(textfield), 'The text input has focus afterwards');
```


---

## Function "simulateClick"

Simulates an **arbitrary mouse click** in the page.

This (along with `screenshot`) is also useful for running scenarios
against Canvas-based (2D Canvas or WebGL) user interfaces.


Usage:

	simulateClick(Object options)


Options:

 - **x** / **y**: (Integer) Coordinates in the page where the mouse is clicked

 - **button**: (String) Mouse button: `left`, `middle` or `right`

 - **modifiers**: (Array of String) Active special keys such as `shift` or `ctrl`.
   See the [Electron API](http://electron.atom.io/docs/all/#contentssendinputeventevent) for the list of available modifiers.


Example:

```js
const {spy} = require('sinon');
const {simulateClick} = require('@wildpeaks/electron-test-utils');

const onclick = spy();
const button = document.getElementById('mybutton');
button.addEventListener('click', onclick);

assert.strictEqual(onclick.called, false, 'The button has not been clicked yet');

simulateClick({
	x: 10,
	y: 20,
	button: 'left',
	modifiers: []
});

setTimeout(() => {
	assert.strictEqual(onclick.called, true, 'The button has been clicked');
});
```


---

## Function "simulateKey"

Simulate an **arbitrary keyboard key**.


Usage:

	simulateKey(Object options)


Options:

 - **keyCode**: (String) Key being sent, such as `a`, `enter` or `tab`.
   See the [Electron API](http://electron.atom.io/docs/api/accelerator) for the list of available key codes.

 - **modifiers**: (Array of String) Active special keys such as `shift` or `ctrl`.
   See the [Electron API](http://electron.atom.io/docs/all/#contentssendinputeventevent) for the list of available modifiers.


Example:

```js
const assert = require('assert');
const {simulateKey} = require('@wildpeaks/electron-test-utils');

const textfield = document.getElementById('username');
textfield.focus();

assert.strictEqual(textfield.value, '', 'Value before');

simulateKey({keyCode: 'H', modifiers: ['shift']});
simulateKey({keyCode: 'e'});
simulateKey({keyCode: 'l'});
simulateKey({keyCode: 'l'});
simulateKey({keyCode: 'o'});

setTimeout(() => {
	assert.strictEqual(textfield.value, 'Hello', 'Value after');
});
```


---

## Function "screenshot"

Takes a **screenshot of an HTMLElement**.

Useful to compare against a reference screenshot (for visual regression tests)
or simply save to file (to have an overview of key parts of an application).

However, remember that antialiasing and font rendering can differ depending on the operating system,
e.g. the resulting image might look slightly different on Travis CI than on your development machine.


Usage:

	screenshot(HTMLElement element, Function callback)


Callback parameters:

 - **image**: [NativeImage](http://electron.atom.io/docs/api/native-image/) object


Example:

```js
const fs = require('fs');
const {screenshot} = require('@wildpeaks/electron-test-utils');

screenshot(
	document.getElementById('application'),
	image => {
		fs.writeFile('screenshot.png', image.toPNG(), () => {
			console.log('Saved the screenshot');
		});
	}
);
```


---

