import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserService } from "src/user/user.service";

import { Follow } from "./follow.entity";

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow) private followRepository: Repository<Follow>,
        private usersService: UserService,
    ) {}

    async addFollow(currentUsername: string, username: string) {
        const follower = await this.usersService.getUserByLogin(currentUsername);
        const following = await this.usersService.getUserByLogin(username);
        if (!following) {
            throw new NotFoundException("No user for this username");
        }
        if (follower.id == following.id) {
            throw new BadRequestException("Cannot follow yourself");
        }
        try {
            const followEntity = new Follow();
            followEntity.follower = follower;
            followEntity.following = following;

            await this.followRepository.save(followEntity);
            return;
        } catch (e) {
            throw new UnauthorizedException("This user is already followed");
        }
    }

    async removeFollow(currentUsername: string, username: string) {
        const follower = await this.usersService.getUserByLogin(currentUsername);
        const following = await this.usersService.getUserByLogin(username);
        if (!following) {
            throw new NotFoundException("No user for this username");
        }
        if (follower.id == following.id) {
            throw new BadRequestException("Cannot unfollow yourself");
        }
        const followRecord = await this.followRepository.findOne({
            where: {
                follower: {
                    id: follower.id,
                },
                following: {
                    id: following.id,
                },
            },
        });
        if (followRecord) {
            await this.followRepository.remove(followRecord);
        } else {
            throw new UnauthorizedException("This user is not followed");
        }
    }
}
