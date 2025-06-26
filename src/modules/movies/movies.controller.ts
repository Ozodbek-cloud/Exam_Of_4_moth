import { Body, Controller, Get, Param, Post, Query, UnsupportedMediaTypeException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from "uuid"
import { extname } from 'path';
import { MovieDto } from './MovieDto/movie.dto';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
    constructor(private readonly movieService: MoviesService) { }

    @ApiOperation({ summary: "Bu Umumiy Search Querylar bilan" })
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('search')
    getMovies(@Query('page') page: string, @Query('limit') limit: string, @Query('category') category: string, @Query('search') search: string, @Query('subscription_type') subscriptionType: string
    ) {
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 20;

        return this.movieService.get_movies(pageNumber, limitNumber, category, search, subscriptionType);
    }

    @ApiOperation({ summary: "Bu Movie Poster qoshish Apis, From Datadan qoshiladi"})
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('add/movie')
    @UseInterceptors(FileInterceptor('poster', {
        storage: diskStorage({
            destination: "./uploads/posters",
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
    createMovie(@UploadedFile() poster: Express.Multer.File, @Body() payload: MovieDto) {
        return this.movieService.createMovie(payload, poster)
    }

    @ApiOperation({ summary: "Bu Movie ni Slug orqali qidirish Paramdan"})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('/:slug')
    GetSlug(@Param('slug') slug: string) {
        return this.movieService.get_by_slug(slug)
    }
}

