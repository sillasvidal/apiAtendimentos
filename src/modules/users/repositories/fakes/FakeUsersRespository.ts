import { uuid } from 'uuidv4';

import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "../IUsersRepository";

class FakeUsersRepository implements IUsersRepository {
    users: User[] = [];
    
    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();
    
        Object.assign(user, { id: uuid() }, userData);
    
        this.users.push(user);
    
        return user;
      }

    async findByLogin(login: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.login === login);

        return user;
    }

}

export default FakeUsersRepository;