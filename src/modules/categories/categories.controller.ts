import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './CategoryDto/category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';

@ApiTags('Kategoriyalar') 
@Controller('categories')
export class CategoriesController {
    constructor(private readonly catergoryService: CategoriesService) {}

    @Auth(UserRole.ADMIN)
    @ApiBearerAuth()
    @Post('add')
    @ApiOperation({ summary: 'Yangi kategoriya qoshish (Admin Orqali)' })
    @ApiBody({ type: CategoryDto })
    @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi (Admin Orqali)' })
    AddCategory(@Body() payload: CategoryDto) {
        return this.catergoryService.create_category(payload);
    }

    @ApiBearerAuth()
    @Auth(UserRole.ADMIN)
    @Get('all')
    @ApiOperation({ summary: 'Barcha kategoriyalar royxatini olish (Admin Orqali)' })
    @ApiResponse({ status: 200, description: 'Kategoriya royxati qaytarildi' })
    AllCategory() {
        return this.catergoryService.get_all();
    }

    @ApiBearerAuth()
    @Auth(UserRole.ADMIN)
    @Put('change/:id')
    @ApiOperation({ summary: 'Kategoriya malumotlarini ozgartirish (Admin Orqali)' })
    @ApiParam({ name: 'id', description: 'Ozgartirilayotgan kategoriyaning Id raqami' })
    @ApiBody({ type: CategoryDto })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi' })
    CHangeCategory(@Param('id') id: string, @Body() payload: CategoryDto) {
        return this.catergoryService.put_category(id, payload);
    }

    @ApiBearerAuth()
    @Auth(UserRole.ADMIN)
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Kategoriya ochirish (Admin Orqali)' })
    @ApiParam({ name: 'id', description: 'Ochiriladigan kategoriyaning Id raqami' })
    @ApiResponse({ status: 200, description: 'Kategoriya ochirildi' })
    DeleteCategory(@Param('id') id: string) {
        return this.catergoryService.delete_category(id);
    }
}
