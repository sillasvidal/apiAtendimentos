"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async create(data) {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  async findByLogin(login) {
    const user = await this.ormRepository.findOne({
      where: {
        login
      }
    });
    return user;
  }

}

var _default = UsersRepository;
exports.default = _default;