import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnsupportedMediaTypeException, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MovieDto } from './MovieDto/movie.dto';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';
import { Movie_Files_Dto } from '../movies-files/MovieDto/movie.dto';
import { TSVECTOR } from 'sequelize';
import { MovieQuery } from './MovieDto/movie.query.dto';
import { Updated_MovieDto } from './MovieDto/for_updated_movie.dto';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) { }


  @Auth(UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Umumiy qidiruv (search, category, page, subscription) FAQAT ADMIN VA USER UCHUN' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli topildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  @ApiQuery({ name: 'page', required: false, type: String, description: 'Sahifa raqami' })
  @ApiQuery({ name: 'limit', required: false, type: String, description: 'Sahifadagi elementlar soni' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Kategoriya bo‘yicha filter' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Nomi bo‘yicha qidiruv' })
  @ApiQuery({ name: 'subscription_type', required: false, type: String, description: 'Obuna turi (free/premium)' })
  @Get('search')
  getByQuery(@Query() query: MovieQuery) {
    return this.movieService.getAll(query);
  }

  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi kinoni qo‘shish (poster bilan FAQAT ADMIN UCHUN)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Kino muvaffaqiyatli qo‘shildi' })
  @ApiResponse({ status: 415, description: 'Notog‘ri fayl turi (.jpg, .jpeg, .png)' })
  @ApiBody({
    description: 'Kino ma’lumotlari va poster',
    type: MovieDto,
  })

  @Post('add/movie')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, cb) => {
          let posterName = uuidv4() + '_' + extname(file.originalname);
          cb(null, posterName);
        },
      }),
      fileFilter: (req, file, callback) => {
        let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowed.includes(file.mimetype)) {
          return callback(
            new UnsupportedMediaTypeException('File type must be .jpg | .jpeg | .png'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  createMovie(@Req() req: Request, @UploadedFile() poster: Express.Multer.File, @Body() payload: MovieDto) {
    return this.movieService.createMovie(req['user'].id, payload, poster)
  }

  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi kinoni id bilan  qoshish FAQAT ADMIN UCHUN)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Kino muvaffaqiyatli qoshildi' })
  @ApiResponse({ status: 415, description: 'Notogri fayl turi ' })
  @Post("/:id/files")
  @UseInterceptors(FileInterceptor('video',
    {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          let videoName = uuidv4() + "_" + extname(file.originalname)
          cb(null, videoName)
        }
      }),
      fileFilter: (req, file, callback) => {
        let allowed = ['video/mp4', 'video/webm']
        if (!allowed.includes(file.mimetype)) {
          callback(new UnsupportedMediaTypeException('Only  .mp4 | webm types are allowed'), false)
        }
        callback(null, true)
      }
    }))
  create(
    @Param("id") id: string,
    @UploadedFile() video: Express.Multer.File,
    @Body() payload: Movie_Files_Dto
  ) {
    return this.movieService.create(id, payload, video)
  }

  @Auth(UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Slug orqali kinoni olish (FAQAT ADMIN VA USER UCHUN)' })
  @ApiResponse({ status: 200, description: 'Kino topildi' })
  @ApiResponse({ status: 404, description: 'Kino topilmadi' })
  @ApiParam({ name: 'slug', required: true, description: 'Filmning slug qiymati' })
  @Get('/:slug')
  GetSlug(@Param('slug') slug: string) {
    return this.movieService.get_by_slug(slug);
  }

  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Id orqali put qilish (FAQAT ADMIN' })
  @ApiResponse({ status: 200, description: 'UPDATED' })
  @ApiParam({ name: 'id', required: true, description: 'id qiymat' })
  @ApiResponse({ status: 404, description: 'ERROR' })
  @Put('/:id/change')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, cb) => {
          let posterName = uuidv4() + '_' + extname(file.originalname);
          cb(null, posterName);
        },
      }),
      fileFilter: (req, file, callback) => {
        let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowed.includes(file.mimetype)) {
          return callback(
            new UnsupportedMediaTypeException('File type must be .jpg | .jpeg | .png'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  Updated_Movie(@Param('id') id: string, @Body() payload: Updated_MovieDto, @UploadedFile() poster: Express.Multer.File) {
    return this.movieService.put_movie(id, payload, poster)
  }

  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Id orqali kinoni ochirish (FAQAT ADMIN UCHUN)' })
  @ApiResponse({ status: 200, description: 'Kino topildi' })
  @ApiResponse({ status: 404, description: 'Kino topilmadi' })
  @ApiParam({ name: 'id', required: true, description: 'id qiymat' })
  @Delete('/:id')
  Delete(@Param('id') id: string) {
    return this.movieService.delete_movie(id)
  }

  
}
