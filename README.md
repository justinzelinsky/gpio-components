# GPIO Components

[![npm](https://img.shields.io/npm/v/gpio-components.svg)](https://www.npmjs.com/package/gpio-components)
[![Build Status](https://travis-ci.com/justinzelinsky/gpio-components.svg?branch=master)](https://travis-ci.com/justinzelinsky/gpio-components)
![npm bundle size](https://img.shields.io/bundlephobia/min/gpio-components)
[![codecov](https://codecov.io/gh/justinzelinsky/gpio-components/branch/master/graph/badge.svg)](https://codecov.io/gh/justinzelinsky/gpio-components)
![npm](https://img.shields.io/npm/dm/gpio-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

A collection of GPIO components written in JavaScript. Supports Linux boards like the Raspberry Pi or BeagleBone.

_NOTE_ Not ready for production usage (yet ;) )

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Notes](#notes)
- [Special Thanks](#special-thanks)

## Requirements

NodeJS versions 6, 8, 10, or 12.

## Installation

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

### LED

#### Constructor

```javascript
const { LED } = require('gpio-components');

const led = new LED(1);
```

| Parameter | Type     | Description              |
| --------- | -------- | ------------------------ |
| `pin`     | `number` | The GPIO pin for the LED |

#### Methods

| Method    | Description                                 | Parameters | Returns   |
| --------- | ------------------------------------------- | ---------- | --------- |
| `isOn`    | Returns whether or not the LED is on or off | _n/a_      | `boolean` |
| `turnOn`  | Turns the LED on                            | _n/a_      | _n/a_     |
| `turnOff` | Turns the LED off                           | _n/a_      | _n/a_     |
| `cleanUp` | Cleans up the LED when finishedne           | _n/a_      | _n/a_     |

### LEDSwitch

#### Constructor

```javascript
const { LEDSwitch } = require('gpio-components');

// ...

const ledSwitch = new LEDSwitch(1, 2, onPress, {});
```

| Parameter       | Type       | Description                                                |
| --------------- | ---------- | ---------------------------------------------------------- |
| `ledPin`        | `number`   | The GPIO pin for the LED                                   |
| `switchPin`     | `number`   | The GPIO pin for the switch                                |
| `onPress`       | `function` | The callback function for when the switch is pressed       |
| `switchOptions` | `object`   | (Optional) options for the switch. (See below for details) |

#### Methods

| Method    | Description                                  | Parameters | Returns        |
| --------- | -------------------------------------------- | ---------- | -------------- |
| `watch`   | Watches the Switch for any user interactions | _n/a_      | _n/a_          |
| `isOn`    | Returns whether or not the LED is on         | _n/a_      | `boolean` isOn |
| `cleanUp` | Cleans up the LEDSwitch when finished        | _n/a_      | _n/a_          |

### RotaryEncoder

#### Constructor

```javascript
const { RotaryEncoder } = require('gpio-components');

// ...

const encoder = new RotaryEncoder(1, 2, onIncrement, onDecrement, onAlways);
```

| Parameter     | Type       | Description                                                                           |
| ------------- | ---------- | ------------------------------------------------------------------------------------- |
| `pinA`        | `number`   | The GPIO pin for the first pin for the rotary encoder                                 |
| `pinB`        | `number`   | The GPIO pin for the second pin for the rotary encoder                                |
| `onIncrement` | `function` | The callback function for when the rotary encoder is turned clockwise                 |
| `onDecrement` | `function` | The callback function for when the rotary encoder is turned counter clockwise         |
| `onAlways`    | `function` | The callback function for when the rotary encoder is turned, regardless of direction. |

#### Methods

| Method    | Description                                          | Parameters | Returns |
| --------- | ---------------------------------------------------- | ---------- | ------- |
| `watch`   | Watches the rotary encoder for any user interactions | _n/a_      | _n/a_   |
| `cleanUp` | Cleans up the Rotary Encoder when finished           | _n/a_      | _n/a_   |

### SevenSegmentDisplay

#### Constructor

```javascript
const { SevenSegmentDisplay } = require('gpio-components');

const display = new SevenSegmentDisplay(1, 2, 3, 4);
```

| Parameter  | Type     | Description                                                        |
| ---------- | -------- | ------------------------------------------------------------------ |
| `pinZero`  | `number` | The pin for the display which represents 2^0 digit of the display. |
| `pinOne`   | `number` | The pin for the display which represents 2^1 digit of the display. |
| `pinTwo`   | `number` | The pin for the display which represents 2^2 digit of the display. |
| `pinThree` | `number` | The pin for the display which represents 2^3 digit of the display. |

#### Methods

| Method                    | Description                                                                               | Parameters               | Returns     |
| ------------------------- | ----------------------------------------------------------------------------------------- | ------------------------ | ----------- |
| `setDisplay`              | Sets the display to `number`, returning a promise which resolves when the display is set. | `number` - displayNumber | `<Promise>` |
| `getBinaryRepresentation` | Returns a binary representation of the current number displayed.                          | _n/a_                    | `string`    |
| `cleanUp`                 | Cleans up the Seven Segment Display when finished                                         | _n/a_                    | _n/a_       |

### Switch

#### Constructor

```javascript
const { Switch } = require('gpio-components');

const mySwitch = new Switch(1, onPress, options);
```

| Parameter       | Type       | Description                                                |
| --------------- | ---------- | ---------------------------------------------------------- |
| `pin`           | `number`   | The GPIO pin for the switch                                |
| `onPress`       | `function` | The callback function for when the switch is pressed       |
| `switchOptions` | `object`   | (Optional) options for the switch. (See below for details) |

#### Methods

| Method    | Description                                          | Parameters | Returns |
| --------- | ---------------------------------------------------- | ---------- | ------- |
| `watch`   | Watches the rotary encoder for any user interactions | _n/a_      | _n/a_   |
| `cleanUp` | Cleans up the Rotary Encoder when finished           | _n/a_      | _n/a_   |

### switchOptions

| Option            | Type                                                  | Description                                                   |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| `edge`            | "none" &#124; "rising" &#124; "falling" &#124; "both" | Specify the interrupt generating edge or edges for the switch |
| `debounceTimeout` | `number`                                              | Specify the number of milliseconds for delaying a callback    |

## Notes

Each component has a function called `cleanUp` which should only be called when the program is terminated or if the component is no longer expected to be interacted with. Generally, you'd use it like this:

```javascript
const { LED } = require('gpio-components');

const led = new LED(1);

// ...

process.on('SIGINT', _ => {
  led.cleanUp();
});
```

## Special Thanks

Many thanks to [Brian Cooke](https://github.com/fivdi) for his excellent library [onoff](https://github.com/fivdi/onoff) which without would have made this library not possible -- or at least much more difficult. :)
