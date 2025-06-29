import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MoviesCategoryService } from './movies-category.service';
import { MoCatDto } from './MoCatDto/Movies.Category.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from 'src/core/types/user.types';
import { Auth } from 'src/core/decorator/user.decorator';

@ApiTags('Kino Kategoriyalari') 
@Controller('movies-category')
export class MoviesCategoryController {
    constructor(private readonly movie_categoryService: MoviesCategoryService) {}

    @ApiBearerAuth()
    @Auth(UserRole.ADMIN)
    @Post('create')
    @ApiOperation({ summary: 'Yangi kino kategoriyasini yaratish (FAQAT ADMIN UCHUN)' })
    @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi' })
    Create(@Body() payload: MoCatDto) {
        return this.movie_categoryService.create_movie_category(payload);
    }

    @Auth(UserRole.ADMIN)
    @ApiBearerAuth()
    @Get('all')
    @ApiOperation({ summary: 'Barcha kino kategoriyalarini olish (FAQAT ADMIN UCHUN)' })
    @ApiResponse({ status: 200, description: 'Barcha kategoriyalar ro‘yxati' })
    Get_All() {
        return this.movie_categoryService.Get_All();
    }

    @Auth(UserRole.ADMIN)
    @ApiBearerAuth()
    @Delete('/:id')
    @ApiOperation({ summary: 'Kategoriya Id orqali ochirish (FAQAT ADMIN UCHUN)' })
    @ApiParam({ name: 'id', description: 'Kategoriya Id raqami' })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli ochirildi' })
    Delete_Category(@Param('id') id: string) {
        return this.movie_categoryService.delete_cat(id);
    }
}
