import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';
import { WatchHistoryDto } from './WatchDto/dto';
import { UpdateWatchHistoryDto } from './WatchDto/updated.dto';

@Injectable()
export class WatchHistoryService {
  constructor(
    @InjectModel(Watch_History_Model)
    private watchHistoryModel: typeof Watch_History_Model,
  ) {}

  async create(payload: Required<WatchHistoryDto>) {
    const created = await this.watchHistoryModel.create(payload);
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
    const [affected, [updated]] = await this.watchHistoryModel.update(payload, {
      where: { Id: id },
      returning: true,
    });
    if (!affected) throw new NotFoundException('Yangilash uchun topilmadi');
    return { success: true, data: updated };
  }

  async delete(id: string) {
    const deleted = await this.watchHistoryModel.destroy({ where: { Id: id } });
    if (!deleted) throw new NotFoundException('Ochirish uchun topilmadi');
    return { success: true, message: 'Ochirildi' };
  }
}
