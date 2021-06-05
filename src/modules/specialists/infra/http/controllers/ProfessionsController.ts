import ListProfessionsService from "@modules/specialists/services/ListProfessionsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ProfessionsController {
    public async list(request: Request, response: Response): Promise<Response> {
        const listProfessions = container.resolve(ListProfessionsService);

        const professions = await listProfessions.execute();

        return response.json(professions);
    }
}

export default ProfessionsController;