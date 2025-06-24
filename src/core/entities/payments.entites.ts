import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid"
import { User_Subscriptions_Model } from "./user_subscriptions.entities";
import { Payment_Method, Payment_Status } from "../types/user.types";

@Table({ tableName: "Payments" })
export class Payments_Model extends Model {
    @Column({
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true
    })
    Id: string

    @ForeignKey(() => User_Subscriptions_Model)
    @Column({ type: DataTypes.UUID})
    user_subscription_id: string

    @Column({
        type: DataTypes.DECIMAL(10, 2),
    })
    amount: number;

    @Column({
        type: DataTypes.ENUM(...Object.values(Payment_Method))
    })
    payment_method: Payment_Method

    @Column({
     type: DataTypes.JSON,
     })
     payment_details: object;

     @Column({
        type: DataTypes.ENUM(...Object.values(Payment_Status))
     })
     status: Payment_Status

     @Column
     external_transaction_id: string

}