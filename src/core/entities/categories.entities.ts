import { DataTypes } from "sequelize";
import { Column, Table, Model } from "sequelize-typescript";
import { v4 as uuidv4} from "uuid"
@Table({tableName: "Categories"})
export class Categories_Model extends Model{

    @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
     })
     Id: string;
    
    @Column
    name: string

    @Column
    slug: string

    @Column({
        type: DataTypes.TEXT
    })
    description: string
}