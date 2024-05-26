import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as crypto from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";

import { UserModule } from "src/user/user.module";

import { ContentController } from "./content.controller";
import { Content } from "./content.entity";
import { ContentService } from "./content.service";

@Module({
    imports: [
        MulterModule.register({
            dest: "./upload",
            storage: diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./upload");
                },
                filename(req, file, cb) {
                    let customFileName = crypto.randomBytes(18).toString("hex");
                    let fileExtension = extname(file.originalname).split(".")[1];
                    cb(null, customFileName + "." + fileExtension);
                },
            }),
        }),
        UserModule,
        TypeOrmModule.forFeature([Content]),
    ],
    controllers: [ContentController],
    providers: [ContentService],
})
export class ContentModule {}
