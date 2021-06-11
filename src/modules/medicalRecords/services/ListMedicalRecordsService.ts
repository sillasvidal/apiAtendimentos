import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IMedicalRecordsRepository from "../repositories/IMedicalRecordsRepository";

@injectable()
class ListMedicalRecordsService {
    constructor (
        @inject('MedicalRecordsRepository')
        private medicalRecordsRepository: IMedicalRecordsRepository
    ) {}

    public async execute(client_id: any): Promise<any> {
        if (!client_id) {
            throw new AppError('You must pass a client_id on query params');
        }

        const medicalRecords = await this.medicalRecordsRepository.listMedicalRecords(client_id);

        if (!medicalRecords) {
            throw new AppError('Medical records not found');
        }

        return medicalRecords;
    }
}

export default ListMedicalRecordsService;