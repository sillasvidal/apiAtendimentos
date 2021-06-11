import { getRepository, ILike, Repository } from 'typeorm';
import ICreateMedicalCareDTO from "@modules/medicalCares/dtos/ICreateMedicalCareDTO";
import IMedicalCaresRepository from "@modules/medicalCares/repositories/IMedicalCaresRepository";
import MedicalCare from "../entities/MedicalCare";
import IListMedicalCaresWithFilterDTO from '@modules/medicalCares/dtos/IListMedicalCaresWithFilterDTO';

class MedicalCaresRepository implements IMedicalCaresRepository {
    private ormRepository: Repository<MedicalCare>;

    constructor() {
        this.ormRepository = getRepository(MedicalCare);
    }
    
    public async create(data: ICreateMedicalCareDTO): Promise<MedicalCare> {
        const medicalCare = this.ormRepository.create(data);
        
        await this.ormRepository.save(medicalCare);
        
        return medicalCare;
    }
    
    public async findByDate(date: Date, specialist_id: string): Promise<MedicalCare | undefined> {
        const findMedicalCare = await this.ormRepository.findOne({
            where: {
                date,
                specialist_id
            },
        });
        
        return findMedicalCare;
    }
    
    public async findById(id: string): Promise<MedicalCare | undefined> {
        const findMedicalCare = await this.ormRepository.findOne(id);
        
        return findMedicalCare;
    }
    
    public async save(medicalCare: MedicalCare): Promise<MedicalCare> {
        return this.ormRepository.save(medicalCare);
    }
    
    public async list({ appointment_date, date, client_id, specialist_id, status }: IListMedicalCaresWithFilterDTO): Promise<MedicalCare[] | undefined> {
        if(
            !appointment_date &&
            !date &&
            !client_id &&
            !specialist_id &&
            !status
        ){
            var medicalCares = await this.ormRepository.find({
                relations: ['client', 'specialist'],
                order: {
                    date: 'ASC'
                }
            });
        } else {
            var medicalCares = await this.ormRepository.find({
                where: [
                    {appointment_date},
                    {date},
                    {client_id},
                    {specialist_id},
                    {status},
                ],
                relations: ['client', 'specialist'],
                order: {
                    date: 'ASC'
                },
            });
        }
        
        return medicalCares;
    }
}

export default MedicalCaresRepository;