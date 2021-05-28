"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateMedicalRecordsHistorics1621992419215 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'medicalRecordHistoric',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'date',
        type: 'timestamp with time zone'
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'medical_record_id',
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
    await queryRunner.createForeignKey('medicalRecordHistoric', new _typeorm.TableForeignKey({
      name: 'MedicalRecordHistoricMedicalRecord',
      columnNames: ['medical_record_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'medicalRecords',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('medicalRecordHistoric', 'MedicalRecordHistoricMedicalRecord');
    await queryRunner.dropTable('medicalRecordHistoric');
  }

}

exports.default = CreateMedicalRecordsHistorics1621992419215;