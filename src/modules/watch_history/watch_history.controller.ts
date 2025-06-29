import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryDto } from './WatchDto/dto';
import { UpdateWatchHistoryDto } from './WatchDto/updated.dto';

@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post()
  create(@Body() payload: WatchHistoryDto) {
    return this.watchHistoryService.create(payload);
  }

  @Get()
  findAll() {
    return this.watchHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchHistoryService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateWatchHistoryDto) {
    return this.watchHistoryService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.watchHistoryService.delete(id);
  }
}
