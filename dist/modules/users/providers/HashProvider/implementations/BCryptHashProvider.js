"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = require("bcrypt");

class BCryptHashProvider {
  generateHash(payload) {
    return (0, _bcrypt.hash)(payload, 8);
  }

  compareHash(payload, hashed) {
    return (0, _bcrypt.compare)(payload, hashed);
  }

}

exports.default = BCryptHashProvider;