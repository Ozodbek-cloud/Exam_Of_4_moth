import { DataTypes } from 'sequelize';
import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {v4 as uuidv4} from "uuid"
import { UserModel } from './user.entities';
import { Movies_Model } from './movies.entites';

@Table({ tableName: 'Watch_history' })
export class Watch_History_Model extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  })
  Id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataTypes.UUID})
  user_id: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => Movies_Model)
  @Column({ type: DataTypes.UUID})
  movie_id: string;

  @BelongsTo(() => Movies_Model)
  movie: Movies_Model;

  @Column({
    type: DataTypes.INTEGER,
  })
  watched_duration: number;

  @Column({
    type: DataTypes.DECIMAL(5, 2),
  })
  watched_percentage: number;

}
