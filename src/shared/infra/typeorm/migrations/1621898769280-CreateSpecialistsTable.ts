import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecialistsTable1621898769280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: 'specialists',
                columns:
                [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'register',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'phone',
                        type: 'int'
                    },
                    {
                        name: 'cellphone',
                        type: 'int'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('specialists');
    }

}
