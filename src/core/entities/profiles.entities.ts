import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4} from "uuid"
import { UserModel } from "./user.entities";
@Table({tableName: "Profiles"})
export class ProfileModel extends Model{
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

     @Column
     fullname: string

     @Column
     phone: string

     @Column
     country: string

}