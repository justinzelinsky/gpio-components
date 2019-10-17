# GPIO Components

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
