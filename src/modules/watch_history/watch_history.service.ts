import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';
import { WatchHistoryDto } from './WatchDto/dto';
import { UpdateWatchHistoryDto } from './WatchDto/updated.dto';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Injectable()
export class WatchHistoryService {
  constructor(
    @InjectModel(Watch_History_Model)
    private watchHistoryModel: typeof Watch_History_Model, @InjectModel(Movies_Model) private moviesModel : typeof Movies_Model
  ) {}

  async create(movie_id: string, payload: Required<WatchHistoryDto>) {
    let movie = await this.moviesModel.findOne({where: {Id: movie_id}})
    const watch_percentage = (payload.watched_duration / movie?.dataValues.duration_minutes) * 100;

    const created = await this.watchHistoryModel.create({...payload, watched_percentage: watch_percentage});
 
    return { success: true, data: created };
  }

  async findAll() {
    const all = await this.watchHistoryModel.findAll();
    return { success: true, data: all };
  }

  async findOne(id: string) {
    const one = await this.watchHistoryModel.findByPk(id);

    if (!one) throw new NotFoundException('Ma\'lumot topilmadi');
    return { success: true, data: one };

  }

  async update(id: string, payload: UpdateWatchHistoryDto) {
    let affected = await this.watchHistoryModel.findOne({
      where: {Id: id}
    })
    if (!affected) throw new NotFoundException('Yangilash uchun topilmadi');
    let updated = await affected.update(payload)
    return { success: true, data: updated };
  }

  async delete(id: string) {
    const deleted = await this.watchHistoryModel.destroy({ where: { Id: id } });
    if (!deleted) throw new NotFoundException('Ochirish uchun topilmadi');
    return { success: true, message: 'Ochirildi' };
  }
}
