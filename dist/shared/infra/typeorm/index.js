"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (name = 'default') => {
  const defaultOptions = await (0, _typeorm.getConnectionOptions)();
  return (0, _typeorm.createConnection)(Object.assign(defaultOptions, {
    name,
    database: process.env.NODE_ENV === 'test' ? 'gostack_desafio09_tests' : defaultOptions.database
  }));
};

exports.default = _default;