import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryDto } from './WatchDto/dto';
import { UpdateWatchHistoryDto } from './WatchDto/updated.dto';

@Controller('watch-history')
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}

  @Post('create')
  create(@Param('movie_id') movie_id: string, @Body() payload: WatchHistoryDto) {
    return this.watchHistoryService.create(movie_id, payload);
  }

  @Get('all')
  findAll() {
    return this.watchHistoryService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.watchHistoryService.findOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: UpdateWatchHistoryDto) {
    return this.watchHistoryService.update(id, payload);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.watchHistoryService.delete(id);
  }
}
