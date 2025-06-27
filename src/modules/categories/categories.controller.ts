import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './CategoryDto/category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Kategoriyalar') 
@Controller('categories')
export class CategoriesController {
    constructor(private readonly catergoryService: CategoriesService) {}

    @Post('add')
    @ApiOperation({ summary: 'Yangi kategoriya qoshish' })
    @ApiBody({ type: CategoryDto })
    @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi' })
    AddCategory(@Body() payload: CategoryDto) {
        return this.catergoryService.create_category(payload);
    }

    @Get('all')
    @ApiOperation({ summary: 'Barcha kategoriyalar royxatini olish' })
    @ApiResponse({ status: 200, description: 'Kategoriya royxati qaytarildi' })
    AllCategory() {
        return this.catergoryService.get_all();
    }

    @Put('change/:id')
    @ApiOperation({ summary: 'Kategoriya malumotlarini ozgartirish' })
    @ApiParam({ name: 'id', description: 'Ozgartirilayotgan kategoriyaning Id raqami' })
    @ApiBody({ type: CategoryDto })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi' })
    CHangeCategory(@Param('id') id: string, @Body() payload: CategoryDto) {
        return this.catergoryService.put_category(id, payload);
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Kategoriya ochirish' })
    @ApiParam({ name: 'id', description: 'Ochiriladigan kategoriyaning Id raqami' })
    @ApiResponse({ status: 200, description: 'Kategoriya ochirildi' })
    DeleteCategory(@Param('id') id: string) {
        return this.catergoryService.delete_category(id);
    }
}
