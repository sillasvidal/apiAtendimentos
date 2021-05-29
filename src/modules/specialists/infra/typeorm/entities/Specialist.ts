import Address from '@modules/addresses/infra/typeorm/entities/Address';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('specialists')
class Specialist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    register: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    email: string;

    @Column()
    address_id: string;

    @Column()
    profession_id: string;

    @ManyToOne(() => Address, address => address.id)
    @JoinColumn({ name: 'address_id' })
    address: Address;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Specialist;