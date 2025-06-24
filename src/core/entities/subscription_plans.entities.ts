import { DataTypes } from "sequelize";
import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { User_Subscriptions_Model } from "./user_subscriptions.entities";
@Table({tableName: "Subscriptions_Plan"})
export class Subscriptions_Plans_Model extends Model{
    @Column({
       type: DataTypes.UUID,
       defaultValue: uuidv4(),
       primaryKey: true
    })
    Id: string

    @Column
    name: string

    @Column({
        type: DataTypes.DECIMAL(10, 2)
    })
     price: number

     @Column
     duration_days: number

     @Column({
        type: DataTypes.JSON
     })
     features: object

     @Column({
        type: DataTypes.BOOLEAN,
        defaultValue: true
     })
     is_active: true

     @HasMany(() => User_Subscriptions_Model)
     user_subscriptions: User_Subscriptions_Model[]
}