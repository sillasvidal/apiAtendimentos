"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateMedicalCaresTable1621990235944 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'medicalCares',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'appointment_date',
        type: 'timestamp with time zone'
      }, {
        name: 'date',
        type: 'timestamp with time zone'
      }, {
        name: 'amount',
        type: 'decimal'
      }, {
        name: 'status',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('medicalCares');
  }

}

exports.default = CreateMedicalCaresTable1621990235944;