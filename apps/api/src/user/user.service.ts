import { Injectable, NotFoundException } from "@nestjs/common";
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
        return this.usersRepository.findOne({ select: { password: true }, where: [{ email: data }, { login: data }] });
    }

    isUserExists(email: string, login: string) {
        return this.usersRepository.findOne({ where: [{ email: email }, { login: login }] });
    }

    async getUserByLogin(login: string) {
        const user = await this.usersRepository.findOneBy({ login });
        if (!user) {
            throw new NotFoundException("No user for " + login + " username");
        }
        return user;
    }

    async updateUser(login: string, userDto: Record<string, any>) {
        const user = await this.usersRepository.findOneBy({ login });
        if (!user) {
            throw new NotFoundException("No user for " + login + " username");
        }
        return await this.usersRepository.save({
            ...user,
            ...userDto,
            email: user.email,
            password: user.password, // prevent updating it
        });
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
