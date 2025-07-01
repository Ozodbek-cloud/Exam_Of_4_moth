import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryDto } from './WatchDto/dto';
import { UpdateWatchHistoryDto } from './WatchDto/updated.dto';
import { UserRole } from 'src/core/types/user.types';
import { Auth } from 'src/core/decorator/user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Watch History')
@ApiBearerAuth()
@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get('all')
  @ApiOperation({ summary: 'Barcha watch history yozuvlarini olish (FAQAT ADMIN ORQALI)' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli'})
  findAll() {
    return this.watchHistoryService.findAll();
  }

  @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Get('/:id')
  @ApiOperation({ summary: 'Watch history yozuvini ID orqali olish (FAQAT ADMIN ORQALI)' })
  @ApiParam({ name: 'id', type: String, description: 'Watch history ID' })
  @ApiResponse({ status: 200, description: 'Topildi'})
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  findOne(@Param('id') id: string) {
    return this.watchHistoryService.findOne(id);
  }

  @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Put('/:id')
  @ApiOperation({ summary: 'Watch history yozuvini yangilash (FAQAT ADMIN ORQALI)' })
  @ApiParam({ name: 'id', type: String, description: 'Yangilanishi kerak bolgan ID' })
  @ApiBody({ type: UpdateWatchHistoryDto })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli yangilandi'})
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  update(@Param('id') id: string, @Body() payload: UpdateWatchHistoryDto) {
    return this.watchHistoryService.update(id, payload);
  }

  @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
  @Delete('/:id')
  @ApiOperation({ summary: 'Watch history yozuvini ochirish (FAQAT ADMIN ORQALI)' })
  @ApiParam({ name: 'id', type: String, description: 'Ochiriladigan ID' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli ochirildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  remove(@Param('id') id: string) {
    return this.watchHistoryService.delete(id);
  }
}
