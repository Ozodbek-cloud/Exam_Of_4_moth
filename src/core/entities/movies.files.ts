import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, HasMany } from "sequelize-typescript";
import { v4 as uuidv4} from "uuid"
import { Movies_Model } from "./movies.entites";
import { Lang, VideoQuality } from "../types/user.types";
import { BelongsTo } from "sequelize-typescript";
import { Favorite_Model } from "./favourite.entities";

@Table({ tableName: "Movies_Files" })
export class Movies_Files_Model extends Model {
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  })
  Id: string;

  @ForeignKey(() => Movies_Model)
  @Column({ type: DataTypes.UUID })
  movie_id: string;

  @BelongsTo(() => Movies_Model)
  movie: Movies_Model;

  @Column
  file_url: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(VideoQuality))
  })
  quality: VideoQuality;

  @Column({
    type: DataTypes.ENUM(...Object.values(Lang)),
    defaultValue: Lang.UZB
  })
  laguage: Lang;

  
}
