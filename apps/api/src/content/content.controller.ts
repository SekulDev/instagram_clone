import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { UploadFileResponse } from "@repo/types";

@Controller("content")
export class ContentController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(
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
    ): UploadFileResponse {
        return {
            filename: file.filename,
            size: file.size,
        };
    }
}
