import { Body, Controller, Get, Post, UnsupportedMediaTypeException, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { MoviesFilesService } from './movies-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Movie_Files_Dto } from './MovieDto/movie.dto';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiBody, ApiBearerAuth, } from '@nestjs/swagger';
import { UserRole } from 'src/core/types/user.types';
import { Auth } from 'src/core/decorator/user.decorator';

@ApiTags('Movie Files')
@Controller('movies-files')
export class MoviesFilesController {
    constructor(private readonly movieFileServie: MoviesFilesService) { }

    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiOperation({ summary: 'Get Qilish (FAQAT ADMIN VA SUPERADMIN)' })
    @ApiBearerAuth()
    @ApiResponse({ status: 20, description: 'Get' })
    @ApiResponse({ status: 415, description: 'Get'})
    @Get('all')
    get() {
       return this.movieFileServie.get()
    }
}
