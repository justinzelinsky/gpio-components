"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSwitchOptions = void 0;
const onoff_1 = require("onoff");
exports.defaultSwitchOptions = {
    debounceTimeout: 10,
    edge: 'rising'
};
class Switch {
    constructor(config) {
        const { onPress, pin, switchOptions = exports.defaultSwitchOptions } = config;
        const { edge } = switchOptions, options = __rest(switchOptions, ["edge"]);
        this.switch = new onoff_1.Gpio(pin, 'in', edge, options);
        this.onPress = onPress;
    }
    watch() {
        this.switch.watch(err => {
            if (err) {
                throw err;
            }
            this.onPress();
        });
    }
    cleanUp() {
        this.switch.unexport();
    }
}
exports.default = Switch;
