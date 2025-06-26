import {
    Body,
    Controller,
    Post,
    UnsupportedMediaTypeException,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { MoviesFilesService } from './movies-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Movie_Files_Dto } from './MovieDto/movie.dto';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiBody, ApiBearerAuth, } from '@nestjs/swagger';

@ApiTags('Movie Files')
@Controller('movies-files')
export class MoviesFilesController {
    constructor(private readonly movieFileServie: MoviesFilesService) { }

    @ApiOperation({ summary: 'Film faylini (video) yuklash' })
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Fayl muvaffaqiyatli yuklandi' })
    @ApiResponse({ status: 415, description: 'Notog‘ri fayl turi (.mp4, .avi, .mov, .mkv)' })
    @ApiBody({
        description: 'Video fayl va boshqa maʼlumotlar',
        type: Movie_Files_Dto,
    })
    @UseInterceptors(
        FileInterceptor('files', {
            storage: diskStorage({
                destination: './uploads/files',
                filename: (req, file, cb) => {
                    let fileName = uuidv4() + '_' + extname(file.originalname);
                    cb(null, fileName);
                },
            }),
            fileFilter: (req, file, callback) => {
                const allowed: string[] = [
                    'video/mp4',
                    'video/x-matroska',
                    'video/webm',
                    'video/x-msvideo',
                    'video/quicktime'
                ];

                if (!allowed.includes(file.mimetype)) {
                    return callback(
                        new UnsupportedMediaTypeException('File type must be .mp4 | .avi | .mov | .mkv'),
                        false,
                    );
                }

                callback(null, true);
            },
        }),
    )
    @Post('file')
    AddFile(@UploadedFile() file: Express.Multer.File, @Body() payload: Movie_Files_Dto) {
        return this.movieFileServie.add_movie_file(file, payload);
    }
}
