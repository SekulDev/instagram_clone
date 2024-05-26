import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TagController } from "./tag.controller";
import { Tag } from "./tag.entity";
import { TagService } from "./tag.service";

@Module({
    imports: [TypeOrmModule.forFeature([Tag])],
    providers: [TagService],
    exports: [TagService],
    controllers: [TagController],
})
export class TagModule {}
