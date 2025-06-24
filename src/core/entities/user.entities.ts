import { Column, Table, Model, PrimaryKey, HasMany } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { v4 as uuidv4} from "uuid"
import { UserRole } from "../types/user.types";
import { ProfileModel } from "./profiles.entities";
import { User_Subscriptions_Model } from "./user_subscriptions.entities";

@Table({tableName: "Users"})
export class UserModel extends Model{
    @Column({
        type: DataTypes.UUIDV4,
        defaultValue: uuidv4(),
        primaryKey: true
    })
    Id : string
    
    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @Column({
        type: DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.USER
    })
    role: UserRole

    @Column
    avatar_url: string

    @HasMany(() => ProfileModel)
    profiles: ProfileModel[]

    @HasMany(() => User_Subscriptions_Model)
    user_subscriptions: User_Subscriptions_Model[]

}

