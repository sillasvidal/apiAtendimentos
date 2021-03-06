import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import AddressesRepository from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';

import SpecialistsRepository from '@modules/specialists/infra/typeorm/repositories/SpecialistsRepository';
import ISpecialistsRepository from '@modules/specialists/repositories/ISpecialistsRepository';

import IProfessionsRepository from '@modules/specialists/repositories/IProfessionsRepository';
import ProfessionsRepository from '@modules/specialists/infra/typeorm/repositories/ProfessionsRepository';

import IMedicalRecordsRepository from '@modules/medicalRecords/repositories/IMedicalRecordsRepository';
import MedicalRecordsRepository from '@modules/medicalRecords/infra/typeorm/repositories/MedicalRecordsRepository';

import IMedicalRecordHistoricRepository from '@modules/medicalRecords/repositories/IMedicalRecordHistoricRepository';
import MedicalRecordHistoricRepository from '@modules/medicalRecords/infra/typeorm/repositories/MedicalRecordHistoricRepository';

import IMedicalCaresRepository from '@modules/medicalCares/repositories/IMedicalCaresRepository';
import MedicalCaresRepository from '@modules/medicalCares/infra/typeorm/repositories/MedicalCaresRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository
);

container.registerSingleton<ISpecialistsRepository>(
  'SpecialistsRepository',
  SpecialistsRepository
)

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository
);

container.registerSingleton<IProfessionsRepository>(
  'ProfessionsRepository',
  ProfessionsRepository
);

container.registerSingleton<IMedicalRecordsRepository>(
  'MedicalRecordsRepository',
  MedicalRecordsRepository
);

container.registerSingleton<IMedicalRecordHistoricRepository>(
  'MedicalRecordHistoricRepository',
  MedicalRecordHistoricRepository
);

container.registerSingleton<IMedicalCaresRepository>(
  'MedicalCaresRepository',
  MedicalCaresRepository
);