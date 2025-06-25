import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { UserModel } from './user.entities';
import { Movies_Model } from './movies.entites';
import {v4 as uuidv4} from "uuid"
import { DataTypes } from 'sequelize';
@Table({ tableName: 'favorites' })
export class Favorite_Model extends Model {
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

  
}
