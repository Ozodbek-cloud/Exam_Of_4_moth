import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './ProfileDto/profile.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profileService: ProfilesService) {}

    @ApiOperation({ summary: "Foydalanuvchi uchun Profile qoshish"})
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('create')
    CreateProfile(@Body() payload: ProfileDto) {
        return  this.profileService.create_profile(payload)
    }

    @ApiOperation({ summary: "Foydalanuvchini Hamma Profillarini olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('all_profiles') 
    All_Profiles() {
       return this.profileService.get_all_profile()
    }

    @ApiOperation({ summary: "Bir dona Profilni olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('one_profile/:id')
    Get_One(@Param('id') id : string) {
         return this.profileService.get_one_profile(id)
    }

    @ApiOperation({ summary: "Bir dona Profilni Shahar Boyicha olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('query__by_country_profile')
    Get_query(@Query('country') country : string) {
         return this.profileService.get_query_profile(country)
    }

    @ApiOperation({ summary: "Bir dona Profilni  Ismi boyicha olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('query_profile_by_name')
    Get__name_by_query(@Query('name') name : string) {
         return this.profileService.get_query_by_name_profile(name)
    }

    @ApiOperation({ summary: "Bir dona Profilni  Telefon raqami  boyicha olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('query_profile_by_phone')
    Get__phone_by_query(@Query('phone') phone : string) {
         return this.profileService.get_query_by_phone_profile(phone)
    }

    @ApiOperation({ summary: "Bir dona Profilni  Telefon raqami  boyicha olish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Put('update/:id')
    updatedProfile(@Param('id') id: string, @Body() payload : Partial<ProfileDto>) {
        return this.profileService.updated_profile(id, payload)
    }
    
}
