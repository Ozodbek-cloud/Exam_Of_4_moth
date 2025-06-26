import { Body, Controller, Get, Param, Post, Put, Query, UnsupportedMediaTypeException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileDto } from './ProfileDto/profile.dto';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4} from "uuid"
@Controller('profiles')
export class ProfilesController {
     constructor(private readonly profileService: ProfilesService) { }

     @ApiOperation({ summary: "Foydalanuvchi uchun Profile qoshish From datadan" })
     @ApiConsumes('multipart/form-data')
     @ApiResponse({ status: 201, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Post('create')
     @UseInterceptors(FileInterceptor('avatar', {
          storage: diskStorage({
               destination: "./uploads/avatars",
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
     CreateProfile(@UploadedFile() avatar: Express.Multer.File, @Body() payload: ProfileDto) {
          return this.profileService.create_profile(avatar, payload)
     }

     @ApiOperation({ summary: "Foydalanuvchini Hamma Profillarini olish" })
     @ApiResponse({ status: 200, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Get('profiles')
     All_Profiles() {
          return this.profileService.get_all_profile()
     }

     @ApiOperation({ summary: "Bir dona Profilni olish Param orqali" })
     @ApiResponse({ status: 200, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Get('one_profile/:id')
     Get_One(@Param('id') id: string) {
          return this.profileService.get_one_profile(id)
     }

     @ApiOperation({ summary: "Bir dona Profilni Shahar Boyicha olish Query orqali" })
     @ApiResponse({ status: 200, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Get('query__by_country_profile')
     Get_query(@Query('country') country: string) {
          return this.profileService.get_query_profile(country)
     }

     @ApiOperation({ summary: "Bir dona Profilni  Ismi boyicha olish Query orqali" })
     @ApiResponse({ status: 200, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Get('query_profile_by_name')
     Get__name_by_query(@Query('name') name: string) {
          return this.profileService.get_query_by_name_profile(name)
     }

     @ApiOperation({ summary: "Bir dona Profilni  Telefon raqami  boyicha olish Query orqali" })
     @ApiResponse({ status: 200, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Get('query_profile_by_phone')
     Get__phone_by_query(@Query('phone') phone: string) {
          return this.profileService.get_query_by_phone_profile(phone)
     }

     @ApiOperation({ summary: "Bir dona Profilni  Telefon raqami  boyicha olish" })
     @ApiResponse({ status: 200, description: 'Success' })
     @ApiResponse({ status: 404, description: 'UnSuccess' })
     @Put('update/profile/:id')
     updatedProfile(@Param('id') id: string, @Body() payload: Partial<ProfileDto>) {
          return this.profileService.updated_profile(id, payload)
     }

}
