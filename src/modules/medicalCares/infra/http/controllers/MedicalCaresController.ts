import CreateMedicalCareAppointmentService from '@modules/medicalCares/services/CreateMedicalCareAppointmentService';
import UpdateStatusMedicalCareService from '@modules/medicalCares/services/UpdateStatusMedicalCareService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class MedicalCaresController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {
            date,
            amount,
            status,
            client_id,
            specialist_id
        } = request.body;

        const createMedicalCareAppointment = container.resolve(CreateMedicalCareAppointmentService);

        const medicalCareAppointment = await createMedicalCareAppointment.execute({
            date,
            amount,
            status,
            client_id,
            specialist_id
        });

        return response.json(medicalCareAppointment);
    }

    public async updateStatus(request: Request, response: Response): Promise<Response> {
        const { medical_care_id, status } = request.body;

        const updateStatus = container.resolve(UpdateStatusMedicalCareService);

        const updatedMedicalCare = await updateStatus.execute({
            medical_care_id,
            status
        });

        return response.json(updatedMedicalCare);
    }
}

export default MedicalCaresController;