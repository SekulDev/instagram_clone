import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    findByEmailOrLogin(data: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: [{ email: data }, { login: data }] });
    }

    isUserExists(email: string, login: string) {
        return this.usersRepository.findOne({ where: [{ email: email }, { login: login }] });
    }

    async createUser(email: string, login: string, label: string, hash: string) {
        const userEntity = this.usersRepository.create({
            email,
            login,
            label,
            password: hash,
        });
        const user = await this.usersRepository.save(userEntity);
        return user;
    }
}
