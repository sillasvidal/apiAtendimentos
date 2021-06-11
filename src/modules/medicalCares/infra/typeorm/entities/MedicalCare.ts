import Client from "@modules/clients/infra/typeorm/entities/Client";
import Specialist from "@modules/specialists/infra/typeorm/entities/Specialist";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('medicalCares')
class MedicalCare {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    appointment_date: Date;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column()
    status: 'AGENDADO' | 'REALIZADO' | 'CANCELADO';

    @Column()
    client_id: string;

    @Column()
    specialist_id: string;

    @ManyToOne(() => Client, client => client.medicalCares)
    @JoinColumn({name: 'client_id'})
    client: Client;

    @ManyToOne(() => Specialist, specialist => specialist.medicalCares)
    @JoinColumn({name: 'specialist_id'})
    specialist: Specialist;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default MedicalCare;