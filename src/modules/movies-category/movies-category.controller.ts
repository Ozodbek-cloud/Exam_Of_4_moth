import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MoviesCategoryService } from './movies-category.service';
import { MoCatDto } from './MoCatDto/Movies.Category.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Kino Kategoriyalari') 
@Controller('movies-category')
export class MoviesCategoryController {
    constructor(private readonly movie_categoryService: MoviesCategoryService) {}

    @Post('create')
    @ApiOperation({ summary: 'Yangi kino kategoriyasini yaratish' })
    @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi' })
    Create(@Body() payload: MoCatDto) {
        return this.movie_categoryService.create_movie_category(payload);
    }

    @Get('all')
    @ApiOperation({ summary: 'Barcha kino kategoriyalarini olish' })
    @ApiResponse({ status: 200, description: 'Barcha kategoriyalar ro‘yxati' })
    Get_All() {
        return this.movie_categoryService.Get_All();
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Kategoriya Id orqali ochirish' })
    @ApiParam({ name: 'id', description: 'Kategoriya Id raqami' })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli ochirildi' })
    Delete_Category(@Param('id') id: string) {
        return this.movie_categoryService.delete_cat(id);
    }
}
