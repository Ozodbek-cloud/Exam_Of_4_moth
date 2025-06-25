import { DataTypes } from "sequelize";
import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid"
import { UserModel } from "./user.entities";
import { Subscriptions_Plans_Model } from "./subscription_plans.entities";
import { Status } from "../types/user.types";
@Table({ tableName: "User_Subscriptions" })
export class User_Subscriptions_Model extends Model {

    @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
    })
  Id: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataTypes.UUID})
    user_id: string

    @BelongsTo(() => UserModel)
    user: UserModel

    @ForeignKey(() => Subscriptions_Plans_Model)
    @Column({ type: DataTypes.UUID})
    plan_id: string

    @BelongsTo(() => Subscriptions_Plans_Model)
    subscriptions: Subscriptions_Plans_Model

    @Column({
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    })
    start_date: Date;

    @Column({
        type: DataTypes.DATE,

    })
    end_date: Date;
  
    @Column({
        type: DataTypes.ENUM(...Object.values(Status)),
        defaultValue: Status.PENDING_PAYMENT
    })
    status: Status

    @Column({
        type: DataTypes.BOOLEAN,
        defaultValue: false
    })
    auto_renew: boolean

    
}