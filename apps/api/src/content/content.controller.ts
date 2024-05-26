import { Controller, HttpStatus, ParseFilePipeBuilder, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";

import { UploadFileResponse } from "@repo/types";

import { ContentService } from "./content.service";

@Controller("content")
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: RegExp("(jpeg|jpg|png|mp4)"),
                })
                .addMaxSizeValidator({
                    maxSize: 26214400,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
        @Req() req: Request,
    ): Promise<UploadFileResponse> {
        const username = req["user"].login;
        await this.contentService.onUpload(username, file);

        return {
            filename: file.filename,
            size: file.size,
        };
    }
}
