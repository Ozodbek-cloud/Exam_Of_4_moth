import { Body, Controller, Get,  Param, Post, Query, Req, UnsupportedMediaTypeException, UploadedFile, UseInterceptors,} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { MovieDto } from './MovieDto/movie.dto';
import { ApiConsumes, ApiOperation,  ApiResponse, ApiTags, ApiQuery, ApiParam, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) { }


  @Auth(UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Umumiy qidiruv (search, category, page, subscription)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli topildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  @ApiQuery({ name: 'page', required: false, type: String, description: 'Sahifa raqami' })
  @ApiQuery({ name: 'limit', required: false, type: String, description: 'Sahifadagi elementlar soni' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Kategoriya bo‘yicha filter' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Nomi bo‘yicha qidiruv' })
  @ApiQuery({ name: 'subscription_type', required: false, type: String, description: 'Obuna turi (free/premium)' })

  @Get('search')
  getMovies(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('category') category: string,
    @Query('search') search: string,
    @Query('subscription_type') subscriptionType: string,
  ) {
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 20;

    return this.movieService.get_movies(pageNumber, limitNumber, category, search, subscriptionType);
  }


  @Auth(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi kinoni qo‘shish (poster bilan)' })
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
    console.log(req['user'].id)
  }


  @Auth(UserRole.ADMIN, UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Slug orqali kinoni olish' })
  @ApiResponse({ status: 200, description: 'Kino topildi' })
  @ApiResponse({ status: 404, description: 'Kino topilmadi' })
  @ApiParam({ name: 'slug', required: true, description: 'Filmning slug qiymati' })
  @Get('/:slug')
  GetSlug(@Param('slug') slug: string) {
    return this.movieService.get_by_slug(slug);
  }
}
