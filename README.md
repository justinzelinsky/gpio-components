# GPIO Components

[![Build Status](https://travis-ci.org/justinzelinsky/gpio-components.svg?branch=master)](https://travis-ci.org/justinzelinsky/gpio-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

A collection of GPIO components written in JavaScript. Supports Linux boards like the Raspberry Pi or BeagleBone.

## Install

`npm install gpio-components`

## Usage

```javascript
const { LED } = require('gpio-components');

const led = new LED(1);

const isOn = led.isOn(); // false

led.turnOn();

const isOn = led.isOn(); // true
```

## Documentation

### Components

#### LED

wip
