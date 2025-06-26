import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { favouriteDto } from './FavouriteDto/favourite.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';

@Controller('favourites')
export class FavouritesController {
    constructor(private readonly favouriteService: FavouritesService) { }
    @Auth(UserRole.USER)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Bu Movieni Favourites Bolimiga qoshish"})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('create')
    Post_to_Favourites(@Body() payload: favouriteDto) {
        return this.favouriteService.post_favourites(payload)
    }

    @ApiBearerAuth()
    @Auth(UserRole.USER)
    @ApiOperation({ summary: "Bu Favourite Hammasini olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Auth(UserRole.USER)
    @Get('all/favourites')
    Get() {
        return this.favouriteService.get_favourites()
    }

    @ApiBearerAuth()
    @Auth(UserRole.USER)
    @ApiOperation({ summary: "Bu Favourite Hammasini olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Auth(UserRole.USER)
    @Get('delete/:movie_id')
    Delete(@Param('movie_id') movie_id: string) {
        return this.favouriteService.delete_favourite(movie_id)
    }
}
