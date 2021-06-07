import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRespository";
import CreateUserService from "./CreateUserService"

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe("Create a user", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    });
    
    it("should be able to create a new user", async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            login: 'johndoe123',
            password: '123456'
        });

        console.log(user);

        expect(user).toHaveProperty('id');
    });
});