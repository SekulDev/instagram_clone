import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "crypto";
import { Repository } from "typeorm";

import { UpdateMeDto } from "@repo/types";

import { Follow } from "src/follow/follow.entity";

import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findOne(id: number): Promise<User | null> {
        return await this.usersRepository.findOneBy({ id });
    }

    async findByEmailOrLogin(data: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            select: this.usersRepository.metadata.columns.map((column) => column.propertyName as keyof User),
            where: [{ email: data }, { login: data }],
        });
    }

    async isUserExists(email: string, login: string) {
        return await this.usersRepository.findOne({ where: [{ email: email }, { login: login }] });
    }

    private async generateUrl(email: string) {
        const uid = crypto.randomBytes(18).toString("hex");
        const exists = await this.usersRepository.exists({ where: { change_password_url: uid } });
        if (exists) {
            return this.generateUrl(email);
        }
        await this.usersRepository.update({ email: email }, { change_password_url: uid });
        return uid;
    }

    async createChangePasswordUrl(email: string) {
        const user = await this.usersRepository.findOne({ where: { email: email } });
        if (!user) {
            throw new NotFoundException();
        }
        return await this.generateUrl(email);
    }

    async changeUserPassword(uid: string, passwordHash: string) {
        const user = await this.usersRepository.findOne({ where: { change_password_url: uid } });
        if (!user) {
            throw new NotFoundException();
        }
        await this.usersRepository.update(
            { change_password_url: uid },
            { change_password_url: null, password: passwordHash },
        );
        return user.email;
    }

    async getUserByLogin(login: string, currentUserId?: number) {
        const queryBuilder = this.usersRepository
            .createQueryBuilder("user")
            .where("user.login = :login", { login })
            .loadRelationCountAndMap("user.followersCount", "user.followers")
            .loadRelationCountAndMap("user.followingCount", "user.following")
            .loadRelationCountAndMap("user.postsCount", "user.posts");

        if (currentUserId) {
            queryBuilder.loadRelationCountAndMap("user.is_following", "user.followers", "follow", (query) => {
                return query.where("follow.follower = :id", { id: currentUserId });
            });
        }

        const user = await queryBuilder.getOne();
        if (!user) {
            throw new NotFoundException("No user for " + login + " username");
        }
        return user;
    }

    async updateUser(login: string, userDto: UpdateMeDto) {
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

    async searchUser(input: string, limit: number) {
        const LAVENSHTEIN_MAX_DISTANCE = Math.ceil(input.length / 3);
        const users = await this.usersRepository
            .createQueryBuilder("user")
            .where("levenshtein(LOWER(user.login), :input) <= :max OR levenshtein(LOWER(user.label), :input) <= :max", {
                max: LAVENSHTEIN_MAX_DISTANCE,
                input: input,
            })
            .loadRelationCountAndMap("user.followersCount", "user.followers")
            .loadRelationCountAndMap("user.followingCount", "user.following")
            .loadRelationCountAndMap("user.postsCount", "user.posts")
            .addSelect((subQuery) => {
                return subQuery.select("COUNT(f.following)", "count").from(Follow, "f").where("f.following = user.id");
            }, "followersCount")
            .orderBy("followersCount", "DESC")
            .limit(limit)
            .getMany();
        return users;
    }
}
