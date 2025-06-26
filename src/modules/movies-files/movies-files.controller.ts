import { Controller, Post, UnsupportedMediaTypeException, UseInterceptors } from '@nestjs/common';
import { MoviesFilesService } from './movies-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from "uuid"
import { extname } from 'path';
@Controller('movies-files')
export class MoviesFilesController {
    constructor(private readonly movieFileServie: MoviesFilesService) {}

    @UseInterceptors(FileInterceptor('poster', {
        storage: diskStorage({
            destination: "./uploads/files",
            filename: (req, file, cb) => {
                let posterName = uuidv4() + "_" + extname(file.originalname)
                cb(null, posterName)
            }
        }),
        fileFilter: (req, file, callback) => {
            let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
            if (!allowed.includes(file.mimetype)) {
                callback(new UnsupportedMediaTypeException("File tpe must be .jpg | .jpeg | .png "), false)

            }
            callback(null, true)
        }
    }))
    @Post() 
    AddFile() {}


}
