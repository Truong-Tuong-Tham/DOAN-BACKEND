import { Inject, Injectable } from "@nestjs/common";
import { UploadApiResponse} from "cloudinary";


@Injectable()
export class CloudUploadService {
constructor(@Inject('CLOUDINARY') private cloudinary) {}
async upLoadImage(file: Express.Multer.File,folder: string) : Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
          {folder},
          (error:any, result: UploadApiResponse) => {
              if (error) { reject(error);}
              else {  resolve(result);}
             
          },
      )
      uploadStream.end(file.buffer)
  })
}
}