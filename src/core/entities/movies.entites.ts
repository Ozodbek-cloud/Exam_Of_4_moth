import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { v4 as uuidv4} from "uuid"
import { Subscription_type } from "../types/user.types";
import { UserModel } from "./user.entities";
import { Movies_Categories_Model } from "./movie.cat";
import { Movies_Files_Model } from "./movies.files";
import { Watch_History_Model } from "./watch_history.entities";
import { Favorite_Model } from "./favourite.entities";
import { Review_Model } from "./reviews.entities";
@Table({tableName: "Movies"})
export class Movies_Model extends Model{

    @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  })
  Id: string;

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

    @BelongsTo(() => UserModel)
    user: UserModel

    @HasMany(() => Movies_Categories_Model)
    movies_category: Movies_Categories_Model[]

    @HasMany(() => Movies_Files_Model)
    movies_files: Movies_Files_Model[]

    @HasMany(() => Watch_History_Model)
    watch_history: Watch_History_Model[]

    @HasMany(() => Favorite_Model)
    favourite_movie: Favorite_Model[]

    @HasMany(() => Review_Model)
    review: Review_Model[]

}