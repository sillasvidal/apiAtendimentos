"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateMedicalRecordsTable1621991953881 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'medicalRecords',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'opening_date',
        type: 'timestamp with time zone'
      }, {
        name: 'client_id',
        type: 'uuid'
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
    await queryRunner.createForeignKey('medicalRecords', new _typeorm.TableForeignKey({
      name: 'MedicalRecordClient',
      columnNames: ['client_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'clients',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('medicalRecords', 'MedicalRecordClient');
    await queryRunner.dropTable('medicalRecords');
  }

}

exports.default = CreateMedicalRecordsTable1621991953881;