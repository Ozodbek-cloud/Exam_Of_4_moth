import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './CategoryDto/category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly catergoryService: CategoriesService)  {}

    @Post('add')
    AddCategory(payload: CategoryDto) {
        return this.catergoryService.create_category(payload)
    }

    @Get('all')
    AllCategory() {
        this.catergoryService.get_all()
    }

    @Put('change/:id')
    CHangeCategory(@Param('id') id : string, payload: CategoryDto) {
        return this.catergoryService.put_category(id, payload)
    }

    @Delete('delete/:id')
    DeleteCategory(@Param('id') id : string) {
        return this.catergoryService.delete_category(id)
    }

}
