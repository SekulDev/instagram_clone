import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import * as crypto from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";

import { ContentController } from "./content.controller";

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
    ],
    controllers: [ContentController],
})
export class ContentModule {}
