import { Module } from "@nestjs/common";

import { CloudinaryProvider } from "./cloudinary.provider";

import { CloudinaryConfig } from "./configCloudinary.config";


@Module({
  
    providers: [CloudinaryConfig,CloudinaryProvider],
    exports: [CloudinaryProvider]
})

export class CloudinaryModule {}