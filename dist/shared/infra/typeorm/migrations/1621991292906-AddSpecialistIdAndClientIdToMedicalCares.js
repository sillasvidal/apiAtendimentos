"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddSpecialistIdAndClientIdToMedicalCares1621991292906 {
  async up(queryRunner) {
    await queryRunner.addColumn('medicalCares', new _typeorm.TableColumn({
      name: 'client_id',
      type: 'uuid'
    }));
    await queryRunner.addColumn('medicalCares', new _typeorm.TableColumn({
      name: 'specialist_id',
      type: 'uuid'
    }));
    await queryRunner.createForeignKeys('medicalCares', [new _typeorm.TableForeignKey({
      name: 'MedicalCareClient',
      columnNames: ['client_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'clients',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }), new _typeorm.TableForeignKey({
      name: 'MedicalCareSpecialist',
      columnNames: ['specialist_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'specialists',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('medicalCares', 'MedicalCareSpecialist');
    await queryRunner.dropForeignKey('medicalCares', 'MedicalCareClient');
    await queryRunner.dropColumn('medicalCares', 'specialist_id');
    await queryRunner.dropColumn('medicalCares', 'client_id');
  }

}

exports.default = AddSpecialistIdAndClientIdToMedicalCares1621991292906;