# GPIO Components

[![npm](https://img.shields.io/npm/v/gpio-components.svg)](https://www.npmjs.com/package/gpio-components)
[![Build Status](https://travis-ci.com/justinzelinsky/gpio-components.svg?branch=master)](https://travis-ci.com/justinzelinsky/gpio-components)
![npm bundle size](https://img.shields.io/bundlephobia/min/gpio-components)
[![codecov](https://codecov.io/gh/justinzelinsky/gpio-components/branch/master/graph/badge.svg)](https://codecov.io/gh/justinzelinsky/gpio-components)
![npm](https://img.shields.io/npm/dm/gpio-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

A collection of GPIO components written for Node in TypeScript. Supports Linux boards like the Raspberry Pi or BeagleBone.

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
  - [LED](#led)
  - [LEDSwitch](#ledSwitch)
  - [RotaryEncoder](#rotaryEncoder)
  - [SevenSegmentDisplay](#sevenSegmentDisplay)
  - [Switch](#switch)
- [Notes](#notes)
- [Special Thanks](#special-thanks)

## Requirements

NodeJS 12.0+

## Installation

`npm install gpio-components`

## Usage

```javascript
const { LED, Switch } = require('gpio-components');

const led = new LED({
  pin: 1
});

const isOn = led.isOn(); // false

led.turnOn();

const isOn = led.isOn(); // true

// ...

const mySwitch = new Switch({
  pin: 2,
  onPress: () => console.log('Pressed!')
});

mySwitch.watch(); // Begin watching for any interrupts
```

## Documentation

### LED

#### Constructor

```javascript
const { LED } = require('gpio-components');

const led = new LED({ pin: 1 });
```

`LEDConfig`:

| Property | Type     | Description              |
| -------- | -------- | ------------------------ |
| `pin`    | `number` | The GPIO pin for the LED |

#### Methods

| Method    | Description                                           | Parameters | Returns   |
| --------- | ----------------------------------------------------- | ---------- | --------- |
| `isOn`    | Returns whether or not the LED is on or off           | _n/a_      | `boolean` |
| `toggle`  | Toggles the state of the LED, returning the new state | _n/a_      | `boolean` |
| `turnOn`  | Turns the LED on                                      | _n/a_      | _n/a_     |
| `turnOff` | Turns the LED off                                     | _n/a_      | _n/a_     |
| `cleanUp` | Cleans up the LED when finishedne                     | _n/a_      | _n/a_     |

### LEDSwitch

#### Constructor

```javascript
const { LEDSwitch } = require('gpio-components');

const ledSwitchConfig = {
  ledPin: 1,
  switchPin: 2,
  onPress: () => console.log('Pressed!')
};

const ledSwitch = new LEDSwitch(ledSwitchConfig);
```

`LEDSwitchConfig`:

| Property        | Type       | Description                                                                  |
| --------------- | ---------- | ---------------------------------------------------------------------------- |
| `ledPin`        | `number`   | The GPIO pin for the LED                                                     |
| `switchPin`     | `number`   | The GPIO pin for the switch                                                  |
| `onPress`       | `function` | The callback function for when the switch is pressed                         |
| `switchOptions` | `object`   | (Optional) options for the switch. (See [below](#switchOptions) for details) |

#### Methods

| Method    | Description                                         | Parameters | Returns   |
| --------- | --------------------------------------------------- | ---------- | --------- |
| `watch`   | Begin watching the LED Switch for any interruptions | _n/a_      | _n/a_     |
| `isOn`    | Returns whether or not the LED is on                | _n/a_      | `boolean` |
| `cleanUp` | Cleans up the LEDSwitch when finished               | _n/a_      | _n/a_     |

### RotaryEncoder

_Note:_

This implementation of a Rotary Encoder is for a three pin Rotary Encoder.

#### Constructor

```javascript
const { RotaryEncoder } = require('gpio-components');

const rotaryEncoderConfig = {
  pinA: 1,
  pinB: 2,
  onIncrement: () => console.log('Incremented!'),
  onDecrement: () => console.log('Decremented!'),
  onAlways: () => console.log('Turned!')
};

const encoder = new RotaryEncoder(rotaryEncoderConfig);
```

`RotaryEncoderConfig`:

| Property      | Type       | Description                                                                           |
| ------------- | ---------- | ------------------------------------------------------------------------------------- |
| `pinA`        | `number`   | The GPIO pin for the first pin for the rotary encoder                                 |
| `pinB`        | `number`   | The GPIO pin for the second pin for the rotary encoder                                |
| `onIncrement` | `function` | The callback function for when the rotary encoder is turned clockwise                 |
| `onDecrement` | `function` | The callback function for when the rotary encoder is turned counter clockwise         |
| `onAlways`    | `function` | The callback function for when the rotary encoder is turned, regardless of direction. |

#### Methods

| Method    | Description                                              | Parameters | Returns |
| --------- | -------------------------------------------------------- | ---------- | ------- |
| `watch`   | Begins watching the rotary encoder for any interruptions | _n/a_      | _n/a_   |
| `cleanUp` | Cleans up the Rotary Encoder when finished               | _n/a_      | _n/a_   |

### SevenSegmentDisplay

_Note_:

This implementation of a Seven Segment Display assumes usage along side of single-digit BCD-to-7-segment decoder circuit (e.g CD4055).

#### Constructor

```javascript
const { SevenSegmentDisplay } = require('gpio-components');

const sevenSegmentDisplayConfig = {
  pinZero: 1,
  pinOne: 2,
  pinTwo: 3,
  pinThree: 4
};

const display = new SevenSegmentDisplay(sevenSegmentDisplayConfig);
```

`SevenSegmentDisplayConfig`:

| Property   | Type     | Description                                                        |
| ---------- | -------- | ------------------------------------------------------------------ |
| `pinZero`  | `number` | The pin for the display which represents 2^0 digit of the display. |
| `pinOne`   | `number` | The pin for the display which represents 2^1 digit of the display. |
| `pinTwo`   | `number` | The pin for the display which represents 2^2 digit of the display. |
| `pinThree` | `number` | The pin for the display which represents 2^3 digit of the display. |

#### Methods

| Method           | Description                                                                               | Parameters | Returns     |
| ---------------- | ----------------------------------------------------------------------------------------- | ---------- | ----------- |
| `setDisplay`     | Sets the display to `number`, returning a promise which resolves when the display is set. | `number`   | `<Promise>` |
| `getValue`       | Return the number currently displayed                                                     | _n/a_      | `number`    |
| `getBinaryValue` | Returns a binary representation of number currently displayed.                            | _n/a_      | `string`    |
| `cleanUp`        | Cleans up the Seven Segment Display when finished                                         | _n/a_      | _n/a_       |

### Switch

#### Constructor

```javascript
const { Switch } = require('gpio-components');

const switchConfig = {
  pin: 1,
  onPress: () => console.log('Pressed!')
};

const mySwitch = new Switch(switchConfig);
```

`SwitchConfig`:

| Property        | Type       | Description                                                                  |
| --------------- | ---------- | ---------------------------------------------------------------------------- |
| `pin`           | `number`   | The GPIO pin for the switch                                                  |
| `onPress`       | `function` | The callback function for when the switch is pressed                         |
| `switchOptions` | `object`   | (Optional) options for the switch. (See [below](#switchOptions) for details) |

#### Methods

| Method    | Description                                      | Parameters | Returns |
| --------- | ------------------------------------------------ | ---------- | ------- |
| `watch`   | Begins watching the switch for any interruptions | _n/a_      | _n/a_   |
| `cleanUp` | Cleans up the switch when finished               | _n/a_      | _n/a_   |

### switchOptions

| Option                 | Type                                                          | Description                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeLow`            | `boolean`                                                     | (Optional) Specify whether or not the values read from or written to the GPIO should be inverted                                                                                                              |
| `edge`                 | _"none"_ &#124; _"rising"_ &#124; _"falling"_ &#124; _"both"_ | (Optional) Specify the interrupt generating edge or edges for the switch                                                                                                                                      |
| `debounceTimeout`      | `number`                                                      | (Optional) Specify the number of milliseconds for delaying a callback                                                                                                                                         |
| `reconfigureDirection` | `boolean`                                                     | (Optional) Specify whether the direction foir the GPIO should be reconfigured even though the direction is configured correctly. See [here](https://github.com/fivdi/onoff#gpiogpio-direction--edge--options) |

## Notes

Each component has a function called `cleanUp` which should only be called when the program is terminated or if the component is no longer expected to be interacted with. Generally, you'd use it like this:

```javascript
const { LED } = require('gpio-components');

const led = new LED({ pin: 1 });

// ...

process.on('SIGINT', _ => {
  led.cleanUp();
});
```

## Special Thanks

Many thanks to [Brian Cooke](https://github.com/fivdi) for his excellent library [onoff](https://github.com/fivdi/onoff) which without would have made this library not possible -- or at least much more difficult. Also thanks for my friend Gene Crocetti for his help with the hardware-side of this project. Without him as well, this would not have been possible.
