import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, HasMany } from "sequelize-typescript";
import { Movies_Model } from "./movies.entites";
import { Lang} from "../types/user.types";
import { BelongsTo } from "sequelize-typescript";

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

  @Column
  quality: '280p' | '480p' | '1080p' | '4k';

  @Column({
    type: DataTypes.ENUM(...Object.values(Lang)),
    defaultValue: Lang.UZB
  })
  language: Lang;

  @Column
  size : string
}
