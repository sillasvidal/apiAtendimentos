import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Client from "../infra/typeorm/entities/Client";
import IClientsRepository from "../repositories/IClientsRepository";

interface IRequest {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    cellphone: string;
    email: string;
    blood_type: string;
}

@injectable()
class UpdateClientService {
    constructor(
        @inject('ClientsRepository')
        private clientsRepository: IClientsRepository
    ) {}

    public async execute({ id, name, cpf, phone, cellphone, email, blood_type }: IRequest): Promise<Client> {
        const client = await this.clientsRepository.findById(id);

        if(!client) {
            throw new AppError('Client not found');
        }

        const clientWithUpdateCpf = await this.clientsRepository.findByCpf(cpf);

        if(clientWithUpdateCpf && clientWithUpdateCpf.id !== id) {
            throw new AppError('CPF already in use');
        }

        client.name = name;
        client.cpf = cpf;
        client.phone = phone;
        client.cellphone = cellphone;
        client.email = email;
        client.blood_type = blood_type;

        return this.clientsRepository.save(client);
    }
}

export default UpdateClientService;