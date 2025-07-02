import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';
import { WatchHistoryDto } from './WatchDto/dto';
import { UpdateWatchHistoryDto } from './WatchDto/updated.dto';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Injectable()
export class WatchHistoryService {
  constructor(
    @InjectModel(Watch_History_Model)
    private watchHistoryModel: typeof Watch_History_Model,
    @InjectModel(Movies_Model)
    private moviesModel: typeof Movies_Model
  ) {}

  async findAll() {
    try {
      const all = await this.watchHistoryModel.findAll();
      return { success: true, data: all };
    } catch (error) {
      throw new InternalServerErrorException('Barcha malumotlarni olishda xatolik yuz berdi');
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.watchHistoryModel.findByPk(id);
      if (!one) throw new NotFoundException('Malumot topilmadi');
      return { success: true, data: one };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Malumotni olishda xatolik yuz berdi');
    }
  }

  async update(id: string, payload: UpdateWatchHistoryDto) {
  try {
    const affected = await this.watchHistoryModel.findOne({ where: { Id: id } });

    if (!affected) throw new NotFoundException('Yangilash uchun topilmadi');

    const duration = affected.getDataValue('duration_minutes') || 0;

    if (duration === 0)
      throw new BadRequestException('duration_minutes 0 yoki mavjud emas');

    const watched_percentage = (payload.watched_durations / duration) * 100;

    const updated = await affected.update({
      ...payload,
      watched_percentage: Math.round(watched_percentage),
    });

    return { success: true, data: updated };
  } catch (error) {
    if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
    throw new InternalServerErrorException('Yangilashda xatolik yuz berdi');
  }
}


  async delete(id: string) {
    try {
      const deleted = await this.watchHistoryModel.destroy({
        where: { Id: id },
      });
      if (!deleted) throw new NotFoundException('O\'chirish uchun topilmadi');

      return { success: true, message: 'Ochirildi' };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Ochirishda xatolik yuz berdi');
    }
  }
}
