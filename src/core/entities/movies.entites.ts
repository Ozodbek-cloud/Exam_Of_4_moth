import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { v4 as uuidv4} from "uuid"
import { Subscription_type } from "../types/user.types";
import { UserModel } from "./user.entities";
@Table({tableName: "Movies"})
export class Movies_Model extends Model{

    @Column({
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true
    })
    Id: string

    @Column
    title: string

    @Column
    slug: string

    @Column({
        type: DataTypes.TEXT
    })
    description: string

    @Column
    release_year: number

    @Column
    duration_minutes: number

    @Column({
        type: DataTypes.DECIMAL(3, 1)
    })
    rating: number

    @Column({
        type: DataTypes.ENUM(...Object.values(Subscription_type))
    })
    subscription_type: Subscription_type

    @Column({
        type: DataTypes.INTEGER,
        defaultValue: 0
    })
    view_count: number

    @ForeignKey(() => UserModel)
    @Column({ type: DataTypes.UUID})
    created_by: string


}