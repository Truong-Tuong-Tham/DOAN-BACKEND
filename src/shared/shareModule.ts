import { Module } from "@nestjs/common";
import { CloudinaryModule } from "src/cloudinary/cloudinaru.module";
import { CloudUploadService } from "./cloudUpload.service";


@Module({
    imports: [CloudinaryModule],
    providers: [CloudUploadService],
    exports: [CloudUploadService]
})

export class ShareModule {}