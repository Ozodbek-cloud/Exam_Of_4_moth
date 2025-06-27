import { Body, Controller, Post, UnsupportedMediaTypeException, UploadedFile, UseInterceptors,
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
    get() {}
}
