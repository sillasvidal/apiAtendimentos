import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import MedicalCare from "../infra/typeorm/entities/MedicalCare";
import IMedicalCaresRepository from "../repositories/IMedicalCaresRepository";

interface IRequest {
    medical_care_id: string;
    status: 'AGENDADO' | 'REALIZADO' | 'CANCELADO';
}

@injectable()
class UpdateStatusMedicalCareService {
    constructor(
        @inject('MedicalCaresRepository')
        private medicalCaresRepository: IMedicalCaresRepository
    ) {}

    public async execute({ medical_care_id, status }: IRequest): Promise<MedicalCare> {
        if ((status !== 'AGENDADO') && (status !== 'REALIZADO') && (status !== 'CANCELADO')) {
            throw new AppError('Invalid status name');
        }
        
        const medicalCare = await this.medicalCaresRepository.findById(medical_care_id);
        
        if (!medicalCare) {
            throw new AppError(`Medical Care not found`);
        }
        
        if (medicalCare.status === 'CANCELADO') {
            throw new AppError('This medical care already canceled');
        }

        if (medicalCare.status === 'REALIZADO') {
            throw new AppError("You can't modify a medical care appointment status where already finished");
        }

        medicalCare.status = status;

        await this.medicalCaresRepository.save(medicalCare);

        return medicalCare;
    }
}

export default UpdateStatusMedicalCareService;