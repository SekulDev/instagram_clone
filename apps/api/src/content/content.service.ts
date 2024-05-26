import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserService } from "src/user/user.service";

import { Content } from "./content.entity";

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content) private contentRepository: Repository<Content>,
        private usersService: UserService,
    ) {}

    async onUpload(username: string, file: Express.Multer.File) {
        const user = await this.usersService.getUserByLogin(username);

        const contentEntity = this.contentRepository.create({
            user: user,
            filename: file.filename,
        });

        await this.contentRepository.save(contentEntity);
    }
}
