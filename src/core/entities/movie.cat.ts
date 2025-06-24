import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { v4 as uuidv4} from "uuid"
import { Movies_Model } from "./movies.entites";
import { Categories_Model } from "./categories.entities";
@Table({tableName: "Movies_Categories"})
export class Movies_Categories_Model extends Model{

    @Column({
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true
    })
    Id: string

    @ForeignKey(() => Movies_Model)
    @Column({ type: DataTypes.UUID})
    movie_id: string

    @ForeignKey(() => Categories_Model)
    @Column({ type: DataTypes.UUID})
    category_id: string
}