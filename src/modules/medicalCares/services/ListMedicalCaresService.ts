import IMedicalRecordsRepository from "@modules/medicalRecords/repositories/IMedicalRecordsRepository";
import { inject, injectable } from "tsyringe";
import IListMedicalCaresWithFilterDTO from "../dtos/IListMedicalCaresWithFilterDTO";
import MedicalCare from "../infra/typeorm/entities/MedicalCare";
import IMedicalCaresRepository from "../repositories/IMedicalCaresRepository";

@injectable()
class ListMedicalCaresService {
    constructor(
        @inject('MedicalCaresRepository')
        private medicalCaresRepository: IMedicalCaresRepository,

        @inject('MedicalRecordsRepository')
        private medicalRecordsRepository: IMedicalRecordsRepository
    ){}

    public async execute({ appointment_date, date, client_id, specialist_id, status }: IListMedicalCaresWithFilterDTO): Promise<MedicalCare[] | undefined> {
        const medicalCares = await this.medicalCaresRepository.list({
            appointment_date, date, client_id, specialist_id, status
        });

        return medicalCares;
    }
}

export default ListMedicalCaresService;