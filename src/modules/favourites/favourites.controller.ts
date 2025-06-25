import { Body, Controller, Get, Post } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { favouriteDto } from './FavouriteDto/favourite.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('favourites')
export class FavouritesController {
    constructor(private readonly favouriteService: FavouritesService) { }
    @ApiOperation({ summary: "Bu Movieni Favourites Bolimiga qoshish"})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('create')
    Post_to_Favourites(@Body() payload: favouriteDto) {
        return this.favouriteService.post_favourites(payload)
    }

    @ApiOperation({ summary: "Bu Favourite Hammasini olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('all/favourites')
    Get() {
        return this.favouriteService.get_favourites()
    }
}
